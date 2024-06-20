var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config()
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);



var authRouter = require('./routes/auth');
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

// Menangani koneksi Socket.io


io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Bergabung ke ruangan berdasarkan ID mahasiswa
  socket.on('joinRoom', (emailMahasiswa) => {
    console.log(`Mahasiswa dengan email ${emailMahasiswa} bergabung ke ruangan`);
    socket.join(emailMahasiswa);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret_key',
  resave: false,  
  saveUninitialized: true
}));





app.use('/', authRouter);
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
