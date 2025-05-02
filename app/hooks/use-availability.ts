'use client';

import { useState, useEffect } from 'react';
import { useWebSocket } from '../api/ws/websocket-provider';

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
 * Agora usa o WebSocketProvider para gerenciar conexões
 */
export function useAvailability(doctorId: number, selectedDate: Date | undefined) {
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>({});
  const { socket, isConnected, sendMessage } = useWebSocket();

  // Formatamos a data para string no formato YYYY-MM-DD para uso nas chaves
  const formattedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` 
    : '';

  // Configurar listener para mensagens do WebSocket
  useEffect(() => {
    if (!socket) return;
    
    const handleMessage = (event: MessageEvent) => {
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
    
    socket.addEventListener('message', handleMessage);
    
    // Verificar disponibilidade inicial quando o WebSocket conecta e temos uma data selecionada
    if (isConnected && doctorId && formattedDate) {
      checkSlotAvailability();
    }
    
    // Limpar listener ao desmontar
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, isConnected, doctorId, formattedDate]);

  // Quando a data ou o médico mudar, verificar disponibilidade novamente
  useEffect(() => {
    if (isConnected && doctorId && formattedDate) {
      checkSlotAvailability();
    }
  }, [doctorId, formattedDate, isConnected]);

  // Função para verificar se um slot específico está disponível
  const checkSlotAvailability = () => {
    sendMessage({
      type: 'CHECK_SLOT',
      doctorId,
      date: formattedDate
    });
  };

  // Função para temporariamente reservar um slot
  const holdTimeSlot = (time: string) => {
    if (isConnected && doctorId && formattedDate) {
      sendMessage({
        type: 'HOLD_SLOT',
        doctorId,
        date: formattedDate,
        time
      });
      
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
    if (isConnected && doctorId && formattedDate) {
      sendMessage({
        type: 'RELEASE_SLOT',
        doctorId,
        date: formattedDate,
        time
      });
      
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