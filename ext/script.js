
// Helpers

function mkar(nodelist) {
  return [].slice.call(nodelist)
}
function select(selector, baseEl) {
  return baseEl?.querySelector(selector)
}
function selectAll(selector) {
  return document.querySelectorAll(selector)
}
function local(key, toVal) {
  if (toVal) {
    window.localStorage[key] = toVal }
  else {
    return window.localStorage[key] }
}
function initLocal(key, toVal) {
  const initVal = local(key)
  if (initVal === undefined || initVal === null) {
    local(key, toVal) }
}
function settingOn(key, checkVal) {
  if (checkVal) {
    return local(key) === checkVal }
  else {
    return local(key) === 'true' }
}
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  return function(obj, callback) {
    if (!obj || !obj.nodeType === 1) return
    if (MutationObserver) {
      var obs = new MutationObserver(function(mutations, observer){
          callback(mutations) })
      obs.observe(obj, { childList: true, subtree: true }) }
    else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false) }}
})();


// Funcs

function toggleDevPermissionsHighlight() {
  if (settingOn('highlightDevPerm')) {
    local('highlightDevPerm', 'false')
    var hlDevPerm = false }
  else {
    local('highlightDevPerm', 'true')
    var hlDevPerm = true }
  highlightDevPermissions(hlDevPerm)
}
function toggleDevPermissionsDefault() {
  if (settingOn('defaultDevPerm')) {
    local('defaultDevPerm', 'false')
    var dfDevPerm = false }
  else {
    local('defaultDevPerm', 'true')
    var dfDevPerm = true }
  setPermissions(getEditor(document), dfDevPerm)
}
function getEditor(baseEl) {
  return select(('div[class*="Editor"]', baseEl))
}
function getCommentPermissionsBtn(editorEl) {
  return select('button', select('div:nth-child(3)', editorEl?.nextSibling))
}
function setPermissions(editorEl, developer) {
  getCommentPermissionsBtn(editorEl)?.click()
  var permText = developer ? 'Developers' : 'Visible to all users'
  const permissionOption = mkar(selectAll("div[class*='option']"))
      .filter( div => div.textContent == permText )[0]
  permissionOption?.click()
}
function highlightDevPermissions(highlight) {
  var color = highlight ? 'green' : 'gray'
  const devSpans = mkar(selectAll('span')).filter(s => s.textContent == 'Developers')
  devSpans.map(s => s.style.color = color)
}


// Setup

initLocal('highlightDevPerm', 'true')
initLocal('defaultDevPerm', 'true')

if (settingOn('highlightDevPerm')) {
  highlightDevPermissions(true)
  var hlDevPerm = true }
if (settingOn('defaultDevPerm')) {
  var dfDevPerm = true }

observeDOM(document.body, function (m) {
  m.forEach( record => {
    if (!dfDevPerm) return
    var added = record.addedNodes[0]
    if (added === undefined || added === null) return
    var editor = getEditor(added)
    if (!editor) return
    setPermissions(editor, true)
  })
})
