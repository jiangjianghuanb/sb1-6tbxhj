import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>简单的Chrome扩展</h1>
    <div class="card">
      <button id="counter" type="button">点击计数: 0</button>
    </div>
  </div>
`

let count = 0
const counterButton = document.querySelector('#counter')

counterButton.addEventListener('click', () => {
  count++
  counterButton.textContent = `点击计数: ${count}`
  chrome.storage.local.set({ count: count })
})

// 从存储中获取计数
chrome.storage.local.get(['count'], (result) => {
  if (result.count) {
    count = result.count
    counterButton.textContent = `点击计数: ${count}`
  }
})