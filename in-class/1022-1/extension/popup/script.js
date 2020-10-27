let number= document.getElementById('number');
let btn = document.getElementById('btn');
let currentValue=0;


chrome.runtime.sendMessage( {type:"getCurrentValue"} , function(response){
  console.log("response is", response);

  currentValue =response.value;
  number.innerHTML=currentValue;
});

btn.addEventListener('click',()=>{
  currentValue+=1;
  number.innerHTML=currentValue;

  chrome.runtime.sendMessage({type:"increasedValue"})
})
