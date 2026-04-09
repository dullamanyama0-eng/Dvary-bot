const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")
const fs = require("fs")

let sock
const commands = new Map()

fs.readdirSync("./commands").forEach(file => {
    const cmd = require(`./commands/${file}`)
    commands.set(cmd.name, cmd)
})

async function startBot(number) {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    if (number) {
        const code = await sock.requestPairingCode(number)
        return code
    }

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]
        if (!msg.message) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text
        if (!text) return

        const prefix = "."
        if (!text.startsWith(prefix)) return

        const args = text.slice(1).split(" ")
        const command = args.shift().toLowerCase()

        if (commands.has(command)) {
            commands.get(command).execute(sock, msg, args)
        }
    })
}

module.exports = { startBot }
