<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="LazyOffice — 브라우저에서 바로 쓰는 사내 업무자동화 허브. 설치·로그인 없이, 서버로 데이터를 보내지 않고 반복 업무를 자동화합니다.">
</p>

<p align="center">
  <b>🌐 GitHub Pages에서 바로 사용</b> 👉 <a href="https://lazy-mj.github.io/lazy-office/"><b>lazy-mj.github.io/lazy-office</b></a>
</p>

---

## ✨ 지금 있는 도구

<p align="center">
  <img src="./assets/readme/proof.svg" width="100%" alt="LazyOffice 허브 화면에 있는 도구 카드: 전화요금 계정분할 자동화, 예산 검증 도구, 다음 자동화 제안">
</p>

- ✂️ **[전화요금 계정분할 자동화](https://lazy-mj.github.io/lazy-billsplit/)** — 부서별 전화요금을 계정번호별로 자동 분할·집계
- 💰 **[예산 검증 도구](https://lazy-mj.github.io/lazy-jeongsan/)** — PMS와 이지바로/RCMS 예산을 비목별로 자동 대조 (현재 협약사업만 지원, 기본사업은 지원 준비 중)

각 도구는 독립된 저장소이지만, 이 저장소(`lazy-office`)의 `shared/`에 있는 디자인·공통 기능을 그대로 불러와 써서 톤앤매너가 통일되어 있습니다.

## 🔒 개인정보 및 보안

이 홈페이지 자체는 파일을 다루지 않지만, 여기서 연결되는 모든 도구는 공통으로 다음 원칙을 따릅니다.

- 업로드한 파일은 서버로 전송되지 않고, 모든 처리는 브라우저 안에서만 이루어집니다.
- GitHub에는 사용자 데이터가 저장되지 않습니다.
- 결과 파일은 사용자의 PC로 직접 다운로드됩니다.

## 🧩 어떻게 동작하나요

<p align="center">
  <img src="./assets/readme/architecture.svg" width="100%" alt="shared/ 폴더 하나가 허브 홈페이지와 전화요금 계정분할, 예산 검증 도구에 공통으로 연결되는 구조도">
</p>

`shared/` 폴더 하나를 고치면 이를 참조하는 모든 도구(`lazy-billsplit`, `lazy-jeongsan` 등)에 동일하게 반영됩니다. 각 도구는 절대경로(`/lazy-office/shared/...`)로 이 폴더를 직접 불러오며, 전부 같은 도메인(`lazy-mj.github.io`)에 있어서 별도 CDN 없이 공유됩니다.

**기술 스택** — HTML5 / CSS3 / JavaScript (ES6+) · GitHub Pages 정적 배포 · 별도 프레임워크·빌드 과정 없음

## 📁 프로젝트 구조

``` text
lazy-office/
├── index.html          허브 홈페이지 (도구 카드 목록)
├── shared/
│   ├── style.css        공용 디자인 시스템 (색상, 카드, 스텝퍼, 모달, 버튼 등)
│   ├── app-core.js      공용 JS 유틸 (Toast, 확인/알림 모달, 진행표시, Storage, Drag&Drop 등)
│   ├── header.js        공용 헤더(로고·네비게이션)
│   ├── favicon.svg
│   ├── assets/          공용 이미지(마스코트 등)
│   └── vendor/          xlsx 라이브러리 등 외부 라이브러리
├── README.md
└── CHANGELOG.md
```

## 📌 버전

현재 버전: **v1.0.0**

## 💡 향후 계획

- 자동화 모듈 추가 (각각 독립 저장소로 만든 뒤 이 홈페이지에 카드 연결)
- 예산 검증 도구의 기본사업 지원 여부 검토

## 📄 라이선스

본 프로젝트는 내부 업무 효율화를 목적으로 개발되었습니다. 필요에 따라
자유롭게 수정하여 사용할 수 있습니다.
