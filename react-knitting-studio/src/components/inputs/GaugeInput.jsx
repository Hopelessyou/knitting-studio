import React from 'react';

export default function GaugeInput({ gaugeSts, gaugeRows, onStsChange, onRowsChange }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 pb-2 border-b border-on-surface/[0.06]">
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            STEP 1 · GAUGE SETTING
          </span>
          <h3 className="text-sm sm:text-base font-bold text-on-surface whitespace-nowrap">10cm 게이지 스와치 입력</h3>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap shrink-0">
          10cm × 10cm 사방
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Stitches Stepper + Direct Number Input */}
        <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.04]">
          <label className="block text-xs font-bold text-on-surface mb-1 text-center sm:text-left">
            가로 코수 (10cm당)
          </label>
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => onStsChange(Math.max(5, Math.round((gaugeSts - 1) * 10) / 10))}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1코 줄이기"
            >
              -
            </button>
            <div className="flex items-center justify-center gap-1 shrink-0">
              <input
                type="number"
                min="5"
                max="60"
                step="0.5"
                value={gaugeSts}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    onStsChange(Math.max(5, Math.min(60, val)));
                  }
                }}
                className="w-16 text-center text-xl sm:text-2xl font-bold font-serif text-primary bg-white rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 py-1 shadow-2xs"
                title="코수를 키보드로 직접 입력할 수 있습니다"
              />
              <span className="text-xs text-on-surface-variant font-bold shrink-0">코</span>
            </div>
            <button
              type="button"
              onClick={() => onStsChange(Math.min(60, Math.round((gaugeSts + 1) * 10) / 10))}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1코 늘리기"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant text-center mt-2 font-medium">
            1cm당 약 <strong className="text-primary font-bold">{(gaugeSts / 10).toFixed(1)}</strong>코
          </p>
        </div>

        {/* Rows Stepper + Direct Number Input */}
        <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.04]">
          <label className="block text-xs font-bold text-on-surface mb-1 text-center sm:text-left">
            세로 단수 (10cm당)
          </label>
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => onRowsChange(Math.max(5, Math.round((gaugeRows - 1) * 10) / 10))}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1단 줄이기"
            >
              -
            </button>
            <div className="flex items-center justify-center gap-1 shrink-0">
              <input
                type="number"
                min="5"
                max="80"
                step="0.5"
                value={gaugeRows}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    onRowsChange(Math.max(5, Math.min(80, val)));
                  }
                }}
                className="w-16 text-center text-xl sm:text-2xl font-bold font-serif text-primary bg-white rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 py-1 shadow-2xs"
                title="단수를 키보드로 직접 입력할 수 있습니다"
              />
              <span className="text-xs text-on-surface-variant font-bold shrink-0">단</span>
            </div>
            <button
              type="button"
              onClick={() => onRowsChange(Math.min(80, Math.round((gaugeRows + 1) * 10) / 10))}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1단 늘리기"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant text-center mt-2 font-medium">
            1cm당 약 <strong className="text-primary font-bold">{(gaugeRows / 10).toFixed(1)}</strong>단
          </p>
        </div>
      </div>
    </div>
  );
}
