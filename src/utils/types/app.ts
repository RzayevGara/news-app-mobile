import { NewsType } from "@/utils/enums/app.enum.ts";

export type Article = {
  type: NewsType;
  author: string;
  title: string;
  description: string | null;
  urlToImage?: string;
  url: string;
  publishedAt: string;
  content: string;
  source: { id: string | null; name: string };
};
