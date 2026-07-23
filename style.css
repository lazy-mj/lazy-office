/* =========================================================================
   ETRI 업무지원 플랫폼 — 공통 JS 유틸리티 (shared/app-core.js)
   업무별 계산 로직은 절대 여기 넣지 않습니다. 여기 있는 함수들은
   "어떤 업무 자동화든" 그대로 재사용할 수 있는 화면/저장소 유틸입니다.
   업무 모듈에서는 window.AppCore.xxx() 형태로 호출합니다.
   ========================================================================= */
(function(global){
  'use strict';

  function el(tag, cls, text){
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text !== undefined) e.textContent = text;
    return e;
  }

  /* ---------- Toast ---------- */
  const TOAST_ICONS = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    info: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
  };
  function showToast(message, type){
    const zone = document.getElementById('toast-zone');
    if(!zone){ console.warn('[AppCore] #toast-zone 요소가 없습니다.'); return; }
    const kind = (type === 'success' || type === 'error') ? type : 'info';
    const t = el('div', 'toast' + (type ? (' ' + type) : ''));
    const icon = el('span', 'dot-icon');
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' + TOAST_ICONS[kind] + '</svg>';
    const label = el('span', undefined, message);
    t.appendChild(icon);
    t.appendChild(label);
    zone.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 250);
    }, 2600);
  }

  /* ---------- 오류 배너 (alert 대체) ---------- */
  function showError(message, zoneId){
    const zone = document.getElementById(zoneId || 'error-banner-zone');
    if(!zone){ console.warn('[AppCore] 오류 배너 영역을 찾지 못했습니다.'); return; }
    const banner = el('div', 'error-banner');
    const span = el('span', undefined, '⚠ ' + message);
    const close = el('button', undefined, '✕');
    close.type = 'button';
    close.setAttribute('aria-label', '오류 메시지 닫기');
    close.addEventListener('click', () => banner.remove());
    banner.appendChild(span);
    banner.appendChild(close);
    zone.appendChild(banner);
  }

  /* ---------- Stepper (① ② ③ 진행 단계 표시) ---------- */
  function setStep(n, containerId){
    const root = document.getElementById(containerId || 'stepper');
    if(!root) return;
    const children = Array.from(root.children);
    children.forEach((li, i) => {
      if(li.classList.contains('step')){
        const s = Number(li.dataset.step);
        li.classList.remove('current', 'done');
        if(s < n) li.classList.add('done');
        if(s === n) li.classList.add('current');
      } else if(li.classList.contains('connector')){
        const prevStep = children.slice(0, i).reverse().find(x => x.classList.contains('step'));
        li.classList.toggle('done', !!(prevStep && prevStep.classList.contains('done')));
      }
    });
  }

  /* ---------- Progress (파일 선택 → 분석 중 → 완료 등) ---------- */
  function setProgress(state, containerId){
    const root = document.getElementById(containerId || 'progress-steps');
    if(!root) return;
    const items = root.querySelectorAll('li');
    const order = Array.from(items).map(li => li.dataset.p);
    const idx = order.indexOf(state);
    items.forEach(li => {
      const i = order.indexOf(li.dataset.p);
      li.classList.remove('active', 'complete');
      if(i < idx) li.classList.add('complete');
      if(i === idx) li.classList.add(state === 'done' ? 'complete' : 'active');
    });
  }

  /* ---------- Storage : "이 PC에 저장" 체크박스 + localStorage 공통 패턴 ---------- */
  const Storage = {
    loadPersistFlag(flagKey, checkboxId){
      const v = localStorage.getItem(flagKey);
      const enabled = v === null ? true : v === 'true';
      const box = document.getElementById(checkboxId);
      if(box) box.checked = enabled;
      return enabled;
    },
    savePersistFlag(flagKey, enabled){
      localStorage.setItem(flagKey, String(enabled));
    },
    load(key, fallback){
      try{
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      }catch(e){ return fallback; }
    },
    save(key, value, persistEnabled){
      if(persistEnabled === false) return; // 저장 옵션 꺼진 경우 기록하지 않음
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  /* ---------- Drag & Drop ---------- */
  function attachDropzone(zoneId, onFile){
    const zone = document.getElementById(zoneId);
    if(!zone) return;
    const input = zone.querySelector('input[type=file]');
    zone.addEventListener('click', () => input && input.click());
    ['dragenter', 'dragover'].forEach(evt => {
      zone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); zone.classList.add('drag-over'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
      zone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); zone.classList.remove('drag-over'); });
    });
    zone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if(file) onFile(file);
    });
  }

  /* ---------- 표를 "표 형태"로 클립보드에 복사 (한글/워드 붙여넣기용) ---------- */
  function copyViaSelection(html){
    try{
      const holder = document.createElement('div');
      holder.style.position = 'fixed';
      holder.style.left = '-99999px';
      holder.style.top = '0';
      holder.innerHTML = html;
      document.body.appendChild(holder);
      const range = document.createRange();
      range.selectNodeContents(holder);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      let ok = false;
      try{ ok = document.execCommand('copy'); }catch(e){ ok = false; }
      sel.removeAllRanges();
      document.body.removeChild(holder);
      return ok;
    }catch(e){ return false; }
  }
  function copyViaFallback(text){
    try{
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    }catch(e){ return false; }
  }
  function copyTableRich(html, text, doneAsTable, doneAsText, fail){
    if(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write){
      const item = new ClipboardItem({
        'text/html': new Blob([html], {type: 'text/html'}),
        'text/plain': new Blob([text], {type: 'text/plain'})
      });
      navigator.clipboard.write([item]).then(doneAsTable).catch(() => {
        copyViaSelection(html) ? doneAsTable() : (copyViaFallback(text) ? doneAsText() : fail());
      });
      return;
    }
    if(copyViaSelection(html)){ doneAsTable(); return; }
    copyViaFallback(text) ? doneAsText() : fail();
  }

  /* ---------- Dialog : 커스텀 확인 모달 (native confirm() 대체) ----------
     neutralText를 주면 3버튼(확인/취소성 선택지 2개 + 진짜 취소) 모드가 되고,
     이때 바깥 클릭/ESC는 neutralText(아무 것도 안 함, null 반환)로 연결됩니다.
     neutralText가 없으면 기존과 동일하게 2버튼 + 바깥클릭=취소(false)로 동작합니다.
     order로 버튼 표시 순서(DOM 순서)를, primaryButton으로 어떤 버튼을 강조색(파란/빨강)으로
     보여줄지 지정할 수 있습니다 (기본값은 기존과 동일: confirm이 강조, confirm-cancel-neutral 순). */
  function confirmDialog({title='', message='', confirmText='확인', cancelText='취소', neutralText=null, danger=false, order=['confirm','cancel','neutral'], primaryButton='confirm'} = {}){
    return new Promise((resolve) => {
      const overlay = el('div', 'modal-overlay');
      const box = el('div', 'modal-box');
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      if(title) box.appendChild(el('div', 'modal-title', title));
      box.appendChild(el('div', 'modal-message', message));
      const actions = el('div', neutralText ? 'modal-actions stacked' : 'modal-actions');
      const styleFor = (key) => key === primaryButton ? (danger ? 'btn-danger' : 'btn-primary') : 'btn-outline';
      const confirmBtn = el('button', 'btn ' + styleFor('confirm'), confirmText);
      const cancelBtn = el('button', 'btn ' + styleFor('cancel'), cancelText);
      confirmBtn.type = 'button';
      cancelBtn.type = 'button';
      let neutralBtn = null;
      if(neutralText){
        neutralBtn = el('button', 'btn ' + styleFor('neutral'), neutralText);
        neutralBtn.type = 'button';
      }
      const btnByKey = {confirm:confirmBtn, cancel:cancelBtn, neutral:neutralBtn};
      order.forEach(key => { if(btnByKey[key]) actions.appendChild(btnByKey[key]); });
      box.appendChild(actions);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('show'));

      const dismissResult = neutralText ? null : false;
      function close(result){
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 160);
        document.removeEventListener('keydown', onKey);
        resolve(result);
      }
      function onKey(e){ if(e.key === 'Escape') close(dismissResult); }
      confirmBtn.addEventListener('click', () => close(true));
      cancelBtn.addEventListener('click', () => close(false));
      if(neutralBtn) neutralBtn.addEventListener('click', () => close(null));
      overlay.addEventListener('click', (e) => { if(e.target === overlay) close(dismissResult); });
      document.addEventListener('keydown', onKey);
      confirmBtn.focus();
    });
  }

  /* ---------- Dialog : 알림/사용법 모달 (버튼 1개, native alert() 대체) ---------- */
  function infoDialog({title='', bodyHtml='', closeText='닫기', icon=null} = {}){
    return new Promise((resolve) => {
      const overlay = el('div', 'modal-overlay');
      const box = el('div', 'modal-box');
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      if(icon === 'warning'){
        const iconWrap = el('div', 'modal-icon modal-icon-warning');
        iconWrap.innerHTML = '<svg class="icon-svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>';
        box.appendChild(iconWrap);
      }
      if(title) box.appendChild(el('div', 'modal-title', title));
      const body = el('div', 'modal-message');
      body.innerHTML = bodyHtml;
      box.appendChild(body);
      const actions = el('div', 'modal-actions');
      const closeBtn = el('button', 'btn btn-primary', closeText);
      closeBtn.type = 'button';
      actions.appendChild(closeBtn);
      box.appendChild(actions);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('show'));

      function close(){
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 160);
        document.removeEventListener('keydown', onKey);
        resolve();
      }
      function onKey(e){ if(e.key === 'Escape') close(); }
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', (e) => { if(e.target === overlay) close(); });
      document.addEventListener('keydown', onKey);
      closeBtn.focus();
    });
  }

  global.AppCore = {
    el,
    toast: { show: showToast },
    error: { show: showError },
    dialog: { confirm: confirmDialog, info: infoDialog },
    stepper: { set: setStep },
    progress: { set: setProgress },
    storage: Storage,
    dropzone: { attach: attachDropzone },
    table: { copyRich: copyTableRich }
  };
})(window);
