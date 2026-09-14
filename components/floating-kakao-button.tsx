'use client'

import { MessageCircle } from 'lucide-react'
import { KAKAO_LINK } from '@/lib/constants'
import styles from './floating-kakao-button.module.css'

export function FloatingKakaoButton() {
  return (
    <a
      href={KAKAO_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingChat}
      aria-label="카카오톡으로 상담하기"
    >
      <MessageCircle size={18} />
      <span>카톡으로 상담하기</span>
    </a>
  )
}
