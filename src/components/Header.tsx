"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  {
    label: "ホーム",
    href: "/",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99912 13.9986V8.66583C9.99912 8.48903 9.92889 8.31948 9.80388 8.19447C9.67887 8.06945 9.50932 7.99922 9.33252 7.99922H6.66611C6.48932 7.99922 6.31977 8.06945 6.19476 8.19447C6.06974 8.31948 5.99951 8.48903 5.99951 8.66583V13.9986"
          stroke="currentColor"
          stroke-width="1.3332"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1.99976 6.66602C1.99971 6.47208 2.04197 6.28047 2.1236 6.10455C2.20523 5.92863 2.32426 5.77264 2.47238 5.64745L7.13859 1.64851C7.37923 1.44513 7.68411 1.33355 7.99917 1.33355C8.31424 1.33355 8.61912 1.44513 8.85976 1.64851L13.526 5.64745C13.6741 5.77264 13.7931 5.92863 13.8747 6.10455C13.9564 6.28047 13.9986 6.47208 13.9986 6.66602V12.6654C13.9986 13.019 13.8581 13.3581 13.6081 13.6082C13.3581 13.8582 13.019 13.9986 12.6654 13.9986H3.33296C2.97937 13.9986 2.64027 13.8582 2.39024 13.6082C2.14022 13.3581 1.99976 13.019 1.99976 12.6654V6.66602Z"
          stroke="currentColor"
          stroke-width="1.3332"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },

  {
    label: "記事一覧",
    href: "/blog",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_1013)">
          <path
            d="M9.999 1.3332H3.99959C3.646 1.3332 3.30689 1.47367 3.05687 1.72369C2.80684 1.97371 2.66638 2.31282 2.66638 2.66641V13.332C2.66638 13.6856 2.80684 14.0247 3.05687 14.2748C3.30689 14.5248 3.646 14.6652 3.99959 14.6652H11.9988C12.3524 14.6652 12.6915 14.5248 12.9415 14.2748C13.1916 14.0247 13.332 13.6856 13.332 13.332V4.66621L9.999 1.3332Z"
            stroke="currentColor"
            stroke-width="1.3332"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.3324 1.3332V3.99961C9.3324 4.3532 9.47286 4.69231 9.72288 4.94233C9.97291 5.19235 10.312 5.33282 10.6656 5.33282H13.332"
            stroke="currentColor"
            stroke-width="1.3332"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.66597 5.99942H5.33276"
            stroke="currentColor"
            stroke-width="1.3332"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.6656 8.66583H5.33276"
            stroke="currentColor"
            stroke-width="1.3332"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.6656 11.3322H5.33276"
            stroke="currentColor"
            stroke-width="1.3332"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1013">
            <rect width="15.9984" height="15.9984" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
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
