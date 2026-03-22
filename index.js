const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");

const app = express();
const PORT = process.env.PORT || 8080;
const GROUP_INVITE_LINK = "https://chat.whatsapp.com/E1sELeH8nafCF9tGEqV67z"; 
const TOP_IMAGE = "https://telegra.ph/file/153a81282a5c48408107a.jpg"; 

app.get('/', (req, res) => {
    res.send(`
        <div style="text-align:center; font-family:sans-serif; margin-top:20px; padding:20px; background:#f4f4f4; min-height:100vh;">
            <img src="${TOP_IMAGE}" style="width:100%; max-width:400px; border-radius:15px;">
            <h1 style="color:#075e54;">GhostPixel Bot 🚀</h1>
            <p>Ingiza namba yako (mfano: 2557XXXXXXXX)</p>
            <form action="/pair" method="get">
                <input type="text" name="number" placeholder="2557XXXXXXXX" required style="padding:15px; width:90%; border:2px solid #25D366; border-radius:10px; font-size:18px; margin-bottom:15px;">
                <br>
                <button type="submit" style="padding:15px; width:95%; background:#25D366; color:white; border:none; border-radius:10px; font-weight:bold; font-size:18px;">PATA PAIRING CODE</button>
            </form>
        </div>
    `);
});

app.get('/pair', async (req, res) => {
    let num = req.query.number.replace(/[^0-9]/g, '');
    if (!num) return res.send("Weka namba sahihi!");
    try {
        const { state, saveCreds } = await useMultiFileAuthState('session');
        const sock = makeWASocket({ auth: state, printQRInTerminal: false, logger: pino({ level: "silent" }) });
        await delay(3000);
        let code = await sock.requestPairingCode(num);
        res.send(`
            <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
                <h2>Kodi Yako:</h2>
                <h1 style="background:#25D366; color:white; padding:15px; border-radius:10px; display:inline-block; font-size:40px;">${code}</h1>
                <p>Ingiza kodi hii kwenye WhatsApp (Linked Devices)</p>
            </div>
        `);
    } catch (e) { res.send("Tatizo limetokea, jaribu tena."); }
});

app.listen(PORT, () => console.log("Server Live"));
