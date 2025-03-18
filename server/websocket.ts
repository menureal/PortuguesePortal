import { WebSocketServer } from 'ws';
import { Server } from 'http';

// Store active appointments to track real-time availability
const activeAppointments = new Map<string, Set<string>>();

export function setupWebSocket(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        switch (data.type) {
          case 'CHECK_SLOT':
            // Check if slot is available
            const key = `${data.doctorId}-${data.date}`;
            const slots = activeAppointments.get(key) || new Set();
            ws.send(JSON.stringify({
              type: 'SLOT_STATUS',
              doctorId: data.doctorId,
              date: data.date,
              time: data.time,
              available: !slots.has(data.time)
            }));
            break;

          case 'HOLD_SLOT':
            // Temporarily hold a slot while user completes booking
            const holdKey = `${data.doctorId}-${data.date}`;
            if (!activeAppointments.has(holdKey)) {
              activeAppointments.set(holdKey, new Set());
            }
            activeAppointments.get(holdKey)?.add(data.time);
            
            // Broadcast slot hold to all clients
            wss.clients.forEach(client => {
              if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({
                  type: 'SLOT_UPDATED',
                  doctorId: data.doctorId,
                  date: data.date,
                  time: data.time,
                  available: false
                }));
              }
            });
            break;

          case 'RELEASE_SLOT':
            // Release a held slot if booking is cancelled/expired
            const releaseKey = `${data.doctorId}-${data.date}`;
            activeAppointments.get(releaseKey)?.delete(data.time);
            
            // Broadcast slot release to all clients
            wss.clients.forEach(client => {
              if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({
                  type: 'SLOT_UPDATED',
                  doctorId: data.doctorId,
                  date: data.date,
                  time: data.time,
                  available: true
                }));
              }
            });
            break;
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });
}
