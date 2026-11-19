import React, { useState } from 'react';
import useCustomPatternCalc from '../hooks/useCustomPatternCalc';
import CustomPatternPreview from '../components/custom/CustomPatternPreview';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';

export default function CustomStudioPage({ isAdmin, onOpenVideo }) {
  // 1. Core State
  const [gaugeSts, setGaugeSts] = useState(20);
  const [gaugeRows, setGaugeRows] = useState(28);
  const [chestBase, setChestBase] = useState(95);

  // 2. Custom Modules State
  const [shoulderType, setShoulderType] = useState('drop'); // 'drop' | 'raglan'
  const [lengthType, setLengthType] = useState('regular');  // 'crop' | 'regular' | 'long'
  const [fitType, setFitType] = useState('regular');        // 'slim' | 'regular' | 'oversized'
  const [patternType, setPatternType] = useState('cable');  // 'plain' | 'cable' | 'moss' | 'stripe'

  // 3. Parametric Calculations Hook
  const calc = useCustomPatternCalc({
    gaugeSts,
    gaugeRows,
    chestBase,
    shoulderType,
    lengthType,
    fitType,
    patternType
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Page Hero Header */}
      <div className="mb-6 pb-4 border-b border-on-surface/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              PARAMETRIC KNITTING STUDIO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-on-surface">
            커스텀 도안 제작 스튜디오
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 break-keep">
            어깨 구조, 실루엣 기장, 텍스처 패턴을 자유롭게 조립하여 내 몸에 100% 딱 맞는 1:1 맞춤 편물 도안을 즉시 생성합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="A4 맞춤 도안 인쇄 또는 PDF 저장"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>A4 도안 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Modular Custom Controls (lg:col-span-5) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Module 1: 어깨 구조 선택 */}
          <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                MODULE 1 · 어깨 &amp; 소매 구조
              </span>
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                {shoulderType === 'drop' ? '초보 강력 추천' : '클래식 유선형'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShoulderType('drop')}
                className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                  shoulderType === 'drop'
                    ? 'bg-primary/10 border-primary text-primary shadow-xs'
                    : 'bg-surface-container-low border-transparent text-on-surface hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm mb-1">
                  <span>👔 드롭숄더</span>
                  {shoulderType === 'drop' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </div>
                <p className="text-[11px] text-on-surface-variant break-keep">
                  어깨선이 툭 떨어지는 박스핏. 앞·뒤 직사각형 편물로 뜨기 쉬움.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setShoulderType('raglan')}
                className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                  shoulderType === 'raglan'
                    ? 'bg-primary/10 border-primary text-primary shadow-xs'
                    : 'bg-surface-container-low border-transparent text-on-surface hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm mb-1">
                  <span>👕 레글런</span>
                  {shoulderType === 'raglan' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </div>
                <p className="text-[11px] text-on-surface-variant break-keep">
                  목에서 겨드랑이로 4갈래 사선 늘림. 부드러운 유선형 어깨핏.
                </p>
              </button>
            </div>
          </div>

          {/* Module 2: 실루엣 기장 & 여유분 핏 */}
          <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2">
              MODULE 2 · 실루엣 기장 &amp; 품 여유분
            </span>

            {/* 기장 선택 */}
            <div className="mb-3">
              <label className="text-xs font-bold text-on-surface block mb-1.5">
                총장 실루엣:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { id: 'crop', label: '✂️ 크롭 (~46cm)', sub: '배꼽선 매칭' },
                  { id: 'regular', label: '📏 스탠다드 (58cm)', sub: '골반선 기본' },
                  { id: 'long', label: '🧥 롱 오버 (70cm)', sub: '힙 푹 덮음' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLengthType(item.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      lengthType === item.id
                        ? 'bg-secondary text-white border-secondary shadow-xs'
                        : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="block text-[10px] opacity-80 font-normal mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 품 여유분 선택 */}
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1.5">
                품 여유분 (Ease):
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { id: 'slim', label: '슬림 (+5cm)', desc: '단정한 핏' },
                  { id: 'regular', label: '레귤러 (+10cm)', desc: '기본 여유' },
                  { id: 'oversized', label: '오버핏 (+18cm)', desc: '루즈핏' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFitType(item.id)}
                    className={`py-1.5 px-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      fitType === item.id
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module 3: 편물 무늬 & 패턴 */}
          <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-on-surface/[0.08] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                MODULE 3 · 텍스처 무늬 &amp; 패턴
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                배수 자동 스냅
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'cable', label: '🥨 8코 꽈배기', desc: '앞뒤판 대칭 케이블 꼬임' },
                { id: 'moss', label: '🌾 더블 멍석', desc: '겉2안2 오돌토돌 텍스처' },
                { id: 'stripe', label: '🦓 투톤 스트라이프', desc: '8단 교차 배색 (총 16단)' },
                { id: 'plain', label: '🧶 기본 메리야스', desc: '매끈한 겉뜨기 플레인 편물' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPatternType(item.id)}
                  className={`p-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                    patternType === item.id
                      ? 'bg-primary/10 border-primary text-primary shadow-xs'
                      : 'bg-surface-container-low border-transparent text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs mb-0.5">
                    <span>{item.label}</span>
                    {patternType === item.id && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </div>
                  <p className="text-[10px] text-on-surface-variant truncate">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Module 4: 실측 치수 & 게이지 */}
          <GaugeInput
            gaugeSts={gaugeSts}
            gaugeRows={gaugeRows}
            onStsChange={setGaugeSts}
            onRowsChange={setGaugeRows}
          />

          <DimensionsInput
            title="내 가슴둘레 실측 (cm)"
            subtitle="실제 가슴둘레를 입력하시면 선택하신 여유분이 자동 합산됩니다."
            value={chestBase}
            min={75}
            max={130}
            onChange={setChestBase}
            presets={[
              { label: 'S (85)', val: 85 },
              { label: 'M (95)', val: 95 },
              { label: 'L (105)', val: 105 },
              { label: 'XL (115)', val: 115 }
            ]}
          />
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Real-time Visualizer & Blueprint (lg:col-span-7) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Real-time 2D Interactive Blueprint */}
          <CustomPatternPreview calc={calc} />

          {/* 2. Key Calculation Summary Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border-2 border-primary/30 shadow-md">
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider block mb-1">
              CUSTOM SPEC SUMMARY
            </span>
            <h3 className="text-lg font-bold font-serif text-on-surface mb-4">
              맞춤 도안 핵심 수치 연산 결과
            </h3>

            {/* Dual Hero Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <span className="text-xs font-bold text-secondary block mb-1">
                  {calc.shoulderType === 'drop' ? '뒷판 시작 코잡기 (평면)' : '목둘레 시작 코잡기 (원형)'}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-serif font-bold text-primary">
                    {calc.shoulderType === 'drop' ? calc.backCastOnSts : calc.neckCastOn}
                  </span>
                  <span className="text-base font-bold text-on-surface">코</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  {calc.shoulderType === 'drop'
                    ? `어깨너비 약 ${calc.shoulderWidthCm}cm 기준 직사각형 시작`
                    : `목둘레 약 ${calc.neckCm}cm 기준`}
                </p>
              </div>

              <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20">
                <span className="text-xs font-bold text-secondary block mb-1">
                  완성 몸통 총 코수 ({calc.patternName.split(' ')[0]} 보정)
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-serif font-bold text-secondary">{calc.totalBodySts}</span>
                  <span className="text-base font-bold text-on-surface">코</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  앞·뒤판 각 {calc.halfBodySts}코 ({calc.halfBodySts / calc.patternMultiple}세트) · 둘레 {calc.actualChestCm}cm
                </p>
              </div>
            </div>

            {/* 4 Spec Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="text-[11px] text-on-surface-variant block mb-0.5">진동 깊이</span>
                <strong className="text-sm font-bold text-on-surface">{calc.armholeDepthCm}cm</strong>
                <p className="text-[10px] text-outline mt-0.5">{calc.armholeRows}단 직진</p>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="text-[11px] text-on-surface-variant block mb-0.5">완성 총장</span>
                <strong className="text-sm font-bold text-on-surface">{calc.totalLengthCm}cm</strong>
                <p className="text-[10px] text-outline mt-0.5">{calc.totalRows}단 ({calc.lengthLabel.split(' ')[0]})</p>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="text-[11px] text-on-surface-variant block mb-0.5">소매 분리</span>
                <strong className="text-sm font-bold text-on-surface">{calc.sleevePickSts}코</strong>
                <p className="text-[10px] text-outline mt-0.5">손목 {calc.wristSts}코 마감</p>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl">
                <span className="text-[11px] text-on-surface-variant block mb-0.5">예상 실량</span>
                <strong className="text-sm font-bold text-on-surface">{calc.yarnBalls}</strong>
                <p className="text-[10px] text-outline mt-0.5">무늬 소요분 포함</p>
              </div>
            </div>
          </div>

          {/* 3. Step-by-Step 1:1 Custom Written Guide */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-on-surface/[0.08] shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-on-surface/[0.06]">
              <span className="material-symbols-outlined text-[20px] text-primary">menu_book</span>
              <h3 className="text-base font-bold font-serif text-on-surface">
                1:1 맞춤 서술형 실전 제작 가이드
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Step 1 */}
              <div className="p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 font-bold text-on-surface mb-1">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span>
                    {calc.shoulderType === 'drop' ? '뒷판 어깨 코잡기 & 진동 평면뜨기' : '목둘레 코잡기 & 요크 레글런 늘림'}
                  </span>
                </div>
                <p className="text-on-surface-variant leading-relaxed pl-7 break-keep">
                  {calc.shoulderType === 'drop'
                    ? `바늘 4.5mm로 ${calc.backCastOnSts}코를 잡고, 진동 깊이 ${calc.armholeDepthCm}cm (${calc.armholeRows}단)까지 ${calc.patternName} 무늬를 유지하며 평면 왕복으로 곧게 뜹니다.`
                    : `바늘 3.5mm로 목둘레 ${calc.neckCastOn}코를 잡고 넥밴드 3cm 고무단을 뜬 뒤, 4군데 레글런 라인에서 2단마다 늘림을 진행하여 요크 깊이 ${calc.armholeDepthCm}cm (${calc.armholeRows}단)까지 뜹니다.`}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 font-bold text-on-surface mb-1">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span>몸통 합체 &amp; 무늬 단수 진행 ({calc.lengthLabel})</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed pl-7 break-keep">
                  앞판과 뒷판을 원형으로 연결하여 총 <strong className="text-primary font-bold">{calc.totalBodySts}코</strong>(앞·뒤 각 {calc.halfBodySts}코)를 만듭니다. {calc.patternType === 'cable' ? '8코 꽈배기 무늬를 매 8단마다 꼬아주며' : calc.patternType === 'stripe' ? '8단 메인 컬러와 8단 배색 컬러를 교차하며' : `${calc.patternName} 무늬를 진행하며`} 몸통 길이 {calc.bodyLengthCm}cm ({calc.bodyRows}단)까지 뜹니다. 밑단은 1x1 립으로 5cm 마감합니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 font-bold text-on-surface mb-1">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center shrink-0">3</span>
                  <span>소매 코줍기 &amp; 손목 줄임 차트</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed pl-7 break-keep">
                  진동 둘레에서 바늘을 넣어 총 <strong className="text-primary font-bold">{calc.sleevePickSts}코</strong>를 고르게 주워 원형으로 연결합니다. 매 {calc.sleeveDecRows}단마다 양쪽 끝에서 1코씩 줄임(2코 모아뜨기)을 총 {Math.round((calc.sleevePickSts - calc.wristSts) / 2)}회 반복하여 손목 목표치인 <strong className="text-secondary font-bold">{calc.wristSts}코</strong>에 도달하면 소매 고무단 5cm를 뜨고 돗바늘로 덮어씌워 마무리합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
