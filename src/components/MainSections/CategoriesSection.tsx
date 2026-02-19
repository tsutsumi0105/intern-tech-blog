import Link from "next/link";
import Image from "next/image";
import type { Tag } from "@/types/microcms";

type Props = {
  tags: Tag[];
};

export default function CategoriesSection({ tags }: Props) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 w-fit mx-auto">
          <div className="flex items-center gap-2  self-start">
            <div className="w-8 h-0.5 bg-primary-border"></div>
            <p className="text-primary text-sm font-semibold">CATEGORIES</p>
            <div className="w-8 h-0.5 bg-primary-border"></div>
          </div>
          <h2
            id="categories"
            className="text-4xl sm:text-5xl font-bold text-text-main"
          >
            カテゴリから探す
          </h2>
          <p className="text-lg text-text-secondary">
            興味のある技術分野の記事を見つけよう
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/category/${tag.slug}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 relative overflow-hidden rounded-t-xl">
                <Image
                  src={tag.thumbnail.url}
                  alt={tag.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-7 left-6 flex items-center gap-2">
                  <h3 className="font-semibold text-2xl text-white">
                    {tag.name}
                  </h3>
                  <Image
                    src="/images/arrow.svg"
                    alt="矢印"
                    width={16}
                    height={16}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <p className="text-sm text-text-muted line-clamp-2">
                  {tag.description}
                </p>
                <div className="flex gap-2">
                  <span className="text-sm text-primary">記事を見る</span>
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
    </section>
  );
}
