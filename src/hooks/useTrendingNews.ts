import { useCallback, useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useNews } from "@/store/useNews";
import { getTrendingNews } from "@/services/news.ts";

export function useTrendingNews() {
  const setTrends = useNews((s) => s.setTrends);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mountedRef = useRef(true);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchTrends = useCallback(
    async (opts?: { refreshing?: boolean }) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      const refreshing = !!opts?.refreshing;
      refreshing ? setIsRefreshing(true) : setIsLoading(true);

      try {
        const net = await NetInfo.fetch();
        if (!net.isConnected) return;

        const res = await getTrendingNews(controller);
        if (!mountedRef.current) return;
        setTrends(res);
      } finally {
        if (!mountedRef.current) return;
        refreshing ? setIsRefreshing(false) : setIsLoading(false);
      }
    },
    [setTrends]
  );

  useEffect(() => {
    mountedRef.current = true;
    controllerRef.current?.abort();
    fetchTrends();
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, [fetchTrends]);

  return { isLoading, isRefreshing, fetchTrends };
}
