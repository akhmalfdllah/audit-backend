// src/erp/simulate-erp-send.ts
import 'dotenv/config';
import axios from 'axios';
import cron from 'node-cron';

const BACKEND_URL = process.env.AUDIT_BACKEND_URL; // e.g. https://audit-backend.up.railway.app
const ERP_API_KEY = process.env.ERP_API_KEY;
const CRON_SCHEDULE = process.env.SEND_INTERVAL_CRON || '* * * * *'; // default: setiap menit

if (!BACKEND_URL) {
  console.error('❌ AUDIT_BACKEND_URL tidak di-set. Hentikan worker.');
  process.exit(1);
}
if (!ERP_API_KEY) {
  console.error('❌ ERP_API_KEY tidak di-set. Hentikan worker.');
  process.exit(1);
}

const http = axios.create({
  baseURL: BACKEND_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// util buat generate payload sederhana (kamu bisa sesuaikan dengan DTO backend)
function makePayload() {
  return {
    title: `ERP Auto Tx - ${new Date().toISOString()}`,
    amount: (Math.floor(Math.random() * 900) + 100) * 1000, // random
    category: 'ERP_AUTO',
    currency: 'IDR',
    description: 'Transaksi otomatis dari ERP sender',
  };
}

// job runner
const task = cron.schedule(CRON_SCHEDULE, async () => {
  console.log('[ERP Sender] Cron triggered', new Date().toISOString());
  const payload = makePayload();

  try {
    const res = await http.post('/transactions/from-erp', payload, {
      headers: { 'x-api-key': ERP_API_KEY },
    });
    console.log('[ERP Sender] Success:', res.status, res.data);
  } catch (err: any) {
    if (err.response) {
      console.error('[ERP Sender] Gagal mengirim transaksi:', err.response.status, err.response.data);
    } else {
      console.error('[ERP Sender] Gagal mengirim transaksi:', err.message);
    }
  }
});

async function start() {
  console.log('[ERP Sender] Starting worker...');
  task.start();
  console.log(`[ERP Sender] Cron schedule: ${CRON_SCHEDULE}`);
}

start().catch(err => {
  console.error('[ERP Sender] Fatal error on start:', err);
  process.exit(1);
});

// graceful shutdown
const shutdown = () => {
  console.log('[ERP Sender] Shutdown...');
  task.stop();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
