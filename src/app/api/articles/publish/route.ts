import { NextRequest, NextResponse } from 'next/server';
import { createArticle, createTranslations } from '@/lib/db';
import { translateArticle } from '@/lib/translate';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body as { title: string; content: string };

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required.' },
        { status: 400 }
      );
    }

    // Step 1: Create the root article record
    const article = createArticle('published');

    // Step 2: Concurrently translate into all 5 languages (en + 4 Nigerian)
    const translations = await translateArticle(title, content);

    // Step 3: Persist all translations in a single batch
    createTranslations(
      article.id,
      Object.entries(translations).map(([lang, { title: t, content: c }]) => ({
        lang,
        title: t,
        content: c,
      }))
    );

    return NextResponse.json(
      { success: true, articleId: article.id, languages: Object.keys(translations) },
      { status: 201 }
    );
  } catch (err) {
    console.error('[API /publish] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Check server logs.' },
      { status: 500 }
    );
  }
}
