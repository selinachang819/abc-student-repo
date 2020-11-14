let btn1= document.getElementById('button1');
let btn2= document.getElementById('button2');
let text=document.getElementById('text');

btn1.addEventListener('click',()=>{
  window.open('http://localhost:3000/result?answer=one');
})
btn2.addEventListener('click',()=>{
  window.open('http://localhost:3000/result?answer=two');
})
