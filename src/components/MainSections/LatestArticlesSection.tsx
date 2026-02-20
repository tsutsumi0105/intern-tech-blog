import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Blog } from "@/types/microcms";
import ArrowIcon from "../Icons/ArrowIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import TagIcon from "../Icons/TagIcon";

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
            href="/blog"
            className="hidden sm:flex ml-auto mt-auto items-center justify-center gap-2 bg-primary rounded-full font-medium w-38.5 h-12 shadow-lg"
          >
            <div className="flex gap-2 place-items-center text-white font-semibold">
              <span className="text-white text-base font-semibold">
                すべて見る
              </span>
              <ArrowIcon width={20} height={20} />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
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
                <div className="absolute  px-3 py-1.5 top-4 right-4 inline-flex gap-1.5 border border-primary-soft  rounded-full w-fit shadow-md  bg-white/95 place-items-center  text-primary">
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
                <div className="flex place-items-center gap-2 text-text-tertiary">
                  <CalendarIcon width={16} height={16} />
                  <span className=" text-sm mt-auto">
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
                <div className="flex gap-2  text-primary place-items-center">
                  <span className="text-sm">記事を読む</span>
                  <ArrowIcon width={16} height={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="flex mx-auto justify-center gap-2 bg-primary border border-primary-border px-8 py-4.5 rounded-full font-medium w-80 shadow-lg sm:hidden"
        >
          <div className="flex gap-2 place-items-center text-white font-semibold">
            <span className="text-base">すべて見る</span>
            <ArrowIcon width={20} height={20} />
          </div>
        </Link>
      </div>
    </section>
  );
}
