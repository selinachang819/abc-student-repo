var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;

let totalPlayers
let gameStatus="waiting";

// let players = [];
let defaultY = 350;
let players = [
  {
    status: "inactive",
    index: 0,
    id: "",
    team: "Red",
    x: 126,
    y: defaultY
  },
  {
    status: "inactive",
    index: 1,
    id: "",
    team: "Red",
    x: 344-10,
    y: defaultY
  },
  {
    status: "inactive",
    index: 2,
    id: "",
    team: "Red",
    x: 578+10,
    y: defaultY
  },
  {
    status: "inactive",
    index: 3,
    id: "",
    team: "Red",
    x: 734+10,
    y: defaultY
  },
  {
    status: "inactive",
    index: 4,
    id: "",
    team: "Blue",
    x: 266-10,
    y: defaultY
  },
  {
    status: "inactive",
    index: 5,
    id: "",
    team: "Blue",
    x: 422-10,
    y: defaultY
  },
  {
    status: "inactive",
    index: 6,
    id: "",
    team: "Blue",
    x: 656+10,
    y: defaultY
  },
  {
    status: "inactive",
    index: 7,
    id: "",
    team: "Blue",
    x: 874,
    y: defaultY
  }
]

let ballWidth=50;

let ballX = 500;
let ballY = 250;
let ballSpdX = 5;
let ballSpdY = 5;

let redScore = 0;
let blueScore = 0;

app.use(express.static('public'));

//started the game 3 secs after all players are on the field
// started from the kickoff point
// setTimeout()

//the server sending gameData every 50 milisecs
setInterval(()=>{
  totalPlayers=players.filter((player)=>{
    return player.status == "active";
  }).length;
  if (totalPlayers==8) {
    gameStatus="starts";
  }
  // move the ball when the game starts
  if (gameStatus=="starts") {
      ballX += ballSpdX;
      ballY += ballSpdY;
      if (ballX > 1000-ballWidth|| ballX <= 0) {
        ballSpdX = -ballSpdX
      }
      if (ballY > 800-ballWidth || ballY <= 0) {
        ballSpdY = -ballSpdY
      }
      // check if the ball touches any of the players
      for (var i = 0; i < players.length; i++) {
        if (ballX+ 50 >= players[i].x && ballX <= players[i].x+20 && ballY +50 >= players[i].y &&ballY <= players[i].y+100 ) {
          ballSpdY = -ballSpdY;
          ballSpdX = -ballSpdX;
        }
      }
      ballY>=295&&ballY<=359
      //check which team scores;*ballY needed
      if (ballX <= 0 &&ballY>=295&&ballY<=359) {
        blueScore += 1;
      }
      if (ballX >= 1000 &&ballY>=295&&ballY<=359) {
        redScore += 1;
      }
    }

  if (gameStatus=="starts" && (redScore==7||blueScore==7)) {
      gameStatus="waiting";
      io.emit('ending', {redScore:redScore, blueScore:blueScore, status:"end"});
      console.log(redScore, blueScore);
      redScore=0;
      blueScore=0;
      ballX = 500;
      ballY = 250;
      ballSpdX = 5;
      ballSpdY = 5;
      totalPlayers=0;
      }
  io.emit('gameData', {
      ball:{
        ballX: ballX,
        ballY: ballY,
        ballSpdX: ballSpdX,
        ballSpdY: ballSpdY
      },
      players: players,
      playerNum: totalPlayers,
      gameStatus: gameStatus,
      scores:{
        redTeam: redScore,
        blueTeam: blueScore,
      }
  })
  // *end the game and restart
}, 50)



  // the game data is updated every 50 miliseconds

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
  if (gameStatus=="starts") {
    socket.emit('role',{role:"audience"});
  }
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
        socket.emit("role", {role: "audience"})
      }
      if (availablePlayerIndex<=3){
        socket.join('teamRed');
        players[availablePlayerIndex].id = socket.id;
        players[availablePlayerIndex].status = "active";
      }
      if (availablePlayerIndex>3&&availablePlayerIndex<=7) {
        socket.join('teamBlue');
        players[availablePlayerIndex].id = socket.id;
        players[availablePlayerIndex].status = "active";
      }
        socket.emit("role", {role:players[availablePlayerIndex].index, team:players[availablePlayerIndex].team})
      }
      console.log(players)
      console.log("-----")
    if (data.message == "someone wanna watch the game") {
      socket.emit('role',{role:"audience"});
    }
});
  socket.on('keyup',(data)=>{
    players[data.index].y -=5;
  })
  socket.on('keydown',(data)=>{
    players[data.index].y +=5;
  })
  // the chat message will only be sent to the same room;
  socket.on('chatMessage',(data)=>{
    console.log(data);
    if (data.role<=3) {
      io.to('teamRed').emit('chatting', data);
    }
    else if (data.role>3&&data.role<=7) {
      io.to('teamBlue').emit('chatting', data);
    }
  })
    // when one socket is disconnected, set the player status back to inactive
  socket.on('disconnect', () => {
      let quitPlayerIndex=players.findIndex((player)=>{
        return player.id == socket.id;
      })
      if(quitPlayerIndex!=-1){
        players[quitPlayerIndex].id ="";
        players[quitPlayerIndex].status ="inactive";
        players[quitPlayerIndex].y =defaultY;
        console.log('user disconnected' +socket.id);
        io.emit('missingPlayers',{role: quitPlayerIndex});
      }
    });
    // the client send the server who he's replacing
    //set the status to active again;
  socket.on('replace',(data)=>{
    let replaceRole= data.role;
    console.log(replaceRole);
    players[replaceRole].id=socket.id;
    socket.emit("role", {role:players[replaceRole].index, team:players[replaceRole].team})
    io.emit('replaceSuccess',{role:replaceRole});
    if (replaceRole<=3){
      socket.join('teamRed');
      players[replaceRole].status = "active";
    }
    if (replaceRole>3&&replaceRole<=7) {
      socket.join('teamBlue');
      players[replaceRole].status = "active";
    }
    console.log(socket.id , players);
  })
  // if (redScore==7||blueScore==7) {
  //   io.emit('ending', {redScore:redScore, blueScore:blueScore});
  //   console.log(redScore, blueScore);
  //   redScore=0;
  //   blueScore=0;
  //   }
})

http.listen(port, () => {
  console.log('listening on *:' + port);
});
