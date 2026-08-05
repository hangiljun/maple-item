import React from "react";
import { KAKAO_LINK, KAKAO_ID } from "@/lib/constants";

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
      <div className="bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-sm border-2 border-[#FFB800]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFB800]/10 border border-[#FFB800] rounded-full mb-6">
            <span className="text-sm font-medium text-[#FFB800]">실시간 상담 가능</span>
          </div>

          <h2 className="text-3xl font-black mb-4 text-gray-900">카카오톡으로 간편하게 문의하세요</h2>
          <p className="text-gray-600 text-lg mb-8">
            아이템 스크린샷과 서버 정보만 보내주시면<br />
            바로 시세 확인 후 가격을 안내드립니다
          </p>

          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FFB800] text-white px-10 py-4 rounded-full font-black text-xl hover:bg-[#FF9500] transition shadow-sm mb-6"
          >
            카카오톡 문의하기
          </a>

          <div className="text-gray-600 text-sm">
            카카오톡 ID: <span className="font-bold text-gray-900">{KAKAO_ID}</span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* 운영시간 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFB800]/20">
          <div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">운영시간</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></div>
                  <span className="font-bold text-lg text-[#FFB800]">365일 24시간</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>연중무휴 운영</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>평균 응답: 1분 이내</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 문의 방법 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFB800]/20">
          <div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">문의 방법</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>아이템 스크린샷 전송</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>서버 정보 알려주기</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
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
            <div className="text-gray-700">A. 가격 합의 후 게임 내에서 직접 만나 안전하게 거래합니다. 거래 완료 후 신속하게 정산해드립니다.</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          지금 바로 카카오톡으로 문의하시면<br />
          <span className="font-bold text-[#FFB800]">평균 약 10분 내 처리</span>됩니다
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
