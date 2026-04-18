export type LanguageCode = 'en' | 'ig' | 'ha' | 'yo';

const MYMEMORY_LANG_MAP: Record<LanguageCode, string> = {
  en: 'en',
  ig: 'ig',
  ha: 'ha',
  yo: 'yo',
};

const DE = 'kinguchennaokonkwo@gmail.com';

export async function translateText(
  text: string,
  targetLang: LanguageCode
): Promise<string> {
  const target = MYMEMORY_LANG_MAP[targetLang];

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}&de=${DE}`;
    const res = await fetch(url);

    if (!res.ok) return text;

    const json = await res.json();
    if (json.responseStatus !== 200) return text;

    const translated: string = json.responseData?.translatedText ?? text;

    return translated;
  } catch {
    return text;
  }
}

export async function translateArticle(
  title: string,
  content: string
): Promise<Record<LanguageCode, { title: string; content: string }>> {
  const targetLangs: LanguageCode[] = ['ig', 'ha', 'yo'];

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
