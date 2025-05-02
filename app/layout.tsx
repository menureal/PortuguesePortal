import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { WebSocketProvider } from './api/ws/websocket-provider';

export const metadata: Metadata = {
  title: 'SoSaude.cv - Agendamento Médico em Cabo Verde',
  description: 'Agende consultas médicas com os melhores profissionais de saúde em Cabo Verde',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}