import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Blog, Tag } from "@/types/microcms";
import parse, { DOMNode, domToReact } from "html-react-parser";
import { Element as DomElement } from "domhandler";
import { renderToc } from "@/lib/render-toc";
import TableOfContents from "@/components/TableOfContents";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import BreadCrumb, { BreadCrumbItem } from "@/components/BreadCrumb";
import Link from "next/link";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import TagIcon from "@/components/Icons/TagIcon";
import HomeIcon from "@/components/Icons/HomeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let blog: Blog;

  try {
    blog = await client.get<Blog>({
      endpoint: "blogs",
      contentId: slug,
      queries: {
        fields:
          "id,title,description,content,eyecatch,tags.id,tags.name,tags.slug,publishedAt",
      },
    });
  } catch {
    notFound();
  }

  const { toc, html } = renderToc(blog.content);

  const options = {
    replace(domNode: DOMNode) {
      if (domNode.type !== "tag") return;
      const el = domNode as DomElement;
      const children = domToReact(el.children as unknown as DOMNode[], options);
      const id = el.attribs?.id;

      switch (el.name) {
        case "h1":
          return (
            <div className="flex items-center gap-3 scroll-mt-24" id={id}>
              <span className="w-2 h-10 bg-primary rounded-full" />
              <h1 className="text-4xl text-text-main font-bold">{children}</h1>
            </div>
          );

        case "h2":
          return (
            <div className="flex items-center gap-3 scroll-mt-24" id={id}>
              <span className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl font-semibold">{children}</h2>
            </div>
          );

        case "h3":
          return (
            <h3 className="text-xl font-semibold scroll-mt-24">{children}</h3>
          );

        case "p":
          return <p className="text-lg text-text-sub mb-6">{children}</p>;

        case "pre":
          return (
            <pre className="bg-slate-900 text-white p-6 rounded-2xl overflow-x-auto mb-8">
              {children}
            </pre>
          );

        case "code":
          return <code className="font-mono text-sm">{children}</code>;

        case "strong":
        case "b":
          return <span className="font-bold text-text-main">{children}</span>;

        case "hr":
          return <hr className="border-t border-border my-8" />;
      }
    },
  };

  const breadcrumbItems: BreadCrumbItem[] = [
    { label: "ホーム", href: "/", icon: <HomeIcon width={16} height={16} /> },
    { label: "記事一覧", href: "/blog/1" },
    { label: `${blog.title}` },
  ];

  return (
    <div className="flex flex-col">
      <div className="max-w-6xl mx-auto bg-surface-muted flex flex-col gap-4 mb-25 pb-8 mt-12">
        <div className="mx-4">
          <BreadCrumb items={breadcrumbItems} />
          <Link
            href="/blog/1"
            className="
              mt-4 inline-flex items-center gap-2
              text-base
              px-4.5 py-2.5
              rounded-full
              border shadow-lg
              bg-white text-primary border-border
              transition-colors duration-200
              hover:bg-primary hover:text-white hover:border-primary
            "
          >
            <ArrowIcon
              width={16}
              height={16}
              className="transform -scale-x-100"
            />
            <span>記事一覧に戻る</span>
          </Link>
        </div>
        <div className="mx-4.25 bg-white rounded-t-2xl rounded-b-2xl shadow-lg">
          <div className="rounded-t-2xl">
            <div className="relative w-full h-80 sm:h-150 rounded-t-2xl overflow-hidden">
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex gap-4 mb-6">
              <div className="px-4 py-2 rounded-full w-fit inline-flex gap-1.5 border border-border bg-surface-muted text-sm text-text-sub items-center">
                <CalendarIcon width={16} height={16} />
                <span>
                  {format(new Date(blog.publishedAt), "yyyy年M月d日", {
                    locale: ja,
                  })}
                </span>
              </div>
              {blog.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/category/${tag.slug}`}
                  className="px-4 py-2 rounded-full w-fit inline-flex place-items-center border border-primary-soft shadow-md bg-primary text-white gap-2"
                >
                  <TagIcon width={16} height={16} />
                  <span className="text-sm font-semibold">{tag.name}</span>
                </Link>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold mb-8">
              {blog.title}
            </h1>
            {blog.description && (
              <p className="text-lg text-text-secondary mb-12">
                {blog.description}
              </p>
            )}
            <div className="sm:grid lg:grid-cols-[1fr_255px] sm:gap-8 sm:items-start">
              <article className="blog-content space-y-6 sm:flex-1">
                {parse(html, options)}
              </article>

              <aside className="hidden lg:block w-64 shrink-0 sticky top-10">
                <TableOfContents toc={toc} />
              </aside>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  );
}
