import { useCallback, useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getNews } from "@/services/news";
import { useNews } from "@/store/useNews";

export function useTrendingNews() {
  const setTrends = useNews((s) => s.setTrends);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mountedRef = useRef(true);

  const fetchTrends = useCallback(
    async (opts?: { refreshing?: boolean }) => {
      const refreshing = !!opts?.refreshing;
      refreshing ? setIsRefreshing(true) : setIsLoading(true);

      try {
        const net = await NetInfo.fetch();
        if (!net.isConnected) return;

        const res = await getNews({ page: 1, pageSize: 10 });
        if (!mountedRef.current) return;
        setTrends(res.articles);
      } finally {
        if (!mountedRef.current) return;
        refreshing ? setIsRefreshing(false) : setIsLoading(false);
      }
    },
    [setTrends]
  );

  useEffect(() => {
    mountedRef.current = true;
    fetchTrends();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchTrends]);

  const onRefresh = useCallback(
    () => fetchTrends({ refreshing: true }),
    [fetchTrends]
  );

  return { isLoading, isRefreshing, onRefresh };
}
