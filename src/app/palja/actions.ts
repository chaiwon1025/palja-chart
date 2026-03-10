"use server";

import { buildReportFromBirthdate } from "@/lib/build-report-from-birthdate";
import type { PaljaReport } from "@/lib/types";

type ActionResult =
  | { ok: true; report: PaljaReport }
  | { ok: false; error: string };

export async function getPaljaReport(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const year = Number(formData.get("year"));
  const month = Number(formData.get("month"));
  const day = Number(formData.get("day"));
  const isLunar = formData.get("calendar") === "lunar";

  if (!year || !month || !day) {
    return { ok: false, error: "생년월일을 모두 입력해주세요." };
  }

  try {
    const report = buildReportFromBirthdate({ year, month, day, isLunar });
    return { ok: true, report };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "알 수 없는 오류";
    return { ok: false, error: msg };
  }
}
