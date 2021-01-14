chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.executeScript(
    details.tabId,
    {
      file: 'web-navigation.js'
    }
  )
})

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
    tab.id,
    {
      file: 'browser-action.js'
    }
  );
});
