// src/lib/translate.ts
// Lightweight Google Cloud Translation REST API v2 wrapper.
// No Node SDK used — keeps the bundle small and 3G-friendly.

export type LanguageCode = 'en' | 'pcm' | 'ig' | 'ha' | 'yo';

// Google Translate API v2 target language codes
// Note: 'pcm' (Nigerian Pidgin) is not in Google's official list.
// We map it to 'en' with a specialized fallback post-process to Pidgin patterns.
const GOOGLE_LANG_MAP: Record<LanguageCode, string> = {
  en: 'en',
  pcm: 'en', // Fallback — will apply Pidgin post-processing
  ig: 'ig',
  ha: 'ha',
  yo: 'yo',
};

export async function translateText(
  text: string,
  targetLang: LanguageCode
): Promise<string> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  // If API key is missing, return original text (graceful degradation)
  if (!apiKey || apiKey === 'YOUR_GOOGLE_TRANSLATE_API_KEY_HERE') {
    console.warn(`[Translate] No API key set. Returning English text for lang: ${targetLang}`);
    return text;
  }

  const googleTargetLang = GOOGLE_LANG_MAP[targetLang];

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: googleTargetLang,
          format: 'text',
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[Translate] API Error ${response.status}: ${errorBody}`);
      return text; // Fallback to English on API error
    }

    const json = await response.json();
    const translated: string = json?.data?.translations?.[0]?.translatedText ?? text;

    // Post-process Pidgin (pcm): since Google doesn't have a pcm model,
    // we return the English and let the content team refine. A simple
    // marker is added so the author knows which segments need Pidgin review.
    if (targetLang === 'pcm') {
      return `[Pidgin Draft] ${translated}`;
    }

    return translated;
  } catch (err) {
    console.error('[Translate] Network error:', err);
    return text; // Always fallback gracefully
  }
}

// Translate a full article (title + content) into all 4 non-English languages concurrently.
export async function translateArticle(
  title: string,
  content: string
): Promise<Record<LanguageCode, { title: string; content: string }>> {
  const targetLangs: LanguageCode[] = ['pcm', 'ig', 'ha', 'yo'];

  const results = await Promise.all(
    targetLangs.map(async (lang) => {
      const [translatedTitle, translatedContent] = await Promise.all([
        translateText(title, lang),
        translateText(content, lang),
      ]);
      return { lang, title: translatedTitle, content: translatedContent };
    })
  );

  return results.reduce(
    (acc, { lang, title: t, content: c }) => {
      acc[lang] = { title: t, content: c };
      return acc;
    },
    { en: { title, content } } as Record<LanguageCode, { title: string; content: string }>
  );
}
