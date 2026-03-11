"use client";

import { useActionState, useRef, useEffect } from "react";
import { analyzeBirthdate, type ActionState } from "./actions";
import ReportCard from "@/components/report-card";

const initialState: ActionState = {};

export default function PaljaPage() {
  const [state, formAction, isPending] = useActionState(
    analyzeBirthdate,
    initialState
  );

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.report && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.report]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-[#110f20] to-background px-5 pb-20 pt-16">
      <div className="mx-auto max-w-[420px]">
        {/* ── Hero ── */}
        <div className="relative mb-12 text-center">
          {/* 상승장 그래프 워터마크 */}
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] select-none"
            width="280"
            height="80"
            viewBox="0 0 280 80"
            fill="none"
            style={{ opacity: 0.07 }}
          >
            <polyline
              points="0,70 30,65 55,60 80,55 100,50 115,40 135,42 155,30 175,25 195,18 215,22 235,10 260,5 280,2"
              stroke="#a78bfa"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1="55" y1="55" x2="55" y2="68" stroke="#22c55e" strokeWidth="2" />
            <line x1="115" y1="34" x2="115" y2="46" stroke="#22c55e" strokeWidth="2" />
            <line x1="175" y1="18" x2="175" y2="30" stroke="#22c55e" strokeWidth="2" />
            <line x1="235" y1="6" x2="235" y2="16" stroke="#22c55e" strokeWidth="2" />
          </svg>
          <h1 className="relative font-[family-name:var(--font-brush)] text-[46px] text-white drop-shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            팔자차트
          </h1>
          <p className="mt-3 text-[15px] leading-[1.8] text-white/60">
            당신은 존버형인가, 추격매수형인가
          </p>
          <p className="mt-1 text-[13px] text-white/30">
            사주로 보는 내 투자 팔자 테스트
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-card-light to-card p-6">
          <form action={formAction} className="space-y-5">
            <fieldset className="flex gap-1 rounded-xl bg-background/60 p-1">
              <label className="flex-1">
                <input type="radio" name="calendarType" value="solar" defaultChecked className="peer sr-only" />
                <span className="block cursor-pointer rounded-lg py-2.5 text-center text-sm font-medium text-white/35 transition-colors peer-checked:bg-card-light peer-checked:text-white">
                  양력
                </span>
              </label>
              <label className="flex-1">
                <input type="radio" name="calendarType" value="lunar" className="peer sr-only" />
                <span className="block cursor-pointer rounded-lg py-2.5 text-center text-sm font-medium text-white/35 transition-colors peer-checked:bg-card-light peer-checked:text-white">
                  음력
                </span>
              </label>
            </fieldset>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "year", label: "출생 연도", placeholder: "1990", min: 1900, max: 2100 },
                { id: "month", label: "월", placeholder: "1", min: 1, max: 12 },
                { id: "day", label: "일", placeholder: "15", min: 1, max: 31 },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="mb-1.5 block text-[11px] font-medium tracking-wider text-white/30 uppercase">
                    {f.label}
                  </label>
                  <input
                    id={f.id} name={f.id} type="number" placeholder={f.placeholder}
                    min={f.min} max={f.max} required
                    className="w-full rounded-xl bg-background/50 px-3 py-3 text-center text-sm font-medium text-white placeholder-white/15 transition-colors focus:bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit" disabled={isPending}
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/30 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
            >
              {isPending ? "분석 중..." : "내 투자 팔자 확인하기"}
            </button>
          </form>

          {state.error && (
            <div className="mt-5 rounded-xl bg-red-500/10 p-4 text-center text-sm text-red-400">
              {state.error}
            </div>
          )}
        </div>

        {!state.report && (
          <p className="mt-6 text-center text-xs leading-relaxed text-white/20">
            사주 일주 기반 투자 성향 분석<br />
            MBTI보다 정확할 수도 있습니다 (아닐 수도)
          </p>
        )}

        {state.report && (
          <div ref={resultRef} className="mt-10">
            <ReportCard report={state.report} />
          </div>
        )}
      </div>
    </main>
  );
}
