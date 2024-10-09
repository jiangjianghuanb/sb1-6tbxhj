console.log('弹出脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  const translateButton = document.getElementById('translateButton');
  const statusElement = document.getElementById('status');

  translateButton.addEventListener('click', function() {
    console.log('翻译按钮被点击');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "translate"}, function(response) {
        if (chrome.runtime.lastError) {
          console.error('发生错误:', chrome.runtime.lastError);
          statusElement.textContent = "发生错误：" + chrome.runtime.lastError.message;
        } else {
          console.log('收到响应:', response);
          statusElement.textContent = "翻译完成！";
        }
      });
    });
  });
});