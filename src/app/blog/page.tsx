export const dynamic = "force-dynamic";
import { client } from "@/lib/microcms";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "@/components/Icons/HomeIcon";
import DocIcon from "@/components/Icons/DocIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import TagIcon from "@/components/Icons/TagIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import BreadCrumb, { BreadCrumbItem } from "@/components/BreadCrumb";
import Pagination from "@/components/Pagination";
import type { Blog } from "@/types/microcms";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Props = {
  searchParams?: Promise<{ page?: string }>;
};

const PER_PAGE = 6;

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const requestedPage = Math.max(1, Number(params?.page ?? "1") || 1);
  const offset = (requestedPage - 1) * PER_PAGE;
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      limit: PER_PAGE,
      offset,
      orders: "-publishedAt",
    },
  });
  const totalCount = data.totalCount;
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));
  const page = Math.min(requestedPage, totalPages);

  const blogs = data.contents;

  const breadcrumbItems: BreadCrumbItem[] = [
    {
      label: "ホーム",
      href: "/",
      icon: <HomeIcon width={16} height={16} />,
    },
    { label: "記事一覧" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        {/* パンくず*/}
        <BreadCrumb items={breadcrumbItems} />

        {/* 見出し */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-[14px] flex items-center justify-center">
            <DocIcon width={24} height={24} className="text-white" />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-main">
              記事一覧
            </h1>
            <p className="text-base text-text-secondary">
              全{totalCount}件の記事
            </p>
          </div>
        </div>

        {/*記事*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="absolute  px-3 py-1.5 top-4 right-4 inline-flex gap-1.5 border border-primary-soft  rounded-full w-fit shadow-md  bg-white/95  text-primary items-center">
                  <TagIcon width={12} height={12} />
                  {blog.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs font-semibold px-2 py-1"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              {/* 本文 */}
              <div className="flex flex-col p-6 gap-4">
                <div className="flex gap-2 items-center">
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
                <div className="flex gap-2  text-primary items-center">
                  <span className="text-sm">記事を読む</span>
                  <ArrowIcon width={16} height={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/*ページネーション*/}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/blog"
        />
      </div>
    </section>
  );
}
