const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("sessions");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];
        if (!msg.message) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!text) return;

        const prefix = ".";
        if (!text.startsWith(prefix)) return;

        const args = text.slice(1).split(" ");
        const command = args.shift().toLowerCase();

        // MENU
        if (command === "menu") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: `
🤖 *WHATSAPP BOT MENU*

.menu
.ping
.ai
                `
            });
        }

        // PING
        if (command === "ping") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "🏓 Bot is alive!"
            });
        }

        // AI (simple placeholder)
        if (command === "ai") {
            const query = args.join(" ");
            if (!query) {
                await sock.sendMessage(msg.key.remoteJid, { text: "Andika .ai message yako" });
                return;
            }

            await sock.sendMessage(msg.key.remoteJid, {
                text: "🤖 AI response: " + query
            });
        }
    });

    console.log("Bot is running...");
}

startBot();
