let off = document.getElementById("lp-off");
let on =document.getElementById('lp-on');
let music =document.getElementById('audio');

off.addEventListener("click",function(){
  on.style.visibility="visible";
  off.style.visibility="hidden";
  audio.play();
})
on.addEventListener("click",function(){
  off.style.visibility="visible";
  on.style.visibility="hidden";
  audio.pause();
})
