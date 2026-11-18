import React from 'react';

const VOCAB_DATA = [
  { abbr: 'K (겉뜨기)', label: '바늘을 앞에서 뒤로', desc: '실을 뒤에 두고 앞에서 뒤로 푹 찔러 실 끌어내기' },
  { abbr: 'P (안뜨기)', label: '바늘을 뒤에서 앞으로', desc: '실을 앞으로 두고 뒤에서 앞으로 찔러 실 끌어내기' },
  { abbr: 'M1R (오른쪽늘림)', label: '뒤앞앞 공식', desc: '가로줄을 뒤에서 찔러 올려 앞다리로 겉뜨기 (1코 늘림)' },
  { abbr: 'M1L (왼쪽늘림)', label: '앞뒤뒤 공식', desc: '가로줄을 앞에서 찔러 올려 뒷다리로 겉뜨기 (1코 늘림)' },
  { abbr: '감아코', label: '엄지손가락 코잡기', desc: '왼손 엄지에 실을 감아 바늘에 쏙 끼우는 초간단 코잡기' },
  { abbr: 'K2tog (모아뜨기)', label: '2코를 한꺼번에', desc: '바늘로 2코를 동시에 찔러 겉뜨기 (1코 줄이기)' },
  { abbr: 'BOR (시작마커)', label: '시작 위치 반지', desc: '바늘에 끼워두어 한 바퀴의 시작을 알려주는 이정표' },
  { abbr: 'BO (코막음)', label: '풀리지 않게 마감', desc: '앞 코를 뒷 코 위로 덮어씌워 편물을 튼튼하게 마감' }
];

export default function VocabDictionary() {
  return (
    <div className="p-4 sm:p-5 bg-surface-container rounded-2xl border border-on-surface/[0.08] mb-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3 pb-2 border-b border-on-surface/[0.06]">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary">
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span>완전 초보 필수 뜨개 용어 3초 번역기 (이것만 알면 도안 마스터!)</span>
        </div>
        <span className="text-xs text-outline font-medium">외계어 같은 뜨개 기호, 손동작으로 쉽게 이해하기</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
        {VOCAB_DATA.map((item, i) => (
          <div key={i} className="p-2.5 bg-surface-container-lowest rounded-xl border border-on-surface/[0.05] flex flex-col justify-between hover:border-primary/30 transition-all">
            <strong className="text-primary font-bold block mb-1 text-[11px] sm:text-xs">{item.abbr}</strong>
            <span className="text-on-surface font-semibold text-[11px] block mb-1">{item.label}</span>
            <span className="text-on-surface-variant text-[10px] leading-tight">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
