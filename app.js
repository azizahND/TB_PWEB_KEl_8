var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config()

var mhsRouter = require('./routes/mahasiswa');
var adminRouter = require('./routes/admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { isAuthenticated, isAdmin, isMahasiswa } = require('./middlewares/auth');

// Dummy user data for demonstration
app.use((req, res, next) => {
  // Simulate a logged-in user. In real applications, you would use a session or token
  req.user = {
    id: 1,
    username: 'testuser',
    role: 'admin' // Change to 'mahasiswa' to test mahasiswa role
  };
  next();
});

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// Dummy user data for demonstration
const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'mahasiswa', password: 'mahasiswapass', role: 'mahasiswa' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.status(401).send('Login failed');
  }
});


app.use('/mahasiswa', mhsRouter);
app.use('/admin', adminRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Menambahkan console log untuk menampilkan server berjalan di port tertentu
var port = process.env.PORT || 9000; // Port default 3000 atau sesuai dengan yang diatur di file .env
app.listen(port, function() {
  console.log('Server berjalan pada port ' + port);
});

module.exports=app;
