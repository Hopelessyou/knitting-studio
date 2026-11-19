import React, { useState, useRef, useEffect } from 'react';

export default function TopNavBar({
  activeTab,
  onSelectTab,
  currentUser,
  isAdmin: propIsAdmin,
  onOpenAuth,
  onSignOut
}) {
  const [showProductMenu, setShowProductMenu] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProductMenu(false);
      }
    }
    if (showProductMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProductMenu]);

  // Strictly enforce administrator check: must be true ONLY for the admin account
  const isAdmin = Boolean(
    propIsAdmin !== undefined
      ? propIsAdmin
      : (
          currentUser &&
          (currentUser?.user_metadata?.role === 'admin' ||
            currentUser?.user_metadata?.is_admin === true ||
            currentUser?.email === 'admin@knitting-studio.com' ||
            currentUser?.email === 'admin')
        )
  );

  const userNickname = isAdmin
    ? '관리자'
    : (currentUser?.user_metadata?.nickname || currentUser?.email?.split('@')[0] || '');

  // 뜨개 제품 도안 계산기 그룹
  const productTabs = [
    { id: 'sweater', label: '스웨터', emoji: '👕', sub: '탑다운 레글런 · V넥 · 가디건' },
    { id: 'beanie', label: '비니', emoji: '🧢', sub: '와치캡 · 8등분 왕관 줄임' },
    { id: 'socks', label: '양말', emoji: '🧦', sub: '토업 & 커프다운 맞춤' },
    { id: 'scarf', label: '목도리', emoji: '🧣', sub: '변형고무 & 리브 머플러' }
  ];

  const isProductActive = ['sweater', 'beanie', 'socks', 'scarf'].includes(activeTab);

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f3]/95 backdrop-blur-md border-b border-[#201b13]/[0.08] shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[3.75rem] sm:min-h-[4.25rem] py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Header Logo -> Home Navigation */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 sm:gap-3.5 cursor-pointer group text-left border-0 bg-transparent p-0 focus:outline-none shrink-0"
          title="홈으로 이동"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-primary-hover transition-all shrink-0">
            <span className="material-symbols-outlined text-[19px] sm:text-[26px]">gesture</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-extrabold text-base sm:text-xl text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors whitespace-nowrap">
              니팅 스튜디오
            </h1>
            <p className="hidden sm:block text-xs text-on-surface-variant font-bold tracking-wide whitespace-nowrap">
              KNITTING STUDIO · REACT EDITION
            </p>
          </div>
        </button>

        {/* Desktop Navigation: [홈]과 [커뮤니티] 분리 & [스웨터, 비니 등 제품] 한 그룹에 구성 */}
        <nav className="hidden lg:flex items-center gap-2 shrink-0">
          {/* 1. 홈 (Home) 독립 분리 */}
          <div className="bg-surface-container-low p-1 rounded-full border border-on-surface/[0.08] shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => onSelectTab('home')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'home'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">home</span>
              <span>홈</span>
              {activeTab === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </button>
          </div>

          <span className="w-px h-5 bg-on-surface/[0.12] shrink-0" />

          {/* 2. 제품 그룹 (스웨터, 비니 등 제품군 한 그룹으로 통합) */}
          <div className="relative bg-surface-container-low p-1 rounded-full border border-on-surface/[0.08] shadow-2xs flex items-center gap-1 shrink-0">
            {/* 제품 도안 메뉴 트리거 뱃지 */}
            <button
              type="button"
              onClick={() => setShowProductMenu(!showProductMenu)}
              className={`flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isProductActive
                  ? 'text-primary bg-primary/10 hover:bg-primary/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
              }`}
              title="뜨개 제품 도안 목록 보기"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
              <span>제품 도안</span>
              <span
                className="material-symbols-outlined text-[15px] transition-transform duration-200"
                style={{ transform: showProductMenu ? 'rotate(180deg)' : 'none' }}
              >
                expand_more
              </span>
            </button>

            <span className="w-px h-4 bg-on-surface/[0.12] mx-0.5 shrink-0" />

            {/* 제품 4종 다이렉트 탭 */}
            <div className="flex items-center gap-1 shrink-0">
              {productTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      onSelectTab(tab.id);
                      setShowProductMenu(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-primary text-white shadow-xs scale-[1.02]'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/80'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </button>
                );
              })}
            </div>

            {/* 제품 도안 드롭다운 팝오버 */}
            {showProductMenu && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-on-surface/[0.08] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-2 border-b border-on-surface/[0.05] mb-1">
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                    KNITTING PATTERN CALCULATORS
                  </span>
                  <span className="text-xs font-bold text-on-surface">뜨개 제품 맞춤 도안 계산기</span>
                </div>
                <div className="space-y-1">
                  {productTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          onSelectTab(tab.id);
                          setShowProductMenu(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'hover:bg-surface-container-low text-on-surface'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          <span className="text-lg">{tab.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-on-surface">{tab.label}</span>
                            {isActive && <span className="text-[11px] font-bold text-primary">현재 도안 ✓</span>}
                          </div>
                          <p className="text-[11px] text-on-surface-variant truncate">{tab.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <span className="w-px h-5 bg-on-surface/[0.12] shrink-0" />

          {/* 3. 커뮤니티 (Community) 독립 분리 */}
          <div className="bg-surface-container-low p-1 rounded-full border border-on-surface/[0.08] shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => onSelectTab('community')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'community'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">forum</span>
              <span>커뮤니티</span>
              {activeTab === 'community' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </button>
          </div>

          {/* 4. 관리자 센터 (Admin) - 관리자 전용 분리 */}
          {isAdmin && (
            <div className="bg-surface-container-low p-1 rounded-full border border-on-surface/[0.08] shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => onSelectTab('admin')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  activeTab === 'admin'
                    ? 'bg-[#201b13] text-amber-300 shadow-xs'
                    : 'text-primary bg-primary/10 hover:bg-primary/20'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">shield_person</span>
                <span>관리자 센터</span>
                {activeTab === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />}
              </button>
            </div>
          )}
        </nav>

        {/* Right Action Tools: Auth & External */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-surface-container px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-on-surface/[0.08]">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shadow-2xs shrink-0"></span>
              {/* 관리자에게만 관리자 뱃지/버튼 표시 */}
              {isAdmin === true && (
                <button
                  type="button"
                  onClick={() => onSelectTab('admin')}
                  className="px-2 py-0.5 rounded-full bg-[#201b13] hover:bg-primary text-amber-300 hover:text-white text-[10px] font-extrabold flex items-center gap-1 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                  title="관리자 센터로 이동"
                >
                  <span className="material-symbols-outlined text-[13px]">shield_person</span>
                  <span>관리자</span>
                </button>
              )}
              <span className="text-xs font-extrabold text-on-surface max-w-[70px] sm:max-w-[120px] truncate" title={userNickname}>
                {userNickname} 님
              </span>
              <button
                type="button"
                onClick={onSignOut}
                className="text-xs text-outline hover:text-error ml-0.5 font-bold cursor-pointer whitespace-nowrap"
                title="로그아웃"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold bg-surface-container-low hover:bg-surface-container border border-on-surface/[0.1] text-primary transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs active:scale-95 whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[17px]">account_circle</span>
              <span>로그인<span className="hidden sm:inline"> / 회원가입</span></span>
            </button>
          )}

          {/* 도안 인쇄 버튼: 오직 관리자에게만 노출 */}
          {isAdmin === true && (
            <button 
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all cursor-pointer shadow-2xs shrink-0"
              title="도안 인쇄"
            >
              <span className="material-symbols-outlined text-[17px]">print</span>
              <span>도안 인쇄</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tab Scroller: 홈, 제품군, 커뮤니티 분리 (스크롤바 숨김 및 여백 최적화) */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-3 py-2 border-t border-on-surface/[0.06] scrollbar-none no-scrollbar bg-surface-container-low/90 backdrop-blur-sm">
        {/* 1. 홈 */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'home'
              ? 'bg-primary text-white shadow-2xs'
              : 'bg-white text-on-surface-variant border border-on-surface/[0.06]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">home</span>
          <span>홈</span>
        </button>

        <span className="w-px h-4 bg-on-surface/15 shrink-0" />

        {/* 2. 제품 그룹 */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-on-surface/[0.08] shrink-0">
          <span className="text-[10px] font-black text-primary px-1.5 shrink-0 whitespace-nowrap">도안</span>
          {productTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="w-px h-4 bg-on-surface/15 shrink-0" />

        {/* 3. 커뮤니티 */}
        <button
          type="button"
          onClick={() => onSelectTab('community')}
          className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 whitespace-nowrap ${
            activeTab === 'community'
              ? 'bg-primary text-white shadow-2xs'
              : 'bg-white text-on-surface-variant border border-on-surface/[0.06]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">forum</span>
          <span>커뮤니티</span>
        </button>

        {/* 4. 관리자 */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => onSelectTab('admin')}
            className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-[#201b13] text-amber-300 shadow-2xs'
                : 'bg-amber-100 text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">shield_person</span>
            <span>관리자</span>
          </button>
        )}
      </div>
    </header>
  );
}
