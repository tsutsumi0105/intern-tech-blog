"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname === "/blog";

  return (
    <header className="bg-surface/80 border-b border-border-light flex items-center px-4 py-3 drop-shadow sm:px-28 sm:py-5">
      <div className="flex items-center w-full">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="TechBlogロゴ"
            width={48}
            height={48}
            className="drop-shadow-md"
          />
          <span className="font-bold text-2xl text-text-main">TechBlog</span>
        </Link>

        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 font-medium text-[16px] px-4 py-2 rounded-full transition-colors
              ${isHome ? "bg-primary-light text-primary" : "text-text-sub"}`}
          >
            <Image
              src={isHome ? "/images/home_blue.svg" : "/images/home.svg"}
              alt="ホーム"
              width={16}
              height={16}
            />
            <span className={`hidden sm:inline`}>ホーム</span>
          </Link>

          <Link
            href="/blog"
            className={`flex items-center gap-2 font-medium text-[16px] px-4 py-2 rounded-full transition-colors
              ${isBlog ? "bg-primary-light text-primary" : "text-text-sub"}`}
          >
            <Image
              src={isBlog ? "/images/doc_blue.svg" : "/images/doc.svg"}
              alt="記事一覧"
              width={16}
              height={16}
            />
            <span className="hidden sm:inline">記事一覧</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
