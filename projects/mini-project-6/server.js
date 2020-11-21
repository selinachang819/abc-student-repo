var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let words=[];


app.use(express.static("public"));


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('relayWords',(data)=>{
    console.log(data.word);
    let word= data.word.trim();
    if (word!="") {
      words.push(word);
      console.log(words);
    }  
    io.emit('addingWords',{words:words});
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname +'/landing/index.html')
// })
// app.get('/result', (req, res) => {
//   let ans=req.query.answer;
//   if (ans=="leo") {
//     res.sendFile(__dirname +"/public/right/index.html")
//   }
//   else{
//     res.sendFile(__dirname +"/public/wrong/index.html")
//   }
// })
//
// app.get('/relay', (req, res) => {
//   let word=req.query.word;
//   if (word!="") {
//     words.push(word);
//     console.log(words);
//     res.json({relayWords:words});
//   }else{
//     res.json({relayWords:words});
//   }
// })
//
//
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
