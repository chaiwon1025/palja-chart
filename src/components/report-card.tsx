import type { PaljaReport } from "@/lib/types";
import { MetricCard } from "./metric-card";

interface ReportCardProps {
  report: PaljaReport;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 일주 히어로 카드 */}
      <div className="relative rounded-2xl bg-surface-card border border-border-subtle p-8 text-center overflow-hidden glow-border-strong">
        {/* 배경 장식 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold-400/5 to-transparent pointer-events-none" />

        <div className="relative">
          {/* 일주 라벨 */}
          <p className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-4">
            당신의 일주
          </p>

          {/* 일주 글자 */}
          <p className="font-serif-kr text-7xl font-black text-gold-gradient mb-4 leading-none">
            {report.dayPillar}
          </p>

          {/* 아키타입 뱃지 */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-300 text-sm font-medium">
              {report.archetype}
            </span>
          </div>
        </div>
      </div>

      {/* 한줄 총평 */}
      <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 animate-fade-in-up-delay-1">
        <div className="flex items-start gap-3">
          <span className="text-gold-400 text-lg mt-0.5">&ldquo;</span>
          <p className="text-gray-300 leading-relaxed text-[15px] flex-1">
            {report.summary}
          </p>
          <span className="text-gold-400 text-lg mt-0.5">&rdquo;</span>
        </div>
      </div>

      {/* 투자 DNA 지표 헤더 */}
      <div className="flex items-center gap-3 animate-fade-in-up-delay-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <span className="text-xs text-gray-500 tracking-[0.2em] uppercase font-medium">
          투자 DNA 분석
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      {/* 3개 지표 */}
      <div className="space-y-3 animate-fade-in-up-delay-3">
        <MetricCard
          title="FOMO 반응도"
          subtitle="급등주 보면 참을 수 있는가"
          emoji="&#x1F525;"
          metric={report.fomo}
          barColor="from-orange-500 to-red-500"
        />
        <MetricCard
          title="장기투자 체력"
          subtitle="존버는 승리한다... 과연?"
          emoji="&#x1F3CB;&#xFE0F;"
          metric={report.stamina}
          barColor="from-emerald-500 to-teal-400"
        />
        <MetricCard
          title="레버리지 유혹도"
          subtitle="빚투의 늪에 빠질 확률"
          emoji="&#x26A1;"
          metric={report.leverage}
          barColor="from-purple-500 to-pink-500"
        />
      </div>

      {/* 공유 유도 */}
      <div className="rounded-2xl bg-surface-card border border-border-subtle p-5 text-center animate-fade-in-up-delay-4">
        <p className="text-gray-500 text-xs mb-2">
          친구의 투자 팔자도 궁금하다면?
        </p>
        <p className="text-gold-300 text-sm font-medium">
          스크린샷 찍어서 공유해보세요
        </p>
      </div>
    </div>
  );
}
