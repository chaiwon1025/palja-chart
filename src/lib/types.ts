/** 60갑자 일주 데이터 */
export interface DayPillarSeed {
  id: string;           // e.g. "갑자"
  archetype: string;    // e.g. "선구적 개척자"
  summary: string;      // 한줄 총평
  fomo: number;         // FOMO 반응도 (0–100 raw score)
  stamina: number;      // 장기투자 체력 (0–100 raw score)
  leverage: number;     // 레버리지 유혹도 (0–100 raw score)
}

/** 퍼센타일 라벨 */
export interface PercentileLabel {
  value: number;
  label: string; // e.g. "상위 12%"
}

/** 최종 리포트 */
export interface PaljaReport {
  dayPillar: string;
  archetype: string;
  summary: string;
  fomo: PercentileLabel;
  stamina: PercentileLabel;
  leverage: PercentileLabel;
}

/** 폼 입력 */
export interface BirthInput {
  year: number;
  month: number;
  day: number;
  isLunar: boolean;
}
