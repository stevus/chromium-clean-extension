const whitelistedHosts = [
  '6stream.xyz'
]
/**
 * Clear a page of Ads / chat boxes / any garbage that shouldn't be on the page
 * in the first place
 *
 * @return {void}
 */
function fixSportStreams() {

  if(whitelistedHosts.indexOf(location.host) === -1) {
    return
  }

  // Get the `video` element - right now this is pretty assuming there is only one video
  // element and it's a <video> tag
  let vidElm = document.querySelector('video')
  if (vidElm === null) {
    console.log('No video elements on the page - exiting')
    return
  }

  // Clear out the <body> DOM and replace it with just the <video> elm
  if (vidElm !== null) {
    document.querySelector('body').innerHTML = ''
    document.querySelector('body').append(vidElm)
    document.querySelectorAll('body script').forEach(n => n.remove())
  }

  // Get the new `video` element since we've written new DOM and remove any
  // inline height/width to set it to the size of the parent window
  vidElm = document.querySelector('video')
  if (vidElm !== null) {
    vidElm.style.height = ''
    vidElm.style.width = ''
  }
}

module.exports = {
  fixSportStreams
}
