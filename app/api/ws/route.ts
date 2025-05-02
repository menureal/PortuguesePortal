import { NextRequest } from 'next/server';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

// Store active appointments to track real-time availability
const activeAppointments = new Map<string, Set<string>>();
let wss: WebSocketServer | null = null;

// Initialize WebSocket server
function getWebSocketServer() {
  if (wss === null) {
    const server = createServer();
    wss = new WebSocketServer({ server, path: '/api/ws' });
    
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
              wss?.clients.forEach(client => {
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
              // Release a previously held slot
              const releaseKey = `${data.doctorId}-${data.date}`;
              activeAppointments.get(releaseKey)?.delete(data.time);
              
              // Broadcast slot release to all clients
              wss?.clients.forEach(client => {
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
              
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      });
      
      ws.on('close', () => {
        console.log('Client disconnected from WebSocket');
      });
    });
    
    const PORT = 3001;
    server.listen(PORT, () => {
      console.log(`WebSocket server is listening on port ${PORT}`);
    });
  }
  
  return wss;
}

export async function GET(request: NextRequest) {
  // This is just a placeholder - the actual WebSocket connection is handled by the external server
  getWebSocketServer();
  
  // The WebSocket communication is handled outside of this route handler
  const upgradeHeader = request.headers.get('upgrade');
  if (upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade to websocket', { status: 426 });
  }
  
  return new Response('WebSocket server is running');
}