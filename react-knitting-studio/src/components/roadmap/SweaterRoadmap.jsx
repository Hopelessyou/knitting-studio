import React, { useState } from 'react';

export default function SweaterRoadmap({ calc, onOpenVideo }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [showCheatSheet, setShowCheatSheet] = useState(true);

  const isVneck = calc.type === 'vneck';
  const isCardigan = calc.type === 'cardigan';
  const isCrew = !isVneck && !isCardigan;

  const steps = [
    {
      id: '1',
      num: '01',
      title: isCrew
        ? '목둘레 코잡기 & 넥밴드 3cm'
        : isVneck
        ? `평면 코잡기 (${calc.castOn}코) & V라인 준비`
        : `앞트임 평면 코잡기 (${calc.castOn}코) & 마커 배분`
    },
    {
      id: '2',
      num: '02',
      title: isCrew
        ? '레글런 어깨 늘림 (M1R/M1L)'
        : isVneck
        ? '레글런 + V사선 늘림 & V점 원형 합체'
        : '평면 왕복 레글런 늘림 (겉늘림/안뜨기)'
    },
    {
      id: '3',
      num: '03',
      title: isCardigan
        ? '소매 분리 & 감아코 (오픈 조끼 만들기)'
        : '소매 분리 & 감아코 (조끼 만들기)'
    },
    {
      id: '4',
      num: '04',
      title: isCardigan
        ? '몸통 평면 왕복뜨기 & 밑단 고무단 5cm'
        : '몸통 무한 겉뜨기 & 밑단 고무단 5cm'
    },
    {
      id: '5',
      num: '05',
      title: isCrew
        ? '양 소매 원형뜨기 & 최종 완성'
        : isVneck
        ? '양 소매 뜨기 & V넥밴드 중심 3코 모아뜨기'
        : `양 소매 뜨기 & 앞섶 단추단(단추구멍 ${calc.buttonCount}개)`
    },
  ];

  const mainTitle = isCrew
    ? '탑다운 라운드넥 레글런 스웨터 완전 초보 제작 설명서'
    : isVneck
    ? '탑다운 V넥 레글런 풀오버 완전 초보 제작 설명서'
    : '탑다운 오픈 레글런 가디건 완전 초보 제작 설명서';

  const subTitle = isCrew
    ? '스웨터의 정석! 목둘레 원형 코잡기부터 넥밴드, 요크, 몸통, 소매까지 이어지는 클래식 탑다운'
    : isVneck
    ? '앞목 V라인 사선 형성 후 원형 합체! 날렵하고 세련된 V넥 밴드와 레글런 풀오버'
    : '앞판이 열려있는 오픈형 클래식 가디건! 평면 왕복 레글런과 단추단(단추구멍) 마감';

  return (
    <section id="roadmap" className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-on-surface/[0.08] shadow-sm mb-8 sm:mb-12">
      {/* 1. Header with Phase Jump Navigation */}
      <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-on-surface/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              <span className="text-[10px] sm:text-xs font-bold text-primary tracking-widest uppercase">
                {isCrew ? 'ROUNDNECK MASTER MANUAL' : isVneck ? 'V-NECK MASTER MANUAL' : 'CARDIGAN MASTER MANUAL'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-serif text-on-surface break-keep">
              {mainTitle}
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5 sm:mt-1 break-keep">
              {subTitle}
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[11px] sm:text-xs font-bold text-primary bg-primary-fixed/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-primary/20 whitespace-nowrap">
              실측 게이지 100% 자동 연산
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-on-surface-variant bg-surface-container-high px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
              총 5대 핵심 공정
            </span>
          </div>
        </div>

        {/* Phase Quick Jump Tabs: 스크롤바 숨김 및 터치 스크롤 최적화 */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            전체 한눈에 보기
          </button>
          {steps.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveTab(s.id)}
              className={`px-3 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
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
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-3 cursor-pointer select-none" onClick={() => setShowCheatSheet(!showCheatSheet)}>
          <div className="flex items-center gap-1.5 sm:gap-2 text-primary font-bold text-xs sm:text-base min-w-0 break-keep">
            <span className="material-symbols-outlined text-[18px] sm:text-[20px] shrink-0">lightbulb</span>
            <span className="truncate sm:whitespace-normal">🌱 {isCrew ? '라운드넥' : isVneck ? 'V넥' : '가디건'} 3분 정복 치트키</span>
          </div>
          <button type="button" className="text-xs text-primary font-bold flex items-center gap-0.5 shrink-0 whitespace-nowrap bg-amber-500/10 px-2 py-1 rounded-full">
            <span>{showCheatSheet ? '접기' : '펼쳐보기'}</span>
            <span className="material-symbols-outlined text-[15px]">{showCheatSheet ? 'expand_less' : 'expand_more'}</span>
          </button>
        </div>

        {showCheatSheet && (
          <div className="space-y-4 pt-1 text-xs sm:text-sm text-on-surface leading-relaxed border-t border-amber-500/10">
            {/* Flow Map */}
            <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
              <strong className="text-primary font-bold block mb-1.5 text-xs">
                🧭 {isCrew ? '라운드넥 스웨터' : isVneck ? 'V넥 스웨터' : '오픈 가디건'} 전체 제작 흐름도
              </strong>
              {isCrew && (
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
              )}
              {isVneck && (
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] sm:text-xs font-semibold text-on-surface">
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">1. 평면 시작 (뒷목+소매+앞목2코)</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">2. 레글런+V사선 늘림 후 V점 합체</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">3. 소매 분리 (조끼 만들기)</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">4. 몸통 원형 겉뜨기</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">5. 소매 &amp; V넥밴드 중심 모아뜨기</span>
                </div>
              )}
              {isCardigan && (
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] sm:text-xs font-semibold text-on-surface">
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">1. 앞트임 평면 시작 (앞판/소매/뒷판)</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">2. 평면 왕복 레글런 늘림</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">3. 소매 분리 (오픈 조끼)</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">4. 몸통 평면 왕복뜨기</span>
                  <span className="text-outline">➔</span>
                  <span className="px-2 py-1 rounded-md bg-primary-fixed/40 text-primary">5. 양 소매 &amp; 단추단(단추구멍 {calc.buttonCount}개)</span>
                </div>
              )}
            </div>

            {/* 3 Green Passes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{isCardigan ? '① 바느질/봉제 스트레스 0%' : isVneck ? '① V넥 파임 계산 걱정 NO' : '① 흔들코가 너무 어렵다면?'}</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-normal">
                  {isCardigan
                    ? '앞판 뒤판을 따로 떠서 꿰매는 구식 방식 대신, 목에서부터 한 장으로 자연스럽게 떠내려가므로 번거로운 옆구리 바느질이 전혀 없습니다!'
                    : isVneck
                    ? '앞판 양쪽 1코로 시작해 레글런 늘림과 함께 겉면에서 1코씩만 늘려주면 자연스러운 V각도가 자동으로 만들어집니다.'
                    : '외계어 같은 흔들코 대신, 평소 하던 일반 코잡기(롱테일)로 시작하세요! 머리가 들어가도록 느슨하게만 잡으면 100% 성공합니다.'}
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{isCardigan ? '② 단추구멍 3초 완성 공식' : isVneck ? '② V점 합체 안심 가이드' : '② 독일식 경사뜨기(GSR) 머리 아프면?'}</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-normal">
                  {isCardigan
                    ? '[바늘비우기(yo) + 2코 모아뜨기(k2tog)] 딱 2동작이면 깔끔하고 튼튼한 단추구멍이 마법처럼 뿅 생깁니다.'
                    : isVneck
                    ? '앞판 코가 목표에 닿으면 감아코 1~2코로 이어 원형으로 합체하면 끝! 이후부터는 일반 스웨터처럼 뱅글뱅글 편안하게 돕니다.'
                    : '초보자는 과감하게 건너뛰고 바로 2단계로 가셔도 예쁜 라운드넥 스웨터가 완성됩니다! 스트레스받지 마세요.'}
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{isCardigan ? '③ 단추단 코줍기 황금 비율' : isVneck ? '③ V넥 밴드 중심 3코 모아뜨기' : '③ 돗바늘 코막음 손 떨리면?'}</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-normal">
                  {isCardigan
                    ? '앞섶 세로선에서 "4단마다 3코 줍기" 비율만 지켜주시면 우글거리거나 당김 없는 백화점급 반듯한 단추단이 완성됩니다.'
                    : isVneck
                    ? 'V자 뾰족한 맨 아래 1코만 마커로 표시해두고, 매 바퀴마다 [중심 3코 모아뜨기]만 해주면 칼각 V라인이 살아납니다.'
                    : '어려운 돗바늘 기법 대신, 대바늘로 하는 일반 겉뜨기 덮어씌워 코막음을 넉넉하게 해주셔도 충분히 튼튼하고 예쁩니다.'}
                </p>
              </div>
            </div>

            {/* Core Hand Actions */}
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
                  {isVneck ? (
                    <span><strong className="text-primary font-bold">CDD (중심 3코 모아뜨기):</strong> 2코를 한꺼번에 겉뜨기 방향으로 거르고, 1코 겉뜨기 후, 걸렀던 2코를 오른바늘 위로 덮어씌우기!</span>
                  ) : isCardigan ? (
                    <span><strong className="text-primary font-bold">단추구멍 (YO + K2tog):</strong> 실을 바늘 앞에 걸치고(바늘비우기), 다음 2코를 한 번에 겉뜨기하여 구멍 만들기!</span>
                  ) : (
                    <span><strong className="text-primary font-bold">마커 (Marker):</strong> 편물을 찌르는 게 아니라 <strong>바늘에 반지처럼 끼워두는</strong> 길잡이.</span>
                  )}
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
          <div className="p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  01
                </span>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface break-keep">
                    {isCrew && (
                      <>목둘레 코잡기 <span className="text-primary font-extrabold">({calc.castOn}코)</span> &amp; 넥밴드 3cm</>
                    )}
                    {isVneck && (
                      <>평면 코잡기 <span className="text-primary font-extrabold">({calc.castOn}코)</span> &amp; V라인 준비</>
                    )}
                    {isCardigan && (
                      <>앞트임 평면 코잡기 <span className="text-primary font-extrabold">({calc.castOn}코)</span> &amp; 마커 배분</>
                    )}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isCrew && '스웨터의 맨 윗부분인 목 구멍(도넛 모양)을 만들고 단정한 넥밴드를 뜹니다.'}
                    {isVneck && 'V넥은 원형으로 잇지 않고 평면으로 시작하여 앞목 V자 사선 파임을 준비합니다.'}
                    {isCardigan && '오픈 가디건은 앞이 트여있으므로 원형이 아닌 평면 왕복뜨기로 시작합니다.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isCrew ? '권장 3.5mm 줄바늘' : '메인 4.5mm 줄바늘'}
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  {isCrew ? '줄길이 40cm (원형)' : '줄길이 60~80cm (평면 왕복)'}
                </span>
              </div>
            </div>

            {/* Easy vs Pro Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                  <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                  <span>🟢 완전 초보 추천 (가장 쉬운 길)</span>
                </div>
                <p className="text-emerald-950 text-[11px] leading-relaxed">
                  {isCrew
                    ? `어려운 흔들코 대신 일반 롱테일 코잡기로 ${calc.castOn}코를 잡으세요! 손가락 하나 들어갈 정도로 약간 느슨하게만 잡아주면 완벽합니다.`
                    : isVneck
                    ? `일반 롱테일 코잡기로 ${calc.castOn}코를 잡으세요. 원형으로 잇지 마시고 평면 상태 그대로 둡니다! (V넥 밴드는 나중에 코를 주워 예쁘게 마감합니다)`
                    : `일반 롱테일 코잡기로 ${calc.castOn}코를 평면으로 넉넉하게 잡으세요. 앞판 좌우, 양 소매, 뒷판이 한 줄에 가지런히 연결됩니다.`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-on-surface/[0.08] text-xs">
                <div className="flex items-center gap-1.5 font-bold text-on-surface mb-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>🔵 {isCrew ? '숙련자 정석 옵션' : '핵심 포인트'}</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  {isCrew
                    ? '기성복 니트처럼 신축성 있는 마감을 원하시면 이탈리안 튜블러(흔들코) 기법을 사용하세요.'
                    : isVneck
                    ? `시작 코수 ${calc.castOn}코 = 뒷목(${calc.backSts}코) + 양 소매(${calc.sleeveSts * 2}코) + 레글런 기둥(8코) + 앞판 양쪽 끝 가장자리(2코)입니다.`
                    : `시작 코수 ${calc.castOn}코 = 뒷판(${calc.backSts}코) + 양 소매(${calc.sleeveSts * 2}코) + 레글런(8코) + 앞판 좌우 각 ${calc.frontLeftSts}코(${calc.frontLeftSts * 2}코)입니다.`}
                </p>
              </div>
            </div>

            {/* SVG Structure Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">gesture</span>
                  <span>STEP 01 구조도: {isCrew ? '넥밴드 원형 코잡기 & 3cm 넥라인' : isVneck ? 'V넥 시작 평면 코배분 (앞판 2코 시작)' : '가디건 앞트임 평면 코배분'}</span>
                </span>
                <span className="text-xs text-outline font-medium">총 {calc.castOn}코 배분</span>
              </div>

              <div className="w-full flex justify-center py-2">
                {isCrew && (
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
                )}

                {isVneck && (
                  <svg viewBox="0 0 460 130" className="w-full max-w-[460px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 40 40 L 120 100 L 230 100 L 340 100 L 420 40" fill="none" stroke="#984125" strokeWidth="3" strokeDasharray="5 3" />
                    <circle cx="40" cy="40" r="10" fill="#fe875d" />
                    <text x="40" y="44" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">앞 1</text>
                    <circle cx="420" cy="40" r="10" fill="#fe875d" />
                    <text x="420" y="44" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">앞 1</text>
                    <rect x="75" y="65" width="85" height="24" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.2" />
                    <text x="117" y="81" textAnchor="middle" fontSize="10" fontWeight="700" fill="#984125">오른소매 {calc.sleeveSts}코</text>
                    <rect x="187" y="85" width="85" height="26" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.5" />
                    <text x="229.5" y="102" textAnchor="middle" fontSize="11" fontWeight="800" fill="#984125">뒷목 {calc.backSts}코</text>
                    <rect x="300" y="65" width="85" height="24" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.2" />
                    <text x="342" y="81" textAnchor="middle" fontSize="10" fontWeight="700" fill="#984125">왼소매 {calc.sleeveSts}코</text>
                    <text x="230" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#984125">
                      V넥 평면 시작 (총 {calc.castOn}코) · 앞목 2코에서 사선 늘림 진행
                    </text>
                  </svg>
                )}

                {isCardigan && (
                  <svg viewBox="0 0 460 130" className="w-full max-w-[460px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <line x1="30" y1="70" x2="430" y2="70" stroke="#984125" strokeWidth="3" strokeDasharray="4 2" />
                    <g transform="translate(25, 45)">
                      <rect width="80" height="34" rx="6" fill="#ffffff" stroke="#a0401c" strokeWidth="1.2" />
                      <text x="40" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">우 앞판</text>
                      <text x="40" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a0401c">{calc.frontLeftSts}코</text>
                    </g>
                    <g transform="translate(115, 45)">
                      <rect width="75" height="34" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.2" />
                      <text x="37.5" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">우 소매</text>
                      <text x="37.5" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#984125">{calc.sleeveSts}코</text>
                    </g>
                    <g transform="translate(198, 40)">
                      <rect width="85" height="40" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.5" />
                      <text x="42.5" y="17" textAnchor="middle" fontSize="10" fontWeight="700" fill="#655a4e">뒷판 (Back)</text>
                      <text x="42.5" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#984125">{calc.backSts}코</text>
                    </g>
                    <g transform="translate(290, 45)">
                      <rect width="75" height="34" rx="6" fill="#ffffff" stroke="#984125" strokeWidth="1.2" />
                      <text x="37.5" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">좌 소매</text>
                      <text x="37.5" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#984125">{calc.sleeveSts}코</text>
                    </g>
                    <g transform="translate(375, 45)">
                      <rect width="80" height="34" rx="6" fill="#ffffff" stroke="#a0401c" strokeWidth="1.2" />
                      <text x="40" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="#655a4e">좌 앞판</text>
                      <text x="40" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a0401c">{calc.frontRightSts}코</text>
                    </g>
                    <text x="230" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#984125">
                      가디건 앞트임 평면 시작 (총 {calc.castOn}코, 레글런 기둥 각 2코 포함)
                    </text>
                  </svg>
                )}
              </div>
            </div>

            {/* Step-by-Step Action List */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: {isCrew ? '3.5mm 40cm 바늘에' : '4.5mm 줄바늘에'} {calc.castOn}코 잡기
                </strong>
                <p className="text-on-surface-variant text-xs">
                  {isCrew && (
                    <>메인 몸통 바늘(4.5mm)보다 1mm 가는 <strong>3.5mm 40cm 줄바늘</strong>을 사용해 {calc.castOn}코를 잡습니다. 너무 빡빡하게 당기지 마시고 부드럽게 코를 만들어주세요.</>
                  )}
                  {isVneck && (
                    <>메인 바늘인 <strong>4.5mm 줄바늘(60~80cm)</strong>에 <strong>{calc.castOn}코</strong>를 만듭니다. 원형으로 잇지 않고 편평한 일자 상태 그대로 둡니다!</>
                  )}
                  {isCardigan && (
                    <>메인 바늘인 <strong>4.5mm 줄바늘(60~80cm)</strong>에 <strong>{calc.castOn}코</strong>를 만듭니다. 앞이 열려있는 오픈형이므로 원형으로 잇지 않습니다.</>
                  )}
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-rose-500/20">
                <strong className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>2단계: {isCrew ? '책상에 내려놓고 꼬임 풀기' : '마커 끼우며 코수 분배하기'}</span>
                </strong>
                <p className="text-on-surface-variant text-xs">
                  {isCrew && '코를 다 잡은 뒤 평평한 책상에 도넛 모양으로 가지런히 펼쳐놓으세요. 바늘에 걸린 코 아래 V자 줄기가 모두 안쪽을 바라보고 있는지 확인하고 첫 코와 마지막 코를 이어야 꼬이지 않습니다!'}
                  {isVneck && (
                    <>
                      바늘에 걸린 코들을 뜨면서 4개의 레글런 기둥(각 2코) 앞뒤에 마커를 걸어줍니다:<br/>
                      [앞판 1코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [오른소매 {calc.sleeveSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [뒷판 {calc.backSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [왼소매 {calc.sleeveSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [앞판 1코]
                    </>
                  )}
                  {isCardigan && (
                    <>
                      바늘에 걸린 코들을 뜨면서 마커를 끼워줍니다:<br/>
                      [우 앞판 {calc.frontLeftSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [우 소매 {calc.sleeveSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [뒷판 {calc.backSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [좌 소매 {calc.sleeveSts}코] ➔ (마커) ➔ [레글런 2코] ➔ (마커) ➔ [좌 앞판 {calc.frontRightSts}코]
                    </>
                  )}
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  3단계: {isCrew ? '원형 연결 후 1코 고무뜨기 3cm' : '1단 안뜨기(WS) 후 레글런 준비'}
                </strong>
                <p className="text-on-surface-variant text-xs">
                  {isCrew && '시작마커(BOR)를 끼우고 [겉뜨기 1, 안뜨기 1]을 번갈아 뜨며 자로 쟀을 때 3cm(약 8~10단)가 될 때까지 돕니다.'}
                  {isVneck && '편물의 안쪽면(WS)은 코 늘림 없이 모든 코를 편안하게 안뜨기로 1단 되돌아옵니다. 이제 2단계에서 본격적인 사선 늘림을 시작합니다!'}
                  {isCardigan && '편물의 안쪽면(WS)은 코 늘림 없이 모든 코를 편안하게 안뜨기로 1단 되돌아옵니다. 마커가 나오면 오른쪽 바늘로 넘겨주기만 하세요.'}
                </p>
              </div>
            </div>

            {/* Video Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', isCrew ? '이탈리안 튜브 코잡기 (흔들코)' : '대바늘 롱테일 코잡기 & 마커 걸기')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: {isCrew ? '튜브 코잡기 & 1코 고무단 재생' : '기초 코잡기 & 마커 걸기 영상 재생'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 02 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '2') && (
          <div className="p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  02
                </span>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface break-keep">
                    {isCrew && (
                      <>마커 배분 &amp; 레글런 사선 늘림 <span className="text-primary font-extrabold">({calc.neededIncreases}회 반복)</span></>
                    )}
                    {isVneck && (
                      <>레글런 + V넥 사선 늘림 &amp; V점 합체 <span className="text-primary font-extrabold">({calc.vneckDepthCm}cm 깊이)</span></>
                    )}
                    {isCardigan && (
                      <>평면 왕복 레글런 늘림 <span className="text-primary font-extrabold">({calc.neededIncreases}회 반복)</span></>
                    )}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isCrew && '어깨선 4곳을 대각선으로 점점 넓혀가며 앞판, 뒤판, 양쪽 팔 공간을 만듭니다.'}
                    {isVneck && '레글런 4선 늘림과 함께 앞목 양끝에서도 1코씩 늘려 V라인을 만들고 원형으로 잇습니다.'}
                    {isCardigan && '앞섶이 열린 상태로 겉면에서는 레글런 코늘림, 안면에서는 안뜨기를 반복합니다.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  메인 4.5mm 줄바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  {isCrew ? '원형뜨기' : isVneck ? '평면 왕복 ➔ V점 원형 합체' : '평면 왕복뜨기'}
                </span>
              </div>
            </div>

            {/* 3-Second Concept */}
            <div className="p-3 bg-primary-fixed/20 rounded-xl border border-primary/20 text-xs text-on-surface mb-3.5">
              <strong className="text-primary font-bold block mb-0.5">🎯 이번 단계에서 내가 만드는 것:</strong>
              {isCrew && '목 구멍에서 4개의 레글런 선을 따라 코를 늘려가며 티셔츠처럼 앞판·뒤판과 양쪽 소매 판을 만듭니다!'}
              {isVneck && (
                <>앞목이 시원하게 파인 V자 모양을 만들면서 어깨를 넓혀가고, V자 깊이(약 {calc.vneckDepthCm}cm)에 도달하면 양쪽을 하나로 모아 <strong>완전한 풀오버 원형</strong>으로 결합합니다!</>
              )}
              {isCardigan && '단추로 여미는 오픈 가디건을 위해, 앞섶이 열린 상태를 유지하며 어깨와 가슴둘레를 넓혀가는 평면 레글런 공정입니다!'}
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              {isCrew && (
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                  <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                    🔹 마법의 2단 반복 공식 (이것만 {calc.neededIncreases}번 반복하면 어깨 끝!)
                  </strong>
                  <div className="space-y-2 text-xs text-on-surface-variant mt-1.5">
                    <div className="p-2.5 rounded-lg bg-primary-fixed/20 text-on-surface">
                      <strong className="text-primary font-bold block mb-0.5">1단 (늘림단: 1바퀴 돌면 총 8코 늘어남)</strong>
                      4개의 레글런 기둥(2코)마다:
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                        <li>기둥 2코 직전: <strong>M1R (오른쪽 늘림)</strong> 1코</li>
                        <li>기둥 2코는 그냥 <strong>겉뜨기</strong></li>
                        <li>기둥 2코 직후: <strong>M1L (왼쪽 늘림)</strong> 1코</li>
                        <li>나머지 코들은 모두 편하게 <strong>겉뜨기</strong></li>
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-high text-on-surface">
                      <strong className="font-bold block mb-0.5">2단 (쉬어가는 평단)</strong>
                      코 늘림 없이, 모든 코를 그냥 편안하게 <strong>겉뜨기로만 1바퀴</strong> 돕니다!
                    </div>
                    <p className="text-primary font-bold text-[11px]">
                      🔁 이 [1단(늘림) ➔ 2단(평단)] 세트를 총 <strong>{calc.neededIncreases}회 반복</strong> (총 {calc.yokeRows}단) 합니다!
                    </p>
                  </div>
                </div>
              )}

              {isVneck && (
                <div className="space-y-3">
                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                    <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                      1단계: V사선 늘림 + 레글런 동시 진행 (겉면 늘림, 안면 안뜨기)
                    </strong>
                    <div className="space-y-2 text-xs text-on-surface-variant mt-1.5">
                      <div className="p-2.5 rounded-lg bg-primary-fixed/20 text-on-surface">
                        <strong className="text-primary font-bold block mb-0.5">🔹 겉면(RS) 늘림단:</strong>
                        <ul className="list-disc list-inside space-y-1 text-[11px]">
                          <li>첫 코 겉뜨기 1 ➔ <strong>M1R(오른쪽 늘림 1)</strong> (앞목 오른쪽 사선 늘림!)</li>
                          <li>4개 레글런 기둥 양옆에서 <strong>M1R / M1L (8코 늘림)</strong> 진행</li>
                          <li>마지막 1코 직전: <strong>M1L(왼쪽 늘림 1)</strong> ➔ 마지막 코 겉뜨기 1 (앞목 왼쪽 사선 늘림!)</li>
                          <li>👉 한 단에서 총 10코가 늘어납니다!</li>
                        </ul>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-high text-on-surface">
                        <strong className="font-bold block mb-0.5">🔹 안쪽면(WS) 평단:</strong>
                        코 늘림 없이, 모든 코를 편안하게 <strong>안뜨기(Purl)</strong>로 쭉 돌아옵니다.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
                    <strong className="text-emerald-700 font-bold text-xs sm:text-sm block mb-1">
                      2단계: V점 도달 시 원형으로 합체! (약 {calc.vneckDepthCm}cm 깊이, {calc.vneckJoinRow}단)
                    </strong>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      사선 늘림을 반복하여 앞목 깊이가 <strong>약 {calc.vneckDepthCm}cm</strong>에 도달하면 V점 완성!<br/>
                      겉면을 뜰 때 앞판 양쪽 끝 코를 마주 보게 한 뒤, 사이에 <strong>감아코 1코</strong>를 만들어 첫 코와 이어 <strong>원형으로 연결(BOR)</strong>합니다.<br/>
                      이후 남은 요크 단수({calc.yokeRows - calc.vneckJoinRow}단)는 일반 스웨터처럼 원형으로 겉뜨기하며 요크 깊이({calc.yokeDepthCm}cm)까지 도달합니다.
                    </p>
                  </div>
                </div>
              )}

              {isCardigan && (
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                  <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                    🔹 가디건 평면 왕복 레글런 공식 ({calc.neededIncreases}회 반복)
                  </strong>
                  <div className="space-y-2 text-xs text-on-surface-variant mt-1.5">
                    <div className="p-2.5 rounded-lg bg-primary-fixed/20 text-on-surface">
                      <strong className="text-primary font-bold block mb-0.5">1단 (겉면 RS - 늘림단):</strong>
                      <p className="text-[11px] leading-relaxed">
                        모든 코는 <strong>겉뜨기</strong>로 진행하며, 4개의 레글런 기둥(2코) 직전과 직후에만 <strong>M1R / M1L 늘림</strong>을 해줍니다 (총 8코 증가). 양쪽 앞섶 끝은 열린 상태 그대로 평평하게 뜹니다.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-high text-on-surface">
                      <strong className="font-bold block mb-0.5">2단 (안면 WS - 평단):</strong>
                      <p className="text-[11px] leading-relaxed">
                        편물을 뒤집어 안쪽면을 봅니다. 코 늘림 없이 모든 코를 <strong>안뜨기(Purl)</strong>로 쭉 돌아옵니다!
                      </p>
                    </div>
                    <p className="text-primary font-bold text-[11px]">
                      🔁 이 [겉면 늘림단 ➔ 안면 안뜨기단]을 총 <strong>{calc.neededIncreases}회 반복</strong> (총 {calc.raglanRows}단) 합니다!
                    </p>
                  </div>
                </div>
              )}

              {/* M1R / M1L 3-Second Action Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs">
                  <strong className="text-primary font-bold block mb-1">💡 M1R (오른쪽 늘림) 3초 비법: "뒤앞앞"</strong>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">
                    1. 가로줄을 왼바늘로 <strong>뒤에서 앞으로</strong> 푹 찔러 올립니다.<br/>
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
          <div className="p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  03
                </span>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface break-keep">
                    소매 분리 &amp; 겨드랑이 감아코 <span className="text-primary font-extrabold">({calc.underarmSts}코)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isCardigan
                      ? '양쪽 소매 코는 별실에 쉬게 두고, 겨드랑이에 감아코를 만들어 오픈 조끼를 만듭니다.'
                      : '양쪽 소매 코는 별실에 쉬게 두고, 겨드랑이에 감아코를 만들어 원통형 조끼를 만듭니다.'}
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

            {/* Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              {!isCardigan ? (
                <>
                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                    <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                      1단계: 뒷판 코 겉뜨기 &amp; 오른쪽 소매 별실에 꿰어두기
                    </strong>
                    <p className="text-on-surface-variant text-xs">
                      시작 마커에서 출발해 뒷판 코들을 쭉 겉뜨기합니다.<br/>
                      오른쪽 소매 코 <strong>{calc.finalSleeveSts}코</strong>가 나오면 돗바늘에 별실을 꿰어 한 코씩 옮겨 담고 가볍게 묶어둡니다.
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
                      💡 <strong>감아코 3초 완성법:</strong> 왼손 엄지에 실을 감아 생긴 고리에 바늘을 쏙 집어넣고 엄지를 뺍니다!
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                    <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                      3단계: 앞판 겉뜨기 &amp; 왼쪽 소매도 똑같이 하기
                    </strong>
                    <p className="text-on-surface-variant text-xs">
                      앞판 코들을 겉뜨기한 뒤, 왼쪽 소매 코 <strong>{calc.finalSleeveSts}코</strong>도 별실에 옮겨 묶고, 왼쪽 겨드랑이에 <strong>감아코 {calc.underarmSts}코</strong>를 만듭니다.<br/>
                      이제 바늘에는 몸통 총 <strong>{calc.totalFinalBodySts}코</strong>만 남습니다!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                    <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                      1단계: 우 앞판 겉뜨기 &amp; 우 소매 별실 분리
                    </strong>
                    <p className="text-on-surface-variant text-xs">
                      우 앞판 코를 겉뜨기한 뒤, 우 소매 <strong>{calc.finalSleeveSts}코</strong>를 별실에 옮겨 묶어둡니다.<br/>
                      오른쪽 겨드랑이에 <strong>감아코 {calc.underarmSts}코</strong>를 만듭니다.
                    </p>
                  </div>

                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                    <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                      2단계: 뒷판 겉뜨기 &amp; 좌 소매 별실 분리
                    </strong>
                    <p className="text-on-surface-variant text-xs">
                      뒷판 코를 쭉 겉뜨기한 뒤, 좌 소매 <strong>{calc.finalSleeveSts}코</strong>도 별실에 옮겨 묶어둡니다.<br/>
                      왼쪽 겨드랑이에 <strong>감아코 {calc.underarmSts}코</strong>를 만듭니다.
                    </p>
                  </div>

                  <div className="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
                    <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                      3단계: 좌 앞판 겉뜨기 (오픈 조끼 형태 완성!)
                    </strong>
                    <p className="text-on-surface-variant text-xs">
                      남은 좌 앞판 코를 끝까지 겉뜨기합니다.<br/>
                      앞판 양쪽이 트여있는 상태 그대로, 바늘에 몸통 총 <strong>{calc.totalFinalBodySts}코</strong>가 남은 멋진 오픈 조끼가 탄생합니다!
                    </p>
                  </div>
                </>
              )}
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
          <div className="p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  04
                </span>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface break-keep">
                    {isCardigan ? '몸통 평면 왕복뜨기 & 밑단 고무단 5cm' : '몸통 무한 겉뜨기 힐링 & 밑단 고무단 5cm'}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isCardigan
                      ? '겉면 겉뜨기, 안면 안뜨기로 왕복하며 원하는 기장까지 뜬 뒤 밑단을 마감합니다.'
                      : '더 이상 늘림도 줄임도 없이, 원하는 옷 길이가 될 때까지 뱅글뱅글 겉뜨기만 돕니다.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isCardigan ? '평면 메리야스 왕복' : '힐링 겉뜨기 구간'}
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  밑단 3.5mm 바늘 교체
                </span>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 겨드랑이 밑선부터 약 {(calc.bodyLengthCm || 34) - 5}cm 직진
                </strong>
                <p className="text-on-surface-variant text-xs mb-2">
                  {!isCardigan ? (
                    <>4.5mm 줄바늘로 총 <strong>{calc.totalFinalBodySts}코</strong>를 코 늘림/줄임 없이 겉뜨기로만 뱅글뱅글 돕니다 (약 {calc.bodyRowsEst}단).</>
                  ) : (
                    <>4.5mm 줄바늘로 총 <strong>{calc.totalFinalBodySts}코</strong>를 겉면에서는 겉뜨기, 안쪽면에서는 안뜨기로 평면 왕복뜨기합니다 (약 {calc.bodyRowsEst}단).</>
                  )}
                </p>
                <div className="p-2.5 bg-surface-container-low rounded-lg text-xs text-on-surface">
                  💡 <strong>내 키에 딱 맞추는 기장 조절 팁:</strong><br/>
                  <span className="text-on-surface-variant text-[11px]">
                    중간에 옷을 몸에 대보세요! 원하는 최종 완성 위치에서 <strong>5cm 덜 떴을 때</strong> 멈추시면 됩니다 (밑단 고무단 5cm가 추가되기 때문입니다).
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  2단계: 3.5mm 바늘로 바꾸고 밑단 1코 고무뜨기 5cm
                </strong>
                <p className="text-on-surface-variant text-xs">
                  밑단이 늘어지지 않고 단정하게 모아지도록 <strong>3.5mm 바늘로 교체</strong>합니다.<br/>
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
                      대바늘로 하는 <strong>일반 겉뜨기 덮어씌워 코막음</strong>을 넉넉하고 느슨하게 해주셔도 충분히 예쁩니다!
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

            {/* Video Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '밑단 코막음 기법')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 밑단 코막음 손동작 재생</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 05 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '5') && (
          <div className="p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  05
                </span>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-on-surface break-keep">
                    {isCrew && '양 소매 원형뜨기 & 최종 완성'}
                    {isVneck && '양 소매 뜨기 & V넥밴드 중심 3코 모아뜨기(CDD)'}
                    {isCardigan && `양 소매 뜨기 & 앞섶 단추단(단추구멍 ${calc.buttonCount}개)`}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isCrew && '별실에 쉬고 있던 소매 코를 데려와 손목까지 떠내려가며 마침내 완성합니다.'}
                    {isVneck && '양쪽 소매를 완성한 후, V넥라인 코를 주워 중심 3코 모아뜨기로 칼각 V넥밴드를 만듭니다.'}
                    {isCardigan && '양쪽 소매를 완성한 후, 앞섶 세로선을 따라 코를 주워 단추단과 단추구멍을 만듭니다.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  매직루프 or 장갑바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  마감 3.5mm 바늘 교체
                </span>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06]">
                <strong className="text-primary font-bold text-xs sm:text-sm block mb-1">
                  1단계: 소매 코 바늘에 꿰기 &amp; 겨드랑이 코 줍기
                </strong>
                <p className="text-on-surface-variant text-xs mb-2">
                  별실을 살살 풀면서 소매 코 <strong>{calc.finalSleeveSts}코</strong>를 4.5mm 바늘에 옮깁니다.<br/>
                  겨드랑이 감아코 <strong>{calc.underarmSts}코</strong>에서 새 실로 코를 주워 총 <strong>{calc.totalInitialSleeveSts}코</strong>로 소매를 원형 연결합니다.
                </p>
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
                  <div>🔹 <strong>줄임단 뜨는 법:</strong> [시작마커] ➔ 겉뜨기 1 ➔ 오른코 겹쳐뜨기(SSK, 1코 줄임) ➔ 쭉 겉뜨기 ➔ 끝에서 3코 전 2코 모아뜨기(K2tog, 1코 줄임) ➔ 겉뜨기 1</div>
                  <div>🔹 <strong>평단:</strong> 줄임단 다음 {(calc.sleeveDecRows || 8) - 1}단 동안은 줄임 없이 편안하게 겉뜨기!</div>
                  <div className="text-primary font-bold">손목 목표 코수(약 {calc.wristSts}코)가 될 때까지 반복한 뒤 3.5mm 바늘로 1코 고무단 5cm 후 코막음합니다. (반대쪽 소매도 동일)</div>
                </div>
              </div>

              {/* V-neck Specific Step */}
              {isVneck && (
                <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-primary/30">
                  <strong className="text-primary font-bold text-xs sm:text-sm block mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px]">straighten</span>
                    <span>3단계: V넥 밴드 코줍기 &amp; 중심 3코 모아뜨기 (CDD)</span>
                  </strong>
                  <div className="text-xs text-on-surface-variant space-y-2 mt-1">
                    <p>
                      양 소매를 모두 완성한 뒤, 3.5mm 40cm 줄바늘로 V넥 가장자리를 따라 <strong>4단마다 3코 비율</strong>로 코를 고르게 줍습니다.<br/>
                      V자 맨 아래 꼭짓점 1코에 <strong>'중심 마커'</strong>를 끼웁니다.
                    </p>
                    <div className="p-2.5 bg-primary-fixed/20 rounded-lg text-primary text-[11px]">
                      <strong>💡 중심 3코 모아뜨기 (CDD) 손동작:</strong><br/>
                      1. V점 중심 코와 바로 앞 코(총 2코)를 한꺼번에 겉뜨기 방향으로 오른바늘로 거릅니다.<br/>
                      2. 다음 1코를 겉뜨기합니다.<br/>
                      3. 걸렀던 2코를 오른바늘 코 위로 한꺼번에 덮어씌웁니다!<br/>
                      👉 1코 고무뜨기(겉1, 안1)를 돌 때마다 중심 마커 위치에서 이 동작을 반복하면 V자가 늘어지지 않고 칼처럼 반듯하게 모입니다. 약 2.5~3cm (8~10단) 뜬 뒤 코막음합니다!
                    </div>
                  </div>
                </div>
              )}

              {/* Cardigan Specific Step */}
              {isCardigan && (
                <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-primary/30">
                  <strong className="text-primary font-bold text-xs sm:text-sm block mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px]">radio_button_checked</span>
                    <span>3단계: 앞섶 단추단(버튼밴드) 코줍기 &amp; 단추구멍 {calc.buttonCount}개 만들기</span>
                  </strong>
                  <div className="text-xs text-on-surface-variant space-y-2 mt-1">
                    <p>
                      3.5mm 긴 줄바늘로 <strong>우 앞판 가장자리 ➔ 뒷목둘레 ➔ 좌 앞판 가장자리</strong>를 따라 코를 줍습니다 (약 {calc.buttonbandPickSts}코, 4단마다 3코 줍기 비율).<br/>
                      평면으로 1코 고무뜨기 3단을 뜹니다.
                    </p>
                    <div className="p-2.5 bg-primary-fixed/20 rounded-lg text-primary text-[11px]">
                      <strong>💡 4단째: 단추구멍단 ([바늘비우기 yo + 2코 모아뜨기 k2tog])</strong><br/>
                      단추구멍 위치(약 {calc.buttonSpacingCm}cm 간격, 총 {calc.buttonCount}곳)에서 <strong>[실을 바늘 앞에 걸치고(yo) ➔ 다음 2코를 함께 겉뜨기(k2tog)]</strong>를 해줍니다!<br/>
                      5~7단은 다시 1코 고무뜨기를 뜨고, 8단째에 느슨하게 덮어씌워 코막음합니다.<br/>
                      반대쪽 앞섶에 직경 20~25mm 단추 {calc.buttonCount}개를 달아주면 완벽합니다!
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-emerald-500/20 text-xs">
                <strong className="text-emerald-700 font-bold block mb-1 text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">celebration</span>
                  <span>최종 완성: 실밥 정리 &amp; 세탁 블로킹 (Blocking)</span>
                </strong>
                <p className="text-on-surface-variant leading-relaxed text-xs">
                  남은 꼬리실들을 돗바늘로 편물 안쪽에 쏙쏙 숨겨 잘라냅니다.<br/>
                  미온수에 울샴푸를 풀고 스웨터를 조물조물 가볍게 세탁한 뒤, 수건으로 물기를 꼭 짜서 그늘에 평평하게 펼쳐 말려주면(블로킹) 삐뚤빼뚤했던 코들이 고르고 평평해집니다!<br/>
                  🎉 <strong>축하합니다! 세상에 단 하나뿐인 내 첫 핸드메이드 {isCrew ? '스웨터' : isVneck ? 'V넥 스웨터' : '가디건'}가 완성되었습니다!</strong>
                </p>
              </div>
            </div>

            {/* Video Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', isVneck ? 'V넥 코줍기 및 중심 3코 모아뜨기' : isCardigan ? '가디건 단추단 코줍기 및 단추구멍' : '소매 매직루프 및 돗바늘 코막음')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: {isVneck ? 'V넥밴드 코줍기 & CDD 영상 재생' : isCardigan ? '가디건 단추단 & 단추구멍 영상 재생' : '소매 매직루프 & 코막음 재생'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
