import React, { useState, useRef, useEffect } from 'react';

export default function TopNavBar({
  activeTab,
  onSelectTab,
  currentUser,
  isAdmin: propIsAdmin,
  isPrintAllowed: propIsPrintAllowed,
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

  const isPrintAllowed = propIsPrintAllowed !== undefined ? propIsPrintAllowed : isAdmin;

  const userNickname = isAdmin
    ? '관리자'
    : (currentUser?.user_metadata?.nickname || currentUser?.email?.split('@')[0] || '');

  // 뜨개 제품 도안 계산기 그룹
  const productTabs = [
    { id: 'sweater-crew', label: '라운드넥', fullLabel: '라운드넥 스웨터', emoji: '👕', sub: '클래식 탑다운 레글런 풀오버' },
    { id: 'sweater-vneck', label: 'V넥', fullLabel: 'V넥 스웨터', emoji: '👔', sub: '세련된 V라인 탑다운 풀오버' },
    { id: 'sweater-cardigan', label: '가디건', fullLabel: '오픈 가디건', emoji: '🧥', sub: '앞트임 & 단추단 오픈 가디건' },
    { id: 'beanie', label: '비니', fullLabel: '비니 & 와치캡', emoji: '🧢', sub: '와치캡 · 8등분 왕관 줄임' },
    { id: 'socks', label: '양말', fullLabel: '맞춤 양말', emoji: '🧦', sub: '토업 & 커프다운 맞춤' },
    { id: 'scarf', label: '목도리', fullLabel: '변형고무 목도리', emoji: '🧣', sub: '변형고무 & 리브 머플러' }
  ];

  const isProductActive = ['sweater', 'sweater-crew', 'sweater-vneck', 'sweater-cardigan', 'beanie', 'socks', 'scarf'].includes(activeTab);
  
  const currentProduct = productTabs.find((t) => {
    if (t.id === 'sweater-crew') return activeTab === 'sweater' || activeTab === 'sweater-crew';
    return activeTab === t.id;
  });

  const isTabActive = (tabId) => {
    if (tabId === 'sweater-crew') return activeTab === 'sweater' || activeTab === 'sweater-crew';
    return activeTab === tabId;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f3]/95 backdrop-blur-md border-b border-[#201b13]/[0.08] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[3.75rem] sm:min-h-[4.25rem] py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-6">
        {/* 1. Header Logo -> Home Navigation */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group text-left border-0 bg-transparent p-0 focus:outline-none shrink-0"
          title="홈으로 이동"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-primary-hover transition-all shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">gesture</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-extrabold text-base sm:text-lg text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors whitespace-nowrap">
              니팅 스튜디오
            </h1>
            <p className="hidden 2xl:block text-[10px] text-on-surface-variant font-bold tracking-wide whitespace-nowrap">
              SMART KNITTING STUDIO
            </p>
          </div>
        </button>

        {/* 2. Desktop Navigation: 균형 잡힌 황금 비율 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {/* 홈 (Home) */}
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">home</span>
            <span>홈</span>
          </button>

          {/* 도안 계산기 통합 드롭다운 캡슐 (6종 개별 버튼 대신 깔끔한 단일 메뉴) */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowProductMenu(!showProductMenu)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border ${
                isProductActive
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-white border-on-surface/[0.08] shadow-2xs'
              }`}
              title="뜨개 제품 도안 계산기 선택"
            >
              <span className="material-symbols-outlined text-[17px]">
                {currentProduct ? 'checkroom' : 'straighten'}
              </span>
              <span>
                {currentProduct ? `${currentProduct.label} 도안` : '도안 계산기'}
              </span>
              <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${showProductMenu ? 'rotate-180' : ''}`}>
                arrow_drop_down
              </span>
            </button>

            {/* 제품 도안 드롭다운 팝오버 */}
            {showProductMenu && (
              <div
                className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-on-surface/[0.08] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-2 border-b border-on-surface/[0.05] mb-1">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                    KNITTING PATTERN CALCULATORS
                  </span>
                  <span className="text-xs font-bold text-on-surface">뜨개 맞춤 도안 계산기 선택</span>
                </div>
                <div className="space-y-1">
                  {productTabs.map((tab) => {
                    const isActive = isTabActive(tab.id);
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
                            <span className="text-xs font-bold text-on-surface">{tab.fullLabel}</span>
                            {isActive && <span className="text-[10px] font-bold text-primary">선택됨 ✓</span>}
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

          {/* 커뮤니티 */}
          <button
            type="button"
            onClick={() => onSelectTab('community')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'community'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">forum</span>
            <span>사랑방 커뮤니티</span>
          </button>

          {/* 관리자 전용: 커스텀 도안 스튜디오 */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => onSelectTab('custom')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border ${
                activeTab === 'custom'
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white/80 text-primary hover:bg-white border-primary/20 shadow-2xs'
              }`}
              title="관리자 전용: 어깨/실루엣/패턴 파라메트릭 도안 스튜디오"
            >
              <span className="material-symbols-outlined text-[16px]">palette</span>
              <span>커스텀 도안</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="관리자 전용" />
            </button>
          )}

          {/* 관리자 전용: 관리자 센터 */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'bg-[#201b13] text-amber-300 shadow-xs'
                  : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200/80 border border-amber-300/40'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">shield_person</span>
              <span>관리자 센터</span>
            </button>
          )}
        </nav>

        {/* 3. Right User Profile & Action Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-surface-container-low px-2.5 sm:px-3 py-1 rounded-full border border-on-surface/[0.08] shadow-2xs">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                {isAdmin ? '👑' : '👤'}
              </span>
              <span className="text-xs font-bold text-on-surface max-w-[90px] sm:max-w-[120px] truncate">
                {userNickname}
              </span>
              <span className="w-px h-3.5 bg-on-surface/15" />
              <button
                type="button"
                onClick={onSignOut}
                className="text-[11px] font-semibold text-outline hover:text-rose-600 transition-colors cursor-pointer"
                title="로그아웃"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold bg-primary hover:bg-primary-hover text-white transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              <span>로그인</span>
            </button>
          )}

          {/* 도안 인쇄 버튼: 글로벌 인쇄 권한 정책에 따라 노출 */}
          {isPrintAllowed && (
            <button 
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="A4 도안 인쇄"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>도안 인쇄</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tab Scroller */}
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

        {isAdmin && (
          <button
            type="button"
            onClick={() => onSelectTab('custom')}
            className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'custom'
                ? 'bg-primary text-white shadow-2xs'
                : 'bg-white text-primary border border-primary/20'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">palette</span>
            <span>커스텀</span>
            <span className="text-[9px] px-1 rounded-full bg-amber-500/20 text-amber-800 font-bold">관리자</span>
          </button>
        )}

        <span className="w-px h-4 bg-on-surface/15 shrink-0" />

        {/* 2. 제품 그룹 */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-on-surface/[0.08] shrink-0">
          <span className="text-[10px] font-black text-primary px-1.5 shrink-0 whitespace-nowrap">도안</span>
          {productTabs.map((tab) => {
            const isActive = isTabActive(tab.id);
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
