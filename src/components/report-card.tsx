"use client";

import { useState, useRef } from "react";
import type { PaljaReport, AssetCompatibility, CompatibilityLevel } from "@/lib/types";
import MetricCard from "./metric-card";

/* ── Compat helpers ── */

const compatStyle: Record<CompatibilityLevel, string> = {
  "매우 좋음": "border-green-500/30 bg-green-500/15 text-green-400",
  "좋음": "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  "무난": "border-yellow-500/30 bg-yellow-500/15 text-yellow-400",
  "낮음": "border-red-500/30 bg-red-500/15 text-red-400",
};

const compatRank: Record<CompatibilityLevel, number> = {
  "매우 좋음": 4, "좋음": 3, "무난": 2, "낮음": 1,
};

function getAssetsByCompatibility(
  assets: AssetCompatibility[],
  pick: "best" | "worst"
) {
  const sorted = [...assets].sort(
    (a, b) => compatRank[b.compatibility] - compatRank[a.compatibility]
  );
  const target = pick === "best" ? sorted[0] : sorted[sorted.length - 1];
  return assets.filter(
    (a) => compatRank[a.compatibility] === compatRank[target.compatibility]
  );
}

/* ── Sub-components ── */

function AttractionGauge({ level }: { level: number }) {
  return (
    <span className="text-sm tracking-[0.15em]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < level ? "text-indigo-400" : "text-white/10"}>
          ▰
        </span>
      ))}
    </span>
  );
}

function AssetRow({ asset }: { asset: AssetCompatibility }) {
  return (
    <div className="rounded-xl bg-card-light px-4 py-4">
      <div className="flex items-center gap-2.5">
        <span className="text-lg">{asset.emoji}</span>
        <span className="text-sm font-bold text-white/85">{asset.name}</span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-white/35">끌림도</span>
          <AttractionGauge level={asset.attraction} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-white/35">궁합</span>
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${compatStyle[asset.compatibility]}`}>
            {asset.compatibility}
          </span>
        </div>
      </div>
      <p className="mt-2.5 text-xs text-white/40">&ldquo;{asset.comment}&rdquo;</p>
    </div>
  );
}

/* ── Main ── */

export default function ReportCard({ report }: { report: PaljaReport }) {
  const { character, birthInfo } = report;
  const [showMetrics, setShowMetrics] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const calendarLabel = birthInfo.isLunar ? "음력" : "양력";
  const bestAssets = getAssetsByCompatibility(character.assets, "best");
  const worstAssets = getAssetsByCompatibility(character.assets, "worst");

  const handleShare = async () => {
    const text = [
      `나의 투자 캐릭터: ${character.emoji} ${character.type}`,
      ``,
      `추천 자산: ${bestAssets.map((a) => `${a.emoji} ${a.name}`).join(", ")}`,
      `주의 자산: ${worstAssets.map((a) => `${a.emoji} ${a.name}`).join(", ")}`,
      ``,
      `🪽 희망: ${character.hope}`,
      `😈 절망: ${character.despair}`,
      ``,
      `전체 결과 중 ${character.rarity}%만 나오는 희귀 유형`,
      ``,
      `paljachart.com`,
    ].join("\n");

    if (navigator.share) {
      try {
        await navigator.share({ title: "팔자차트 결과", text });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  return (
    <div className="space-y-4">
      {/* ── 사주 분석 ── */}
      <section className="rounded-2xl bg-card p-6">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-amber-400/80 uppercase">
          사주 분석
        </p>
        <p className="mt-4 text-sm leading-[1.8] text-white/50">
          {calendarLabel} {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일생 당신은
        </p>
        <p className="mt-1 text-lg font-bold text-white">
          <span className="text-amber-400">{report.dayPillar}</span>일주입니다.
        </p>
        <p className="mt-4 whitespace-pre-line text-[13px] leading-[1.85] text-white/55">
          {character.sajuIntro}
        </p>
      </section>

      {/* ── 투자 캐릭터 ── */}
      <section className="relative overflow-hidden rounded-2xl bg-card p-8 text-center">
        {/* Watermark */}
        <div className="pointer-events-none absolute -right-4 -top-4 text-[120px] leading-none opacity-[0.05] select-none">
          {character.emoji}
        </div>

        <p className="text-[11px] font-semibold tracking-[0.15em] text-purple-400 uppercase">
          당신의 투자 캐릭터
        </p>
        <div className="mx-auto mt-5 flex h-24 w-24 items-center justify-center rounded-full bg-card-light text-5xl">
          {character.emoji}
        </div>
        <h2 className="mt-5 text-[26px] font-black tracking-tight text-white">
          {character.type}
        </h2>

        {/* Rarity */}
        <p className="mt-2 text-xs text-amber-400/80">
          전체 결과 중 <span className="font-bold">{character.rarity}%</span>만 나오는 희귀 유형
        </p>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-xs whitespace-pre-line text-sm leading-[1.8] text-white/60">
          {character.tagline}
        </p>

        {/* Description */}
        <div className="mx-auto mt-6 max-w-sm rounded-xl bg-card-light p-5 text-left">
          <p className="whitespace-pre-line text-[13px] leading-[1.85] text-white/55">
            {character.description}
          </p>
        </div>

        {/* Strength / Weakness */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-emerald-500/10 p-4 text-left">
            <p className="text-[10px] font-bold tracking-[0.12em] text-emerald-400 uppercase">
              강점
            </p>
            <p className="mt-2 text-xs leading-relaxed text-emerald-300/90">
              {character.strength}
            </p>
          </div>
          <div className="rounded-xl bg-rose-500/10 p-4 text-left">
            <p className="text-[10px] font-bold tracking-[0.12em] text-rose-400 uppercase">
              약점
            </p>
            <p className="mt-2 text-xs leading-relaxed text-rose-300/90">
              {character.weakness}
            </p>
          </div>
        </div>
      </section>

      {/* ── 투자 자산 궁합 ── */}
      <section className="overflow-hidden rounded-2xl bg-card">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h3 className="text-[15px] font-black text-white">
              투자 자산 궁합
            </h3>
            <p className="mt-1 text-xs text-white/40">
              {report.dayPillar}일주와 가장 잘 맞는 자산은?
            </p>
          </div>
          <span className="rounded-lg bg-card-light px-2.5 py-1 text-[10px] font-bold text-purple-300">
            {character.type}
          </span>
        </div>
        <div className="space-y-2 px-4 pb-5">
          {character.assets.map((asset) => (
            <AssetRow key={asset.name} asset={asset} />
          ))}
        </div>
      </section>

      {/* ── 총평 ── */}
      <section className="rounded-2xl bg-card p-6">
        <h3 className="text-[11px] font-bold tracking-[0.15em] text-purple-400 uppercase">
          총평
        </h3>
        <p className="mt-4 whitespace-pre-line text-[15px] font-medium leading-[2] text-white/85">
          {character.verdict}
        </p>
      </section>

      {/* ── 공유 카드 ── */}
      <section ref={shareCardRef} className="overflow-hidden rounded-2xl bg-card">
        <div className="p-7 text-center">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-white/35 uppercase">
            내 투자 캐릭터
          </p>
          <p className="mt-3 text-5xl">{character.emoji}</p>
          <h3 className="mt-3 text-xl font-black text-white">{character.type}</h3>

          <div className="mx-auto mt-5 max-w-xs space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-green-500/10 px-4 py-3 text-left">
                <span className="text-[10px] font-bold tracking-wider text-green-400 uppercase">추천 자산</span>
                <p className="mt-1.5 text-[13px] font-semibold text-green-300">
                  {bestAssets.map((a) => `${a.emoji} ${a.name}`).join(", ")}
                </p>
              </div>
              <div className="rounded-xl bg-red-500/10 px-4 py-3 text-left">
                <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">주의 자산</span>
                <p className="mt-1.5 text-[13px] font-semibold text-red-300">
                  {worstAssets.map((a) => `${a.emoji} ${a.name}`).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl bg-emerald-500/10 px-4 py-3 text-left">
              <span className="mt-0.5 shrink-0 text-sm">🪽</span>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">희망</span>
                <p className="mt-0.5 text-[13px] leading-relaxed text-emerald-300">{character.hope}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-rose-500/10 px-4 py-3 text-left">
              <span className="mt-0.5 shrink-0 text-sm">😈</span>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase">절망</span>
                <p className="mt-0.5 text-[13px] leading-relaxed text-rose-300">{character.despair}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 bg-card-light px-7 py-3 text-center">
          <p className="text-[11px] font-medium tracking-wider text-white/30">
            paljachart.com
          </p>
        </div>
      </section>

      {/* ── 공유 버튼 ── */}
      <button
        onClick={handleShare}
        className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        결과 공유하기
      </button>

      {/* ── 지표 토글 ── */}
      <div>
        <button
          onClick={() => setShowMetrics(!showMetrics)}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-card px-5 py-3.5 text-sm text-white/45 transition-colors hover:text-white/60"
        >
          <span>투자 심리 지표 상세 보기</span>
          <span className={`text-xs transition-transform duration-200 ${showMetrics ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {showMetrics && (
          <div className="mt-3 space-y-2.5">
            {report.metrics.map((m) => (
              <MetricCard key={m.label} metric={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
