import React, { useState } from 'react';

export default function ProductPreview({
  category = 'sweater',
  style = 'crew',
  options = [],
  onStyleChange,
  fitBadge = null,
  secondaryOptions = null,
  secondaryValue = null,
  onSecondaryChange = null,
  secondaryLabel = '핏 선택',
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            FINISHED PRODUCT PREVIEW
          </span>
          <h3 className="text-sm sm:text-base font-bold text-on-surface break-keep">완성 실물 미리보기 &amp; 스타일 선택</h3>
        </div>
        {fitBadge && (
          <span className="text-[11px] sm:text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start sm:self-auto break-keep">
            {fitBadge}
          </span>
        )}
      </div>

      {/* Primary Style Toggle: 모바일에서는 3열 그리드로 깔끔하게 정렬 */}
      {options && options.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2 mb-3">
          {options.map((opt) => {
            const isSelected = style === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onStyleChange(opt.id)}
                className={`px-2 py-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs text-center break-keep ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs scale-[1.02]'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="hidden sm:inline">{opt.fullLabel || opt.label}</span>
                <span className="sm:hidden">{opt.label}</span>
                {isSelected && <span className="material-symbols-outlined text-[14px] shrink-0">check</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Secondary Options (e.g. Fit Selection) */}
      {secondaryOptions && secondaryOptions.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 pb-1">
          {secondaryLabel && (
            <span className="text-xs font-bold text-on-surface-variant mr-1 flex items-center gap-1 shrink-0">
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
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 border ${
                  isSelected
                    ? 'bg-secondary text-white border-secondary shadow-2xs'
                    : 'bg-surface-container border-on-surface/[0.08] text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="hidden sm:inline">{opt.fullLabel || opt.label}</span>
                <span className="sm:hidden">{opt.label}</span>
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
            <span>내 치수 및 게이지가 100% 자동 적용되는 실물 완성형 모델</span>
          </p>
        </div>
      </div>
    </div>
  );
}
