import { useCallback, useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { initialNews, useNews } from "@/store/useNews";
import type { Article } from "@/utils/types/app";
import { getGuardianBySection } from "@/services/guardian.ts";
import { NewsCategory } from "@/utils/enums/app.enum.ts";

type Params = { category: NewsCategory; pageSize?: number };

export function useNewsList({ category, pageSize = 20 }: Params) {
  const setArticles = useNews((s) => s.setArticles);
  const appendArticles = useNews((s) => s.appendArticles);
  const articles = useNews((s) => s.articles);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(false);

  const mountedRef = useRef(true);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(
    async (targetPage: number, { append = false, refreshing = false } = {}) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      if (append) setIsLoadingMore(true);
      if (refreshing) setIsRefreshing(true);

      try {
        const net = await NetInfo.fetch();
        if (!net.isConnected) {
          setHasMore(false);
          return;
        }

        const res = await getGuardianBySection({
          category,
          page: targetPage,
          pageSize,
          controller,
        });
        if (!mountedRef.current) return;

        const totalFromApi = res.total ?? 0;

        setTotal(totalFromApi);
        setPage(targetPage);

        const incoming = (res.items || []) as Article[];
        setHasMore(res.currentPage !== res.pages);

        if (append) {
          appendArticles(incoming);
        } else {
          setArticles([...initialNews, ...incoming]);
        }
      } finally {
        if (!mountedRef.current) return;
        if (append) setIsLoadingMore(false);
        else refreshing ? setIsRefreshing(false) : setIsLoading(false);
      }
    },
    [category, pageSize, appendArticles, setArticles]
  );

  useEffect(() => {
    mountedRef.current = true;
    controllerRef.current?.abort();

    setArticles(initialNews);
    setTotal(0);
    setPage(1);
    fetchPage(1);
    setIsLoadingMore(true);

    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, [category, fetchPage, setArticles]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || isLoading || isRefreshing) return;
    if (!hasMore) return;
    fetchPage(page + 1, { append: true });
  }, [fetchPage, page, hasMore, isLoadingMore, isLoading, isRefreshing]);

  return {
    articles,
    page,
    total,
    hasMore,
    isLoading,
    isRefreshing,
    isLoadingMore,
    loadMore,
    fetchPage,
  };
}
