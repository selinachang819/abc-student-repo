//1. reverse texts every 10 seconds
let myVar
function reverseText() {
    myVar=setInterval(function() {
    let text= Array.from(document.querySelectorAll('p'));

    for (var i = 0; i < text.length; i++) {
      let k= i;
      text[k].innerHTML=text[k].textContent.split(' ').reverse().join(' ');
    }
  },10000)
}
window.onload=reverseText();

//2. mouse tracing
document.body.addEventListener('mousemove',()=>{
  let gollumX= window.innerWidth/2;
  let gollumY= 0;
  let radianDegrees = Math.atan2(event.clientX - gollumX, event.clientY - gollumY);
  let rot = (radianDegrees * (180/Math.PI) * -1) + 270;
 chrome.runtime.sendMessage(rot);
})

//3. generate generics
let greeting = "I'm always watching you.";
let generic1 = "I am watching you..."
let generic2 = "Good choice";
let generic3 = "Huh..Interesting";
let generic4 = "Are you at"+ document.title+"?";
let genericSayings = [generic1, generic2, generic3,generic4];

//4. when the user click anywhere on the page, the gollum will speak
//indicating that he's going to do something to the browser
let synth = window.speechSynthesis;
let active
document.body.addEventListener('click',()=>{
  active=1;
  let genericNumber = Math.floor(Math.random()*4);
  let genericSaying = genericSayings[genericNumber];
  let utter = new SpeechSynthesisUtterance(genericSaying);
  utter.pitch=0.1;
  utter.rate=0.5;
  speechSynthesis.speak(utter);
  console.log(active);
});

//if the mouse doesn't move for 1 minute
//it would ask whether you're still there
let timeout;
document.body.addEventListener('mousemove',()=>{
  clearTimeout(timeout);
  if (active==1) {
    timeout = setTimeout(()=>{
      let utter = new SpeechSynthesisUtterance("Are you still there?");
      utter.pitch=0.1;
      utter.rate=0.5;
      speechSynthesis.speak(utter);
      console.log('active');
    }, 60000);
  }
})
