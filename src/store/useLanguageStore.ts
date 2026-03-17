import { create } from 'zustand';

export type LanguageCode = 'en' | 'pcm' | 'ig' | 'ha' | 'yo';

type TranslationDictionary = {
  [key in LanguageCode]?: string;
};

interface LanguageState {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  // A helper function to safely select content based on current language
  t: (contentDict: TranslationDictionary, fallbackString?: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: 'en',
  setLanguage: (lang) => set({ currentLanguage: lang }),
  t: (contentDict, fallbackString) => {
    const lang = get().currentLanguage;
    return contentDict[lang] || contentDict['en'] || fallbackString || '';
  },
}));
