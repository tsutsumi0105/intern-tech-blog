import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://intern-tech-blog.vercel.app"),
  title: "intern-tech-blog",
  description:
    "インターン生と社員が日々学んだ技術や気づきを発信するテックブログプラットフォーム",
  openGraph: {
    type: "website",
    siteName: "intern-tech-blog",
    title: "intern-tech-blog",
    description:
      "インターン生と社員が日々学んだ技術や気づきを発信するテックブログプラットフォーム",
    url: "/",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "intern-tech-blog",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`bg-[#F9FAFB] min-h-screen flex flex-col ${inter.className}`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
