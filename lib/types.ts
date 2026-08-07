export interface Review {
  id: string;
  author: string;
  server?: string; // 선택 필드로 변경
  date: string;
  content: string;
  image?: string; // 사진 URL (선택)
  likes: number;
  views?: number; // 조회수
  helpful: boolean;
}

export interface NewsPost {
  id: string;
  category: string;
  icon: string;
  title: string;
  excerpt?: string; // 요약 (1-2문장, 선택)
  date: string;
  time: string;
  featured: boolean;
  pinned: boolean;
  content: string;
  details: string[];
  tag: string;
  // 스타일 옵션
  titleColor?: string;
  titleSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  contentColor?: string;
  contentSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  image?: string; // 대표 이미지 URL (선택)
  // Firestore 타임스탬프
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
}

export interface TextStyle {
  color?: string;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  bold?: boolean;
}
