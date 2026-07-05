import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4">
      <div className="text-center">
        {/* 404 애니메이션 */}
        <div className="mb-8">
          <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-[#FF9500] to-[#FFB6C1] mb-4">
            404
          </div>
          <Search className="mx-auto text-gray-400 animate-bounce" size={48} />
        </div>

        {/* 메시지 */}
        <div className="glass rounded-2xl p-8 max-w-md mx-auto mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            주소를 다시 확인해주세요.
          </p>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="primary" size="large" className="w-full sm:w-auto">
                <Home size={20} />
                메인으로
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="secondary" size="large" className="w-full sm:w-auto">
                <ArrowLeft size={20} />
                후기 보기
              </Button>
            </Link>
          </div>
        </div>

        {/* 추천 링크 */}
        <div className="flex gap-4 justify-center text-sm">
          <Link href="/guide" className="text-gray-600 hover:text-[#FFB800] transition">
            이용가이드
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="/news" className="text-gray-600 hover:text-[#FFB800] transition">
            소식정보
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="/reviews" className="text-gray-600 hover:text-[#FFB800] transition">
            후기게시판
          </Link>
        </div>
      </div>
    </div>
  );
}
