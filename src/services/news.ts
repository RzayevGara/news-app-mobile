import axios from "axios";
import { NEWS_API_KEY } from "@env";
import { Article } from "@/utils/types/app.ts";

export enum NewsCategory {
  business = "business",
  entertainment = "entertainment",
  general = "general",
  health = "health",
  science = "science",
  sports = "sports",
  technology = "technology",
}

const api = () =>
  axios.create({
    baseURL: "https://newsapi.org/v2",
    headers: { "X-Api-Key": NEWS_API_KEY },
  });

export async function getNews(opts: {
  category?: NewsCategory;
  page?: number;
  pageSize?: number;
  controller?: AbortController;
}): Promise<{ articles: Article[]; totalResults: number }> {
  const { category, page = 1, pageSize = 20, controller } = opts;

  const { data } = await api().get("/top-headlines", {
    params: {
      ...(category ? { category } : {}),
      page,
      pageSize,
      country: "us",
    },
    signal: controller?.signal,
  });
  return data;
}
