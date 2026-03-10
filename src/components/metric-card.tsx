import type { MetricResult } from "@/lib/types";

const colorMap: Record<string, { bar: string; bg: string; text: string; desc: string }> = {
  "FOMO 반응도": { bar: "bg-rose-500", bg: "bg-rose-500/10", text: "text-rose-400", desc: "text-rose-300/80" },
  "장기투자 체력": { bar: "bg-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-400", desc: "text-emerald-300/80" },
  "레버리지 유혹도": { bar: "bg-amber-500", bg: "bg-amber-500/10", text: "text-amber-400", desc: "text-amber-300/80" },
};

export default function MetricCard({ metric }: { metric: MetricResult }) {
  const colors = colorMap[metric.label] ?? {
    bar: "bg-gray-500",
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    desc: "text-gray-300",
  };

  return (
    <div className="rounded-xl bg-card p-5">
      <div className="mb-1 flex items-start justify-between gap-2">
        <div>
          <h4 className={`text-sm font-bold ${colors.text}`}>{metric.label}</h4>
          <p className={`mt-1 text-xs leading-relaxed ${colors.desc}`}>
            &ldquo;{metric.description}&rdquo;
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-card-light px-2.5 py-1 text-[11px] font-bold text-white/80">
          {metric.percentileText}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className={`h-2 flex-1 rounded-full ${colors.bg}`}>
          <div
            className={`h-2 rounded-full ${colors.bar} transition-all duration-1000 ease-out`}
            style={{ width: `${metric.value}%` }}
          />
        </div>
        <span className="w-8 text-right text-xs font-semibold text-white/45">
          {metric.value}
        </span>
      </div>
    </div>
  );
}
