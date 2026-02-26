"use client";
import ErrorIcon from "@/components/Icons/ErrorIcon";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <ErrorIcon width={60} height={60} />
      <h2 className="text-3xl text-primary">予期せぬエラーが発生しました</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:cursor-pointer hover:shadow-lg"
      >
        再試行する
      </button>
    </div>
  );
}
