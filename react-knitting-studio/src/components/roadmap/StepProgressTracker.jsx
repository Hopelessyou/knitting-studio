import React, { useState, useEffect } from 'react';

/**
 * StepProgressTracker
 * 로그인 계정에 한하여 실시간 단수 카운터 및 단계별 체크리스트 진행률을 LocalStorage에 영구 보존하는 컴포넌트
 */
export default function StepProgressTracker({
  stepKey,
  targetRows,
  currentUser,
  onOpenAuthModal
}) {
  const isUserLoggedIn = Boolean(currentUser);
  const userId = currentUser?.id || currentUser?.email || 'guest';
  const storageKeyRow = `KNIT_ROW_${userId}_${stepKey}`;
  const storageKeyDone = `KNIT_DONE_${userId}_${stepKey}`;

  const [count, setCount] = useState(() => {
    if (!isUserLoggedIn) return 0;
    try {
      const saved = localStorage.getItem(storageKeyRow);
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const [isDone, setIsDone] = useState(() => {
    if (!isUserLoggedIn) return false;
    try {
      return localStorage.getItem(storageKeyDone) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isUserLoggedIn) {
      try {
        const saved = localStorage.getItem(storageKeyRow);
        setCount(saved ? parseInt(saved, 10) : 0);
        setIsDone(localStorage.getItem(storageKeyDone) === 'true');
      } catch (e) {}
    } else {
      setCount(0);
      setIsDone(false);
    }
  }, [userId, isUserLoggedIn, stepKey]);

  const stepVal = (delta) => {
    if (!isUserLoggedIn) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    const next = Math.max(0, count + delta);
    setCount(next);
    localStorage.setItem(storageKeyRow, String(next));
  };

  const toggleDone = () => {
    if (!isUserLoggedIn) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    const next = !isDone;
    setIsDone(next);
    localStorage.setItem(storageKeyDone, String(next));
  };

  return (
    <div className={`mt-4 p-3 rounded-2xl border transition-all ${
      isDone
        ? 'bg-emerald-500/10 border-emerald-500/30'
        : 'bg-surface-container-low border-on-surface/[0.06]'
    }`}>
      {isUserLoggedIn ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">pin</span>
              <span>실시간 단수 카운터:</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => stepVal(-1)}
                className="w-7 h-7 rounded-lg bg-white border border-on-surface/[0.1] font-bold text-sm flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all text-primary cursor-pointer shadow-2xs select-none"
                title="1단 감소"
              >
                -
              </button>
              <div className="min-w-16 px-2.5 py-0.5 rounded-lg bg-white border border-primary/20 text-center font-serif font-bold text-base text-primary shadow-2xs">
                {count}단 {targetRows ? `/ ${targetRows}단` : ''}
              </div>
              <button
                type="button"
                onClick={() => stepVal(1)}
                className="w-7 h-7 rounded-lg bg-primary text-white font-bold text-sm flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all cursor-pointer shadow-2xs select-none"
                title="1단 증가"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => stepVal(5)}
                className="px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[10px] transition-all cursor-pointer select-none"
                title="5단 추가"
              >
                +5단
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleDone}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs self-start sm:self-auto active:scale-95 ${
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
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
            <p className="text-xs text-on-surface-variant break-keep">
              <strong className="text-on-surface">로그인 전용:</strong> 뜨개질 진행 단수(`[+1단]`)와 단계별 완료 체크가 내 계정에 실시간 자동 저장됩니다.
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
        </div>
      )}
    </div>
  );
}
