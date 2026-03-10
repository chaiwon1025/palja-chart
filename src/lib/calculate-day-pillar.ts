import KoreanLunarCalendar from "korean-lunar-calendar";

const HEAVENLY_STEMS = [
  "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계",
] as const;

const EARTHLY_BRANCHES = [
  "자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해",
] as const;

export function calculateDayPillar(
  year: number,
  month: number,
  day: number,
  isLunar: boolean
): string {
  const calendar = new KoreanLunarCalendar();

  if (isLunar) {
    calendar.setLunarDate(year, month, day, false);
  } else {
    calendar.setSolarDate(year, month, day);
  }

  const idx = calendar.getGapJaIndex();
  const stem = HEAVENLY_STEMS[idx.cheongan.day];
  const branch = EARTHLY_BRANCHES[idx.ganji.day];

  return `${stem}${branch}`;
}
