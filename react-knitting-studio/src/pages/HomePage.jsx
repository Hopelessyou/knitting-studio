import React from 'react';

export default function HomePage({ onSelectTab }) {
  const cards = [
    {
      id: 'sweater',
      title: '탑다운 레글런 스웨터',
      sub: 'Top-Down Raglan Sweater',
      desc: '신체 치수와 게이지를 넣으면 목둘레 코잡기부터 요크 늘림, 소매 분리까지 5단계 도안이 1초 만에 자동 완성됩니다.',
      img: '/images/sweater_loose.jpg',
      badge: '난이도 ★★★☆☆',
      time: '약 2~3주 소요',
      features: ['이탈리안 튜블러 코잡기', 'M1R/M1L 사선 늘림', '테일러드 & 루즈핏']
    },
    {
      id: 'beanie',
      title: '비니 & 와치캡',
      sub: '8-Wedge Crown Beanie',
      desc: '머리둘레 8등분 대칭 왕관 줄임 공식으로 정수리가 울퉁불퉁 솟지 않는 완벽한 핏의 비니와 도커 와치캡을 제작합니다.',
      img: '/images/beanie_watchcap.jpg',
      badge: '난이도 ★★☆☆☆',
      time: '약 2~3일 소요',
      features: ['클래식/와치캡/슬라우치 3종', '40cm 숏서큘러 원형뜨기', '8등분 왕관 줄임']
    },
    {
      id: 'socks',
      title: '맞춤 양말 (토업 & 커프다운)',
      sub: 'Custom Fit Socks',
      desc: '발가락부터 올라가는 토업과 발목부터 내려오는 커프다운 중 원하는 기법으로 닳지 않는 쫀쫀한 맞춤 양말을 완성합니다.',
      img: '/images/socks_toeup.jpg',
      badge: '난이도 ★★★☆☆',
      time: '약 3~4일 소요',
      features: ['주디스 매직 캐스트온', '저먼 숏로우(GSR) 뒤꿈치', '키치너 스티치']
    },
    {
      id: 'scarf',
      title: '목도리 & 머플러',
      sub: 'Brioche & Rib Scarf',
      desc: '변형고무뜨기의 폭신한 에어쿠션 볼륨과 아이코드 3코 엣지로 사방 가장자리가 절대 말리지 않는 프리미엄 목도리를 뜹니다.',
      img: '/images/scarf_rib.jpg',
      badge: '난이도 ★☆☆☆☆',
      time: '약 4~5일 소요',
      features: ['변형고무뜨기 (3n+2)', '사방 말림 방지 아이코드 엣지', '실 소요량 그램 계산']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Welcome Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
          SMART KNITTING CALCULATOR
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-on-surface mb-3 tracking-tight">
          어떤 뜨개 작품을 시작하시겠어요?
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          내 손장력 게이지와 실측 치수만 입력하면, 코잡기부터 완성까지 100% 자동 대입되는 마스터클래스 5단계 실전 도안을 제공합니다.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectTab(card.id)}
            className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-on-surface/[0.08] shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Card Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {card.badge}
                  </span>
                  <span className="bg-primary/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {card.time}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  {card.sub}
                </span>
                <h3 className="text-xl font-bold font-serif text-on-surface group-hover:text-primary transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {card.desc}
                </p>

                {/* Features Pill List */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {card.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-lg"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="p-6 pt-0">
              <button
                type="button"
                className="w-full py-3 rounded-2xl bg-surface-container-low group-hover:bg-primary group-hover:text-white text-on-surface font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>계산기 시작하기</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
