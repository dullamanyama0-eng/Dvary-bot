const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason 
} = require("@whiskeysockets/baileys");
const pino = require("pino");

async function startDvaryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    console.log("-----------------------------------------");
    console.log("Dvary Bot Inajaribu Kuunganishwa...");
    console.log("Hakikisha SESSION_ID yako ni sahihi!");
    console.log("-----------------------------------------");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
    });

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("Connection imefungwa. Inajaribu tena...", shouldReconnect);
            if (shouldReconnect) startDvaryBot();
        } else if (connection === "open") {
            console.log("Safi sana! Dvary-Bot Imeunganishwa Kikamilifu ✅");
        }
    });

    sock.ev.on("creds.update", saveCreds);
}

startDvaryBot().catch(err => console.log("Kosa limetokea: " + err));
