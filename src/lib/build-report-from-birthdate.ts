import type { BirthInput, DayPillarSeed, PaljaReport } from "./types";
import { calculateDayPillar } from "./calculate-day-pillar";
import { toPercentileLabel } from "./percentile";
import seedData from "@/data/day-pillars.seed.json";

const seeds = seedData as DayPillarSeed[];

export function buildReportFromBirthdate(input: BirthInput): PaljaReport {
  const dayPillar = calculateDayPillar(input);

  const seed = seeds.find((s) => s.id === dayPillar);
  if (!seed) {
    throw new Error(`일주 "${dayPillar}"에 해당하는 데이터가 없습니다.`);
  }

  return {
    dayPillar: seed.id,
    archetype: seed.archetype,
    summary: seed.summary,
    fomo: toPercentileLabel("fomo", seed.fomo),
    stamina: toPercentileLabel("stamina", seed.stamina),
    leverage: toPercentileLabel("leverage", seed.leverage),
  };
}
