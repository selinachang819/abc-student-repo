let word= document.getElementById('input');
let btn= document.getElementById('button');
let sentence=document.getElementById('words');
let relayWords

function createRelay(data) {
  relayWords=data.relayWords;
  console.log(relayWords);
  sentence.innerHTML="";
  relayWords.forEach((item, i) => {
  let word= document.createElement("span");
  word.innerHTML=relayWords[i] + "->";
  sentence.appendChild(word);})
  ;
}

btn.addEventListener('click',()=>{
  word.style.display="inline";
  btn.innerHTML="Go!";
  let relayWord=word.value;
  fetch('/relay?word='+relayWord)
  .then((data)=>{return data.json()})
  .then(createRelay);
  word.value="";
})
