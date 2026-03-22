const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// 🔐 PASSWORD ZAKO
const USER_PASS = "dvary77";  // Ya watazamaji
const ADMIN_PASS = "admin99"; // Yako ya siri (Admin)

// HAPA NDIPO VIDEO ZITAHIFADHIWA (Kwa sasa zipo hizi za mfano)
let VIDEOS = [
    { title: "Karibu Dvary-Bot", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
];

// 1. UKURASA WA NYUMBANI (PASSWORD CHECK)
app.get('/', (req, res) => {
    res.send(`
        <body style="background:#000; color:#25d366; font-family:sans-serif; text-align:center; padding-top:100px;">
            <h1>🔐 DVARY PRIVATE VAULT</h1>
            <form action="/login" method="POST">
                <input type="password" name="pass" placeholder="Ingiza Password..." style="padding:15px; width:80%; max-width:300px; border-radius:10px; border:none;"><br><br>
                <button type="submit" style="padding:10px 30px; background:#25d366; font-weight:bold; border:none; cursor:pointer;">FUNGUA</button>
            </form>
        </body>
    `);
});

// 2. LOGIC YA KUINGIA (USER VS ADMIN)
app.post('/login', (req, res) => {
    const pass = req.body.pass;
    if (pass === ADMIN_PASS) return res.redirect('/admin?key=' + ADMIN_PASS);
    if (pass === USER_PASS) return res.redirect('/view?key=' + USER_PASS);
    res.send("Password Imekosewa! <a href='/'>Jaribu tena</a>");
});

// 3. UKURASA WA WATAZAMAJI (VIEWER)
app.get('/view', (req, res) => {
    if (req.query.key !== USER_PASS) return res.redirect('/');
    let html = VIDEOS.map(v => `
        <div style="background:#161b22; margin:20px; padding:15px; border-radius:15px; color:#fff; border:1px solid #333;">
            <h3>🎥 ${v.title}</h3>
            <video width="100%" controls style="border-radius:10px;"><source src="${v.url}" type="video/mp4"></video>
        </div>
    `).join('');
    res.send(`<body style="background:#0d1117; font-family:sans-serif; text-align:center; padding:20px;">
        <h1 style="color:#25d366;">DVARY VIDEO PLAYER</h1>
        ${html}
    </body>`);
});

// 4. UKURASA WA ADMIN (KUONGEZA VIDEO)
app.get('/admin', (req, res) => {
    if (req.query.key !== ADMIN_PASS) return res.redirect('/');
    res.send(`
        <body style="background:#0d1117; color:#fff; font-family:sans-serif; padding:20px; text-align:center;">
            <h1 style="color:#f1c40f;">🛠 ADMIN PANEL (DVARY)</h1>
            <div style="background:#161b22; padding:20px; border-radius:15px; border:1px solid #f1c40f; max-width:400px; margin:auto;">
                <h3>Ongeza Video Mpya</h3>
                <form action="/add-video" method="POST">
                    <input type="hidden" name="key" value="${ADMIN_PASS}">
                    <input type="text" name="title" placeholder="Jina la Video..." style="width:90%; padding:10px; margin-bottom:10px;"><br>
                    <input type="text" name="url" placeholder="Link ya Video (.mp4)..." style="width:90%; padding:10px; margin-bottom:10px;"><br>
                    <button type="submit" style="padding:10px 20px; background:#f1c40f; border:none; font-weight:bold; cursor:pointer;">WEKA KWENYE APP</button>
                </form>
            </div>
            <br><a href="/view?key=${USER_PASS}" style="color:#25d366;">Angalia Video Zilivyo</a>
        </body>
    `);
});

// 5. LOGIC YA KUHIFADHI VIDEO MPYA
app.post('/add-video', (req, res) => {
    if (req.body.key !== ADMIN_PASS) return res.send("Huruhusiwi!");
    const { title, url } = req.body;
    if (title && url) {
        VIDEOS.unshift({ title, url }); // Inaweka video mpya juu kabisa
    }
    res.redirect('/admin?key=' + ADMIN_PASS);
});

app.listen(PORT, () => console.log("Admin System Live!"));
