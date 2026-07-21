/* =========================================================================
   lazy-office 공통 헤더 (shared/header.js)
   각 도구 레포는 아래처럼 <body> 맨 끝에 스크립트 한 줄만 추가하면 됩니다.

     <script src=".../shared/header.js" data-active="billsplit"></script>

   data-active 값: "home" | "billsplit" | "jeongsan"
   헤더 마크업/스타일을 바꿀 일이 있으면 이 파일과 shared/style.css의
   .site-header 관련 규칙만 고치면 모든 도구에 한 번에 반영됩니다.
   ========================================================================= */
(function(){
  'use strict';

  const TABS = [
    { key: 'home',      label: '홈',       url: 'https://lazy-mj.github.io/lazy-office/' },
    { key: 'billsplit', label: '전화요금',  url: 'https://lazy-mj.github.io/lazy-billsplit/' },
    { key: 'jeongsan',  label: '예산검증',  url: 'https://lazy-mj.github.io/lazy-jeongsan/' }
  ];

  const activeKey = (document.currentScript && document.currentScript.dataset.active) || 'home';

  function linkAttrs(tab){
    // 현재 보고 있는 페이지 자기 자신으로는 target=_blank를 걸지 않음(불필요한 새 탭 방지)
    return tab.key === activeKey ? '' : ' target="_blank" rel="noopener noreferrer"';
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
  // 헤더를 body 맨 앞에 삽입 (스크립트 태그 자체는 성능을 위해 body 끝에 둬도 무방)
  // body.firstChild는 매 삽입마다 바뀌므로, 원래 첫 자식을 고정된 기준점으로 잡아야
  // header/mobile-nav 순서가 뒤집히지 않는다.
  const referenceNode = document.body.firstChild;
  while (wrapper.firstChild) {
    document.body.insertBefore(wrapper.firstChild, referenceNode);
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
