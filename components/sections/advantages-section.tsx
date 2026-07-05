import { Zap, TrendingUp, Shield, CheckCircle } from "lucide-react";

export function AdvantagesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">💎 저희가 다름</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">저희에게 파는 이유</h2>
          <p className="text-gray-600 text-lg">💰 다른 업체보다 확실히 더 쳐드림</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 초스피드 거래 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FF9500] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <Zap className="mb-4 relative z-10" size={48} />
            <h3 className="text-3xl font-black mb-4 relative z-10">⚡ 진짜 빠름</h3>
            <p className="text-[#FFF8ED] mb-6 text-lg leading-relaxed relative z-10">
              카톡 보내면 5분 안에 현금 입금
              <br />
              복잡한거 없이 바로 구매
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-[#FFD700] flex-shrink-0" />
                <span>답장 1초컷</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-[#FFD700] flex-shrink-0" />
                <span>시세 바로 알려줌</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-[#FFD700] flex-shrink-0" />
                <span>입금도 바로됨</span>
              </li>
            </ul>
          </div>

          {/* 정확한 시세 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4ECDC4] to-[#3B82F6] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <TrendingUp className="mb-4 relative z-10" size={48} />
            <h3 className="text-3xl font-black mb-4 relative z-10">💰 구매가 제일 높음</h3>
            <p className="text-blue-100 mb-6 text-lg leading-relaxed relative z-10">
              다른 업체 가면 손해봄
              <br />
              저희가 제일 비싸게 구매
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-[#FFD700] flex-shrink-0" />
                <span>경매장 실시간으로 봄</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-[#FFD700] flex-shrink-0" />
                <span>옵션 하나하나 다 확인</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-[#FFD700] flex-shrink-0" />
                <span>속이는거 없음</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 안전 거래 시스템 */}
        <div className="glass rounded-3xl p-10 text-foreground shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="bg-green-500 p-4 rounded-2xl flex-shrink-0">
              <Shield size={40} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-black mb-3">🛡️ 믿을 수 있는 구매</h3>
              <p className="text-gray-700 text-lg mb-4 font-bold">
                정식 사업자 운영, 게임 내 직거래
                <br />
                안전하고 투명한 구매
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">✓ 정식 사업자</div>
                  <div className="text-sm text-gray-600">믿을 수 있음</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">✓ 게임내 직거래</div>
                  <div className="text-sm text-gray-600">안전한 구매</div>
                </div>
                <div className="glass-small rounded-xl p-4">
                  <div className="text-green-600 font-bold mb-1 text-lg">✓ 즉시 입금</div>
                  <div className="text-sm text-gray-600">현금화 빠름</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
