import styles from './page.module.css'

// 메인 페이지 하단에 들어가는 SEO 설명 섹션입니다.
// 이용 방법 3단계는 위쪽 "견적부터 거래까지" 섹션에서 더 자세히 다루므로 여기서는 중복하지 않습니다.
export function HomeSeoContent() {
  return (
    <section className={styles.seoSection}>
      <div className={`${styles.container} ${styles.seoInner}`}>
        <h2>아이템을 정리하기 전에 알아두세요</h2>

        <div className={styles.seoGrid}>
          <div className={styles.seoCard}>
            <h3>어떤 아이템을 상담할 수 있나요?</h3>
            <p>
              메이플아이템은 메이플스토리 유저를 위한 아이템 구매 상담 서비스입니다.
              무기와 방어구, 장신구, 드롭률·메소 획득 장비를 한 개부터 여러 부위까지 상담할 수 있습니다.
            </p>
          </div>
          <div className={styles.seoCard}>
            <h3>견적은 어떻게 정해지나요?</h3>
            <p>
              서버와 아이템 옵션을 확인한 뒤 경매장 시세를 기준으로 견적과 조건을 안내합니다.
              내용을 확인한 다음 판매 여부를 결정하시면 됩니다.
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

        <p className={styles.seoOutro}>
          판매할 아이템의 서버와 닉네임만 알려주셔도 확인을 시작할 수 있습니다.
          필요한 정보는 상담 과정에서 차례로 안내해드립니다.
        </p>
      </div>
    </section>
  )
}
