import { NextResponse } from 'next/server';
import { listPublishedArticles } from '@/lib/db';

export async function GET() {
  try {
    const articles = listPublishedArticles();
    return NextResponse.json({ articles }, {
      status: 200,
      headers: {
        // CDN edge caches for 60s; serves stale content while revalidating for 5min
        // Safe because articles are published infrequently
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    console.error('[API /articles] Error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
