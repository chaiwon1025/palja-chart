import type { DayPillarData, PaljaReport } from "./types";
import { calculateDayPillar } from "./calculate-day-pillar";
import { getPercentileText } from "./percentile";
import { characters } from "@/data/characters";
import dayPillarsData from "@/data/day-pillars.seed.json";

const allPillars = dayPillarsData as DayPillarData[];

const METRIC_DESCRIPTIONS = {
  fomoReactivity: "남들 수익 인증 보면 마음속 매수 버튼이 켜지는 정도",
  longTermStamina: "수익보다 지루함을 견디는 재능",
  leverageTemptation: "내 돈보다 더 큰 판에 손이 가는 위험한 자신감",
} as const;

export function buildReportFromBirthdate(
  year: number,
  month: number,
  day: number,
  isLunar: boolean
): PaljaReport {
  const dayPillar = calculateDayPillar(year, month, day, isLunar);

  const data = allPillars.find((p) => p.dayPillar === dayPillar);

  if (!data) {
    throw new Error(
      `일주 "${dayPillar}"에 해당하는 데이터를 찾을 수 없습니다.`
    );
  }

  const character = characters[data.character];

  return {
    dayPillar: data.dayPillar,
    birthInfo: { year, month, day, isLunar },
    character,
    metrics: [
      {
        label: "FOMO 반응도",
        description: METRIC_DESCRIPTIONS.fomoReactivity,
        value: data.fomoReactivity,
        percentileText: getPercentileText("fomoReactivity", data.fomoReactivity),
      },
      {
        label: "장기투자 체력",
        description: METRIC_DESCRIPTIONS.longTermStamina,
        value: data.longTermStamina,
        percentileText: getPercentileText("longTermStamina", data.longTermStamina),
      },
      {
        label: "레버리지 유혹도",
        description: METRIC_DESCRIPTIONS.leverageTemptation,
        value: data.leverageTemptation,
        percentileText: getPercentileText(
          "leverageTemptation",
          data.leverageTemptation
        ),
      },
    ],
  };
}
