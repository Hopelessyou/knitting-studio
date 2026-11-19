import React, { useState, useEffect } from 'react';

// 4대 국제 표준 실 굵기 프리셋 데이터
const YARN_PRESETS = [
  { id: 'fingering', name: '가는 실', en: 'Fingering', sub: '26코 · 3mm', sts: 26, rows: 34, needle: '2.5~3.25mm' },
  { id: 'dk', name: '보통 실', en: 'DK / 워스티드', sub: '20코 · 4mm', sts: 20, rows: 28, needle: '3.75~4.5mm' },
  { id: 'aran', name: '도톰한 실', en: 'Aran', sub: '16코 · 5mm', sts: 16, rows: 22, needle: '4.5~5.5mm' },
  { id: 'chunky', name: '굵은 실', en: 'Chunky', sub: '12코 · 7mm', sts: 12, rows: 16, needle: '6.0~8.0mm' },
];

export default function GaugeInput({ gaugeSts, gaugeRows, onStsChange, onRowsChange }) {
  // Local string state to allow completely natural backspacing, clearing, and typing
  const [localSts, setLocalSts] = useState(String(gaugeSts));
  const [localRows, setLocalRows] = useState(String(gaugeRows));

  useEffect(() => {
    setLocalSts(String(gaugeSts));
  }, [gaugeSts]);

  useEffect(() => {
    setLocalRows(String(gaugeRows));
  }, [gaugeRows]);

  // Handle Stitches Changes
  const handleStsChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setLocalSts(val);
      if (val !== '') {
        const num = parseFloat(val);
        if (!isNaN(num) && num > 0) {
          onStsChange(num);
        }
      }
    }
  };

  const handleStsBlur = () => {
    let num = parseFloat(localSts);
    if (isNaN(num) || num < 5) num = 5;
    if (num > 60) num = 60;
    setLocalSts(String(num));
    onStsChange(num);
  };

  const stepSts = (delta) => {
    const current = parseFloat(localSts) || gaugeSts || 20;
    const next = Math.max(5, Math.min(60, Math.round((current + delta) * 10) / 10));
    setLocalSts(String(next));
    onStsChange(next);
  };

  // Handle Rows Changes
  const handleRowsChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setLocalRows(val);
      if (val !== '') {
        const num = parseFloat(val);
        if (!isNaN(num) && num > 0) {
          onRowsChange(num);
        }
      }
    }
  };

  const handleRowsBlur = () => {
    let num = parseFloat(localRows);
    if (isNaN(num) || num < 5) num = 5;
    if (num > 80) num = 80;
    setLocalRows(String(num));
    onRowsChange(num);
  };

  const stepRows = (delta) => {
    const current = parseFloat(localRows) || gaugeRows || 28;
    const next = Math.max(5, Math.min(80, Math.round((current + delta) * 10) / 10));
    setLocalRows(String(next));
    onRowsChange(next);
  };

  // Select Preset Handler
  const handleSelectPreset = (preset) => {
    setLocalSts(String(preset.sts));
    setLocalRows(String(preset.rows));
    onStsChange(preset.sts);
    onRowsChange(preset.rows);
  };

  const currentStsNum = parseFloat(localSts) || gaugeSts || 20;
  const currentRowsNum = parseFloat(localRows) || gaugeRows || 28;
  const displayStsPerCm = (currentStsNum / 10).toFixed(1);
  const displayRowsPerCm = (currentRowsNum / 10).toFixed(1);

  // Dynamic yarn weight and recommended needle detection
  let detectedCategory = '보통 실 (DK / Worsted)';
  let recommendedNeedle = '3.75 ~ 4.5mm';

  if (currentStsNum >= 25) {
    detectedCategory = '가는 실 (Fingering / Sock)';
    recommendedNeedle = '2.5 ~ 3.25mm';
  } else if (currentStsNum >= 19) {
    detectedCategory = '보통 실 (DK / Worsted)';
    recommendedNeedle = '3.75 ~ 4.5mm';
  } else if (currentStsNum >= 15) {
    detectedCategory = '도톰한 실 (Aran / Heavy)';
    recommendedNeedle = '4.5 ~ 5.5mm';
  } else if (currentStsNum >= 10) {
    detectedCategory = '굵은 실 (Chunky / Bulky)';
    recommendedNeedle = '6.0 ~ 8.0mm';
  } else {
    detectedCategory = '극세사 굵은 실 (Super Bulky)';
    recommendedNeedle = '8.0 ~ 12.0mm';
  }

  // Active preset match check
  const matchedPreset = YARN_PRESETS.find(
    (p) => Math.abs(p.sts - currentStsNum) < 0.1 && Math.abs(p.rows - currentRowsNum) < 0.1
  );

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      {/* 1. Header */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-on-surface/[0.06]">
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            STEP 1 · GAUGE &amp; YARN WEIGHT
          </span>
          <h3 className="text-sm sm:text-base font-bold text-on-surface whitespace-nowrap">
            실 굵기 선택 &amp; 10cm 게이지 입력
          </h3>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap shrink-0">
          10cm × 10cm 사방
        </span>
      </div>

      {/* 2. Yarn Weight Quick Presets (원클릭 실 굵기 선택 칩) */}
      <div className="mb-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">fiber_manual_record</span>
            <span>실 굵기 원클릭 선택:</span>
          </label>
          {matchedPreset ? (
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {matchedPreset.needle} 권장
            </span>
          ) : (
            <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              ✏️ 직접 입력 맞춤 게이지
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {YARN_PRESETS.map((p) => {
            const isSelected = matchedPreset?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={(e) => { handleSelectPreset(p); e.currentTarget.blur(); }}
                className={`p-2 rounded-xl text-left transition-all border cursor-pointer select-none ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-2xs scale-[1.02]'
                    : 'bg-surface-container-low border-on-surface/[0.06] text-on-surface hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs">
                  <span className="font-bold text-xs">{p.name}</span>
                  {isSelected && <span className="material-symbols-outlined text-[13px]">check</span>}
                </div>
                <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                  {p.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Stepper + Direct Typing Numeric Inputs (직접 입력 창) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* 가로 코수 */}
        <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.04]">
          <label className="block text-xs font-bold text-on-surface mb-1 text-center sm:text-left">
            가로 코수 (10cm당)
          </label>
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => stepSts(-1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1코 줄이기"
            >
              -
            </button>
            <div className="flex items-center justify-center gap-1 shrink-0">
              <input
                type="text"
                inputMode="decimal"
                value={localSts}
                onChange={handleStsChange}
                onBlur={handleStsBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className="w-16 text-center text-xl sm:text-2xl font-bold font-serif text-primary bg-white rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 py-1 shadow-2xs"
                placeholder="20"
                title="코수를 키보드로 직접 백스페이스하여 입력할 수 있습니다"
              />
              <span className="text-xs text-on-surface-variant font-bold shrink-0">코</span>
            </div>
            <button
              type="button"
              onClick={() => stepSts(1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1코 늘리기"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant text-center mt-2 font-medium">
            1cm당 약 <strong className="text-primary font-bold">{displayStsPerCm}</strong>코
          </p>
        </div>

        {/* 세로 단수 */}
        <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.04]">
          <label className="block text-xs font-bold text-on-surface mb-1 text-center sm:text-left">
            세로 단수 (10cm당)
          </label>
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => stepRows(-1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1단 줄이기"
            >
              -
            </button>
            <div className="flex items-center justify-center gap-1 shrink-0">
              <input
                type="text"
                inputMode="decimal"
                value={localRows}
                onChange={handleRowsChange}
                onBlur={handleRowsBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className="w-16 text-center text-xl sm:text-2xl font-bold font-serif text-primary bg-white rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 py-1 shadow-2xs"
                placeholder="28"
                title="단수를 키보드로 직접 백스페이스하여 입력할 수 있습니다"
              />
              <span className="text-xs text-on-surface-variant font-bold shrink-0">단</span>
            </div>
            <button
              type="button"
              onClick={() => stepRows(1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="1단 늘리기"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant text-center mt-2 font-medium">
            1cm당 약 <strong className="text-primary font-bold">{displayRowsPerCm}</strong>단
          </p>
        </div>
      </div>

      {/* 4. Real-time Yarn Weight & Needle Recommendation Guide Banner */}
      <div className="mt-3 p-2.5 bg-surface-container-low rounded-xl border border-on-surface/[0.06] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="material-symbols-outlined text-[17px] text-primary shrink-0">lightbulb</span>
          <span className="text-on-surface font-semibold truncate">
            판정: <strong className="text-primary font-bold">{detectedCategory}</strong>
          </span>
        </div>
        <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full shrink-0">
          권장 바늘: {recommendedNeedle}
        </span>
      </div>
    </div>
  );
}
