import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, id } = body;

    // 시크릿 토큰 검증
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // path가 제공되면 해당 경로 무효화
    if (path) {
      revalidatePath(path);
    }

    // id가 제공되면 해당 상세 페이지도 무효화
    if (id) {
      revalidatePath(`/news/${id}`);
    }

    // news 목록은 항상 무효화 (새 글/수정/삭제 모두)
    revalidatePath('/news');

    return NextResponse.json({
      revalidated: true,
      paths: [path, id ? `/news/${id}` : null, '/news'].filter(Boolean),
      now: Date.now()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
