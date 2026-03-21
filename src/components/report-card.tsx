import type { PaljaReport } from "@/lib/types";
import { MetricCard } from "./metric-card";
import { ShareCard } from "./share-card";

interface ReportCardProps {
  report: PaljaReport;
}

/* 오행 데이터 (일주 기반 mock — 추후 실제 계산 로직으로 교체 가능) */
const OHANG_COLORS: Record<string, string> = {
  木: "#4A7C59",
  火: "#C4564A",
  土: "#B8960C",
  金: "#8A8A8A",
  水: "#3D6B8E",
};

function getOhangBalance(dayPillar: string) {
  // 천간 오행 매핑
  const cheonganOhang: Record<string, string> = {
    갑: "木", 을: "木", 병: "火", 정: "火", 무: "土",
    기: "土", 경: "金", 신: "金", 임: "水", 계: "水",
  };
  // 지지 오행 매핑
  const jijiOhang: Record<string, string> = {
    자: "水", 축: "土", 인: "木", 묘: "木", 진: "土",
    사: "火", 오: "火", 미: "土", 신: "金", 유: "金",
    술: "土", 해: "水",
  };

  const cheongan = dayPillar[0];
  const jiji = dayPillar[1];
  const primary = cheonganOhang[cheongan] || "木";
  const secondary = jijiOhang[jiji] || "水";

  // 기본 분배 + 일주 기반 가중치
  const base: Record<string, number> = { 木: 15, 火: 15, 土: 15, 金: 15, 水: 15 };
  base[primary] += 20;
  base[secondary] += 12;

  // 상생 관계 약간 보너스
  const sangSaeng: Record<string, string> = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
  if (sangSaeng[primary]) base[sangSaeng[primary]] += 5;

  // 정규화
  const total = Object.values(base).reduce((a, b) => a + b, 0);
  const result = Object.entries(base).map(([key, val]) => ({
    name: key,
    value: Math.round((val / total) * 100),
    color: OHANG_COLORS[key],
  }));

  return result;
}

/* 사주 팔자 샘플 (일주 기반 생성) */
function getSajuColumns(dayPillar: string) {
  const cheonganMap: Record<string, { hanja: string; name: string }> = {
    갑: { hanja: "甲", name: "갑목" }, 을: { hanja: "乙", name: "을목" },
    병: { hanja: "丙", name: "병화" }, 정: { hanja: "丁", name: "정화" },
    무: { hanja: "戊", name: "무토" }, 기: { hanja: "己", name: "기토" },
    경: { hanja: "庚", name: "경금" }, 신: { hanja: "辛", name: "신금" },
    임: { hanja: "壬", name: "임수" }, 계: { hanja: "癸", name: "계수" },
  };
  const jijiMap: Record<string, { hanja: string; name: string }> = {
    자: { hanja: "子", name: "자수" }, 축: { hanja: "丑", name: "축토" },
    인: { hanja: "寅", name: "인목" }, 묘: { hanja: "卯", name: "묘목" },
    진: { hanja: "辰", name: "진토" }, 사: { hanja: "巳", name: "사화" },
    오: { hanja: "午", name: "오화" }, 미: { hanja: "未", name: "미토" },
    신: { hanja: "申", name: "신금" }, 유: { hanja: "酉", name: "유금" },
    술: { hanja: "戌", name: "술토" }, 해: { hanja: "亥", name: "해수" },
  };

  const c = dayPillar[0];
  const j = dayPillar[1];
  const dc = cheonganMap[c] || { hanja: "甲", name: "갑목" };
  const dj = jijiMap[j] || { hanja: "子", name: "자수" };

  return {
    day: { cheongan: dc, jiji: dj },
  };
}

/* 투자 성향 키워드 생성 */
function getTraitTags(report: PaljaReport) {
  const tags: string[] = [];
  if (report.fomo.value >= 70) tags.push("선점 매수형");
  if (report.fomo.value < 30) tags.push("관망 선호형");
  if (report.stamina.value >= 70) tags.push("장기 존버형");
  if (report.stamina.value < 40) tags.push("단기 트레이딩형");
  if (report.leverage.value >= 70) tags.push("고위험 선호");
  if (report.leverage.value < 30) tags.push("안전 마진 중시");
  if (report.fomo.value >= 60 && report.leverage.value >= 60) tags.push("공격적 투자자");
  if (report.stamina.value >= 80 && report.leverage.value < 30) tags.push("수비적 투자자");
  return tags.slice(0, 4);
}

/* 종합 판정 생성 */
function getVerdict(report: PaljaReport) {
  const fomo = report.fomo.value;
  const stamina = report.stamina.value;
  const leverage = report.leverage.value;

  if (fomo >= 70 && leverage >= 70) {
    return {
      title: "공격적 선점 투자자,\n리스크 관리가 관건",
      body: `${report.archetype}의 강한 추진력은 남들보다 한 발 빠른 투자 판단을 가능하게 한다. 그러나 레버리지 유혹도가 높아 시장 하락기에 큰 손실을 볼 수 있다. 분산투자와 손절 라인 설정이 핵심이다.`,
    };
  }
  if (stamina >= 70 && leverage < 40) {
    return {
      title: "견고한 장기 투자자,\n복리의 마법을 아는 사람",
      body: `${report.archetype}의 인내심과 안정 지향성은 장기 복리 투자에 최적화되어 있다. 급등주에 흔들리지 않는 멘탈이 강점이다. 다만 기회를 지나치게 보수적으로 판단할 수 있으니 적정 리스크 감수도 필요하다.`,
    };
  }
  if (fomo >= 60 && stamina >= 60) {
    return {
      title: "균형잡힌 액티브 투자자,\n타이밍과 인내의 조화",
      body: `${report.archetype}은 기회를 포착하는 감각과 버틸 수 있는 체력을 동시에 갖추고 있다. 모멘텀 전략과 가치투자를 상황에 맞게 전환할 수 있는 유연함이 최대 강점이다.`,
    };
  }
  return {
    title: "분석형 신중 투자자,\n데이터가 답이다",
    body: `${report.archetype}은 감으로 투자하지 않는 타입이다. 충분한 분석과 확신이 선 뒤에야 움직인다. 이 신중함은 큰 손실을 방지하지만, 때로는 과감한 실행력도 필요하다.`,
  };
}

export function ReportCard({ report }: ReportCardProps) {
  const ohang = getOhangBalance(report.dayPillar);
  const saju = getSajuColumns(report.dayPillar);
  const traits = getTraitTags(report);
  const verdict = getVerdict(report);
  const maxOhang = Math.max(...ohang.map((o) => o.value));

  return (
    <div className="animate-fade-in-up">
      {/* ===== 프리미엄 리포트 카드 ===== */}
      <div className="rounded-2xl overflow-hidden bg-surface-card border border-border-subtle glow-border-strong">

        {/* 골드 탑 바 */}
        <div className="report-gold-bar" />

        {/* 마스트헤드 */}
        <div className="px-8 pt-8 text-center animate-fade-in-up">
          <p className="text-[9px] text-gray-600 tracking-[5px] uppercase mb-3 font-playfair">
            Investment Personality Report
          </p>
          <h2 className="font-serif-kr text-2xl font-black text-white tracking-[14px] mb-3">
            팔 자 차 트
          </h2>
          <hr className="report-double-rule mb-0" />
          <div className="flex justify-between py-2 border-b border-border-subtle">
            <span className="text-[8px] text-gray-600 tracking-[1.5px]">Vol. 01</span>
            <span className="text-[8px] text-gray-600 tracking-[1.5px]">투자성향분석</span>
            <span className="text-[8px] text-gray-600 tracking-[1.5px]">2025</span>
          </div>
        </div>

        {/* 헤드라인 */}
        <div className="px-8 pt-7 pb-6 text-center animate-fade-in-up-delay-1">
          <p className="text-[10px] text-gold-400 tracking-[3px] font-bold mb-3">
            ◈ EXCLUSIVE ANALYSIS
          </p>
          <h3 className="font-serif-kr text-[22px] font-black text-white leading-[1.5] mb-3">
            「{report.dayPillar}」일주 소유자,
            <br />
            투자 전선에 뛰어들다
          </h3>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            사주 명리학 기반 투자 성향 정밀 분석 · 60갑자 아키타입 매칭
          </p>
        </div>

        {/* 사주 팔자 테이블 */}
        <div className="mx-8 pb-6 border-t border-border-subtle pt-6 animate-fade-in-up-delay-2">
          <p className="text-[9px] text-gray-600 tracking-[4px] text-center mb-4">
            四 柱 · 日 柱 分 析
          </p>
          <div className="flex justify-center">
            <div className="rounded-xl overflow-hidden border border-border-subtle bg-surface-elevated/50 w-48">
              {/* 일주 헤더 */}
              <div className="bg-gold-400/10 text-center py-1.5 border-b border-border-subtle">
                <span className="text-[9px] text-gold-300 tracking-[2px] font-medium">
                  ▼ DAY PILLAR · 일주
                </span>
              </div>
              {/* 천간 */}
              <div className="text-center py-4 border-b border-border-subtle">
                <p className="font-serif-kr text-4xl font-black text-gold-gradient leading-none mb-1">
                  {saju.day.cheongan.hanja}
                </p>
                <p className="text-[9px] text-gray-500">{saju.day.cheongan.name}</p>
              </div>
              {/* 지지 */}
              <div className="text-center py-4">
                <p className="font-serif-kr text-4xl font-black text-gold-gradient leading-none mb-1">
                  {saju.day.jiji.hanja}
                </p>
                <p className="text-[9px] text-gray-500">{saju.day.jiji.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 오행 밸런스 */}
        <div className="mx-8 pb-6 border-t border-border-subtle pt-6 animate-fade-in-up-delay-3">
          <p className="text-[9px] text-gray-600 tracking-[4px] text-center mb-5">
            五 行 BALANCE
          </p>
          <div className="ohang-bars mb-2">
            {ohang.map((o) => (
              <div key={o.name} className="flex flex-col items-center gap-1.5 w-14">
                <span className="font-playfair text-[10px] text-gray-400 font-bold">
                  {o.value}
                </span>
                <div
                  className="w-7 rounded-t-sm overflow-hidden"
                  style={{ height: `${(o.value / maxOhang) * 56}px` }}
                >
                  <div
                    className="w-full h-full rounded-t-sm"
                    style={{ background: o.color, opacity: 0.85 }}
                  />
                </div>
                <span className="font-serif-kr text-sm font-bold text-white">{o.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 아키타입 섹션 */}
        <div className="mx-8 pb-6 border-t border-border-subtle pt-6 animate-fade-in-up-delay-4">
          <div className="flex gap-6 items-start">
            {/* 일주 대형 글자 */}
            <div className="flex-shrink-0 text-center">
              <p className="font-serif-kr text-5xl font-black text-gold-gradient leading-none mb-2">
                {report.dayPillar}
              </p>
              <p className="text-[8px] text-gray-600 tracking-[2px]">
                {saju.day.cheongan.hanja}{saju.day.jiji.hanja} · 일주
              </p>
            </div>

            {/* 아키타입 설명 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border-subtle">
                <span className="text-gold-400 text-[8px]">◆</span>
                <span className="text-gold-300 text-[11px] font-bold tracking-[2px]">
                  {report.archetype}
                </span>
              </div>
              <p className="font-serif-kr text-[13px] text-gray-400 leading-[2] break-keep">
                {report.summary}
              </p>
              {/* 성향 태그 */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {traits.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-300 bg-surface-elevated px-2.5 py-1 rounded-sm font-medium tracking-[0.5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 인용구 */}
        <div className="bg-surface-elevated/50 border-t border-b border-border-subtle px-8 py-5 text-center animate-fade-in-up-delay-4">
          <span className="font-playfair text-3xl text-gold-400/40 leading-none block mb-1">&ldquo;</span>
          <p className="font-serif-kr text-[13px] text-gray-300 leading-[1.8] italic font-semibold">
            {report.summary}
          </p>
        </div>

        {/* 투자 지표 */}
        <div className="px-8 pt-6 pb-2 animate-fade-in-up-delay-5">
          <div className="section-divider mb-6">
            <span className="text-[9px] text-gray-600 tracking-[4px] font-bold whitespace-nowrap">
              INVESTMENT METRICS
            </span>
          </div>

          <div className="space-y-5">
            <MetricCard
              title="FOMO 반응도"
              subtitle="급등주를 보면 참을 수 있는가"
              metric={report.fomo}
              colorClass="text-orange-400"
              fillClass="from-orange-600/80 to-orange-400/80"
            />
            <MetricCard
              title="장기투자 체력"
              subtitle="존버는 승리한다, 과연 버틸 수 있나"
              metric={report.stamina}
              colorClass="text-emerald-400"
              fillClass="from-emerald-600/80 to-emerald-400/80"
            />
            <MetricCard
              title="레버리지 유혹도"
              subtitle="빚투의 늪에 빠질 확률"
              metric={report.leverage}
              colorClass="text-red-400"
              fillClass="from-red-600/80 to-red-400/80"
            />
          </div>
        </div>

        {/* 종합 판정 */}
        <div className="mx-8 mt-4 pt-5 pb-6 border-t border-gold-400/20 animate-fade-in-up-delay-6">
          <p className="text-[9px] text-gold-400 tracking-[4px] font-bold mb-3">
            ◆ VERDICT
          </p>
          <h4 className="font-serif-kr text-lg font-black text-white leading-[1.5] mb-3 whitespace-pre-line">
            {verdict.title}
          </h4>
          <p className="font-serif-kr text-[12.5px] text-gray-500 leading-[2] break-keep">
            {verdict.body}
          </p>
        </div>

        {/* 푸터 */}
        <div className="mx-8 pt-3 pb-6 border-t border-border-subtle flex justify-between items-center">
          <span className="font-playfair text-[8px] text-gray-700 tracking-[2.5px] uppercase">
            Palja Chart
          </span>
          <div className="flex gap-1 items-center">
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
          </div>
          <span className="font-playfair text-[8px] text-gray-700 tracking-[2.5px] uppercase">
            All Rights Reserved
          </span>
        </div>
      </div>

      {/* ===== 바이럴 공유 카드 (리포트 카드 바깥) ===== */}
      <ShareCard report={report} />
    </div>
  );
}
