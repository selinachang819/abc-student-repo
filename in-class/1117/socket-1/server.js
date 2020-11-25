var app = require('express')();//node version of requesting for a library
var http = require('http').createServer(app);
var io = require('socket.io')(http);// respond with the library (socket.io/socket.io.js)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


//eventlistener for ne socket connection
//requested by browsers
// the socket object is about the request info
//each socket connection has an id
io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
});

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});
