import styles from './home1.module.css'

// 메인 페이지의 SEOContent와 같은 정보 구성을 유지하되,
// home1 전용 문구("아이템 거래" 표현)와 하늘색 톤 스타일을 적용한 버전입니다.
export function Home1SeoContent() {
  return (
    <section className={styles.seoSection}>
      <div className={`${styles.container} ${styles.seoInner}`}>
        <h2>메이플스토리 아이템 거래, 이제 더 쉽고 안전하게</h2>

        <div className={styles.seoGrid}>
          <div className={styles.seoCard}>
            <h3>메이플아이템이란?</h3>
            <p>
              메이플아이템은 메이플스토리 유저들을 위한 아이템 거래 플랫폼입니다.
              스카니아 서버, 루나 서버, 엘리시움 서버, 오로라 서버, 크로아 서버 등 모든 메이플 월드에서
              나온 무기, 방어구, 장비를 실시간으로 확인하고 거래할 수 있습니다.
            </p>
          </div>
          <div className={styles.seoCard}>
            <h3>왜 메이플아이템을 이용해야 할까요?</h3>
            <p>
              게임 내 자유시장에서 시간 낭비하지 마세요.
              메이플아이템에서는 실시간 시세 정보를 제공하여 합리적인 가격에 거래할 수 있으며,
              안전한 거래 시스템으로 걱정 없이 아이템을 거래할 수 있습니다.
            </p>
          </div>
        </div>

        <div className={styles.seoChipsCard}>
          <h3>거래 가능 아이템</h3>
          <div className={styles.seoChips}>
            <div className={styles.seoChip}>
              <strong>아이템 판매</strong>
              <span>한 개부터 통판매까지</span>
            </div>
            <div className={styles.seoChip}>
              <strong>무기·방어구</strong>
              <span>강화 장비 거래</span>
            </div>
            <div className={styles.seoChip}>
              <strong>시세 확인</strong>
              <span>실시간 아이템 가격</span>
            </div>
            <div className={styles.seoChip}>
              <strong>안전거래</strong>
              <span>게임 내 직거래</span>
            </div>
          </div>
        </div>

        <div className={styles.seoSteps}>
          <h3>메이플아이템 이용 방법</h3>
          <ol>
            <li>
              <span className={styles.seoStepNum}>1</span>
              <span>
                <strong>카카오톡 문의</strong> — 아이템 스크린샷과 서버 정보를 전송해주시면 빠르게 확인해드립니다.
              </span>
            </li>
            <li>
              <span className={styles.seoStepNum}>2</span>
              <span>
                <strong>실시간 시세 확인 및 가격 제시</strong> — 경매장 시세를 직접 확인하여 투명한 가격을 제시해드립니다.
              </span>
            </li>
            <li>
              <span className={styles.seoStepNum}>3</span>
              <span>
                <strong>거래 완료</strong> — 게임 내 직거래 후 신속하게 정산해드립니다.
              </span>
            </li>
          </ol>
        </div>

        <p className={styles.seoOutro}>
          메이플스토리를 더 즐겁게 플레이하세요. 메이플아이템과 함께라면
          원하는 아이템을 빠르게 찾고, 합리적인 가격에 거래할 수 있습니다.
        </p>
      </div>
    </section>
  )
}
