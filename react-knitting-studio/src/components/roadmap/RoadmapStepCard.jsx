import React from 'react';

export default function RoadmapStepCard({
  stepNumber,
  title,
  subtitle,
  setup,
  recipe,
  proTip,
  milestone,
  videoTitle,
  onVideoOpen
}) {
  return (
    <div className="p-5 sm:p-6 bg-surface rounded-2xl border border-on-surface/[0.08] shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-on-surface/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
            {stepNumber}
          </span>
          <div>
            <h3 className="text-base font-bold text-on-surface">{title}</h3>
            {subtitle && <p className="text-sm text-on-surface-variant mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {onVideoOpen && (
          <button
            type="button"
            onClick={onVideoOpen}
            className="px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-red-600">play_circle</span>
            <span>{videoTitle || '핵심 영상'}</span>
          </button>
        )}
      </div>

      {/* 4-Part Structured Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
        {/* 1. Setup */}
        {setup && (
          <div className="p-3 bg-surface-container-low rounded-xl border border-on-surface/[0.04]">
            <span className="font-bold text-secondary flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">settings</span>
              <span>기초 세팅 &amp; 바늘 추천</span>
            </span>
            <div className="text-on-surface-variant space-y-1">{setup}</div>
          </div>
        )}

        {/* 2. Recipe */}
        {recipe && (
          <div className="p-3 bg-surface-container-low rounded-xl border border-on-surface/[0.04]">
            <span className="font-bold text-primary flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">auto_stories</span>
              <span>상세 진행 레시피</span>
            </span>
            <div className="text-on-surface-variant space-y-1">{recipe}</div>
          </div>
        )}

        {/* 3. Pro Tip */}
        {proTip && (
          <div className="p-3 bg-surface-container-low rounded-xl border border-on-surface/[0.04]">
            <span className="font-bold text-amber-700 flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">tips_and_updates</span>
              <span>실패 없는 프로 팁</span>
            </span>
            <div className="text-on-surface-variant space-y-1">{proTip}</div>
          </div>
        )}

        {/* 4. Milestone */}
        {milestone && (
          <div className="p-3 bg-surface-container-low rounded-xl border border-on-surface/[0.04]">
            <span className="font-bold text-tertiary flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">flag</span>
              <span>다음 단계 진입 조건</span>
            </span>
            <div className="text-on-surface-variant space-y-1">{milestone}</div>
          </div>
        )}
      </div>
    </div>
  );
}
