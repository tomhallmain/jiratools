
// Setup

var filterSettings = {}

document.addEventListener('DOMContentLoaded', function() {
  mapBtn('.highlightDevPerm')
  mapBtn('.defaultDevPerm')
})

function select(selector) {
  return document.querySelector(selector)
}
function mapBtn(selector) {
  const btn = select(selector)
  btn.addEventListener('click', function() { 
    btnPressed(btn.className)
  })
}
function mapInput(input) {
  input.addEventListener('change', function() { 
    updateFilter(input.className, input.value)
  })
}

// Message passing

let activeTabParams = {
  active: true,
  currentWindow: true
}

function sendMsg(message, filterSettings) {
  chrome.tabs.query(activeTabParams, messagePush)
  function messagePush(tabs) {
    console.log(message)
    console.log({'tab': tabs[0]})
    chrome.tabs.sendMessage(tabs[0].id, message)
  }
}


// Actions

function btnPressed(msgVal) {
  console.log('button pressed for ' + msgVal)
  sendMsg(applyFilter({'buttonPressed': msgVal}))
}

function applyFilter(msg) {
  return Object.assign({}, msg, filterSettings)
}

function updateFilter(inputClass, input) {
  filterSettings[inputClass] = input
  console.log('changed filter for ' + inputClass + ' to ' + input);
}



