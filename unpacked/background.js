console.log('后台脚本已加载');

chrome.runtime.onInstalled.addListener(() => {
  console.log('扩展已安装');
});