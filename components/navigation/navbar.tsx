'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { KAKAO_LINK } from '@/lib/constants'
import styles from './navbar.module.css'

const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/guide', label: '이용가이드' },
  { href: '/reviews', label: '후기게시판' },
  { href: '/news', label: '소식정보' },
  { href: '/contact', label: '문의하기' },
]

export function Navbar() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <NavbarContent key={pathname} />
}

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false)

  // 모바일 메뉴 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="메이플아이템 홈으로 이동">
          <Image
            src="/logo.png"
            alt="메이플아이템 로고"
            width={180}
            height={45}
            className={styles.brandLogo}
            priority
            quality={90}
          />
        </Link>

        <ul className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <a
          href={KAKAO_LINK}
          target="_blank"
          rel="noreferrer"
          className={`${styles.button} ${styles.desktopCta}`}
        >
          상담 시작하기 <ArrowRight size={16} />
        </a>

        <button
          type="button"
          className={styles.mobileMenuButton}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <nav id="site-mobile-menu" className={styles.mobileNav} aria-label="모바일 메뉴">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noreferrer"
            className={`${styles.button} ${styles.mobileCta}`}
            onClick={() => setMenuOpen(false)}
          >
            상담 시작하기 <ArrowRight size={16} />
          </a>
        </nav>
      )}
    </nav>
  )
}
