import React, { useState } from 'react';
import TopNavBar from './components/common/TopNavBar';
import VideoModal from './components/common/VideoModal';
import HomePage from './pages/HomePage';
import SweaterPage from './pages/SweaterPage';
import BeaniePage from './pages/BeaniePage';
import SocksPage from './pages/SocksPage';
import ScarfPage from './pages/ScarfPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: '', title: '' });

  const handleOpenVideo = (videoId, title) => {
    setVideoModal({ isOpen: true, videoId, title });
  };

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, videoId: '', title: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f3] text-[#201b13]">
      {/* 1. Global Navigation */}
      <TopNavBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onSelectTab={setActiveTab} />}
        {activeTab === 'sweater' && <SweaterPage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'beanie' && <BeaniePage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'socks' && <SocksPage onOpenVideo={handleOpenVideo} />}
        {activeTab === 'scarf' && <ScarfPage onOpenVideo={handleOpenVideo} />}
      </main>

      {/* 3. Global Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoId={videoModal.videoId}
        title={videoModal.title}
        onClose={handleCloseVideo}
      />

      {/* 4. Footer */}
      <footer className="bg-surface-container-low border-t border-on-surface/[0.08] py-8 text-center text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-serif font-bold text-sm text-on-surface mb-1">KNITTING STUDIO · 리액트 에디션</p>
          <p className="text-xs text-outline">모든 게이지와 치수가 100% 실시간 연산되는 스마트 뜨개 도안 플랫폼</p>
        </div>
      </footer>
    </div>
  );
}
