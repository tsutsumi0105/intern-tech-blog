import type { MicroCMSImage } from "microcms-js-sdk";

export type Tag = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: MicroCMSImage;
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  eyecatch: MicroCMSImage;
  tags: {
    id: string;
    name: string;
  }[];
  publishedAt: string;
};
