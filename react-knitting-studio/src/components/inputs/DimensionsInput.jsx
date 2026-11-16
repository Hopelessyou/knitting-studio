import React from 'react';

export default function DimensionsInput({ title, subtitle, value, min, max, step = 1, unit = 'cm', onChange, presets }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            DIMENSIONS
          </span>
          <h3 className="text-base font-bold text-on-surface">{title}</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold font-serif text-primary">{value}</span>
          <span className="text-xs text-on-surface-variant ml-1 font-semibold">{unit}</span>
        </div>
      </div>

      {subtitle && <p className="text-xs text-on-surface-variant mb-3">{subtitle}</p>}

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
        <div className="flex flex-wrap gap-2 pt-2 border-t border-on-surface/[0.04]">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onChange(p.val)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                value === p.val
                  ? 'bg-primary text-white font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {p.label} ({p.val}{unit})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
