const blacklistWords = [
  'Kim', 'Kanye', 'Kayne', 'Kardashian', 'Kanye West',
  'Democrat', 'Republican', 'Pelosi', 'Trump', 'Biden', 'Obama',
  'Royal',
]
const regex = new RegExp(blacklistWords.join('|'), 'i')

function runFilter() {

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

  nodes.forEach((node) => {
    try {
      const liNode = node.parentElement.closest('li')
      if(liNode !== null && typeof liNode.remove === 'function') {
        console.log(`Removed "${node.nodeValue}"`)
        liNode.remove()
      }
    } catch(e) {
      console.log(e)
    }
  })
}

/**
 * Filter out content that doesn't need to be seen
 *
 * @return {void}
 */
function filterKardashian() {

  if (!document.createTreeWalker) {
    throw(new Error('Browser does not support createTreeWalker()'))
  }

  runFilter()

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
