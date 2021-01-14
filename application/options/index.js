const {
  KARDASHIAN_TERMS,
  VIDEO_DOMAINS
} = require('../constants')

chrome.storage.local.get({ "kardashianCountCleared": 0 }, function(obj) {
  document.getElementById('kardashianCleanCount').value = obj.kardashianCountCleared
})

chrome.storage.local.get({ "whitelistedHosts": VIDEO_DOMAINS }, function(obj) {
  document.getElementById('whitelistedHosts').value = obj.whitelistedHosts.join("\n")
})

chrome.storage.local.get({ "kardashianTerms": KARDASHIAN_TERMS }, function(obj) {
  document.getElementById('kardashianTerms').value = obj.kardashianTerms.join("\n")
})

document.getElementById('saveOptions').addEventListener('click', function () {
  const kardashianTerms = document.getElementById('kardashianTerms').value.split("\n")
  const whitelistedHosts = document.getElementById('whitelistedHosts').value.split("\n")
  chrome.storage.local.set({ "kardashianTerms": kardashianTerms }, function() {})
  chrome.storage.local.set({ "whitelistedHosts": whitelistedHosts }, function() {})
})
