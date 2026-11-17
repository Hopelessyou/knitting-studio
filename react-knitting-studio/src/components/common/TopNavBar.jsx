import React from 'react';

export default function TopNavBar({ activeTab, onSelectTab, currentUser, onOpenAuth, onSignOut }) {
  const tabs = [
    { id: 'home', label: '홈', icon: 'home' },
    { id: 'sweater', label: '스웨터', sub: '탑다운 레글런' },
    { id: 'beanie', label: '비니 / 와치캡', sub: '8등분 왕관 줄임' },
    { id: 'socks', label: '맞춤 양말', sub: '토업 & 커프다운' },
    { id: 'scarf', label: '목도리 / 머플러', sub: '변형고무 & 리브' },
    { id: 'community', label: '커뮤니티', icon: 'forum' }
  ];

  const isAdmin = currentUser?.user_metadata?.role === 'admin' 
    || currentUser?.user_metadata?.is_admin === true 
    || currentUser?.email === 'admin@knitting-studio.com'
    || currentUser?.email === 'admin';
  const userNickname = isAdmin ? '관리자' : (currentUser?.user_metadata?.nickname || currentUser?.email?.split('@')[0] || '');

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f3]/95 backdrop-blur-md border-b border-[#201b13]/[0.08] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[4.25rem] py-2 flex items-center justify-between gap-4">
        {/* Header Logo -> Home Navigation */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3.5 cursor-pointer group text-left border-0 bg-transparent p-0 focus:outline-none shrink-0"
          title="홈으로 이동"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-primary-hover transition-all">
            <span className="material-symbols-outlined text-[26px]">gesture</span>
          </div>
          <div>
            <h1 className="font-serif font-extrabold text-xl text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors">
              니팅 스튜디오
            </h1>
            <p className="text-xs text-on-surface-variant font-bold tracking-wide">
              KNITTING STUDIO · REACT EDITION
            </p>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-on-surface/[0.08]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={
                  "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 " +
                  (isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/70")
                }
              >
                {tab.icon && <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>}
                <span>{tab.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools: Auth & External */}
        <div className="flex items-center gap-2.5 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-full border border-on-surface/[0.08]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-2xs"></span>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold flex items-center gap-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[13px]">verified_user</span>
                  <span>관리자</span>
                </span>
              )}
              <span className="text-xs font-extrabold text-on-surface max-w-[110px] truncate" title={userNickname}>
                {userNickname} 님
              </span>
              <button
                type="button"
                onClick={onSignOut}
                className="text-xs text-outline hover:text-error ml-1 font-bold cursor-pointer"
                title="로그아웃"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-full text-xs font-bold bg-surface-container-low hover:bg-surface-container border border-on-surface/[0.1] text-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">account_circle</span>
              <span>로그인 / 회원가입</span>
            </button>
          )}

          {isAdmin && (
            <button 
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all cursor-pointer shadow-2xs"
              title="관리자 전용 도안 인쇄"
            >
              <span className="material-symbols-outlined text-[17px]">print</span>
              <span>도안 인쇄</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tab Scroller */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 border-t border-on-surface/[0.06] scrollbar-none bg-surface-container-low/70">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={
                "px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all " +
                (isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant bg-white/80")
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
