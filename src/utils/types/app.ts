export type Article = {
  author: string;
  title: string;
  description: string | null;
  urlToImage?: string;
  publishedAt: string;
  content: string;
  source: { id: string | null; name: string };
};
