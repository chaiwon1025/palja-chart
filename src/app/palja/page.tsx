"use client";

import { useActionState } from "react";
import { getPaljaReport } from "./actions";
import { ReportCard } from "@/components/report-card";

export default function PaljaPage() {
  const [state, formAction, isPending] = useActionState(getPaljaReport, null);

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">
        팔자차트
      </h1>

      <form action={formAction} className="mb-10 space-y-4">
        {/* 양력/음력 선택 */}
        <fieldset className="flex gap-4 justify-center">
          <label className="flex items-center gap-1.5 text-gray-300">
            <input
              type="radio"
              name="calendar"
              value="solar"
              defaultChecked
              className="accent-indigo-500"
            />
            양력
          </label>
          <label className="flex items-center gap-1.5 text-gray-300">
            <input
              type="radio"
              name="calendar"
              value="lunar"
              className="accent-indigo-500"
            />
            음력
          </label>
        </fieldset>

        {/* 생년월일 입력 */}
        <div className="flex gap-2">
          <input
            name="year"
            type="number"
            placeholder="년 (예: 1990)"
            min={1900}
            max={2100}
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
          <input
            name="month"
            type="number"
            placeholder="월"
            min={1}
            max={12}
            required
            className="w-24 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
          <input
            name="day"
            type="number"
            placeholder="일"
            min={1}
            max={31}
            required
            className="w-24 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {isPending ? "분석 중..." : "내 팔자 보기"}
        </button>
      </form>

      {/* 에러 */}
      {state && !state.ok && (
        <p className="mb-6 text-center text-red-400">{state.error}</p>
      )}

      {/* 결과 */}
      {state?.ok && <ReportCard report={state.report} />}
    </main>
  );
}
