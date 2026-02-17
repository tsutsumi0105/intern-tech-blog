import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "テックブログ",
  description:
    "「エンジニアの学習記録を、社外にも発信できるテックブログ」インターン中に学んだことや、技術Tips、つまずいたポイントの解決方法など、実際の学習・開発の中で得た知見を記事にして発信していきます。",
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
