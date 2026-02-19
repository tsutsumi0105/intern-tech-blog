import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-text-main px-19 py-12 sm:px-28">
      <div className="mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="TechBlogロゴ"
            width={48}
            height={48}
          />
          <div className="flex flex-col">
            <span className="text-surface text-xl font-bold">TechBlog</span>
            <span className="text-text-muted text-sm font-normal">
              Learn, Share, Grow
            </span>
          </div>
        </div>
        <p className="text-text-soft text-sm font-normal">
          © 2026 TechBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
