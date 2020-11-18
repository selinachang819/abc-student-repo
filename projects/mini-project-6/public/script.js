let btn= document.getElementById('button');
let input= document.getElementById('input');
let hint=document.getElementById('hint');

btn.addEventListener('click',()=>{
  let guess=input.value;
  console.log(guess);
  window.location.href="/result?answer="+guess;
  input.value="";
})
