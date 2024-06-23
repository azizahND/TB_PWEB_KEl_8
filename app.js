var createError = require('http-errors');
var express = require('express');
const http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config()
const socketio = require('socket.io');
var app = express();


const server = http.createServer(app);
const io = socketio(server);



var authRouter = require('./routes/auth');
var mhsRouter = require('./routes/mahasiswa');
var adminRouter = require('./routes/admin');






app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { isAuthenticated, isAdmin, isMahasiswa } = require('./middlewares/auth');


app.set('io', io);
io.on('connection', (socket) => {
  console.log('a user connected');
  
  

  socket.on("join", (userId) => {
    console.log(`User with userId  joined room`);
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});




app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, 
  }
}));






app.use(session({
  secret: 'secret_key',
  resave: false,  
  saveUninitialized: true
}));





app.use('/', authRouter);
app.use('/mahasiswa', mhsRouter);
app.use('/admin', adminRouter);



var port = process.env.PORT || 9000; 


module.exports = app;

app.listen(port, function() {
  console.log('Server berjalan pada port ' + port);
});

module.exports=app;
