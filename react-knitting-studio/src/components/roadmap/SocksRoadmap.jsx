import React, { useState } from 'react';

export default function SocksRoadmap({ calc, onOpenVideo }) {
  const [activeTab, setActiveTab] = useState('all');

  const isToeUp = calc.method === 'toeup';

  const steps = isToeUp ? [
    { id: '1', num: '01', title: `발끝 주디스 매직 캐스트온 (${calc.toeStartSts}코)` },
    { id: '2', num: '02', title: `발가락 사선 늘림 (${calc.toeIncTimes}회 ➔ ${calc.castOn}코)` },
    { id: '3', num: '03', title: `발바닥 직진 (${calc.straightFootCm}cm)` },
    { id: '4', num: '04', title: '독일식 경사뜨기(GSR) 입체 뒤꿈치' },
    { id: '5', num: '05', title: '발목 고무단 & Jeny 신축성 코막음' },
  ] : [
    { id: '1', num: '01', title: `발목 신축성 코잡기 (${calc.castOn}코)` },
    { id: '2', num: '02', title: `발목 립 & 레그 직진 (${calc.legLengthCm}cm)` },
    { id: '3', num: '03', title: `힐플랩(${calc.flapRows}단) & 거싯 코줍기` },
    { id: '4', num: '04', title: `발바닥 직진 (${calc.straightFootCm}cm)` },
    { id: '5', num: '05', title: '키치너 스티치(Kitchener) 무봉제 마감' },
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
              {isToeUp ? '토업(Toe-Up) 무봉제 핸드메이드 양말 도안' : '커프다운(Cuff-Down) 클래식 힐플랩 양말 도안'}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-3 py-1.5 rounded-full border border-primary/20">
              발길이 {calc.footLengthMm}mm · 발둘레 {calc.footCircCm}cm
            </span>
            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full">
              총 {calc.castOn}코 (발등 {calc.halfSts}코 / 발바닥 {calc.halfSts}코)
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
                    {isToeUp
                      ? `발끝 주디스 매직 캐스트온 (${calc.toeStartSts}코 무봉제 시작)`
                      : `발목 신축성 코잡기 (${calc.castOn}코) & 1x1 립`}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isToeUp
                      ? '바늘 2개에 8자로 실을 감아 꿰맴 없이 매끄러운 발가락 시작'
                      : '종아리를 조이지 않는 독일식 꼬아 코잡기와 탄력 밴드'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  권장 2.25~2.5mm 줄바늘 (80cm)
                </span>
                <span className="text-xs font-medium bg-surface-container-highest px-2.5 py-1 rounded-full text-on-surface-variant">
                  매직루프 기법
                </span>
              </div>
            </div>

            {/* SVG Diagram for Judy's Magic Cast on */}
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-on-surface/[0.08] my-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-on-surface/[0.05]">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">gesture</span>
                  <span>{isToeUp ? 'STEP 01 구조도: 2줄 바늘 8자 감기 (Judy’s Magic Cast-On)' : 'STEP 01 구조도: 발목 립 밴드 원형뜨기'}</span>
                </span>
                <span className="text-xs text-outline font-medium">{isToeUp ? `각 바늘당 ${calc.toeStartSts / 2}코` : `${calc.castOn}코`}</span>
              </div>
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 420 110" className="w-full max-w-[420px] h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  {isToeUp ? (
                    <>
                      {/* Top Needle (Instep) */}
                      <line x1="60" y1="35" x2="360" y2="35" stroke="#984125" strokeWidth="4.5" strokeLinecap="round" />
                      <text x="210" y="25" textAnchor="middle" fontSize="10" fontWeight="700" fill="#984125">1번 바늘 (발등): {calc.toeStartSts / 2}코</text>
                      {/* Bottom Needle (Sole) */}
                      <line x1="60" y1="75" x2="360" y2="75" stroke="#a0401c" strokeWidth="4.5" strokeLinecap="round" />
                      <text x="210" y="93" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a0401c">2번 바늘 (발바닥): {calc.toeStartSts / 2}코</text>
                      {/* Figure-8 Loops */}
                      {[100, 140, 180, 220, 260, 300].map((x) => (
                        <path key={x} d={`M ${x - 8} 35 C ${x - 8} 55, ${x + 8} 55, ${x + 8} 75 C ${x + 8} 55, ${x - 8} 55, ${x - 8} 35`} fill="none" stroke="#fe875d" strokeWidth="2" strokeDasharray="3 2" />
                      ))}
                    </>
                  ) : (
                    <>
                      <ellipse cx="210" cy="55" rx="130" ry="32" fill="rgba(152,65,37,0.04)" stroke="#984125" strokeWidth="2.5" />
                      <text x="210" y="52" textAnchor="middle" fontSize="13" fontWeight="800" fill="#984125">발목 시작 둘레: {calc.castOn}코</text>
                      <text x="210" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="#655a4e">1코 고무뜨기 3~4cm 직진</text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Granular Step Content */}
            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              {isToeUp ? (
                <>
                  <p>
                    <strong>1. 바늘 2개 나란히 쥐기</strong>: 80cm 줄바늘을 반으로 접어 바늘 2개를 나란히 쥐고, 실을 8자로 번갈아 감아 <strong>위 바늘(발등)에 {calc.toeStartSts / 2}코</strong>, <strong>아래 바늘(발바닥)에 {calc.toeStartSts / 2}코</strong>, 총 <strong><span className="font-bold text-primary">{calc.toeStartSts}코</span></strong>를 코잡기합니다. 시작 매듭을 짓지 않고 실꼬리만 살짝 잡아준 채 감아야 발끝에 딱딱한 멍울이 생기지 않습니다.
                  </p>
                  <p>
                    <strong>2. 첫 단 매끄러운 꼬아뜨기(K1tbl)</strong>:
                    <br/>• 윗바늘 ({calc.toeStartSts / 2}코): 편평하게 겉뜨기로 뜹니다.
                    <br/>• 아랫바늘 ({calc.toeStartSts / 2}코): 실 루프의 꼬임을 풀기 위해 뒷루프를 찔러 <strong>꼬아뜨기(K1tbl)</strong>로 떠서 바늘비우기 구멍을 완벽히 메워줍니다.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. 독일식 꼬아 코잡기 ({calc.castOn}코)</strong>: 종아리와 발목이 쏙 들어가도록 <strong>신축성 코잡기</strong>로 총 {calc.castOn}코를 잡고 원형으로 연결합니다.
                  </p>
                  <p>
                    <strong>2. 발목 1x1 립 3cm</strong>: 1코 고무뜨기로 3~4cm 떠서 흘러내림 없는 쫀쫀한 발목 밴드를 만듭니다.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo(isToeUp ? '00u88Q6z3bA' : '1v3x4a5b6c', isToeUp ? '주디스 매직 캐스트온 정석' : '독일식 꼬아 코잡기')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: {isToeUp ? '주디스 매직 캐스트온 재생' : '발목 립 코잡기 재생'}</span>
              </button>
            </div>
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
                    {isToeUp
                      ? `발가락 사선 대칭 늘림 (${calc.toeIncTimes}회 반복 ➔ ${calc.castOn}코)`
                      : `발목 레그(Leg) 직진 (${calc.legLengthCm}cm / ${calc.legRows}단)`}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isToeUp ? 'M1R & M1L 대칭 사선 늘림으로 조임 없는 발가락 곡선' : '원하는 기장(크루삭스 or 앵클삭스)에 맞춘 메리야스 직진'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isToeUp ? `2단마다 +4코 (${calc.toeIncTimes}회)` : `총 ${calc.legRows}단`}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              {isToeUp ? (
                <>
                  <p>
                    <strong>1. 늘림단 공식 (1단)</strong>:
                    <br/>• 1번 바늘(발등): <code className="bg-primary-fixed/30 text-primary px-1.5 py-0.5 rounded font-bold">K1, M1R, 마지막 1코 전까지 겉뜨기, M1L, K1</code>
                    <br/>• 2번 바늘(발바닥): <code className="bg-primary-fixed/30 text-primary px-1.5 py-0.5 rounded font-bold">K1, M1R, 마지막 1코 전까지 겉뜨기, M1L, K1</code> (한 바퀴에 4코 증가)
                  </p>
                  <p>
                    <strong>2. 평단 (2단)</strong>: 늘림 없이 모든 코를 편안하게 겉뜨기 1바퀴.
                  </p>
                  <p>
                    <strong>3. 목표 도달</strong>: 바늘에 총 <strong>{calc.castOn}코 (발등 {calc.halfSts}코 / 발바닥 {calc.halfSts}코)</strong>가 될 때까지 총 <strong>{calc.toeIncTimes}회</strong> 반복합니다.
                  </p>
                </>
              ) : (
                <p>
                  고무단 밑부터 뒤꿈치 시작점까지 <strong>약 {calc.legLengthCm}cm ({calc.legRows}단)</strong> 동안 메리야스 원통뜨기로 직진합니다.
                </p>
              )}
            </div>

            <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/20 text-xs text-on-surface-variant my-3">
              <strong className="text-primary font-bold block mb-1 text-sm">💡 M1 늘림 구멍 안 생기는 손동작 요령</strong>
              <p className="leading-relaxed">
                싱커루프를 뒤에서 앞으로 주울 때는 앞루프를 찔러 뜨고(M1R), 앞에서 뒤로 주울 때는 뒷루프를 찔러 꼬아뜨면(M1L) 구멍 없이 탄탄한 솔기가 완성됩니다.
              </p>
            </div>
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
                    {isToeUp
                      ? `발바닥 직진 원형뜨기 (뒤꿈치 시작선: ${calc.straightFootCm}cm)`
                      : `힐플랩(${calc.flapRows}단) & 거싯 코줍기 (${calc.pickupSts}코)`}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isToeUp ? '발등은 무늬/메리야스 유지, 발바닥은 매끄러운 겉뜨기 직진' : '강화 슬립스티치 뒤꿈치 벽과 양옆 거싯 코줍기'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isToeUp ? `발끝부터 ${calc.straightFootCm}cm` : `힐플랩 ${calc.flapRows}단`}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              {isToeUp ? (
                <>
                  <p>
                    <strong>1. 증감 없이 직진</strong>: 총 {calc.castOn}코로 발끝부터 잰 총 길이가 <strong>{calc.straightFootCm}cm</strong>에 도달할 때까지 원형으로 직진합니다.
                  </p>
                  <p>
                    <strong>2. 신어보기 피팅</strong>: 양말을 발에 끼워보았을 때, 바늘의 끝부분이 <strong>발목 꺾이는 복사뼈 바로 앞 지점</strong>에 도달하면 뒤꿈치 턴에 돌입합니다.
                  </p>
                </>
              ) : (
                <p>
                  발바닥 {calc.halfSts}코로 <strong>슬립스티치 힐플랩({calc.flapRows}단)</strong>을 뜬 뒤 양옆에서 <strong>각 {calc.pickupSts}코씩</strong> 주워 입체적인 발뒤꿈치 바닥을 만듭니다.
                </p>
              )}
            </div>
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
                    {isToeUp
                      ? '독일식 경사뜨기(GSR) 입체 뒤꿈치 부메랑 턴'
                      : `발바닥 직진 & 발가락 줄임선 (${calc.straightFootCm}cm)`}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isToeUp ? '더블스티치(Double Stitch)로 구멍 없는 완벽한 입체 곡선' : '힐턴 후 발가락 줄임 돌입 전까지의 메리야스 직진 구간'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isToeUp ? 'GSR 부메랑 턴' : '발바닥 직진'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              {isToeUp ? (
                <>
                  <p>
                    <strong>1. 1단계 (안쪽으로 좁히기)</strong>: 발바닥 {calc.halfSts}코로 왕복하며 매 턴마다 첫 코를 뒤로 넘겨 <strong>더블스티치(Double Stitch)</strong>를 만듭니다. 중앙의 1/3 코수(약 {Math.round(calc.halfSts / 3)}코)만 남을 때까지 양쪽에서 더블스티치를 누적합니다.
                  </p>
                  <p>
                    <strong>2. 2단계 (바깥으로 넓히기)</strong>: 다시 양쪽으로 왕복하며 더블스티치의 2가닥 루프를 한꺼번에 찔러 정리하며 바깥쪽으로 확장하여 둥근 볼륨 뒤꿈치를 완성합니다.
                  </p>
                </>
              ) : (
                <p>
                  뒤꿈치 결합 후 발가락 끝 4~5cm 전까지 <strong>총 {calc.straightFootCm}cm</strong> 직진합니다.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo('5a6b7c8d9e', '독일식 숏로우 GSR 뒤꿈치 턴')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: 독일식 경사뜨기(GSR) 뒤꿈치 재생</span>
              </button>
            </div>
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
                    {isToeUp
                      ? "발목 1x1 립 고무단 & Jeny's 놀라운 신축성 코막음"
                      : '키치너 스티치(Kitchener Stitch) 발끝 무봉제 마감'}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isToeUp ? '발목 통과 시 절대 조이지 않는 슈퍼 신축성 바인드오프' : '돗바늘로 겉코와 안코를 꿰매어 봉제선 0% 완성'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-xs font-bold bg-primary-fixed/50 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {isToeUp ? "Jeny's Stretchy BO" : '키치너 돗바늘 마감'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-on-surface leading-relaxed">
              {isToeUp ? (
                <>
                  <p>
                    <strong>1. 발목 립 밴드 3~4cm</strong>: 1코 고무뜨기로 발목 길이를 원하는 만큼(3~5cm) 뜹니다.
                  </p>
                  <p>
                    <strong>2. 제니식 신축성 코막음 (Jeny's Surprisingly Stretchy BO)</strong>: 매 코마다 바늘비우기(Yarn Over)를 함께 걸어 덮어씌움으로써, 기성 스포츠 양말 밴드처럼 2배 이상 부드럽게 늘어나는 환상적인 신축성을 완성합니다.
                  </p>
                </>
              ) : (
                <p>
                  남은 발등 {calc.halfSts / 2}코와 발바닥 {calc.halfSts / 2}코를 돗바늘로 <strong>키치너 스티치</strong>로 꿰매어 발끝에 이물감이 전혀 없는 완벽한 무봉제 양말을 완성합니다.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenVideo(isToeUp ? '00u88Q6z3bA' : '1v3x4a5b6c', isToeUp ? "Jeny's 신축성 코막음" : '키치너 스티치')}
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:bg-primary bg-primary-fixed/40 px-4 py-2 rounded-full font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>기법 영상: {isToeUp ? "Jeny's 신축성 코막음 재생" : '키치너 스티치 재생'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
