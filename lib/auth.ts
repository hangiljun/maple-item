"use client";

import { useState, useEffect } from 'react';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

// Admin UID 화이트리스트 (환경변수로 관리)
// 쉼표로 구분하여 여러 관리자 추가 가능 (예: "UID1,UID2,UID3")
const ADMIN_UIDS = process.env.NEXT_PUBLIC_ADMIN_UIDS?.split(',').map(uid => uid.trim()) || [];

/**
 * Firebase Auth 상태 관리 훅
 * @returns {object} user, loading, isAdmin
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const isAdmin = user ? ADMIN_UIDS.includes(user.uid) : false;

  return { user, loading, isAdmin };
}

/**
 * 이메일/비밀번호로 로그인
 * @param email - 관리자 이메일
 * @param password - 비밀번호
 * @throws Firebase Auth 에러
 */
export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

/**
 * 로그아웃
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * 동기적으로 현재 사용자가 관리자인지 확인
 * 주의: 클라이언트에서만 사용, 서버 컴포넌트에서는 사용 불가
 * @returns {boolean} 관리자 여부
 */
export function isAdmin(): boolean {
  const user = auth.currentUser;
  return user ? ADMIN_UIDS.includes(user.uid) : false;
}

/**
 * Firebase Auth 에러 메시지를 한글로 변환
 * @param errorCode - Firebase Auth 에러 코드
 * @returns {string} 한글 에러 메시지
 */
export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 주소입니다.';
    case 'auth/user-disabled':
      return '비활성화된 계정입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 계정입니다.';
    case 'auth/wrong-password':
      return '비밀번호가 올바르지 않습니다.';
    case 'auth/invalid-credential':
      return '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 'auth/too-many-requests':
      return '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
    case 'auth/network-request-failed':
      return '네트워크 연결을 확인해주세요.';
    default:
      return '로그인에 실패했습니다. 다시 시도해주세요.';
  }
}
