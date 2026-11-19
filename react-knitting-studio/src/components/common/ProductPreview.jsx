import React, { useState } from 'react';

export default function ProductPreview({
  category,
  style,
  onStyleChange,
  options,
  fitBadge,
  secondaryOptions,
  secondaryValue,
  onSecondaryChange,
  secondaryLabel
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            FINISHED PRODUCT PREVIEW
          </span>
          <h3 className="text-base font-bold text-on-surface">완성 실물 미리보기 &amp; 스타일 선택</h3>
        </div>
        {fitBadge && (
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full self-start sm:self-auto">
            {fitBadge}
          </span>
        )}
      </div>

      {/* Primary Style Toggle Pills */}
      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {options.map((opt) => {
            const isSelected = style === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onStyleChange(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs scale-[1.02]'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <span className="material-symbols-outlined text-[15px]">check</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Secondary Options (e.g. Fit Selection) */}
      {secondaryOptions && secondaryOptions.length > 0 && (
        <div className="flex items-center flex-wrap gap-2 mb-4 pb-1">
          {secondaryLabel && (
            <span className="text-xs font-bold text-on-surface-variant mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">straighten</span>
              {secondaryLabel}:
            </span>
          )}
          {secondaryOptions.map((opt) => {
            const isSelected = secondaryValue === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSecondaryChange(opt.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-secondary text-white shadow-2xs'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <span className="material-symbols-outlined text-[13px]">check</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Image Preview Container */}
      <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-container border border-on-surface/[0.06]">
        <img
          key={`${category}_${style}`}
          src={`/images/${category}_${style}.jpg`}
          alt={`${category} ${style} 완성 사진`}
          className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-[1.02]"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            // Fallback preview
            e.target.src = `/images/${category}_preview.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          <p className="text-white text-xs font-medium drop-shadow-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-amber-300">verified</span>
            <span>내 치수 및 게이지가 100% 자동 적용되는 실물 완성작 모델</span>
          </p>
        </div>
      </div>
    </div>
  );
}
