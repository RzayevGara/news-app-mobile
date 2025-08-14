import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Article } from "@/utils/types/app";

type Id = string | number;

type BookmarkStore = {
  bookmarks: Article[];
  addBookmark: (article: Article) => void;
  removeBookmarkById: (id: Id) => void;
  isBookmarked: (id: Id) => boolean;
};

export const useBookmarks = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (article) =>
        set((state) => {
          const isExists = state.bookmarks.some(
            (bookmark) => String(bookmark.id) === article.id
          );
          if (isExists) return state;
          return { bookmarks: [article, ...state.bookmarks] };
        }),

      removeBookmarkById: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        })),

      isBookmarked: (id) =>
        get().bookmarks.some((bookmark) => bookmark.id === id),
    }),
    {
      name: "bookmarks",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
