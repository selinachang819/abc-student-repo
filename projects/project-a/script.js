let colorInput= document.getElementById('input');
let intro= document.getElementById('intro');
let start= document.getElementById('initial');
let piano=document.getElementById('keyboard');
let painting=document.getElementById('painting');
let pause=document.getElementById('pause');
let resume=document.getElementById('resume');
let downloadButton=document.getElementById('dl');
let restart=document.getElementById('restart');
let noteFreq=["261.63","293.66","329.63","349.23","392","440","493.88","523.25","587.33","659.25"];
let tetrisStyles=[
  {width:50,height:50},
  {width:100,height:100},
  {width:50,height:100},
  {width:100,height:50},
  {width:50,height:150},
  {width:150,height:50},
]
let colorCondition=0;
colorInput.addEventListener('change',()=>{
  document.getElementById('title').style.backgroundColor=colorInput.value;
  resume.style.backgroundColor=colorInput.value;
  restart.style.backgroundColor=colorInput.value;
  downloadButton.style.backgroundColor=colorInput.value;
  document.getElementById('start').innerHTML="Now, press spacebar to start! Then press again to pause!";
})

let context = new AudioContext();
let destination=context.destination;
let oscillator = context.createOscillator();
oscillator.type="sine";
oscillator.frequency.value = 440;
let gain = context.createGain();
oscillator.connect(gain);
gain.connect(destination);

let oscillatorStarted = false;
let statusPlayed=false;

document.body.addEventListener('keypress',(event)=>{
  if(!oscillatorStarted){
    oscillator.start(0);
    oscillatorStarted = true;
  }
  let x = event.keyCode;
   if (x==32 && statusPlayed==false) {
    oscillator.frequency.value=noteFreq[4];
    gain.gain.value=0.5;
    painting.style.width=screen.width;
    painting.style.height=screen.height;
    statusPlayed=true;
    intro.style.display="none";
    pause.style.display="block";
    start.style.display="none";
    piano.style.visibility="visible";
    console.log(statusPlayed);
    piano.style.opacity=1;
    painting.style.opacity=1;
  }
  else if (x==32 && statusPlayed==true) {
    oscillator.frequency.value=noteFreq[4];
    gain.gain.value=0.5;
    statusPlayed=false;
    intro.style.display="block";
    painting.style.opacity=0.7;
    piano.style.opacity=0.7;
    console.log(statusPlayed);
  }
  })
document.body.addEventListener('keydown',(event)=>{
    let x = event.keyCode;
    let h =colorInput.value.slice(1,7).match(/.{1,2}/g);
    let r= parseInt(h[0],16);
    let g= parseInt(h[1],16);
    let b= parseInt(h[2],16);
    console.log(r, g, b);
    let colorCondition=0;
    if( r>= g && r>=b ){
      colorCondition=1;
    }
    else if (g>=r && g>=b) {
      colorCondition=2;
    }
    else if (b>= g && b>=r) {
      colorCondition=3;
    }
    console.log(x);

    if (x==65) {
      oscillator.frequency.value=noteFreq[0];
      gain.gain.value=0.5;
      document.getElementById('a').style.backgroundColor=colorInput.value;
      let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="5px";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";

      console.log(colorCondition);
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==83) {
      oscillator.frequency.value=noteFreq[1];
      gain.gain.value=0.5;
      document.getElementById('s').style.backgroundColor=colorInput.value;
      let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="10%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==68) {
      oscillator.frequency.value=noteFreq[2];
      gain.gain.value=0.5;
      document.getElementById('d').style.backgroundColor=colorInput.value;
      let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="20%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==70) {
      oscillator.frequency.value=noteFreq[3];
      gain.gain.value=0.5;
      document.getElementById('f').style.backgroundColor=colorInput.value;
      let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
       newTetris.style.left="30%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==71) {
      oscillator.frequency.value=noteFreq[4];
      gain.gain.value=0.5;
      document.getElementById('g').style.backgroundColor=colorInput.value;
      let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="40%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==72) {
      oscillator.frequency.value=noteFreq[5];
      gain.gain.value=0.5;
      document.getElementById('h').style.backgroundColor=colorInput.value;let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
       newTetris.style.left="50%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==74) {
      oscillator.frequency.value=noteFreq[6];
      gain.gain.value=0.5;
      document.getElementById('j').style.backgroundColor=colorInput.value;let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="60%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==75) {
      oscillator.frequency.value=noteFreq[7];
      gain.gain.value=0.5;
      document.getElementById('k').style.backgroundColor=colorInput.value;let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="70%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==76) {
      oscillator.frequency.value=noteFreq[8];
      gain.gain.value=0.5;
      document.getElementById('l').style.backgroundColor=colorInput.value;let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="80%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
    else if (x==186) {
      oscillator.frequency.value=noteFreq[9 ];
      gain.gain.value=0.5;
      document.getElementById('p').style.backgroundColor=colorInput.value;let newTetris=document.createElement("div");
      let randomTetris=Math.floor(Math.random()*6);
      newTetris.className="tetris";
      painting.appendChild(newTetris);
      let pos = 0;
      let id = setInterval(frame, 5);
      let tetrisPos=40+Math.floor((screen.height-tetrisStyles[randomTetris].height)/screen.height*50) *Math.floor(Math.random()*14);
      console.log(tetrisPos);
      function frame() {
         if (pos == tetrisPos) {
           clearInterval(id);
         } else {
           pos++;
           newTetris.style.top = pos + 'px';
         }
       }
      newTetris.style.left="88%";
      newTetris.style.width=tetrisStyles[randomTetris].width+"px";
      newTetris.style.height=tetrisStyles[randomTetris].height+"px";
      if (colorCondition==1) {
         r= parseInt(h[0],16);
         g= 50+ Math.floor(Math.random()*51);
         b= 50+ Math.floor(Math.random()*156);;
      }
      else if (colorCondition==2) {
         r= 50+ Math.floor(Math.random()*51);
         g= parseInt(h[1],16);
         b= Math.floor(Math.random()*256);
      }
      else if (colorCondition==3) {
         r= 50+ Math.floor(Math.random()*156);
         g= 50 + Math.floor(Math.random()*51);
         b= parseInt(h[2],16);
      }
      tetrisColor="rgb("+ r + "," + g + "," + b +")";
      newTetris.style.backgroundColor=tetrisColor;
      console.log(tetrisColor);
    }
})
document.body.addEventListener('keyup',(event)=>{
    gain.gain.value=0;
    let x = event.keyCode;
    console.log(x);
    if (x==65) {
      document.getElementById('a').style.backgroundColor="white";
    }
    else if (x==83) {
      document.getElementById('s').style.backgroundColor="white";
    }
    else if (x==68) {
      document.getElementById('d').style.backgroundColor="white";
    }
    else if (x==70) {
      document.getElementById('f').style.backgroundColor="white";
    }
    else if (x==71) {
      document.getElementById('g').style.backgroundColor="white";
    }
    else if (x==72) {
      document.getElementById('h').style.backgroundColor="white";
    }
    else if (x==74) {
      document.getElementById('j').style.backgroundColor="white";
    }
    else if (x==75) {
      document.getElementById('k').style.backgroundColor="white";
    }
    else if (x==76) {
      document.getElementById('l').style.backgroundColor="white";
    }
    else if (x==186) {
      document.getElementById('p').style.backgroundColor="white";
    }
})

resume.addEventListener('click',()=>{
  intro.style.display="none";
  statusPlayed=true;
  piano.style.opacity=1;
  painting.style.opacity=1;
})
restart.addEventListener('click',()=>{
  window.location.reload();
})
downloadButton.addEventListener('click',()=>{
    painting.style.opacity=1;
  html2canvas(document.querySelector("#painting")).then(canvas => {
      let dt =canvas.toDataURL('images/png');
      download(dt, "my work.png", "image/png")
  });
})
