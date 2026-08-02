
export function AdvantagesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-left mb-16">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">저희의 특징</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">빠르고 합리적인 거래</h2>
          <p className="text-gray-600 text-lg">믿을 수 있는 아이템 구매 서비스</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* 빠른 거래 - 강조 카드 */}
          <div className="md:col-span-2 rounded-xl bg-white border-2 border-gray-200 p-10 shadow-sm">
            <h3 className="text-3xl font-black mb-4 text-gray-900">빠른 거래</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              카톡 보내면 평균 약 10분 내 처리
              <br />
              복잡한 절차 없이 간편하게
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>신속한 답변</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>실시간 시세 확인</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>빠른 정산</span>
              </li>
            </ul>
          </div>

          {/* 합리적인 가격 */}
          <div className="md:col-span-1 rounded-xl bg-white border-2 border-gray-200 p-10 shadow-sm">
            <h3 className="text-3xl font-black mb-4 text-gray-900">합리적인 가격</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              경매장 실시간 시세 기준
              <br />
              투명한 가격 제시
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>경매장 시세 실시간 확인</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>옵션별 세부 평가</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>투명한 거래</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 안전 거래 시스템 */}
        <div className="glass rounded-xl p-10 text-foreground mb-12">
          <div className="flex items-start gap-6">
            <div className="bg-[#FFB800] p-4 rounded-2xl flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
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
                  <div className="text-gray-900 font-bold mb-1 text-lg">게임 내 직거래</div>
                  <div className="text-sm text-gray-600">안전한 구매</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-gray-900 font-bold mb-1 text-lg">빠른 정산</div>
                  <div className="text-sm text-gray-600">신속한 처리</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-gray-900 font-bold mb-1 text-lg">투명한 시세</div>
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
