let role = sessionStorage.getItem('role');
console.log(role);

let players = [];
//print scores
let redScore = document.getElementById('red');
let blueScore = document.getElementById('blue');

// the field
let ballX
let ballY
let ballSpdX
let ballSpdY
let paddleWidth
let playerX
let playerY

let socket = io();

let canvasW
let canvasH

let img
function preload() {
  img = loadImage('ball.png');
}

function setup() {
  canvasW = document.getElementById('canvasContainer').offsetWidth;
  canvasH = document.getElementById('canvasContainer').offsetHeight;
  let myCanvas = createCanvas(canvasW, canvasH);
  myCanvas.parent('canvasContainer');
  paddleWidth = 40;
  frameRate(10);
  image(img, ballX, ballY);
}

function draw() {
  background(135, 201, 129);
  field();
  keyPressed();
  render();
  // ball();
}

function field() {
  fill(255, 204, 0)
  rect(0, 0, 1000, 1000) //background yellow part

  fill(0)
  noStroke()
  rect(100, 120, 800, 550) //black background

  fill(92, 214, 92)
  noStroke()
  rect(200, 200, 600, 400) // field
  fill(255)
  rect(495, 200, 10, 400) //中线

  stroke(255);
  strokeWeight(10);
  noFill()
  circle(500, 400, 100)
}

//playerY
function keyPressed(){
  if(keyIsPressed === true){
      if (keyCode === UP_ARROW) {
        socket.emit("message",{index: role, message:"the key is up"})
      } else if (keyCode === DOWN_ARROW) {
        socket.emit("message",{index: role, message:"the key is down"})
      }
    }

}
  // function keyRelease

function render() {
    //put the players in the draw loop
    socket.on("gameData", (data) => {
      players = data.players;
      let ballInfo=data.ball;
      for(let i = 0; i <= players.length; i++) {
        rect(players[i].x-5, players[i].y-25, 10, 50)
      }
     }
    )
  }
  // function player1() {
  //   fill('rgb(255,0,0)');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="0") {
  //     rect(100, data.mouseY, 10, 50 );
  //   }
  //   })
  // }
  // function player2() {
  //   fill('blue');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="1") {
  //     rect(200, data.mouseY, 10, 50 );
  //   }
  // })
  // }
  // function player3() {
  //   fill('red');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="2") {
  //     rect(300, data.mouseY, 10, 50 );
  //   }
  // })
  // }
  // function player4() {
  //   fill('blue');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="3") {
  //     rect(400, data.mouseY, 10, 50 );
  //   }
  // })
  // }
  // function player5() {
  //   fill('red');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="4") {
  //     rect(600, data.mouseY, 10, 50 );
  //   }
  // })
  // }
  // function player6() {
  //   fill('blue');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="5") {
  //     rect(700, data.mouseY, 10, 50 );
  //   }
  // })
  // }
  // function player7() {
  //   fill('red');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="6") {
  //     rect(800, data.mouseY, 10, 50 );
  //   }
  // })
  // }
  // function player8() {
  //   fill('blue');
  //   socket.on('playerPositions',(data)=>{
  //   if (data.role=="7") {
  //     rect(900, data.mouseY, 10, 50 );
  //   }
  // });
  // }
