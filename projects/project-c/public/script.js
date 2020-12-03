let socket = io();

let number
let join=document.getElementById('join');
let watch=document.getElementById('watch');
let text1=document.getElementById('text1');
let text2=document.getElementById('text2');

join.addEventListener('click',()=>{
  socket.emit('message',{message:"someone wanna join the game"});
  join.style.display="none";
  watch.style.display="none";
  // text2.innerHTML="Please wait until the game starts!";
})

watch.addEventListener('click',()=>{
  socket.emit('message',{message:"someone wanna watch the game"});
  join.style.display="none";
  watch.style.display="none";
  // text2.innerHTML="Please wait until the game starts!";
})

socket.on('role',(data)=>{
  console.log(data);
  sessionStorage.setItem('role',data.role);
})

socket.on('gameData',(data)=>{
  console.log(data);
  number=data.playerNum;
  text1.innerHTML="Currently "+number+ " people are waiting.";
  if (data.gameStarted==true) {
    console.log(data.gameStarted);
    text1.style.display="hidden";
    text2.innerHTML="The game will start soon!";
    setTimeout(()=>{
      window.location.href="/field";
    }, 3000);
  }
})
