"use server";

import { buildReportFromBirthdate } from "@/lib/build-report-from-birthdate";
import type { PaljaReport } from "@/lib/types";

export interface ActionState {
  report?: PaljaReport;
  error?: string;
}

export async function analyzeBirthdate(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const year = Number(formData.get("year"));
  const month = Number(formData.get("month"));
  const day = Number(formData.get("day"));
  const calendarType = formData.get("calendarType") as string;
  const isLunar = calendarType === "lunar";

  if (!year || !month || !day) {
    return { error: "생년월일을 모두 입력해 주세요." };
  }

  if (year < 1900 || year > 2100) {
    return { error: "연도는 1900~2100 사이로 입력해 주세요." };
  }

  if (month < 1 || month > 12) {
    return { error: "월은 1~12 사이로 입력해 주세요." };
  }

  if (day < 1 || day > 31) {
    return { error: "일은 1~31 사이로 입력해 주세요." };
  }

  try {
    const report = buildReportFromBirthdate(year, month, day, isLunar);
    return { report };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
    return { error: message };
  }
}
