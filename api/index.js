const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database ya muda (Inatunza miamala ya sasa hivi)
let transactions = [];

// Inaruhusu kuonyesha ukurasa wa malipo (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Webhook: Inapokea data kutoka kwenye SMS Forwarder App
app.post('/api/webhook', (req, res) => {
    const smsBody = req.body.message || ""; 
    const txnMatch = smsBody.match(/[A-Z0-9]{10}/); // Inatafuta ID ya herufi/namba 10
    
    if (txnMatch && (smsBody.includes("2000") || smsBody.includes("2,000"))) {
        const txnId = txnMatch[0];
        if (!transactions.includes(txnId)) {
            transactions.push(txnId);
            console.log("Muamala Mpya umepokelewa:", txnId);
        }
    }
    res.status(200).send("SMS Imepokelewa");
});

// Verify: Inatumiwa na Website kuhakiki kama mteja amelipa
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
            message: "Muamala haujapatikana! Lipia 2,000 kwanza kisha ujaribu tena." 
        });
    }
});

module.exports = app;
