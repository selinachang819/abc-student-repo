function blockVideo() {
  let h = new Date().getHours(); // 0-23
  if (h>6&& h<23) {
    console.log('Allow');
    return { cancel: false };
  } else {
    console.log('Block');
    return { cancel: true };
  }
}

chrome.webRequest.onBeforeRequest.addListener(blockVideo, {
  urls: ['*://*.youtube.com/*', '*://*.netflix.com/*'],     //  <-- only run for reddit urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request
