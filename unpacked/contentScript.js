console.log('内容脚本已加载');

const translations = {
  'Hello': '你好',
  'World': '世界',
  'Good': '好',
  'Morning': '早上',
  'Thank you': '谢谢你',
  'Welcome': '欢迎'
};

function translateText(text) {
  return translations[text] || text;
}

function translatePage() {
  console.log('开始翻译页面');
  const elements = document.getElementsByTagName('*');
  for (let element of elements) {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          const words = text.split(/\s+/);
          const translatedWords = words.map(word => translateText(word));
          node.textContent = translatedWords.join(' ');
        }
      }
    }
  }
  console.log('页面翻译完成');
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('收到消息:', request);
    if (request.action === "translate") {
      translatePage();
      sendResponse({status: "完成"});
    }
  }
);

console.log('内容脚本设置完成');