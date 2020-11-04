function rotate(request) {
  let rotateAngle= request;
  console.log(rotateAngle);
  let eye= document.querySelectorAll(".eye");
  eye.forEach(function(eye) {
    eye.style.transform="rotate("+rotateAngle+"deg)";
  });
  // document.getElementById('head').style.transform="rotate("+rotateAngle+"deg)";
}

function gotMessage(request, sender, sendResponse){
  rotate(request);
  console.log(request);
}

chrome.runtime.onMessage.addListener(gotMessage);

var resizeTimeout;
window.onresize = function(e) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function (){
    window.resizeTo(225, 250);
  }, 200);
};
