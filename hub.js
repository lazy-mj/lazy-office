/* =========================================================================
   lazy-office 허브 페이지 전용 JS (hub.js)
   지금은 모바일 햄버거 메뉴 토글 하나뿐입니다. 이 파일은 이 허브에서만
   쓰고, 다른 도구 레포로 CDN 공유하지 않습니다.
   ========================================================================= */
(function(){
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if(!hamburgerBtn || !mobileNav) return;
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  });
})();
