import React from 'react';

export default function ResultSummaryCard({
  castOn,
  castOnLabel = '시작 코잡기 (Cast-on)',
  castOnDesc,
  specs = [],
  formula,
  ruleDesc
}) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 border-2 border-primary/30 shadow-md mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-on-surface/[0.08]">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            KEY CALCULATION RESULTS
          </span>
          <h2 className="text-xl font-bold font-serif text-on-surface">도안 핵심 수치 연산 결과</h2>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">print</span>
          <span>A4 도안 인쇄</span>
        </button>
      </div>

      {/* Cast on Hero Badge */}
      <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-secondary block mb-1">{castOnLabel}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-primary">{castOn}</span>
            <span className="text-lg font-bold text-on-surface">코</span>
          </div>
          {castOnDesc && (
            <p className="text-xs text-on-surface-variant mt-1.5">{castOnDesc}</p>
          )}
        </div>
        {formula && (
          <div className="text-right sm:border-l sm:border-primary/20 sm:pl-5">
            <span className="text-xs font-semibold text-outline block mb-0.5">배수 규칙 &amp; 산출 공식</span>
            <span className="text-xs font-bold text-on-surface">{formula}</span>
            {ruleDesc && <p className="text-xs text-on-surface-variant mt-0.5">{ruleDesc}</p>}
          </div>
        )}
      </div>

      {/* Spec Grid */}
      {specs && specs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {specs.map((item, i) => (
            <div key={i} className="p-3 bg-surface-container rounded-xl border border-on-surface/[0.04]">
              <span className="text-xs font-medium text-on-surface-variant block mb-1">{item.label}</span>
              <strong className="text-base font-bold text-on-surface">{item.value}</strong>
              {item.sub && <p className="text-xs text-outline mt-0.5">{item.sub}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
