import { client } from "@/lib/microcms";
import HomeIcon from "@/components/Icons/HomeIcon";
import DocIcon from "@/components/Icons/DocIcon";
import BreadCrumb, { BreadCrumbItem } from "@/components/BreadCrumb";
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  params: Promise<{ page: string }>;
};

const PER_PAGE = 6;

export async function generateStaticParams() {
  const data = await client.get({
    endpoint: "blogs",
    queries: { limit: 1 },
  });
  const totalPages = Math.max(1, Math.ceil(data.totalCount / PER_PAGE));

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default async function BlogPage({ params }: Props) {
  const { page: pageParam } = await params;
  const requestedPage = Math.max(1, Number(pageParam) || 1);
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
        <ArticleCard blogs={blogs} />
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
