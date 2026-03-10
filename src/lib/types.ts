export type CharacterType =
  | "상승장 포식자"
  | "존버 마스터"
  | "코인 개척자"
  | "변동성 중독자"
  | "차트 분석 집착자"
  | "트렌드 레이더"
  | "초기 투자 중독자"
  | "안전빵 수호자"
  | "균형 투자자"
  | "매수 타이밍 헌터";

export type CompatibilityLevel = "매우 좋음" | "좋음" | "무난" | "낮음";

export interface AssetCompatibility {
  name: string;
  emoji: string;
  attraction: number;
  compatibility: CompatibilityLevel;
  comment: string;
}

export interface CharacterProfile {
  type: CharacterType;
  emoji: string;
  tagline: string;
  description: string;
  strength: string;
  weakness: string;
  hope: string;
  despair: string;
  verdict: string;
  rarity: number;
  sajuIntro: string;
  assets: AssetCompatibility[];
}

export interface DayPillarData {
  dayPillar: string;
  character: CharacterType;
  fomoReactivity: number;
  longTermStamina: number;
  leverageTemptation: number;
}

export interface MetricResult {
  label: string;
  description: string;
  value: number;
  percentileText: string;
}

export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  isLunar: boolean;
}

export interface PaljaReport {
  dayPillar: string;
  birthInfo: BirthInfo;
  character: CharacterProfile;
  metrics: MetricResult[];
}
