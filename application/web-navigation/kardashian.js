/**
 * [updateMetric description]
 * @param  {[type]} kardashianCountCleared [description]
 * @return {void}
 */
function updateMetric(kardashianCountCleared) {

  chrome.storage.local.get({ "kardashianCountCleared": 0 }, function(obj) {
    const newCountCleared = kardashianCountCleared + obj.kardashianCountCleared || 0
    chrome.storage.local.set({ "kardashianCountCleared": newCountCleared }, function() {})
  })
}

/**
 * Logic to process the filtering
 * @param  {Array} filterTerms Array of strings that will be filtered out of page content
 * @return {void}
 */
function runFilter(filterTerms) {

  const regex = new RegExp(filterTerms.join('|'), 'i')

  // By default, the TreeWalker will show all of the matching DOM nodes that it
  // finds. However, we can use an optional "filter" method that will inform the
  // DOM traversal.
  function filter(node) {
    if (regex.test(node.nodeValue)) {
      return NodeFilter.FILTER_ACCEPT
    }
    return NodeFilter.FILTER_SKIP
  }

  // IE and other browsers differ in how the filter method is passed into the
  // TreeWalker. Mozilla takes an object with an "acceptNode" key. IE takes the
  // filter method directly. To work around this difference, we will define the
  // acceptNode function a property of itself.
  filter.acceptNode = filter

  // @link https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    filter,
    false // Deprecated but required for IE
  )

  const nodes = []

  while (treeWalker.nextNode()) {
    nodes.push(treeWalker.currentNode)
  }

  let numCleared = 0
  nodes.forEach((node) => {
    try {
      if(node === null) {
        return
      }

      const liNode = node.parentElement.closest('li')
      if(liNode !== null && typeof liNode.remove === 'function') {
        liNode.remove()
        numCleared = numCleared + 1
      }
    } catch(e) {
      console.log(e)
    }
  })

  if(numCleared > 0) {
    updateMetric(numCleared)
  }
}

/**
 * Filter out content that doesn't need to be seen
 *
 * @param  {Array} filterTerms Array of strings that will be filtered out of page content
 * @return {void}
 */
function filterKardashian(filterTerms = []) {

  if (!document.createTreeWalker) {
    throw(new Error('Browser does not support createTreeWalker()'))
  }

  runFilter(filterTerms)

  // @link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver
  const observer = new MutationObserver(runFilter)
  const observerOptions = {
    childList: true,
    attributes: true,
    subtree: true
  }
  observer.observe(document.querySelector('body'), observerOptions)
}

module.exports = {
  filterKardashian
}
