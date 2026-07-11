import { KAKAO_LINK } from "@/lib/constants";

export function CTASection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#FFB800] via-[#FF9500] to-[#FFB800] rounded-3xl p-12 text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
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
            </a>
            <p className="mt-6 text-lg text-[#FFF8ED] font-bold">
              답장 빠름 | 입금 바로됨 | 시세 제일 높음
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
