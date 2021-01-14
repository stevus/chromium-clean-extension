chrome.storage.local.get({ "kardashianCountCleared": 0 }, function(obj) {
  document.getElementById('kardashianCleanCount').value = obj.kardashianCountCleared;
})
