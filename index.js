const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const http = require('http');

// LINK YA GROUP LAKO
const GROUP_LINK = 'https://chat.whatsapp.com/CBesZJA02UVCwcGdzdeyeJ';

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    // Inazuia Render isizime
    http.createServer((req, res) => {
        res.write("Dvary-Bot is Active!");
        res.end();
    }).listen(process.env.PORT || 3000);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
    });

    // MBINU YA NAMBA YA SIMU
    if (!sock.authState.creds.registered) {
        const phoneNumber = process.env.PHONE_NUMBER; // Tutaweka namba hapa Render
        if (phoneNumber) {
            console.log(`\n--------------------------------------`);
            console.log(`JARIBIO LA KUUNGANISHA: ${phoneNumber}`);
            setTimeout(async () => {
                let code = await sock.requestPairingCode(phoneNumber);
                console.log(`👉 PAIRING CODE YAKO NI: ${code}`);
                console.log(`--------------------------------------\n`);
            }, 3000);
        } else {
            console.log("WEKA NAMBA YA SIMU KWENYE ENVIRONMENT VARIABLES (PHONE_NUMBER)");
        }
    }

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "open") {
            console.log("✅ BOT IMEUNGANISHWA!");
            try {
                const groupCode = GROUP_LINK.split('https://chat.whatsapp.com/')[1].split('?')[0];
                await sock.groupAcceptInvite(groupCode);
                console.log("🚀 UMEINGIZWA KWENYE GROUP AUTOMATICALLY!");
            } catch (e) { console.log("Group Join Error: " + e); }
        }
        if (connection === "close") {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startDvaryBot();
        }
    });
    sock.ev.on("creds.update", saveCreds);
}
startDvaryBot();
