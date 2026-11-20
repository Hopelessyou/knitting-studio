import React from 'react';

export default function ResultSummaryCard({
  castOn,
  castOnLabel = '시작 코잡기 (Cast-on)',
  castOnDesc,
  bodySts,
  bodyStsLabel = '완성 몸통 총 코수',
  bodyStsDesc,
  yarnBalls,
  yarnMeters,
  specs = [],
  formula,
  ruleDesc,
  isAdmin,
  isPrintAllowed
}) {
  const canPrint = isPrintAllowed !== undefined ? isPrintAllowed : (
    isAdmin !== undefined ? isAdmin : (() => {
      try {
        const local = localStorage.getItem('KNIT_ACTIVE_USER');
        if (local) {
          const u = JSON.parse(local);
          return u?.user_metadata?.role === 'admin' || u?.user_metadata?.is_admin === true || u?.email === 'admin@knitting-studio.com' || u?.email === 'admin';
        }
      } catch (e) {}
      return false;
    })()
  );

  // Fallback for yarn balls from specs if not directly passed
  const displayYarn = yarnBalls || (specs.find(s => s.label.includes('실'))?.value || '');

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-primary/30 shadow-md mb-6 sm:mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-on-surface/[0.08]">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider block mb-0.5 sm:mb-1">
            KEY CALCULATION RESULTS
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-on-surface break-keep">도안 핵심 수치 자동 연산 결과</h2>
        </div>
        {canPrint && (
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer whitespace-nowrap active:scale-95"
            title="A4 규격 도안 인쇄"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>A4 도안 인쇄</span>
          </button>
        )}
      </div>

      {/* 3-Column Golden Hero Badges: 시작 코잡기 · 완성 몸통 코수 · 총 소요 실량 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
        {/* 1. 시작 코잡기 */}
        <div className="p-3.5 sm:p-4 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/20 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-primary block mb-0.5 sm:mb-1">{castOnLabel}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-primary">{castOn}</span>
              <span className="text-base sm:text-lg font-bold text-on-surface">코</span>
            </div>
          </div>
          {castOnDesc && (
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-2 break-keep">{castOnDesc}</p>
          )}
        </div>

        {/* 2. 완성 몸통 코수 */}
        <div className="p-3.5 sm:p-4 bg-secondary/5 rounded-xl sm:rounded-2xl border border-secondary/20 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-secondary block mb-0.5 sm:mb-1">{bodyStsLabel}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-secondary">{bodySts || castOn}</span>
              <span className="text-base sm:text-lg font-bold text-on-surface">코</span>
            </div>
          </div>
          {bodyStsDesc && (
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-2 break-keep">{bodyStsDesc}</p>
          )}
        </div>

        {/* 3. 총 예상 실 소요량 (Hero 위계 격상) */}
        <div className="p-3.5 sm:p-4 bg-amber-500/5 rounded-xl sm:rounded-2xl border border-amber-500/25 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-800 block mb-0.5 sm:mb-1">예상 실 소요량</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-serif font-bold text-amber-900 break-keep">
                {displayYarn || '실량 연산 중'}
              </span>
            </div>
          </div>
          {yarnMeters ? (
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 mt-2">
              <span className="material-symbols-outlined text-[13px]">straighten</span>
              <span>총 길이: {yarnMeters}</span>
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-2 break-keep">여유분 1볼/콘 포함 권장</p>
          )}
        </div>
      </div>

      {/* Formula & Rule Description Strip */}
      {formula && (
        <div className="p-3 bg-surface-container-low rounded-xl border border-on-surface/[0.06] mb-4 sm:mb-5 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <span className="font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span>배수 규칙 &amp; 산출 공식:</span>
            </span>
            <span className="font-bold text-on-surface break-keep">{formula}</span>
          </div>
          {ruleDesc && (
            <p className="text-[11px] text-on-surface-variant mt-1 break-keep">{ruleDesc}</p>
          )}
        </div>
      )}

      {/* 4-Spec Grid */}
      {specs && specs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center mb-4">
          {specs.map((item, i) => (
            <div key={i} className="p-2.5 sm:p-3 bg-surface-container rounded-lg sm:rounded-xl border border-on-surface/[0.04]">
              <span className="text-[11px] sm:text-xs font-semibold text-on-surface-variant block mb-0.5 sm:mb-1 break-keep">{item.label}</span>
              <strong className="text-sm sm:text-base font-bold text-on-surface break-keep">{item.value}</strong>
              {item.sub && <p className="text-[10px] sm:text-xs text-outline mt-0.5 break-keep">{item.sub}</p>}
            </div>
          ))}
        </div>
      )}

      {/* 3.b: CPA 맞춤 실 추천 & 최저가 검색 제휴 슬롯 */}
      <div className="p-3 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-xl border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-on-surface">도안 규격 맞춤 실 최저가 찾기</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-800">CPA 제휴</span>
            </div>
            <p className="text-[11px] text-on-surface-variant break-keep mt-0.5">
              {yarnMeters ? `총 소요 길이 약 ${yarnMeters} · ` : ''}해당 게이지 맞춤 추천 콘사 및 울실 최저가 비교
            </p>
          </div>
        </div>
        <a
          href="https://search.shopping.naver.com/search/all?query=%EB%9C%A8%EA%B0%9C%EC%8B%A4+%EC%BD%98%EC%82%AC"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer self-start sm:self-auto active:scale-95"
          title="네이버 쇼핑 맞춤 콘사 최저가 검색창 새창 열기"
        >
          <span>맞춤 실 최저가 비교</span>
          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
