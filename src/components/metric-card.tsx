import type { PercentileLabel } from "@/lib/types";

interface MetricCardProps {
  title: string;
  emoji: string;
  metric: PercentileLabel;
}

export function MetricCard({ title, emoji, metric }: MetricCardProps) {
  const pct = metric.value;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
        <span>{emoji}</span>
        <span>{title}</span>
      </div>

      {/* bar */}
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-right text-lg font-semibold text-white">
        {metric.label}
      </p>
    </div>
  );
}
