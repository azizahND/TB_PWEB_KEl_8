// server.js
const express = require('express');
const app = express();
const port = 3000;

// Definisikan route
app.get('/', (req, res) => {
  res.send('Halo dari Express.js!');
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
