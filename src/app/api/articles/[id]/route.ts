import { NextRequest, NextResponse } from 'next/server';
import { getArticleWithTranslations } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const lang = request.nextUrl.searchParams.get('lang') || 'en';
    const article = getArticleWithTranslations(params.id, lang);
    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }
    return NextResponse.json({ article }, {
      status: 200,
      headers: {
        // Articles change rarely after publish — cache for 1hr at CDN edge
        // Purge manually on re-publish in Phase 5 if needed
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('[API /articles/:id] Error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
