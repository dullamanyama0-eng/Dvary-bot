const axios = require("axios")

module.exports = {
    name: "tiktok",
    execute: async (sock, msg, args) => {
        const url = args[0]
        if (!url) return sock.sendMessage(msg.key.remoteJid, { text: "Weka link ya TikTok" })

        const res = await axios.get(`https://api.tiklydown.me/api/download?url=${url}`)
        const video = res.data.video.noWatermark

        await sock.sendMessage(msg.key.remoteJid, {
            video: { url: video },
            caption: "Downloaded 🔥"
        })
    }
}
