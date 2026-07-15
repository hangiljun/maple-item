
export function AdvantagesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">저희가 다름</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">저희에게 파는 이유</h2>
          <p className="text-gray-600 text-lg">다른 업체보다 확실히 더 쳐드림</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 초스피드 거래 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FF9500] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            
            <h3 className="text-3xl font-black mb-4 relative z-10">진짜 빠름</h3>
            <p className="text-[#FFF8ED] mb-6 text-lg leading-relaxed relative z-10">
              카톡 보내면 5분 안에 현금 입금
              <br />
              복잡한거 없이 바로 구매
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-3">
                
                <span>답장 1초컷</span>
              </li>
              <li className="flex items-center gap-3">
                
                <span>시세 바로 알려줌</span>
              </li>
              <li className="flex items-center gap-3">
                
                <span>입금도 바로됨</span>
              </li>
            </ul>
          </div>

          {/* 정확한 시세 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4ECDC4] to-[#3B82F6] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            
            <h3 className="text-3xl font-black mb-4 relative z-10">구매가 제일 높음</h3>
            <p className="text-blue-100 mb-6 text-lg leading-relaxed relative z-10">
              다른 업체 가면 손해봄
              <br />
              저희가 제일 비싸게 구매
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-3">
                
                <span>경매장 실시간으로 봄</span>
              </li>
              <li className="flex items-center gap-3">
                
                <span>옵션 하나하나 다 확인</span>
              </li>
              <li className="flex items-center gap-3">
                
                <span>속이는거 없음</span>
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
              <h3 className="text-3xl font-black mb-3">믿을 수 있는 구매</h3>
              <p className="text-gray-700 text-lg mb-4 font-bold">
                정식 사업자 운영, 게임 내 직거래
                <br />
                안전하고 투명한 구매
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">정식 사업자</div>
                  <div className="text-sm text-gray-600">믿을 수 있음</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">게임내 직거래</div>
                  <div className="text-sm text-gray-600">안전한 구매</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">즉시 입금</div>
                  <div className="text-sm text-gray-600">현금화 빠름</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-2">다른 업체 vs 메이플아이템</h3>
            <p className="text-gray-600">확실한 차이를 확인하세요</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#FFB800]/20">
            <div className="grid grid-cols-3 gap-6">
              {/* Header */}
              <div className="text-center pb-4 border-b-2 border-gray-200">
                <div className="text-sm font-medium text-gray-500">일반 업체</div>
              </div>
              <div className="text-center pb-4 border-b-2 border-[#FFB800]">
                <div className="text-sm font-bold text-[#FFB800] flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  메이플아이템
                </div>
              </div>
              <div className="text-center pb-4 border-b-2 border-green-200">
                <div className="text-sm font-medium text-green-600">차이</div>
              </div>

              {/* Row 1: 거래 속도 */}
              <div className="text-center py-4 border-b border-gray-100">
                <div className="text-gray-600 text-sm mb-1">거래 시간</div>
                <div className="font-medium text-gray-700">30분~1시간</div>
              </div>
              <div className="text-center py-4 border-b border-gray-100 bg-[#FFB800]/5">
                <div className="text-gray-600 text-sm mb-1">거래 시간</div>
                <div className="font-bold text-[#FFB800] text-lg">5분 이내</div>
              </div>
              <div className="text-center py-4 border-b border-gray-100">
                <div className="text-green-600 font-bold">6배 빠름</div>
              </div>

              {/* Row 2: 구매가 */}
              <div className="text-center py-4 border-b border-gray-100">
                <div className="text-gray-600 text-sm mb-1">구매가</div>
                <div className="font-medium text-gray-700">시세 -20%</div>
              </div>
              <div className="text-center py-4 border-b border-gray-100 bg-[#FFB800]/5">
                <div className="text-gray-600 text-sm mb-1">구매가</div>
                <div className="font-bold text-[#FFB800] text-lg">시세 100%</div>
              </div>
              <div className="text-center py-4 border-b border-gray-100">
                <div className="text-green-600 font-bold">+20% 이득</div>
              </div>

              {/* Row 3: 응답 속도 */}
              <div className="text-center py-4">
                <div className="text-gray-600 text-sm mb-1">답장 속도</div>
                <div className="font-medium text-gray-700">10분~30분</div>
              </div>
              <div className="text-center py-4 bg-[#FFB800]/5">
                <div className="text-gray-600 text-sm mb-1">답장 속도</div>
                <div className="font-bold text-[#FFB800] text-lg">1초컷</div>
              </div>
              <div className="text-center py-4">
                <div className="text-green-600 font-bold">즉시 응답</div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 pt-6 border-t-2 border-gray-100 text-center">
              <p className="text-sm text-gray-600 mb-2">
                실제 거래 데이터 기반 비교 (2024년 평균)
              </p>
              <p className="text-[#FFB800] font-bold">
                똑같은 아이템, 더 높은 가격, 더 빠른 거래
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
