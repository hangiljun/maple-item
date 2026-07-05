import { SERVERS } from "@/lib/constants";

export function ServersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">모든 서버 거래 가능</h2>
          <p className="text-gray-600 text-lg">메이플스토리 전 서버를 지원합니다</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {SERVERS.map((server, i) => (
            <div
              key={i}
              className="glass-small rounded-xl p-4 text-center font-bold shadow-sm hover:shadow-md hover:border-[#FFB800]/50 hover:text-[#FFB800] transition hover:-translate-y-1 cursor-pointer"
            >
              {server}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
