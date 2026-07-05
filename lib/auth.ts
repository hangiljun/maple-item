"use client";

// 간단한 클라이언트 사이드 인증 (실제로는 서버 사이드 인증 사용 권장)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rlfwns55";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("admin_authenticated") === "true";
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("admin_authenticated", "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem("admin_authenticated");
}
