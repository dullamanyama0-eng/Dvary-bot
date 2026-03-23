const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Hakikisha folder la kuhifadhia picha lipo
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Sehemu ya kuhifadhi picha
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// NJIA YA KUPANDA PICHA (UPLOAD)
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send({ message: 'Tafadhali chagua faili!' });
  
  const host = req.get('host');
  const fileUrl = `${req.protocol}://${host}/uploads/${req.file.filename}`;
  
  res.send({ 
    status: "Safi!", 
    message: 'Faili limefanikiwa kupanda', 
    url: fileUrl 
  });
});

// Ukurasa wa mwanzo
app.get('/', (req, res) => {
  res.send('🚀 Dvary-bot Server Iko Tayari! Tumia endpoint ya /upload kupandisha picha.');
});

app.listen(port, () => {
  console.log(`🚀 Server inafanya kazi kwenye port ${port}`);
});
