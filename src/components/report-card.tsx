import type { PaljaReport } from "@/lib/types";
import { MetricCard } from "./metric-card";

interface ReportCardProps {
  report: PaljaReport;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* 일주 + 아키타입 */}
      <div className="text-center">
        <p className="text-5xl font-black tracking-wide text-white">
          {report.dayPillar}
        </p>
        <p className="mt-2 text-lg text-indigo-400">{report.archetype}</p>
      </div>

      {/* 한줄 총평 */}
      <p className="rounded-xl bg-gray-900 px-5 py-4 text-center text-gray-300 leading-relaxed">
        {report.summary}
      </p>

      {/* 3개 지표 */}
      <div className="space-y-3">
        <MetricCard title="FOMO 반응도" emoji="🔥" metric={report.fomo} />
        <MetricCard title="장기투자 체력" emoji="🏋️" metric={report.stamina} />
        <MetricCard title="레버리지 유혹도" emoji="⚡" metric={report.leverage} />
      </div>
    </div>
  );
}
