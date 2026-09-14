import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { KAKAO_LINK, KAKAO_ID } from '@/lib/constants'
import styles from './contact.module.css'

const questions = [
  ['시세만 확인해도 되나요?', '네. 안내받은 가격을 확인한 뒤 판매 여부를 자유롭게 결정할 수 있습니다.'],
  ['사진에는 어떤 정보가 보여야 하나요?', '아이템 이름과 잠재능력, 추가옵션, 스타포스 등 상세 옵션이 보이도록 전체 화면을 보내주세요. 여러 아이템이라면 각각의 사진을 함께 보내주시면 됩니다.'],
  ['언제 문의할 수 있나요?', '365일 24시간 문의를 남길 수 있습니다. 상담이 진행 중이면 답변이 늦어질 수 있으니 아이템 정보를 먼저 보내주세요.'],
  ['가격을 확인한 다음에는 어떻게 하나요?', '가격에 합의하면 거래 시간과 캐릭터를 확인하고 게임 내 직거래로 진행합니다. 자세한 과정은 이용가이드에서 확인할 수 있습니다.'],
]

export default function ContactPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>아이템 판매 상담</p>
        <div className={styles.heroGrid}>
          <div>
            <h1>팔고 싶은 아이템,<br />카카오톡으로 보내주세요.</h1>
            <p className={styles.lead}>서버와 아이템 옵션을 확인하고 구매 가격을 안내합니다.<br />견적을 받은 뒤 판매 여부를 결정하세요.</p>
            <p className={styles.hours}>365일 24시간 문의 접수</p>
          </div>
          <aside className={styles.contact} aria-labelledby="contact-channel">
            <MessageCircle size={28} aria-hidden="true" />
            <h2 id="contact-channel">카카오톡 상담</h2>
            <p>아래 버튼을 누르면 상담 채팅방으로 연결됩니다.</p>
            <a className={styles.primary} href={KAKAO_LINK} target="_blank" rel="noopener noreferrer">카카오톡으로 문의하기 <ArrowRight size={18} aria-hidden="true" /></a>
            <div className={styles.id}><span>카카오톡 ID</span><strong>{KAKAO_ID}</strong></div>
          </aside>
        </div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="prepare-title">
      <div className={styles.container}>
        <div className={styles.heading}><div><p className={styles.eyebrow}>문의 전 준비</p><h2 id="prepare-title">이 정보를 함께 보내주세요</h2></div><p>정보를 한 번에 보내주시면<br />아이템을 확인하기 수월합니다.</p></div>
        <dl className={styles.prepare}>
          <div><dt>서버 이름</dt><dd>판매할 아이템이 있는 서버를 알려주세요.</dd></div>
          <div><dt>아이템 상세 사진</dt><dd>아이템 이름과 전체 옵션이 보이는 스크린샷을 보내주세요.</dd></div>
          <div><dt>거래 가능한 시간 <span>선택</span></dt><dd>게임에 접속할 수 있는 시간대를 알려주시면 일정을 조율합니다.</dd></div>
        </dl>
        <p className={styles.note}>상담은 이 페이지의 카카오톡 링크를 이용해주세요. 별도의 문의 양식을 작성할 필요는 없습니다.</p>
      </div>
    </section>

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.faqGrid}>
        <div><p className={styles.eyebrow}>자주 묻는 질문</p><h2 id="faq-title">문의 전에<br />궁금한 점이 있다면</h2><Link href="/guide" className={styles.textLink}>전체 이용가이드 <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className={styles.questions}>{questions.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </div>
    </section>
    <nav className={styles.related} aria-label="관련 안내">
      <Link href="/guide"><div><span>처음 판매하시나요?</span><h2>거래 절차 알아보기</h2></div><ArrowRight size={22} aria-hidden="true" /></Link>
      <Link href="/reviews"><div><span>다른 판매자의 경험</span><h2>이용후기 살펴보기</h2></div><ArrowRight size={22} aria-hidden="true" /></Link>
    </nav>
  </div>
}
