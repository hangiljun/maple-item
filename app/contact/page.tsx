import React from "react";
import type { Metadata } from "next";
import { KAKAO_LINK, KAKAO_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: "문의하기 | 메이플아이템 - 빠른 상담 및 거래 문의",
  description: "메이플아이템 거래 문의는 카카오톡으로 간편하게! 365일 24시간 운영, 평균 1분 이내 응답. 아이템 판매 상담, 시세 확인, 거래 방법 안내.",
  keywords: [
    "메이플 문의", "메이플 상담", "메이플 거래 문의", "메이플 카카오톡",
    "메이플 아이템 판매 문의", "메이플 시세 문의", "메이플아이템 연락처"
  ],
  openGraph: {
    title: "메이플아이템 문의하기 - 빠른 상담",
    description: "365일 24시간 운영, 평균 1분 이내 응답",
    type: "website",
    url: "https://mapleitem.co.kr/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">문의하기</h1>
        <p className="text-xl text-gray-600">
          메이플아이템 거래 및 상담 문의는 카카오톡으로 간편하게!
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] rounded-3xl p-8 md:p-12 text-white mb-12 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">실시간 상담 가능</span>
          </div>

          <h2 className="text-3xl font-black mb-4">카카오톡으로 간편하게 문의하세요</h2>
          <p className="text-[#FFF8ED] text-lg mb-8">
            아이템 스크린샷과 서버 정보만 보내주시면<br />
            바로 시세 확인 후 가격을 안내드립니다
          </p>

          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#FF9500] px-10 py-4 rounded-full font-black text-xl hover:bg-[#FFF8ED] transition shadow-2xl transform hover:scale-105 mb-6"
          >
            카카오톡 문의하기
          </a>

          <div className="text-[#FFF8ED] text-sm">
            카카오톡 ID: <span className="font-bold text-white">{KAKAO_ID}</span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* 운영시간 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFB800]/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FFB800]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">운영시간</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></div>
                  <span className="font-bold text-lg text-[#FFB800]">365일 24시간</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>연중무휴 운영</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>평균 응답: 1분 이내</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 문의 방법 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFB800]/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">문의 방법</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>아이템 스크린샷 전송</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>서버 정보 알려주기</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>시세 확인 및 가격 안내</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#FFB800]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">자주 묻는 질문</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900 mb-2">Q. 문의 시 필요한 정보는 무엇인가요?</div>
            <div className="text-gray-700">A. 아이템 스크린샷(상세 옵션 포함)과 서버 정보만 있으면 됩니다. 추가로 거래 가능 시간대를 알려주시면 더욱 빠른 거래가 가능합니다.</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900 mb-2">Q. 시세 확인만 하고 거래 안 해도 되나요?</div>
            <div className="text-gray-700">A. 네, 가능합니다. 시세 확인 후 거래 여부는 자유롭게 결정하실 수 있습니다. 부담 없이 문의해주세요.</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900 mb-2">Q. 응답은 얼마나 빨리 오나요?</div>
            <div className="text-gray-700">A. 평균 1분 이내에 응답드리며, 바로 시세 확인 후 가격을 안내드립니다.</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900 mb-2">Q. 거래는 어떻게 진행되나요?</div>
            <div className="text-gray-700">A. 가격 합의 후 게임 내에서 직접 만나 안전하게 거래합니다. 거래 완료 즉시 정산해드립니다.</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          지금 바로 카카오톡으로 문의하시면<br />
          <span className="font-bold text-[#FFB800]">10분 안에 정산 완료</span>됩니다
        </p>
        <a
          href={KAKAO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#FFB800] text-white font-bold rounded-full hover:bg-[#FF9500] transition shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
          </svg>
          카카오톡으로 문의하기
        </a>
      </div>
    </div>
  );
}
