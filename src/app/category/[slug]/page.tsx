import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/types/microcms";
import TagIcon from "@/components/Icons/TagIcon";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import BreadCrumb, { BreadCrumbItem } from "@/components/BreadCrumb";
import HomeIcon from "@/components/Icons/HomeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // タグデータを持って来ている
  const tagData = await client.get({
    endpoint: "tag",
    queries: {
      filters: `slug[equals]${slug}`,
    },
  });

  const tag = tagData.contents[0];

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
            <div className="inline-flex self-start justify-center items-center gap-2 h-9 bg-[#155DFC] text-white rounded-full font-semibold px-4 py-2 shadow-md">
              <TagIcon width={16} height={16} />
              <p className="text-white">カテゴリ</p>
            </div>
            <h1 className="text-5xl font-bold">{tag.name}</h1>
            <p className="text-[18px] sm:text-[20px] text-[#4A5565] font-normal">
              {tag.description}
            </p>
            <div className="inline-flex self-start place-items-center gap-2 h-9 bg-white rounded-full font-semibold px-5 py-3 shadow-md border border-[#E5E7EB]">
              <span className="w-2 h-2 bg-[#155DFC] rounded-full"></span>
              <p className="text-text-sub text-[14px]">
                {blogs.length}件の記事
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-[#f9fafb] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-13 sm:pt-16 px-4 sm:px-8 pb-50 max-w-6xl mx-auto">
          {blogs.map((blog: Blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* 画像 */}
              <div className="h-50 relative">
                <Image
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                {/* タグ */}
                <div className="absolute  px-3 py-1.5 top-4 right-4 inline-flex gap-1.5 border border-primary-soft  rounded-full w-fit shadow-md  bg-white/95">
                  <Image
                    src="/images/tag.svg"
                    alt="タグ"
                    width={12}
                    height={12}
                  />
                  <span className="text-xs font-semibold px-2 py-1 text-primary">
                    {blog.tags[0].name}
                  </span>
                  {blog.tags.length > 1 && (
                    <span className="text-xs font-semibold px-2 py-1 text-primary">
                      ...
                    </span>
                  )}
                </div>
              </div>
              {/* 本文 */}
              <div className="flex flex-col p-6 gap-4">
                <div className="flex gap-2">
                  <CalendarIcon width={16} height={16} />
                  <span className="text-text-tertiary text-sm mt-auto">
                    {format(new Date(blog.publishedAt), "yyyy年M月d日", {
                      locale: ja,
                    })}
                  </span>
                </div>
                <h3 className="font-semibold text-2xl text-text-main line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {blog.description}
                </p>
                <div className="flex gap-2">
                  <span className="text-sm text-primary">記事を読む</span>
                  <Image
                    src="/images/blue-arrow.svg"
                    alt="矢印"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
