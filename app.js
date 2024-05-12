
const express = require('express');
const app = express();
const port = 3030;


app.get('/', (req, res) => {
  res.send('Halo dari Express.js!');
});

app.get('/profilmahasiswa', (req, res) => {
  res.render('profile-m'); 
});



app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
