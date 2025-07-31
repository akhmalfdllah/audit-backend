const axios = require('axios');

const transactions = [
    {
        title: "Laptop",
        amount: 5000000,
        category: "Kebutuhan",
        description: "Buat Gawe"
    }
];

const apiKey = 'erp-1234-key'; // ganti dengan API key valid dari DB
transactions.forEach(async (trx, i) => {
    try {
        const res = await axios.post('http://localhost:3000/transactions/from-erp', trx, {
            headers: {
                'x-api-key': apiKey
            }
        });
        console.log(`✅ Transaksi ${i + 1} sukses`, res.data);
    } catch (err) {
        console.log(`❌ Transaksi ${i + 1} gagal`, err.response?.data || err.message);
    }
});
