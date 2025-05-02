#!/usr/bin/env node

import { spawn } from 'child_process';
const nextDev = spawn('npx', ['next', 'dev'], { stdio: 'inherit' });

nextDev.on('close', (code) => {
  console.log(`Next.js dev server exited with code ${code}`);
  process.exit(code);
});

process.on('SIGINT', () => {
  nextDev.kill('SIGINT');
});

process.on('SIGTERM', () => {
  nextDev.kill('SIGTERM');
});