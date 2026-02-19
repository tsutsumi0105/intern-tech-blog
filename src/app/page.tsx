import { client } from "@/lib/microcms";
import HeroSection from "@/components/MainSections/HeroSection";
import CategoriesSection from "@/components/MainSections/CategoriesSection";
import LatestArticlesSection from "@/components/MainSections/LatestArticlesSection";
import type { Blog, Tag } from "../types/microcms";

export default async function Home() {
  const data = await client.get<{ contents: Blog[] }>({
    endpoint: "blogs",
    queries: { limit: 6 },
  });
  const blogs = data.contents;

  const tagRes = await client.get<{ contents: Tag[] }>({
    endpoint: "tag",
  });

  const tags = tagRes.contents;

  return (
    <>
      <HeroSection />
      <CategoriesSection tags={tags} />
      <LatestArticlesSection blogs={blogs} />
    </>
  );
}
