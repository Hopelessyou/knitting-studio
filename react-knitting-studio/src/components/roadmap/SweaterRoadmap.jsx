import React, { useState } from 'react';

export default function SweaterRoadmap({ calc, onOpenVideo }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [showCheatSheet, setShowCheatSheet] = useState(true);

  const steps = [
    { id: '1', num: '01', title: '목둘레 코잡기 & 넥밴드 3cm' },
    { id: '2', num: '02', title: '레글런 어깨 늘림 (M1R/M1L)' },
    { id: '3', num: '03', title: '소매 분리 & 감아코 (조끼 만들기)' },
    { id: '4', num: '04', title: '몸통 무한 겉뜨기 & 밑단 고무단' },
    { id: '5', num: '05', title: '양 소매 뜨기 & 최종 완성' },
  ];

  return (
    <section id="roadmap" className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-on-surface/[0.08] shadow-sm mb-12">
      {/* 1. Header with Phase Jump Navigation */}
      <div className="mb-6 pb-6 border-b border-on-surface/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">
                BEGINNER-FRIENDLY MASTER MANUAL
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-on-surface">
              탑다운 레글런 스웨터 완전 초보 제작 설명서
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-3 py-1.5 rounded-full border border-primary/20">
              실측 게이지 100% 자동 연산 반영
            </span>
            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full">
              총 5대 핵심 공정 · 완전 초보 눈높이 해설
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
            전체 공정 한눈에 보기
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

      {/* 🌟 2. Beginner 3-Minute Cheat Sheet Banner */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-3 cursor-pointer" onClick={() => setShowCheatSheet(!showCheatSheet)}>
          <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            <span>🌱 완전 초보자를 위한 스웨터 3분 정복 치트키 (시작 전 필독!)</span>
          </div>
          <button type="button" className="text-xs text-primary font-semibold flex items-center gap-1">
            <span>{showCheatSheet ? '접기' : '펼쳐보기'}</span>
            <span className="material-symbols-outlined text-[16px]">{showCheatSheet ? 'expand_less' : 'expand_more'}</span>
          </button>
        </div>

        {showCheatSheet && (
          <div className="space-y-4 pt-1 text-xs sm:text-sm text-on-surface leading-relaxed border-t border-amber-500/10">
            {/* Flow Map */}
            <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
              <strong className="text-primary font-bold block mb-1.5 text-xs">
                🧭 스웨터는 이렇게 만들어져요 (위에서 아래로 뜨는 탑다운!)
              </strong>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] sm:text-xs font-semibold text-on-surface">
                <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">1. 목둘레 (도넛 만들기)</span>
                <span className="text-outline">➔</span>
                <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">2. 어깨선 늘림 (티셔츠 판 만들기)</span>
                <span className="text-outline">➔</span>
                <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">3. 소매 분리 (조끼 만들기)</span>
                <span className="text-outline">➔</span>
                <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">4. 몸통 겉뜨기 (무한 힐링)</span>
                <span className="text-outline">➔</span>
                <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">5. 양쪽 소매 뜨기 (완성!)</span>
              </div>
            </div>

            {/* 3 Green Passes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>① 흔들코가 너무 어렵다면?</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-normal">
                  외계어 같은 흔들코 대신, 평소 하던 <strong>일반 코잡기(롱테일)</strong>로 시작하세요! 머리가 들어가도록 <strong>느슨하게만</strong> 잡으면 100% 성공합니다.
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>② 독일식 경사뜨기(GSR) 머리 아프면?</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-normal">
                  초보자는 <strong>과감하게 건너뛰고 바로 2단계로 가셔도</strong> 예쁜 라운드넥 스웨터가 완성됩니다! 스트레스받지 마세요.
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>③ 돗바늘 코막음 손 떨리면?</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-normal">
                  어려운 돗바늘 기법 대신, 대바늘로 하는 <strong>일반 겉뜨기 덮어씌워 코막음</strong>을 넉넉하게 해주셔도 충분히 튼튼하고 예쁩니다.
                </p>
              </div>
            </div>

            {/* 4 Core Hand Actions */}
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06] text-xs">
              <strong className="text-on-surface font-bold block mb-1 text-xs">
                🖐️ 딱 4개만 외우세요! 초보 필수 손동작 공식
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-on-surface-variant">
                <div>
                  <strong className="text-primary font-bold">M1R (오른쪽 늘림 - 뒤앞앞):</strong> 코 사이 가로줄을 왼바늘로 <strong>뒤에서 앞으로</strong> 푹 찔러 올린 뒤 <strong>앞다리</strong>에 겉뜨기!
                </div>
                <div>
                  <strong className="text-primary font-bold">M1L (왼쪽 늘림 - 앞뒤뒤):</strong> 코 사이 가로줄을 왼바늘로 <strong>앞에서 뒤로</strong> 푹 찔러 올린 뒤 <strong>뒷다리</strong>에 꼬아 겉뜨기!
                </div>
                <div>
                  <strong className="text-primary font-bold">감아코 (Backward Loop):</strong> 왼손 엄지에 실을 둘러 생긴 고리에 오른쪽 바늘을 쏙 끼우는 초간단 코잡기.
                </div>
                <div>
                  <strong className="text-primary font-bold">마커 (Marker):</strong> 편물을 찌르는 게 아니라 <strong>바늘에 반지처럼 끼워두는</strong> 길잡이.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* ========================================================================= */}
        {/* STEP 01 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '1') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  01
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    목둘레 코잡기 <span className="text-primary font-extrabold">({calc.castOn}코)</span> &amp; 넥밴드 3cm
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    스웨터의 맨 윗부분인 목 구멍(도넛 모양)을 만들고 단정한 넥밴드를 뜹니다.
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

            {/* Easy vs Pro Badge Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                  <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                  <span>🟢 완전 초보 추천 (가장 쉬운 길)</span>
                </div>
                <p className="text-emerald-950 text-[11px] leading-relaxed">
                  어려운 흔들코 영상 보며 고생하지 마세요! <strong>일반 롱테일 코잡기</strong>로 {calc.castOn}코를 잡으세요. 머리가 쑥 들어가도록 <strong>손가락 하나 들어갈 정도로 약간 느슨하게</strong>만 잡아주면 완벽합니다.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-on-surface/[0.08] text-xs">
                <div className="flex items-center gap-1.5 font-bold text-on-surface mb-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>🔵 숙련자 정석 옵션</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  기성복 니트처럼 끝단이 둥글고 신축성 있는 마감을 원하시면 <strong>이탈리안 튜블러(흔들코)</strong> 기법을 사용하세요 (하단 영상 참조).
                </p>
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
                    1코 고무뜨기 3cm 직진 (겉뜨기 1, 안뜨기 1)
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

            {/* Step-by-Step Action List */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 3.5mm 40cm 바늘에 {calc.castOn}코 잡기
                </strong>
                <p className="text-on-surface-variant text-xs">
                  메인 몸통 바늘(4.5mm)보다 1mm 가는 <strong>3.5mm 줄바늘</strong>을 씁니다. 목둘레는 둘레가 작기 때문에 줄 길이가 짧은 <strong>40cm 줄바늘</strong>을 쓰거나 긴 바늘로 매직루프를 해야 바늘이 편안합니다. 계산된 코수 <strong>{calc.castOn}코</strong>를 바늘에 만듭니다.
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-rose-500/20">
                <strong className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>2단계: 책상에 내려놓고 꼬임 풀기 (초보자 멘붕 1위 실수 방지!)</span>
                </strong>
                <p className="text-on-surface-variant text-xs">
                  코를 다 잡은 뒤 평평한 책상에 도넛 모양으로 가지런히 펼쳐놓으세요. 바늘에 걸린 코 아래 <strong>땋은 머리 모양(V자 줄기)이 모두 안쪽을 바라보고 있는지</strong> 꼭 눈으로 확인하세요! 코가 꽈배기처럼 비틀린 채 첫 코와 마지막 코를 이으면 전체가 꼬여버려 다 풀러야 합니다.
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  3단계: 원형 연결 후 1코 고무뜨기 3cm 뜨기
                </strong>
                <p className="text-on-surface-variant text-xs">
                  오른쪽 바늘 끝에 시작을 표시할 <strong>시작마커(BOR)</strong>를 쏙 끼우고, 첫 코와 마지막 코를 이어 원형으로 뜨기 시작합니다.<br/>
                  <strong>[겉뜨기 1개 ➔ 안뜨기 1개]</strong>를 번갈아 뜨며 자로 쟀을 때 <strong>약 3cm(약 8~10단)</strong>가 될 때까지 돕니다.<br/>
                  💡 <em>손동작 팁: 겉뜨기 할 땐 실을 바늘 뒤에, 안뜨기 할 땐 실을 바늘 앞으로 가져와야 원치 않는 구멍이 생기지 않아요!</em>
                </p>
              </div>
            </div>

            {/* GSR Skip Option */}
            <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-secondary/20 text-xs text-on-surface-variant flex flex-col gap-1.5 my-3.5">
              <div className="flex items-center gap-1.5 text-secondary font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[17px]">accessibility_new</span>
                <span>💡 뒷목 높임(독일식 경사뜨기, GSR) 안심 가이드</span>
              </div>
              <p className="leading-relaxed">
                옷 뒷목을 살짝 높여 목을 더 편안하게 해주는 기법입니다. 하지만 <strong>완전 초보자라면 과감히 건너뛰고 바로 STEP 02로 넘어가셔도 예쁜 라운드넥 스웨터가 완성</strong>됩니다! 부담 없이 넘어가세요.
              </p>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '이탈리안 튜브 코잡기 (흔들코)')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 튜브 코잡기 &amp; 1코 고무단 재생</span>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  02
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    마커 배분 &amp; 레글런 사선 늘림 <span className="text-primary font-extrabold">({calc.neededIncreases}회 반복)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    어깨선 4곳을 대각선으로 점점 넓혀가며 앞판, 뒤판, 양쪽 팔 공간을 만듭니다.
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

            {/* 3-Second Concept */}
            <div className="p-3 bg-primary-fixed/20 rounded-xl border border-primary/20 text-xs text-on-surface mb-3.5">
              <strong className="text-primary font-bold block mb-0.5">🎯 이번 단계에서 내가 만드는 것:</strong>
              목 구멍에서 시작해 4개의 대각선(레글런 선)을 따라 코를 늘려가며, 마치 티셔츠처럼 <strong>앞판·뒤판과 양쪽 소매가 될 넓은 판</strong>을 만드는 핵심 공정입니다!
            </div>

            {/* SVG Raglan Schematic Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                  <span>STEP 02 구조도: 탑다운 레글런 4방향 확장 평면도</span>
                </span>
                <span className="text-xs text-outline font-medium">레글런 기둥 각 2코 (총 8코)</span>
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
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[11px]">뒷판 시작</span>
                  <strong className="text-primary text-sm font-bold">{calc.backSts}코</strong>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[11px]">앞판 시작</span>
                  <strong className="text-primary text-sm font-bold">{calc.frontSts}코</strong>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[11px]">양 소매 각각</span>
                  <strong className="text-secondary text-sm font-bold">{calc.sleeveSts}코</strong>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[11px]">레글런 선 (4곳)</span>
                  <strong className="text-on-surface text-sm font-bold">각 2코 (총 8코)</strong>
                </div>
              </div>
            </div>

            {/* Granular Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 4.5mm 메인 바늘로 바꾸면서 마커 4곳 걸기
                </strong>
                <p className="text-on-surface-variant text-xs mb-2">
                  넥밴드가 끝났으니 이제 몸통 바늘인 <strong>4.5mm 줄바늘(60~80cm)</strong>로 교체합니다. 마커는 바늘에 끼우는 이정표예요! 아래 순서대로 뜨면서 마커를 바늘에 쏙쏙 끼워주세요:
                </p>
                <div className="p-2.5 bg-surface-container-low rounded-lg font-mono text-[11px] text-on-surface space-y-1">
                  <div>1. [시작마커 걸기] ➔ 뒷판 <strong>{calc.backSts}코</strong> 겉뜨기</div>
                  <div>2. [마커1 걸기] ➔ 레글런 기둥 <strong>2코</strong> 겉뜨기 ➔ [마커2 걸기]</div>
                  <div>3. 오른쪽 소매 <strong>{calc.sleeveSts}코</strong> 겉뜨기</div>
                  <div>4. [마커3 걸기] ➔ 레글런 기둥 <strong>2코</strong> 겉뜨기 ➔ [마커4 걸기]</div>
                  <div>5. 앞판 <strong>{calc.frontSts}코</strong> 겉뜨기</div>
                  <div>6. [마커5 걸기] ➔ 레글런 기둥 <strong>2코</strong> 겉뜨기 ➔ [마커6 걸기]</div>
                  <div>7. 왼쪽 소매 <strong>{calc.sleeveSts}코</strong> 겉뜨기</div>
                  <div>8. [마커7 걸기] ➔ 레글런 기둥 <strong>2코</strong> 겉뜨기 ➔ 한 바퀴 완료!</div>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  2단계: 마법의 2단 반복 공식 (이것만 {calc.neededIncreases}번 반복하면 어깨 끝!)
                </strong>
                <div className="space-y-2 text-xs text-on-surface-variant mt-1.5">
                  <div className="p-2.5 rounded-lg bg-primary-fixed/20 text-on-surface">
                    <strong className="text-primary font-bold block mb-0.5">🔹 1단 (늘림단: 1바퀴 돌면 총 8코가 늘어남)</strong>
                    4개의 레글런 기둥(2코)마다:
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                      <li>기둥 2코 직전: <strong>M1R (오른쪽 늘림)</strong> 1코</li>
                      <li>기둥 2코는 그냥 <strong>겉뜨기</strong></li>
                      <li>기둥 2코 직후: <strong>M1L (왼쪽 늘림)</strong> 1코</li>
                      <li>나머지 판(앞판, 뒤판, 소매) 코들은 모두 편하게 <strong>겉뜨기</strong></li>
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-container-high text-on-surface">
                    <strong className="font-bold block mb-0.5">🔹 2단 (쉬어가는 평단)</strong>
                    코 늘림 없이, 모든 코를 그냥 편안하게 <strong>겉뜨기로만 1바퀴</strong> 쭉 돕니다! 마커가 나오면 마커를 오른쪽 바늘로 쏙 넘겨주기만 하세요.
                  </div>

                  <p className="text-primary font-bold text-[11px]">
                    🔁 이 [1단(늘림) ➔ 2단(평단)] 세트를 총 <strong>{calc.neededIncreases}회 반복</strong> (총 {calc.yokeRows}단) 합니다!
                  </p>
                </div>
              </div>

              {/* M1R / M1L 3-Second Action Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                  <strong className="text-primary font-bold block mb-1">💡 M1R (오른쪽 늘림) 3초 비법: "뒤앞앞"</strong>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">
                    1. 코와 코 사이 바닥에 가로로 걸쳐진 실(가로줄)을 왼바늘로 <strong>뒤에서 앞으로</strong> 푹 찔러 올립니다.<br/>
                    2. 걸려 올라온 실의 <strong>앞쪽 다리</strong>에 오른바늘을 찔러 겉뜨기!<br/>
                    👉 뒤에서 찔러 앞을 뜬다 = <strong>뒤앞앞</strong>!
                  </p>
                </div>

                <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                  <strong className="text-primary font-bold block mb-1">💡 M1L (왼쪽 늘림) 3초 비법: "앞뒤뒤"</strong>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">
                    1. 가로줄을 왼바늘로 <strong>앞에서 뒤로</strong> 푹 찔러 올립니다.<br/>
                    2. 걸려 올라온 실의 <strong>뒤쪽 다리</strong>에 오른바늘을 비틀어 찔러 겉뜨기!<br/>
                    👉 앞에서 찔러 뒤를 뜬다 = <strong>앞뒤뒤</strong>!
                  </p>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  3단계: 언제까지 떠야 하나요? (요크 완성 셀프 체크)
                </strong>
                <p className="text-on-surface-variant text-xs">
                  넥밴드 바로 아래부터 레글런 대각선 길이를 줄자로 쟀을 때 <strong>약 {calc.yokeDepthCm}cm</strong>가 나오면 요크 완료!<br/>
                  💡 <em>직접 입어보는 팁: 편물을 어깨에 둘러보았을 때, 늘림선 끝부분이 내 양쪽 겨드랑이 밑에 편안하게 닿으면 완벽합니다.</em>
                </p>
              </div>
            </div>

            {/* Video Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', 'M1R / M1L 레글런 늘림 기법')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: M1R / M1L 코늘림 손동작 재생</span>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  03
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    소매 분리 &amp; 겨드랑이 감아코 <span className="text-primary font-extrabold">({calc.underarmSts}코)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    양쪽 팔은 별실에 묶어 잠시 쉬게 두고, 몸통만 동그랗게 이어 조끼를 만듭니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-secondary-fixed/50 text-secondary px-3 py-1 rounded-full border border-secondary/20">
                  몸통과 소매 분리일
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  별실(안 쓰는 실) 준비
                </span>
              </div>
            </div>

            {/* 3-Second Concept */}
            <div className="p-3 bg-secondary-fixed/20 rounded-xl border border-secondary/20 text-xs text-on-surface mb-3.5">
              <strong className="text-secondary font-bold block mb-0.5">🎯 이번 단계에서 내가 만드는 것: "조끼 만들기"</strong>
              팔 코들을 안 입는 실에 꿰어 잠시 쉬게 묶어두고, 겨드랑이 밑에 여유 공간(감아코)을 만들어 앞판과 뒤판을 하나로 이어 <strong>완벽한 원통형 조끼</strong>를 만듭니다!
            </div>

            {/* SVG Sleeve Separation Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">call_split</span>
                  <span>STEP 03 구조도: 소매 별실 분리 &amp; 겨드랑이 감아코 연결</span>
                </span>
                <span className="text-xs text-outline font-medium">별실(안 쓰는 실) 필요</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 440 140" className="w-full max-w-[440px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 150 20 L 290 20 L 290 120 L 150 120 Z" fill="rgba(152,65,37,0.05)" stroke="#984125" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="220" y="55" textAnchor="middle" fontSize="13" fontWeight="800" fill="#984125">몸통 원형 연결</text>
                  <text x="220" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill="#655a4e">뒷판 + 앞판 결합 조끼 형태</text>

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

            {/* Granular Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 뒷판 코 겉뜨기 &amp; 오른쪽 소매 별실에 꿰어두기
                </strong>
                <p className="text-on-surface-variant text-xs">
                  시작 마커에서 출발해 뒷판 코들을 쭉 겉뜨기합니다.<br/>
                  오른쪽 소매 코 <strong>{calc.finalSleeveSts}코</strong>가 나오면 돗바늘에 안 쓰는 부드러운 실(별실)을 꿰어 한 코씩 쏙쏙 옮겨 담고, 빠지지 않게 실 끝을 가볍게 묶어둡니다. (소매는 몸통 다 뜨고 나중에 뜰 거예요!)
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  2단계: 오른쪽 겨드랑이에 감아코 {calc.underarmSts}코 만들기
                </strong>
                <p className="text-on-surface-variant text-xs mb-1.5">
                  겨드랑이에 편안한 품을 주기 위해 오른바늘에 <strong>감아코 {calc.underarmSts}코</strong>를 만듭니다.
                </p>
                <div className="p-2.5 bg-primary-fixed/20 rounded-lg text-primary text-[11px] font-medium leading-relaxed">
                  💡 <strong>감아코 3초 완성법 (정말 쉬워요!):</strong><br/>
                  왼손 엄지손가락에 뜨개실을 시계방향으로 1바퀴 감은 뒤, 엄지 아래 생긴 고리에 오른쪽 바늘 끝을 밑에서 위로 쑥 집어넣고 엄지를 뺍니다! 너무 꽉 당기지 말고 여유 있게 감아주세요.
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  3단계: 앞판 겉뜨기 &amp; 왼쪽 소매도 똑같이 하기
                </strong>
                <p className="text-on-surface-variant text-xs">
                  앞판 코들을 끝까지 겉뜨기한 뒤, 왼쪽 소매 코 <strong>{calc.finalSleeveSts}코</strong>도 별실에 옮겨 묶어둡니다.<br/>
                  왼쪽 겨드랑이에도 <strong>감아코 {calc.underarmSts}코</strong>를 만들고 뒷판 첫 코와 연결하면... 끝!
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20 text-xs text-on-surface">
                <strong className="text-emerald-700 font-bold block mb-1">
                  🎯 확인: 이제 바늘에는 몸통 총 {calc.totalFinalBodySts}코만 남았습니다!
                </strong>
                <p className="text-on-surface-variant text-[11px]">
                  바늘이 훨씬 가벼워졌죠? 양쪽 팔 구멍이 뚫린 조끼 모양이 완성되었습니다. 레글런 기둥 코(2코)는 모두 몸통에 포함되어 계산되어 있으니 안심하세요.
                </p>
              </div>
            </div>

            {/* Video Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '소매 분리 및 겨드랑이 감아코 만들기')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 소매 분리 &amp; 감아코 손동작 재생</span>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  04
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    몸통 무한 겉뜨기 힐링 &amp; 밑단 고무단 5cm
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    더 이상 늘림도 줄임도 없이, 원하는 옷 길이가 될 때까지 뱅글뱅글 겉뜨기만 돕니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  힐링 겉뜨기 구간
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  밑단 3.5mm 바늘 교체
                </span>
              </div>
            </div>

            {/* 3-Second Concept */}
            <div className="p-3 bg-primary-fixed/20 rounded-xl border border-primary/20 text-xs text-on-surface mb-3.5">
              <strong className="text-primary font-bold block mb-0.5">🎯 이번 단계에서 내가 만드는 것: "생각 없는 힐링 뜨개 타임"</strong>
              복잡한 계산 끝! 몸통 총 <strong>{calc.totalFinalBodySts}코</strong>로 넷플릭스나 유튜브 보며 뱅글뱅글 겉뜨기만 계속 뜨면 스웨터 몸통이 쑥쑥 자라납니다.
            </div>

            {/* Granular Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 겨드랑이 밑선부터 약 {(calc.bodyLengthCm || 34) - 5}cm 무한 겉뜨기
                </strong>
                <p className="text-on-surface-variant text-xs mb-2">
                  4.5mm 줄바늘로 총 <strong>{calc.totalFinalBodySts}코</strong>를 코 늘림/줄임 없이 겉뜨기로만 뱅글뱅글 돕니다 (약 {calc.bodyRowsEst}단).
                </p>
                <div className="p-2.5 bg-surface-container-low rounded-lg text-xs text-on-surface">
                  💡 <strong>내 키에 딱 맞추는 기장 조절 팁:</strong><br/>
                  <span className="text-on-surface-variant text-[11px]">
                    중간에 옷을 몸에 대보세요! 골반 위에서 끝내면 경쾌한 세미크롭, 바지 벨트선에 닿으면 클래식 정석핏, 엉덩이를 덮으면 루즈핏이 됩니다. 원하는 위치에서 5cm 덜 떴을 때 멈추시면 됩니다!
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  2단계: 3.5mm 바늘로 바꾸고 밑단 1코 고무뜨기 5cm
                </strong>
                <p className="text-on-surface-variant text-xs">
                  원하는 기장 직전에 도달하면, 밑단이 늘어지지 않고 예쁘게 모아지도록 1mm 가는 <strong>3.5mm 바늘로 교체</strong>합니다.<br/>
                  <strong>1코 고무뜨기 (겉뜨기 1, 안뜨기 1)</strong>를 약 <strong>5cm (약 14~16단)</strong> 뜹니다.
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  3단계: 밑단 코막음 (쉬운 길 vs 정석 길)
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-800 font-bold block text-xs mb-0.5">🟢 완전 초보 추천 (가장 쉬운 길)</strong>
                    <p className="text-emerald-950 text-[11px] leading-relaxed">
                      돗바늘 쓰지 마세요! 대바늘로 하는 <strong>일반 겉뜨기 덮어씌워 코막음</strong>을 느슨하게만 해주셔도 충분히 예쁩니다. (골반이 낄 수 있으니 넉넉하게 코를 덮어씌우세요!)
                    </p>
                  </div>
                  <div className="p-2.5 bg-surface-container-low rounded-lg border border-on-surface/[0.08]">
                    <strong className="text-on-surface font-bold block text-xs mb-0.5">🔵 숙련자 정석</strong>
                    <p className="text-on-surface-variant text-[11px] leading-relaxed">
                      기성복처럼 신축성이 뛰어난 마감을 원하시면 돗바늘을 이용한 <strong>이탈리안 바인드오프</strong>를 진행하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Yarn Join Tip */}
            <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-amber-500/20 text-xs text-on-surface-variant my-3.5">
              <strong className="text-amber-700 font-bold block mb-1">💡 새 실 연결할 때 특급 꿀팁</strong>
              <p className="leading-relaxed">
                실 1볼이 끝나서 새 실을 연결할 때는 <strong>절대 옷 앞판 한가운데에서 매듭짓지 마세요!</strong> 옆구리 솔기 위치(겨드랑이 밑선)에서 새 실을 연결해야 옷을 입었을 때 매듭이 보이지 않고 깔끔합니다.
              </p>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '밑단 코막음 기법')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 밑단 코막음 기법 재생</span>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  05
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    양 소매 원형뜨기 &amp; 최종 완성
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    별실에 쉬고 있던 소매 코를 바늘로 데려와 손목까지 떠내려가며 마침내 완성합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  매직루프 or 장갑바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  손목 3.5mm 바늘 교체
                </span>
              </div>
            </div>

            {/* 3-Second Concept */}
            <div className="p-3 bg-primary-fixed/20 rounded-xl border border-primary/20 text-xs text-on-surface mb-3.5">
              <strong className="text-primary font-bold block mb-0.5">🎯 이번 단계에서 내가 만드는 것: "드디어 팔 달기!"</strong>
              조끼에서 쉬고 있던 양쪽 팔을 하나씩 꺼내 손목까지 떠내려가면, 마침내 입을 수 있는 완성형 스웨터가 탄생합니다!
            </div>

            {/* Granular Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 소매 코 바늘에 꿰기 &amp; 겨드랑이 코 줍기
                </strong>
                <p className="text-on-surface-variant text-xs mb-2">
                  별실을 살살 풀면서 소매 코 <strong>{calc.finalSleeveSts}코</strong>를 4.5mm 바늘에 조심스럽게 옮깁니다.<br/>
                  겨드랑이 감아코 <strong>{calc.underarmSts}코</strong>에서 새 실로 코를 주워 총 <strong>{calc.totalInitialSleeveSts}코</strong>로 소매를 원형 연결합니다.
                </p>

                {/* Underarm Hole Fix Alert */}
                <div className="p-2.5 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-800 text-xs">
                  <strong className="font-bold flex items-center gap-1 mb-0.5">
                    <span className="material-symbols-outlined text-[15px]">tips_and_updates</span>
                    <span>⚠️ 초보자 멘붕 방지: 겨드랑이 구멍 100% 안 생기는 비법!</span>
                  </strong>
                  <span className="text-rose-950 text-[11px] leading-relaxed">
                    겨드랑이와 소매 경계 틈새에서 <strong>1코씩 추가로 건져 올린 뒤</strong>, 다음 단을 뜰 때 옆 코와 함께 <strong>2코 모아뜨기(K2tog)</strong>를 해주면 구멍이 마법처럼 싹 사라집니다!
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  2단계: 슬림핏 소매 줄임 공식
                </strong>
                <p className="text-on-surface-variant text-xs mb-2">
                  팔뚝에서 손목으로 내려갈수록 좁아지므로, <strong>{(calc.sleeveDecRows || 8)}단마다 1번씩 양쪽에서 1코씩 줄이기</strong>를 반복합니다.
                </p>
                <div className="p-2.5 bg-surface-container-low rounded-lg font-mono text-[11px] text-on-surface space-y-1">
                  <div>🔹 <strong>줄임단 뜨는 법:</strong> [시작마커] ➔ 겉뜨기 1개 ➔ 오른코 겹쳐뜨기(SSK, 1코 줄임) ➔ 쭉 겉뜨기 ➔ 끝에서 3코 전 2코 모아뜨기(K2tog, 1코 줄임) ➔ 겉뜨기 1개</div>
                  <div>🔹 <strong>평단:</strong> 줄임단 다음 {(calc.sleeveDecRows || 8) - 1}단 동안은 줄임 없이 그냥 편안하게 겉뜨기!</div>
                  <div className="text-primary font-bold">손목 목표 코수(약 {calc.wristSts}코)가 될 때까지 규칙적으로 반복합니다.</div>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  3단계: 손목 1코 고무뜨기 5cm &amp; 코막음
                </strong>
                <p className="text-on-surface-variant text-xs">
                  손목 뼈 위치까지 오면 <strong>3.5mm 바늘로 교체</strong>하고, <strong>1코 고무뜨기 5cm (약 14~16단)</strong>를 뜬 뒤 느슨하게 코막음하여 한쪽 팔을 끝냅니다!
                </p>
              </div>

              <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-emerald-500/20 text-xs">
                <strong className="text-emerald-700 font-bold block mb-1 text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">celebration</span>
                  <span>4단계: 반대쪽 소매 뜨기 &amp; 최종 세탁 블로킹 (완성!)</span>
                </strong>
                <p className="text-on-surface-variant leading-relaxed text-xs">
                  반대쪽 소매도 똑같이 1번 더 떠주면 모든 뜨개가 끝납니다!<br/>
                  남은 꼬리실들을 돗바늘로 편물 안쪽에 쏙쏙 숨겨 잘라냅니다.<br/>
                  미온수에 울샴푸를 풀고 스웨터를 조물조물 가볍게 세탁한 뒤, 수건으로 물기를 꼭 짜서 그늘에 평평하게 펼쳐 말려주면(블로킹) 삐뚤빼뚤했던 코들이 마법처럼 고르고 평평해집니다!<br/>
                  🎉 <strong>축하합니다! 세상에 단 하나뿐인 내 첫 핸드메이드 스웨터가 완성되었습니다!</strong>
                </p>
              </div>
            </div>

            {/* Video Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '소매 매직루프 및 돗바늘 코막음')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 소매 매직루프 &amp; 코막음 재생</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
