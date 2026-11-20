import React, { useState } from 'react';
import StepProgressTracker from './StepProgressTracker';

export default function ScarfRoadmap({ calc, onOpenVideo, currentUser, onOpenAuthModal }) {
  const [activeTab, setActiveTab] = useState('all');

  const isBrioche = calc.pattern === 'brioche';

  const steps = [
    { id: '1', num: '01', title: `신축성 코잡기 & 에지 세팅 (${calc.totalCastOn}코)` },
    { id: '2', num: '02', title: isBrioche ? '브리오쉬 기초 세팅단 (Setup Row)' : '변형 고무뜨기 1단 무늬 시작' },
    { id: '3', num: '03', title: `무한 볼륨 직진 (${calc.targetL}cm / ${calc.totalRows}단)` },
    { id: '4', num: '04', title: '말림 0% 아이코드 에지 & 무매듭 실 잇기' },
    { id: '5', num: '05', title: `탄력 코막음 & 습식 블로킹 (${calc.targetW}cm 완성)` },
  ];

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
              {isBrioche ? '노르딕 브리오쉬(Brioche) 양면 볼륨 머플러 도안' : '말림 없는 클래식 변형 고무뜨기 머플러 도안'}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-3 py-1.5 rounded-full border border-primary/20">
              폭 {calc.targetW}cm × 길이 {calc.targetL}cm
            </span>
            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full">
              총 {calc.totalCastOn}코 (본체 {calc.bodySts}코 + 에지 {calc.edgeSts}코)
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
                    신축성 여유 코잡기 <span className="text-primary font-extrabold">({calc.totalCastOn}코)</span> &amp; 에지 세팅
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    양 끝이 오므라들지 않도록 1호수 큰 바늘로 잡는 여유 롱테일 코잡기
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  코잡기 전용 0.5~1호수 큰 바늘
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  아이코드 에지 {calc.edgeSts}코 포함
                </span>
              </div>
            </div>

            {/* SVG Diagram */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">straight</span>
                  <span>STEP 01 구조도: 폭 {calc.targetW}cm 편평 뜨기 레이아웃</span>
                </span>
                <span className="text-xs text-outline font-medium">총 {calc.totalCastOn}코</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 420 100" className="w-full max-w-[420px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  {/* Left edge band */}
                  <rect x="50" y="25" width="40" height="50" rx="4" fill="#ffdbd0" stroke="#984125" strokeWidth="1.5" />
                  <text x="70" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#984125">에지 {calc.edgeSts/2}코</text>
                  {/* Center Body */}
                  <rect x="95" y="25" width="230" height="50" rx="4" fill="rgba(152,65,37,0.04)" stroke="#984125" strokeWidth="2" />
                  <text x="210" y="47" textAnchor="middle" fontSize="12" fontWeight="800" fill="#984125">본체 무늬 {calc.bodySts}코</text>
                  <text x="210" y="63" textAnchor="middle" fontSize="10" fontWeight="600" fill="#655a4e">
                    {isBrioche ? '브리오쉬 양면 볼륨' : '변형 고무뜨기'}
                  </text>
                  {/* Right edge band */}
                  <rect x="330" y="25" width="40" height="50" rx="4" fill="#ffdbd0" stroke="#984125" strokeWidth="1.5" />
                  <text x="350" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#984125">에지 {calc.edgeSts/2}코</text>
                </svg>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 0.5호수 큰 바늘로 코잡기 (입구 오므라듦 방지)</strong>: 목도리 첫 단은 손장력이 조금만 팽팽해도 사다리꼴처럼 입구가 좁아져 끝이 펄럭이지 못합니다. 본체 메인 바늘(5.0mm)보다 0.5~1.0mm 굵은 바늘로 총 <strong><span className="font-bold text-primary">{calc.totalCastOn}코</span></strong>를 넉넉하게 잡은 뒤 메인 바늘로 교체합니다.
              </p>
              <p>
                <strong>2. 아이코드(I-Cord) 말림 방지 에지 배분</strong>: 가장자리 양쪽 끝(각 {calc.edgeSts/2}코씩)에 걸러뜨기를 적용하면 목도리가 옆으로 돌돌 말리지 않고 반듯한 기성복 파이핑 테두리가 완성됩니다.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '신축성 코잡기 & 아이코드 에지')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 말림 없는 코잡기 &amp; 에지 재생</span>
              </button>
            </div>

            {/* Step 1 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="scarf_step_1" targetRows={10} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
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
                    {isBrioche ? '브리오쉬 기초 세팅단 (Setup Row)' : '변형 고무뜨기 1단 무늬 반복 세팅'}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isBrioche ? '실 앞에 두고 걸러뜨기(sl1yo)로 공기층 생성' : '겉뜨기 1코와 바늘비우기 걸러뜨기로 도톰한 볼륨 세팅'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isBrioche ? 'brk & sl1yo 특수 코' : '1단 반복 초간편'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              {isBrioche ? (
                <>
                  <p>
                    <strong>1. 준비단 (Setup Row)</strong>: 에지 2코 겉뜨기 후, 본체 구간에서 <code className="bg-primary-fixed/30 text-primary px-1.5 py-0.5 rounded font-bold">[sl1yo (실 앞으로 두고 안뜨기 방향 1코 걸러뜨며 바늘비우기), 겉뜨기 1코]</code>를 반복합니다.
                  </p>
                  <p>
                    <strong>2. 본 무늬 2단 반복 (brk단 &amp; brp단)</strong>: 걸쳐진 실 루프와 본래 코를 한꺼번에 찔러 겉뜨기하는 <strong>brk(Brioche Knit)</strong>로 뜨면 편물 사이에 2배의 공기층이 갇혀 캐시미어처럼 폭신한 양면 볼륨이 형성됩니다.
                  </p>
                </>
              ) : (
                <p>
                  <strong>1단 무늬 무한 반복</strong>: <code className="bg-primary-fixed/30 text-primary px-1.5 py-0.5 rounded font-bold">[실 앞으로, 1코 걸러뜨기, 겉뜨기 2코 한꺼번에 모아뜨기]</code>를 끝까지 반복합니다. 앞뒤 모양이 완전히 똑같이 나와 뒤집어져도 구분이 없는 완벽한 양면 목도리가 됩니다.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('1v3x4a5b6c', isBrioche ? '브리오쉬 brk 손동작 정석' : '변형 고무뜨기 1단 반복')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: {isBrioche ? '브리오쉬 brk 손동작 재생' : '변형 고무뜨기 재생'}</span>
              </button>
            </div>

            {/* Step 2 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="scarf_step_2" targetRows={calc.totalRows || 40} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
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
                    무한 볼륨 직진 <span className="text-primary font-extrabold">({calc.targetL}cm / 약 {calc.totalRows}단)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    넷플릭스를 보며 뜨는 힐링 직진 궤도와 일정한 손장력 유지
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  목표 길이 {calc.targetL}cm
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  예상 실 {calc.yarnBalls}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 손장력 텐션 유지</strong>: 목도리는 길이가 길어서 초반에는 촘촘하게 뜨다가 뒤로 갈수록 손이 풀려 넓어지기 쉽습니다. 중간중간 줄자로 폭({calc.targetW}cm)이 일정하게 유지되는지 확인하세요.
              </p>
              <p>
                <strong>2. 착용감에 맞춘 기장 조절</strong>:
                <br/>• 150~160cm: 가볍게 한 번 목에 둘러 떨어뜨리는 숏 머플러
                <br/>• 180cm (스탠다드 추천): 두 번 둘러 감거나 매듭짓기 가장 좋은 황금 비율
                <br/>• 200cm 이상: 두툼하게 둘둘 감아 얼굴을 덮는 롱 머플러
              </p>
            </div>

            {/* Step 3 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="scarf_step_3" targetRows={10} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
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
                    티 안 나게 새 실 잇기 &amp; 양면 에지 정돈
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    러시안 조인(Russian Join) 무매듭 연결로 목에 닿는 이물감 0%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  무매듭 러시안 조인
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 양면 목도리 실 교체 요령</strong>: 목도리는 앞뒤가 모두 노출되므로 한가운데서 매듭을 묶으면 겉으로 튀어나와 보기 싫습니다.
              </p>
              <p>
                <strong>2. 러시안 조인 (Russian Join)</strong>: 새 실과 헌 실의 끝부분을 돗바늘로 서로의 실 꼬임 속에 통과시켜 겹쳐 꼬면 매듭 없이 완벽하게 하나로 이어져 피부에 닿아도 부드럽습니다.
              </p>
            </div>

            {/* Step 4 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="scarf_step_4" targetRows={10} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
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
                    신축성 탄력 코막음 &amp; 습식 블로킹 <span className="text-primary font-extrabold">(완성 폭 {calc.targetW}cm 고정)</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    이탈리안 돗바늘 바인드오프와 미온수 세탁으로 균일한 기성복 퀄리티 완성
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  습식 블로킹 필수
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              <p>
                <strong>1. 탄력 코막음 (Jeny's Stretchy BO or 이탈리안 바인드오프)</strong>: 시작단과 동일하게 끝단도 오므라들지 않도록 여유 있게 코막음합니다.
              </p>
              <p>
                <strong>2. 습식 블로킹 (Wet Blocking)</strong>: 미온수에 울샴푸를 풀어 15분간 가볍게 담근 뒤 수건으로 물기를 짭니다. 매트 위에 펼쳐놓고 양끝을 시침핀으로 <strong>정확히 폭 {calc.targetW}cm, 길이 {calc.targetL}cm</strong>에 맞추어 그늘에서 자연 건조하면 편물의 울퉁불퉁한 손땀이 마법처럼 고르고 평평해집니다!
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('00u88Q6z3bA', '목도리 탄력 코막음 & 블로킹')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 탄력 코막음 &amp; 블로킹 재생</span>
              </button>
            </div>

            {/* Step 5 Progress Tracker (로그인 전용) */}
            <StepProgressTracker stepKey="scarf_step_5" targetRows={10} currentUser={currentUser} onOpenAuthModal={onOpenAuthModal} />
          </div>
        )}
      </div>
    </section>
  );
}
