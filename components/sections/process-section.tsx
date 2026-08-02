"use client";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "카카오톡 문의",
      desc: "아이템 스크린샷과 서버 정보를 전송해주시면 빠르게 확인해드립니다",
      details: ["아이템 스크린샷 전송", "서버 정보 입력", "거래 가능 시간 선택"],
      time: "1분",
      color: "purple",
      bgColor: "from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      align: "left"
    },
    {
      step: "02",
      title: "실시간 시세 확인 및 가격 제시",
      desc: "경매장 시세를 직접 확인하여 투명한 가격을 제시해드립니다",
      details: ["경매장 실시간 확인", "투명한 가격 제시", "옵션별 차액 설명"],
      time: "3분",
      color: "blue",
      bgColor: "from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      align: "right"
    },
    {
      step: "03",
      title: "거래 완료",
      desc: "게임 내 직거래 후 신속하게 대금을 지급받으세요",
      details: ["게임 내 안전한 직거래", "거래 완료 확인", "빠른 대금 지급"],
      time: "5분",
      color: "cyan",
      bgColor: "from-cyan-500 to-cyan-600",
      textColor: "text-cyan-100",
      align: "left"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">간편한 거래 프로세스</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">3단계 거래 프로세스</h2>
          <p className="text-gray-600 text-lg">투명하고 안전한 거래, <span className="font-bold text-[#FFB800]">평균 10분 소요</span></p>
        </div>

        {/* Timeline Progress Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFB800]/20">
            <div className="flex items-center justify-between mb-4">
              {steps.map((item, i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.bgColor} flex items-center justify-center text-white font-bold shadow-lg mb-2`}>
                      {item.step}
                    </div>
                    <div className="text-xs font-medium text-gray-600 text-center">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#FFB800] font-semibold mt-1">
                      {item.time}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-gradient-to-r from-gray-300 to-gray-200 mx-2 mt-[-40px]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-300 via-blue-300 to-cyan-300 hidden md:block"></div>

          {steps.map((item, i) => (
            <div
              key={i}
              className={`relative mb-16 last:mb-0 ${
                item.align === 'right' ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'
              } md:w-1/2`}
            >
              <div className="glass rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#FFB800]/20 hover:border-[#FFB800]/40 hover:scale-[1.02]">
                {/* Time Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-full mb-3">
                  <svg className="w-4 h-4 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs font-bold text-[#FFB800]">약 {item.time}</span>
                </div>

                <div className={`text-6xl font-black bg-gradient-to-br ${item.bgColor} bg-clip-text text-transparent mb-2`}>{item.step}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-lg">{item.desc}</p>

                <ul className="space-y-2">
                  {item.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
