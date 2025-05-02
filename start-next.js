const { exec } = require('child_process');
const nextProcess = exec('npx next dev');

nextProcess.stdout.on('data', (data) => {
  console.log(`[Next.js] ${data}`);
});

nextProcess.stderr.on('data', (data) => {
  console.error(`[Next.js Error] ${data}`);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});