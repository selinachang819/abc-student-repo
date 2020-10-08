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
    btn2.innerHTML="Keeps playing!";
    gain.gain.value=0;
    gain1.gain.value=0;
  }
  else {
    musicPlay=true;
    music.play();
    btn2.innerHTML="Stop the music!!!";
    gain.gain.value=0.1;
    gain1.gain.value=0.1;
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
          figure.src="images/robot-dancing.gif";

        } else {
          figureMoved=false;
        }
        console.log(figureMoved);
        all.addEventListener('mousemove',(event)=>{

            if (figureMoved==true) {
              let mouseX= event.clientX;
              let mouseY= event.clientY;
              figure.style.left=mouseX - 74 + "px";
              figure.style.top= mouseY- 81 + "px";
              oscillator.frequency.value= mouseX/screen.width*1000;
            }else{
              figure.addEventListener('click', (event)=>{
                let mouseX= event.clientX;
                let mouseY= event.clientY;
                figure.style.left=mouseX - 74 + "px";
                figure.style.top= mouseY- 81 + "px";
                oscillator.frequency.value=mouseX/screen.width*1000;;
              })
            }
        })
        });

        let context1 = new AudioContext();
        let destination1=context1.destination;
        let oscillator1 = context1.createOscillator();
        oscillator1.type="triangle";
        oscillator1.frequency.value = 440;
        let gain1 = context1.createGain();
        oscillator1.connect(gain1);
        gain1.connect(destination1);

//create new robot and do the same
  button.addEventListener('click',()=>{
      let robot= document.createElement("img");
      robot.src="images/robot-1.png";
      robot.id="robot";
      document.body.appendChild(robot);

      let oscillatorStarted = false;
      let robotMoved= false;
      robot.addEventListener('click',(event)=>{
              if(!oscillatorStarted){
              oscillator1.start(0);
              oscillatorStarted = true;
              }
              if (robotMoved==false) {
                robotMoved=true;
                robot.src="images/robot-dancing.gif";

              } else {
                robotMoved=false;


              }
              all.addEventListener('mousemove',(event)=>
                { if (robotMoved==true) {
                  let mouseX= event.clientX;
                  let mouseY= event.clientY;
                  robot.style.left=mouseX - 74 + "px";
                  robot.style.top= mouseY- 81 + "px";
                  oscillator1.frequency.value= mouseX/screen.width*1000;;
                }
                else{
                  robot.addEventListener('click', (event)=>{
                    let mouseX= event.clientX;
                    let mouseY= event.clientY;
                    robot.style.left=mouseX - 74 + "px";
                    robot.style.top= mouseY- 81 + "px";
                    oscillator1.frequency.value=mouseX/screen.width*1000;;
                  });
                }
                });
      });
      });
