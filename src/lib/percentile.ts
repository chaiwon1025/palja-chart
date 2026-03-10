import type { PercentileLabel, DayPillarSeed } from "./types";
import seedData from "@/data/day-pillars.seed.json";

const seeds = seedData as DayPillarSeed[];

/**
 * 특정 metric의 raw score를 60갑자 전체 분포에서
 * "상위 X%" 또는 "하위 X%" 라벨로 변환한다.
 */
export function toPercentileLabel(
  metricKey: "fomo" | "stamina" | "leverage",
  value: number,
): PercentileLabel {
  const all = seeds.map((s) => s[metricKey]).sort((a, b) => a - b);

  // value 이하인 항목 수 → 백분위
  const rank = all.filter((v) => v <= value).length;
  const percentile = Math.round((rank / all.length) * 100);

  if (percentile >= 50) {
    return { value, label: `상위 ${100 - percentile}%` };
  }
  return { value, label: `하위 ${percentile}%` };
}
