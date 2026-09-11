'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Clock3,
  Copy,
  Gem,
  Menu,
  MessageCircle,
  ShieldCheck,
  Star,
  X,
  Zap,
} from 'lucide-react'
import styles from './home1.module.css'

const kakaoUrl = 'https://open.kakao.com/o/sgGZ8ICi'

const servers = [
  '스카니아', '루나', '엘리시움', '크로아', '베라', '오로라', '레드', '이노시스',
  '유니온', '아케인', '노바', '에오스', '핼리오스', '챌린저스', '제니스', '엔젤릭버스터',
]

const reviews = [
  { name: '판매자 A', text: '사진 몇 장 보냈는데 시세부터 조건까지 바로 정리해주셔서 빠르게 처리했습니다.', date: '2026. 09. 08' },
  { name: '판매자 B', text: '통판매라 막막했는데 필요한 사진만 알려주고 입금까지 깔끔하게 진행됐어요.', date: '2026. 09. 04' },
  { name: '판매자 C', text: '경매장 시세 기준으로 설명해줘서 납득하고 판매했습니다. 다음에도 이용할게요.', date: '2026. 08. 29' },
]

const faqs: [string, string][] = [
  ['사진은 어떻게 보내면 되나요?', '장비창이나 아이템 상세 옵션이 보이도록 캡처해 카카오톡 오픈채팅으로 보내주세요. 부족한 내용은 상담 중에 안내해드립니다.'],
  ['견적을 받으면 꼭 판매해야 하나요?', '아닙니다. 견적과 거래 조건을 확인한 뒤 결정하시면 됩니다. 상담과 견적은 부담 없이 받아보세요.'],
  ['메소나 드롭템도 매입하나요?', '서버와 수량, 거래 가능 여부를 확인한 뒤 매입 가능 품목과 조건을 안내해드립니다.'],
]

function SectionLabel({ children }: { children: string }) {
  return (
    <p className={styles.sectionLabel}>
      <span />
      {children}
    </p>
  )
}

function CopyTemplate() {
  const [copied, setCopied] = useState(false)
  const template = `서버: \n판매할 아이템: \n판매 방식: 한 개 / 통판매\n희망 조건: `

  async function copyTemplate() {
    await navigator.clipboard.writeText(template)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={styles.templateCard}>
      <div className={styles.templateTop}>
        <div>
          <span className={styles.eyebrow}>QUICK MESSAGE</span>
          <h3>
            카톡에 붙여넣을
            <br />
            문의 양식
          </h3>
        </div>
        <Clipboard size={22} />
      </div>
      <pre className={styles.templatePre}>{template}</pre>
      <button
        className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonFull}`}
        onClick={copyTemplate}
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}
        {copied ? '복사 완료' : '양식 복사'}
      </button>
    </div>
  )
}

export default function HomePreviewPage() {
  const [showServers, setShowServers] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
            <a href="#top">홈</a>
            <a href="#trade-terms">이용가이드</a>
            <a href="#reviews">후기게시판</a>
            <a href="#guide">소식정보</a>
            <a href="#contact">문의하기</a>
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
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className={styles.mobileNav}>
            <a href="#top" onClick={() => setMenuOpen(false)}>홈</a>
            <a href="#trade-terms" onClick={() => setMenuOpen(false)}>이용가이드</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>후기게시판</a>
            <a href="#guide" onClick={() => setMenuOpen(false)}>소식정보</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>문의하기</a>
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
          <div className={styles.heroCopy}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              시세 업데이트 · 9월 11일 14:00 기준
            </div>
            <h1>
              아이템 정리,
              <br />
              <span>받을 금액부터</span> 확인하세요.
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
            <ShieldCheck size={18} />
            <div>
              <strong>안전하고 투명한 거래</strong>
              <span>상담 후 조건 확인, 결정은 언제나 판매자님이 합니다.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="selling-options" className={styles.section}>
        <div className={styles.container}>
          <SectionLabel>01 / SELLING OPTIONS</SectionLabel>
          <div className={styles.sectionHeadingRow}>
            <div>
              <h2>
                지금 내 상황에
                <br />
                <span className={styles.goldText}>맞는 방법</span>을 찾아보세요.
              </h2>
            </div>
            <p>
              무엇을 팔지, 어떻게 팔지 정해지지 않아도 괜찮습니다.
              <br />
              상황에 맞춰 가장 간단한 방법부터 안내해드릴게요.
            </p>
          </div>
          <div className={styles.scenarioGrid}>
            <article className={`${styles.scenarioCard} ${styles.scenarioCardFeatured}`}>
              <span className={styles.scenarioNumber}>01</span>
              <div className={styles.scenarioIcon}>
                <Zap size={23} />
              </div>
              <h3>장비 한 개 정리</h3>
              <p>바꾼 장비나 남는 아이템 하나를 빠르게 정리하고 싶을 때</p>
              <a href={kakaoUrl} target="_blank" rel="noreferrer">
                한 개 판매 문의 <ArrowRight size={16} />
              </a>
            </article>
            <article className={styles.scenarioCard}>
              <span className={styles.scenarioNumber}>02</span>
              <div className={styles.scenarioIcon}>
                <Clipboard size={23} />
              </div>
              <h3>여러 부위 통판매</h3>
              <p>메이플을 접거나 인벤토리를 한 번에 정리하고 싶을 때</p>
              <a href="#bulk-sale">
                통판매 준비하기 <ArrowRight size={16} />
              </a>
            </article>
            <article className={styles.scenarioCard}>
              <span className={styles.scenarioNumber}>03</span>
              <div className={styles.scenarioIcon}>
                <Clock3 size={23} />
              </div>
              <h3>얼마인지부터 확인</h3>
              <p>매입 가능 여부와 금액이 먼저 궁금할 때</p>
              <a href={kakaoUrl} target="_blank" rel="noreferrer">
                시세 확인하기 <ArrowRight size={16} />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="bulk-sale" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.container} ${styles.splitSection}`}>
          <div className={styles.splitCopy}>
            <SectionLabel>02 / BULK SALE</SectionLabel>
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
                  <strong>장비창 전체 사진</strong>
                  <small>아이템의 전체 구성이 보이도록 캡처해주세요.</small>
                </span>
              </li>
              <li>
                <CheckCircle2 />
                <span>
                  <strong>일괄 판매 여부</strong>
                  <small>통판매인지, 일부만 판매할지도 함께 알려주세요.</small>
                </span>
              </li>
            </ul>
          </div>
          <CopyTemplate />
        </div>
      </section>

      <section id="item-check" className={styles.section}>
        <div className={styles.container}>
          <SectionLabel>03 / ITEM CHECK</SectionLabel>
          <div className={styles.sectionHeadingRow}>
            <h2>
              사진 한 장에
              <br />
              <span className={styles.goldText}>이 내용</span>이 보이면 좋아요.
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
                  <th>아이템군</th>
                  <th>사진에서 확인할 내용</th>
                  <th>빠른 체크</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    무기 · 방어구
                    <br />
                    <span>보조무기 포함</span>
                  </td>
                  <td>잠재능력, 추가옵션, 스타포스, 작 상태</td>
                  <td><Check /></td>
                </tr>
                <tr>
                  <td>장신구</td>
                  <td>잠재능력, 추옵, 세트 효과, 교환 가능 여부</td>
                  <td><Check /></td>
                </tr>
                <tr>
                  <td>드롭템 · 메획템</td>
                  <td>아이템 종류, 옵션 수치, 보유 수량</td>
                  <td><Check /></td>
                </tr>
                <tr>
                  <td>기타 · 메소</td>
                  <td>서버, 수량, 거래 가능 조건</td>
                  <td><Check /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="trade-terms" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <SectionLabel>04 / ESTIMATE & TERMS</SectionLabel>
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
          <div className={styles.process}>
            <div className={styles.processLine} />
            {[
              ['01', '서버 · 옵션 확인', '보내주신 사진과 서버 정보를 바탕으로 매입 가능 여부를 확인합니다.'],
              ['02', '견적 · 비용 확인', '현재 경매장 시세와 아이템 상태를 기준으로 금액을 안내합니다.'],
              ['03', '조건 확인 후 결정', '거래 방법과 조건을 모두 확인한 뒤 판매 여부를 결정합니다.'],
            ].map(([num, title, text]) => (
              <div className={styles.processStep} key={num}>
                <span className={styles.processNumber}>{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.narrow}`}>
          <SectionLabel>SUPPORTED SERVERS</SectionLabel>
          <div className={styles.serverTitle}>
            <h2>
              거래 가능한 <span className={styles.goldText}>서버</span>를 확인하세요.
            </h2>
            <span>현재 {servers.length}개 서버 상담 가능</span>
          </div>
          <div className={styles.serverTags}>
            {servers.slice(0, showServers ? 16 : 8).map((server) => (
              <span key={server}>{server}</span>
            ))}
          </div>
          <button className={styles.textButton} onClick={() => setShowServers(!showServers)}>
            {showServers ? '접기' : '더보기'} <ChevronDown size={16} className={showServers ? styles.rotate : ''} />
          </button>
        </div>
      </section>

      <section id="reviews" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <SectionLabel>REAL REVIEWS</SectionLabel>
          <div className={styles.sectionHeadingRow}>
            <h2>
              먼저 정리해본
              <br />
              <span className={styles.goldText}>판매자</span>들의 이야기.
            </h2>
            <a href="#contact" className={styles.outlineLink}>
              후기 더 보기 <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <article className={styles.reviewCard} key={review.name}>
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
                <p>&ldquo;{review.text}&rdquo;</p>
                <div className={styles.reviewAuthor}>
                  <strong>{review.name}</strong>
                  <span>{review.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className={styles.section}>
        <div className={`${styles.container} ${styles.faqLayout}`}>
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2>
              많이 묻는
              <br />
              <span className={styles.goldText}>질문</span>에 답해드려요.
            </h2>
            <a href="#contact" className={styles.outlineLink}>
              FAQ 더 보기 <ArrowRight size={16} />
            </a>
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

      <section id="contact" className={styles.ctaSection}>
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div>
            <span className={styles.eyebrow}>EASY CONSULTATION</span>
            <h2>
              궁금한 아이템,
              <br />
              <span>편하게 물어보세요.</span>
            </h2>
            <p>사진 한 장이면 충분합니다. 먼저 이야기부터 나눠보세요.</p>
          </div>
          <a href={kakaoUrl} target="_blank" rel="noreferrer" className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonLarge}`}>
            카톡으로 상담하기 <MessageCircle size={18} />
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div>
            <a href="#top" className={styles.brand}>
              <span className={styles.brandMark}>
                <Gem size={17} />
              </span>
              <span>
                메이플<span className={styles.goldText}>아이템</span>
              </span>
            </a>
            <p>
              아이템을 정리하는 가장 간단한 방법.
              <br />
              시세 기준의 투명한 매입 상담.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <strong>빠른 링크</strong>
            <a href="#selling-options">판매 시나리오</a>
            <a href="#trade-terms">이용 가이드</a>
            <a href="#reviews">거래 후기</a>
          </div>
          <div className={styles.footerContact}>
            <strong>문의하기</strong>
            <a href={kakaoUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> 카카오톡 오픈채팅
            </a>
          </div>
        </div>
        <div className={`${styles.container} ${styles.copyright}`}>© 2026 메이플아이템. All rights reserved.</div>
      </footer>

      <a href={kakaoUrl} target="_blank" rel="noreferrer" className={styles.floatingChat}>
        <MessageCircle size={18} />
        <span>카톡으로 상담하기</span>
      </a>
    </main>
  )
}
