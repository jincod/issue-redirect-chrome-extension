function save_options() {
  var url = document.getElementById('url').value;
  chrome.storage.sync.set({url: url}, function() {
    document.getElementById('status').textContent = 'Updated!';
  });
}

function restore_options() {
  chrome.storage.sync.get(['url'], function(settings) {
    document.getElementById('url').value = settings.url || '';
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);