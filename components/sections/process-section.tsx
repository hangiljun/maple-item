
export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "카톡 문의",
      desc: "스샷 한장만 보내면 됨",
      details: ["카톡 열기", "템 스샷 보내기", "서버 알려주기"],
      color: "purple",
      bgColor: "from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      align: "left"
    },
    {
      step: "02",
      title: "시세 알려줌",
      desc: "바로 경매장 보고 가격 알려줌",
      details: ["경매장 지금 바로 확인", "얼마 쳐줄지 말해줌", "속이는거 없음"],
      color: "blue",
      bgColor: "from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      align: "right"
    },
    {
      step: "03",
      title: "5분컷",
      desc: "게임 접속하면 바로 끝",
      details: ["게임에서 만남", "거래 ㄱㄱ", "돈 바로 입금"],
      color: "cyan",
      bgColor: "from-cyan-500 to-cyan-600",
      textColor: "text-cyan-100",
      align: "left"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">진짜 쉬움</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2">3단계로 끝남</h2>
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
              <div className="glass rounded-2xl shadow-xl p-8 hover:shadow-2xl transition border-2 border-[#FFB800]/20 hover:border-[#FFB800]/40">
                <div className={`text-6xl font-black ${item.textColor} mb-2`}>{item.step}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-lg">{item.desc}</p>

                <ul className="space-y-2">
                  {item.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500`}></div>
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
