let on =document.getElementById('on');
let off = document.getElementById('off');

let context = new AudioContext();
console.log(context);

let oscillator =context.createOscillator();
oscillator.type= "triangle";
oscillator.frequency.value =440;

let gain =context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);

let oscillatorStarted= false;

on.addEventListener('click', ()=>{
  if (oscillatorStarted == false) {
    oscillatorStarted= true;
    oscillator.start(0);
  }

  gain.gain.value=0;
})
off.addEventListener('click', ()=>{
  gain.gain.value=0;
})
