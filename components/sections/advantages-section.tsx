
export function AdvantagesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">저희의 특징</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">빠르고 합리적인 거래</h2>
          <p className="text-gray-600 text-lg">믿을 수 있는 아이템 구매 서비스</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 초스피드 거래 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FF9500] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>

            <h3 className="text-3xl font-black mb-4 relative z-10">빠른 거래</h3>
            <p className="text-[#FFF8ED] mb-6 text-lg leading-relaxed relative z-10">
              카톡 보내면 10분 안에 정산 완료
              <br />
              복잡한 절차 없이 간편하게
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-3">

                <span>신속한 답변</span>
              </li>
              <li className="flex items-center gap-3">

                <span>실시간 시세 확인</span>
              </li>
              <li className="flex items-center gap-3">

                <span>빠른 정산</span>
              </li>
            </ul>
          </div>

          {/* 정확한 시세 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4ECDC4] to-[#3B82F6] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>

            <h3 className="text-3xl font-black mb-4 relative z-10">합리적인 가격</h3>
            <p className="text-blue-100 mb-6 text-lg leading-relaxed relative z-10">
              경매장 실시간 시세 기준
              <br />
              투명한 가격 제시
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-3">

                <span>경매장 시세 실시간 확인</span>
              </li>
              <li className="flex items-center gap-3">

                <span>옵션별 세부 평가</span>
              </li>
              <li className="flex items-center gap-3">

                <span>투명한 거래</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 안전 거래 시스템 */}
        <div className="glass rounded-3xl p-10 text-foreground shadow-2xl mb-12">
          <div className="flex items-start gap-6">
            <div className="bg-green-500 p-4 rounded-2xl flex-shrink-0">

            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-black mb-3">안전한 구매</h3>
              <p className="text-gray-700 text-lg mb-4 font-bold">
                게임 내 직거래로 안전하게
                <br />
                투명한 거래 프로세스
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">게임 내 직거래</div>
                  <div className="text-sm text-gray-600">안전한 구매</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">즉시 정산</div>
                  <div className="text-sm text-gray-600">빠른 처리</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">투명한 시세</div>
                  <div className="text-sm text-gray-600">실시간 확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
