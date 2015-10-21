var baseUrl;

var navigate = function(text) {
  var url = baseUrl + text;

  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.update(tab.id, {url: url});
  });
}

chrome.storage.sync.get(['url'], function(settings) {
  if(!settings.url) {
    chrome.runtime.openOptionsPage();
    return;
  }
  baseUrl = settings.url || '';
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  baseUrl = changes.url.newValue || '';
})

chrome.omnibox.onInputEntered.addListener(function(text) {
  if(!baseUrl) {
    chrome.runtime.openOptionsPage();
    return;
  }
  navigate(text);
});