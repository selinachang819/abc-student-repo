let figure= document.getElementById('figure');
let all= document.getElementById('all');
let music= document.getElementById('disco');
let btn =document.getElementById('button');
let btn2 =document.getElementById('button2');
let musicPlay= true;

btn2.addEventListener('click',()=>{

  if (musicPlay==true) {
    music.pause();
    musicPlay=false;
  }
  else {
    musicPlay=true;
    music.play();
  }
})
//oscillator-1
let context = new AudioContext();
let destination=context.destination;
let oscillator = context.createOscillator();
oscillator.type="triangle";
oscillator.frequency.value = 440;
let gain = context.createGain();
oscillator.connect(gain);
gain.connect(destination);

let oscillatorStarted = false;
let figureMoved= false;

//toggle to move the robots
//based on the mouse position, frequency and gain of the oscillator is changed accordingly
figure.addEventListener('click',(event)=>{
        if(!oscillatorStarted){
        oscillator.start(0);
        oscillatorStarted = true;
        }
        if (figureMoved==false) {
          figureMoved=true;
          gain.gain.value=0;
          figure.src="images/robot-dancing.gif";

        } else {
          figureMoved=false;
          gain.gain.value = 0.1;

        }
        console.log(figureMoved);
        all.addEventListener('mousemove',(event)=>{

            if (figureMoved==true) {
              let mouseX= event.clientX;
              let mouseY= event.clientY;
              figure.style.left=mouseX - 74 + "px";
              figure.style.top= mouseY- 81 + "px";
              oscillator.frequency.value= mouseX/screen.width*1000;
              gain.gain.value = (screen.height-mouseY)/screen.height*0.5;
            }else{
              figure.addEventListener('click', (event)=>{
                let mouseX= event.clientX;
                let mouseY= event.clientY;
                figure.style.left=mouseX - 74 + "px";
                figure.style.top= mouseY- 81 + "px";
                oscillator.frequency.value= mouseX/screen.width*1000;
                gain.gain.value = (screen.height-mouseY)/screen.height*0.5;
              })
            }
        })
        });
//create new robot and do the same
  button.addEventListener('click',()=>{
      let robot= document.createElement("img");
      robot.src="images/robot-1.png";
      robot.id="robot";
      document.body.appendChild(robot);

      let context = new AudioContext();
      let destination=context.destination;
      let oscillator = context.createOscillator();
      oscillator.type="triangle";
      oscillator.frequency.value = 440;
      let gain = context.createGain();
      oscillator.connect(gain);
      gain.connect(destination);

      let oscillatorStarted = false;
      let robotMoved= false;

      robot.addEventListener('click',(event)=>{
              if(!oscillatorStarted){
              oscillator.start(0);
              oscillatorStarted = true;
              }
              if (robotMoved==false) {
                robotMoved=true;
                gain.gain.value=0;
                robot.src="images/robot-dancing.gif";

              } else {
                robotMoved=false;
                gain.gain.value = 0.1;

              }
              all.addEventListener('mousemove',(event)=>
                { if (robotMoved==true) {
                  let mouseX= event.clientX;
                  let mouseY= event.clientY;
                  robot.style.left=mouseX - 74 + "px";
                  robot.style.top= mouseY- 81 + "px";
                  oscillator.frequency.value= mouseX/screen.width*1000;
                  gain.gain.value = (screen.height-mouseY)/screen.height*0.5;
                }
                else{
                  robot.addEventListener('click', (event)=>{
                    let mouseX= event.clientX;
                    let mouseY= event.clientY;
                    robot.style.left=mouseX - 74 + "px";
                    robot.style.top= mouseY- 81 + "px";
                    oscillator.frequency.value= mouseX/screen.width*1000;
                    gain.gain.value = (screen.height-mouseY)/screen.height*0.5;
                  });
                }
                });
      });
      });
