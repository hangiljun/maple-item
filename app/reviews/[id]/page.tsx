import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getReview, getAllReviews } from '@/lib/posts';
import { Star, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const review = await getReview(id);

  if (!review) {
    return {
      title: '후기를 찾을 수 없습니다',
    };
  }

  return {
    title: `${review.author}님의 후기 | 메이플아이템`,
    description: review.content.substring(0, 160),
    openGraph: {
      title: `${review.author}님의 거래 후기`,
      description: review.content.substring(0, 160),
      images: review.image ? [review.image] : [],
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((review) => ({
    id: review.id,
  }));
}

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;
  const review = await getReview(id);

  if (!review) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>후기 목록으로</span>
        </Link>

        <article className="glass rounded-3xl p-8 border-2 border-[#FFB800]/40 shadow-2xl">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {review.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{review.author}</h1>
                  {review.server && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-700 rounded-lg text-sm font-semibold border border-purple-300">
                      {review.server}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span className="font-medium">{review.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="text-[#FFB800] fill-[#FFB800]"
                  size={24}
                />
              ))}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-lg leading-relaxed text-gray-700 mb-6 whitespace-pre-wrap">
              {review.content}
            </div>

            {review.image && (
              <div className="my-8">
                <img
                  src={review.image}
                  alt={`${review.author}님의 후기`}
                  className="w-full max-h-[600px] object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>

          {review.helpful && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 text-green-600">
                <span className="text-lg font-semibold">✓ 도움이 되는 후기</span>
              </div>
            </div>
          )}
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB800] text-white rounded-xl hover:bg-[#FF9500] transition font-semibold shadow-lg"
          >
            <ArrowLeft size={20} />
            후기 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
