let range = document.getElementById('slider');
let valueField=document.getElementById('value');

function changeHappened(){
  valueField.innerHTML= range.value;
}

range.addEventListener("change", changeHappened);

function inputHappened(){
  valueField.innerHTML= range.value;
  valueField.style.left =range.value + "px";
}

range.addEventListener("input", inputHappened);
