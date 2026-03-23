const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>App ya Video Ipo Tayari!</h1><p>Hapa ndipo tutaweka mfumo wa malipo ya 0718278672</p>');
});

app.listen(PORT, () => {
    console.log(`Server inafanya kazi kwenye port ${PORT}`);
});
