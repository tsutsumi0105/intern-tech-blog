import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Blog } from "@/types/microcms";
import ArrowIcon from "./Icons/ArrowIcon";
import CalendarIcon from "./Icons/CalendarIcon";
import TagIcon from "./Icons/TagIcon";

type Props = {
  blogs: Blog[];
};

export default function ArticleCard({ blogs }: Props) {
  return (
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
          </div>
          {/* 本文 */}
          <div className="flex flex-col p-6 gap-4">
            <div className="flex gap-2 place-items-center">
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
            <p className="text-sm text-text-secondary">{blog.description}</p>
            {/* タグ */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="flex items-center gap-1 text-primary border border-primary-soft rounded-full px-3 py-2"
                  >
                    <TagIcon width={14} height={14} />
                    <span className="text-sm font-semibold">{tag.name}</span>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2 text-primary items-center">
              <span className="text-sm">記事を読む</span>
              <ArrowIcon width={16} height={16} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
