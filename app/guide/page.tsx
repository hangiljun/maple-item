import type { Metadata } from 'next'
import { AlertTriangle, ArrowRight, Check, CircleCheck, Clock3, MessageCircle } from 'lucide-react'
import { KAKAO_ID, KAKAO_LINK, SERVERS } from '@/lib/constants'
import styles from './guide.module.css'

export const metadata: Metadata = {
  title: '메이플 아이템 판매 방법 | 이용가이드',
  description: '메이플스토리 아이템 판매에 필요한 정보와 거래 절차를 안내합니다. 카카오톡 문의, 시세 확인, 게임 내 직거래 과정을 순서대로 확인하세요.',
  alternates: { canonical: 'https://mapleitem.co.kr/guide' },
  openGraph: {
    title: '메이플 아이템 판매 방법 | 메이플아이템',
    description: '문의 준비부터 시세 확인, 게임 내 직거래까지 판매 절차를 확인하세요.',
    url: 'https://mapleitem.co.kr/guide',
    images: ['/og-image.png'],
  },
}

const steps = [
  { number: '01', title: '판매 정보 보내기', description: '카카오톡으로 서버와 아이템 정보를 보내주세요.', items: ['아이템 전체 스크린샷', '잠재능력·추가옵션 등 상세 화면', '서버와 캐릭터 닉네임'] },
  { number: '02', title: '시세와 견적 확인', description: '경매장 매물과 옵션을 확인한 뒤 구매 가격을 안내합니다.', items: ['현재 경매장 매물 확인', '아이템 옵션별 가치 반영', '구매 가격 안내 및 협의'] },
  { number: '03', title: '게임에서 거래하기', description: '가격에 동의하면 약속한 캐릭터와 게임 내에서 거래합니다.', items: ['거래 캐릭터 정보 확인', '게임 내 직거래 진행', '거래 완료 후 대금 지급'] },
]

const faqs = [
  { question: '견적을 받은 뒤 꼭 판매해야 하나요?', answer: '아니요. 안내받은 가격을 확인한 뒤 판매 여부를 자유롭게 결정할 수 있습니다.' },
  { question: '어떤 서버에서 거래할 수 있나요?', answer: `현재 안내 중인 ${SERVERS.length}개 서버에서 거래할 수 있습니다. 서버별 거래 가능 여부는 상담 시 한 번 더 확인해드립니다.` },
  { question: '시세는 어떻게 확인하나요?', answer: '현재 경매장 매물과 아이템의 주요 옵션을 함께 확인해 구매 가격을 안내합니다.' },
  { question: '거래는 얼마나 걸리나요?', answer: '아이템과 접속 상황에 따라 달라질 수 있습니다. 정보 확인이 빠르게 끝나면 문의부터 거래까지 평균 약 10분 정도가 걸립니다.' },
  { question: '거래 가능한 시간이 정해져 있나요?', answer: '문의는 365일 24시간 남길 수 있습니다. 답변과 실제 거래 시간은 상담에서 조율합니다.' },
  { question: '거래는 어떤 방식으로 진행되나요?', answer: '카카오톡으로 견적을 협의한 뒤, 안내받은 캐릭터를 확인하고 게임 내 직거래로 진행합니다.' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo', name: '메이플스토리 아이템 판매 방법',
      description: '메이플스토리 아이템 정보를 보내고 견적을 확인한 뒤 게임 내에서 거래하는 방법',
      totalTime: 'PT10M',
      step: steps.map((step) => ({ '@type': 'HowToStep', position: Number(step.number), name: step.title, text: step.description })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ],
}

export default function GuidePage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

      <section className={styles.hero} aria-labelledby="guide-title">
        <div className={styles.container}>
          <nav className={styles.anchorNav} aria-label="이용가이드 바로가기">
            <a href="#process">거래 절차</a><a href="#safety">안전 확인</a><a href="#servers">지원 서버</a><a href="#faq">자주 묻는 질문</a>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>메이플 아이템 판매 가이드</p>
              <h1 id="guide-title">아이템 판매,<br />무엇부터 보내야 할까요?</h1>
              <p className={styles.lead}>서버와 아이템 상세 화면을 준비하면 됩니다. 문의부터 견적 확인, 게임 내 거래까지 순서대로 알려드릴게요.</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={KAKAO_LINK} target="_blank" rel="noreferrer">판매 정보 보내기 <ArrowRight size={17} aria-hidden="true" /></a>
                <span><Clock3 size={16} aria-hidden="true" /> 평균 거래 시간 약 10분</span>
              </div>
            </div>
            <aside className={styles.prepCard} aria-labelledby="prep-title">
              <div className={styles.prepHeader}>
                <div><span>문의 전 준비</span><h2 id="prep-title">이 세 가지만 보내주세요</h2></div>
                <span className={styles.count}>3</span>
              </div>
              <ol className={styles.prepList}>
                <li><strong>서버</strong><span>예: 루나</span></li>
                <li><strong>아이템 사진</strong><span>옵션이 보이는 전체 화면</span></li>
                <li><strong>캐릭터 닉네임</strong><span>거래할 본인 캐릭터</span></li>
              </ol>
              <p><CircleCheck size={17} aria-hidden="true" /> 희망 거래 시간은 나중에 정해도 됩니다.</p>
            </aside>
          </div>
        </div>
      </section>

      <section id="process" className={styles.section} aria-labelledby="process-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>거래 절차</p><h2 id="process-title">문의부터 거래까지 세 단계입니다</h2><p>각 단계에서 무엇을 확인하는지 미리 살펴보세요.</p>
          </div>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p><ul>{step.items.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="safety" className={`${styles.section} ${styles.safetySection}`} aria-labelledby="safety-title">
        <div className={`${styles.container} ${styles.safetyGrid}`}>
          <div className={styles.safetyCopy}>
            <p className={styles.eyebrow}>안전 거래 확인</p><h2 id="safety-title">거래 전, 상대와 방식을 다시 확인하세요</h2><p>안내받지 않은 연락처나 외부 거래 방식으로 유도한다면 진행하지 마세요.</p>
          </div>
          <ul className={styles.safetyList}>
            <li><span>01</span><div><strong>공식 카카오톡 확인</strong><p>이 페이지에 표시된 링크와 카카오톡 ID를 이용하세요.</p></div></li>
            <li><span>02</span><div><strong>본인 아이템만 거래</strong><p>타인 명의 아이템은 거래하지 않습니다.</p></div></li>
            <li><span>03</span><div><strong>게임 내 직거래</strong><p>외부 사이트 결제나 별도 거래 방식을 사용하지 않습니다.</p></div></li>
            <li><span>04</span><div><strong>가격 합의 후 진행</strong><p>견적과 지급 방식을 확인한 다음 거래하세요.</p></div></li>
          </ul>
        </div>
      </section>

      <section id="servers" className={styles.section} aria-labelledby="servers-title">
        <div className={styles.container}>
          <div className={styles.serverHeading}>
            <div><p className={styles.eyebrow}>지원 서버</p><h2 id="servers-title">메이플스토리 전 서버 상담</h2></div>
            <p>거래 가능 여부는 아이템과 서버 상황에 따라 상담에서 확인합니다.</p>
          </div>
          <ul className={styles.serverList}>{SERVERS.map((server) => <li key={server}>{server}</li>)}</ul>
          <div className={styles.serverGuide}>
            <article>
              <h3>서버와 관계없이 아이템 판매를 상담할 수 있습니다</h3>
              <p>
                메이플아이템은 스카니아, 루나, 엘리시움, 크로아를 포함한 메이플스토리 전 서버의
                장비 아이템 판매 문의를 받고 있습니다. 같은 아이템이라도 서버의 경매장 매물과
                잠재능력, 추가옵션, 스타포스 상태에 따라 견적이 달라질 수 있습니다.
              </p>
            </article>
            <article>
              <h3>정확한 견적을 위한 아이템 정보</h3>
              <p>
                상담할 때 서버명과 캐릭터 닉네임, 아이템의 전체 옵션이 보이는 스크린샷을 함께 보내주세요.
                현재 매물과 주요 옵션을 확인한 뒤 구매 가격을 안내하며, 견적을 확인한 다음 판매 여부를
                결정할 수 있습니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div className={styles.faqIntro}><p className={styles.eyebrow}>자주 묻는 질문</p><h2 id="faq-title">문의 전에 많이 확인하는 내용</h2><p>더 궁금한 점은 카카오톡에서 아이템 정보와 함께 물어보세요.</p></div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <div className={`${styles.container} ${styles.cta}`}>
          <div><p className={styles.eyebrow}>판매 상담</p><h2 id="cta-title">준비한 정보를 보내고 견적을 확인하세요</h2><p>가격을 확인한 뒤 거래 여부를 결정할 수 있습니다.</p></div>
          <div className={styles.ctaActions}>
            <a href={KAKAO_LINK} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> 카카오톡 상담 시작</a>
            <span>카카오톡 ID <strong>{KAKAO_ID}</strong></span>
          </div>
        </div>
      </section>

      <aside className={styles.notice} aria-label="상표 안내"><AlertTriangle size={17} aria-hidden="true" />메이플스토리는 넥슨코리아의 등록 상표이며, 메이플아이템은 넥슨코리아와 제휴 또는 관계가 없습니다.</aside>
    </main>
  )
}
