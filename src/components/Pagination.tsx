import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  if (totalPages <= 1) return null;

  const page = Math.min(Math.max(1, currentPage), totalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const href = (p: number) => `${basePath}?page=${p}`;

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
        {pages.map((p) => (
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
        ))}
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
