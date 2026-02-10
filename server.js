const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyaları servis et
app.use(express.static(path.join(__dirname)));

// Tüm route'ları index.html'e yönlendir
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
