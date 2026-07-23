# CHANGELOG

이 문서는 `shared/`(공용 디자인 시스템·JS 유틸)와 허브 홈페이지의 주요 변경 이력을 담습니다.
`shared/`를 고치면 `lazy-billsplit`, `lazy-jeongsan` 등 이를 참조하는 모든 도구에 영향을 주므로,
변경 시 항상 다른 레포에도 재배포가 필요한지 함께 확인하세요.

## v1 (2026-07-24)

### 추가 (`shared/app-core.js`)
- `AppCore.dialog.confirm()`에 3버튼 지원 추가
  - `neutralText` — "진짜 취소"(아무 동작 안 함) 버튼. 지정하면 바깥 클릭/ESC가 이 버튼과 동일하게 동작함 (기존엔 `cancelText` 버튼이 강제 실행되는 문제가 있었음)
  - `order` — 버튼 표시 순서를 `['confirm','cancel','neutral']` 조합으로 자유롭게 지정
  - `primaryButton` — 셋 중 어떤 버튼을 강조색(파란/빨강)으로 보여줄지 지정 (나머지는 흰색 아웃라인)
  - 기존 호출부는 옵션을 안 줘도 예전과 동일하게 동작 (하위 호환)
- `AppCore.dialog.info()` 신규 추가 — 확인 버튼 1개짜리 알림/사용법 모달 (native `alert()` 대체), 경고 아이콘 옵션(`icon:'warning'`) 지원

### 수정 (`shared/style.css`)
- **버그**: `.btn`에 `justify-content`가 빠져있어서, 폭이 넓게 늘어난 버튼(풀폭 모달 버튼 등)에서 텍스트가 중앙정렬 안 되고 좌측으로 쏠려 보이던 문제 수정
- 모달(`.modal-box`, `.modal-actions`) 전체를 가운데정렬로 변경, 3버튼일 때는 세로 스택 레이아웃(`.modal-actions.stacked`) 지원
- 스텝퍼(`.stepper`)와 진행바(`.progress`)의 "완료" 상태 색상을 초록(`--success`)에서 신규 변수 `--teal`로 변경 (사이트의 블루/퍼플 톤과 더 어울리도록), 둘 다 가운데정렬로 변경
- `.status.ok` 안내 배너에 가운데정렬 추가
- 툴팁(`[data-tooltip]`)이 원하는 위치에서 줄바꿈되도록 `white-space:pre-line` 적용

### 정리
- 더 이상 쓰이지 않는 `details.readme`(구 아코디언) CSS 삭제
- 허브 홈 예산검증 카드에 "기본사업 지원 준비 중" 로드맵 문구 추가 (박스/뱃지 없이 캡션 한 줄로)
- 루트의 중복 파일(`style.css`, `hub.js`, `xlsx.full.min.js`, `mascot.png`, `header.js`) 및 정체불명 0바이트 파일 삭제, `.nojekyll` 누락분 추가
