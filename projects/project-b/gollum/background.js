// three oaths to html pages that display arms etc (appendages)
let leftArmHtml = chrome.extension.getURL('arms/left-arm.html');
console.log(leftArmHtml); //path/to/pahe.html
let rightArmHtml = chrome.extension.getURL('arms/right-arm.html');
let headHtml = chrome.extension.getURL('head/head.html');

// initializes varuiabels. he gives values to them later inside a function
// but he needs these varibales to be global thats why he initializes them up here
let leftArm;
let rightArm;
let head;

let armWidth = 200;
let armHeight = 150;
let headHeight = 225;
let headWidth = 250;
let titleBar = 22;


let displays = [];
// hey chrome, tell me about all the screens/monitors connected to you
// this is mostly going to be just one minotor/display
chrome.system.display.getInfo(function (ds){
  // for each screen, store bounds (left, right, widht, height)
  // inside display array
  // [{left: 10, top: 100, width: 700, height: 500},  ..additional connected screens might be here... ]
  for (let display of ds){
    displays.push(display.bounds);
    console.log(display.bounds);
  }
});
// we will use what we now know about the displays' size later on





// this function runs "on" a window
function bodify(win){
  // loop over the screen/displat/motinro (mostly 1)
  for (let display of displays){
    // check if the window win is inside this screen (mostly 1)
    if (win.left >= display.left && win.left <= display.left + display.width &&
      win.top >= display.top && win.top <= display.top + display.height){

        // if window is in the screen (which it basically always is (since we are dealing with only one screen))

        // check if we need to change the widows size
        // we need to do this because we always want it to be small and central enough
        // for all the appendages to fit around it

        // if we need to change any of its size attirbutes (left, right, width, or right),
        // we set the update variable to true (wil make sense right after we check for changes)
        let update = false;

        // the way we check if the browser window needs to resize
        // is by check on each side, wehether or not the appendage fits

        // oes the left rt have engouh space?
        if (win.left - display.left < armWidth){
          // if not change the windows left postition
          win.left = display.left + armWidth;
          update = true;
        }

        // DOES THe right arm fit?
        win.right = win.left + win.width;
        display.right = display.left + display.width;
        if (display.right - win.right < armWidth){
          // if not, we need to change windows width
          win.width = display.right - win.left - armWidth;
          update = true;
        }

        // does the head fit?
        if (win.top - display.top <= headHeight + titleBar){
          win.top = display.top + headHeight + titleBar + 1;
          update = true;
        }

        // // left over of checking for feet:
        // win.bottom = win.top + win.height;
        // display.bottom = display.top + display.height;


        // once we checked, we construct this object of where the window should be
        let params = {
          left: win.left,
          top: win.top,
          width: win.width,
          height: win.height
        };

        // if we do in fact need to resize the window
        // because one of the apppnedage didnt have space
        // update will be true

        // in both cases (first resizeing window, or not, we will call the appendage function afterwards
        // and pass the browser window to it)
        if (update){
          // in this case, we need to update the window sizes using the params object (create just above)
          chrome.windows.update(win.id, params, function (win){
            appendage(win);
          });
        } else {
          appendage(win);
        }
        break;
    }
  }
}

function appendage(win){
  // this function moves appendages into the correct position/
  // they are already on the screen because opened them in the very beginning (#1)
  // so we just need to adjust their locations to be centered on each side of the
  // browser window win
  // check wehere head should be
  let headLeft = win.left + (win.width / 2) - (headWidth / 2);
  // check where head should be vertically
  let headTop = win.top - headHeight;
  //move the head to its location
  head.moveTo(headLeft, headTop);

  //same with arms
  let armTop = win.top + (win.height / 4);
  let laLeft = win.left - armWidth;
  let raLeft = win.left + win.width;
  leftArm.moveTo(laLeft, armTop);
  rightArm.moveTo(raLeft, armTop);

  // after 500 ms check again if things have changed
  setTimeout(checkBod, 500);
}

// variable to be assigned a value to in the code below.
// its global because we need to access it in many places
let currentWin;

// #1
// happens once in the very beginning of chrome being open
// hey chrome, whats the current active window
chrome.windows.getCurrent({}, function (win){
  // once we have the active window, we save it in a variable
  // we do this because we want to refer to the active window in other functions, too
  currentWin = win;
  // also in the very beginnning,
  // we want to open the windows with the appendages
  // and give them their respective dimensions
  // we store references to them in the global variables
  // we initialized at the very top. why? because we will need to refer to them
  // and change their position in other places in this script.
  leftArm = window.open(leftArmHtml, '', 'width=' + armWidth + ', height=' + armHeight);
  rightArm = window.open(rightArmHtml, '', 'width=' + armWidth + ', height=' + armHeight);
  head = window.open(headHtml, '', 'width=' + headWidth + ', height=' + headHeight);
});

// we want to check if this whole project is ready
// meaning if all the appendages have opened
// to do this, we make one variable representing if we are ready:
ready = false;
// arry to hold window IDs of appendages to refer to in other parts of the code
appendageIds = [];
// then we listen to incoming messages
// each appendage page sends a message in the beginnning\
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
  // we also store the window IDs of each appendage to refer to them later on
  appendageIds.push(sender.tab.windowId);
  // once we receive one message per appendagee are ready
  if (appendageIds.length >= 3){
    ready = true;
  }
});




function checkBod(){
  // get the current window
  chrome.windows.get(currentWin.id, {}, function (win){
    // we check if either its psition or its size have changed
    if (win.left != currentWin.left || win.top != currentWin.top ||
      win.width != currentWin.width || win.height != currentWin.height){
        // if thats the case, we need to adjust the appendages position
        // this is done in bodify nd we pass to it the window object
        bodify(win);
    } else {
      setTimeout(checkBod, 500);
    }
  });
}


// #2
// check if the window moved, 500 ms after page start
// this is not an interval, it only runs once!
setTimeout(checkBod, 500);




// #3 what happens if i switch to another browser window?
// this variable makes sure we keep thngs an healthy
// pace and dont run many reforcusing actions (rearrange golum) all at once
let refocusing = false;
chrome.windows.onFocusChanged.addListener(function (windowId){
  // only do stuff if
  // we are ready (golum is open) AND
  // its a real window id (not -1) AND
  // if the new focued window is NOT part of golum
  // if we are not already in the process of refocusing (aka rearraching stuff)
  if (ready && windowId != -1 && appendageIds.indexOf(windowId) == -1 && !refocusing){
    // male sure this funcion is not called many times ar once by signalling
    // we are cuurently "refocusing" (true)
    refocusing = true;

    // focus all the glumn parts (meaning: bring them to the foreground because
   // after switcing window, they might be hidden)
   // for each body part
    for (let id of appendageIds){
      // focus the body part (bring it to front)
      chrome.windows.update(id, {focused: true});
    }
    // then we focus the current window again (bevcause that what the user likes)
    chrome.windows.update(windowId, {focused: true}, function (){
      refocusing = false;

      // now we call bodify with the new active window
      // this will resize the window to fit the bodypart
      // and bodify will also call appendage() wchih will bring golumn
      // to his new locations
      chrome.windows.get(windowId, {}, function (win){
        currentWin = win;
        bodify(win);
      });
    });

  }
});
