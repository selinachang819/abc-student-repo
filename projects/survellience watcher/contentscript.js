console.log('heyyy');
let list = Array.from(document.querySelectorAll('a'));
let watcherOn=false;
function replace(toggle) {
  watcherOn=toggle;
  for (var i = 0; i < list.length; i++) {
   let k = i;
   let originalText=list[k].innerHTML;
   let originalColor=list[k].style.color;

  if (watcherOn==1) {

     list[k].addEventListener('mouseover', ()=>{
         list[k].innerHTML="You are being watched!!!";
         list[k].style.color="red";
     })
     list[k].addEventListener('mouseout',()=>{
       list[k].innerHTML=originalText;
       list[k].style.color=originalColor;
     })
   }
   else if (watcherOn==0) {
     list[k].addEventListener('mouseover', ()=>{
       list[k].innerHTML=originalText;
       list[k].style.color=originalColor;
     })
   }
  }
}

function gotMessage(request, sender, sendResponse){
  replace(request);
  console.log(request)
}

chrome.runtime.onMessage.addListener(gotMessage);
