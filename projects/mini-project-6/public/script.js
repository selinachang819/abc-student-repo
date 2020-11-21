let word= document.getElementById('input');
let btn= document.getElementById('button');
let sentence=document.getElementById('words');
let relayWords

let socket= io();

btn.addEventListener('click',()=>{
  word.style.display="inline";
  btn.innerHTML="Go!";
  let relayWord=word.value;
  //I tried to incorporate socket.io into this project as well so as to improve gamimg experience.
  let data = {word: relayWord}
  socket.emit('relayWords', data);
  word.value="";
  // fetch('/relay?word='+relayWord)
  // .then((data)=>{return data.json()})
  // .then(createRelay);
})

socket.on('addingWords',(data)=>{
  relayWords=data.words;
  console.log(relayWords);
  sentence.innerHTML="";
  relayWords.forEach((item, i) => {
    let word= document.createElement("span");
      word.innerHTML=relayWords[i] + " ->";
      sentence.appendChild(word);
  });

})
// let btn= document.getElementById('button');
// let input= document.getElementById('input');
// let hint=document.getElementById('hint');
//
// btn.addEventListener('click',()=>{
//   let guess=input.value;
//   console.log(guess);
//   window.location.href="/result?answer="+guess;
//   input.value="";
// })
// function createRelay(data) {
//   relayWords=data.words;
//   console.log(relayWords);
//   sentence.innerHTML="";
//   relayWords.forEach((item, i) => {
//   let word= document.createElement("span");
//   word.innerHTML=relayWords[i] + "->";
//   sentence.appendChild(word);})
//   ;
// }
