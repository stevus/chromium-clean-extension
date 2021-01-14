const { KARDASHIAN_TERMS } = require('../constants')
const { clearGdPrConsentNotices } = require('./gdpr')
const { filterKardashian } = require('./kardashian')

clearGdPrConsentNotices()

chrome.storage.local.get({ "kardashianTerms": KARDASHIAN_TERMS }, function(obj) {
  filterKardashian(obj.kardashianTerms)
})
