import { KAKAO_LINK } from "@/lib/constants";

export function CTASection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 좌측: 텍스트 */}
            <div className="text-left">
              <h2 className="text-4xl font-black mb-4 text-gray-900">급처템 빠르게 팔고 싶으면</h2>
              <p className="text-xl text-gray-600 mb-6">
                지금 카톡 보내면<br />
                평균 약 10분 내 처리
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">평균 응답: 1분 이내</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>답장 빠름 · 정산이 빠름 · 합리적인 가격</span>
                </div>
              </div>
            </div>

            {/* 우측: CTA 버튼 */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8">
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FFB800] text-white px-12 py-5 rounded-lg font-black text-2xl hover:bg-[#FF9500] transition shadow-sm"
              >
                지금 바로 팔러가기
                <span className="block text-sm font-medium mt-1 opacity-90">
                  평균 10분 정산 완료
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
