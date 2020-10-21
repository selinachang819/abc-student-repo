let btn= document.getElementById('btn');
let text = document.getElementById('text');

let watcherOn=0;

btn.addEventListener('click',()=>{
  if (watcherOn==0) {
    watcherOn=1;
    btn.src="images/open.png";
    text.innerHTML="Click me to stop!";
  }
  else if (watcherOn==1) {
    watcherOn=0;
    btn.src="images/closed.png";
    text.innerHTML="Click me to start!";
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let message = watcherOn;

    chrome.tabs.sendMessage(tabs[0].id, message);
    console.log(message)
  });

})
