"use client";

import { useState, useRef } from "react";
import type { PaljaReport, AssetCompatibility, CompatibilityLevel } from "@/lib/types";
import MetricCard from "./metric-card";

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

function AttractionGauge({ level }: { level: number }) {
  return (
    <span className="text-sm tracking-[0.15em]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < level ? "text-violet-400" : "text-white/10"}>
          ▰
        </span>
      ))}
    </span>
  );
}

function AssetRow({ asset }: { asset: AssetCompatibility }) {
  return (
    <div className="rounded-xl border border-white/[0.04] bg-card px-4 py-4">
      <div className="flex items-center gap-2.5">
        <span className="text-lg">{asset.emoji}</span>
        <span className="text-sm font-bold text-white/85">{asset.name}</span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-white/30">끌림도</span>
          <AttractionGauge level={asset.attraction} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-white/30">궁합</span>
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${compatStyle[asset.compatibility]}`}>
            {asset.compatibility}
          </span>
        </div>
      </div>
      <p className="mt-2.5 text-xs text-white/40">&ldquo;{asset.comment}&rdquo;</p>
    </div>
  );
}

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
    <div className="space-y-5">

      {/* ── 사주 분석 ── 따뜻한 앰버 톤 */}
      <section className="rounded-2xl border border-amber-500/10 bg-gradient-to-br from-[#1e1a14] to-[#19172a] p-7">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-amber-400/90 uppercase">
          사주 분석
        </p>
        <p className="mt-4 text-sm leading-[1.8] text-white/50">
          {calendarLabel} {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일생 당신은
        </p>
        <p className="mt-1 text-xl font-bold text-white">
          <span className="text-amber-400">{report.dayPillar}</span>
          <span className="text-white/80">일주입니다.</span>
        </p>
        <div className="mt-5 border-t border-amber-400/10 pt-5">
          <p className="whitespace-pre-line text-[13px] leading-[1.9] text-white/55">
            {character.sajuIntro}
          </p>
        </div>
      </section>

      {/* ── 투자 캐릭터 ── 보라빛 히어로 카드 */}
      <section className="relative overflow-hidden rounded-2xl border border-violet-500/15 bg-gradient-to-br from-[#1c1538] via-[#1a1730] to-[#171525] p-8 text-center">
        {/* 워터마크 */}
        <div className="pointer-events-none absolute -right-2 -top-2 text-[130px] leading-none opacity-[0.06] select-none">
          {character.emoji}
        </div>

        <p className="text-[11px] font-semibold tracking-[0.15em] text-violet-400 uppercase">
          당신의 투자 캐릭터
        </p>

        <div className="mx-auto mt-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-purple-600/15 text-[56px] shadow-[0_0_40px_rgba(139,92,246,0.12)]">
          {character.emoji}
        </div>

        <h2 className="mt-5 text-[28px] font-black tracking-tight text-white">
          {character.type}
        </h2>

        <div className="mx-auto mt-2 inline-block rounded-full bg-amber-400/10 px-3 py-1">
          <span className="text-[11px] font-semibold text-amber-300">
            상위 {character.rarity}% 희귀 유형
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-[280px] whitespace-pre-line text-[14px] leading-[1.9] text-white/60">
          {character.tagline}
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-xl bg-black/20 p-5 text-left">
          <p className="whitespace-pre-line text-[13px] leading-[1.9] text-white/55">
            {character.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.08] p-4">
            <p className="text-[10px] font-bold tracking-[0.12em] text-emerald-400 uppercase">강점</p>
            <p className="mt-2 text-xs leading-relaxed text-emerald-300/90">{character.strength}</p>
          </div>
          <div className="rounded-xl border border-rose-500/15 bg-rose-500/[0.08] p-4">
            <p className="text-[10px] font-bold tracking-[0.12em] text-rose-400 uppercase">약점</p>
            <p className="mt-2 text-xs leading-relaxed text-rose-300/90">{character.weakness}</p>
          </div>
        </div>
      </section>

      {/* ── 투자 자산 궁합 ── */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-b from-card-light to-card">
        <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-5">
          <div>
            <h3 className="text-[15px] font-black text-white">투자 자산 궁합</h3>
            <p className="mt-1 text-xs text-white/40">
              {report.dayPillar}일주와 가장 잘 맞는 자산은?
            </p>
          </div>
          <span className="rounded-lg bg-violet-500/15 px-2.5 py-1 text-[10px] font-bold text-violet-300">
            {character.type}
          </span>
        </div>
        <div className="space-y-2 p-4">
          {character.assets.map((asset) => (
            <AssetRow key={asset.name} asset={asset} />
          ))}
        </div>
      </section>

      {/* ── 총평 ── */}
      <section className="rounded-2xl border border-violet-500/10 bg-gradient-to-br from-[#18152e] to-card p-7">
        <h3 className="text-[11px] font-bold tracking-[0.15em] text-violet-400 uppercase">총평</h3>
        <p className="mt-4 whitespace-pre-line text-[15px] font-medium leading-[2] text-white/85">
          {character.verdict}
        </p>
      </section>

      {/* ── 공유 카드 ── 어두운 톤 + 경계감 */}
      <section ref={shareCardRef} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#14132a] to-[#0e0e1a]">
        <div className="p-8 text-center">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase">
            내 투자 캐릭터
          </p>
          <p className="mt-4 text-5xl">{character.emoji}</p>
          <h3 className="mt-3 text-[22px] font-black text-white">{character.type}</h3>

          <div className="mx-auto mt-6 max-w-xs space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-green-500/15 bg-green-500/[0.08] px-4 py-3 text-left">
                <span className="text-[10px] font-bold tracking-wider text-green-400 uppercase">추천 자산</span>
                <p className="mt-1.5 text-[13px] font-semibold text-green-300">
                  {bestAssets.map((a) => `${a.emoji} ${a.name}`).join(", ")}
                </p>
              </div>
              <div className="rounded-xl border border-red-500/15 bg-red-500/[0.08] px-4 py-3 text-left">
                <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">주의 자산</span>
                <p className="mt-1.5 text-[13px] font-semibold text-red-300">
                  {worstAssets.map((a) => `${a.emoji} ${a.name}`).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl bg-emerald-500/[0.07] px-4 py-3 text-left">
              <span className="mt-0.5 shrink-0 text-sm">🪽</span>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">희망</span>
                <p className="mt-0.5 text-[13px] leading-relaxed text-emerald-300">{character.hope}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-rose-500/[0.07] px-4 py-3 text-left">
              <span className="mt-0.5 shrink-0 text-sm">😈</span>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase">절망</span>
                <p className="mt-0.5 text-[13px] leading-relaxed text-rose-300">{character.despair}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.04] bg-white/[0.02] py-3 text-center">
          <p className="text-[11px] font-medium tracking-wider text-white/25">paljachart.com</p>
        </div>
      </section>

      {/* ── 공유 버튼 ── */}
      <button
        onClick={handleShare}
        className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/30 active:scale-[0.98]"
      >
        결과 공유하기
      </button>

      {/* ── 지표 토글 ── */}
      <div>
        <button
          onClick={() => setShowMetrics(!showMetrics)}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/[0.04] bg-card px-5 py-3.5 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          <span>투자 심리 지표 상세 보기</span>
          <span className={`text-xs transition-transform duration-200 ${showMetrics ? "rotate-180" : ""}`}>▼</span>
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
