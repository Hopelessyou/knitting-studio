import React from 'react';

const VOCAB_DATA = [
  {
    abbr: 'K (겉뜨기)',
    label: '바늘을 앞에서 뒤로',
    desc: '실을 뒤에 두고 앞에서 뒤로 푹 찔러 실 끌어내기',
    videoId: 'GHc0crgGg_1TI',
    query: '대바늘 겉뜨기 기초 바늘이야기'
  },
  {
    abbr: 'P (안뜨기)',
    label: '바늘을 뒤에서 앞으로',
    desc: '실을 앞으로 두고 뒤에서 앞으로 찔러 실 끌어내기',
    videoId: 'GHc0crgGg_1TI',
    query: '대바늘 안뜨기 기초 바늘이야기'
  },
  {
    abbr: 'M1R (오른쪽늘림)',
    label: '뒤앞앞 공식',
    desc: '가로줄을 뒤에서 찔러 올려 앞다리로 겉뜨기 (1코 늘림)',
    videoId: '00u88Q6z3bA',
    query: '대바늘 M1R 오른코늘림 꼼지양'
  },
  {
    abbr: 'M1L (왼쪽늘림)',
    label: '앞뒤뒤 공식',
    desc: '가로줄을 앞에서 찔러 올려 뒷다리로 겉뜨기 (1코 늘림)',
    videoId: '00u88Q6z3bA',
    query: '대바늘 M1L 왼코늘림 꼼지양'
  },
  {
    abbr: '감아코',
    label: '엄지손가락 코잡기',
    desc: '왼손 엄지에 실을 감아 바늘에 쏙 끼우는 초간단 코잡기',
    videoId: '00u88Q6z3bA',
    query: '대바늘 감아코 만들기 겨드랑이'
  },
  {
    abbr: 'K2tog (모아뜨기)',
    label: '2코를 한꺼번에',
    desc: '바늘로 2코를 동시에 찔러 겉뜨기 (1코 줄이기)',
    videoId: '5a6b7c8d9e',
    query: '대바늘 K2tog 2코 모아뜨기'
  },
  {
    abbr: 'BOR (시작마커)',
    label: '시작 위치 반지',
    desc: '바늘에 끼워두어 한 바퀴의 시작을 알려주는 이정표',
    videoId: '00u88Q6z3bA',
    query: '대바늘 스티치 마커 사용법 원형뜨기'
  },
  {
    abbr: 'BO (코막음)',
    label: '풀리지 않게 마감',
    desc: '앞 코를 뒷 코 위로 덮어씌워 편물을 튼튼하게 마감',
    videoId: '00u88Q6z3bA',
    query: '대바늘 덮어씌워 코막음 바인드오프'
  }
];

export default function VocabDictionary({ onOpenVideo }) {
  return (
    <div className="p-4 sm:p-5 bg-surface-container rounded-2xl border border-on-surface/[0.08] mb-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-on-surface/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary mb-0.5">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>완전 초보 필수 뜨개 용어 3초 번역기 &amp; 참고 영상</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            외계어 같은 뜨개 기호, 손동작 해설과 <strong>[영상 보기]</strong> 버튼으로 바로 확인하세요!
          </p>
        </div>
        <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-[14px]">smart_display</span>
          <span>8대 기초 기법 유튜브 영상 지원</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center text-xs">
        {VOCAB_DATA.map((item, i) => (
          <div
            key={i}
            className="p-3 bg-surface-container-lowest rounded-xl border border-on-surface/[0.06] flex flex-col justify-between hover:border-red-400/50 hover:shadow-xs transition-all group"
          >
            <div>
              <strong className="text-primary font-bold block mb-1 text-[11px] sm:text-xs">{item.abbr}</strong>
              <span className="text-on-surface font-semibold text-[11px] block mb-1">{item.label}</span>
              <span className="text-on-surface-variant text-[10px] leading-tight block mb-2">{item.desc}</span>
            </div>

            <button
              type="button"
              onClick={() => onOpenVideo?.(item.videoId, `${item.abbr} 기초 손동작 튜토리얼`, item.query)}
              className="w-full py-1.5 px-2 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95 border border-red-200 hover:border-red-600"
              title={`${item.abbr} 참고 유튜브 영상 보기`}
            >
              <span className="material-symbols-outlined text-[14px]">play_circle</span>
              <span>영상 보기</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
