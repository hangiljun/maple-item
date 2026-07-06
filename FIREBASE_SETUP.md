# Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

1. **Firebase Console 접속**
   - https://console.firebase.google.com/ 접속
   - Google 계정으로 로그인

2. **프로젝트 생성**
   - "프로젝트 추가" 클릭
   - 프로젝트 이름: `maple-item` (또는 원하는 이름)
   - Google Analytics: 선택 사항 (추천: 사용 안 함)
   - "프로젝트 만들기" 클릭

## 2. 웹 앱 추가

1. **웹 앱 등록**
   - 프로젝트 개요 페이지에서 `</>` (웹) 아이콘 클릭
   - 앱 닉네임: `maple-item-web`
   - Firebase Hosting: 체크 안 함 (Vercel 사용)
   - "앱 등록" 클릭

2. **설정 정보 복사**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123..."
   };
   ```

## 3. Firebase Storage 설정 (이미지 업로드용)

1. **Storage 활성화**
   - 좌측 메뉴에서 "Build" > "Storage" 클릭
   - "시작하기" 클릭

2. **보안 규칙 설정**
   - "규칙" 탭 클릭
   - 아래 규칙 입력:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         // 읽기: 모두 허용
         allow read: if true;
         // 쓰기: 이미지 파일만, 5MB 이하
         allow write: if request.resource.size < 5 * 1024 * 1024
                      && request.resource.contentType.matches('image/.*');
       }
     }
   }
   ```
   - "게시" 클릭

## 4. Firestore 설정 (데이터 저장용)

1. **Firestore 활성화**
   - 좌측 메뉴에서 "Build" > "Firestore Database" 클릭
   - "데이터베이스 만들기" 클릭
   - 위치: `asia-northeast3` (서울) 선택
   - 보안 규칙: "프로덕션 모드에서 시작" 선택

2. **보안 규칙 설정**
   - "규칙" 탭 클릭
   - 아래 규칙 입력:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // posts 컬렉션
       match /posts/{postId} {
         allow read: if true;
         allow write: if false; // 관리자 페이지에서만 작성
       }
       
       // reviews 컬렉션
       match /reviews/{reviewId} {
         allow read: if true;
         allow create: if true; // 누구나 후기 작성 가능
         allow update, delete: if false;
       }
     }
   }
   ```
   - "게시" 클릭

## 5. 환경 변수 설정

1. **.env.local 파일 수정**
   - 프로젝트 루트의 `.env.local` 파일 열기
   - Firebase Console에서 복사한 설정 값으로 수정:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=실제-API-키
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=프로젝트ID.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=프로젝트ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=프로젝트ID.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=실제-Sender-ID
   NEXT_PUBLIC_FIREBASE_APP_ID=실제-App-ID
   ```

2. **Vercel 환경 변수 설정** (배포 시)
   - Vercel 대시보드 > 프로젝트 > Settings > Environment Variables
   - 위 6개 환경 변수 모두 추가
   - Production, Preview, Development 모두 체크

## 6. 완료!

설정이 완료되면:
- ✅ 이미지 업로드 가능
- ✅ 게시글/후기 클라우드 저장
- ✅ 실시간 동기화

개발 서버 재시작:
```bash
npm run dev
```
