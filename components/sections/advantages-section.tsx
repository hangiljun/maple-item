
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
                  <div className="text-sm text-gray-600">빠른 입금</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">투명한 시세</div>
                  <div className="text-sm text-gray-600">실시간 확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 거래 프로세스 안내 */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-2">거래 방법</h3>
            <p className="text-gray-600">간편하고 빠른 3단계 프로세스</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#FFB800]/20">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFB800]/5 to-transparent rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFB800] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">카카오톡 문의</h4>
                  <p className="text-gray-600">아이템 스크린샷과 서버 정보를 전송하세요</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFB800]/5 to-transparent rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFB800] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">실시간 시세 확인</h4>
                  <p className="text-gray-600">경매장 기준 정확한 가격을 제시받으세요</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFB800]/5 to-transparent rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFB800] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">거래 완료</h4>
                  <p className="text-gray-600">게임 내 직거래 후 즉시 정산</p>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-6 pt-6 border-t-2 border-gray-100 text-center">
              <p className="text-[#FFB800] font-bold">
                평균 10분 안에 완료되는 빠른 거래
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
