import React, { useState, useEffect } from 'react';

export default function RoadmapStepCard({
  stepNumber,
  stepId,
  title,
  subtitle,
  setup,
  recipe,
  proTip,
  milestone,
  videoTitle,
  onVideoOpen,
  currentUser,
  onOpenAuthModal
}) {
  const effectiveStepId = stepId || `step_${stepNumber}`;
  const userId = currentUser?.id || currentUser?.email || 'guest';
  const isUserLoggedIn = Boolean(currentUser);

  const [rowCount, setRowCount] = useState(() => {
    try {
      if (isUserLoggedIn) {
        const saved = localStorage.getItem(`KNIT_PROGRESS_${userId}_${effectiveStepId}_row`);
        return saved !== null ? parseInt(saved, 10) : 0;
      }
    } catch (e) {}
    return 0;
  });

  const [isDone, setIsDone] = useState(() => {
    try {
      if (isUserLoggedIn) {
        return localStorage.getItem(`KNIT_PROGRESS_${userId}_${effectiveStepId}_done`) === 'true';
      }
    } catch (e) {}
    return false;
  });

  useEffect(() => {
    if (isUserLoggedIn) {
      try {
        const saved = localStorage.getItem(`KNIT_PROGRESS_${userId}_${effectiveStepId}_row`);
        setRowCount(saved !== null ? parseInt(saved, 10) : 0);
        setIsDone(localStorage.getItem(`KNIT_PROGRESS_${userId}_${effectiveStepId}_done`) === 'true');
      } catch (e) {}
    } else {
      setRowCount(0);
      setIsDone(false);
    }
  }, [userId, isUserLoggedIn, effectiveStepId]);

  const handleStepRow = (delta) => {
    if (!isUserLoggedIn) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    const next = Math.max(0, rowCount + delta);
    setRowCount(next);
    localStorage.setItem(`KNIT_PROGRESS_${userId}_${effectiveStepId}_row`, String(next));
  };

  const handleToggleDone = () => {
    if (!isUserLoggedIn) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    const next = !isDone;
    setIsDone(next);
    localStorage.setItem(`KNIT_PROGRESS_${userId}_${effectiveStepId}_done`, String(next));
  };

  return (
    <div className={`p-5 sm:p-6 bg-surface rounded-2xl border transition-all shadow-sm ${
      isDone ? 'border-emerald-500/40 bg-emerald-500/[0.02]' : 'border-on-surface/[0.08]'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-on-surface/[0.06]">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center shrink-0 ${
            isDone ? 'bg-emerald-600 text-white' : 'bg-primary text-white'
          }`}>
            {isDone ? '✓' : stepNumber}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-on-surface">{title}</h3>
              {isDone && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-800">
                  완료됨
                </span>
              )}
            </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed mb-4">
        {/* 1. Setup */}
        {setup && (
          <div className="p-3 bg-surface-container-low rounded-xl border border-on-surface/[0.04]">
            <span className="font-bold text-secondary flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">settings</span>
              <span>기초 셋팅 &amp; 바늘 추천</span>
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

      {/* 3.c: 로그인 계정 한정 실시간 단수 카운터 & 체크리스트 진행률 유지 바 */}
      <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
        isDone
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : 'bg-surface-container-low border-on-surface/[0.06]'
      }`}>
        {isUserLoggedIn ? (
          <>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">pin</span>
                <span>실시간 단수 카운터:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStepRow(-1)}
                  className="w-7 h-7 rounded-lg bg-white border border-on-surface/[0.1] font-bold text-sm flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all text-primary cursor-pointer shadow-2xs select-none"
                  title="1단 감소"
                >
                  -
                </button>
                <div className="min-w-14 px-2 py-0.5 rounded-lg bg-white border border-primary/20 text-center font-serif font-bold text-base text-primary">
                  {rowCount}단
                </div>
                <button
                  type="button"
                  onClick={() => handleStepRow(1)}
                  className="w-7 h-7 rounded-lg bg-primary text-white font-bold text-sm flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all cursor-pointer shadow-2xs select-none"
                  title="1단 증가"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => handleStepRow(5)}
                  className="px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[10px] transition-all cursor-pointer select-none"
                  title="5단 추가"
                >
                  +5단
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleDone}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs self-start sm:self-auto active:scale-95 ${
                isDone
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isDone ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span>{isDone ? '단계 완료됨 (체크 해제)' : '이 단계 완료 체크'}</span>
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
              <p className="text-xs text-on-surface-variant break-keep">
                로그인 시 실시간 단수 카운터(`[+1단]`)와 단계별 완료 체크가 내 계정에 자동 저장됩니다.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">login</span>
              <span>로그인하고 단수 기록</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
