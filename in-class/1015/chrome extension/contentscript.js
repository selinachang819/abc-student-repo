function repl(find, replace){

  // comment out our initial, crude approach to finding and replacing text:
  // var finder = new RegExp(find,"g");
  // document.body.innerHTML = document.body.innerHTML.replace(finder, replace);

  // Here we use the library instead
  // from: https://github.com/padolsey/findAndReplaceDOMText
  findAndReplaceDOMText(document.body, {
    find: find,
    replace: replace
  })
}


function gotMessage(request, sender, sendResponse){
  console.log(request);
  repl(request.find, request.replace)
}

chrome.runtime.onMessage.addListener(gotMessage);
