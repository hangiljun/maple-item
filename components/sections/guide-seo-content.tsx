export function GuideSEOContent() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            메이플 아이템 안전거래 완벽 가이드
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">메이플 거래 왜 어려울까?</h3>
              <p className="text-muted-foreground leading-relaxed">
                게임 내 자유시장은 시간이 오래 걸리고, 사기 위험도 있습니다.
                메이플아이템은 실시간 시세 확인과 안전한 거래 시스템으로
                빠르고 확실한 아이템 거래를 제공합니다.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">평균 5분 안에 거래 완료</h3>
              <p className="text-muted-foreground leading-relaxed">
                카카오톡 문의부터 시세 확인, 거래 완료까지 평균 5분이면 끝납니다.
                전문 상담팀이 빠르게 응답하며, 투명한 가격으로 신뢰할 수 있는 거래를 보장합니다.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 mb-12 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-card-foreground">메이플 서버별 거래 가능</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">엘리시움 서버</p>
                <p className="text-sm text-muted-foreground mt-1">장비 거래</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">스카니아/루나</p>
                <p className="text-sm text-muted-foreground mt-1">급처템 거래</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">오로라/크로아</p>
                <p className="text-sm text-muted-foreground mt-1">무기 거래</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-primary">전 서버</p>
                <p className="text-sm text-muted-foreground mt-1">아이템 시세 확인</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">메이플 거래 관련 검색어</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "메이플 거래 방법", "메이플 안전거래", "메이플 아이템 판매",
                "메이플 급처 거래", "메이플 시세 확인", "메이플 무기 거래",
                "메이플 방어구 판매", "메이플 장비 시세", "메이플 거래 가이드",
                "스카니아 서버 거래", "메이플아이템 이용법", "메이플 아이템 현금화",
                "메이플 사기 방지", "메이플 직거래", "메이플 빠른 거래"
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
            <h3 className="text-2xl font-semibold mb-4 text-foreground">안전한 메이플 거래를 위한 팁</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">1</span>
                <div>
                  <strong className="text-foreground">실시간 시세 확인</strong>
                  <p className="mt-1">거래 전 경매장 시세를 확인하고 정확한 가격으로 거래하세요</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">2</span>
                <div>
                  <strong className="text-foreground">공식 채널 이용</strong>
                  <p className="mt-1">반드시 공식 카카오톡 채널을 통해서만 거래를 진행하세요</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">3</span>
                <div>
                  <strong className="text-foreground">게임 내 직거래</strong>
                  <p className="mt-1">모든 거래는 게임 내에서 안전하게 진행됩니다</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">4</span>
                <div>
                  <strong className="text-foreground">즉시 대금 지급</strong>
                  <p className="mt-1">거래 완료 후 대금이 즉시 지급되므로 안심하세요</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              메이플스토리 아이템 거래, 이제 더 이상 어렵지 않습니다.
              메이플아이템에서 안전하고 빠른 거래를 경험해보세요.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "메이플 아이템 거래 방법",
            "description": "메이플스토리 아이템을 안전하고 빠르게 거래하는 방법",
            "step": [
              {
                "@type": "HowToStep",
                "name": "카카오톡 문의",
                "text": "카카오톡으로 판매할 아이템의 스크린샷과 서버 정보를 전송합니다."
              },
              {
                "@type": "HowToStep",
                "name": "시세 확인",
                "text": "실시간 경매장 시세를 확인하여 정확한 가격을 제시받습니다."
              },
              {
                "@type": "HowToStep",
                "name": "거래 완료",
                "text": "게임 내에서 안전하게 거래를 진행하고 즉시 대금을 받습니다."
              }
            ]
          })
        }}
      />
    </section>
  );
}
