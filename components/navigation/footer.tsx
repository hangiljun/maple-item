"use client";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { SITE_NAME, KAKAO_LINK, KAKAO_ID } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";
const links=[{href:"/",label:"홈"},{href:"/guide",label:"이용가이드"},{href:"/reviews",label:"후기게시판"},{href:"/news",label:"소식정보"},{href:"/contact",label:"문의하기"}];
export function Footer(){
 const pathname=usePathname(); if(pathname?.startsWith("/admin")) return null;
 return <footer className={styles.footer}><div className={styles.inner}>
  <div className={styles.top}><div className={styles.brand}><strong>{SITE_NAME}</strong><p>메이플스토리 아이템을 판매하려는 분들을 위한 구매 상담 서비스입니다.</p></div>
  <a href={KAKAO_LINK} target="_blank" rel="noreferrer" className={styles.contact}><MessageCircle size={18} aria-hidden="true"/><span><small>365일 24시간 문의 접수</small>카카오톡 상담하기</span><ArrowUpRight size={18} aria-hidden="true"/></a></div>
  <div className={styles.middle}><nav aria-label="푸터 메뉴">{links.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><div className={styles.info}><span>카카오톡 ID</span><a href={KAKAO_LINK} target="_blank" rel="noreferrer">{KAKAO_ID}</a></div></div>
  <div className={styles.bottom}><p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p></div>
 </div></footer>;
}
