const axios = require('axios');
require('dotenv').config({ path: __dirname + '/.env' });
const { faker } = require('@faker-js/faker');

const apiUrl = process.env.ERP_API_URL;
const apiKey = process.env.ERP_API_KEY;
const interval = parseInt(process.env.ERP_INTERVAL_MS) || 3600000;
 // default 1 jam

const sendFakeTransaction = async () => {
    const trx = {
        title: faker.commerce.productName(),
        amount: faker.datatype.number({ min: 50000, max: 10000000 }),
        category: faker.commerce.department(),
        description: faker.lorem.sentence()
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

console.log(`⏱️ Kirim transaksi setiap ${interval / 60000} menit...`);

sendFakeTransaction();
setInterval(sendFakeTransaction, interval);
