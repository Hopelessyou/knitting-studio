import React from 'react';

export default function VideoModal({ isOpen, videoId, title, query, onClose }) {
  if (!isOpen) return null;

  const searchQuery = query || title || '대바늘 기초 뜨개질';
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        {/* Header */}
        <div className="p-4 border-b border-on-surface/[0.08] flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <h4 className="text-sm font-bold text-on-surface">{title || '기법 참고 영상'}</h4>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-red-200"
              title="YouTube 새 창에서 검색하기"
            >
              <span className="material-symbols-outlined text-[15px]">smart_display</span>
              <span>YouTube에서 보기</span>
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video bg-black">
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
              <span className="material-symbols-outlined text-4xl text-red-500 mb-2">smart_display</span>
              <p className="text-sm font-bold mb-3">{title} 튜토리얼</p>
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all flex items-center gap-1.5"
              >
                <span>YouTube에서 검색 영상 바로보기</span>
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-surface-container-low border-t border-on-surface/[0.06] flex items-center justify-between text-xs text-on-surface-variant">
          <span>💡 영상이 재생되지 않을 경우 상단의 <strong>[YouTube에서 보기]</strong> 버튼을 누르면 바로 시청할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
}
