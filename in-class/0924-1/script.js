let btn =document.getElementById("btn");
console.log(btn);
let screenWidth =window.screen.width;
let screenHeight =window.screen.height;

function openWindow(){
  console.log("heyyy");
  let randomX= Math.random()*(screenWidth-200);
  let randomY=Math.random()*(screenHeight-100);
  let newWindow= window.open("","", "width= 200, height= 10, top="+randomY+", left="+randomX+" ");

let randomTime =1000+ Math.random()*4000;
  setTimeout(function(){
    newWindow.close();
  }, randomTime);
}

function manyWindows(){
  for(i=0; i<5; i++) {
    openWindow();
  }
}

btn.addEventListener("click",manyWindows);
