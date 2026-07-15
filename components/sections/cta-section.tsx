import { KAKAO_LINK } from "@/lib/constants";

export function CTASection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#FFB800] via-[#FF9500] to-[#FFB800] rounded-3xl p-12 text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            {/* Urgency Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">
                지금 28명이 문의 중
              </span>
            </div>

            <h2 className="text-4xl font-black mb-4">급처템 빠르게 팔고 싶으면</h2>
            <p className="text-2xl text-[#FFF8ED] mb-8 max-w-2xl mx-auto font-bold">
              지금 카톡 보내면<br />
              5분 안에 돈 들어옴
            </p>
            <a
              href={KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#FF9500] px-12 py-5 rounded-full font-black text-2xl hover:bg-[#FFF8ED] transition shadow-2xl transform hover:scale-105"
            >
              지금 바로 팔러가기
              <span className="block text-sm font-medium mt-1 text-[#FF9500]/80">
                평균 5분 입금 완료
              </span>
            </a>

            {/* Response Time */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-[#FFF8ED]">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">평균 응답: 1분 이내</span>
              </div>
              <span className="hidden sm:inline text-[#FFF8ED]/60">|</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">오늘 거래 완료: 47건</span>
              </div>
            </div>

            <p className="mt-4 text-base text-[#FFF8ED]/90 font-semibold">
              답장 빠름 · 입금 바로됨 · 시세 제일 높음
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
