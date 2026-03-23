const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Hakikisha folder la kuhifadhia picha lipo
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ukurasa wa mbele (Home)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Mpangilio wa kuhifadhi picha
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'dvary-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
});

// Endpoint ya Kupakia (Upload)
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send({ error: 'Chagua picha kwanza!' });
  
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  
  res.send({ 
    success: true, 
    url: fileUrl,
    filename: req.file.filename
  });
});

app.listen(port, () => {
  console.log(`Dvary Cloud is live on port ${port}`);
});
