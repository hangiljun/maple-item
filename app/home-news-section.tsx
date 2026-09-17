'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import styles from './page.module.css'

// 메인 페이지 "메이플 소식" 섹션에 넘기는 최소 데이터 (본문은 넘기지 않음)
export type HomeNewsItem = {
  id: string
  title: string
  category: string
  date: string
  image?: string
}

// 대표 이미지가 없는 글은 사이트 기본 이미지로 표시
const FALLBACK_IMAGE = '/og-image.png'

export function HomeNewsSection({ posts }: { posts: HomeNewsItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (posts.length === 0) return null

  const active = posts[Math.min(activeIndex, posts.length - 1)]

  return (
    <section id="news" className={styles.newsSection}>
      <div className={`${styles.container} ${styles.newsInner}`}>
        <div className={styles.sectionHeadingRow}>
          <h2>
            판매 전에 확인하는
            <br />
            <span className={styles.goldText}>메이플 소식</span>.
          </h2>
          <Link href="/news" className={styles.outlineLink}>
            소식 더 보기 <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.newsLayout}>
          <ol className={styles.newsList}>
            {posts.map((post, index) => (
              <li key={post.id}>
                <Link
                  href={`/news/${post.id}`}
                  className={`${styles.newsItem} ${index === activeIndex ? styles.newsItemActive : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <span className={styles.newsNum} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.newsTitle}>{post.title}</span>
                  <ArrowRight size={17} aria-hidden="true" className={styles.newsArrow} />
                </Link>
              </li>
            ))}
          </ol>

          <Link href={`/news/${active.id}`} className={styles.newsVisual} tabIndex={-1} aria-hidden="true">
            {posts.map((post, index) => (
              <Image
                key={post.id}
                src={post.image || FALLBACK_IMAGE}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 500px"
                unoptimized
                className={`${styles.newsVisualImg} ${index === activeIndex ? styles.newsVisualImgActive : ''}`}
              />
            ))}
            <span className={styles.newsCaption}>
              <small>
                {active.category} · {active.date}
              </small>
              <span>{active.title}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
