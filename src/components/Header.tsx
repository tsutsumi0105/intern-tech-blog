"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "./Icons/HomeIcon";
import DocIcon from "./Icons/DocIcon";

const navItems = [
  {
    label: "ホーム",
    href: "/",
    icon: <HomeIcon width={16} height={16} />,
  },

  {
    label: "記事一覧",
    href: "/blog",
    icon: <DocIcon width={16} height={16} />,
  },
];

export default function Header() {
  const pathname = usePathname();

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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
    ${isActive ? "bg-primary-light text-primary" : "text-text-sub"}
  `}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
