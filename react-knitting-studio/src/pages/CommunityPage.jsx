import React, { useState, useEffect } from 'react';

const INITIAL_SAMPLE_POSTS = [
  {
    id: 'post-1',
    category: 'gallery',
    title: '생애 첫 탑다운 레글런 스웨터 완성! 도안 계산기 덕분에 목둘레가 딱 맞아요',
    content: '게이지 18코 24단으로 계산기 돌려서 시작했는데, 목둘레 튜블러 코잡기부터 요크 M1R/M1L 사선 늘림, 소매 분리까지 한 번도 푸르시오 없이 2주 만에 끝냈습니다! 실은 캐시미어 블렌드 울 8볼 사용했어요. 초보자분들도 계산기 도안대로만 뜨면 실패 안 하실 거예요.',
    author: '포근한겨울',
    badge: '스웨터 마스터',
    date: '30분 전',
    image: '/images/sweater_loose.jpg',
    gauge: '18코 24단',
    needle: '4.5mm 조립식 바늘',
    yarn: '캐시미어 울 8볼',
    likes: 42,
    views: 185,
    userLiked: false,
    comments: [
      { author: '뜨개요정', text: '와 목둘레 튜블러 코잡기 정말 깔끔하네요! 핏이 너무 예쁩니다.', date: '25분 전' },
      { author: '털실러버', text: '색상이 너무 고급스러워요 축하드립니다~ 실 정보 좀 더 알 수 있을까요?', date: '10분 전' }
    ]
  },
  {
    id: 'post-2',
    category: 'tips',
    title: '왕관 줄임 비니 정수리 울퉁불퉁 솟지 않게 줄이는 3가지 꿀팁',
    content: '8등분 왕관 줄임할 때 마지막 16코 남았을 때 바로 돗바늘로 오므리지 마시고, 2코 모아뜨기 한 바퀴 더 돌려 8코로 만든 뒤 조여주시면 꼭짓점이 뿔처럼 울퉁불퉁 솟지 않고 완벽한 반구형 핏이 나옵니다. 바늘도 마지막 줄임 전 숏서큘러에서 장갑바늘이나 매직루프로 교체하면 코 늘어짐을 방지할 수 있어요.',
    author: '도안연구원',
    badge: '테크니컬 니터',
    date: '2시간 전',
    image: '/images/beanie_watchcap.jpg',
    gauge: '20코 26단',
    needle: '4.0mm 숏팁 40cm',
    yarn: '메리노울 2볼',
    likes: 88,
    views: 342,
    userLiked: false,
    comments: [
      { author: '초보탈출', text: '맨날 정수리가 솟아서 고민이었는데 마지막 8코 줄임 꿀팁 감사합니다!', date: '1시간 전' },
      { author: '모자장인', text: '숏팁에서 매직루프로 바꾸는 타이밍 설명이 아주 정확하시네요.', date: '40분 전' }
    ]
  },
  {
    id: 'post-3',
    category: 'qna',
    title: '저먼 숏로우(GSR) 양말 뒤꿈치 구멍 안 생기는 턴 텐션 질문드립니다',
    content: '되돌아뜨기 할 때 더블스티치를 만들면서 실을 뒤로 넘길 때 너무 세게 당기면 다음 단에서 바늘이 안 들어가고, 살살 당기면 뒤꿈치 경계면에 구멍이 숭숭 뚫려요. 적당한 손장력 텐션 노하우가 있을까요? 오팔 삭얀 4ply에 2.5mm 줄바늘 사용 중입니다.',
    author: '양말꿈나무',
    badge: '질문 해결대기',
    date: '3시간 전',
    image: '/images/socks_toeup.jpg',
    gauge: '30코 42단',
    needle: '2.5mm 80cm 줄바늘',
    yarn: '오팔 삭얀 4ply',
    likes: 19,
    views: 120,
    userLiked: false,
    comments: [
      { author: '양말장인', text: '실을 뒤로 넘길 때 사선이 아니라 바늘과 90도 수직 각도로 딱 소리 나지 않을 정도로만 당겨서 두 가닥 다리가 바늘 위에 단단히 안착되게 해주면 구멍이 전혀 안 납니다!', date: '2시간 전' }
    ]
  },
  {
    id: 'post-4',
    category: 'gallery',
    title: '변형고무뜨기 목도리 2미터 완성! 양쪽 아이코드 3코 엣지 추천해요',
    content: '양쪽 3코씩 아이코드 가장자리 넣고 떴더니 사방이 전혀 말리지 않고 두툼한 호텔 담요 같은 에어쿠션 질감이 나왔어요. 선물용으로 떴는데 받는 분이 백화점 브랜드 목도리 같다고 너무 좋아하네요. 실 소요량 계산기대로 5볼 딱 맞았습니다.',
    author: '겨울바람',
    badge: '따뜻한 이웃',
    date: '5시간 전',
    image: '/images/scarf_rib.jpg',
    gauge: '14코 18단',
    needle: '6.0mm 대바늘',
    yarn: '알파카 벌키 5볼',
    likes: 63,
    views: 290,
    userLiked: false,
    comments: [
      { author: '니팅홀릭', text: '아이코드 엣지 진짜 깔끔하네요! 다음 목도리는 꼭 이 기법으로 떠봐야겠어요.', date: '3시간 전' }
    ]
  },
  {
    id: 'post-5',
    category: 'tips',
    title: '세탁 전 vs 세탁 후 게이지 블로킹 수축률 비교 (울 100% vs 아크릴 혼방)',
    content: '메리노울 100%는 미온수 울샴푸 세탁 및 스팀 블로킹 시 가로 폭이 약 4~5% 늘어나고 세로 단수가 약간 줄어듭니다. 반면 아크릴 혼방은 탄성이 강해 게이지 변동이 거의 없습니다. 탑다운 스웨터 뜨실 때 꼭 10x10cm 스와치 세탁 후 치수로 계산기에 입력하세요!',
    author: '게이지박사',
    badge: '도안 검수위원',
    date: '8시간 전',
    image: null,
    gauge: '스와치 정밀 측정',
    needle: '각종 호수 비교',
    yarn: '메리노울 vs 아크릴혼방',
    likes: 54,
    views: 245,
    userLiked: false,
    comments: [
      { author: '꼼꼼니터', text: '스와치 세탁 전후 차이 데이터 공유 감사합니다. 스웨터 뜨기 전 필수 필독서네요.', date: '6시간 전' }
    ]
  },
  {
    id: 'post-6',
    category: 'lounge',
    title: '다들 드라마 보면서 뜨개질할 때 안 틀리는 나만의 루틴이 있으신가요?',
    content: '단순 무한 메리야스 뜨기 구간은 자막 없는 한국 드라마 볼 때 몰아서 뜨고, 레글런 사선 늘림이나 무늬 뜨기 구간은 라디오나 팟캐스트만 틀어놓고 카운터 어플 켜둡니다 ㅎㅎ 여러분만의 힐링 뜨개 루틴이 궁금해요!',
    author: '힐링니터',
    badge: '사랑방 단골',
    date: '12시간 전',
    image: null,
    gauge: '힐링 무한단',
    needle: '내 손에 익은 바늘',
    yarn: '포근한 모든 실',
    likes: 31,
    views: 180,
    userLiked: false,
    comments: [
      { author: '주말니터', text: '저랑 완전 똑같으세요! 자막 있는 미드 볼 때는 절대 코 늘림 하면 안 됩니다 ㅋㅋㅋ', date: '9시간 전' }
    ]
  }
];

export default function CommunityPage({ currentUser, onOpenAuthModal }) {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [detailPost, setDetailPost] = useState(null);

  // New post form state
  const [newCategory, setNewCategory] = useState('gallery');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newGauge, setNewGauge] = useState('');
  const [newNeedle, setNewNeedle] = useState('');
  const [newYarn, setNewYarn] = useState('');
  const [newImage, setNewImage] = useState(null);

  // Comment input state
  const [commentText, setCommentText] = useState('');

  // Load posts
  useEffect(() => {
    const saved = localStorage.getItem('KNIT_COMMUNITY_POSTS_V4');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(INITIAL_SAMPLE_POSTS);
      }
    } else {
      setPosts(INITIAL_SAMPLE_POSTS);
      localStorage.setItem('KNIT_COMMUNITY_POSTS_V4', JSON.stringify(INITIAL_SAMPLE_POSTS));
    }
  }, []);

  const savePosts = (updated) => {
    setPosts(updated);
    localStorage.setItem('KNIT_COMMUNITY_POSTS_V4', JSON.stringify(updated));
  };

  const handleOpenWrite = () => {
    if (!currentUser) {
      alert('게시글을 작성하려면 먼저 로그인해 주세요! 🧶');
      onOpenAuthModal();
      return;
    }
    setIsWriteOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setNewImage(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('제목과 본문을 입력해 주세요.');
      return;
    }

    const authorNick = currentUser?.user_metadata?.nickname || currentUser?.email?.split('@')[0] || '니터';
    const newPost = {
      id: 'post-' + Date.now(),
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      author: authorNick,
      badge: '열정 니터',
      date: '방금 전',
      image: newImage || null,
      gauge: newGauge.trim() || null,
      needle: newNeedle.trim() || null,
      yarn: newYarn.trim() || null,
      likes: 0,
      views: 1,
      userLiked: false,
      comments: []
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    setIsWriteOpen(false);

    // Reset
    setNewTitle('');
    setNewContent('');
    setNewGauge('');
    setNewNeedle('');
    setNewYarn('');
    setNewImage(null);
  };

  const handleToggleLike = (postId, e) => {
    if (e) e.stopPropagation();
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const nextLiked = !p.userLiked;
        return {
          ...p,
          userLiked: nextLiked,
          likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      }
      return p;
    });
    savePosts(updated);

    if (detailPost && detailPost.id === postId) {
      const target = updated.find(p => p.id === postId);
      setDetailPost(target);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!currentUser) {
      alert('댓글을 남기려면 먼저 로그인해 주세요! 🧶');
      onOpenAuthModal();
      return;
    }

    const authorNick = currentUser?.user_metadata?.nickname || currentUser?.email?.split('@')[0] || '니터';
    const updated = posts.map((p) => {
      if (p.id === detailPost.id) {
        const newComments = [
          ...p.comments,
          { author: authorNick, text: commentText.trim(), date: '방금 전' }
        ];
        return { ...p, comments: newComments };
      }
      return p;
    });
    savePosts(updated);
    setDetailPost(updated.find(p => p.id === detailPost.id));
    setCommentText('');
  };

  // Filtered & Sorted list
  const filteredPosts = posts
    .filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          (p.yarn && p.yarn.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes;
      if (sortBy === 'comments') return b.comments.length - a.comments.length;
      return 0; // newest as stored
    });

  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Hero Welcome Section */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3.5 border border-primary/20 shadow-2xs">
          KNITTERS LOUNGE & COMMUNITY
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-on-surface mb-3.5 tracking-tight">
          뜨개인들의 따뜻한 사랑방, <span className="text-primary">니팅 커뮤니티</span> 🧶
        </h2>
        <p className="text-base font-medium text-on-surface-variant leading-relaxed">
          나만의 맞춤 스웨터·양말 완성작을 자랑하고, 게이지 꿀팁과 실·바늘 노하우를 자유롭게 나눠보세요.
        </p>

        {/* Realtime Stats Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest border border-on-surface/[0.1] text-xs font-bold text-on-surface shadow-xs">
            <span>🧵 공유된 작품</span>
            <strong className="text-primary text-sm font-extrabold">{posts.length}개</strong>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest border border-on-surface/[0.1] text-xs font-bold text-on-surface shadow-xs">
            <span>❤️ 누적 응원</span>
            <strong className="text-primary text-sm font-extrabold">{totalLikes}회</strong>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest border border-on-surface/[0.1] text-xs font-bold text-on-surface shadow-xs">
            <span>💬 뜨개 질문 & 답변</span>
            <strong className="text-primary text-sm font-extrabold">{totalComments}개</strong>
          </div>
        </div>
      </div>

      {/* 2. Trending Spotlight Banner */}
      <div 
        onClick={() => {
          const target = posts.find(p => p.id === 'post-2');
          if (target) setDetailPost(target);
        }}
        className="mb-8 p-4.5 sm:p-5 rounded-2xl bg-gradient-to-r from-primary/15 via-surface-container-low to-primary/8 border border-primary/25 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-all shadow-xs group"
      >
        <div className="flex items-center gap-3.5">
          <span className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-base shadow-xs shrink-0">
            🔥
          </span>
          <div>
            <span className="text-xs font-extrabold text-primary block tracking-wide mb-0.5">이번 주 가장 인기 있는 뜨개 노하우</span>
            <span className="text-base font-serif font-extrabold text-on-surface group-hover:text-primary transition-colors">
              정수리 안 솟는 8등분 왕관 비니 줄임 공식 (조회 3.4k · 응원 342)
            </span>
          </div>
        </div>
        <span className="text-xs font-extrabold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
          <span>바로보기</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </span>
      </div>

      {/* 3. Category & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-on-surface/[0.1] pb-6 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {[
            { id: 'all', label: '전체' },
            { id: 'gallery', label: '🧵 완성작 갤러리' },
            { id: 'tips', label: '📐 게이지·도안 팁' },
            { id: 'qna', label: '🧶 실·바늘 Q&A' },
            { id: 'lounge', label: '☕ 자유 수다' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={
                "px-4 py-2.5 rounded-full text-xs font-extrabold transition-all shrink-0 cursor-pointer " +
                (activeCategory === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high')
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Tools: Search, Sort & Write CTA */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <span className="material-symbols-outlined text-outline text-[19px] absolute left-3.5 top-2.5">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="기법, 실, 작성자 검색..."
              className="w-full bg-surface-container-lowest border border-on-surface/[0.1] focus:border-primary focus:ring-1 focus:ring-primary rounded-full py-2.5 pl-10 pr-3 text-xs font-medium text-on-surface placeholder:text-outline"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container-lowest border border-on-surface/[0.1] rounded-full py-2.5 px-3.5 text-xs font-bold text-on-surface cursor-pointer shrink-0"
          >
            <option value="newest">최신순</option>
            <option value="popular">인기순</option>
            <option value="comments">댓글 많은 순</option>
          </select>

          {/* Write CTA */}
          <button
            type="button"
            onClick={handleOpenWrite}
            className="px-4.5 py-2.5 bg-primary text-white font-extrabold rounded-full text-xs shadow-sm hover:bg-primary-hover transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">edit</span>
            <span>새 글 쓰기</span>
          </button>
        </div>
      </div>

      {/* 4. 3-Column Posts Feed Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-on-surface/[0.08]">
          <span className="text-5xl block mb-3.5">🧶</span>
          <p className="text-base font-extrabold text-on-surface">등록된 게시글이 없습니다.</p>
          <p className="text-xs font-medium text-outline mt-1.5">첫 번째 따뜻한 뜨개 이야기를 나눠보세요!</p>
          <button
            type="button"
            onClick={handleOpenWrite}
            className="mt-5 px-5 py-2.5 bg-primary text-white font-extrabold rounded-full text-xs shadow-sm hover:bg-primary-hover cursor-pointer"
          >
            첫 글 작성하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setDetailPost(post)}
              className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-on-surface/[0.08] shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Photo Thumbnail if exists */}
                {post.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                      {post.category === 'gallery' && '🧵 완성작 갤러리'}
                      {post.category === 'tips' && '📐 게이지·도안 팁'}
                      {post.category === 'qna' && '🧶 실·바늘 Q&A'}
                      {post.category === 'lounge' && '☕ 자유 수다'}
                    </span>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <span className="inline-block bg-primary/10 text-primary text-[11px] font-extrabold px-3 py-1 rounded-full mb-1 border border-primary/15">
                      {post.category === 'gallery' && '🧵 완성작 갤러리'}
                      {post.category === 'tips' && '📐 게이지·도안 팁'}
                      {post.category === 'qna' && '🧶 실·바늘 Q&A'}
                      {post.category === 'lounge' && '☕ 자유 수다'}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-on-surface">{post.author}</span>
                      {post.badge && (
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                          {post.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-outline text-xs font-medium">{post.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serif text-on-surface group-hover:text-primary transition-colors mb-2.5 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs font-medium text-on-surface-variant leading-relaxed line-clamp-3 mb-4.5">
                    {post.content}
                  </p>

                  {/* Knitwear Spec Tags */}
                  {(post.gauge || post.yarn || post.needle) && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.gauge && (
                        <span className="text-[11px] font-bold bg-surface-container text-on-surface px-2.5 py-1 rounded-lg border border-on-surface/[0.05]">
                          📐 {post.gauge}
                        </span>
                      )}
                      {post.yarn && (
                        <span className="text-[11px] font-bold bg-surface-container text-on-surface px-2.5 py-1 rounded-lg border border-on-surface/[0.05]">
                          🧶 {post.yarn}
                        </span>
                      )}
                      {post.needle && (
                        <span className="text-[11px] font-bold bg-surface-container text-on-surface px-2.5 py-1 rounded-lg border border-on-surface/[0.05]">
                          🪡 {post.needle}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 py-3.5 border-t border-on-surface/[0.06] bg-surface-container-low/50 flex items-center justify-between text-xs font-bold text-on-surface-variant">
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(post.id, e)}
                    className={
                      "flex items-center gap-1.5 cursor-pointer transition-colors " +
                      (post.userLiked ? 'text-primary font-extrabold' : 'hover:text-primary')
                    }
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {post.userLiked ? 'favorite' : 'favorite_border'}
                    </span>
                    <span>{post.likes}</span>
                  </button>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                    <span>{post.comments.length}</span>
                  </span>
                </div>
                <span className="text-primary font-extrabold text-xs group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  <span>상세보기</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 5. Pagination */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          className={
            "w-10 h-10 rounded-full text-xs font-extrabold transition-all cursor-pointer " +
            (currentPage === 1 ? 'bg-primary text-white shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high')
          }
        >
          1
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage(2)}
          className={
            "w-10 h-10 rounded-full text-xs font-extrabold transition-all cursor-pointer " +
            (currentPage === 2 ? 'bg-primary text-white shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high')
          }
        >
          2
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage(3)}
          className={
            "w-10 h-10 rounded-full text-xs font-extrabold transition-all cursor-pointer " +
            (currentPage === 3 ? 'bg-primary text-white shadow-xs' : 'bg-surface-container text-on-surface hover:bg-surface-container-high')
          }
        >
          3
        </button>
        <button
          type="button"
          className="px-4 h-10 rounded-full text-xs font-extrabold bg-surface-container text-on-surface hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>다음</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </button>
      </div>

      {/* 6. Write Modal */}
      {isWriteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-on-surface/[0.08]">
            <div className="flex items-center justify-between px-6 py-4.5 bg-surface-container-low border-b border-on-surface/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧶</span>
                <h3 className="font-serif font-extrabold text-base text-on-surface">새 뜨개 글 쓰기</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWriteOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="p-6 flex flex-col gap-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">카테고리</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-on-surface/[0.1] rounded-xl py-2.5 px-3 text-on-surface font-bold"
                  >
                    <option value="gallery">🧵 완성작 갤러리</option>
                    <option value="tips">📐 게이지·도안 팁</option>
                    <option value="qna">🧶 실·바늘 Q&A</option>
                    <option value="lounge">☕ 자유 수다</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">작성자</label>
                  <input
                    type="text"
                    disabled
                    value={currentUser?.user_metadata?.nickname || currentUser?.email?.split('@')[0] || ''}
                    className="w-full bg-surface-container border border-on-surface/[0.1] rounded-xl py-2.5 px-3 text-on-surface font-extrabold opacity-85"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">제목</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="따뜻한 제목을 입력해 주세요"
                  required
                  className="w-full bg-surface-container-low border border-on-surface/[0.1] rounded-xl py-2.5 px-3.5 text-on-surface font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">게이지 (선택)</label>
                  <input
                    type="text"
                    value={newGauge}
                    onChange={(e) => setNewGauge(e.target.value)}
                    placeholder="예: 20코 26단"
                    className="w-full bg-surface-container-low border border-on-surface/[0.1] rounded-xl py-2 px-3 text-on-surface font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">바늘 호수 (선택)</label>
                  <input
                    type="text"
                    value={newNeedle}
                    onChange={(e) => setNewNeedle(e.target.value)}
                    placeholder="예: 4.0mm 줄바늘"
                    className="w-full bg-surface-container-low border border-on-surface/[0.1] rounded-xl py-2 px-3 text-on-surface font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">사용한 실 (선택)</label>
                  <input
                    type="text"
                    value={newYarn}
                    onChange={(e) => setNewYarn(e.target.value)}
                    placeholder="예: 메리노울 4볼"
                    className="w-full bg-surface-container-low border border-on-surface/[0.1] rounded-xl py-2 px-3 text-on-surface font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">완성작 사진 첨부 (선택)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-outline file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:bg-surface-container file:text-primary file:font-extrabold cursor-pointer"
                />
                {newImage && (
                  <div className="relative mt-2.5 inline-block">
                    <img src={newImage} alt="미리보기" className="h-32 rounded-xl object-cover border" />
                    <button
                      type="button"
                      onClick={() => setNewImage(null)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">본문 내용</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="뜨개 경험이나 노하우, 궁금한 점을 자유롭게 적어주세요..."
                  required
                  className="w-full bg-surface-container-low border border-on-surface/[0.1] rounded-xl p-3.5 text-on-surface leading-relaxed font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-primary text-white font-extrabold text-sm shadow-sm hover:bg-primary-hover active:scale-98 transition-all cursor-pointer"
              >
                게시글 등록하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. Detail & Comments Modal */}
      {detailPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" 
          onClick={() => setDetailPost(null)}
        >
          <div 
            className="bg-surface-container-lowest w-full max-w-2xl max-h-[88vh] rounded-3xl overflow-hidden shadow-2xl border border-on-surface/[0.08] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 bg-surface-container-low border-b border-on-surface/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="text-xs bg-primary/10 text-primary font-extrabold px-3 py-1 rounded-full border border-primary/20">
                  {detailPost.category === 'gallery' && '🧵 완성작 갤러리'}
                  {detailPost.category === 'tips' && '📐 게이지·도안 팁'}
                  {detailPost.category === 'qna' && '🧶 실·바늘 Q&A'}
                  {detailPost.category === 'lounge' && '☕ 자유 수다'}
                </span>
                <span className="text-xs text-outline font-medium">작성일: {detailPost.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setDetailPost(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 text-sm font-medium">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-on-surface mb-3.5 leading-snug">
                {detailPost.title}
              </h2>
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant mb-4.5 pb-4.5 border-b border-on-surface/[0.08]">
                <span className="font-extrabold text-on-surface text-sm">{detailPost.author}</span>
                {detailPost.badge && (
                  <span className="bg-surface-container text-on-surface font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                    {detailPost.badge}
                  </span>
                )}
              </div>

              {detailPost.image && (
                <img
                  src={detailPost.image}
                  alt={detailPost.title}
                  className="w-full max-h-96 object-contain rounded-2xl bg-surface-container mb-5 shadow-xs"
                />
              )}

              <p className="text-on-surface leading-relaxed whitespace-pre-line mb-6 font-medium text-sm sm:text-base">
                {detailPost.content}
              </p>

              {/* Specs Grid */}
              {(detailPost.gauge || detailPost.needle || detailPost.yarn) && (
                <div className="bg-surface-container-low p-4.5 rounded-2xl mb-6 grid grid-cols-3 gap-3 text-xs border border-on-surface/[0.06]">
                  {detailPost.gauge && (
                    <div>
                      <span className="text-outline block text-[10px] font-bold mb-0.5">게이지</span>
                      <strong className="text-on-surface font-extrabold text-sm">{detailPost.gauge}</strong>
                    </div>
                  )}
                  {detailPost.needle && (
                    <div>
                      <span className="text-outline block text-[10px] font-bold mb-0.5">바늘 호수</span>
                      <strong className="text-on-surface font-extrabold text-sm">{detailPost.needle}</strong>
                    </div>
                  )}
                  {detailPost.yarn && (
                    <div>
                      <span className="text-outline block text-[10px] font-bold mb-0.5">사용한 실</span>
                      <strong className="text-on-surface font-extrabold text-sm">{detailPost.yarn}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Likes Button */}
              <div className="flex items-center justify-center my-6">
                <button
                  type="button"
                  onClick={() => handleToggleLike(detailPost.id)}
                  className={
                    "px-7 py-3 rounded-full border flex items-center gap-2.5 text-sm font-extrabold cursor-pointer transition-all active:scale-95 shadow-xs " +
                    (detailPost.userLiked
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'border-on-surface/15 hover:border-primary/50 text-on-surface')
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {detailPost.userLiked ? 'favorite' : 'favorite_border'}
                  </span>
                  <span>따뜻한 응원 {detailPost.likes}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="border-t border-on-surface/[0.08] pt-6">
                <h4 className="font-extrabold text-base text-on-surface mb-3.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>댓글 {detailPost.comments.length}개</span>
                </h4>

                <div className="flex flex-col gap-3 mb-4.5">
                  {detailPost.comments.length === 0 ? (
                    <p className="text-xs text-outline py-2.5 font-medium">첫 번째 응원의 댓글을 남겨보세요!</p>
                  ) : (
                    detailPost.comments.map((c, idx) => (
                      <div key={idx} className="bg-surface-container-low p-4 rounded-2xl text-xs border border-on-surface/[0.04]">
                        <div className="flex items-center justify-between text-on-surface-variant mb-1.5">
                          <strong className="text-on-surface font-extrabold text-sm">{c.author}</strong>
                          <span className="text-[11px] text-outline font-medium">{c.date}</span>
                        </div>
                        <p className="text-on-surface leading-relaxed font-medium">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2.5">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="따뜻한 응원과 조언을 남겨보세요..."
                    className="flex-1 bg-surface-container-low border border-on-surface/[0.1] rounded-xl px-4 py-2.5 text-xs text-on-surface font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary text-white font-extrabold rounded-xl text-xs hover:bg-primary-hover active:scale-95 cursor-pointer shrink-0 transition-all shadow-xs"
                  >
                    등록
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
