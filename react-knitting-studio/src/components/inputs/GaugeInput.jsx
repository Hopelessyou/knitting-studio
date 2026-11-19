import React, { useState, useEffect } from 'react';

// 4대 국제 표준 실 굵기 프리셋 데이터
const YARN_PRESETS = [
  { id: 'fingering', name: '가는 실', en: 'Fingering', sub: '26코 · 3mm', sts: 26, rows: 34, needleMm: 3.0, needleDesc: '2.5~3.25mm' },
  { id: 'dk', name: '보통 실', en: 'DK / 워스티드', sub: '20코 · 4mm', sts: 20, rows: 28, needleMm: 4.0, needleDesc: '3.75~4.5mm' },
  { id: 'aran', name: '도톰한 실', en: 'Aran', sub: '16코 · 5mm', sts: 16, rows: 22, needleMm: 5.0, needleDesc: '4.5~5.5mm' },
  { id: 'chunky', name: '굵은 실', en: 'Chunky', sub: '12코 · 7mm', sts: 12, rows: 16, needleMm: 7.0, needleDesc: '6.0~8.0mm' },
];

// 표준 바늘 호수별 게이지 매핑 테이블
const NEEDLE_LOOKUP = {
  '2.0': { sts: 36, rows: 48, label: '레이스 (Lace)' },
  '2.5': { sts: 32, rows: 42, label: '양말 / 핑거링 (Sock)' },
  '3.0': { sts: 28, rows: 36, label: '핑거링 (Fingering)' },
  '3.25': { sts: 26, rows: 34, label: '라이트 스포츠 (Sport)' },
  '3.5': { sts: 24, rows: 32, label: '스포츠 / DK' },
  '3.75': { sts: 22, rows: 30, label: 'DK 실' },
  '4.0': { sts: 20, rows: 28, label: '보통 실 (DK / Worsted)' },
  '4.5': { sts: 18, rows: 25, label: '워스티드 (Worsted)' },
  '5.0': { sts: 16, rows: 22, label: '도톰한 실 (Aran)' },
  '5.5': { sts: 15, rows: 21, label: '헤비 아란 (Heavy Aran)' },
  '6.0': { sts: 14, rows: 19, label: '벌키 (Bulky)' },
  '6.5': { sts: 13, rows: 18, label: '벌키 (Bulky)' },
  '7.0': { sts: 12, rows: 16, label: '굵은 실 (Chunky)' },
  '8.0': { sts: 10, rows: 14, label: '초굵은 실 (Chunky/Bulky)' },
  '9.0': { sts: 9, rows: 12, label: '슈퍼 벌키 (Super Bulky)' },
  '10.0': { sts: 8, rows: 11, label: '점보 / 슈퍼 벌키' },
  '12.0': { sts: 7, rows: 9, label: '자이언트 얀 (Giant)' },
};

// 퀵 mm 선택 칩 리스트
const QUICK_NEEDLE_SIZES = [2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0, 7.0, 8.0, 10.0];

// 바늘 mm -> 코수/단수 환산
function convertNeedleToGauge(mm) {
  const key = mm.toFixed(1);
  if (NEEDLE_LOOKUP[key]) {
    return NEEDLE_LOOKUP[key];
  }
  const sts = Math.max(5, Math.min(60, Math.round(82 / mm)));
  const rows = Math.max(5, Math.min(80, Math.round(sts * 1.4)));
  return { sts, rows, label: `${mm}mm 맞춤 규격` };
}

// 코수 -> 바늘 mm 역환산
function convertStsToNeedle(sts) {
  if (!sts || sts <= 0) return 4.0;
  const mm = Math.round((82 / sts) * 10) / 10;
  return Math.max(1.5, Math.min(15.0, mm));
}

export default function GaugeInput({
  gaugeSts,
  gaugeRows,
  onStsChange,
  onRowsChange,
  ballWeight = 50,
  onBallWeightChange,
}) {
  // 1. Local string states for smooth typing & backspacing
  const [localSts, setLocalSts] = useState(String(gaugeSts));
  const [localRows, setLocalRows] = useState(String(gaugeRows));
  const [localNeedle, setLocalNeedle] = useState(() => String(convertStsToNeedle(gaugeSts)));
  const [localBallWeight, setLocalBallWeight] = useState(String(ballWeight));

  // Sync from props
  useEffect(() => {
    setLocalSts(String(gaugeSts));
    setLocalNeedle(String(convertStsToNeedle(gaugeSts)));
  }, [gaugeSts]);

  useEffect(() => {
    setLocalRows(String(gaugeRows));
  }, [gaugeRows]);

  useEffect(() => {
    setLocalBallWeight(String(ballWeight));
  }, [ballWeight]);

  // Handle Needle (실 크기 / 굵기 mm) Direct Input
  const handleNeedleChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setLocalNeedle(val);
      if (val !== '') {
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 1.5 && num <= 15.0) {
          const { sts, rows } = convertNeedleToGauge(num);
          setLocalSts(String(sts));
          setLocalRows(String(rows));
          onStsChange(sts);
          onRowsChange(rows);
        }
      }
    }
  };

  const handleNeedleBlur = () => {
    let num = parseFloat(localNeedle);
    if (isNaN(num) || num < 1.5) num = 1.5;
    if (num > 15.0) num = 15.0;
    num = Math.round(num * 10) / 10;
    setLocalNeedle(String(num));
    const { sts, rows } = convertNeedleToGauge(num);
    setLocalSts(String(sts));
    setLocalRows(String(rows));
    onStsChange(sts);
    onRowsChange(rows);
  };

  const stepNeedle = (delta) => {
    const current = parseFloat(localNeedle) || convertStsToNeedle(gaugeSts) || 4.0;
    const next = Math.max(1.5, Math.min(15.0, Math.round((current + delta) * 10) / 10));
    setLocalNeedle(String(next));
    const { sts, rows } = convertNeedleToGauge(next);
    setLocalSts(String(sts));
    setLocalRows(String(rows));
    onStsChange(sts);
    onRowsChange(rows);
  };

  const selectNeedleMm = (mm) => {
    setLocalNeedle(String(mm));
    const { sts, rows } = convertNeedleToGauge(mm);
    setLocalSts(String(sts));
    setLocalRows(String(rows));
    onStsChange(sts);
    onRowsChange(rows);
  };

  // Handle Ball Weight (실 1볼 규격 / 무게 g)
  const handleBallWeightChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      setLocalBallWeight(val);
      if (val !== '' && onBallWeightChange) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          onBallWeightChange(num);
        }
      }
    }
  };

  const handleBallWeightBlur = () => {
    let num = parseInt(localBallWeight, 10);
    if (isNaN(num) || num < 10) num = 10;
    if (num > 500) num = 500;
    setLocalBallWeight(String(num));
    if (onBallWeightChange) {
      onBallWeightChange(num);
    }
  };

  const stepBallWeight = (delta) => {
    const current = parseInt(localBallWeight, 10) || ballWeight || 50;
    const next = Math.max(10, Math.min(500, current + delta));
    setLocalBallWeight(String(next));
    if (onBallWeightChange) {
      onBallWeightChange(next);
    }
  };

  const selectBallWeight = (grams) => {
    setLocalBallWeight(String(grams));
    if (onBallWeightChange) {
      onBallWeightChange(grams);
    }
  };

  // Handle Stitches Changes
  const handleStsChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setLocalSts(val);
      if (val !== '') {
        const num = parseFloat(val);
        if (!isNaN(num) && num > 0) {
          onStsChange(num);
          setLocalNeedle(String(convertStsToNeedle(num)));
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
    setLocalNeedle(String(convertStsToNeedle(num)));
  };

  const stepSts = (delta) => {
    const current = parseFloat(localSts) || gaugeSts || 20;
    const next = Math.max(5, Math.min(60, Math.round((current + delta) * 10) / 10));
    setLocalSts(String(next));
    onStsChange(next);
    setLocalNeedle(String(convertStsToNeedle(next)));
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
    setLocalNeedle(String(preset.needleMm));
    onStsChange(preset.sts);
    onRowsChange(preset.rows);
  };

  const currentNeedleNum = parseFloat(localNeedle) || convertStsToNeedle(gaugeSts) || 4.0;
  const currentStsNum = parseFloat(localSts) || gaugeSts || 20;
  const currentRowsNum = parseFloat(localRows) || gaugeRows || 28;
  const currentBallWeightNum = parseInt(localBallWeight, 10) || ballWeight || 50;
  const displayStsPerCm = (currentStsNum / 10).toFixed(1);
  const displayRowsPerCm = (currentRowsNum / 10).toFixed(1);

  // Dynamic yarn weight detection
  let detectedCategory = '보통 실 (DK / Worsted)';

  if (currentStsNum >= 25) {
    detectedCategory = '가는 실 (Fingering / Sock)';
  } else if (currentStsNum >= 19) {
    detectedCategory = '보통 실 (DK / Worsted)';
  } else if (currentStsNum >= 15) {
    detectedCategory = '도톰한 실 (Aran / Heavy)';
  } else if (currentStsNum >= 10) {
    detectedCategory = '굵은 실 (Chunky / Bulky)';
  } else {
    detectedCategory = '극세사 굵은 실 (Super Bulky)';
  }

  // Active preset match check
  const matchedPreset = YARN_PRESETS.find(
    (p) => Math.abs(p.sts - currentStsNum) < 0.1 && Math.abs(p.rows - currentRowsNum) < 0.1
  );

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm mb-6">
      {/* 1. Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-on-surface/[0.06]">
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            STEP 1 · YARN SIZE &amp; GAUGE
          </span>
          <h3 className="text-sm sm:text-base font-bold text-on-surface whitespace-nowrap">
            실 크기 &amp; 10cm 게이지 직접 설정
          </h3>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap shrink-0">
          실시간 연동 계산
        </span>
      </div>

      {/* 2. 실 크기 (권장 바늘 호수 mm) 직접 입력 Hero Section */}
      <div className="p-3.5 sm:p-4 bg-primary/5 rounded-2xl border-2 border-primary/20 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div>
            <label className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-primary">straighten</span>
              <span>실 크기 (권장 바늘 호수) 직접 입력</span>
            </label>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              실 라벨에 표기된 <strong>바늘 굵기(mm)</strong>를 입력하시면 10cm 표준 게이지가 자동 환산됩니다.
            </p>
          </div>
          <span className="text-[11px] font-bold text-primary bg-white/80 border border-primary/20 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto shadow-2xs">
            {detectedCategory}
          </span>
        </div>

        {/* Stepper + Direct Number Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepNeedle(-0.5)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-primary/20 flex items-center justify-center font-bold text-lg hover:bg-primary/10 transition-colors shrink-0 cursor-pointer select-none text-primary shadow-2xs"
              title="0.5mm 얇게"
            >
              -
            </button>
            <div className="flex items-center justify-center gap-1 shrink-0">
              <input
                type="text"
                inputMode="decimal"
                value={localNeedle}
                onChange={handleNeedleChange}
                onBlur={handleNeedleBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className="w-20 text-center text-xl sm:text-2xl font-bold font-serif text-primary bg-white rounded-xl border-2 border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 py-1 shadow-2xs"
                placeholder="4.0"
                title="실 크기(mm)를 키보드로 직접 백스페이스하여 입력할 수 있습니다 (예: 3.5, 4.5, 6.0)"
              />
              <span className="text-xs sm:text-sm text-primary font-bold shrink-0">mm</span>
            </div>
            <button
              type="button"
              onClick={() => stepNeedle(0.5)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-primary/20 flex items-center justify-center font-bold text-lg hover:bg-primary/10 transition-colors shrink-0 cursor-pointer select-none text-primary shadow-2xs"
              title="0.5mm 굵게"
            >
              +
            </button>
          </div>

          {/* Quick Needle mm Chips */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {QUICK_NEEDLE_SIZES.map((mm) => {
              const isSelected = Math.abs(currentNeedleNum - mm) < 0.1;
              return (
                <button
                  key={mm}
                  type="button"
                  onClick={() => selectNeedleMm(mm)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-primary text-white shadow-2xs scale-105'
                      : 'bg-white/80 border border-primary/15 text-on-surface-variant hover:bg-white hover:text-primary'
                  }`}
                  title={`${mm}mm 실 크기 선택`}
                >
                  {mm}mm
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. 실 1볼 규격 (무게 g) 직접 입력 옵션 */}
      <div className="p-3 bg-surface-container-low rounded-2xl border border-on-surface/[0.06] mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
          <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">scale</span>
            <span>실 1볼 크기 (중량 g)</span>
          </label>
          <span className="text-[11px] text-on-surface-variant">
            사용하시는 실 1볼의 무게(g)에 맞춰 예상 볼 수가 자동 계산됩니다.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepBallWeight(-10)}
              className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-base hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="10g 줄이기"
            >
              -
            </button>
            <div className="flex items-center gap-1 shrink-0">
              <input
                type="text"
                inputMode="numeric"
                value={localBallWeight}
                onChange={handleBallWeightChange}
                onBlur={handleBallWeightBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className="w-16 text-center text-lg font-bold font-serif text-secondary bg-white rounded-lg border border-secondary/30 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 py-0.5 shadow-2xs"
                placeholder="50"
                title="실 1볼 무게(g)를 직접 백스페이스하여 입력할 수 있습니다"
              />
              <span className="text-xs text-on-surface-variant font-bold shrink-0">g/볼</span>
            </div>
            <button
              type="button"
              onClick={() => stepBallWeight(10)}
              className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-base hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer select-none"
              title="10g 늘리기"
            >
              +
            </button>
          </div>

          {/* Quick Ball Weight Chips */}
          <div className="flex items-center gap-1.5">
            {[
              { g: 40, label: '40g (소폭/모헤어)' },
              { g: 50, label: '50g (표준 울)' },
              { g: 100, label: '100g (대용량 벌크)' }
            ].map(({ g, label }) => {
              const isSelected = currentBallWeightNum === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => selectBallWeight(g)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer select-none border ${
                    isSelected
                      ? 'bg-secondary text-white border-secondary shadow-2xs'
                      : 'bg-surface-container border-on-surface/[0.06] text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. 10cm 스와치 게이지 직접 미세조정 (코수 & 단수) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">tune</span>
            <span>10cm 게이지 직접 미세조정 (내 편물 스와치 측정치):</span>
          </label>
          <span className="text-[10px] text-on-surface-variant font-medium">
            숫자를 키보드로 직접 백스페이스 후 입력 가능
          </span>
        </div>

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
      </div>

      {/* 5. 4대 국제 표준 실 굵기 원클릭 선택 칩 */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">fiber_manual_record</span>
            <span>4대 표준 실 굵기 프리셋:</span>
          </label>
          {matchedPreset ? (
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {matchedPreset.needleDesc}
            </span>
          ) : (
            <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              ✏️ {currentNeedleNum.toFixed(1)}mm 맞춤 세팅
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
    </div>
  );
}
