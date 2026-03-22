const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");

const app = express();
const PORT = process.env.PORT || 8080;

// --- LINK YA GROUP LAKO IMEWEKWA HAPA ---
const GROUP_INVITE_LINK = "https://chat.whatsapp.com/E1sELeH8nafCF9tGEqV67z"; 

// --- PICHA NZURI YA JUU (GHOSTPIXEL) ---
const TOP_IMAGE = "https://telegra.ph/file/153a81282a5c48408107a.jpg"; 

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="sw">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GhostPixel FREE WhatsApp Bot 🚀</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #e5ddd5;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .container {
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
                    width: 90%;
                    max-width: 450px;
                    overflow: hidden;
                    text-align: center;
                }
                .header-img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .content {
                    padding: 30px;
                }
                h1 {
                    color: #075e54;
                    margin-top: 0;
                    font-size: 24px;
                }
                h3 {
                    color: #128c7e;
                    margin-bottom: 10px;
                }
                p {
                    color: #666;
                    margin-bottom: 25px;
                    line-height: 1.6;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                input[type="text"] {
                    width: 100%;
                    padding: 15px;
                    border: 2px solid #25D366;
                    border-radius: 10px;
                    font-size: 16px;
                    box-sizing: border-box; /* Muhimu kwa padding */
                }
                input[type="text"]:focus {
                    outline: none;
                    border-color: #128c7e;
                }
                button {
                    width: 100%;
                    padding: 15px;
                    background-color: #25D366;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #128c7e;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 14px;
                    color: #888;
                }
                .footer a {
                    color: #128c7e;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="${TOP_IMAGE}" alt="GhostPixel Header" class="header-img">
                
                <div class="content">
                    <h1>GhostPixel Bot 🚀</h1>
                    <h3>Unganisha Bot Yako Bure!</h3>
                    <p>Ingiza namba yako kuanza na kodi ya nchi (2557...). Mfumo utakuunga na group letu automatically.</p>
                    
                    <form action="/pair" method="get">
                        <div class="form-group">
                            <input type="text" name="number" placeholder="2557XXXXXXXX" required>
                        </div>
                        <button type="submit">PATA PAIRING CODE</button>
                    </form>
                    
                    <div class="footer">
                        Admin: <a href="https://wa.me/255XXXXXXXXX"><b>@Dulla_Manyama</b></a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get('/pair', async (req, res) => {
    let num = req.query.number.replace(/[^0-9]/g, '');
    if (!num) return res.send("Tafadhali weka namba sahihi!");

    try {
        const { state, saveCreds } = await useMultiFileAuthState('session');
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" })
        });

        await delay(2500);
        let code = await sock.requestPairingCode(num);
        
        // HAPA NDIPO PA KUJIUNGA NA GROUP AUTOMATICALLY
        sock.ev.on("connection.update", async (update) => {
            const { connection } = update;
            if (connection === "open") {
                try {
                    // Inachukua code ya group kutoka kwenye link
                    let groupCode = GROUP_INVITE_LINK.split("https://chat.whatsapp.com/")[1];
                    await sock.groupAcceptInvite(groupCode);
                    console.log("Mtumiaji mpya amejiunga na group!");
                } catch (e) {
                    console.log("Kosa la kujiunga na group: ", e);
                }
            }
        });

        sock.ev.on("creds.update", saveCreds);

        res.send(`
            <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
                <h2 style="color:#075e54;">Kodi Yako Ya Pairing:</h2>
                <div style="background:#25D366; color:white; display:inline-block; padding:20px; border-radius:10px; font-size:35px; font-weight:bold; letter-spacing:8px; margin:20px 0;">${code}</div>
                <p>Nenda WhatsApp -> Linked Devices -> Link with Phone Number.</p>
                <br><a href="/" style="color:#25D366; text-decoration:none; font-weight:bold;">Rudi Nyuma</a>
            </div>
        `);
    } catch (err) {
        res.send("<div style='text-align:center; margin-top:50px;'><h3>Jaribu tena...</h3><a href='/'>Rudi</a></div>");
    }
});

app.listen(PORT, () => {
    console.log(`Server ipo tayari!`);
});
