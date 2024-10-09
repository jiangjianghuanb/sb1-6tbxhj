function translateText(text) {
  // 这里应该使用实际的翻译API
  // 为了演示，我们只是将文本包裹在括号中
  return `(${text})`;
}

function translatePage() {
  const elements = document.getElementsByTagName('*');
  for (let element of elements) {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text && /[a-zA-Z]/.test(text)) {  // 检查是否包含英文字母
          node.textContent = translateText(text);
        }
      }
    }
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "translate") {
      translatePage();
      sendResponse({status: "完成"});
    }
  }
);