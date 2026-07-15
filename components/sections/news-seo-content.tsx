export function NewsSEOContent() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            메이플스토리 최신 소식과 아이템 시세 정보
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">실시간 시세 정보</h3>
              <p className="text-muted-foreground leading-relaxed">
                메이플스토리 주요 아이템의 시세 변동 추이를 실시간으로 확인하세요.
                에테르넬 플레임, 제네시스 무기, 22성 장비 등 고가 아이템의 가격 동향을
                주간/월간 단위로 분석하여 제공합니다.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">이벤트 및 공지사항</h3>
              <p className="text-muted-foreground leading-relaxed">
                메이플아이템의 최신 이벤트와 프로모션 정보를 놓치지 마세요.
                추가 보너스 지급, 수수료 할인 등 다양한 혜택을 제공하는 이벤트 소식을 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 mb-12 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-card-foreground">메이플 아이템 시세 카테고리</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">무기 시세</p>
                <p className="text-sm text-muted-foreground mt-1">아케인 무기, 보조무기 등</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">방어구 시세</p>
                <p className="text-sm text-muted-foreground mt-1">에테르넬 장비, 아케인 장비 등</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">악세 시세</p>
                <p className="text-sm text-muted-foreground mt-1">드메템 등</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">메이플 소식 관련 검색어</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "메이플 시세 정보", "메이플 아이템 시세", "메이플 무기 시세",
                "메이플아이템 시세", "메이플 급처 시세", "제네시스 무기 시세",
                "에테르넬 플레임 시세", "22성 장비 시세", "메이플 이벤트",
                "메이플 거래 이벤트", "메이플 공지사항", "메이플 업데이트",
                "메이플 시세 변동", "메이플 장비 가격", "메이플 아이템 가격"
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">메이플 시세 정보 활용법</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">1</span>
                <div>
                  <strong className="text-foreground">주간 시세 동향 확인</strong>
                  <p className="mt-1">매주 업데이트되는 주요 아이템 시세를 확인하여 최적의 거래 타이밍을 찾으세요</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">2</span>
                <div>
                  <strong className="text-foreground">이벤트 혜택 활용</strong>
                  <p className="mt-1">추가 보너스 지급 이벤트 기간을 활용하여 더 많은 수익을 얻으세요</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">3</span>
                <div>
                  <strong className="text-foreground">시세 변동 분석</strong>
                  <p className="mt-1">아이템별 시세 변동 요인을 파악하여 현명한 거래 결정을 내리세요</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">4</span>
                <div>
                  <strong className="text-foreground">공지사항 확인</strong>
                  <p className="mt-1">중요한 변경사항이나 업데이트를 놓치지 않도록 정기적으로 확인하세요</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              메이플아이템에서 최신 시세 정보와 이벤트 소식을 확인하세요.
              더 나은 거래 경험을 위해 항상 최신 정보를 제공합니다.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "메이플아이템 소식",
            "description": "메이플스토리 아이템 시세 정보 및 거래 이벤트 소식",
            "url": typeof window !== 'undefined' ? `${window.location.origin}/news` : ''
          })
        }}
      />
    </section>
  );
}
