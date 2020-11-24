let info=document.getElementById('info');
let pet=document.getElementById('pet');
let poop=document.getElementById('poop');
let icon=document.getElementById('icon');
let instruction= document.getElementById('instruction');
let stroll=document.getElementById('stroll');
let feed =document.getElementById('feed');
let bath =document.getElementById('bath');
let growth=document.getElementById('growth');
let level= document.getElementById('level');
let levelPoint= document.getElementById('levelPoint');

let toggle=false;

let socket = io();

stroll.style.visibility="hidden";
bath.style.visibility="hidden";
instruction.style.visibility="hidden";


icon.addEventListener('click',()=>{
  if (toggle==false) {
    toggle=true;
    instruction.style.visibility="visible";
  } else if (toggle==true) {
    toggle=false;
    instruction.style.visibility="hidden";
  }
})
stroll.addEventListener('click',()=>{
  info.innerHTML="You took it for a walk!";
  let data= {msg:"Someone took it for a walk!"};
  socket.emit('message', data);
})
feed.addEventListener('click',()=>{
  info.innerHTML="You gave it some snacks!";

  let data= {msg:"Someone fed the pet!"};
  socket.emit('message', data);
})
bath.addEventListener('click',()=>{
  info.innerHTML="You took it for a shower!";
  let data= {msg:"Someone cleaned it up!"};
  socket.emit('message', data);
})


socket.on('incoming',(data)=>{
  console.log(data);
  info.innerHTML=data.announcement;
  if (data.availability=="not available") {
    pet.style.visibility="hidden";
    setTimeout(()=>{
    pet.style.visibility="visible";
    info.innerHTML="It's back!"
  }, 10000)
  }
});

socket.on('broadcast',(data)=>{
  console.log(data);
  growth.innerHTML=data.count;
  level.innerHTML=data.level;
  levelPoint.innerHTML=data.maximum;
  pet.src=data.selection;
  if (data.count<10) {
    feed.innerHTML="Hatch";
  }
  if (data.count>=10) {
    feed.innerHTML="Feed";
    stroll.style.visibility="visible";
    bath.style.visibility="visible";
  }
})

socket.on('bathroom',(data)=>{
  if (data.status=="need a bath") {
    console.log("bath");
    info.innerHTML="It needs a bath!";
    poop.style.visibility="visible";
  }
  if (data.status=="clean") {
    console.log("washed");
    poop.style.visibility="hidden";
  }
})
