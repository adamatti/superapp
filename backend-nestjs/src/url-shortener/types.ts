import { UrlShortenerKey, UrlShortenerUrl } from '@prisma/client';

export type Entity = UrlShortenerUrl & {
  keys: UrlShortenerKey[];
};
