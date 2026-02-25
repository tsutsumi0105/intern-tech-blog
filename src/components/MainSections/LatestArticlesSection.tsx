import Link from "next/link";
import type { Blog } from "@/types/microcms";
import ArrowIcon from "../Icons/ArrowIcon";
import ArticleCard from "../ArticleCard";

type Props = {
  blogs: Blog[];
};

export default function LatestArticlesSection({ blogs }: Props) {
  return (
    <section className="py-16 mb-25">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        <div className="flex items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-primary"></div>
              <p className="text-primary text-sm font-semibold">
                LATEST ARTICLES
              </p>
            </div>
            <h2 className="text-[40px] font-bold text-surface-dark">
              最新の記事
            </h2>
          </div>
          <Link
            href="/blog/1"
            className="hidden sm:flex ml-auto mt-auto items-center justify-center gap-2 bg-primary rounded-full w-38.5 h-12 shadow-lg place-items-center text-white font-semibold text-base"
          >
            <span>すべて見る</span>
            <ArrowIcon width={20} height={20} />
          </Link>
        </div>
        <ArticleCard blogs={blogs} />
        <Link
          href="/blog/1"
          className="flex mx-auto justify-center items-center gap-2 bg-primary border border-primary-border px-8 py-4.5 rounded-full w-80 shadow-lg sm:hidden text-white font-semibold text-base"
        >
          <span>すべて見る</span>
          <ArrowIcon width={20} height={20} />
        </Link>
      </div>
    </section>
  );
}
