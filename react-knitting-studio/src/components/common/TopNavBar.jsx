import React from 'react';

export default function TopNavBar({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'sweater', label: '스웨터', sub: '탑다운 레글런' },
    { id: 'beanie', label: '비니 / 와치캡', sub: '8등분 왕관 줄임' },
    { id: 'socks', label: '맞춤 양말', sub: '토업 & 커프다운' },
    { id: 'scarf', label: '목도리 / 머플러', sub: '변형고무 & 리브' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f3]/90 backdrop-blur-md border-b border-[#201b13]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">gesture</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-on-surface tracking-tight leading-tight">
              니팅 스튜디오
            </h1>
            <p className="text-xs text-on-surface-variant font-medium tracking-wide">
              KNITTING STUDIO · REACT EDITION
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-full border border-on-surface/[0.06]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>도안 인쇄</span>
          </button>
          <a
            href="https://github.com/Hopelessyou/knitting-studio"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
          </a>
        </div>
      </div>

      {/* Mobile Tab Scroller */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-on-surface/[0.04] scrollbar-none bg-surface-container-low/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1 rounded-full text-sm font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant bg-white/70'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
