const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const http = require('http');

// Link ya Group lako
const GROUP_LINK = 'https://chat.whatsapp.com/CBesZJA02UVCwcGdzdeyeJ';

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    // Inazuia Render isizime (Port binding)
    http.createServer((req, res) => {
        res.write("Dvary-Bot is Active!");
        res.end();
    }).listen(process.env.PORT || 3000);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "open") {
            console.log("✅ Bot Imeunganishwa!");
            try {
                const groupCode = GROUP_LINK.split('https://chat.whatsapp.com/')[1].split('?')[0];
                await sock.groupAcceptInvite(groupCode);
                console.log("🚀 Mtumiaji ameingizwa kwenye group automatically!");
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
