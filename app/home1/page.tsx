'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Copy,
  Gem,
  Menu,
  MessageCircle,
  Star,
  X,
} from 'lucide-react'
import { Footer } from '@/components/navigation/footer'
import { getLatestReviews } from '@/lib/posts'
import type { Review } from '@/lib/types'
import { Home1SeoContent } from './home1-seo-content'
import styles from './home1.module.css'

const kakaoUrl = 'https://open.kakao.com/o/sgGZ8ICi'

// 상시 오픈 14개 월드 + 챌린저스 전체 월드
const servers = [
  '스카니아', '베라', '루나', '제니스', '크로아', '유니온', '엘리시움', '이노시스',
  '레드', '오로라', '아케인', '노바', '에오스', '핼리오스',
  '챌린저스1', '챌린저스2', '챌린저스3', '챌린저스4',
]

const steps = [
  {
    time: '약 1분',
    num: '01',
    title: '카카오톡 문의',
    desc: '아이템 스크린샷과 서버 정보를 전송해주시면 빠르게 확인해드립니다.',
    items: ['아이템 스크린샷 전송', '서버 정보 입력', '거래 가능 시간 선택'],
  },
  {
    time: '약 3분',
    num: '02',
    title: '실시간 시세 확인 및 가격 제시',
    desc: '경매장 시세를 직접 확인하여 투명한 가격을 제시해드립니다.',
    items: ['경매장 실시간 확인', '투명한 가격 제시', '옵션별 차액 설명'],
  },
  {
    time: '약 5분',
    num: '03',
    title: '거래 완료',
    desc: '게임 내 직거래 후 신속하게 대금을 지급받으세요.',
    items: ['게임 내 안전한 직거래', '거래 완료 확인', '빠른 정산 완료'],
  },
]

// 시세 확인 팝업에 쓰이는 카테고리별 구매 비율 (예시 수치 · 실제 운영 기준으로 교체 필요)
const priceCategories = [
  {
    key: 'armor',
    label: '방어구류',
    items: [
      { name: '방어구', desc: '에테르넬, 아케인, 앱솔랩스, 카루타 등', rate: '시세 80~85%' },
      { name: '23성 이상 스타포스 방어구', desc: '', rate: '가격 조정' },
    ],
  },
  {
    key: 'accessory',
    label: '악세서리류',
    items: [
      { name: '스텟 장신구', desc: '반지, 펜던트, 귀고리, 벨트, 눈장식, 얼굴장식', rate: '시세 80~85%' },
      { name: '드랍 · 메소 획득량 장신구', desc: '반지, 펜던트, 귀고리, 벨트, 눈장식, 얼굴장식', rate: '시세 85~90%' },
    ],
  },
  {
    key: 'weapon',
    label: '무기류',
    items: [
      { name: '보조무기 · 엠블렘', desc: '각종 직업별 보조무기, 미트라 엠블렘 등', rate: '시세 80~85%' },
      { name: '아케인 무기류', desc: '', rate: '시세 80%' },
    ],
  },
]

function PriceGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  const category = priceCategories[activeTab]

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="카테고리별 구매 시세">
        <div className={styles.modalHead}>
          <h3>카테고리별 구매 시세</h3>
          <button type="button" className={styles.modalClose} onClick={onClose} aria-label="닫기">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.modalTabs}>
          {priceCategories.map((c, i) => (
            <button
              key={c.key}
              type="button"
              className={`${styles.modalTab} ${i === activeTab ? styles.modalTabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <ul className={styles.modalList}>
          {category.items.map((item) => (
            <li key={item.name} className={styles.modalItem}>
              <div>
                <strong>{item.name}</strong>
                {item.desc && <p>{item.desc}</p>}
              </div>
              <span className={styles.modalRate}>{item.rate}</span>
            </li>
          ))}
        </ul>
        <a
          href={kakaoUrl}
          target="_blank"
          rel="noreferrer"
          className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonFull}`}
        >
          카톡으로 정확한 시세 문의하기 <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}

function useLatestReviews(count: number) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    getLatestReviews(count)
      .then((data) => {
        if (active) setReviews(data)
      })
      .catch((error) => {
        console.error('후기 불러오기 실패:', error)
      })
      .finally(() => {
        if (active) setLoaded(true)
      })
    return () => {
      active = false
    }
  }, [count])

  return { reviews, loaded }
}

const faqs: [string, string][] = [
  ['사진은 어떻게 보내면 되나요?', '장비창이나 아이템 상세 옵션이 보이도록 캡처해 카카오톡 오픈채팅으로 보내주세요. 부족한 내용은 상담 중에 안내해드립니다.'],
  ['견적을 받으면 꼭 판매해야 하나요?', '아닙니다. 견적과 거래 조건을 확인한 뒤 결정하시면 됩니다. 상담과 견적은 부담 없이 받아보세요.'],
  ['메소나 드롭템도 매입하나요?', '서버와 수량, 거래 가능 여부를 확인한 뒤 매입 가능 품목과 조건을 안내해드립니다.'],
]

function HeroLeadForm() {
  const [server, setServer] = useState('')
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [nickname, setNickname] = useState('')
  const [copied, setCopied] = useState(false)

  const template = `서버: ${server}\n아이템 또는 닉네임: ${item}\n희망가격: ${price}\n닉네임: ${nickname}`

  async function handleCopyAndOpen() {
    try {
      await navigator.clipboard.writeText(template)
    } catch {
      // 클립보드 접근이 막혀도 카카오톡 연결은 계속 진행
    }
    setCopied(true)
    window.open(kakaoUrl, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className={styles.templateCard}>
      <div className={styles.templateTop}>
        <div>
          <h3>판매하실 아이템 문의</h3>
          <p className={styles.templateNote}>내용을 적지 않고 문의하셔도 됩니다.</p>
        </div>
        <Clipboard size={22} />
      </div>
      <div className={styles.formGrid}>
        <label className={styles.formField}>
          <span>서버</span>
          <input value={server} onChange={(e) => setServer(e.target.value)} placeholder="예: 스카니아" />
        </label>
        <label className={styles.formField}>
          <span>아이템 또는 닉네임</span>
          <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="예: 하프이어링" />
        </label>
        <label className={styles.formField}>
          <span>희망가격</span>
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="예: 시세 문의" />
        </label>
        <label className={styles.formField}>
          <span>닉네임 (아이템 통 판매시)</span>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="인게임 닉네임" />
        </label>
      </div>
      <pre className={styles.templatePre}>{template}</pre>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonFull}`}
        onClick={handleCopyAndOpen}
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}
        {copied ? '복사 완료 · 카톡으로 이동' : '복사하고 카카오톡 연결하기'}
      </button>
    </div>
  )
}

export default function HomePreviewPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [priceModalOpen, setPriceModalOpen] = useState(false)
  const { reviews, loaded: reviewsLoaded } = useLatestReviews(3)

  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <a href="#top" className={styles.brand}>
            <span className={styles.brandMark}>
              <Gem size={17} />
            </span>
            <span>
              메이플<span className={styles.goldText}>아이템</span>
            </span>
          </a>
          <nav className={styles.desktopNav} aria-label="주요 메뉴">
            <Link href="/">홈</Link>
            <Link href="/guide">이용가이드</Link>
            <Link href="/reviews">후기게시판</Link>
            <Link href="/news">소식정보</Link>
            <Link href="/contact">문의하기</Link>
          </nav>
          <a
            className={`${styles.button} ${styles.buttonPrimary} ${styles.headerCta}`}
            href={kakaoUrl}
            target="_blank"
            rel="noreferrer"
          >
            상담 시작하기 <ArrowRight size={16} />
          </a>
          <button
            className={styles.mobileMenu}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="home1-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav id="home1-mobile-menu" className={styles.mobileNav} aria-label="모바일 메뉴">
            <Link href="/" onClick={() => setMenuOpen(false)}>홈</Link>
            <Link href="/guide" onClick={() => setMenuOpen(false)}>이용가이드</Link>
            <Link href="/reviews" onClick={() => setMenuOpen(false)}>후기게시판</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)}>소식정보</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>문의하기</Link>
          </nav>
        )}
      </header>

      <div className={styles.anchorBar}>
        <div className={`${styles.container} ${styles.anchorInner}`}>
          <span className={styles.anchorIntro}>빠른 이동</span>
          <a href="#selling-options">한 개 판매</a>
          <a href="#bulk-sale">통판매</a>
          <a href="#item-check">품목 확인</a>
          <a href="#trade-terms">견적·조건</a>
        </div>
      </div>

      <section id="top" className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`${styles.container} ${styles.heroContent}`}>
          <div className={styles.heroLeft}>
            <div className={styles.heroCopy}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                시세 업데이트 · 9월 11일 14:00 기준
              </div>
              <h1>
                메이플 아이템 정리,
                <br />
                <span>시세 기준</span>으로
                <br className={styles.desktopOnly} />
                <span className={styles.heroLastLine}> 깔끔하게 거래하세요.</span>
              </h1>
              <p>
                경매장 시세를 기준으로 빠르고 투명하게.
                <br className={styles.desktopOnly} />
                한 개부터 통판매까지 카톡으로 상담받아보세요.
              </p>
              <a href={kakaoUrl} target="_blank" rel="noreferrer" className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonLarge}`}>
                카톡으로 상담하기 <ArrowRight size={18} />
              </a>
            </div>
            <div className={styles.heroNote}>
              <strong>안전하고 투명한 거래</strong>
              <span>상담 후 조건 확인, 결정은 언제나 판매자님이 합니다.</span>
            </div>
          </div>
          <HeroLeadForm />
        </div>
      </section>

      <section id="selling-options" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeadingRow}>
            <h2>
              지금 판매하고 싶은
              <br />
              <span className={styles.goldText}>아이템만</span> 판매하세요.
            </h2>
          </div>
          <div className={styles.scenarioGrid}>
            <article className={`${styles.scenarioCard} ${styles.scenarioCardFeatured}`}>
              <span className={styles.scenarioNumber}>01</span>
              <h3>장비 한 개 정리</h3>
              <p>바꾼 장비나 남는 아이템 하나를 빠르게 정리하고 싶을 때</p>
              <a href={kakaoUrl} target="_blank" rel="noreferrer">
                한 개 판매 문의 <ArrowRight size={16} />
              </a>
            </article>
            <article className={styles.scenarioCard}>
              <span className={styles.scenarioNumber}>02</span>
              <h3>여러 부위 통판매</h3>
              <p>메이플을 접거나 인벤토리를 한 번에 정리하고 싶을 때</p>
              <a href="#bulk-sale">
                통판매 준비하기 <ArrowRight size={16} />
              </a>
            </article>
            <article className={styles.scenarioCard}>
              <span className={styles.scenarioNumber}>03</span>
              <h3>얼마인지부터 확인</h3>
              <p>매입 가능 여부와 금액이 먼저 궁금할 때</p>
              <button type="button" onClick={() => setPriceModalOpen(true)}>
                시세 확인하기 <ArrowRight size={16} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="bulk-sale" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.container} ${styles.narrow}`}>
          <div className={styles.splitCopy}>
            <h2>
              통판매는
              <br />
              <span className={styles.goldText}>이것만 준비</span>하세요.
            </h2>
            <p>판매할 아이템이 많아도 복잡하게 정리할 필요 없습니다. 아래 세 가지만 준비해주시면 상담이 훨씬 빨라집니다.</p>
            <ul className={styles.checkList}>
              <li>
                <CheckCircle2 />
                <span>
                  <strong>판매할 부위와 남길 장비 구분</strong>
                  <small>판매 범위를 먼저 정해두면 정확한 견적이 가능합니다.</small>
                </span>
              </li>
              <li>
                <CheckCircle2 />
                <span>
                  <strong>일괄 판매 여부</strong>
                  <small>통판매인지, 일부만 판매할지도 함께 알려주세요.</small>
                </span>
              </li>
              <li>
                <CheckCircle2 />
                <span>
                  <strong>접속 여부</strong>
                  <small>현재 접속하지 않으셔도 시세를 확인할 수 있습니다.</small>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="item-check" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeadingRow}>
            <h2>
              <span className={styles.goldText}>아이템 사진</span> 또는 <span className={styles.goldText}>닉네임</span>을 알려주세요!
            </h2>
            <p>
              아이템군마다 견적에 필요한 정보가 조금씩 다릅니다.
              <br />
              아래 항목이 잘 보이도록 보내주세요.
            </p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>아이템</th>
                  <th>아이템 세부 내용</th>
                  <th>구매 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="아이템">
                    <span className={styles.itemName}>
                      무기 · 방어구
                      <small>보조무기 포함</small>
                    </span>
                  </td>
                  <td data-label="세부 내용">보조무기, 에테르넬, 아케인, 앱솔랩스, 카루타 장비 등 모든 아이템</td>
                  <td data-label="구매 여부" className={styles.available}><Check aria-hidden="true" /><span>구매 가능</span></td>
                </tr>
                <tr>
                  <td data-label="아이템">장신구</td>
                  <td data-label="세부 내용">칠흑 아이템, 여명 세트, 가디언 엔젤링 등 모든 아이템</td>
                  <td data-label="구매 여부" className={styles.available}><Check aria-hidden="true" /><span>구매 가능</span></td>
                </tr>
                <tr>
                  <td data-label="아이템">드롭률 · 메획템</td>
                  <td data-label="세부 내용">하프이어링, 펜던트, 반지, 눈장식 등</td>
                  <td data-label="구매 여부" className={styles.available}><Check aria-hidden="true" /><span>구매 가능</span></td>
                </tr>
                <tr>
                  <td data-label="아이템">캐시 아이템</td>
                  <td data-label="세부 내용" className={styles.notAvailable}>캐시 아이템은 구매하면 교환할 수 없어 매입이 어렵습니다.</td>
                  <td data-label="구매 여부" className={styles.notAvailable}><X aria-hidden="true" /><span>구매 불가</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="trade-terms" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeadingRow}>
            <h2>
              견적부터 거래까지,
              <br />
              <span className={styles.goldText}>세 단계</span>면 충분합니다.
            </h2>
            <p>
              판매자님이 이해하고 결정할 수 있도록
              <br />
              과정과 조건을 먼저 투명하게 안내합니다.
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div className={styles.stepCard} key={step.num}>
                <div className={styles.stepHead}>
                  <span className={styles.stepTime}>{step.time}</span>
                  <span className={styles.stepNumber}>{step.num}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <ul className={styles.stepList}>
                  {step.items.map((item) => (
                    <li key={item}>
                      <Check size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.narrow}`}>
          <div className={styles.serverTitle}>
            <h2>
              전체 월드 <span className={styles.goldText}>어디서든</span> 거래 가능합니다.
            </h2>
            <span>일반 서버 14개 + 챌린저스 전체 · 총 {servers.length}개 월드</span>
          </div>
          <div className={styles.serverTags}>
            {servers.map((server) => (
              <span key={server}>{server}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeadingRow}>
            <h2>
              먼저 정리해본
              <br />
              <span className={styles.goldText}>판매자</span>들의 이야기.
            </h2>
            <Link href="/reviews" className={styles.outlineLink}>
              후기 더 보기 <ArrowRight size={16} />
            </Link>
          </div>
          {reviews.length > 0 ? (
            <div className={styles.reviewGrid}>
              {reviews.map((review) => (
                <article className={styles.reviewCard} key={review.id}>
                  <div className={styles.reviewTop}>
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className={styles.verified}>
                      <Check size={12} /> 거래인증
                    </span>
                  </div>
                  <p>&ldquo;{review.content}&rdquo;</p>
                  <div className={styles.reviewAuthor}>
                    <strong>{review.author}</strong>
                    <span>{review.date}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            reviewsLoaded && (
              <p className={styles.reviewEmpty}>아직 등록된 후기가 없습니다. 첫 거래 후기의 주인공이 되어보세요.</p>
            )
          )}
        </div>
      </section>

      <section id="guide" className={styles.section}>
        <div className={`${styles.container} ${styles.faqLayout}`}>
          <div>
            <h2>
              많이 묻는
              <br />
              <span className={styles.goldText}>질문</span>에 답해드려요.
            </h2>
            <Link href="/guide" className={styles.outlineLink}>
              더 보기 <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.faqList}>
            {faqs.map(([question, answer]) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Home1SeoContent />

      <Footer />

      <a href={kakaoUrl} target="_blank" rel="noreferrer" className={styles.floatingChat}>
        <MessageCircle size={18} />
        <span>카톡으로 상담하기</span>
      </a>

      <PriceGuideModal open={priceModalOpen} onClose={() => setPriceModalOpen(false)} />
    </main>
  )
}
