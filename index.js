const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")
const fs = require("fs")
const config = require("./config")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    // CONNECT + SET PROFILE
    sock.ev.on("connection.update", async (update) => {
        const { connection } = update

        if (connection === "open") {
            console.log("✅ Bot connected")

            // SET PROFILE NAME
            await sock.updateProfileName("JIMMY BOT 🤖")

            // SET PROFILE PICTURE
            const image = fs.readFileSync("./bot.jpg")
            await sock.updateProfilePicture(sock.user.id, image)
        }
    })

    // MESSAGE HANDLER
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text
        if (!text) return

        if (!text.startsWith(config.prefix)) return

        const args = text.slice(1).trim().split(" ")
        const cmd = args.shift().toLowerCase()

        try {
            const commandFile = require(`./commands/${cmd}.js`)
            commandFile(sock, msg, args)
        } catch (err) {
            console.log("❌ Command not found:", cmd)
        }
    })
}

startBot()
