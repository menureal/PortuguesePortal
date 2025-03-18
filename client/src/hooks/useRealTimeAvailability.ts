import { useState, useEffect } from 'react';

type AvailabilityMessage = {
  type: 'SLOT_STATUS' | 'SLOT_UPDATED';
  doctorId: number;
  date: string;
  time: string;
  available: boolean;
};

export function useRealTimeAvailability(doctorId: number, date: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      // Check initial slot availability
      ws.send(JSON.stringify({
        type: 'CHECK_SLOT',
        doctorId,
        date
      }));
    };

    ws.onmessage = (event) => {
      const data: AvailabilityMessage = JSON.parse(event.data);
      
      if (data.type === 'SLOT_STATUS' || data.type === 'SLOT_UPDATED') {
        if (data.doctorId === doctorId && data.date === date) {
          setAvailableTimes(prev => 
            data.available 
              ? [...prev, data.time]
              : prev.filter(t => t !== data.time)
          );
        }
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [doctorId, date]);

  const holdSlot = (time: string) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({
        type: 'HOLD_SLOT',
        doctorId,
        date,
        time
      }));
    }
  };

  const releaseSlot = (time: string) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({
        type: 'RELEASE_SLOT',
        doctorId,
        date,
        time
      }));
    }
  };

  return {
    availableTimes,
    isConnected,
    holdSlot,
    releaseSlot
  };
}
