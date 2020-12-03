var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let totalPlayers
let gameStarted=false;

// let players = [];
let defaultY = 400;
let players = [
  {
    status: "inactive",
    index: 0,
    id: "",
    team: "red",
    x: 200+60,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 1,
    id: "",
    team: "red",
    x: 200+120,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 2,
    id: "",
    team: "red",
    x: 200+180,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 3,
    id: "",
    team: "red",
    x: 200+240,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 4,
    id: "",
    team: "blue",
    x: 200+360,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 5,
    id: "",
    team: "blue",
    x: 200+420,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 6,
    id: "",
    team: "blue",
    x: 200+480,
    y: defaultY,
  },
  {
    status: "inactive",
    index: 7,
    id: "",
    team: "blue",
    x: 200+540,
    y: defaultY,
  }
]


let ballX = 500;
let ballY = 250;
let ballSpdX = 5;
let ballSpdY = 5;

let redScore = 0;
let blueScore = 0;

app.use(express.static('public'));


setInterval(() => {
  totalPlayers=players.filter((player)=>{
    return player.status == "active";
  }).length;
  if (totalPlayers==8) {
    gameStarted=true;
  }
  ballX += ballSpdX;
  ballY += ballSpdY;
  if (ballX > 800 || ballX <= 200) {
    ballSpdX = -ballSpdX
  }
  if (ballY > 600 || ballY <= 200) {
    ballSpdY = -ballSpdY
  }
  //
  // if (ballX >=  - 20 && ballX < mouseX + 20 && ballY >= mouseY - 10 && ballY <= mouseY + 20) {
  //   ballSpdY = -ballSpdY
  // }
}, 50)// the game data is updated every 50 miliseconds

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
  let socketId = socket.id;
// send message for each client

// if someone indicated that they wanna join the game
//check if there is seat for him
  socket.on('message', (data) => {
    if (data.message == "someone wanna join the game") {
      let availablePlayerIndex = players.findIndex((player)=>{
        return player.status == "inactive"
      })
      // availablePlayer is -1 id no "inactive" player was found
      // otherwise it will return the index of the available player
      if(availablePlayerIndex == -1){
        // notify the client that the game is full
        socket.emit("role", {role: "none"})
      } else{
        players[availablePlayerIndex].id = socketId;
        players[availablePlayerIndex].status = "active";
        socket.emit("role", {role:players[availablePlayerIndex].index})
      }
      socket.on('disconnect', () => {
        players[availablePlayerIndex].id = "";
        players[availablePlayerIndex].status = "inactive";
        players[availablePlayerIndex].y = defaultY;
        console.log('user disconnected '+ socket.id);
        console.log(players)
        console.log("-----")
      });

      console.log(players)
      console.log("-----")
    }
    if (data.message == "someone wanna watch the game") {
      socket.emit('role',{role:"audience"});
    }
    //key interaction
    if(data.message == "the key is up"){
      players[data.index].y -=5;
      console.log("player " + data.index +" is pressing up",  players[data.index].y)
    }
    if(data.message =="the key is down"){
      players[data.index].y +=5;
      console.log("player " + data.index +" is pressing down", players[data.index].y )
    }
});
      setInterval(()=>{
        io.emit('gameData', {
          ball:{
            ballX: ballX,
            ballY: ballY,
            ballSpdX: ballSpdX,
            ballSpdY: ballSpdY
          },
          players: players,
          playerNum: totalPlayers,
          gameStarted: gameStarted,
          scores:{
            redTeam: redScore,
            blueTeam: blueScore,
          }
      })
    },10);
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});
