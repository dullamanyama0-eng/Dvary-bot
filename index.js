const express = require('express');
const app = express();
const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");

app.get('/pair', async (req, res) => {
    let num = req.query.number;
    if (!num) return res.send({ error: "Weka namba!" });

    try {
        const { state, saveCreds } = await useMultiFileAuthState('./session');
        const conn = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" })
        });

        // Hapa ndipo ujanja ulipo
        if (!conn.authState.creds.registered) {
            await delay(1500);
            num = num.replace(/[^0-9]/g, '');
            const code = await conn.requestPairingCode(num);
            res.send({ code: code }); // Hapa ndipo kodi itatokea kwenye screen!
        }
    } catch (err) {
        res.send({ error: "Jaribu tena baadaye!" });
    }
});

// Hii ni kwa ajili ya kuonyesha ile page yako nzuri
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
});

app.listen(3000, () => console.log("Dvary Server Live"));
