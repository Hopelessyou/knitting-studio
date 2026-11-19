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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stitches Stepper */}
        <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.04]">
          <label className="block text-xs font-bold text-on-surface mb-1">
            가로 코수 (10cm당)
          </label>
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={() => onStsChange(Math.max(8, gaugeSts - 1))}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors"
            >
              -
            </button>
            <div className="text-center">
              <span className="text-2xl font-bold font-serif text-primary">{gaugeSts}</span>
              <span className="text-xs text-on-surface-variant ml-1 font-semibold">코</span>
            </div>
            <button
              type="button"
              onClick={() => onStsChange(gaugeSts + 1)}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant text-center mt-2">
            1cm당 약 {(gaugeSts / 10).toFixed(1)}코
          </p>
        </div>

        {/* Rows Stepper */}
        <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.04]">
          <label className="block text-xs font-bold text-on-surface mb-1">
            세로 단수 (10cm당)
          </label>
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={() => onRowsChange(Math.max(10, gaugeRows - 1))}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors"
            >
              -
            </button>
            <div className="text-center">
              <span className="text-2xl font-bold font-serif text-primary">{gaugeRows}</span>
              <span className="text-xs text-on-surface-variant ml-1 font-semibold">단</span>
            </div>
            <button
              type="button"
              onClick={() => onRowsChange(gaugeRows + 1)}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant text-center mt-2">
            1cm당 약 {(gaugeRows / 10).toFixed(1)}단
          </p>
        </div>
      </div>
    </div>
  );
}
