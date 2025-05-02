import { spawn } from 'child_process';

console.log('Starting Next.js application on port 5000...');

// Inicia o servidor Next.js na porta 5000 e host 0.0.0.0 para acesso externo
const nextDev = spawn('npx', ['next', 'dev', '-p', '5000', '-H', '0.0.0.0'], { 
  stdio: 'inherit',
  env: { ...process.env }
});

nextDev.on('close', (code) => {
  console.log(`Next.js dev server exited with code ${code}`);
  process.exit(code);
});

// Gerencia sinais de término para fechamento limpo
process.on('SIGINT', () => {
  nextDev.kill('SIGINT');
});

process.on('SIGTERM', () => {
  nextDev.kill('SIGTERM');
});

console.log('Next.js server startup initiated');