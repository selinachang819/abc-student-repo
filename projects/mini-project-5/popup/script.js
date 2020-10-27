window.addEventListener('load',startTime);

function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  document.getElementById('time').innerHTML =
  h + ":" + m ;
  let t = setTimeout(startTime, 500);

  if (h>6&& h<23) {
    document.getElementById('text').innerHTML="You are allowed to watch anything!";
  }
  else {
    document.getElementById('text').innerHTML="Time to go to bed!";
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let message = h;
    chrome.tabs.sendMessage(tabs[0].id, message);
    console.log(message)
  });
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
