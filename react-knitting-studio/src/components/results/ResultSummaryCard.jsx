import React from 'react';

export default function ResultSummaryCard({
  castOn,
  castOnLabel = '시작 코잡기 (Cast-on)',
  castOnDesc,
  specs = [],
  formula,
  ruleDesc,
  isAdmin
}) {
  const userIsAdmin = isAdmin !== undefined ? isAdmin : (() => {
    try {
      const local = localStorage.getItem('KNIT_ACTIVE_USER');
      if (local) {
        const u = JSON.parse(local);
        return u?.user_metadata?.role === 'admin' || u?.user_metadata?.is_admin === true || u?.email === 'admin@knitting-studio.com' || u?.email === 'admin';
      }
    } catch (e) {}
    return false;
  })();

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-primary/30 shadow-md mb-6 sm:mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-on-surface/[0.08]">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider block mb-0.5 sm:mb-1">
            KEY CALCULATION RESULTS
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-on-surface break-keep">도안 핵심 수치 연산 결과</h2>
        </div>
        {userIsAdmin && (
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer whitespace-nowrap"
            title="관리자 전용 A4 도안 인쇄"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>A4 도안 인쇄</span>
          </button>
        )}
      </div>

      {/* Cast on Hero Badge */}
      <div className="p-4 sm:p-5 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/20 mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-bold text-secondary block mb-0.5 sm:mb-1">{castOnLabel}</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-3xl sm:text-5xl font-serif font-bold text-primary">{castOn}</span>
            <span className="text-base sm:text-lg font-bold text-on-surface">코</span>
          </div>
          {castOnDesc && (
            <p className="text-xs text-on-surface-variant mt-1 break-keep">{castOnDesc}</p>
          )}
        </div>
        {formula && (
          <div className="w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 sm:border-l border-primary/20 pt-2.5 sm:pt-0 sm:pl-5">
            <span className="text-[11px] sm:text-xs font-semibold text-outline block mb-0.5">배수 규칙 &amp; 산출 공식</span>
            <span className="text-xs sm:text-sm font-bold text-on-surface break-keep">{formula}</span>
            {ruleDesc && <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5 break-keep">{ruleDesc}</p>}
          </div>
        )}
      </div>

      {/* Spec Grid */}
      {specs && specs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
          {specs.map((item, i) => (
            <div key={i} className="p-2.5 sm:p-3 bg-surface-container rounded-lg sm:rounded-xl border border-on-surface/[0.04]">
              <span className="text-[11px] sm:text-xs font-semibold text-on-surface-variant block mb-0.5 sm:mb-1 break-keep">{item.label}</span>
              <strong className="text-sm sm:text-base font-bold text-on-surface break-keep">{item.value}</strong>
              {item.sub && <p className="text-[10px] sm:text-xs text-outline mt-0.5 break-keep">{item.sub}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
