'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Calendar, ArrowLeft } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  server?: string;
  date: string;
  content: string;
  image?: string;
  likes: number;
  helpful: boolean;
}

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchReview(params.id as string);
    }
  }, [params.id]);

  const fetchReview = async (id: string) => {
    try {
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/reviews/${id}?key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('후기를 찾을 수 없습니다.');
      }

      const data = await response.json();

      setReview({
        id: data.name.split('/').pop(),
        author: data.fields.author?.stringValue || '',
        server: data.fields.server?.stringValue || undefined,
        content: data.fields.content?.stringValue || '',
        image: data.fields.image?.stringValue || undefined,
        date: data.fields.date?.stringValue || '',
        likes: parseInt(data.fields.likes?.integerValue || '0'),
        helpful: data.fields.helpful?.booleanValue || false,
      });

      setLoading(false);
    } catch (error) {
      console.error('후기 불러오기 실패:', error);
      alert('후기를 불러올 수 없습니다.');
      router.push('/reviews');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-gray-600">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!review) {
    return null;
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
