import React, { useState } from 'react';

const TOOLS_DATA = {
  sweater: [
    { id: 'needle', title: '1. 대바늘 2종 (줄바늘)', spec: '메인 4.5~5.0mm / 립 3.5~4.0mm', desc: '몸통용 케이블 80~100cm 필수. 목둘레/소매 고무단은 0.5~1.0mm 얇은 바늘로 쫀쫀하게 작업합니다.', icon: 'straighten' },
    { id: 'marker', title: '2. 스티치 마커 (8개)', spec: '시작점 1개 + 레글런 모서리 7개', desc: '앞·뒤판과 양 소매를 잇는 4개 레글런 라인에 걸어 M1R/M1L 늘림 위치를 표시합니다.', icon: 'bookmark' },
    { id: 'notion', title: '3. 별실 또는 실리콘 코드', spec: '길이 약 1m 2줄 (소매 쉼코용)', desc: '요크 완성 후 소매 코를 잠시 쉬게 걸어둘 부드러운 면사 별실이나 실리콘 튜브 홀더를 준비합니다.', icon: 'cable' },
    { id: 'finish', title: '4. 줄자 & 돗바늘 & 쪽가위', spec: '실시간 치수 측정 및 실정리', desc: '요크 깊이·총장 수시 측정용 부드러운 줄자와 겨드랑이 틈새 메꿈용 굵은 돗바늘입니다.', icon: 'cut' }
  ],
  beanie: [
    { id: 'needle', title: '1. 40cm 숏서큘러 2종', spec: '몸통 4.5~5.0mm / 립 3.5~4.0mm', desc: '비니 머리둘레에 딱 맞는 40cm 줄바늘 필수. 고무단은 0.5~1.0mm 얇은 바늘로 짱짱하게 잡습니다.', icon: 'straighten' },
    { id: 'crown', title: '2. 정수리 전환 바늘 (필수⚠️)', spec: '80cm 줄바늘 (매직루프) or DPNs', desc: '정수리 코수가 8~16코로 줄면 40cm 바늘로는 편물이 당겨져 뜰 수 없습니다! 반드시 80cm 줄바늘이나 장갑바늘로 교체해야 합니다.', icon: 'change_circle' },
    { id: 'marker', title: '3. 스티치 마커 (5~9개)', spec: '시작점 1개 + 4/8등분 쐐기용', desc: '원형 시작점(BOR) 마커 1개와 정수리 4등분/8등분 줄임 섹션마다 마커를 걸어 균형 잡힌 원뿔/왕관 라인을 만듭니다.', icon: 'bookmark' },
    { id: 'finish', title: '4. 돗바늘 & 줄자 & 폼폼', spec: '정수리 오므리기 & 기장 측정', desc: '남은 코를 돗바늘에 통과시켜 단단히 오므립니다. 롤업 높이(4cm/7cm) 측정용 줄자와 취향에 따른 폼폼메이커를 준비하세요.', icon: 'cut' }
  ],
  socks: [
    { id: 'needle', title: '1. 양말 줄바늘 (80~100cm)', spec: '2.25mm ~ 2.75mm (유연한 케이블)', desc: '치아오구/니트프로 등 케이블이 부드러운 줄바늘로 매직루프(Magic Loop) 원형뜨기를 구사합니다.', icon: 'straighten' },
    { id: 'marker', title: '2. 개폐형 옷핀 마커 (4~6개)', spec: '여닫이형 전구핀 (Bulb Pin)', desc: '막힌 링 마커는 바늘 사이에서 빠지므로, 편물 코 자체에 직접 걸어둘 수 있는 개폐형 마커가 뒤꿈치(GSR) 전환점 표시에 필수입니다.', icon: 'lock' },
    { id: 'ruler', title: '3. 양말 게이지 자 (Sock Ruler)', spec: '발가락~뒤꿈치 아치 정밀 측정', desc: '일반 줄자보다 편물 안쪽에 쏙 끼워 발끝부터 뒤꿈치 시작점까지 1mm 오차 없이 측정할 수 있는 단단한 게이지 자입니다.', icon: 'square_foot' },
    { id: 'finish', title: '4. 돗바늘 & 양말 블로커', spec: '키치너 스티치 & 세탁 후 성형', desc: '커프다운 발끝 메리야스 잇기(Kitchener)용 돗바늘과 세탁 후 발목 주름을 쫙 펴주는 양말 모형 건조틀(블로커)입니다.', icon: 'dry_cleaning' }
  ],
  scarf: [
    { id: 'needle', title: '1. 평면 대바늘 (60~80cm 줄바늘)', spec: '5.0mm ~ 7.0mm (취향별 실 굵기)', desc: '긴 막대바늘보다 줄바늘을 평면뜨기로 쓰면 코 빠짐이 없고 손목 무게 부담이 적습니다. 변형고무뜨기는 0.5mm 굵게 권장합니다.', icon: 'straighten' },
    { id: 'marker', title: '2. 엣지 경계 마커 (2개)', spec: '양 끝 아이코드 / 셀비지 분리', desc: '양 끝 2~3코의 엣지 구간과 중앙 메인 패턴 사이에 마커 2개를 걸어두면 멍때리며 떠도 무늬가 틀리지 않습니다.', icon: 'bookmark' },
    { id: 'ruler', title: '3. 유연한 줄자 (1.5~2m)', spec: '너비 및 목표 총장(180~200cm) 확인', desc: '목도리는 무게 때문에 뜨면서 아래로 늘어납니다. 바닥에 편평하게 펴고 수시로 너비와 길이를 점검합니다.', icon: 'straighten' },
    { id: 'finish', title: '4. 돗바늘 & 블로킹 T핀(선택)', spec: '실정리 & 사방 가장자리 말림 방지', desc: '시작/끝 꼬리실을 숨겨줄 굵은 돗바늘과 완성 후 스팀을 쐬어 반듯한 직사각형으로 핏을 고정하는 블로킹 핀입니다.', icon: 'iron' }
  ]
};

export default function ToolChecklist({ category = 'sweater' }) {
  const tools = TOOLS_DATA[category] || TOOLS_DATA.sweater;
  const [checked, setChecked] = useState({});

  const toggleCheck = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="p-4 sm:p-5 bg-surface-container rounded-2xl border border-on-surface/[0.06] mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-on-surface/[0.06]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">construction</span>
          <h3 className="text-sm font-bold text-on-surface">제작 전 필수 준비물 &amp; 추천 도구 체크리스트</h3>
        </div>
        <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
          준비 현황: {completedCount} / {tools.length} 완료
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        {tools.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-surface-container-lowest border-on-surface/[0.05] hover:border-primary/20'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 font-bold text-primary mb-1">
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <p className="text-on-surface text-sm font-semibold mb-1">{item.spec}</p>
                <p className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</p>
              </div>
              <label
                onClick={() => toggleCheck(item.id)}
                className="mt-2.5 pt-2 border-t border-on-surface/[0.04] flex items-center gap-1.5 text-xs text-on-surface-variant cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {}}
                  className="rounded text-primary focus:ring-primary/30 w-3.5 h-3.5 cursor-pointer accent-primary"
                />
                <span className={isDone ? 'font-bold text-primary' : ''}>
                  {isDone ? '준비 완료됨 ✓' : '준비 완료 체크'}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
