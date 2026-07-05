import type { Review } from "./types";

export const initialReviews: Review[] = [
  {
    id: 1,
    author: "메린이★",
    server: "스카니아",
    date: "2026-06-29",
    content: "처음 거래해봤는데 진짜 빠르고 다른데보다 돈 더 줌 ㅇㅈ",
    likes: 24,
    helpful: true
  },
  {
    id: 2,
    author: "불독전사",
    server: "루나",
    date: "2026-06-28",
    content: "급처템 팔았는데 시세 확인 제대로 해주고 답장도 빠름 굿",
    likes: 18,
    helpful: true
  },
  {
    id: 3,
    author: "달빛궁수",
    server: "엘리시움",
    date: "2026-06-27",
    content: "급처템 팔았는데 안전하고 입금 바로됨 여기 괜찮음",
    likes: 31,
    helpful: true
  },
];

// 브라우저 환경에서만 localStorage 사용
export function getReviews(): Review[] {
  if (typeof window === 'undefined') {
    return initialReviews;
  }

  const saved = localStorage.getItem("reviews");
  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem("reviews", JSON.stringify(initialReviews));
  return initialReviews;
}

export function getLatestReviews(count: number = 3): Review[] {
  const reviews = getReviews();
  return reviews.slice(0, count);
}
