import React, { useState, useEffect } from 'react';
import TopNavBar from './components/common/TopNavBar';
import VideoModal from './components/common/VideoModal';
import AuthModal from './components/common/AuthModal';
import HomePage from './pages/HomePage';
import SweaterPage from './pages/SweaterPage';
import BeaniePage from './pages/BeaniePage';
import SocksPage from './pages/SocksPage';
import ScarfPage from './pages/ScarfPage';
import CommunityPage from './pages/CommunityPage';
import AdminPage from './pages/AdminPage';
import CustomStudioPage from './pages/CustomStudioPage';
import { supabase } from './services/supabaseClient';

const getInitialTab = () => {
  if (typeof window !== 'undefined') {
    const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    const validTabs = ['home', 'custom', 'sweater', 'sweater-crew', 'sweater-vneck', 'sweater-cardigan', 'beanie', 'socks', 'scarf', 'community', 'admin'];
    if (validTabs.includes(cleanPath)) {
      return cleanPath;
    }
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (validTabs.includes(hash)) {
      return hash;
    }
  }
  return 'home';
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: '', title: '', query: '' });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // System Configuration (Banner, Print Policy, Maintenance)
  const [systemConfig, setSystemConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('KNIT_SYSTEM_CONFIG');
      return saved ? JSON.parse(saved) : {
        bannerEnabled: true,
        bannerText: '📢 [공지] 2026 니팅 스튜디오 겨울맞이 스마트 도안 계산기 & 사랑방 커뮤니티 정식 오픈!',
        bannerType: 'primary',
        printPolicy: 'admin_only',
        maintenanceMode: false
      };
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const handleConfigUpdate = () => {
      try {
        const saved = localStorage.getItem('KNIT_SYSTEM_CONFIG');
        if (saved) setSystemConfig(JSON.parse(saved));
      } catch (e) {}
    };
    window.addEventListener('knit_config_updated', handleConfigUpdate);
    window.addEventListener('storage', handleConfigUpdate);
    return () => {
      window.removeEventListener('knit_config_updated', handleConfigUpdate);
      window.removeEventListener('storage', handleConfigUpdate);
    };
  }, []);

  // Restore session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
      } else {
        const localActive = localStorage.getItem('KNIT_ACTIVE_USER');
        if (localActive) {
          try {
            setCurrentUser(JSON.parse(localActive));
          } catch (e) {}
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        localStorage.setItem('KNIT_ACTIVE_USER', JSON.stringify(session.user));
        localStorage.setItem('KNIT_CURRENT_USER', JSON.stringify(session.user));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Strictly define administrator status
  const isAdmin = Boolean(
    currentUser && (
      currentUser?.user_metadata?.role === 'admin' ||
      currentUser?.user_metadata?.is_admin === true ||
      currentUser?.email === 'admin@knitting-studio.com' ||
      currentUser?.email === 'admin'
    )
  );

    // Browser History & Popstate sync
  useEffect(() => {
    const handlePopState = () => {
      const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      const validTabs = ['home', 'custom', 'sweater', 'sweater-crew', 'sweater-vneck', 'sweater-cardigan', 'beanie', 'socks', 'scarf', 'community', 'admin'];
      if (validTabs.includes(cleanPath)) {
        setActiveTab(cleanPath);
      } else {
        setActiveTab('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined' && window.history) {
      const targetPath = tab === 'home' ? '/' : `/${tab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  // Security: If not admin, instantly kick out of admin tab
  useEffect(() => {
    if (!isAdmin && activeTab === 'admin') {
      setActiveTab('home');
    }
  }, [isAdmin, activeTab]);

  // Dynamic print permission based on system policy
  const isPrintAllowed = (() => {
    const policy = systemConfig?.printPolicy || 'admin_only';
    if (policy === 'disabled') return false;
    if (policy === 'public') return true;
    if (policy === 'all_members') return currentUser !== null;
    return isAdmin; // default 'admin_only'
  })();

  // Print restriction: sync class and intercept beforeprint
  useEffect(() => {
    if (isPrintAllowed) {
      document.body.classList.add('is-admin-session');
    } else {
      document.body.classList.remove('is-admin-session');
    }

    const handleBeforePrint = (e) => {
      if (!isPrintAllowed) {
        alert('도안 인쇄 기능은 관리자(admin) 전용 기능입니다.');
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, [isPrintAllowed]);

  const handleOpenVideo = (videoId, title, query = '') => {
    setVideoModal({ isOpen: true, videoId, title, query });
  };

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, videoId: '', title: '' });
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('KNIT_ACTIVE_USER', JSON.stringify(user));
    localStorage.setItem('KNIT_CURRENT_USER', JSON.stringify(user));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    localStorage.removeItem('KNIT_ACTIVE_USER');
    localStorage.removeItem('KNIT_CURRENT_USER');
    localStorage.removeItem('KNIT_ADMIN');
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f3] text-[#201b13]">
      {/* 0. Global Emergency/System Notice Banner (Configured from Admin Center) */}
      {systemConfig?.bannerEnabled && systemConfig?.bannerText && (
        <aside
          aria-label="시스템 공지"
          className={
            'py-2 px-4 text-center text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs ' +
            (systemConfig.bannerType === 'emerald'
              ? 'bg-emerald-600 text-white'
              : systemConfig.bannerType === 'warning'
              ? 'bg-amber-600 text-white'
              : systemConfig.bannerType === 'rose'
              ? 'bg-rose-600 text-white'
              : 'bg-primary text-white')
          }
        >
          <span className="material-symbols-outlined text-[16px]">campaign</span>
          <span>{systemConfig.bannerText}</span>
        </aside>
      )}

      {/* 1. Global Navigation */}
      <TopNavBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onSelectTab={handleSelectTab} />}
        {activeTab === 'custom' && (
          <CustomStudioPage
            isAdmin={isPrintAllowed}
            onOpenVideo={handleOpenVideo}
          />
        )}
        {(activeTab === 'sweater' || activeTab === 'sweater-crew' || activeTab === 'sweater-vneck' || activeTab === 'sweater-cardigan') && (
          <SweaterPage
            onOpenVideo={handleOpenVideo}
            isAdmin={isPrintAllowed}
            initialStyle={activeTab === 'sweater-vneck' ? 'vneck' : activeTab === 'sweater-cardigan' ? 'cardigan' : 'crew'}
          />
        )}
        {activeTab === 'beanie' && <BeaniePage onOpenVideo={handleOpenVideo} isAdmin={isPrintAllowed} />}
        {activeTab === 'socks' && <SocksPage onOpenVideo={handleOpenVideo} isAdmin={isPrintAllowed} />}
        {activeTab === 'scarf' && <ScarfPage onOpenVideo={handleOpenVideo} isAdmin={isPrintAllowed} />}
        {activeTab === 'community' && (
          <CommunityPage
            currentUser={currentUser}
            isAdmin={isAdmin}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}
        {activeTab === 'admin' && (
          <AdminPage
            currentUser={currentUser}
            isAdmin={isAdmin}
            onSelectTab={handleSelectTab}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* 3. Global Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoId={videoModal.videoId}
        title={videoModal.title}
        query={videoModal.query}
        onClose={handleCloseVideo}
      />

      {/* 4. Global Pure & Minimal Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* 5. Footer */}
      <footer className="bg-surface-container-low border-t border-on-surface/[0.08] py-8 text-center text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-serif font-bold text-sm text-on-surface mb-1">KNITTING STUDIO · 리액트 에디션</p>
          <p className="text-xs text-outline">모든 게이지와 치수가 100% 실시간 연산되는 스마트 뜨개 도안 플랫폼 &amp; 커뮤니티 사랑방</p>
        </div>
      </footer>
    </div>
  );
}
