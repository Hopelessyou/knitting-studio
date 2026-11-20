import React, { useState } from 'react';
import StepProgressTracker from './StepProgressTracker';

export default function BeanieRoadmap({ calc, onOpenVideo, currentUser, onOpenAuthModal }) {
  const [activeTab, setActiveTab] = useState('all');

  const steps = [
    { id: '1', num: '01', title: '40cm 줄바늘 코잡기 & 원형 연결' },
    { id: '2', num: '02', title: `립 접단(Brim) ${calc.brimHeightCm}cm` },
    { id: '3', num: '03', title: `바디 직진 (${calc.crownStartHeightCm}cm)` },
    { id: '4', num: '04', title: '8등분 왕관 정수리 줄임' },
    { id: '5', num: '05', title: '돗바늘 조임 & 마무리 블로킹' },
  ];

  const styleTitle = calc.style === 'watchcap'
    ? '레옹 피셔맨 숏 와치캡 실전 도안'
    : calc.style === 'slouchy'
    ? '루즈 드레이프 슬라우치 비니 실전 도안'
    : '클래식 폴딩 리브 비니 실전 도안';

  return (
    <section id="roadmap" className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-on-surface/[0.08] shadow-sm mb-12">
      {/* 1. Header */}
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
              {styleTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-3 py-1.5 rounded-full border border-primary/20">
              머리둘레 {calc.headCirc}cm 맞춤
            </span>
            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full">
              총 {calc.castOn}코 · 8등분 무봉제 원형 공식
            </span>
          </div>
        </div>

        {/* Phase Navigator */}
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

            {/* 🌟 Beginner 3-Minute Cheat Sheet Banner */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-2xs">
        <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base mb-3">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          <span>🌱 완전 초보자를 위한 비니 3분 정복 치트키 (시작 전 필독!)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-on-surface">
          <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
            <strong className="text-emerald-700 font-bold block mb-1">① 독일식 코잡기 어렵다면?</strong>
            <p className="text-on-surface-variant text-[11px] leading-normal">
              평소 하던 <strong>일반 코잡기(롱테일)</strong>로 하셔도 비니는 충분히 잘 늘어납니다! 단, 이마가 조이지 않게 <strong>느슨하게만</strong> 잡으세요.
            </p>
          </div>
          <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
            <strong className="text-emerald-700 font-bold block mb-1">② 정수리 줄임(K2tog)이란?</strong>
            <p className="text-on-surface-variant text-[11px] leading-normal">
              어려운 기호가 아니에요! <strong>2코를 한꺼번에 찔러서 겉뜨기</strong>를 하면 2코가 1코로 줄어들며 예쁜 모자 정수리가 완성됩니다.
            </p>
          </div>
          <div className="p-3 bg-surface-container-lowest rounded-xl border border-emerald-500/20">
            <strong className="text-emerald-700 font-bold block mb-1">③ 정수리 마무리는 복주머니!</strong>
            <p className="text-on-surface-variant text-[11px] leading-normal">
              마지막에 남은 코들에 돗바늘로 실을 통과시켜 <strong>복주머니 끈 당기듯 쏙 오므려주면</strong> 감쪽같이 마감됩니다.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* ========================================================================= */}
        {/* STEP 01 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '1') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  01
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    40cm 줄바늘 신축성 코잡기 <span className="text-primary font-extrabold">({calc.castOn}코)</span> &amp; 원형 연결
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    이마 압박 없는 독일식 꼬아 코잡기(German Twisted)와 꼬임 방지 정렬
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  권장 3.5~4.0mm 바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  줄길이 40cm 쇼티
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
                  독일식 꼬아 코잡기 영상 보며 헤매지 마세요! <strong>일반 코잡기</strong>로 {calc.castOn}코를 잡으셔도 100% 예쁜 비니가 완성됩니다. 단, 이마가 편하도록 <strong>느슨하게</strong>만 잡아주세요!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-on-surface/[0.08] text-xs">
                <div className="flex items-center gap-1.5 font-bold text-on-surface mb-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>🔵 숙련자 정석 옵션</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  이마 압박 없이 탄성이 뛰어난 <strong>독일식 꼬아 코잡기(German Twisted)</strong>를 사용하세요.
                </p>
              </div>
            </div>

            {/* SVG Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">gesture</span>
                  <span>STEP 01 구조도: 40cm 쇼티 원형 코잡기 &amp; 시작마커(BOR) 세팅</span>
                </span>
                <span className="text-xs text-outline font-medium">8의 배수 ({calc.castOn}코)</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 420 110" className="w-full max-w-[420px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="210" cy="55" rx="140" ry="36" fill="rgba(152,65,37,0.04)" stroke="#984125" strokeWidth="2.5" />
                  <path d="M 70 55 C 70 20, 350 20, 350 55" fill="none" stroke="#dcc1b9" strokeWidth="3" strokeDasharray="5 4" />
                  <line x1="70" y1="55" x2="105" y2="45" stroke="#984125" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="70" y1="55" x2="105" y2="65" stroke="#984125" strokeWidth="4.5" strokeLinecap="round" />
                  <circle cx="70" cy="55" r="7" fill="#fe875d" />
                  <text x="70" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">BOR</text>
                  <text x="210" y="52" textAnchor="middle" fontSize="13" fontWeight="800" fill="#984125">
                    시작 총 {calc.castOn}코
                  </text>
                  <text x="210" y="70" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#655a4e">
                    독일식 꼬아 코잡기 ➔ 꼬임 없이 원형 연결
                  </text>
                </svg>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 독일식 꼬아 코잡기 (German Twisted Cast-on)</strong>: 일반 롱테일 코잡기는 이마에 착용했을 때 탄력이 부족해 조이거나 이마에 자국이 남을 수 있습니다. <strong>신축성이 1.5배 뛰어난 독일식 꼬아 코잡기</strong>로 총 <strong><span className="font-bold text-primary">{calc.castOn}코</span></strong>를 잡습니다.
              </p>
              <p>
                <strong>2. 꼬임 방지 테이블 정렬</strong>: 바늘에 걸린 모든 코의 아랫단 땋은 선이 바늘 안쪽을 향하도록 테이블에 가지런히 펼쳐놓고 꼬임이 없는지 꼼꼼히 확인합니다.
              </p>
              <p>
                <strong>3. 시작 마커(BOR) 걸기</strong>: 첫 코와 마지막 코를 이어 원형으로 연결할 때, 라운드의 시작점을 명확히 알 수 있도록 <strong>시작 단수링(BOR 마커)</strong>을 오른바늘에 걸어줍니다.
              </p>
            </div>

            {/* Video Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '독일식 꼬아 코잡기 (German Twisted)')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 독일식 꼬아 코잡기 재생</span>
              </button>
            </div>

            {/* Step 1 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="beanie_step_1" targetRows={1} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 02 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '2') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  02
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    립 접단(Brim) 직진 뜨기 <span className="text-primary font-extrabold">({calc.brimHeightCm}cm)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {calc.style === 'watchcap' ? '힙한 귀 위 숏 와치 롤업' : calc.style === 'slouchy' ? '이마를 가볍게 감싸는 심플 립' : '도톰하고 클래식한 7cm 접단 폴딩'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {calc.ribName}
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 밑단 고무단 선택 &amp; 직진</strong>: {calc.ribName}로 <strong>{calc.brimHeightCm * (calc.style === 'classic' || calc.style === 'watchcap' ? 2 : 1)}cm</strong> 높이까지 증감 없이 원형으로 직진합니다.
              </p>
              <p>
                <strong>2. 손장력 유지 비결</strong>: 고무단이 헐렁거리면 착용할수록 모자가 머리에서 흘러내립니다. 특히 안뜨기를 뜰 때 실을 살짝 바짝 당겨 타이트한 탄력감을 부여하세요.
              </p>
            </div>

            {/* Style Spec Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className={`p-4 rounded-xl border text-xs ${calc.style === 'classic' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-lowest border-on-surface/[0.08]'}`}>
                <strong className="text-primary font-bold block mb-1 text-sm">클래식 폴딩 비니 (7cm)</strong>
                <p className="text-on-surface-variant leading-relaxed">총 14cm 떠서 7cm 턴업 폴딩. 보온성과 형태 안정성이 가장 뛰어납니다.</p>
              </div>
              <div className={`p-4 rounded-xl border text-xs ${calc.style === 'watchcap' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-lowest border-on-surface/[0.08]'}`}>
                <strong className="text-primary font-bold block mb-1 text-sm">숏 와치캡 (4cm)</strong>
                <p className="text-on-surface-variant leading-relaxed">총 8cm 떠서 4cm 숏 롤업. 귀가 훤히 드러나는 트렌디 피셔맨 룩 완성.</p>
              </div>
              <div className={`p-4 rounded-xl border text-xs ${calc.style === 'slouchy' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-lowest border-on-surface/[0.08]'}`}>
                <strong className="text-primary font-bold block mb-1 text-sm">슬라우치 드레이프 (3cm)</strong>
                <p className="text-on-surface-variant leading-relaxed">접단 없이 3~4cm만 짧게 뜨고 바로 메리야스로 전환하여 자연스러운 처짐 유도.</p>
              </div>
            </div>

            {/* Video Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenVideo('1v3x4a5b6c', '고무단 탄력있게 뜨는 요령')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 고무단 탄력 유지 재생</span>
              </button>
            </div>

            {/* Step 2 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="beanie_step_2" targetRows={Math.round(calc.brimHeightCm * 2.4)} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 03 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '3') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  03
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    바디 직진 원형뜨기 <span className="text-primary font-extrabold">(정수리 줄임 시작선: {calc.crownStartHeightCm}cm / {calc.crownStartRows}단)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    줄임 돌입 전까지 편안한 메리야스 직진 궤도 및 중간 피팅
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  직진 목표 {calc.crownStartHeightCm}cm
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 무늬 직진 &amp; 단수 계측</strong>: 밑단을 접은 기준(또는 슬라우치는 시작단 기준)으로 모자 총 높이가 <strong>{calc.crownStartHeightCm}cm (약 {calc.crownStartRows}단)</strong>이 될 때까지 편안하게 원형뜨기로 직진합니다.
              </p>
              <p>
                <strong>2. 중간 피팅(Fitting) 타이밍</strong>: 머리에 가볍게 얹어보아, 정수리 끝까지 <strong>약 4~5cm 여유</strong>가 남았을 때가 바로 정수리 줄임(Crown Shaping)에 돌입할 최적의 순간입니다.
              </p>
            </div>

            <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs text-on-surface-variant flex flex-col gap-1.5 my-3">
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-[17px]">straighten</span>
                <span>정확한 높이 측정 요령</span>
              </div>
              <p className="leading-relaxed">
                바늘에 걸려 있는 편물을 억지로 아래로 잡아당기지 말고, 평평한 바닥에 내려놓은 자연스러운 상태에서 줄자로 밑단부터 바늘 아래까지 측정하세요.
              </p>
            </div>

            {/* Step 3 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="beanie_step_3" targetRows={calc.crownStartRows} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 04 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '4') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  04
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    8등분 왕관 정수리 줄임 공식 <span className="text-primary font-extrabold">(소라빵/고깔 100% 방지)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    마커 8개로 분배하여 한 바퀴에 정확히 8코씩 균등 축소
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  마커 간격 {calc.wedgeSts}코
                </span>
              </div>
            </div>

            {/* SVG 8-Wedge Crown Radial Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">pie_chart</span>
                  <span>STEP 04 구조도: 8등분 방사형 왕관 줄임 평면도</span>
                </span>
                <span className="text-xs text-outline font-medium">8방향 대칭 수렴</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 360 200" className="w-full max-w-[360px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer circle */}
                  <circle cx="180" cy="100" r="85" fill="rgba(152,65,37,0.03)" stroke="#dcc1b9" strokeWidth="2" strokeDasharray="4 3" />
                  {/* Inner cinch circle */}
                  <circle cx="180" cy="100" r="24" fill="#ffffff" stroke="#984125" strokeWidth="2.5" />
                  <text x="180" y="98" textAnchor="middle" fontSize="9" fontWeight="700" fill="#984125">남은 코</text>
                  <text x="180" y="110" textAnchor="middle" fontSize="11" fontWeight="800" fill="#984125">16코</text>

                  {/* 8 Radial lines */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                    const rad = (deg * Math.PI) / 180;
                    const x1 = 180 + Math.cos(rad) * 24;
                    const y1 = 100 + Math.sin(rad) * 24;
                    const x2 = 180 + Math.cos(rad) * 85;
                    const y2 = 100 + Math.sin(rad) * 85;
                    return (
                      <g key={deg}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#984125" strokeWidth="2" strokeLinecap="round" />
                        <circle cx={x2} cy={y2} r="5" fill="#fe875d" />
                      </g>
                    );
                  })}
                  <text x="180" y="195" textAnchor="middle" fontSize="11" fontWeight="700" fill="#655a4e">
                    마커 8개 분배 ➔ 2단마다 [겉{calc.kSts}, K2tog] 8회 반복
                  </text>
                </svg>
              </div>
            </div>

            {/* Decreasing Recipe Chart */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 마커 8개 분배</strong>: 시작마커(BOR)부터 <strong>{calc.wedgeSts}코</strong>마다 마커를 걸어 편물을 정확히 8개의 동일한 구역(Wedge)으로 나눕니다.
              </p>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 space-y-1.5 text-xs font-mono">
                <p className="text-primary font-bold font-sans text-sm mb-1">📋 정수리 줄임 라운드 레시피 차트:</p>
                <p>• <strong>1단 (줄임단)</strong>: <span className="bg-primary-fixed/40 text-primary px-1.5 py-0.5 rounded font-bold">[겉뜨기 {calc.kSts}코, K2tog(2코 모아뜨기)] × 8회</span> 반복 ({calc.castOn - 8}코)</p>
                <p>• <strong>2단 (평단)</strong>: 줄임 없이 모든 코 겉뜨기 1바퀴</p>
                <p>• <strong>3단 (줄임단)</strong>: <span className="bg-primary-fixed/40 text-primary px-1.5 py-0.5 rounded font-bold">[겉뜨기 {calc.kSts - 1}코, K2tog] × 8회</span> 반복 ({calc.castOn - 16}코)</p>
                <p>• <strong>4단 (평단)</strong>: 줄임 없이 모든 코 겉뜨기 1바퀴</p>
                <p className="text-on-surface-variant font-sans pt-1">➔ 모아뜨기 사이의 코수가 1코씩 줄어들며 총 16코가 남을 때까지 반복합니다.</p>
              </div>
              <p>
                <strong>2. 소라빵 방지 비결</strong>: 4등분 줄임은 모자 꼭대기가 고깔처럼 뾰족하게 솟기 쉽지만, <strong>8등분 줄임</strong>은 왕관 꽃잎처럼 둥글고 납작하게 모여 완벽한 두상 핏을 완성합니다.
              </p>
            </div>

            {/* Video Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('5a6b7c8d9e', 'K2tog 2코 모아뜨기 정석')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: K2tog 정수리 줄임 재생</span>
              </button>
            </div>

            {/* Step 4 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="beanie_step_4" targetRows={Math.round(calc.crownDecreaseCm * 2.4)} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 05 */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === '5') && (
          <div className="p-6 md:p-7 rounded-2xl bg-surface-container-low border border-on-surface/[0.06] transition-all hover:border-primary/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  05
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface">
                    매직루프 전환 &amp; 돗바늘 정수리 조임 마감
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    복조리식 2회 원형 통과 조임과 실밥 숨기기, 스팀 블로킹
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  남은 8~16코 조임
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 매직루프 전환</strong>: 코수가 줄어 40cm 줄바늘이 팽팽하게 당겨지면, 케이블을 양옆으로 길게 빼내어 매직루프(Magic Loop) 형태로 바늘을 여유롭게 조작합니다.
              </p>
              <p>
                <strong>2. 돗바늘 2회 통과 조임 (풀림 방지)</strong>: 실을 약 20cm 남기고 자른 후 돗바늘에 뀁니다. 바늘에 걸린 16코를 돗바늘로 차례대로 통과시킨 뒤, <strong>한 번 더 2차로 원형 통과</strong>하여 복조리처럼 바짝 당깁니다. 2번 통과해야 세탁 후에도 정수리가 절대 벌어지지 않습니다.
              </p>
              <p>
                <strong>3. 안쪽 매듭 및 스팀 블로킹</strong>: 실을 모자 안쪽으로 찔러 넣어 단단히 매듭짓고 편물 결을 따라 돗바늘로 숨깁니다. 완성된 비니에 미온수 울샴푸 세탁 후 수건으로 눌러 물기를 빼고 그늘에서 말리면 완벽한 니트 비니가 탄생합니다!
              </p>
            </div>

            {/* Video Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '돗바늘 정수리 조임 마감')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 돗바늘 정수리 조임 마감 재생</span>
              </button>
            </div>

            {/* Step 5 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="beanie_step_5" targetRows={1} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
          </div>
        )}
      </div>
    </section>
  );
}
