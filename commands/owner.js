module.exports = {
    name: "owner",
    execute: async (sock, msg) => {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "Owner: Jimmy 🔥"
        })
    }
}
