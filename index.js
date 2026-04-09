const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="background: black; color: #00ff00; text-align: center; font-family: sans-serif; padding-top: 100px;">
        <h1>🛡️ DVARY SECURITY V2 🛡️</h1>
        <p>Developed by Elia Manyama</p>
        <div style="border: 2px solid #00ff00; display: inline-block; padding: 20px;">
          <h3>GET YOUR PAIR CODE</h3>
          <input type="text" id="num" placeholder="255694670587" style="padding: 10px;">
          <button onclick="alert('Pairing system starting...')" style="padding: 10px; background: #00ff00; color: black; font-weight: bold;">GET CODE</button>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => console.log('Dvary live on port ' + port));
