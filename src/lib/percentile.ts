import type { DayPillarData } from "./types";
import dayPillarsData from "@/data/day-pillars.seed.json";

const allPillars = dayPillarsData as DayPillarData[];

function computePercentile(values: number[], target: number): string {
  const sorted = [...values].sort((a, b) => a - b);
  const below = sorted.filter((v) => v < target).length;
  const rank = Math.round((below / sorted.length) * 100);

  if (rank >= 80) return `상위 ${100 - rank}%`;
  if (rank <= 20) return `하위 ${100 - rank}%`;
  return `상위 ${100 - rank}%`;
}

export function getPercentileText(
  field: keyof Pick<
    DayPillarData,
    "fomoReactivity" | "longTermStamina" | "leverageTemptation"
  >,
  value: number
): string {
  const values = allPillars.map((p) => p[field]);
  return computePercentile(values, value);
}
