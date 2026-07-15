import React from "react";
import type { Metadata } from "next";
import { BookOpen, MessageCircle, TrendingUp, Award, CheckCircle, Shield } from "lucide-react";
import { KAKAO_LINK, KAKAO_ID } from "@/lib/constants";
import { GuideSEOContent } from "@/components/sections/guide-seo-content";

export const metadata: Metadata = {
  title: "이용가이드 | 메이플아이템 - 메이플 급처템 판매 방법 3단계",
  description: "메이플스토리 급처템 판매 완벽 가이드! 카카오톡 문의 → 실시간 시세 확인 → 현금화 완료까지 평균 5분. 전서버 매입 가능. 투명한 가격 제시. FAQ 포함.",
  keywords: [
    "메이플 판매 방법", "메이플 이용가이드", "메이플 아이템 판매", "메이플 현금화",
    "메이플 급처 판매", "메이플 시세 확인", "메이플 고가매입", "급처템 팔기",
    "스카니아 판매", "루나 판매", "이노시스 판매", "메이플 아이템 팔기", "메이플 현금화 방법"
  ],
  openGraph: {
    title: "메이플 급처템 판매 가이드 - 메이플아이템",
    description: "3단계로 완료하는 빠른 현금화 방법",
    type: "article",
    url: "https://mapleitem.co.kr/guide",
  },
};

export default function GuidePage() {
  const steps = [
    {
      step: "1단계",
      icon: MessageCircle,
      title: "카카오톡 문의",
      desc: "카카오톡으로 판매하실 아이템의 스크린샷과 서버 정보를 전송해주세요.",
      details: [
        "아이템 스크린샷 (상세 옵션 포함)",
        "서버 정보 알려주기",
        "거래 가능 시간대 (선택사항)"
      ],
      color: "blue"
    },
    {
      step: "2단계",
      icon: TrendingUp,
      title: "시세 확인 및 가격 제시",
      desc: "실시간 경매장 시세를 확인하여 정확한 가격을 제시해드립니다.",
      details: [
        "실시간 경매장 매물 확인",
        "옵션별 차액 상세 설명",
        "투명한 가격 제시"
      ],
      color: "purple"
    },
    {
      step: "3단계",
      icon: Award,
      title: "거래 완료",
      desc: "가격 합의 후 게임 내에서 안전하게 거래를 진행합니다.",
      details: [
        "게임 내 만남 장소 약속",
        "안전한 거래 진행",
        "거래 완료 후 대금 즉시 지급"
      ],
      color: "orange"
    }
  ];

  const faqs = [
    {
      q: "거래는 얼마나 빨리 진행되나요?",
      a: "문의 주신 즉시 응답하며, 시세 확인부터 거래 완료까지 평균 5분 정도 소요됩니다. 빠른 현금화가 필요하신 분들께 최적입니다."
    },
    {
      q: "어떤 서버에서 거래 가능한가요?",
      a: "스카니아, 루나, 엘리시움, 크로아, 베라, 오로라, 레드, 유니온, 제니스, 아케인, 노바, 챌린저스, 에오스, 헬리오스 등 메이플스토리 전 서버 거래가 가능합니다."
    },
    {
      q: "시세는 어떻게 확인하나요?",
      a: "실시간 경매장 매물을 직접 확인하여 가장 정확한 시세를 제시해드립니다. 옵션별 차액과 시세 변동 요인도 함께 설명드립니다."
    },
    {
      q: "수수료는 얼마인가요?",
      a: "별도의 수수료는 없으며, 제시해드린 가격이 최종 거래 가격입니다. 투명한 가격 제시를 원칙으로 합니다."
    },
    {
      q: "안전한 거래인가요?",
      a: "본인 아이템만 취급하며, 모든 거래는 투명하게 진행됩니다. 게임 내 직거래로 안전하게 진행되므로 사기 걱정 없이 거래하실 수 있습니다."
    },
    {
      q: "거래 가능한 시간이 있나요?",
      a: "평일 오전 10시부터 밤 12시까지 실시간 상담이 가능합니다. 주말 및 공휴일도 운영하니 편하신 시간에 문의주세요."
    },
    {
      q: "대금은 언제 받나요?",
      a: "게임 내에서 아이템 거래가 완료되는 즉시 현금(계좌이체)으로 대금을 지급해드립니다."
    },
    {
      q: "가격이 마음에 안 들면 어떻게 하나요?",
      a: "시세 확인 후 가격 제시를 받으신 뒤 거래 여부를 자유롭게 결정하실 수 있습니다. 부담 없이 문의주세요."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
          <BookOpen className="text-[#FFB800]" size={36} />
          이용가이드
        </h1>
        <p className="text-gray-600 text-lg">메이플아이템에서 안전하고 빠르게 거래하는 방법을 알려드립니다</p>
        <div className="mt-6 inline-block bg-gradient-to-r from-[#FFB800]/20 to-[#FF9500]/20 rounded-full px-6 py-2">
          <span className="text-[#FFB800] font-bold">평균 거래 완료 시간: 5분</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* 거래 진행 과정 */}
        <section className="glass rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="text-[#FFB800]" />
            거래 진행 과정
          </h2>
          <p className="text-gray-600 mb-8">간단한 3단계로 안전하고 빠른 거래가 완료됩니다</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {steps.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-[#FFB800]/20 hover:border-[#FFB800]/40 transition-all hover:shadow-lg h-full">
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {i + 1}
                  </div>
                  <div className="bg-gradient-to-br from-[#FFB800]/10 to-[#FF9500]/10 p-4 rounded-xl inline-block mb-4 mt-2">
                    <item.icon className="text-[#FFB800]" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="text-[#FFB800] text-2xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 거래 문의 */}
        <section className="relative overflow-hidden glass rounded-2xl p-8 border-2 border-[#FFB800]/30 bg-gradient-to-br from-white to-yellow-50/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FFB800]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MessageCircle className="text-[#FFB800]" size={28} />
              지금 바로 거래 문의하기
            </h2>
            <p className="text-gray-700 mb-6">
              카카오톡으로 문의주시면 전문 상담팀이 친절하게 안내해드립니다.<br />
              <strong className="text-[#FFB800]">빠른 상담</strong>이 가능합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-[#FEE500] text-[#3A1D1D] px-8 py-4 rounded-full font-black text-lg hover:bg-yellow-400 transition-all hover:scale-105 shadow-xl flex items-center gap-2"
              >
                <MessageCircle size={20} fill="#3A1D1D" /> 카카오톡으로 문의하기
              </a>
              <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200">
                <span className="text-gray-600">
                  카카오톡 ID: <strong className="text-gray-900">{KAKAO_ID}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="glass rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-[#FFB800]">Q.</span> {item.q}
                </h3>
                <p className="text-gray-600 pl-6">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 거래 시 주의사항 */}
        <section className="glass-small rounded-2xl p-8 border-2 border-red-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚠️ 거래 시 주의사항</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>반드시 공식 카카오톡 채널을 통해서만 거래하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>본인 아이템만 거래 가능하며, 타인 명의 아이템은 거래 불가합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>게임 내 직거래로만 진행되며, 외부 사이트나 다른 방법은 사용하지 않습니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>거래 전 반드시 시세를 확인하고 가격에 합의한 후 진행하세요</span>
            </li>
          </ul>
        </section>
      </div>

      <GuideSEOContent />
    </div>
  );
}
