'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type WebSocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (message: any) => void;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  sendMessage: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Inicializar o servidor WebSocket fazendo uma requisição GET para a rota
    fetch('/api/ws')
      .then(response => {
        console.log('WebSocket API initialized:', response.status);
        
        // Se a inicialização for bem-sucedida, criar a conexão WebSocket
        if (response.ok) {
          const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
          const wsUrl = `${protocol}//${window.location.host}/api/ws`;
          
          const ws = new WebSocket(wsUrl);
          
          ws.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
          };
          
          ws.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
          };
          
          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
          };
          
          setSocket(ws);
          
          // Limpar ao desmontar
          return () => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.close();
            }
          };
        }
      })
      .catch(error => {
        console.error('Error initializing WebSocket API:', error);
      });
  }, []);

  const sendMessage = (message: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, unable to send message');
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}