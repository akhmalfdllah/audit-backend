// scripts/simulate-erp-send.js
require('dotenv').config();
const fetch = require('node-fetch');
const { title } = require('process');

console.log('🔍 ENV Loaded:', {
    ERP_API_URL: process.env.ERP_API_URL,
    ERP_API_KEY: process.env.ERP_API_KEY,
});

if (!process.env.ERP_API_URL || !process.env.ERP_API_KEY) {
    console.error('❌ ERP_API_URL dan ERP_API_KEY harus diatur di .env');
    process.exit(1);
}

// Data transaksi dummy
const payload = {
    title: 'Pembayaran Vendor A',
    amount: Math.floor(Math.random() * 100000),
    category: 'Pembelian',
    currency: 'IDR',
    description: 'Simulasi transaksi dari ERP',
};

async function sendTransaction() {
    try {
        const res = await fetch(`${process.env.ERP_API_URL}/transactions/from-erp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ERP_API_KEY,
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log('📤 Response:', data);
    } catch (err) {
        console.error('❌ Error kirim transaksi:', err.message);
    }
}

sendTransaction();
