import type { PercentileLabel } from "@/lib/types";

interface MetricCardProps {
  title: string;
  subtitle: string;
  emoji: string;
  metric: PercentileLabel;
  barColor: string;
}

export function MetricCard({ title, subtitle, emoji, metric, barColor }: MetricCardProps) {
  const pct = metric.value;

  // 위험도에 따른 라벨 스타일
  const getLabelColor = (value: number) => {
    if (value >= 80) return "text-red-400";
    if (value >= 60) return "text-orange-400";
    if (value >= 40) return "text-gold-300";
    if (value >= 20) return "text-emerald-400";
    return "text-blue-400";
  };

  return (
    <div className="group rounded-2xl bg-surface-card border border-border-subtle p-5 transition-all hover:glow-border hover:bg-surface-elevated">
      {/* 상단: 타이틀 + 퍼센트 */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xl" dangerouslySetInnerHTML={{ __html: emoji }} />
          <div>
            <p className="text-white text-sm font-semibold">{title}</p>
            <p className="text-gray-600 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-black tabular-nums ${getLabelColor(pct)}`}>
            {pct}
          </p>
          <p className="text-gray-600 text-[10px] tracking-wider">/ 100</p>
        </div>
      </div>

      {/* 바 */}
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} animate-bar-fill transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 라벨 */}
      <p className="mt-2 text-right text-xs text-gray-500">
        {metric.label}
      </p>
    </div>
  );
}
