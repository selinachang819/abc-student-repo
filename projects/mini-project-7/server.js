var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let random1=Math.floor(Math.random()*2);
let random2=Math.floor(Math.random()*6);
let random3=Math.floor(Math.random()*5);

let level3=["/images/lv3-1.png","/images/lv3-2.png"];
let level4=["/images/lv4-1.png","/images/lv4-2.png","/images/lv4-3.png","/images/lv4-4.png","/images/lv4-5.png","/images/lv4-6.png"];
let level5=["/images/lv5-1.png","/images/lv5-2.png","/images/lv5-3.png","/images/lv5-4.png","/images/lv5-5.png"];

let totalCount=0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
  socket.on('message',(data)=>{
    console.log(data.msg);
    socket.broadcast.emit('incoming', {announcement: data.msg})
    if (data.msg=="Someone fed the pet!") {
      totalCount++;
    }
    console.log(totalCount);
    if (data.msg=="Someone took it for a walk!") {
      setTimeout(()=>{
        io.emit('bathroom',{status:"need a bath"})
      },15000)
      socket.broadcast.emit('incoming',{ announcement: data.msg, availability:"not available"});
    }
    if (data.msg=="Someone cleaned it up!") {
      io.emit('bathroom',{status:"clean"});
    }
    if (totalCount<10) {
    io.emit('broadcast',{count:totalCount, selection:"/images/lv1.png", level:1, maximum:10});
    }
    if (totalCount>=10) {
    io.emit('broadcast',{count:totalCount, selection:"/images/lv2.png", level:2, maximum:50});
    }
    if (totalCount>=50) {
    io.emit('broadcast',{count:totalCount, selection:level3[random1], level:3, maximum:100});
    }
    if (totalCount>=100) {
    io.emit('broadcast',{count:totalCount, selection:level4[random2], level:4, maximum:500});
    }
    if (totalCount>=500) {
    io.emit('broadcast',{count:totalCount, selection:level5[random3], level:5, maximum:1000});
    }
    if (totalCount>=1000) {
      io.emit('broadcast',{announcement:"Restart the game!", selection:"/images/lv1.png",level: 1, count:0})
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
