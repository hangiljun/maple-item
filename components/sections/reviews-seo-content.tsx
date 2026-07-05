export function ReviewsSEOContent() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            실제 이용자들의 메이플 거래 후기
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">검증된 거래 후기</h3>
              <p className="text-muted-foreground leading-relaxed">
                메이플아이템에서 실제로 거래한 유저들의 생생한 후기를 확인하세요.
                스카니아, 루나, 엘리시움, 크로아 등 모든 서버에서 안전하게 거래한 경험담을 공유합니다.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">사기 걱정 제로</h3>
              <p className="text-muted-foreground leading-relaxed">
                1,800건 이상의 거래 중 사기 피해 0건. 투명한 시세 확인과 안전한 거래 시스템으로
                믿을 수 있는 메이플 아이템 거래를 제공합니다.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 mb-12 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-card-foreground">거래 후기 주요 키워드</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">빠른 응답</p>
                <p className="text-sm text-muted-foreground mt-1">평균 5분 내 거래</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">정확한 시세</p>
                <p className="text-sm text-muted-foreground mt-1">실시간 가격 확인</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">안전 거래</p>
                <p className="text-sm text-muted-foreground mt-1">사기 피해 0건</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">즉시 입금</p>
                <p className="text-sm text-muted-foreground mt-1">거래 후 바로 지급</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">메이플 거래 후기 검색어</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "메이플 거래 후기", "메이플아이템 후기", "메이플 아이템 거래 후기",
                "메이플 급처 후기", "메이플 안전거래 후기", "스카니아 거래 후기",
                "루나 서버 후기", "메이플 거래 사기", "메이플 신뢰 거래",
                "메이플 빠른 거래 후기", "메이플 거래소 후기", "메이플 현금화 후기",
                "엘리시움 거래 후기", "메이플 아이템 판매 후기", "메이플 거래 경험담"
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
            <h3 className="text-2xl font-semibold mb-4 text-foreground">이용자들이 선택한 이유</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">✓</span>
                <div>
                  <strong className="text-foreground">빠른 거래 속도</strong>
                  <p className="mt-1">문의부터 거래 완료까지 평균 5분, 급하게 현금이 필요할 때 최적</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">✓</span>
                <div>
                  <strong className="text-foreground">투명한 시세 제시</strong>
                  <p className="mt-1">실시간 경매장 시세를 기반으로 정확하고 공정한 가격 제공</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">✓</span>
                <div>
                  <strong className="text-foreground">검증된 안전성</strong>
                  <p className="mt-1">1,800건 이상의 거래, 사기 피해 0건으로 입증된 신뢰</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">✓</span>
                <div>
                  <strong className="text-foreground">전 서버 지원</strong>
                  <p className="mt-1">메이플스토리 모든 서버에서 거래 가능</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              수많은 유저들이 선택한 메이플아이템.
              여러분도 안전한 거래를 경험하고 후기를 남겨주세요.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "메이플아이템 거래 서비스",
            "description": "메이플스토리 아이템 안전거래 플랫폼",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1800",
              "bestRating": "5"
            }
          })
        }}
      />
    </section>
  );
}
