const express = require('express');
const path = require('path'); 
const app = express();
const port = 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('selamat datang');
});

app.get('/profilmahasiswa', (req, res) => {
  res.render('profile-m'); 
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
