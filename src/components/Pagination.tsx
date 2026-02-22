import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

type PageItem = number | "ellipsis";

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): PageItem[] {
  if (totalPages <= 1) return [];

  const page = Math.min(Math.max(1, currentPage), totalPages);

  const firstPage = 1;
  const lastPage = totalPages;

  const leftSibling = Math.max(page - siblingCount, firstPage);
  const rightSibling = Math.min(page + siblingCount, lastPage);

  const items: PageItem[] = [];

  items.push(firstPage);

  if (leftSibling > firstPage + 1) {
    items.push("ellipsis");
  }

  for (
    let p = Math.max(leftSibling, firstPage + 1);
    p <= Math.min(rightSibling, lastPage - 1);
    p++
  ) {
    items.push(p);
  }

  if (rightSibling < lastPage - 1) {
    items.push("ellipsis");
  }

  if (lastPage !== firstPage) {
    items.push(lastPage);
  }

  return items;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  if (totalPages <= 1) return null;

  const page = Math.min(Math.max(1, currentPage), totalPages);
  const href = (p: number) => `${basePath}?page=${p}`;
  const items = getPaginationItems(page, totalPages, 1);

  return (
    <div className="flex justify-center items-center w-full mt-6 gap-2">
      {page > 1 && (
        <Link
          href={href(page - 1)}
          className="w-10 h-10 sm:w-12 sm:h-12 font-normal grid place-items-center rounded-lg text-sm bg-white text-primary border border-border-light shadow-md hover:shadow-lg transition"
        >
          前へ
        </Link>
      )}

      <div className="flex justify-center gap-2">
        {items.map((item, idx) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-10 h-10 sm:w-12 sm:h-12  grid place-items-center rounded-lg text-sm"
              >
                …
              </span>
            );
          }

          const p = item;
          return (
            <Link
              key={p}
              href={href(p)}
              className={[
                "w-10 h-10 sm:w-12 sm:h-12 font-normal grid place-items-center rounded-lg text-sm shadow-md hover:shadow-lg transition",
                p === page
                  ? "bg-primary text-white"
                  : "bg-white text-primary border-border-light",
              ].join(" ")}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {page < totalPages && (
        <Link
          href={href(page + 1)}
          className="w-10 h-10 sm:w-12 sm:h-12 font-normal grid place-items-center rounded-lg text-sm bg-white text-primary border border-border-light shadow-md hover:shadow-lg transition"
        >
          進む
        </Link>
      )}
    </div>
  );
}
