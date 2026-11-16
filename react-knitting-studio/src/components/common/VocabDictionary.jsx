import React from 'react';

const VOCAB_DATA = [
  { abbr: 'BOR', label: '시작 마커', desc: '원형뜨기 시작점' },
  { abbr: 'K / P', label: '겉뜨기 / 안뜨기', desc: 'Knit / Purl' },
  { abbr: 'M1R', label: '오른코 늘림', desc: '뒤에서 앞으로 들어 겉뜨기' },
  { abbr: 'M1L', label: '왼코 늘림', desc: '앞에서 뒤로 들어 꼬아뜨기' },
  { abbr: 'K2tog', label: '2코 모아 겉뜨기', desc: '오른쪽 1코 줄임' },
  { abbr: 'BO', label: '코막음', desc: '바인드오프 (마감)' }
];

export default function VocabDictionary() {
  return (
    <div className="p-4 bg-surface-container rounded-2xl border border-on-surface/[0.06] mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <span className="material-symbols-outlined text-[17px]">menu_book</span>
          <span>1초 만에 이해하는 뜨개 필수 영문 약어 사전</span>
        </div>
        <span className="text-[11px] text-outline font-medium">도안 &amp; 영상 필수 기호</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
        {VOCAB_DATA.map((item, i) => (
          <div key={i} className="p-2 bg-surface-container-lowest rounded-xl border border-on-surface/[0.05]">
            <strong className="text-primary font-bold block mb-0.5">{item.abbr}</strong>
            <span className="text-on-surface font-semibold text-[11px] block">{item.label}</span>
            <span className="text-on-surface-variant text-[10px]">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
