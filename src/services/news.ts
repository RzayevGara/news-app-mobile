import axios from "axios";
import { NEWS_API_KEY } from "@env";
import { Article } from "@/utils/types/app.ts";

export type Category =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

const api = () =>
  axios.create({
    baseURL: "https://newsapi.org/v2",
    headers: { "X-Api-Key": NEWS_API_KEY },
  });

export async function getTrend(
  opts: {
    page?: number;
    pageSize?: number;
  } = {}
): Promise<{ articles: Article[] }> {
  const { page = 1, pageSize = 10 } = opts;
  const { data } = await api().get("/top-headlines", {
    params: { country: "us", page, pageSize },
  });
  return data;
}
