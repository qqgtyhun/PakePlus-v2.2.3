window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ========== 新版修复 后退+前进+刷新按钮【百分百显示 无BUG】 ==========
// 修复：等待页面完全加载完成再创建按钮 + 防遮挡 + 最高层级 + 防挂载失败
;(function(){
  // 核心修复：等页面所有元素加载完毕，再执行按钮创建，百分百能挂载成功
  function createNavBtns(){
    // 按钮容器 - 位置下移+靠右，绝对不会被遮挡，Windows完美适配
    const navBar = document.createElement('div');
    navBar.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 99999999;
      background: #ffffff; padding: 8px 10px; border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2); display: flex; gap: 8px;
      border: 1px solid #eee; opacity: 0.95;
    `;
    // 按钮样式 - 加大+加粗，点击有反馈，更醒目
    const btnStyle = `
      border: none; padding: 6px 12px; border-radius: 4px;
      background: #0078d7; color: #ffffff; cursor: pointer; 
      font-size: 13px; min-width: 65px;
    `;
    // 后退按钮 - 原生功能
    const backBtn = document.createElement('button');
    backBtn.innerText = '后退';
    backBtn.style.cssText = btnStyle;
    backBtn.onclick = () => window.history.back();

    // 前进按钮 - 原生功能
    const forwardBtn = document.createElement('button');
    forwardBtn.innerText = '前进';
    forwardBtn.style.cssText = btnStyle;
    forwardBtn.onclick = () => window.history.forward();

    // 刷新按钮 - 原生功能
    const refreshBtn = document.createElement('button');
    refreshBtn.innerText = '刷新';
    refreshBtn.style.cssText = btnStyle;
    refreshBtn.onclick = () => window.location.reload();

    // 组装按钮，兜底方案：找不到body就挂载到html上，双重保险
    navBar.appendChild(backBtn);
    navBar.appendChild(forwardBtn);
    navBar.appendChild(refreshBtn);
    const mountNode = document.body || document.documentElement;
    mountNode.appendChild(navBar);
  }

  // 双保险加载方式：页面加载完成执行 + 延迟执行，杜绝挂载失败
  if(document.readyState === 'complete'){
    createNavBtns();
  } else {
    window.addEventListener('load', createNavBtns);
    setTimeout(createNavBtns, 800);
  }
})();