export function SEOContent() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            메이플스토리 급처템 거래, 이제 더 쉽고 안전하게
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">메이플아이템이란?</h3>
              <p className="text-muted-foreground leading-relaxed">
                메이플아이템은 메이플스토리 유저들을 위한 아이템 거래 플랫폼입니다.
                스카니아 서버, 루나 서버, 엘리시움 서버, 오로라 서버, 크로아 서버 등 모든 메이플 월드에서
                급처로 나온 무기, 방어구, 장비를 실시간으로 확인하고 거래할 수 있습니다.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">왜 메이플아이템을 이용해야 할까요?</h3>
              <p className="text-muted-foreground leading-relaxed">
                게임 내 자유시장에서 시간 낭비하지 마세요.
                메이플아이템에서는 실시간 시세 정보를 제공하여 합리적인 가격에 거래할 수 있으며,
                안전결제 시스템으로 사기 걱정 없이 안심하고 아이템을 구매할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 mb-12 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-card-foreground">메이플 아이템 거래 주요 키워드</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">급처템</p>
                <p className="text-sm text-muted-foreground mt-1">시세보다 저렴한 아이템</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">무기 강화</p>
                <p className="text-sm text-muted-foreground mt-1">고성능 장비 거래</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">시세 확인</p>
                <p className="text-sm text-muted-foreground mt-1">실시간 아이템 가격</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">안전거래</p>
                <p className="text-sm text-muted-foreground mt-1">사기 방지 시스템</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">인기 검색 키워드</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "메이플 급처템", "메이플스토리 거래소", "메이플 아이템 시세",
                "스카니아 서버 거래", "메이플 장비 거래", "메이플 무기 거래",
                "메이플 방어구", "메이플 악세서리", "메이플 큐브",
                "메이플 스타포스", "메이플 잠재능력", "메이플아이템",
                "메이플 자유시장", "메이플 안전거래", "메이플 아이템 거래"
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
            <h3 className="text-2xl font-semibold mb-4 text-foreground">메이플아이템 이용 방법</h3>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">1</span>
                <span><strong className="text-foreground">카카오톡 문의</strong> - 판매하실 아이템 스크린샷과 서버 정보를 전송하세요</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">2</span>
                <span><strong className="text-foreground">시세 확인</strong> - 실시간 경매장 시세를 확인하여 정확한 가격을 제시받으세요</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">3</span>
                <span><strong className="text-foreground">가격 협의</strong> - 제시된 가격에 동의하시면 거래를 진행합니다</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">4</span>
                <span><strong className="text-foreground">거래 완료</strong> - 게임 내 직거래 후 즉시 대금을 지급받으세요</span>
              </li>
            </ol>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              메이플스토리를 더 즐겁게 플레이하세요. 메이플아이템과 함께라면
              원하는 아이템을 빠르게 찾고, 합리적인 가격에 거래할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 구조화된 데이터 (JSON-LD) - 검색엔진 최적화 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "메이플아이템",
            "description": "메이플스토리 아이템 거래 플랫폼 - 급처템, 장비 거래",
            "url": typeof window !== 'undefined' ? window.location.origin : '',
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${typeof window !== 'undefined' ? window.location.origin : ''}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </section>
  );
}
