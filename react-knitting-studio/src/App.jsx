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
import { supabase } from './services/supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: '', title: '' });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpenVideo = (videoId, title) => {
    setVideoModal({ isOpen: true, videoId, title });
  };

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, videoId: '', title: '' });
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('KNIT_ACTIVE_USER', JSON.stringify(user));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    localStorage.removeItem('KNIT_ACTIVE_USER');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f3] text-[#201b13]">
      {/* 1. Global Navigation */}
      <TopNavBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onSelectTab={setActiveTab} />}
        {activeTab === 'sweater' && <SweaterPage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'beanie' && <BeaniePage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'socks' && <SocksPage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'scarf' && <ScarfPage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'community' && (
          <CommunityPage
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* 3. Global Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoId={videoModal.videoId}
        title={videoModal.title}
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
          <p className="text-xs text-outline">모든 게이지와 치수가 100% 실시간 연산되는 스마트 뜨개 도안 플랫폼 & 커뮤니티 사랑방</p>
        </div>
      </footer>
    </div>
  );
}
