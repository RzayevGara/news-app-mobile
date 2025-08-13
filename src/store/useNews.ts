import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Article } from "@/utils/types/app.ts";

type State = {
  trends: Article[];
  setTrends: (articles: Article[]) => void;
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  appendArticles: (articles: Article[]) => void;
  clear: () => void;
};

export const useNews = create<State>()(
  persist(
    (set, get) => ({
      trends: [],
      setTrends: (articles) => set({ trends: articles }),
      articles: [],
      setArticles: (articles) => set({ articles }),
      appendArticles: (articles) =>
        set({ articles: [...get().articles, ...articles] }),
      clear: () => set({ articles: [] }),
    }),
    {
      name: "news",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
