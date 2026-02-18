import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col bg-white/80">
      <section className="relative flex flex-col  items-center bg-primary text-white w-full">
        <div className="mx-auto px-4 pt-24 flex flex-col items-center text-center gap-6 mb-8">
          <div
            className="inline-flex items-center gap-2 
                bg-white/10 border border-white/20
                rounded-full px-4 py-2"
          >
            <Image
              src="/images/star.svg"
              alt="キラキラ"
              width={16}
              height={16}
            />
            <p className="text-white/90 text-[14px]">学びを共有する場所</p>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold flex flex-col gap-2">
            <span>エンジニアの</span>
            <span>学習記録</span>
          </h1>

          <p className="text-primary-soft text-[20px]">
            インターン生と社員が日々学んだ技術や
            <br />
            気づきを発信する
            <br />
            テックブログプラットフォーム
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link
              href="/blog"
              className="flex gap-2 items-center bg-white text-primary px-8 py-4.5 rounded-full  font-medium shadow-lg"
            >
              <Image src="/images/book.svg" alt="本" width={20} height={20} />
              <span className="text-[16px] font-semibold">記事を読む</span>
              <Image
                src="/images/blue-arrow.svg"
                alt="矢印"
                width={20}
                height={20}
              />
            </Link>

            <Link
              href="#categories"
              className="flex gap-2 bg-primary-dark border border-primary-border px-8 py-4.5 rounded-full font-medium"
            >
              <Image
                src="/images/flagment.svg"
                alt="フラグメント"
                width={20}
                height={20}
              />
              <span className="text-[16px] font-semibold">
                カテゴリから探す
              </span>
            </Link>
          </div>
        </div>
      </section>
      <div className="relative h-16 sm:h-24 w-full bg-primary overflow-hidden">
        <Image
          src="/images/hero.svg"
          alt="ヒーロー画像"
          fill
          className="object-cover"
          priority
        />
      </div>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 w-fit mx-auto">
            <div className="flex items-center gap-2  self-start">
              <div className="w-8 h-0.5 bg-primary-border"></div>
              <p className="text-primary text-3.5 font-semibold">CATEGORIES</p>
              <div className="w-8 h-0.5 bg-primary-border"></div>
            </div>
            <h2 id="categories" className="text-4xl font-bold text-text-main">
              カテゴリから探す
            </h2>
            <p className="text-[18px] text-[#4A5565]">
              興味のある技術分野の記事を見つけよう
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link
                key={item}
                href="/category/typescript"
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-40 relative">
                  <Image
                    src="/images/sample.png"
                    alt="category"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-[#101828]">
                    TypeScript
                  </h3>
                  <p className="text-sm text-[#667085] mt-2">
                    TypeScriptに関する記事
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 mb-25">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
          <div className="flex items-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[#155DFC]"></div>
                <p className="text-[#155DFC] text-3.5 font-semibold">
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
              <span className="text-[#FFFFFF] text-[16px] font-semibold">
                すべて見る
              </span>
              <img src="/images/arrow.svg" alt="矢印" width={20} height={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link
                key={item}
                href="/blog/slug"
                className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 relative">
                  <Image
                    src="/images/sample.png"
                    alt="article"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-semibold text-lg text-[#101828] line-clamp-2">
                    React
                  </h3>

                  <p className="text-sm text-[#667085] line-clamp-2">React</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="flex mx-auto justify-center gap-2 bg-primary border border-primary-border px-8 py-4.5 rounded-full font-medium w-80 shadow-lg sm:hidden"
          >
            <span className="text-[#FFFFFF] text-[16px] font-semibold">
              すべて見る
            </span>
            <Image src="/images/arrow.svg" alt="矢印" width={20} height={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
