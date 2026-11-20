import React, { useState, useEffect } from 'react';

export default function DimensionsInput({
  title,
  subtitle,
  value,
  min = 20,
  max = 200,
  step = 1,
  unit = 'cm',
  onChange,
  presets
}) {
  // Local string state to allow completely natural backspacing, clearing, and typing
  const [localVal, setLocalVal] = useState(String(value));

  useEffect(() => {
    setLocalVal(String(value));
  }, [value]);

  const handleChange = (e) => {
    const v = e.target.value;
    if (v === '' || /^\d*\.?\d*$/.test(v)) {
      setLocalVal(v);
      if (v !== '') {
        const num = parseFloat(v);
        if (!isNaN(num) && num > 0) {
          onChange(num);
        }
      }
    }
  };

  const handleBlur = () => {
    let num = parseFloat(localVal);
    if (isNaN(num) || num < min) num = min;
    if (num > max) num = max;
    num = Math.round(num * 10) / 10;
    setLocalVal(String(num));
    onChange(num);
  };

  const stepVal = (delta) => {
    const current = parseFloat(localVal) || value || min;
    const next = Math.max(min, Math.min(max, Math.round((current + delta) * 10) / 10));
    setLocalVal(String(next));
    onChange(next);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-on-surface/[0.08] shadow-sm mb-4 sm:mb-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-0.5 truncate">
              STEP 2 · DIMENSIONS
            </span>
            <h3 className="text-xs sm:text-base font-bold text-on-surface break-keep truncate">{title}</h3>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
            직접 입력
          </span>
        </div>

        {subtitle && (
          <p className="text-[11px] sm:text-xs text-on-surface-variant mb-2.5 sm:mb-3.5 break-keep line-clamp-2">{subtitle}</p>
        )}
      </div>

      <div>
        {/* Stepper + Direct Numeric Input */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 py-1.5 sm:py-2.5 mb-2.5 sm:mb-3.5 bg-surface-container-low rounded-xl sm:rounded-2xl border border-on-surface/[0.04]">
          <button
            type="button"
            onClick={() => stepVal(-step)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-on-surface/[0.1] flex items-center justify-center font-bold text-base sm:text-xl hover:bg-surface-container transition-colors shrink-0 cursor-pointer select-none text-primary shadow-2xs active:scale-95"
            title={`${step}${unit} 줄이기`}
          >
            -
          </button>
          <div className="flex items-center justify-center gap-1 shrink-0">
            <input
              type="text"
              inputMode="decimal"
              value={localVal}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              className="w-16 sm:w-24 text-center text-xl sm:text-3xl font-bold font-serif text-primary bg-white rounded-lg sm:rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 py-0.5 sm:py-1 shadow-2xs"
              placeholder={String(min)}
              title="수치를 키보드로 직접 백스페이스하여 입력할 수 있습니다"
            />
            <span className="text-xs sm:text-base text-on-surface-variant font-bold shrink-0">{unit}</span>
          </div>
          <button
            type="button"
            onClick={() => stepVal(step)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-on-surface/[0.1] flex items-center justify-center font-bold text-base sm:text-xl hover:bg-surface-container transition-colors shrink-0 cursor-pointer select-none text-primary shadow-2xs active:scale-95"
            title={`${step}${unit} 늘리기`}
          >
            +
          </button>
        </div>

        {/* Preset Chips */}
        {presets && presets.length > 0 && (
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5 pt-2 border-t border-on-surface/[0.04]">
            {presets.map((p, idx) => {
              const isSelected = Math.abs(parseFloat(localVal) - p.val) < 0.1;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setLocalVal(String(p.val));
                    onChange(p.val);
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs transition-all cursor-pointer whitespace-nowrap font-bold active:scale-95 ${
                    isSelected
                      ? 'bg-primary text-white shadow-2xs scale-105'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
