const axios = require("axios")

module.exports = {
    name: "play",
    execute: async (sock, msg, args) => {
        const q = args.join(" ")
        if (!q) return sock.sendMessage(msg.key.remoteJid, { text: "Weka jina la wimbo" })

        const res = await axios.get(`https://api.popcat.xyz/ytsearch?q=${q}`)
        const video = res.data[0]

        await sock.sendMessage(msg.key.remoteJid, {
            text: `🎵 ${video.title}\n${video.url}`
        })
    }
}
