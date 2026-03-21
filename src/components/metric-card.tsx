import type { PercentileLabel } from "@/lib/types";

interface MetricCardProps {
  title: string;
  subtitle: string;
  metric: PercentileLabel;
  colorClass: string;
  fillClass: string;
}

export function MetricCard({ title, subtitle, metric, colorClass, fillClass }: MetricCardProps) {
  const pct = metric.value;

  return (
    <div className="group">
      {/* 상단: 타이틀 + 점수 */}
      <div className="flex items-end justify-between mb-1.5">
        <div>
          <p className="font-serif-kr text-[14px] font-bold text-white mb-0.5">
            {title}
          </p>
          <p className="text-[10px] text-gray-600">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className={`font-playfair text-3xl font-black leading-none ${colorClass}`}>
            {pct}
          </p>
          <p className="text-[9px] text-gray-600 mt-1 tracking-[0.5px]">
            {metric.label}
          </p>
        </div>
      </div>

      {/* 게이지 바 */}
      <div className="gauge-track mt-2.5">
        <div
          className={`gauge-fill bg-gradient-to-r ${fillClass} animate-bar-fill`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 스케일 마커 */}
      <div className="flex justify-between mt-1">
        <span className="text-[7px] text-gray-700">0</span>
        <span className="text-[7px] text-gray-700">25</span>
        <span className="text-[7px] text-gray-700">50</span>
        <span className="text-[7px] text-gray-700">75</span>
        <span className="text-[7px] text-gray-700">100</span>
      </div>
    </div>
  );
}
