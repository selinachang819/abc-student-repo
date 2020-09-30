let box=document.getElementById('box');
let button=document.getElementById('button');
let boxAngle = 0;
let buttonAngle = 0;
button.addEventListener('click',()=>{
  boxAngle = boxAngle + 360;
  box.style.transform="rotate("+boxAngle+"deg)";
})

box.addEventListener('click',()=>{
  console.log(buttonAngle);
  buttonAngle = buttonAngle + 360;
  button.style.transform="rotate("+buttonAngle+"deg)";
})
