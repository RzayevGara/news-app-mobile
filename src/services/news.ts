import axios from "axios";
import { NEWS_API_KEY } from "@env";
import { Article } from "@/utils/types/app.ts";
import { NewsCategory } from "@/utils/enums/app.enum.ts";

const GUARDIAN_API_KEY = NEWS_API_KEY;

const news = axios.create({
  baseURL: "https://content.guardianapis.com",
  timeout: 12_000,
});

export async function getTrendingNews(
  controller: AbortController
): Promise<Article[]> {
  try {
    const { data } = await news.get(`/international`, {
      params: {
        "show-most-viewed": true,
        "show-fields": "thumbnail,byline,body",
        "api-key": GUARDIAN_API_KEY,
        format: "json",
      },
      signal: controller?.signal,
    });

    return data?.response?.mostViewed ?? [];
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message;
    throw new Error(msg);
  }
}

export async function getNewsBySection(opts: {
  category?: NewsCategory;
  page?: number;
  pageSize?: number;
  controller?: AbortController;
}): Promise<{
  items: Article[];
  currentPage: number;
  pages: number;
  total: number;
}> {
  const { category, page = 1, pageSize = 15, controller } = opts;

  const { data } = await news.get("/search", {
    params: {
      section: category,
      "order-by": "newest",
      "show-fields": "thumbnail,byline,body",
      "page-size": pageSize,
      page,
      "api-key": GUARDIAN_API_KEY,
    },
    signal: controller?.signal,
  });

  return {
    items: data?.response?.results ?? [],
    currentPage: data?.response?.currentPage ?? page,
    pages: data?.response?.pages ?? 1,
    total: data?.response?.total ?? 0,
  };
}
