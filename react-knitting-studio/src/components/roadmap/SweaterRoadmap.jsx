import React, { useState } from 'react';

export default function SweaterRoadmap({ calc, onOpenVideo }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [expandedChecklist, setExpandedChecklist] = useState({
    caston: true,
    yoke: true,
    divide: true,
    body: true,
    sleeves: true
  });

  const toggleSection = (key) => {
    setExpandedChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const steps = [
    { id: '1', num: '01', title: '목둘레 코잡기 & 넥밴드 3cm', target: 'caston' },
    { id: '2', num: '02', title: '레글런 요크 늘림 (M1R/M1L)', target: 'yoke' },
    { id: '3', num: '03', title: '소매 분리 & 겨드랑이 감아코', target: 'divide' },
    { id: '4', num: '04', title: '몸통 직진 원형뜨기 & 밑단 고무단', target: 'body' },
    { id: '5', num: '05', title: '양 소매 원형뜨기 & 마감 바인드오프', target: 'sleeves' },
  ];

  return (
    <section id="roadmap" className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-on-surface/[0.08] shadow-sm mb-12">
      {/* 1. Header with Phase Jump Navigation */}
      <div className="mb-8 pb-6 border-b border-on-surface/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">
                MASTERCLASS PATTERN MANUAL
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-on-surface">
              탑다운 레글런 스웨터 실전 도안 설명서
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-3 py-1.5 rounded-full border border-primary/20">
              실측 게이지 100% 자동 대입
            </span>
            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full">
              총 5대 핵심 공정 · 상세 가이드
            </span>
          </div>
        </div>

        {/* Phase Quick Jump Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            전체 공정 펼쳐보기
          </button>
          {steps.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveTab(s.id)}
              className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === s.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="opacity-70 font-mono">{s.num}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {/* ========================================================================= */}
        {/* STEP 01 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '1') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  01
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    시작 목둘레 <span className="text-primary font-extrabold">{calc.castOn}코</span> 잡기 &amp; 넥밴드 3cm
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    기초 코잡기부터 꼬임 없는 원형 연결, 탄력 있는 넥라인 완성
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  권장 3.5mm 줄바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  줄길이 40cm (또는 매직루프)
                </span>
              </div>
            </div>

            {/* SVG Structure Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">gesture</span>
                  <span>STEP 01 구조도: 넥밴드 원형 코잡기 &amp; 3cm 넥라인</span>
                </span>
                <span className="text-xs text-outline font-medium">3.5mm 줄바늘 (40cm)</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 420 120" className="w-full max-w-[420px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50 60 C 50 15, 370 15, 370 60 C 370 105, 50 105, 50 60" fill="none" stroke="#dcc1b9" strokeWidth="4" strokeDasharray="6 4" />
                  <line x1="50" y1="60" x2="85" y2="48" stroke="#984125" strokeWidth="5" strokeLinecap="round" />
                  <line x1="50" y1="60" x2="85" y2="72" stroke="#984125" strokeWidth="5" strokeLinecap="round" />
                  <ellipse cx="210" cy="60" rx="135" ry="38" fill="rgba(152,65,37,0.04)" stroke="#984125" strokeWidth="2.5" />
                  <ellipse cx="210" cy="60" rx="112" ry="25" fill="#ffffff" stroke="#dcc1b9" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="210" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#984125">
                    시작 목둘레 <tspan fontWeight="800" fill="#984125">{calc.castOn}코</tspan>
                  </text>
                  <text x="210" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill="#655a4e">
                    흔들코 ➔ 1코 고무뜨기 3cm 직진
                  </text>
                  <g transform="translate(65, 8)">
                    <rect width="88" height="22" rx="11" fill="#ffdbd0" />
                    <text x="44" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="#984125">신축성 코잡기</text>
                  </g>
                  <g transform="translate(268, 8)">
                    <rect width="95" height="22" rx="11" fill="#e9e8e5" />
                    <text x="47.5" y="15" textAnchor="middle" fontSize="10" fontWeight="600" fill="#56423d">고무단 약 8~10단</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Granular Instructions */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 바늘 선택 &amp; 준비</strong>: 메인 몸통 바늘(4.5mm)보다 1mm 가는 <strong>3.5mm 40cm 줄바늘</strong>을 사용합니다. 시작 목둘레는 둘레가 좁기 때문에 긴 줄바늘을 쓰면 케이블이 팽팽하게 당겨져 코잡기가 매우 힘드므로 꼭 40cm 줄바늘 또는 매직루프를 활용하세요.
              </p>
              <p>
                <strong>2. 신축성 튜블러(흔들코) 코잡기</strong>: 계산된 시작 코수인 <strong><span className="font-bold text-primary">{calc.castOn}코</span></strong>를 잡습니다. 일반 롱테일 코잡기는 머리가 통과할 때 신축성이 부족해 옷이 뜯어질 수 있으므로, 기성복처럼 쫀쫀하고 탄력 있는 <strong>흔들코(Italian Tubular Cast-on)</strong> 기법을 권장합니다.
              </p>
              <p>
                <strong>3. 꼬임 방지 원형 연결 (초보자 실수 1위!)</strong>: 바늘에 걸린 모든 코의 아랫단(땋은 머리 모양의 릿지)이 안쪽을 향하도록 평평한 테이블에 가지런히 펼쳐 정렬합니다. 코가 한 번이라도 비틀린 채 첫 코와 마지막 코를 이으면 전체가 뫼비우스의 띠처럼 꼬여 풀고 다시 떠야 합니다.
              </p>
              <p>
                <strong>4. 1코 고무단 3cm 완성</strong>: 원형으로 연결한 뒤 첫 코에 시작 마커(BOR)를 걸고, <strong>1코 고무뜨기 (겉1, 안1)</strong>로 <strong>3cm (약 8~10단)</strong>을 단정하게 뜹니다.
              </p>
            </div>

            {/* Neckline Styles A vs B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold flex items-center gap-1 mb-1 text-sm">
                  <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                  <span>스타일 A: 기본 싱글 넥밴드 (3cm)</span>
                </strong>
                <p className="text-on-surface-variant leading-relaxed">
                  가장 가볍고 산뜻한 기본 라운드넥. 목둘레 답답함 없이 내추럴하게 착용하기 좋습니다.
                </p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold flex items-center gap-1 mb-1 text-sm">
                  <span className="material-symbols-outlined text-[16px]">style</span>
                  <span>스타일 B: 도톰한 접단 넥밴드 (6~7cm)</span>
                </strong>
                <p className="text-on-surface-variant leading-relaxed">
                  고무단을 6~7cm 떠서 안쪽으로 반 접어 코를 주워 겹쳐 뜨면 목 늘어남이 없는 탄탄한 명품 니트 완성!
                </p>
              </div>
            </div>

            {/* German Short Rows (GSR) Guide */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-secondary/20 text-xs text-on-surface-variant flex flex-col gap-1.5 mb-4">
              <div className="flex items-center gap-1.5 text-secondary font-bold text-sm">
                <span className="material-symbols-outlined text-[17px]">accessibility_new</span>
                <span>뒷목 올림(독일식 경사뜨기, GSR) 선택 가이드</span>
              </div>
              <p className="leading-relaxed">
                • <strong>초보자 추천 (가장 쉬운 입문)</strong>: 처음 스웨터를 뜨신다면 경사뜨기 없이 바로 STEP 02로 넘어가셔도 충분히 예쁜 라운드넥이 완성됩니다.
              </p>
              <p className="leading-relaxed">
                • <strong>기성복 핏 옵션</strong>: 스웨터가 뒤로 젖혀지거나 앞목이 목을 압박하는 현상을 완벽히 방지하고 싶다면, 넥밴드 직후 뒷목~양 소매 구간에서 <strong>독일식 경사뜨기(German Short Rows)</strong>를 4~6회 왕복하여 뒷목 높이를 약 2.5~3cm 높여주면 목선이 예술적으로 편안해집니다.
              </p>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '이탈리안 튜블러 코잡기 (흔들코)')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 튜블러 코잡기 (흔들코) 재생</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 02 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '2') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  02
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    마커 배분 &amp; 요크 레글런 사선 늘림 <span className="text-primary font-extrabold">({calc.neededIncreases}회 반복)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    4곳의 레글런 선을 따라 M1R/M1L로 어깨와 소매를 입체적으로 확장
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  메인 4.5mm 줄바늘 교체
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  줄길이 60~80cm
                </span>
              </div>
            </div>

            {/* Instruction intro */}
            <p className="text-sm text-on-surface leading-relaxed mb-4">
              <strong>1. 4.5mm 메인 바늘로 교체 &amp; 마커 걸기</strong>: 넥밴드가 끝나면 이제 스웨터 전체 텐션을 결정하는 <strong>4.5mm 메인 줄바늘</strong>로 바꾸면서, 아래 실시간 마커 배분 공식에 맞춰 4개의 마커를 걸어줍니다.
            </p>

            {/* SVG Raglan Schematic Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                  <span>STEP 02 구조도: 탑다운 레글런 4방향 확장 평면도</span>
                </span>
                <span className="text-xs text-outline font-medium">레글런 선: 각 2코 (총 8코)</span>
              </div>

              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 460 210" className="w-full max-w-[460px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="raglan-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#984125" />
                    </marker>
                  </defs>
                  <polygon points="170,12 290,12 430,90 430,120 290,198 170,198 30,120 30,90" fill="rgba(152,65,37,0.03)" stroke="#dcc1b9" strokeWidth="1.5" strokeDasharray="4 3" />
                  <ellipse cx="230" cy="105" rx="70" ry="32" fill="#ffffff" stroke="#984125" strokeWidth="2" />
                  <text x="230" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#984125">
                    목둘레 <tspan fontWeight="800" fill="#984125">{calc.castOn}코</tspan>
                  </text>
                  <text x="230" y="116" textAnchor="middle" fontSize="9" fontWeight="500" fill="#89726c">
                    중심 넥라인
                  </text>

                  {/* 4 Raglan Lines */}
                  <line x1="280" y1="88" x2="385" y2="40" stroke="#984125" strokeWidth="3" strokeLinecap="round" markerEnd="url(#raglan-arrow)" />
                  <line x1="280" y1="122" x2="385" y2="170" stroke="#984125" strokeWidth="3" strokeLinecap="round" markerEnd="url(#raglan-arrow)" />
                  <line x1="180" y1="122" x2="75" y2="170" stroke="#984125" strokeWidth="3" strokeLinecap="round" markerEnd="url(#raglan-arrow)" />
                  <line x1="180" y1="88" x2="75" y2="40" stroke="#984125" strokeWidth="3" strokeLinecap="round" markerEnd="url(#raglan-arrow)" />

                  {/* Markers */}
                  <circle cx="180" cy="88" r="9" fill="#984125" />
                  <text x="180" y="91.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">시작</text>
                  <circle cx="280" cy="88" r="8" fill="#a0401c" />
                  <text x="280" y="91" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">M1</text>
                  <circle cx="280" cy="122" r="8" fill="#a0401c" />
                  <text x="280" y="125" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">M2</text>
                  <circle cx="180" cy="122" r="8" fill="#a0401c" />
                  <text x="180" y="125" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">M3</text>

                  {/* Zone Boxes */}
                  <g transform="translate(170, 20)">
                    <rect width="120" height="28" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.2" />
                    <text x="60" y="13" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">뒷판 (Back)</text>
                    <text x="60" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#984125">{calc.backSts}코</text>
                  </g>
                  <g transform="translate(170, 162)">
                    <rect width="120" height="28" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.2" />
                    <text x="60" y="13" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">앞판 (Front)</text>
                    <text x="60" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#984125">{calc.frontSts}코</text>
                  </g>
                  <g transform="translate(330, 91)">
                    <rect width="115" height="28" rx="6" fill="#ffffff" stroke="#a0401c" strokeWidth="1.2" />
                    <text x="57.5" y="13" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">오른쪽 소매</text>
                    <text x="57.5" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a0401c">{calc.sleeveSts}코</text>
                  </g>
                  <g transform="translate(15, 91)">
                    <rect width="115" height="28" rx="6" fill="#ffffff" stroke="#a0401c" strokeWidth="1.2" />
                    <text x="57.5" y="13" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">왼쪽 소매</text>
                    <text x="57.5" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a0401c">{calc.sleeveSts}코</text>
                  </g>
                </svg>
              </div>

              {/* 4-Zone Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs mt-2">
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block mb-0.5">뒷판 (Back)</span>
                  <strong className="text-primary font-bold text-sm">{calc.backSts}코</strong>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block mb-0.5">오른쪽 소매</span>
                  <strong className="text-primary font-bold text-sm">{calc.sleeveSts}코</strong>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block mb-0.5">앞판 (Front)</span>
                  <strong className="text-primary font-bold text-sm">{calc.frontSts}코</strong>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block mb-0.5">왼쪽 소매</span>
                  <strong className="text-primary font-bold text-sm">{calc.sleeveSts}코</strong>
                </div>
              </div>
              <p className="text-[12px] text-outline mt-2 text-center">
                진행 순서: [시작마커] → 뒷판 → [마커1] → 겉2코선 → 오른쪽소매 → [마커2] → 겉2코선 → 앞판 → [마커3] → 겉2코선 → 왼쪽소매 → [마커4] → 겉2코선
              </p>
            </div>

            {/* Granular Step Details */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>2. 늘림단 (1단) - M1R &amp; M1L 완벽 손동작 요령</strong>:<br/>
                각 4곳의 레글런 2코 기둥선 바로 <strong>직전</strong>에서는 <strong>M1R(오른코늘림)</strong>, 기둥선(겉뜨기 2코) 바로 <strong>직후</strong>에서는 <strong>M1L(왼코늘림)</strong>을 합니다.<br/>
                • <strong className="text-primary">M1R (오른코늘림)</strong>: 앞뒤 코 사이의 가로 싱커루프를 왼바늘로 <strong>뒤에서 앞으로</strong> 찔러 올린 뒤, <strong>앞쪽 루프</strong>에 바늘을 찔러 겉뜨기(구멍 없이 단단하게 비틀어 뜸).<br/>
                • <strong className="text-primary">레글런 기둥 2코</strong>: 변형 없이 <strong>겉뜨기 2코</strong>로 기둥을 곧게 유지합니다.<br/>
                • <strong className="text-primary">M1L (왼코늘림)</strong>: 싱커루프를 왼바늘로 <strong>앞에서 뒤로</strong> 찔러 올린 뒤, <strong>뒤쪽 루프(꼬아뜨기)</strong>에 바늘을 찔러 겉뜨기.<br/>
                ※ 4개 레글런 선마다 2코씩 늘어나므로 <strong>한 바퀴에 정확히 총 8코가 증가</strong>합니다.
              </p>
              <p>
                <strong>3. 평단 (2단)</strong>: 늘림 없이 모든 코를 편안하게 겉뜨기(Knit)로 한 바퀴 뜹니다. (마커는 그냥 오른쪽 바늘로 넘겨줍니다).
              </p>
              <p>
                <strong>4. 반복 횟수 &amp; 진동 깊이</strong>: 이 2단 세트(늘림단 1단 + 평단 1단)를 총 <strong><span className="font-bold text-primary">{calc.neededIncreases}회</span> (총 <span className="font-bold">{calc.raglanRows}단</span>, 진동 깊이 약 <span className="font-bold">{calc.armholeDepthCm}cm</span>)</strong> 반복합니다.
              </p>
            </div>

            {/* Pro Tips Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold block mb-1 text-sm">💡 초보자 마커 8개 꿀팁</strong>
                <p className="text-on-surface-variant leading-relaxed">
                  레글런 2코 기둥의 앞뒤로 마커를 각각 걸어두면(총 8개), 마커 사이에서는 무조건 겉뜨기 2코만 뜨고 마커 바깥에서만 늘림을 하므로 실수가 0이 됩니다.
                </p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] text-xs">
                <strong className="text-on-surface font-bold block mb-1 text-sm">📌 10단마다 단수링 꽂기</strong>
                <p className="text-on-surface-variant leading-relaxed">
                  {calc.raglanRows}단은 꽤 길어서 세다 보면 헷갈리기 쉽습니다. 옷핀 모양 단수링을 10단마다 레글런 기둥선에 걸어두면 한눈에 진행 상황을 체크할 수 있습니다.
                </p>
              </div>
            </div>

            {/* Armhole Measurement Guide */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/15 text-xs text-on-surface-variant flex flex-col gap-1.5 mb-4">
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-[17px]">straighten</span>
                <span>진동 길이 정확한 측정법 &amp; 핏 체크</span>
              </div>
              <p className="leading-relaxed">
                바닥에 편물을 평평하게 펼치고 <strong>넥밴드 리브 바로 밑부터 바늘 끝까지의 레글런 사선 기둥 라인을 따라</strong> 줄자로 잽니다. 줄바늘에 보조 케이블을 끼우고 직접 입어보아 겨드랑이 밑 1.5~2cm 아래까지 충분히 내려오면 소매 분리로 들어갈 최적의 타이밍입니다.
              </p>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('1v3x4a5b6c', 'M1R & M1L 레글런 늘림 정석')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: M1R &amp; M1L 레글런 늘림 재생</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 03 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '3') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  03
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    소매 분리 &amp; 겨드랑이 감아코 <span className="text-primary font-extrabold">({calc.underarmSts}코)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    양 소매를 별실에 쉬어두고 앞·뒤판을 연결하여 거대한 몸통 완성
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-secondary-fixed/50 text-secondary px-3 py-1 rounded-full border border-secondary/20">
                  몸통과 소매 분리점
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  별실(쉬는 실) 필요
                </span>
              </div>
            </div>

            {/* SVG Sleeve Separation Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">call_split</span>
                  <span>STEP 03 구조도: 소매 별실 분리 &amp; 겨드랑이 감아코 연결</span>
                </span>
                <span className="text-xs text-outline font-medium">별실(쉬는 실) 필요</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 440 140" className="w-full max-w-[440px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 150 20 L 290 20 L 290 120 L 150 120 Z" fill="rgba(152,65,37,0.05)" stroke="#984125" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="220" y="55" textAnchor="middle" fontSize="13" fontWeight="800" fill="#984125">몸통 원형 연결</text>
                  <text x="220" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill="#655a4e">뒷판 + 앞판 결합 진행</text>

                  {/* Left Sleeve Box */}
                  <g transform="translate(15, 25)">
                    <rect width="115" height="55" rx="8" fill="#ffffff" stroke="#a0401c" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="57.5" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a0401c">왼쪽 소매 코</text>
                    <text x="57.5" y="37" textAnchor="middle" fontSize="13" fontWeight="800" fill="#a0401c">{calc.finalSleeveSts}코</text>
                    <text x="57.5" y="49" textAnchor="middle" fontSize="9" fontWeight="500" fill="#89726c">별실에 잠시 휴식</text>
                  </g>

                  {/* Right Sleeve Box */}
                  <g transform="translate(310, 25)">
                    <rect width="115" height="55" rx="8" fill="#ffffff" stroke="#a0401c" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="57.5" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a0401c">오른쪽 소매 코</text>
                    <text x="57.5" y="37" textAnchor="middle" fontSize="13" fontWeight="800" fill="#a0401c">{calc.finalSleeveSts}코</text>
                    <text x="57.5" y="49" textAnchor="middle" fontSize="9" fontWeight="500" fill="#89726c">별실에 잠시 휴식</text>
                  </g>

                  {/* Underarm Cast-on Bridges */}
                  <path d="M 130 95 C 140 105, 140 105, 150 95" fill="none" stroke="#fe875d" strokeWidth="3" strokeLinecap="round" />
                  <g transform="translate(45, 95)">
                    <rect width="95" height="22" rx="11" fill="#fe875d" />
                    <text x="47.5" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">
                      감아코 +{calc.underarmSts}코
                    </text>
                  </g>

                  <path d="M 290 95 C 300 105, 300 105, 310 95" fill="none" stroke="#fe875d" strokeWidth="3" strokeLinecap="round" />
                  <g transform="translate(300, 95)">
                    <rect width="95" height="22" rx="11" fill="#fe875d" />
                    <text x="47.5" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">
                      감아코 +{calc.underarmSts}코
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Granular Instructions */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 뒷판 겉뜨기 &amp; 오른쪽 소매 별실 분리</strong>: 시작 마커에서 출발하여 뒷판 코를 겉뜨기로 뜬 후, 오른쪽 소매 코 <strong><span className="font-bold text-primary">{calc.finalSleeveSts}코</span></strong>를 돗바늘을 사용해 매끄러운 별실(털 날림 없는 면사 추천)에 걸어 묶어둡니다.
              </p>
              <p>
                <strong>2. 오른쪽 겨드랑이 감아코(Backward Loop) 생성</strong>: 오른손 바늘에 <strong>겨드랑이 감아코 <span className="font-bold text-primary">{calc.underarmSts}코</span></strong>를 새로 만듭니다. 💡 <strong>장력 팁</strong>: 엄지손가락이 헐렁하게 쏙 빠져나올 정도로 여유 있게 감아야 다음 단에서 대바늘 끝이 부드럽게 들어갑니다.
              </p>
              <p>
                <strong>3. 앞판 겉뜨기 &amp; 왼쪽 소매 별실 분리</strong>: 이어서 앞판 코를 끝까지 겉뜨기로 뜨고, 왼쪽 소매 코 <strong><span className="font-bold text-primary">{calc.finalSleeveSts}코</span></strong>도 별실에 옮겨 안전하게 묶어둡니다.
              </p>
              <p>
                <strong>4. 왼쪽 겨드랑이 감아코 &amp; 몸통 원형 닫기</strong>: 반대쪽 겨드랑이에도 <strong>감아코 <span className="font-bold text-primary">{calc.underarmSts}코</span></strong>를 만들고 뒷판 첫 코와 연결하여 하나의 거대한 원통형 몸통을 완성합니다.
              </p>
            </div>

            {/* Raglan Stitches Allocation Guide */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs text-on-surface-variant flex flex-col gap-1.5 my-4">
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-[17px]">help_outline</span>
                <span>소매 분리 시 레글런 2코 기둥선은 어디로 보내나요?</span>
              </div>
              <p className="leading-relaxed">
                • <strong>방법 1 (초보자 강력 추천)</strong>: 레글런 2코 <strong>모두를 몸통에 포함</strong>시킵니다. 계산기에서 도출된 소매 코수와 100% 깔끔하게 일치하고 품이 한결 편안해집니다.
              </p>
              <p className="leading-relaxed">
                • <strong>방법 2 (정석 핏)</strong>: 2코를 반으로 쪼개어 <strong>1코는 몸통, 1코는 소매</strong>로 나누어 보냅니다. (이 경우 소매 시작 코수가 각 1코씩 늘어납니다).
              </p>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('5a6b7c8d9e', '감아코 만들기 (Backward Loop)')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 감아코 만들기 (Backward Loop) 재생</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 04 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '4') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  04
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    몸통 직진 원형뜨기 <span className="text-primary font-extrabold">({calc.totalFinalBodySts}코)</span> &amp; 밑단 고무단
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    증감 없이 편안한 메리야스 직진 궤도와 단정한 1x1 밑단 리브 마감
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  4.5mm 메인 → 3.5mm 리브
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  줄길이 80~100cm
                </span>
              </div>
            </div>

            {/* SVG Body Schematic */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">straight</span>
                  <span>STEP 04 구조도: 몸통 원통 직진 &amp; 밑단 고무단</span>
                </span>
                <span className="text-xs text-outline font-medium">4.5mm ➔ 3.5mm 바늘</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 420 135" className="w-full max-w-[420px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="down-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 1.5 0 L 5 8 L 8.5 0 z" fill="#984125" />
                    </marker>
                  </defs>
                  <rect x="130" y="10" width="160" height="75" rx="4" fill="rgba(152,65,37,0.04)" stroke="#984125" strokeWidth="2" />
                  <line x1="210" y1="22" x2="210" y2="70" stroke="#984125" strokeWidth="2.5" markerEnd="url(#down-arrow)" />
                  <text x="145" y="45" fontSize="11" fontWeight="700" fill="#984125">총 {calc.totalFinalBodySts}코</text>
                  <text x="220" y="45" fontSize="11" fontWeight="600" fill="#655a4e">증감 없이 직진</text>
                  <text x="220" y="60" fontSize="9.5" fontWeight="500" fill="#89726c">32~36cm ({calc.bodyRowsEst - 5}~{calc.bodyRowsEst + 5}단)</text>

                  {/* Rib Band */}
                  <rect x="130" y="85" width="160" height="28" rx="3" fill="#ffdbd0" stroke="#984125" strokeWidth="1.5" />
                  <line x1="145" y1="85" x2="145" y2="113" stroke="#984125" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="160" y1="85" x2="160" y2="113" stroke="#984125" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="175" y1="85" x2="175" y2="113" stroke="#984125" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="245" y1="85" x2="245" y2="113" stroke="#984125" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="260" y1="85" x2="260" y2="113" stroke="#984125" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="275" y1="85" x2="275" y2="113" stroke="#984125" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="210" y="103" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#984125">밑단 1코 고무뜨기 5cm (3.5mm 바늘)</text>

                  <g transform="translate(15, 38)">
                    <rect width="100" height="34" rx="8" fill="#e9e8e5" />
                    <text x="50" y="15" textAnchor="middle" fontSize="9" fontWeight="600" fill="#56423d">메리야스 겉뜨기</text>
                    <text x="50" y="27" textAnchor="middle" fontSize="8.5" fontWeight="500" fill="#89726c">편안한 직진 구간</text>
                  </g>
                  <g transform="translate(305, 82)">
                    <rect width="100" height="34" rx="8" fill="#f0e0d0" />
                    <text x="50" y="15" textAnchor="middle" fontSize="9" fontWeight="700" fill="#984125">신축성 코막음</text>
                    <text x="50" y="27" textAnchor="middle" fontSize="8.5" fontWeight="500" fill="#655a4e">조이지 않게 마감</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Granular Instructions */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 무한 메리야스 겉뜨기 &amp; 손장력 유지</strong>: 소매가 빠져 가벼워진 몸통 총 <strong><span className="font-bold text-primary">{calc.totalFinalBodySts}코</span></strong>로 증감 없이 밑단 고무단 전까지 <strong>메리야스 겉뜨기(원형뜨기)</strong>를 계속 진행합니다. 긴장이 풀려 손땀이 점점 헐렁해지면 옷이 아래로 갈수록 나팔꽃처럼 퍼질 수 있으니, 스와치를 떴을 때의 일정한 텐션을 유지해 주세요.
              </p>
              <p>
                <strong>2. 몸통 기장 &amp; 바늘 교체</strong>: 겨드랑이 밑선부터 약 <strong>32~36cm (약 <span className="font-bold">{calc.bodyRowsEst - 5}~{calc.bodyRowsEst + 5}단</span>)</strong> 진행한 뒤, 1호수 작은 <strong>3.5mm 줄바늘</strong>로 교체합니다. 바늘 호수를 줄여야 고무단이 벌어지지 않고 허리선에서 단정하게 오므라듭니다.
              </p>
              <p>
                <strong>3. 밑단 고무단 &amp; 신축성 마감</strong>: 3.5mm 바늘로 <strong>1코 고무뜨기 (K1, P1)</strong>를 <strong>5cm (약 14~16단)</strong> 뜬 뒤, 신축성이 뛰어난 돗바늘 이탈리안 바인드오프 또는 제니식 코막음으로 마감합니다.
              </p>
            </div>

            {/* Tips: Russian Join & Yarn Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold block mb-1 text-sm">💡 티 안 나게 새 실 잇는 위치</strong>
                <p className="text-on-surface-variant leading-relaxed">
                  새 실타래를 연결할 때 앞가슴 한가운데서 매듭을 지으면 겉으로 티가 납니다. 반드시 <strong>겨드랑이 밑선(옆구리 솔기 위치)</strong>에서 실을 교체하세요.
                </p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] text-xs">
                <strong className="text-on-surface font-bold block mb-1 text-sm">🧶 러시안 조인 (Russian Join)</strong>
                <p className="text-on-surface-variant leading-relaxed">
                  돗바늘로 새 실과 헌 실의 끝부분을 서로의 꼬임 속에 통과시켜 겹쳐 꼬면 매듭 없이 완벽하게 하나로 이어집니다.
                </p>
              </div>
            </div>

            {/* Length Guide Cards */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/15 text-xs text-on-surface-variant flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-[17px]">check_circle</span>
                <span>스타일별 몸통 기장 맞춤 가이드</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                <div className="p-3 bg-surface-container-low rounded-lg">
                  <strong className="text-on-surface block mb-1 text-xs">트렌디 크롭 핏</strong>
                  <span className="text-outline">겨드랑이 밑 23~26cm (하이웨이스트 하의와 최적)</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg border border-primary/30">
                  <strong className="text-primary block mb-1 text-xs">클래식 레귤러 핏 (추천)</strong>
                  <span className="text-on-surface-variant">겨드랑이 밑 32~36cm (골반선에 걸치는 황금 비율)</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg">
                  <strong className="text-on-surface block mb-1 text-xs">루즈 오버핏</strong>
                  <span className="text-outline">겨드랑이 밑 38~42cm (엉덩이를 포근하게 덮는 기장)</span>
                </div>
              </div>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '밑단 코막음 기법')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 돗바늘 이탈리안 바인드오프 재생</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 05 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '5') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  05
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    양 소매 원형뜨기 &amp; 신축성 돗바늘 코막음
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    자연스러운 테이퍼드 줄임 공식과 손목 립, 블로킹 마무리
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  매직루프 or 장갑바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  손목 3.5mm
                </span>
              </div>
            </div>

            {/* SVG Sleeve Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">change_history</span>
                  <span>STEP 05 구조도: 소매 테이퍼드 줄임 &amp; 손목 마감</span>
                </span>
                <span className="text-xs text-outline font-medium">매직루프 or 장갑바늘</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 420 135" className="w-full max-w-[420px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="sleeve-down-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 1.5 0 L 5 8 L 8.5 0 z" fill="#fe875d" />
                    </marker>
                  </defs>
                  <polygon points="120,12 300,12 260,90 160,90" fill="rgba(152,65,37,0.04)" stroke="#984125" strokeWidth="2" />
                  <text x="210" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#984125">
                    별실 <tspan fontWeight="800" fill="#984125">{calc.finalSleeveSts}코</tspan> + 감아코 <tspan fontWeight="800" fill="#984125">{calc.underarmSts}코</tspan> = 시작 총 <tspan fontWeight="800" fill="#984125">{calc.totalInitialSleeveSts}코</tspan>
                  </text>

                  {/* Decreasing Arrows */}
                  <line x1="145" y1="45" x2="175" y2="65" stroke="#fe875d" strokeWidth="2.5" markerEnd="url(#sleeve-down-arrow)" />
                  <line x1="275" y1="45" x2="245" y2="65" stroke="#fe875d" strokeWidth="2.5" markerEnd="url(#sleeve-down-arrow)" />
                  <text x="210" y="58" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#a0401c">6단(또는 8단)마다 양쪽 -2코 줄임</text>
                  <text x="210" y="73" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#655a4e">마커 후 SSK · 마커 전 K2tog</text>

                  {/* Wrist Rib */}
                  <rect x="160" y="90" width="100" height="26" rx="3" fill="#ffdbd0" stroke="#984125" strokeWidth="1.5" />
                  <text x="210" y="106" textAnchor="middle" fontSize="10" fontWeight="700" fill="#984125">손목 1코 고무단 5cm (3.5mm)</text>

                  <g transform="translate(15, 85)">
                    <rect width="130" height="26" rx="13" fill="#e9e8e5" />
                    <text x="65" y="17" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#56423d">손목 목표: 약 {calc.wristSts}코</text>
                  </g>
                  <g transform="translate(275, 85)">
                    <rect width="130" height="26" rx="13" fill="#f0e0d0" />
                    <text x="65" y="17" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#984125">이탈리안 코막음 (돗바늘)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Granular Instructions */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 소매 코 줍기 &amp; 매직루프 연결</strong>: 별실에 쉬어둔 소매 코 <strong><span className="font-bold text-primary">{calc.finalSleeveSts}코</span></strong>를 4.5mm 줄바늘로 옮겨 담고, 겨드랑이 감아코 <strong><span className="font-bold text-primary">{calc.underarmSts}코</span></strong>를 함께 주워 원형으로 연결합니다 (시작 코수 총 <strong><span className="font-bold">{calc.totalInitialSleeveSts}코</span></strong>). 겨드랑이 감아코 한가운데에 소매 시작 마커를 걸어줍니다.
              </p>
              <p>
                <strong>2. 자연스러운 테이퍼드 줄임 공식 (6단 또는 8단 주기)</strong>:<br/>
                • <strong>줄임단</strong>: [시작마커 넘김] → 겉뜨기 1코 → <strong className="text-primary">SSK(왼코모아뜨기)</strong> → 손목 마커 3코 전까지 겉뜨기 → <strong className="text-primary">K2tog(오른코모아뜨기)</strong> → 겉뜨기 1코.<br/>
                • <strong>평단</strong>: 줄임단 사이는 줄임 없이 모든 코를 겉뜨기로 5단(또는 7단) 채워줍니다.<br/>
                • 손목 목표 코수(약 {calc.wristSts}코)에 도달할 때까지 이 줄임을 규칙적으로 반복합니다.
              </p>
              <p>
                <strong>3. 손목 고무단 5cm</strong>: 소매 길이가 손목 뼈 위치까지 오면 <strong>3.5mm 바늘</strong>로 교체하고, <strong>1코 고무뜨기 5cm (약 14~16단)</strong>를 뜹니다.
              </p>
              <p>
                <strong>4. 반대쪽 소매 및 블로킹(마무리 세탁)</strong>: 반대쪽 소매도 동일한 단수와 줄임 주기로 떠준 뒤, 돗바늘로 모든 실밥을 편물 안쪽에 숨겨 정리합니다. 마지막으로 미온수에 울샴푸로 가볍게 세탁하여 평평하게 그늘에서 말리면(블로킹) 편물이 마법처럼 고르고 평평해집니다!
              </p>
            </div>

            {/* Pro Tips: Magic loop & Underarm hole prevent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold block mb-1 text-sm">💡 매직루프(Magic Loop)란?</strong>
                <p className="text-on-surface-variant leading-relaxed">
                  소매통이 좁아도 80cm 줄바늘 케이블을 소매 코 중간에서 <strong>토끼 귀처럼 반으로 접어 바깥으로 빼내면</strong> 바늘 교체 없이 원형뜨기가 가능합니다.
                </p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold block mb-1 text-sm">✨ 겨드랑이 구멍 박멸 3단계</strong>
                <p className="text-on-surface-variant leading-relaxed">
                  ① 경계선 싱커루프 1코 끌어올리기 ➔ ② 꼬아뜨기로 구멍 조이기 ➔ ③ 다음 단에서 옆 코와 K2tog로 합치면 구멍이 100% 사라집니다.
                </p>
              </div>
            </div>

            {/* 2 Bind-off Methods Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                <strong className="text-primary font-bold block mb-1 text-sm">방법 A: 이탈리안 바인드오프 (돗바늘 - 추천)</strong>
                <p className="text-on-surface-variant mb-1.5 leading-relaxed">
                  기성복 니트처럼 물결침 없이 매끈하고 가장 신축성이 뛰어납니다. 손목 둘레의 약 3.5배 실을 남기고 돗바늘로 겉코와 안코를 꿰매어 마감합니다.
                </p>
                <span className="text-[12px] text-primary/80 font-medium">💡 탄성과 완성도가 가장 높은 전문가 추천 방식</span>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] text-xs">
                <strong className="text-on-surface font-bold block mb-1 text-sm">방법 B: 제니식 신축성 코막음 (초보자용)</strong>
                <p className="text-on-surface-variant mb-1.5 leading-relaxed">
                  돗바늘 바느질이 익숙지 않은 분들을 위해 대바늘로 바늘비우기(Yarn Over)를 활용해 손목이 쨍기지 않는 부드러운 탄성을 완성합니다.
                </p>
                <span className="text-[12px] text-outline font-medium">💡 대바늘만으로 빠르고 쉽게 신축성 완성</span>
              </div>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '이탈리안 바인드오프 돗바늘 마감')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 이탈리안 바인드오프 재생</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
