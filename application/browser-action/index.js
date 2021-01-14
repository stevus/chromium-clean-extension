const { VIDEO_DOMAINS } = require('../constants')
const { fixSportStreams } = require('./video-stream')

chrome.storage.local.get({ "whitelistedHosts": VIDEO_DOMAINS }, function(obj) {
  fixSportStreams(obj.whitelistedHosts)
})
