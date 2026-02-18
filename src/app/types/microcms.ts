export type Tag = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: {
    url: string;
  };
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  eyecatch: {
    url: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
  publishedAt: string;
};
