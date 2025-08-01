// scripts/simulate-erp-send.js
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { faker } = require('@faker-js/faker');

// ✅ Baca variabel dari .env
const apiUrl = process.env.ERP_API_URL;
const apiKey = process.env.ERP_API_KEY;
const interval = parseInt(process.env.ERP_INTERVAL_MS || '3600000'); // default 1 jam

// ✅ Validasi agar tidak undefined
if (!apiUrl || !apiKey) {
    console.error('❌ ERP_API_URL dan ERP_API_KEY harus diatur di .env');
    process.exit(1);
}

const sendFakeTransaction = async () => {
    const trx = {
        title: faker.commerce.productName(),
        amount: faker.number.int({ min: 50000, max: 10000000 }),
        category: faker.commerce.department(),
        description: faker.lorem.sentence(),
    };

    try {
        const res = await axios.post(`${apiUrl}/transactions/from-erp`, trx, {
            headers: {
                'x-api-key': apiKey
            }
        });
        console.log(`✅ Transaksi terkirim:`, res.data);
    } catch (err) {
        console.error(`❌ Gagal kirim transaksi:`, err.response?.data || err.message);
    }
};

console.log(`⏱️ Kirim transaksi setiap ${interval / 60000} menit...\n📡 Endpoint: ${apiUrl}/transactions/from-erp`);

sendFakeTransaction();
setInterval(sendFakeTransaction, interval);
