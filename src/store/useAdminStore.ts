import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ArticleInput {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: number;
}

interface AdminState {
  articles: ArticleInput[];
  saveDraft: (article: Omit<ArticleInput, 'createdAt'>) => void;
  publishArticle: (id: string) => void;
  deleteArticle: (id: string) => void;
  getArticle: (id: string) => ArticleInput | undefined;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      articles: [],
      saveDraft: (articleInput) => set((state) => {
        const existingIndex = state.articles.findIndex(a => a.id === articleInput.id);
        
        if (existingIndex >= 0) {
          const updatedArticles = [...state.articles];
          updatedArticles[existingIndex] = { 
            ...state.articles[existingIndex], 
            ...articleInput,
            status: 'draft' // Forcing it to draft when explicitly saving a draft
          };
          return { articles: updatedArticles };
        } else {
          return { 
            articles: [{ ...articleInput, status: 'draft', createdAt: Date.now() }, ...state.articles] 
          };
        }
      }),
      publishArticle: (id) => set((state) => ({
        articles: state.articles.map(a => a.id === id ? { ...a, status: 'published' } : a)
      })),
      deleteArticle: (id) => set((state) => ({
        articles: state.articles.filter(a => a.id !== id)
      })),
      getArticle: (id) => get().articles.find(a => a.id === id),
    }),
    {
      name: 'admin-blog-storage', // local storage key
    }
  )
);
