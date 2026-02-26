import type { MicroCMSImage } from "microcms-js-sdk";

export type Tag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail: MicroCMSImage;
};

export type Blog = {
  id: string;
  title: string;
  description?: string;
  content: string;
  eyecatch: MicroCMSImage;
  tags: Pick<Tag, "id" | "name" | "slug">[];
  publishedAt: string;
};
