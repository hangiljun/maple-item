import type { Metadata } from 'next';
import Link from 'next/link';
import { Gem, ArrowUpRight } from 'lucide-react';
import { KAKAO_LINK } from '@/lib/constants';
import styles from './news.module.css';

export const metadata: Metadata = {
  title: '메이플스토리 소식·이벤트 정보',
  description: '메이플스토리 이벤트와 아이템 시세, 판매 전에 알아두면 좋은 정보를 정리합니다.',
  robots: { index: true, follow: true },
  openGraph: {
    title: '메이플스토리 소식·이벤트 정보',
    description: '메이플스토리 이벤트와 아이템 시세, 판매 전에 알아두면 좋은 정보.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>
    <a className={styles.skip} href="#news-main">본문 바로가기</a>
    <header className={styles.header}><div className={styles.headerInner}>
      <Link href="/" className={styles.brand}><Gem size={23} aria-hidden="true" /><span>메이플<span>아이템</span></span></Link>
      <nav aria-label="주요 메뉴" className={styles.nav}><Link href="/">홈</Link><Link href="/guide">이용가이드</Link><Link href="/reviews">거래후기</Link><Link href="/news">소식정보</Link></nav>
      <a href={KAKAO_LINK} target="_blank" rel="noreferrer" className={styles.primary}>판매 상담 <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div></header>
    <main id="news-main" className={styles.main}>{children}</main>
    <footer className={styles.footer}><div className={styles.container}><strong>메이플아이템</strong><p>메이플스토리 아이템을 판매하려는 분들을 위한 매입 상담 서비스입니다.</p><div><Link href="/guide">이용가이드</Link><Link href="/contact">문의하기</Link><span>© {new Date().getFullYear()} 메이플아이템</span></div></div></footer>
  </div>;
}
