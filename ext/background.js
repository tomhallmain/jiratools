chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name == "contentscript");

  chrome.browserAction.onClicked.addListener(() => {
    port.postMessage({ method: '' });
    return true;
  });
  return true;
});
