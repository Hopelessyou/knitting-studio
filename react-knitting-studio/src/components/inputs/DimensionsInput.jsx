import React from 'react';

export default function DimensionsInput({ title, subtitle, value, min, max, step = 1, unit = 'cm', onChange, presets }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-wider block mb-0.5">
            DIMENSIONS
          </span>
          <h3 className="text-sm sm:text-base font-bold text-on-surface break-keep">{title}</h3>
        </div>
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-bold font-serif text-primary">{value}</span>
          <span className="text-xs text-on-surface-variant ml-1 font-semibold">{unit}</span>
        </div>
      </div>

      {subtitle && <p className="text-xs sm:text-sm text-on-surface-variant mb-3 break-keep">{subtitle}</p>}

      {/* Range Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer mb-3"
      />

      {/* Preset Chips */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-on-surface/[0.04]">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(p.val)}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap font-bold ${
                value === p.val
                  ? '!bg-primary !text-white shadow-2xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
