const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const http = require('http');

const GROUP_LINK = 'https://chat.whatsapp.com/CBesZJA02UVCwcGdzdeyeJ';

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    // Hii inazuia 502 Bad Gateway
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Dvary-Bot is Live and Active!");
    });
    server.listen(process.env.PORT || 10000, '0.0.0.0');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: ["Dvary-Bot", "Chrome", "1.0.0"]
    });

    if (!sock.authState.creds.registered) {
        const phoneNumber = process.env.PHONE_NUMBER;
        if (phoneNumber) {
            console.log(`\n======================================`);
            console.log(`NAMBA YA SIMU: ${phoneNumber}`);
            setTimeout(async () => {
                try {
                    let code = await sock.requestPairingCode(phoneNumber);
                    console.log(`👉 PAIRING CODE YAKO NI: ${code}`);
                } catch (e) { console.log("Error getting pairing code: " + e); }
            }, 5000);
        }
    }

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "open") {
            console.log("✅ BOT IMEUNGANISHWA!");
            try {
                const groupCode = GROUP_LINK.split('https://chat.whatsapp.com/')[1].split('?')[0];
                await sock.groupAcceptInvite(groupCode);
                console.log("🚀 UMEINGIZWA KWENYE GROUP!");
            } catch (e) { console.log("Group Error: " + e); }
        }
        if (connection === "close") {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startDvaryBot();
        }
    });
    sock.ev.on("creds.update", saveCreds);
}
startDvaryBot();

