import { client } from "@/lib/microcms";
import Image from "next/image";
import TagIcon from "@/components/Icons/TagIcon";
import BreadCrumb, { BreadCrumbItem } from "@/components/BreadCrumb";
import HomeIcon from "@/components/Icons/HomeIcon";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const tagData = await client.get({
    endpoint: "tag",
    queries: {
      filters: `slug[equals]${slug}`,
    },
  });

  const tag = tagData.contents[0];

  if (!tag) {
    notFound();
  }

  const data = await client.get({
    endpoint: "blogs",
    queries: {
      filters: `tags[contains]${tag.id}`,
    },
  });

  const blogs = data.contents;

  const breadcrumbItems: BreadCrumbItem[] = [
    {
      label: "ホーム",
      href: "/",
      icon: <HomeIcon width={16} height={16} />,
    },
    {
      label: "カテゴリ",
      href: "/#categories",
    },
    {
      label: tag.name,
    },
  ];

  return (
    <main className="bg-white">
      <div className="flex flex-col pt-12 gap-12 w-full px-4 sm:px-8 pb-8 sm:pb-12 max-w-6xl mx-auto">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="relative w-full sm:w-90 aspect-square">
            <Image
              src={tag.thumbnail.url}
              alt={tag.name}
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="inline-flex self-start justify-center items-center gap-2 h-9 bg-primary text-white rounded-full font-semibold px-4 py-2 shadow-md">
              <TagIcon width={16} height={16} />
              <p className="text-white">カテゴリ</p>
            </div>
            <h1 className="text-5xl font-bold">{tag.name}</h1>
            <p className="text-lg sm:text-xl text-text-secondary font-normal">
              {tag.description}
            </p>
            <div className="inline-flex self-start place-items-center gap-2 h-9 bg-white rounded-full font-semibold px-5 py-3 shadow-md border border-border">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <p className="text-text-sub text-sm">{blogs.length}件の記事</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-muted">
        <div className="pt-13 sm:pt-16 px-4 sm:px-8 pb-50 max-w-6xl mx-auto">
          <ArticleCard blogs={blogs} />
        </div>
      </div>
    </main>
  );
}
