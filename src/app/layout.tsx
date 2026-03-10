import type { Metadata } from "next";
import { Geist, Geist_Mono, Nanum_Brush_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nanumBrush = Nanum_Brush_Script({
  weight: "400",
  variable: "--font-brush",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "팔자차트 - 생년월일 투자 성향 분석",
  description: "생년월일 기반 사주 일주로 알아보는 나의 투자 성향",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nanumBrush.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
