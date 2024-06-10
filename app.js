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

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  res.render('register');
});

const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const users = [
  { id: 1, nim: '3012', username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, nim: '2111523012', username: 'mahasiswa', password: 'mahasiswapass', role: 'mahasiswa' }
];

app.post('/register', (req, res) => {
  const { nim, namaLengkap, telepon, email, password } = req.body;

      // Check if user with the same email is also registered
      if (users.find(user => user.email === email)) {

          res.render('register', {
              message: 'User already registered.',
              messageClass: 'alert-danger'
          });

          return;
      }

      const hashedPassword = getHashedPassword(password);

      // Store user into the database if you are using one
      users.push({
          nim,
          namaLengkap,
          telepon,
          email,
          password: hashedPassword
      });

      res.render('login', {
          message: 'Registration Complete. Please login to continue.',
          messageClass: 'alert-success'
      });
  });

  app.get('/login', function (req, res) {
    res.render('login');
  });

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.status(401).send('Login failed');
  }
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

// This will hold the users and authToken related to users
const authTokens = {};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    if (user) {
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.redirect('/dashboard');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});

app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies['AuthToken'];

  // Inject the user to the request
  req.user = authTokens[authToken];

  next();
});

app.get('/dashboard', (req, res) => {
  if (req.user) {
      res.render('dashboard');
  } else {
      res.render('dashboard', {
          message: 'Please login to continue',
          messageClass: 'alert-danger'
      });
  }
});

app.get('/form-evaluasi', function (req, res) {
  res.render('form-evaluasi');
});

app.get('/profile-m', function (req, res) {
  res.render('profile-m');
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

module.exports = app;

app.listen(port, function() {
  console.log('Server berjalan pada port ' + port);
});

module.exports=app;
