(() => {
  const MAIN = 'main.container';          // 需要被替换的节点
  const LOAD_CLS = 'pjax-loading';        // 加载动画用

  /* 判断是否需要 PJAX */
  function shouldPjax(a) {
    if (!a || a.tagName !== 'A') return false;
    if (a.hasAttribute('data-no-ajax')) return false;
    if (a.hostname !== location.hostname) return false;
    if (a.href.endsWith('#')) return false;
    if (a.target === '_blank') return false;
    return true;
  }

  /* 执行替换 */
  function swap(html, url) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newMain = doc.querySelector(MAIN);
    if (!newMain) return Promise.reject('no <main>');
    document.querySelector(MAIN).innerHTML = newMain.innerHTML;
    document.title = doc.title || '';
    history.pushState(null, document.title, url);
    window.scrollTo(0, 0);
    return Promise.resolve();
  }

  /* 点击拦截 */
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!shouldPjax(a)) return;
    e.preventDefault();
    document.body.classList.add(LOAD_CLS);
    fetch(a.href, { credentials: 'same-origin' })
      .then(r => r.text())
      .then(html => swap(html, a.href))
      .catch(() => { location.href = a.href; })           // 失败回退
      .finally(() => document.body.classList.remove(LOAD_CLS));
  });

  /* 前进后退 */
  window.addEventListener('popstate', () => {
    document.body.classList.add(LOAD_CLS);
    fetch(location.href, { credentials: 'same-origin' })
      .then(r => r.text())
      .then(html => swap(html, location.href))
      .finally(() => document.body.classList.remove(LOAD_CLS));
  });
})();