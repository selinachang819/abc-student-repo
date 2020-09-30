//select items
let slider=document.getElementById('slider');
let clock=document.getElementById('clock');
let time=["images/7pm.png","images/9pm.png", "images/11pm.png"];
let button=document.getElementById('button');
//make arrays for random selection
let windows1=["7-1.html","7-2.html","7-3.html","7-4.html","7-5.html"];
let windows2=["9-1.html","9-2.html","9-3.html","9-4.html","9-5.html"];
let windows3=["11-1.html","11-2.html","11-3.html","11-4.html","11-5.html"];
let windows=[windows1, windows2, windows3];
let screenWidth =window.screen.width;
let screenHeight =window.screen.height;

//open many windows based on slider value
function manyWindows(){
  for (var i = 0; i <5 ; i++) {
    let itemRandom= Math.floor(Math.random() * 4);
    let randomX= Math.random()*(screenWidth-200);
    let randomY=Math.random()*(screenHeight-300);
    console.log(randomX, randomY);
    console.log(slider.value);
    console.log(windows[slider.value][itemRandom]);

    let newWindow= window.open("pages/"+windows[slider.value][i]+"","", "width= 200, height= 200, top="+randomY+", left="+randomX+" ");
    setTimeout(()=>{
      newWindow.close();
    },5000)
    }
  }
//change clock time
function changeTime(){
    let t =slider.value;
    clock.src=time[t];
    console.log(t);
  }
slider.addEventListener('input',changeTime);
button.addEventListener('click',manyWindows);
