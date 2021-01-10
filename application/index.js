const { clearGdPrConsentNotices } = require('./gdpr')
const { filterKardashian } = require('./kardashian')
const { fixSportStreams } = require('./video-stream')

clearGdPrConsentNotices()
filterKardashian()
fixSportStreams()
