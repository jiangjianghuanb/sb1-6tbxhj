document.addEventListener('DOMContentLoaded', function() {
  const translateButton = document.getElementById('translateButton');
  const statusElement = document.getElementById('status');

  translateButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "translate"}, function(response) {
        statusElement.textContent = "翻译完成！";
      });
    });
  });
});