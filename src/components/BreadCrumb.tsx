import Link from "next/link";
import type { ReactNode } from "react";

export type BreadCrumbItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

type Props = {
  items: BreadCrumbItem[];
};

export default function BreadCrumb({ items }: Props) {
  const separator = <span className="text-text-soft">&gt;</span>;

  return (
    <nav>
      <ol className="flex items-center gap-2 text-sm text-text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 hover:text-text-secondary hover:font-semibold transition-colors  text-sm"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="text-text-main font-semibold text-sm">
                  {item.label}
                </span>
              )}

              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
