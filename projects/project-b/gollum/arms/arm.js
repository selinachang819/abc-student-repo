chrome.runtime.sendMessage('appendage');
var resizeTimeout;
window.onresize = function(e) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function (){
    window.resizeTo(200, 150);
  }, 200);
};
