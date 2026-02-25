import type { TocItem } from "@/lib/render-toc";
import Image from "next/image";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc.length) return null;

  return (
    <nav className="flex flex-col gap-6 bg-white border border-primary-soft rounded-3xl p-6 shadow-lg mx-4.25">
      <div className="flex gap-2 items-center border-b-2 border-primary-soft py-2">
        <Image
          src="/images/TableOfContents.svg"
          alt="目次"
          width={32}
          height={32}
        />
        <p className="font-bold text-text-main text-lg">目次</p>
      </div>
      <ul className="flex flex-col gap-1">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                  group relative flex items-center
                  overflow-hidden rounded-[10px] py-2 pl-3
                  text-[14px] text-text-sub transition
                  hover:bg-primary-light hover:text-primary hover:font-bold
                `}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-1.25 w-2.5 h-[50%] rounded-full bg-primary hidden group-hover:block" />
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
