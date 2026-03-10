import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "팔자차트",
  description: "생년월일 기반 투자 성향 리포트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
