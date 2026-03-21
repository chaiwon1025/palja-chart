"use client";

import { useRef, useState } from "react";
import type { PaljaReport } from "@/lib/types";

interface ShareCardProps {
  report: PaljaReport;
}

export function ShareCard({ report }: ShareCardProps) {
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const shareText = `🔮 나의 투자 팔자: ${report.archetype}\n\n` +
    `일주: ${report.dayPillar}\n` +
    `FOMO 반응도: ${report.fomo.value}점 (${report.fomo.label})\n` +
    `장기투자 체력: ${report.stamina.value}점 (${report.stamina.label})\n` +
    `레버리지 유혹도: ${report.leverage.value}점 (${report.leverage.label})\n\n` +
    `📊 너의 투자 DNA도 확인해봐!\n`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "팔자차트 - 투자 DNA 분석",
          text: shareText,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyText();
    }
  };

  // 가장 높은 지표 찾기
  const metrics = [
    { name: "FOMO", value: report.fomo.value, label: report.fomo.label },
    { name: "존버력", value: report.stamina.value, label: report.stamina.label },
    { name: "레버리지", value: report.leverage.value, label: report.leverage.label },
  ];
  const topMetric = metrics.reduce((a, b) => (a.value > b.value ? a : b));

  return (
    <div className="mt-6 animate-fade-in-up-delay-7">
      {/* ===== 바이럴 공유 카드 (스크린샷 영역) ===== */}
      <div
        ref={shareRef}
        className="rounded-2xl overflow-hidden border border-border-subtle"
      >
        {/* 상단 그라데이션 영역 */}
        <div className="share-card-bg px-6 pt-7 pb-6 relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold-400/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold-400/5 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative">
            {/* 브랜드 */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-gold-400 text-sm">☰</span>
                <span className="font-serif-kr text-[11px] text-gold-300 tracking-[4px] font-bold">
                  팔자차트
                </span>
              </div>
              <span className="text-[8px] text-gray-600 tracking-[1px] font-playfair">
                INVESTMENT DNA
              </span>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="text-center mb-5">
              <p className="text-[10px] text-gray-500 tracking-[3px] mb-2">나의 투자 아키타입</p>
              <p className="font-serif-kr text-4xl font-black text-gold-gradient leading-none mb-3">
                {report.dayPillar}
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-300 text-[12px] font-bold tracking-[1px]">
                  {report.archetype}
                </span>
              </div>
            </div>

            {/* 핵심 지표 3개 요약 */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {metrics.map((m) => (
                <div
                  key={m.name}
                  className="text-center rounded-lg bg-surface-card/80 border border-border-subtle py-3 px-2"
                >
                  <p className="text-[9px] text-gray-500 mb-1 tracking-[1px]">{m.name}</p>
                  <p className={`font-playfair text-2xl font-black leading-none ${
                    m.value >= 70 ? "text-orange-400" : m.value >= 40 ? "text-gold-300" : "text-emerald-400"
                  }`}>
                    {m.value}
                  </p>
                  <p className="text-[8px] text-gray-600 mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            {/* 한줄 어필 */}
            <div className="rounded-lg bg-surface-card/60 border border-border-subtle p-3 text-center">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                <span className="text-gold-300 font-bold">{topMetric.name} {topMetric.value}점</span>
                <span className="text-gray-600 mx-1.5">·</span>
                {topMetric.label}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 CTA 영역 */}
        <div className="bg-surface-card border-t border-border-subtle px-6 py-4 text-center">
          <p className="text-[11px] text-gray-500 mb-0.5">
            너의 투자 DNA도 확인해봐!
          </p>
          <p className="text-[10px] text-gray-600 font-playfair tracking-[1px]">
            palja-chart.vercel.app
          </p>
        </div>
      </div>

      {/* 공유 버튼들 */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleNativeShare}
          className="flex-1 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 py-3 font-bold text-black text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.98]"
        >
          공유하기
        </button>
        <button
          onClick={handleCopyText}
          className="rounded-xl border border-border-subtle bg-surface-card px-5 py-3 text-sm text-gray-400 font-medium transition-all hover:bg-surface-elevated hover:text-gold-300 active:scale-[0.98]"
        >
          {copied ? "✓ 복사됨" : "텍스트 복사"}
        </button>
      </div>

      {/* 스크린샷 안내 */}
      <p className="text-center text-[10px] text-gray-600 mt-3">
        ↑ 위 카드를 스크린샷 찍어서 친구에게 보내보세요
      </p>
    </div>
  );
}
