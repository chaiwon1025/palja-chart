import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "팔자차트 | 사주로 보는 내 투자 DNA",
  description: "생년월일 하나로 알아보는 투자 성향 리포트. 당신의 팔자에 숨겨진 투자 DNA를 확인하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-surface text-gray-100 antialiased bg-pattern">
        {children}
      </body>
    </html>
  );
}
