const express = require("express")
const { startBot } = require("./index")

const app = express()

app.get("/", (req, res) => {
    res.send(`
    <h2>🔥 JIMMY BOT PAIR</h2>
    <form action="/pair">
    <input name="number" placeholder="255XXXXXXXXX"/>
    <button>GET CODE</button>
    </form>
    `)
})

app.get("/pair", async (req, res) => {
    const number = req.query.number

    try {
        const code = await startBot(number)
        res.send(`<h3>CODE: ${code}</h3>`)
    } catch {
        res.send("Error generating code")
    }
})

app.listen(3000, () => console.log("Server running"))
