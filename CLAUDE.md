@AGENTS.md

## Admin 인증 보안 원칙

### Race Condition 방지
- admin 페이지의 권한 체크(useAuth)는 반드시 loading 상태를 먼저 확인
- if (loading) return; 을 권한 체크보다 먼저 실행
- 로그인 폼 표시도 if (loading) 분기로 로딩 UI 먼저 처리

### 데이터 소스 일관성
- 통계·목록 데이터는 Firestore가 유일한 소스
- localStorage는 UI 상태(필터, 정렬 등)만 사용
- posts/reviews 데이터를 localStorage에 저장 금지

### 인증/데이터 계층 마이그레이션
- 인증 방식을 바꿀 때(예: localStorage→Firebase Auth), 데이터 읽기/쓰기 계층도
  같은 PR에서 함께 마이그레이션한다. auth만 바꾸고 데이터 계층을 남기면
  통계·목록이 조용히 깨진다(이번 사고 원인).

### 승인 도메인
- 커스텀 도메인 추가/변경 시 Firebase Auth 승인된 도메인에 non-www와 www 모두 등록한다.
  실제 접속 도메인(리다이렉트 최종 도착지)이 반드시 포함돼야 한다.

## HTML Sanitization 원칙

### 서버/클라이언트 환경 분리
- **서버 컴포넌트**: sanitize-html 사용 (CommonJS, jsdom 불필요, 가벼움)
- **클라이언트 컴포넌트**: dompurify 직접 사용 (브라우저 네이티브)
- isomorphic-dompurify 금지 (jsdom ESM 호환성 문제)

### ESM/CommonJS 호환성
- 서버 컴포넌트에서 ESM 전용 패키지 import 시 주의
- jsdom, @exodus/bytes 같은 무거운 의존성 회피
- 패키지 추가 시 의존성 트리 확인 (npm list <package>)

### Sanitization 일관성
- 서버와 클라이언트에서 동일한 화이트리스트 유지
- 허용 태그: p, br, strong, em, u, s, h2, h3, ul, ol, li, a, img, table, blockquote, code, pre, hr
- 금지 태그: script, iframe, object, embed, form, input
- 금지 속성: onerror, onload, onclick 등 이벤트 핸들러
