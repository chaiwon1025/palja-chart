import KoreanLunarCalendar from "korean-lunar-calendar";
import type { BirthInput } from "./types";

/**
 * 양력 또는 음력 생년월일로부터 일주(日柱) 두 글자를 반환한다.
 * 예: "갑자", "을축" 등
 */
export function calculateDayPillar(input: BirthInput): string {
  const cal = new KoreanLunarCalendar();

  if (input.isLunar) {
    const ok = cal.setLunarDate(input.year, input.month, input.day, false);
    if (!ok) throw new Error("유효하지 않은 음력 날짜입니다.");
  } else {
    const ok = cal.setSolarDate(input.year, input.month, input.day);
    if (!ok) throw new Error("유효하지 않은 양력 날짜입니다.");
  }

  const gapja = cal.getGapja();
  // gapja.day 형태: "갑자일" → 마지막 "일" 제거
  return gapja.day.replace(/일$/, "");
}
