import Link from "next/link";
import ArrowIcon from "../Icons/ArrowIcon";
import StarIcon from "../Icons/StarIcon";
import BookIcon from "../Icons/BookIcon";
import FragmentIcon from "../Icons/FragmentIcon";
import HeroImage from "../Icons/HeroImage";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col  items-center bg-primary text-white w-full">
      <div className="mx-auto px-4 pt-24 flex flex-col items-center text-center gap-6 mb-8">
        <div
          className="inline-flex items-center gap-2 
                bg-white/10 border border-white/20
                rounded-full px-4 py-2"
        >
          <StarIcon width={16} height={16} />
          <p className="text-white/90 text-sm">学びを共有する場所</p>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold flex flex-col gap-2">
          <span>エンジニアの</span>
          <span>学習記録</span>
        </h1>

        <p className="text-primary-soft text-xl">
          インターン生と社員が日々学んだ技術や
          <br />
          気づきを発信する
          <br />
          テックブログプラットフォーム
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link
            href="/blog/1"
            className="flex gap-2 items-center bg-white text-primary px-8 py-4.5 rounded-full  font-medium shadow-lg"
          >
            <BookIcon width={20} height={20} />
            <span className="text-base font-semibold">記事を読む</span>
            <ArrowIcon width={20} height={20} />
          </Link>

          <Link
            href="#categories"
            className="flex gap-2 bg-primary-dark border border-primary-border px-8 py-4.5 rounded-full font-medium items-center"
          >
            <FragmentIcon width={20} height={20} />
            <span className="text-base font-semibold">カテゴリから探す</span>
          </Link>
        </div>
      </div>
      <div className="relative h-16 sm:h-24 w-full bg-primary overflow-hidden">
        <HeroImage className="object-cover" />
      </div>
    </section>
  );
}
