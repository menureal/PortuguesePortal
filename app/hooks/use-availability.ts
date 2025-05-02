'use client';

import { useState, useEffect } from 'react';

type AvailabilityStatus = {
  [key: string]: boolean;
};

type SlotUpdateMessage = {
  type: string;
  doctorId: number;
  date: string;
  time: string;
  available: boolean;
};

/**
 * Hook para gerenciar disponibilidade de horários em tempo real via WebSocket
 */
export function useAvailability(doctorId: number, selectedDate: Date | undefined) {
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>({});
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Formatamos a data para string no formato YYYY-MM-DD para uso nas chaves
  const formattedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` 
    : '';

  // Inicializa conexão WebSocket
  useEffect(() => {
    // Se não tivermos uma data selecionada, não precisamos verificar disponibilidade ainda
    if (!selectedDate) return;

    // Determinar o protocolo (ws ou wss) baseado no protocolo da página
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/ws`;

    const newSocket = new WebSocket(wsUrl);
    
    newSocket.onopen = () => {
      console.log('WebSocket conectado');
      setIsConnected(true);
      
      // Verifica disponibilidade inicial quando conecta
      if (doctorId && formattedDate) {
        checkSlotAvailability(newSocket, doctorId, formattedDate);
      }
    };
    
    newSocket.onclose = () => {
      console.log('WebSocket desconectado');
      setIsConnected(false);
    };
    
    newSocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };
    
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as SlotUpdateMessage;
        
        if (data.type === 'SLOT_STATUS' || data.type === 'SLOT_UPDATED') {
          if (data.doctorId === doctorId && data.date === formattedDate) {
            setAvailabilityStatus(prev => ({
              ...prev,
              [data.time]: data.available
            }));
          }
        }
      } catch (error) {
        console.error('Erro ao processar mensagem do WebSocket:', error);
      }
    };
    
    setSocket(newSocket);
    
    // Limpar ao desmontar
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [selectedDate, doctorId]);

  // Quando a data ou o médico mudar, verificar disponibilidade novamente
  useEffect(() => {
    if (isConnected && socket && doctorId && formattedDate) {
      checkSlotAvailability(socket, doctorId, formattedDate);
    }
  }, [doctorId, formattedDate, isConnected]);

  // Função para verificar se um slot específico está disponível
  const checkSlotAvailability = (ws: WebSocket, docId: number, date: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'CHECK_SLOT',
        doctorId: docId,
        date: date
      }));
    }
  };

  // Função para temporariamente reservar um slot
  const holdTimeSlot = (time: string) => {
    if (socket?.readyState === WebSocket.OPEN && doctorId && formattedDate) {
      socket.send(JSON.stringify({
        type: 'HOLD_SLOT',
        doctorId: doctorId,
        date: formattedDate,
        time: time
      }));
      
      // Atualiza localmente
      setAvailabilityStatus(prev => ({
        ...prev,
        [time]: false
      }));
      
      return true;
    }
    return false;
  };

  // Função para liberar um slot reservado
  const releaseTimeSlot = (time: string) => {
    if (socket?.readyState === WebSocket.OPEN && doctorId && formattedDate) {
      socket.send(JSON.stringify({
        type: 'RELEASE_SLOT',
        doctorId: doctorId,
        date: formattedDate,
        time: time
      }));
      
      // Atualiza localmente
      setAvailabilityStatus(prev => ({
        ...prev,
        [time]: true
      }));
      
      return true;
    }
    return false;
  };

  return {
    availabilityStatus,
    isConnected,
    holdTimeSlot,
    releaseTimeSlot
  };
}