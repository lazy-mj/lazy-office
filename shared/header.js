/* =========================================================================
   lazy-office 공통 헤더 (shared/header.js)
   각 도구 레포는 <body> 맨 위에 자리(placeholder) 하나와, 맨 끝에 스크립트
   한 줄을 추가하면 됩니다.

     <body>
     <div class="site-header-placeholder"></div>   ← 헤더 삽입 전 빈 화면 방지용
     ...
     <script src=".../shared/header.js" data-active="billsplit"></script>
     </body>

   data-active 값: "home" | "billsplit" | "jeongsan"
   placeholder를 안 넣어도 동작은 하지만(안전장치 있음), 헤더가 나중에
   삽입되면서 화면이 잠깐 덜컹거리는 걸 막으려면 꼭 넣어주세요.
   헤더 마크업/스타일을 바꿀 일이 있으면 이 파일과 shared/style.css의
   .site-header 관련 규칙만 고치면 모든 도구에 한 번에 반영됩니다.
   ========================================================================= */
(function(){
  'use strict';

  const TABS = [
    { key: 'billsplit', label: '전화요금',  url: 'https://lazy-mj.github.io/lazy-billsplit/' },
    { key: 'jeongsan',  label: '예산검증',  url: 'https://lazy-mj.github.io/lazy-jeongsan/' }
  ];

  const activeKey = (document.currentScript && document.currentScript.dataset.active) || 'home';

  function linkAttrs(){
    // 헤더 탭은 항상 같은 탭에서 이동 (새 탭 안 띄움)
    return '';
  }

  const navLinksHtml = TABS.map(tab =>
    `<a href="${tab.url}" class="${tab.key === activeKey ? 'active' : ''}"${linkAttrs(tab)}>${tab.label}</a>`
  ).join('');

  const headerHtml = `
    <header class="site-header">
      <a class="brand" href="https://lazy-mj.github.io/lazy-office/"><span class="lazy">Lazy</span><span class="office">Office</span></a>
      <nav class="desktop-nav">${navLinksHtml}</nav>
      <button class="hamburger-btn" id="lazyHamburgerBtn" aria-label="메뉴 열기" aria-expanded="false">
        <svg class="icon-svg" viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
      </button>
    </header>
    <nav class="mobile-nav" id="lazyMobileNav">${navLinksHtml}</nav>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = headerHtml.trim();

  const placeholder = document.querySelector('.site-header-placeholder');
  if (placeholder) {
    // 이미 자리를 잡아둔 placeholder를 실제 헤더로 교체 (레이아웃 흔들림 없음)
    while (wrapper.firstChild) {
      placeholder.parentNode.insertBefore(wrapper.firstChild, placeholder);
    }
    placeholder.remove();
  } else {
    // placeholder가 없는 페이지를 위한 안전장치 (기존 방식)
    const referenceNode = document.body.firstChild;
    while (wrapper.firstChild) {
      document.body.insertBefore(wrapper.firstChild, referenceNode);
    }
  }

  const hamburgerBtn = document.getElementById('lazyHamburgerBtn');
  const mobileNav = document.getElementById('lazyMobileNav');
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }
})();
