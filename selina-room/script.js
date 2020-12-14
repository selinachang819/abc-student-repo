let on =document.getElementById('on');
let off= document.getElementById('off');
let music= document.getElementById('music');

on.addEventListener('click',()=>{
  music.pause();
  on.style.display="none";
  off.style.display="block";
})
off.addEventListener('click',()=>{
  music.play();
  on.style.display="block";
  off.style.display="none";
})
