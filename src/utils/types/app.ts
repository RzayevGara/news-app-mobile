import { NewsType } from "@/utils/enums/app.enum.ts";

export type Article = {
  type: NewsType;
  id: string;
  sectionId?: string;
  sectionName?: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    byline?: string;
    shortUrl?: string;
    body: string;
  };
};
