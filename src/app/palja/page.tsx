"use client";

import { useActionState } from "react";
import { getPaljaReport } from "./actions";
import { ReportCard } from "@/components/report-card";

export default function PaljaPage() {
  const [state, formAction, isPending] = useActionState(getPaljaReport, null);

  return (
    <main className="mx-auto max-w-lg px-5 py-16">
      {/* Header */}
      <header className="mb-12 text-center animate-fade-in-up">
        <div className="mb-4 inline-block">
          <span className="text-5xl">&#x262F;</span>
        </div>
        <h1 className="font-serif-kr text-4xl font-black tracking-tight text-gold-gradient mb-3">
          팔자차트
        </h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase">
          Saju Investment DNA Report
        </p>
        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
          생년월일 하나로 당신의 투자 DNA를 해독합니다
        </p>
      </header>

      {/* Form Card */}
      <form
        action={formAction}
        className="mb-12 rounded-2xl bg-surface-card border border-border-subtle p-6 glow-border animate-fade-in-up-delay-1"
      >
        {/* 양력/음력 선택 */}
        <fieldset className="flex gap-6 justify-center mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gold-300 transition-colors">
            <input
              type="radio"
              name="calendar"
              value="solar"
              defaultChecked
            />
            <span>양력</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gold-300 transition-colors">
            <input
              type="radio"
              name="calendar"
              value="lunar"
            />
            <span>음력</span>
          </label>
        </fieldset>

        {/* 생년월일 입력 */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1.5 tracking-wider">
              년 (YEAR)
            </label>
            <input
              name="year"
              type="number"
              placeholder="1990"
              min={1900}
              max={2100}
              required
              className="w-full rounded-xl border border-border-subtle bg-surface-elevated px-4 py-3 text-white text-center text-lg font-medium placeholder-gray-600 transition-all"
            />
          </div>
          <div className="w-24">
            <label className="block text-xs text-gray-500 mb-1.5 tracking-wider">
              월 (M)
            </label>
            <input
              name="month"
              type="number"
              placeholder="01"
              min={1}
              max={12}
              required
              className="w-full rounded-xl border border-border-subtle bg-surface-elevated px-4 py-3 text-white text-center text-lg font-medium placeholder-gray-600 transition-all"
            />
          </div>
          <div className="w-24">
            <label className="block text-xs text-gray-500 mb-1.5 tracking-wider">
              일 (D)
            </label>
            <input
              name="day"
              type="number"
              placeholder="15"
              min={1}
              max={31}
              required
              className="w-full rounded-xl border border-border-subtle bg-surface-elevated px-4 py-3 text-white text-center text-lg font-medium placeholder-gray-600 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 py-3.5 font-bold text-black text-lg tracking-wide transition-all hover:shadow-lg hover:shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              사주 해독 중...
            </span>
          ) : (
            "내 투자 DNA 해독하기"
          )}
        </button>
      </form>

      {/* 에러 */}
      {state && !state.ok && (
        <div className="mb-8 rounded-xl border border-red-900/50 bg-red-950/30 px-5 py-4 text-center animate-fade-in-up">
          <p className="text-red-400 text-sm">{state.error}</p>
        </div>
      )}

      {/* 결과 */}
      {state?.ok && <ReportCard report={state.report} />}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-600 animate-fade-in-up-delay-4">
        <p>본 결과는 재미로만 봐주세요. 투자 조언이 아닙니다.</p>
        <p className="mt-1 text-gray-700">
          &copy; 2025 팔자차트 &middot; 사주 기반 투자 성향 분석
        </p>
      </footer>
    </main>
  );
}
