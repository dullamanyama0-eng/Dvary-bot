const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Database ya muda kuhifadhi namba za muamala zilizolipwa
let transactions = [];

// 1. WEBHOOK: Inapokea SMS kutoka kwenye simu yako (M-PESA)
app.post('/api/webhook', (req, res) => {
    const smsBody = req.body.message || ""; 
    
    // Inatafuta namba ya muamala (Herufi na Namba 10, mfano: SJD567890)
    const txnMatch = smsBody.match(/[A-Z0-9]{10}/); 
    
    // Inahakikisha SMS ina namba ya muamala na kiasi ni 2000
    if (txnMatch && (smsBody.includes("2000") || smsBody.includes("2,000"))) {
        const txnId = txnMatch[0];
        if (!transactions.includes(txnId)) {
            transactions.push(txnId);
            console.log("M-PESA Imethibitishwa: " + txnId);
        }
    }
    res.status(200).send("SMS Imepokelewa");
});

// 2. VERIFY: Hapa ndipo App yako inakagua kama mteja amelipa kweli
app.get('/api/verify', (req, res) => {
    const customerTxn = req.query.txnId;
    
    if (transactions.includes(customerTxn)) {
        res.json({ 
            status: "success", 
            link: "https://whatsapp.com/channel/0029VbBaKXB1t90W0S24QU0m" 
        });
    } else {
        res.json({ 
            status: "failed", 
            message: "Muamala haujapatikana! Lipia 2000 M-Pesa kwanza." 
        });
    }
});

module.exports = app;

