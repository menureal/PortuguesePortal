import { NextResponse, NextRequest } from 'next/server';
import { WebSocketServer } from 'ws';
import http from 'http';

// Este objeto vai guardar a instância do servidor WebSocket
let wss: WebSocketServer | null = null;
// Map para armazenar as disponibilidades (simulando banco de dados)
const availabilityStatus: Record<string, Record<string, Record<string, boolean>>> = {};

// Função para obter ou criar o servidor WebSocket
function getWebSocketServer() {
  if (!wss) {
    try {
      // Criar um servidor HTTP separado para o WebSocket
      const server = http.createServer();
      server.listen(5001, '0.0.0.0', () => {
        console.log('WebSocket HTTP server running on port 5001');
      });
      
      // Criar um novo servidor WebSocket usando o servidor HTTP
      wss = new WebSocketServer({ server });
      
      console.log('WebSocket server initialized on port 5001');
    
      wss.on('connection', (ws) => {
        console.log('New WebSocket client connected');
        
        ws.on('message', (message) => {
          try {
            const data = JSON.parse(message.toString());
            console.log('Received message:', data);
            
            // Gerenciar diferentes tipos de mensagens
            if (data.type === 'CHECK_SLOT') {
              const { doctorId, date } = data;
              
              // Inicializar a estrutura se não existir
              if (!availabilityStatus[doctorId]) {
                availabilityStatus[doctorId] = {};
              }
              if (!availabilityStatus[doctorId][date]) {
                // Gerar disponibilidade aleatória para horários
                availabilityStatus[doctorId][date] = {
                  '09:00': Math.random() > 0.3,
                  '09:30': Math.random() > 0.3,
                  '10:00': Math.random() > 0.3,
                  '10:30': Math.random() > 0.3,
                  '11:00': Math.random() > 0.3,
                  '14:00': Math.random() > 0.3,
                  '14:30': Math.random() > 0.3,
                  '15:00': Math.random() > 0.3,
                  '15:30': Math.random() > 0.3,
                  '16:00': Math.random() > 0.3,
                };
              }
              
              // Enviar o status de todos os slots para esse médico/data
              const slots = availabilityStatus[doctorId][date];
              Object.entries(slots).forEach(([time, available]) => {
                ws.send(JSON.stringify({
                  type: 'SLOT_STATUS',
                  doctorId,
                  date,
                  time,
                  available
                }));
              });
            }
            
            // Reservar temporariamente um slot
            else if (data.type === 'HOLD_SLOT') {
              const { doctorId, date, time } = data;
              
              if (availabilityStatus[doctorId]?.[date]?.[time] !== false) {
                availabilityStatus[doctorId][date][time] = false;
                
                // Notificar todos os clientes sobre a alteração
                wss?.clients.forEach((client) => {
                  if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({
                      type: 'SLOT_UPDATED',
                      doctorId,
                      date,
                      time,
                      available: false
                    }));
                  }
                });
              }
            }
            
            // Liberar um slot reservado
            else if (data.type === 'RELEASE_SLOT') {
              const { doctorId, date, time } = data;
              
              if (availabilityStatus[doctorId]?.[date]?.[time] === false) {
                availabilityStatus[doctorId][date][time] = true;
                
                // Notificar todos os clientes sobre a alteração
                wss?.clients.forEach((client) => {
                  if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({
                      type: 'SLOT_UPDATED',
                      doctorId,
                      date,
                      time,
                      available: true
                    }));
                  }
                });
              }
            }
            
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        });
        
        ws.on('close', () => {
          console.log('WebSocket client disconnected');
        });
      });
    } catch (error) {
      console.error('Error initializing WebSocket server:', error);
    }
  }
  
  return wss;
}

// Endpoint para inicializar o WebSocket
export async function GET(request: NextRequest) {
  // Garantir que o servidor WebSocket está rodando
  getWebSocketServer();
  
  // Configurar cabeçalhos CORS
  const response = NextResponse.json({ status: 'WebSocket server running' });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

// Suporte para preflight OPTIONS
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}