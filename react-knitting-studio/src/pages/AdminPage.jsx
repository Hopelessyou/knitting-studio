import React, { useState, useEffect } from 'react';

// ==========================================
// 1. DEFAULT DATA DEFINITIONS
// ==========================================
const DEFAULT_USERS = [
  {
    id: 'u-admin',
    email: 'admin@knitting-studio.com',
    nickname: '관리자',
    role: 'admin',
    status: 'active', // 'active' | 'warning' | 'suspended' | 'banned'
    joinedAt: '2026-11-01',
    postCount: 12,
    commentCount: 45,
    note: '최고 관리자 계정 (Super Admin)'
  },
  {
    id: 'u-1',
    email: 'winter_warmth@knitting.com',
    nickname: '포근한겨울',
    role: 'member',
    status: 'active',
    joinedAt: '2026-11-05',
    postCount: 5,
    commentCount: 28,
    note: '우수 활동 회원 (스웨터 마스터)'
  },
  {
    id: 'u-2',
    email: 'pattern_lab@knitting.com',
    nickname: '도안연구원',
    role: 'member',
    status: 'active',
    joinedAt: '2026-11-08',
    postCount: 8,
    commentCount: 64,
    note: '테크니컬 도안 검수 기여자'
  },
  {
    id: 'u-3',
    email: 'socks_lover@knitting.com',
    nickname: '양말꿈나무',
    role: 'member',
    status: 'active',
    joinedAt: '2026-11-10',
    postCount: 2,
    commentCount: 15,
    note: '양말 전문 니터'
  },
  {
    id: 'u-4',
    email: 'healing_knit@knitting.com',
    nickname: '힐링니터',
    role: 'member',
    status: 'active',
    joinedAt: '2026-11-12',
    postCount: 3,
    commentCount: 9,
    note: '커뮤니티 사랑방 단골'
  },
  {
    id: 'u-5',
    email: 'gauge_doctor@knitting.com',
    nickname: '게이지박사',
    role: 'member',
    status: 'active',
    joinedAt: '2026-11-13',
    postCount: 4,
    commentCount: 31,
    note: '게이지 정밀 계측 칼럼니스트'
  },
  {
    id: 'u-6',
    email: 'spammer_bot99@promo.xyz',
    nickname: '대박이벤트',
    role: 'member',
    status: 'banned',
    joinedAt: '2026-11-16',
    postCount: 1,
    commentCount: 8,
    note: '스팸 홍보물 반복 작성으로 영구 차단됨'
  }
];

const DEFAULT_SYSTEM_CONFIG = {
  bannerEnabled: true,
  bannerText: '📢 [공지] 2026 니팅 스튜디오 겨울맞이 스마트 도안 계산기 & 사랑방 커뮤니티 정식 오픈!',
  bannerType: 'primary', // 'primary' | 'emerald' | 'warning' | 'rose'
  printPolicy: 'admin_only', // 'admin_only' | 'all_members' | 'public' | 'disabled'
  maintenanceMode: false
};

export default function AdminPage({ currentUser, isAdmin, onSelectTab, onOpenAuthModal }) {
  // Navigation
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'users' | 'posts' | 'comments' | 'system' | 'logs'
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // 1. Users state
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  // User Modals
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserNickname, setNewUserNickname] = useState('');
  const [newUserRole, setNewUserRole] = useState('member');
  const [newUserNote, setNewUserNote] = useState('');

  const [editUser, setEditUser] = useState(null);

  // 2. Posts state
  const [posts, setPosts] = useState([]);
  const [postSearch, setPostSearch] = useState('');
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');
  const [postStatusFilter, setPostStatusFilter] = useState('all'); // 'all' | 'pinned' | 'hidden' | 'public'

  // Post Edit Modal
  const [editPost, setEditPost] = useState(null);

  // 3. Comments state
  const [commentSearch, setCommentSearch] = useState('');
  const [commentStatusFilter, setCommentStatusFilter] = useState('all'); // 'all' | 'active' | 'blind'

  // 4. System & Config state
  const [systemConfig, setSystemConfig] = useState(DEFAULT_SYSTEM_CONFIG);

  // 5. Audit Logs state
  const [auditLogs, setAuditLogs] = useState([]);

  // Confirmation Delete Modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Show Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 2800);
  };

  // Add Audit Log
  const logAction = (action, target, detail = '') => {
    const newLog = {
      id: 'log-' + Date.now(),
      action,
      target,
      detail,
      operator: currentUser?.user_metadata?.nickname || currentUser?.email || '관리자',
      timestamp: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    const updated = [newLog, ...auditLogs].slice(0, 100);
    setAuditLogs(updated);
    localStorage.setItem('KNIT_ADMIN_AUDIT_LOGS', JSON.stringify(updated));
  };

  // Load Data on Mount
  useEffect(() => {
    // 1. Load Users
    const savedUsers = localStorage.getItem('KNIT_ADMIN_USERS_V1');
    let loadedUsers = DEFAULT_USERS;
    if (savedUsers) {
      try {
        loadedUsers = JSON.parse(savedUsers);
      } catch (e) {}
    }
    // Sync with KNIT_LOCAL_USERS (registered via AuthModal)
    try {
      const localSignups = JSON.parse(localStorage.getItem('KNIT_LOCAL_USERS') || '[]');
      localSignups.forEach((lu) => {
        if (!loadedUsers.some((u) => u.email === lu.email)) {
          loadedUsers.push({
            id: 'u-' + Date.now() + Math.random().toString(36).substring(2, 6),
            email: lu.email,
            nickname: lu.nickname,
            role: lu.email.includes('admin') ? 'admin' : 'member',
            status: 'active',
            joinedAt: new Date().toISOString().split('T')[0],
            postCount: 0,
            commentCount: 0,
            note: '회원가입 모달 등록 회원'
          });
        }
      });
    } catch (e) {}
    setUsers(loadedUsers);

    // 2. Load Posts
    const savedPosts = localStorage.getItem('KNIT_COMMUNITY_POSTS_V4');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {}
    }

    // 3. Load System Config
    const savedConfig = localStorage.getItem('KNIT_SYSTEM_CONFIG');
    if (savedConfig) {
      try {
        setSystemConfig(JSON.parse(savedConfig));
      } catch (e) {}
    }

    // 4. Load Audit Logs
    const savedLogs = localStorage.getItem('KNIT_ADMIN_AUDIT_LOGS');
    if (savedLogs) {
      try {
        setAuditLogs(JSON.parse(savedLogs));
      } catch (e) {}
    }
  }, []);

  // Save Users
  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('KNIT_ADMIN_USERS_V1', JSON.stringify(newUsers));
  };

  // Save Posts
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('KNIT_COMMUNITY_POSTS_V4', JSON.stringify(newPosts));
    window.dispatchEvent(new Event('knit_storage_updated'));
  };

  // Save System Config
  const saveSystemConfig = (newConfig) => {
    setSystemConfig(newConfig);
    localStorage.setItem('KNIT_SYSTEM_CONFIG', JSON.stringify(newConfig));
    window.dispatchEvent(new Event('knit_config_updated'));
  };

  // ==========================================
  // ACCESS GUARD
  // ==========================================
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border-2 border-rose-300 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">shield_lock</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-on-surface mb-2">
            관리자 전용 보안 접근 제한
          </h2>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6 leading-relaxed">
            해당 관리 센터는 시스템 최고 관리자 권한이 있는 계정으로 로그인한 경우에만 접근하실 수 있습니다.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => onSelectTab('home')}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-surface-container hover:bg-surface-container-high text-on-surface transition-all cursor-pointer"
            >
              홈으로 돌아가기
            </button>
            <button
              onClick={onOpenAuthModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-primary hover:bg-primary-hover text-white transition-all shadow-xs cursor-pointer"
            >
              관리자 계정으로 로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1. USER MANAGEMENT HANDLERS
  // ==========================================
  const handleToggleUserRole = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;
    if (targetUser.email === 'admin@knitting-studio.com') {
      showToast('메인 최고 관리자 계정은 권한을 변경할 수 없습니다.', 'error');
      return;
    }
    const nextRole = targetUser.role === 'admin' ? 'member' : 'admin';
    const updated = users.map((u) => (u.id === userId ? { ...u, role: nextRole } : u));
    saveUsers(updated);
    logAction('회원 권한 변경', targetUser.email, `권한: ${targetUser.role} ➔ ${nextRole}`);
    showToast(`'${targetUser.nickname}'님의 권한이 '${nextRole === 'admin' ? '관리자' : '일반회원'}'으로 변경되었습니다.`);
  };

  const handleChangeUserStatus = (userId, newStatus) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;
    if (targetUser.email === 'admin@knitting-studio.com') {
      showToast('최고 관리자는 상태를 변경할 수 없습니다.', 'error');
      return;
    }
    const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
    saveUsers(updated);
    logAction('회원 상태 변경', targetUser.email, `상태: ${targetUser.status} ➔ ${newStatus}`);
    showToast(`'${targetUser.nickname}'님의 계정 상태가 '${newStatus}'(으)로 변경되었습니다.`);
  };

  const handleDeleteUser = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;
    if (targetUser.email === 'admin@knitting-studio.com') {
      showToast('최고 관리자 계정은 삭제할 수 없습니다.', 'error');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: '회원 영구 탈퇴 처리',
      message: `'${targetUser.nickname}' (${targetUser.email}) 회원을 강제 탈퇴 처리하시겠습니까? 계정 정보 및 권한이 완전히 삭제됩니다.`,
      onConfirm: () => {
        const updated = users.filter((u) => u.id !== userId);
        saveUsers(updated);
        logAction('회원 강제 탈퇴', targetUser.email, '계정 영구 삭제 완료');
        showToast(`'${targetUser.nickname}' 회원이 삭제되었습니다.`);
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserEmail.trim() || !newUserNickname.trim()) {
      showToast('이메일과 닉네임을 모두 입력해 주세요.', 'error');
      return;
    }
    if (users.some((u) => u.email === newUserEmail.trim())) {
      showToast('이미 등록된 이메일 주소입니다.', 'error');
      return;
    }

    const newUser = {
      id: 'u-' + Date.now(),
      email: newUserEmail.trim(),
      nickname: newUserNickname.trim(),
      role: newUserRole,
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
      postCount: 0,
      commentCount: 0,
      note: newUserNote.trim() || '관리자 수동 발급 계정'
    };

    saveUsers([newUser, ...users]);
    logAction('신규 회원 등록', newUser.email, `역할: ${newUserRole}`);
    showToast(`신규 회원 '${newUser.nickname}' 등록이 완료되었습니다.`);
    setIsAddUserOpen(false);
    setNewUserEmail('');
    setNewUserNickname('');
    setNewUserRole('member');
    setNewUserNote('');
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!editUser) return;
    const updated = users.map((u) => (u.id === editUser.id ? editUser : u));
    saveUsers(updated);
    logAction('회원 정보 수정', editUser.email, `닉네임: ${editUser.nickname}, 메모: ${editUser.note}`);
    showToast(`'${editUser.nickname}' 회원 정보가 업데이트되었습니다.`);
    setEditUser(null);
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userStatusFilter !== 'all' && u.status !== userStatusFilter) return false;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return (
        u.email.toLowerCase().includes(q) ||
        u.nickname.toLowerCase().includes(q) ||
        (u.note && u.note.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // ==========================================
  // 2. POST MANAGEMENT HANDLERS
  // ==========================================
  const handleTogglePinPost = (postId) => {
    const targetPost = posts.find((p) => p.id === postId);
    if (!targetPost) return;
    const nextPinned = !targetPost.isPinned;
    const updated = posts.map((p) => (p.id === postId ? { ...p, isPinned: nextPinned } : p));
    savePosts(updated);
    logAction('게시글 상단 고정 토글', targetPost.title, nextPinned ? '상단 공지로 고정됨' : '상단 고정 해제');
    showToast(nextPinned ? '📌 상단 공지로 고정되었습니다.' : '상단 고정이 해제되었습니다.');
  };

  const handleToggleHidePost = (postId) => {
    const targetPost = posts.find((p) => p.id === postId);
    if (!targetPost) return;
    const nextHidden = !targetPost.isHidden;
    const updated = posts.map((p) => (p.id === postId ? { ...p, isHidden: nextHidden } : p));
    savePosts(updated);
    logAction('게시글 숨김/공개 토글', targetPost.title, nextHidden ? '커뮤니티 숨김 처리' : '커뮤니티 공개 전환');
    showToast(nextHidden ? '🚫 게시글이 커뮤니티에서 숨김 처리되었습니다.' : '👁️ 게시글이 정상 공개되었습니다.');
  };

  const handleDeletePost = (postId) => {
    const targetPost = posts.find((p) => p.id === postId);
    if (!targetPost) return;

    setConfirmModal({
      isOpen: true,
      title: '게시글 영구 삭제',
      message: `"${targetPost.title}" 글을 완전히 삭제하시겠습니까? 포함된 모든 댓글(${targetPost.comments?.length || 0}개)도 함께 삭제됩니다.`,
      onConfirm: () => {
        const updated = posts.filter((p) => p.id !== postId);
        savePosts(updated);
        logAction('게시글 삭제', targetPost.title, `작성자: ${targetPost.author}`);
        showToast('게시글이 삭제되었습니다.');
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    if (!editPost) return;
    const updated = posts.map((p) => (p.id === editPost.id ? editPost : p));
    savePosts(updated);
    logAction('게시글 내용 수정', editPost.title, `카테고리: ${editPost.category}`);
    showToast('게시글 내용이 수정되었습니다.');
    setEditPost(null);
  };

  // Filtered Posts
  const filteredPosts = posts.filter((p) => {
    if (postCategoryFilter !== 'all' && p.category !== postCategoryFilter) return false;
    if (postStatusFilter === 'pinned' && !p.isPinned) return false;
    if (postStatusFilter === 'hidden' && !p.isHidden) return false;
    if (postStatusFilter === 'public' && (p.isHidden || p.isPinned)) return false;
    if (postSearch.trim()) {
      const q = postSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // 3. COMMENT MANAGEMENT HANDLERS
  // ==========================================
  // Flatten all comments across posts
  const allComments = [];
  posts.forEach((post) => {
    if (post.comments && Array.isArray(post.comments)) {
      post.comments.forEach((c, idx) => {
        allComments.push({
          commentId: `${post.id}-c-${idx}`,
          indexInPost: idx,
          postId: post.id,
          postTitle: post.title,
          postCategory: post.category,
          author: c.author,
          text: c.text,
          date: c.date,
          isBlind: c.text.includes('블라인드')
        });
      });
    }
  });

  const handleDeleteComment = (postId, commentIndex) => {
    const parentPost = posts.find((p) => p.id === postId);
    if (!parentPost) return;
    const targetComment = parentPost.comments[commentIndex];

    setConfirmModal({
      isOpen: true,
      title: '댓글 삭제',
      message: `'${targetComment?.author}' 님의 댓글 ("${targetComment?.text?.slice(0, 30)}...")을 영구 삭제하시겠습니까?`,
      onConfirm: () => {
        const updatedPosts = posts.map((p) => {
          if (p.id === postId) {
            const newComments = p.comments.filter((_, idx) => idx !== commentIndex);
            return { ...p, comments: newComments };
          }
          return p;
        });
        savePosts(updatedPosts);
        logAction('댓글 삭제', parentPost.title, `작성자: ${targetComment?.author}`);
        showToast('댓글이 삭제되었습니다.');
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const handleToggleBlindComment = (postId, commentIndex) => {
    const parentPost = posts.find((p) => p.id === postId);
    if (!parentPost) return;
    const curComment = parentPost.comments[commentIndex];
    if (!curComment) return;

    const isCurrentlyBlind = curComment.text.includes('블라인드');
    const newText = isCurrentlyBlind
      ? (curComment.originalText || '복원된 댓글 내용입니다.')
      : '🚫 [관리자에 의해 커뮤니티 운영 규칙 위반으로 블라인드 처리된 댓글입니다]';

    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const newComments = [...p.comments];
        newComments[commentIndex] = {
          ...curComment,
          originalText: isCurrentlyBlind ? undefined : curComment.text,
          text: newText
        };
        return { ...p, comments: newComments };
      }
      return p;
    });

    savePosts(updatedPosts);
    logAction(
      isCurrentlyBlind ? '댓글 블라인드 해제' : '댓글 블라인드 처리',
      parentPost.title,
      `작성자: ${curComment.author}`
    );
    showToast(isCurrentlyBlind ? '댓글 블라인드가 해제되었습니다.' : '댓글이 블라인드 마스킹되었습니다.');
  };

  // Filtered Comments
  const filteredComments = allComments.filter((c) => {
    if (commentStatusFilter === 'blind' && !c.isBlind) return false;
    if (commentStatusFilter === 'active' && c.isBlind) return false;
    if (commentSearch.trim()) {
      const q = commentSearch.toLowerCase();
      return (
        c.text.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q) ||
        c.postTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // 4. BACKUP & RESTORE & FACTORY RESET
  // ==========================================
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      users,
      posts,
      systemConfig,
      auditLogs
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knitting_studio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logAction('데이터 전체 백업', '전체 데이터 JSON 다운로드');
    showToast('전체 시스템 데이터 백업 파일이 다운로드되었습니다.');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.users && Array.isArray(imported.users)) saveUsers(imported.users);
        if (imported.posts && Array.isArray(imported.posts)) savePosts(imported.posts);
        if (imported.systemConfig) saveSystemConfig(imported.systemConfig);
        if (imported.auditLogs) setAuditLogs(imported.auditLogs);
        logAction('데이터 복원', '백업 파일 업로드 복원 완료');
        showToast('백업 파일로부터 데이터가 성공적으로 복원되었습니다.');
      } catch (err) {
        showToast('유효하지 않은 백업 JSON 파일입니다.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFactoryReset = () => {
    setConfirmModal({
      isOpen: true,
      title: '공장 초기화 (기본값 리셋)',
      message: '모든 회원, 게시글, 댓글, 시스템 설정 및 로그를 최초 권장 샘플 상태로 초기화하시겠습니까? 기존 변경사항은 복구되지 않습니다.',
      onConfirm: () => {
        saveUsers(DEFAULT_USERS);
        saveSystemConfig(DEFAULT_SYSTEM_CONFIG);
        localStorage.removeItem('KNIT_COMMUNITY_POSTS_V4');
        localStorage.removeItem('KNIT_ADMIN_AUDIT_LOGS');
        setAuditLogs([]);
        window.location.reload();
      }
    });
  };

  // Quick stats
  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.status === 'active').length;
  const bannedUsersCount = users.filter((u) => u.status === 'banned').length;
  const totalPostsCount = posts.length;
  const pinnedPostsCount = posts.filter((p) => p.isPinned).length;
  const hiddenPostsCount = posts.filter((p) => p.isHidden).length;
  const totalCommentsCount = allComments.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Toast Feedback */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-surface-container-lowest border border-on-surface/10 shadow-2xl text-xs font-bold text-on-surface animate-bounce">
          <span
            className={
              'w-2 h-2 rounded-full ' +
              (toast.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500')
            }
          />
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. Admin Header Bar */}
      <div className="bg-gradient-to-r from-[#201b13] via-[#332a21] to-[#201b13] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[15px]">shield_person</span>
                <span>SUPER ADMIN CENTER</span>
              </span>
              <span className="text-xs text-white/70">시스템 정상 가동 중 · 버전 2.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight">
              니팅 스튜디오 관리자 센터 🛡️
            </h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl leading-relaxed">
              회원 관리, 커뮤니티 게시글 및 악성 댓글 정화, 도안 인쇄 권한 및 상단 긴급 공지 배너를 통합 제어합니다.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => onSelectTab('community')}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">forum</span>
              <span>커뮤니티 이동</span>
            </button>
            <button
              onClick={() => onSelectTab('home')}
              className="px-4 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>사용자 화면(홈)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-on-surface/[0.08]">
        {[
          { id: 'overview', label: '종합 대시보드', icon: 'dashboard', badge: null },
          { id: 'users', label: '회원 관리', icon: 'group', badge: totalUsersCount },
          { id: 'posts', label: '글 관리', icon: 'article', badge: totalPostsCount },
          { id: 'comments', label: '댓글 관리', icon: 'forum', badge: totalCommentsCount },
          { id: 'system', label: '기타 시스템 & 정책', icon: 'tune', badge: null },
          { id: 'logs', label: '감사 로그', icon: 'history', badge: auditLogs.length }
        ].map((tab) => {
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={
                'px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ' +
                (isActive
                  ? 'bg-primary text-white shadow-sm font-extrabold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-on-surface/[0.06]')
              }
            >
              <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge !== null && (
                <span
                  className={
                    'px-2 py-0.5 rounded-full text-[10px] font-extrabold ' +
                    (isActive ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface')
                  }
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW DASHBOARD */}
      {/* ======================================================== */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key KPI Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">총 등록 회원</span>
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">group</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-serif text-on-surface">{totalUsersCount}</span>
                <span className="text-xs text-emerald-600 font-bold">정상 {activeUsersCount}명</span>
              </div>
              <p className="text-[11px] text-outline mt-2">차단 회원 {bannedUsersCount}명 격리 관리 중</p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">커뮤니티 게시글</span>
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">article</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-serif text-on-surface">{totalPostsCount}</span>
                <span className="text-xs text-primary font-bold">공지 {pinnedPostsCount}건</span>
              </div>
              <p className="text-[11px] text-outline mt-2">숨김/블라인드 {hiddenPostsCount}건</p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">누적 댓글 수</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-serif text-on-surface">{totalCommentsCount}</span>
                <span className="text-xs text-emerald-600 font-bold">활성 소통</span>
              </div>
              <p className="text-[11px] text-outline mt-2">게시글당 평균 3.4개 댓글</p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">도안 인쇄 정책</span>
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">print</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold font-serif text-primary">
                  {systemConfig.printPolicy === 'admin_only' && '관리자 전용'}
                  {systemConfig.printPolicy === 'all_members' && '회원 전용'}
                  {systemConfig.printPolicy === 'public' && '전체 공개'}
                  {systemConfig.printPolicy === 'disabled' && '전면 차단'}
                </span>
              </div>
              <p className="text-[11px] text-outline mt-2">시스템 설정 탭에서 원클릭 변경 가능</p>
            </div>
          </div>

          {/* Calculator Usage & Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
              <h3 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">calculate</span>
                <span>실시간 도안 계산기 점유율 분석</span>
              </h3>
              <div className="space-y-4">
                {[
                  { name: '스웨터 (탑다운 레글런)', share: 44, color: 'bg-primary' },
                  { name: '비니 / 와치캡 (8등분 왕관 줄임)', share: 26, color: 'bg-amber-600' },
                  { name: '맞춤 양말 (토업 & 커프다운)', share: 18, color: 'bg-emerald-600' },
                  { name: '목도리 (변형고무 & 아이코드)', share: 12, color: 'bg-indigo-600' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-on-surface">{item.name}</span>
                      <span className="text-primary">{item.share}%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.share}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
              <h3 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">bolt</span>
                <span>관리자 빠른 실행 바로가기</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActiveAdminTab('posts');
                  }}
                  className="p-4 rounded-2xl bg-surface-container hover:bg-primary/10 hover:border-primary/30 border border-on-surface/[0.06] text-left transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-primary text-2xl mb-1 block group-hover:scale-110 transition-transform">
                    campaign
                  </span>
                  <span className="text-xs font-bold text-on-surface block">신규 공지 작성</span>
                  <span className="text-[11px] text-outline">상단 고정 공지 등록</span>
                </button>

                <button
                  onClick={() => {
                    setActiveAdminTab('users');
                    setIsAddUserOpen(true);
                  }}
                  className="p-4 rounded-2xl bg-surface-container hover:bg-primary/10 hover:border-primary/30 border border-on-surface/[0.06] text-left transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-2xl mb-1 block group-hover:scale-110 transition-transform">
                    person_add
                  </span>
                  <span className="text-xs font-bold text-on-surface block">수동 회원 발급</span>
                  <span className="text-[11px] text-outline">신규 계정 즉시 등록</span>
                </button>

                <button
                  onClick={handleExportBackup}
                  className="p-4 rounded-2xl bg-surface-container hover:bg-primary/10 hover:border-primary/30 border border-on-surface/[0.06] text-left transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-purple-600 text-2xl mb-1 block group-hover:scale-110 transition-transform">
                    download
                  </span>
                  <span className="text-xs font-bold text-on-surface block">데이터 전체 백업</span>
                  <span className="text-[11px] text-outline">JSON 파일로 안전 보관</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('system')}
                  className="p-4 rounded-2xl bg-surface-container hover:bg-primary/10 hover:border-primary/30 border border-on-surface/[0.06] text-left transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-amber-600 text-2xl mb-1 block group-hover:scale-110 transition-transform">
                    notification_important
                  </span>
                  <span className="text-xs font-bold text-on-surface block">상단 배너 공지</span>
                  <span className="text-[11px] text-outline">긴급 알림 즉시 송출</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Audit Timeline Preview */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-[20px]">history</span>
                <span>최근 관리자 활동 타임라인</span>
              </h3>
              <button
                onClick={() => setActiveAdminTab('logs')}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                전체 로그 보기 →
              </button>
            </div>
            {auditLogs.length === 0 ? (
              <p className="text-xs text-outline py-4 text-center">기록된 활동 로그가 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface-container text-xs">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                        {log.action}
                      </span>
                      <span className="font-extrabold text-on-surface">{log.target}</span>
                      <span className="text-outline truncate max-w-xs">{log.detail}</span>
                    </div>
                    <span className="text-outline text-[11px] shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: USER MANAGEMENT */}
      {/* ======================================================== */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-on-surface/[0.08] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="이메일, 닉네임 검색..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 border border-on-surface/[0.06]"
                />
              </div>

              {/* Role Filter */}
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3.5 py-2 rounded-full bg-surface-container text-xs font-bold text-on-surface border border-on-surface/[0.06] focus:outline-none cursor-pointer"
              >
                <option value="all">권한 전체</option>
                <option value="admin">관리자만</option>
                <option value="member">일반 회원만</option>
              </select>

              {/* Status Filter */}
              <select
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-full bg-surface-container text-xs font-bold text-on-surface border border-on-surface/[0.06] focus:outline-none cursor-pointer"
              >
                <option value="all">상태 전체</option>
                <option value="active">정상 (Active)</option>
                <option value="warning">주의 (Warning)</option>
                <option value="suspended">정지 (Suspended)</option>
                <option value="banned">영구차단 (Banned)</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddUserOpen(true)}
              className="w-full md:w-auto px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[17px]">person_add</span>
              <span>신규 회원 직접 등록</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-surface-container-lowest rounded-3xl border border-on-surface/[0.08] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-on-surface/[0.06]">
                    <th className="py-3.5 px-4">회원 / 닉네임</th>
                    <th className="py-3.5 px-4">이메일</th>
                    <th className="py-3.5 px-4 text-center">권한</th>
                    <th className="py-3.5 px-4 text-center">상태</th>
                    <th className="py-3.5 px-4 text-center">가입일</th>
                    <th className="py-3.5 px-4">관리자 메모</th>
                    <th className="py-3.5 px-4 text-right">작업 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-on-surface/[0.04]">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-outline text-xs">
                        검색 조건에 맞는 회원이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const isMasterAdmin = u.email === 'admin@knitting-studio.com';
                      return (
                        <tr key={u.id} className="hover:bg-surface-container/40 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-on-surface flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                              {u.nickname.slice(0, 1)}
                            </div>
                            <div>
                              <span>{u.nickname}</span>
                              {isMasterAdmin && (
                                <span className="text-[10px] text-primary block font-normal">Super Admin</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-on-surface-variant font-medium">{u.email}</td>
                          <td className="py-3.5 px-4 text-center">
                            {u.role === 'admin' ? (
                              <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-extrabold">
                                관리자
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-bold">
                                일반회원
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {u.status === 'active' && (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                정상
                              </span>
                            )}
                            {u.status === 'warning' && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                                주의
                              </span>
                            )}
                            {u.status === 'suspended' && (
                              <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                                이용정지
                              </span>
                            )}
                            {u.status === 'banned' && (
                              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                                영구차단
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center text-outline">{u.joinedAt || '2026-11-15'}</td>
                          <td className="py-3.5 px-4 text-outline max-w-[150px] truncate" title={u.note}>
                            {u.note || '-'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Toggle Role */}
                              <button
                                onClick={() => handleToggleUserRole(u.id)}
                                disabled={isMasterAdmin}
                                className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                title="권한 토글"
                              >
                                {u.role === 'admin' ? '일반 강등' : '관리자 승격'}
                              </button>

                              {/* Edit Modal */}
                              <button
                                onClick={() => setEditUser(u)}
                                className="w-7 h-7 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface-variant flex items-center justify-center transition-colors"
                                title="회원 정보 수정"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                disabled={isMasterAdmin}
                                className="w-7 h-7 rounded-lg bg-surface-container hover:bg-rose-100 hover:text-rose-600 text-on-surface-variant flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                title="회원 강제 탈퇴"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: POST MANAGEMENT */}
      {/* ======================================================== */}
      {activeAdminTab === 'posts' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-on-surface/[0.08] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="제목, 내용, 작성자 검색..."
                  value={postSearch}
                  onChange={(e) => setPostSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 border border-on-surface/[0.06]"
                />
              </div>

              <select
                value={postCategoryFilter}
                onChange={(e) => setPostCategoryFilter(e.target.value)}
                className="px-3.5 py-2 rounded-full bg-surface-container text-xs font-bold text-on-surface border border-on-surface/[0.06] focus:outline-none cursor-pointer"
              >
                <option value="all">카테고리 전체</option>
                <option value="gallery">작품 갤러리</option>
                <option value="tips">뜨개 꿀팁</option>
                <option value="qna">Q&A 질문</option>
                <option value="lounge">자유 수다</option>
              </select>

              <select
                value={postStatusFilter}
                onChange={(e) => setPostStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-full bg-surface-container text-xs font-bold text-on-surface border border-on-surface/[0.06] focus:outline-none cursor-pointer"
              >
                <option value="all">상태 전체</option>
                <option value="pinned">상단 공지 고정</option>
                <option value="hidden">숨김 / 블라인드</option>
                <option value="public">일반 공개</option>
              </select>
            </div>

            <button
              onClick={() => {
                const newPost = {
                  id: 'post-' + Date.now(),
                  category: 'tips',
                  title: '[관리자 공지] 신규 공지사항 안내',
                  content: '관리자 센터에서 직접 작성된 공지사항 내용입니다.',
                  author: '관리자',
                  badge: '운영자',
                  date: '방금 전',
                  image: null,
                  gauge: '공식 가이드',
                  needle: '전체 호수',
                  yarn: '전체 실',
                  likes: 0,
                  views: 1,
                  userLiked: false,
                  comments: [],
                  isPinned: true,
                  isHidden: false
                };
                savePosts([newPost, ...posts]);
                logAction('신규 공지글 생성', newPost.title);
                showToast('상단 고정 공지사항이 등록되었습니다.');
              }}
              className="w-full md:w-auto px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[17px]">campaign</span>
              <span>새 상단 공지 등록</span>
            </button>
          </div>

          {/* Posts Table */}
          <div className="bg-surface-container-lowest rounded-3xl border border-on-surface/[0.08] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-on-surface/[0.06]">
                    <th className="py-3.5 px-4 text-center">상태</th>
                    <th className="py-3.5 px-4">분류</th>
                    <th className="py-3.5 px-4">게시글 제목 / 요약</th>
                    <th className="py-3.5 px-4">작성자</th>
                    <th className="py-3.5 px-4 text-center">반응 (추천/댓글)</th>
                    <th className="py-3.5 px-4 text-center">작성시간</th>
                    <th className="py-3.5 px-4 text-right">관리 작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-on-surface/[0.04]">
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-outline text-xs">
                        등록된 게시글이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-container/40 transition-colors">
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {p.isPinned && (
                              <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold flex items-center gap-0.5 shadow-2xs">
                                <span className="material-symbols-outlined text-[12px]">push_pin</span>
                                <span>공지</span>
                              </span>
                            )}
                            {p.isHidden && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center gap-0.5 shadow-2xs">
                                <span className="material-symbols-outlined text-[12px]">visibility_off</span>
                                <span>숨김</span>
                              </span>
                            )}
                            {!p.isPinned && !p.isHidden && (
                              <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-medium">
                                공개
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary text-[10px] font-bold">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-on-surface max-w-sm">
                          <span className="block truncate" title={p.title}>
                            {p.title}
                          </span>
                          <span className="text-[11px] font-normal text-outline truncate block mt-0.5">
                            {p.content}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-on-surface">
                          <span>{p.author}</span>
                          {p.badge && (
                            <span className="text-[10px] text-outline block">{p.badge}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-on-surface-variant font-bold">
                          👍 {p.likes || 0} · 💬 {p.comments?.length || 0}
                        </td>
                        <td className="py-3.5 px-4 text-center text-outline">{p.date || '최근'}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Toggle Pin */}
                            <button
                              onClick={() => handleTogglePinPost(p.id)}
                              className={
                                'w-7 h-7 rounded-lg flex items-center justify-center transition-colors ' +
                                (p.isPinned
                                  ? 'bg-primary text-white'
                                  : 'bg-surface-container hover:bg-primary/10 text-on-surface-variant')
                              }
                              title={p.isPinned ? '공지 고정 해제' : '상단 공지로 고정'}
                            >
                              <span className="material-symbols-outlined text-[16px]">push_pin</span>
                            </button>

                            {/* Toggle Hide */}
                            <button
                              onClick={() => handleToggleHidePost(p.id)}
                              className={
                                'w-7 h-7 rounded-lg flex items-center justify-center transition-colors ' +
                                (p.isHidden
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-surface-container hover:bg-rose-100 hover:text-rose-600 text-on-surface-variant')
                              }
                              title={p.isHidden ? '공개로 전환' : '커뮤니티에서 숨기기'}
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {p.isHidden ? 'visibility' : 'visibility_off'}
                              </span>
                            </button>

                            {/* Edit Post */}
                            <button
                              onClick={() => setEditPost(p)}
                              className="w-7 h-7 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface-variant flex items-center justify-center transition-colors"
                              title="게시글 내용 수정"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>

                            {/* Delete Post */}
                            <button
                              onClick={() => handleDeletePost(p.id)}
                              className="w-7 h-7 rounded-lg bg-surface-container hover:bg-rose-100 hover:text-rose-600 text-on-surface-variant flex items-center justify-center transition-colors"
                              title="게시글 영구 삭제"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: COMMENT MANAGEMENT */}
      {/* ======================================================== */}
      {activeAdminTab === 'comments' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-on-surface/[0.08] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-72">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="댓글 내용, 작성자, 원문 제목 검색..."
                  value={commentSearch}
                  onChange={(e) => setCommentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 border border-on-surface/[0.06]"
                />
              </div>

              <select
                value={commentStatusFilter}
                onChange={(e) => setCommentStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-full bg-surface-container text-xs font-bold text-on-surface border border-on-surface/[0.06] focus:outline-none cursor-pointer"
              >
                <option value="all">댓글 상태 전체</option>
                <option value="active">정상 댓글</option>
                <option value="blind">블라인드 댓글</option>
              </select>
            </div>

            <div className="text-xs font-bold text-outline">
              총 수집 댓글: <span className="text-primary font-extrabold">{allComments.length}</span>개
            </div>
          </div>

          {/* Comments Table */}
          <div className="bg-surface-container-lowest rounded-3xl border border-on-surface/[0.08] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-on-surface/[0.06]">
                    <th className="py-3.5 px-4">원문 게시글</th>
                    <th className="py-3.5 px-4">작성자</th>
                    <th className="py-3.5 px-4">댓글 내용</th>
                    <th className="py-3.5 px-4 text-center">상태</th>
                    <th className="py-3.5 px-4 text-center">등록시간</th>
                    <th className="py-3.5 px-4 text-right">관리 작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-on-surface/[0.04]">
                  {filteredComments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-outline text-xs">
                        검색 조건에 맞는 댓글이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredComments.map((c) => (
                      <tr key={c.commentId} className="hover:bg-surface-container/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-on-surface max-w-[180px] truncate" title={c.postTitle}>
                          {c.postTitle}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-primary shrink-0">{c.author}</td>
                        <td className="py-3.5 px-4 font-medium text-on-surface max-w-md">
                          <p className={c.isBlind ? 'text-rose-600 font-bold italic' : 'text-on-surface'}>
                            {c.text}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {c.isBlind ? (
                            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold">
                              블라인드
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              정상
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-outline">{c.date || '최근'}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Toggle Blind */}
                            <button
                              onClick={() => handleToggleBlindComment(c.postId, c.indexInPost)}
                              className={
                                'px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ' +
                                (c.isBlind
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200')
                              }
                            >
                              {c.isBlind ? '블라인드 해제' : '블라인드 처리'}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteComment(c.postId, c.indexInPost)}
                              className="w-7 h-7 rounded-lg bg-surface-container hover:bg-rose-100 hover:text-rose-600 text-on-surface-variant flex items-center justify-center transition-colors"
                              title="댓글 영구 삭제"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: SYSTEM & POLICY CONFIG (황금 비율 2-컬럼 밸런스 레이아웃) */}
      {/* ======================================================== */}
      {activeAdminTab === 'system' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 2-Column Balanced Grid: Banner (Left) + Print Policy (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Global Announcement Banner Config */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-on-surface/[0.06] mb-4">
                  <div>
                    <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">campaign</span>
                      <span>상단 글로벌 긴급 공지 배너 제어</span>
                    </h3>
                    <p className="text-[11px] text-outline mt-0.5">
                      사이트 최상단에 노출되는 전체 긴급 공지 배너를 켜고 끄거나 문구를 변경합니다.
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={systemConfig.bannerEnabled}
                      onChange={(e) => {
                        const updated = { ...systemConfig, bannerEnabled: e.target.checked };
                        saveSystemConfig(updated);
                        logAction('상단 배너 상태 변경', e.target.checked ? '배너 활성화' : '배너 비활성화');
                        showToast(e.target.checked ? '상단 공지 배너가 활성화되었습니다.' : '상단 공지 배너가 비활성화되었습니다.');
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">배너 안내 문구</label>
                    <input
                      type="text"
                      value={systemConfig.bannerText}
                      onChange={(e) => setSystemConfig({ ...systemConfig, bannerText: e.target.value })}
                      placeholder="공지 배너 내용을 입력하세요..."
                      className="w-full px-4 py-2.5 rounded-2xl bg-surface-container text-xs font-medium text-on-surface border border-on-surface/[0.06] focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-on-surface mb-1.5">배너 테마:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { id: 'primary', label: '테라코타 기본', cls: 'bg-primary text-white' },
                        { id: 'emerald', label: '에메랄드 알림', cls: 'bg-emerald-600 text-white' },
                        { id: 'warning', label: '앰버 주의보', cls: 'bg-amber-600 text-white' },
                        { id: 'rose', label: '로즈 긴급', cls: 'bg-rose-600 text-white' }
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSystemConfig({ ...systemConfig, bannerType: theme.id })}
                          className={
                            'px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ' +
                            (systemConfig.bannerType === theme.id
                              ? theme.cls + ' ring-2 ring-primary ring-offset-2 shadow-2xs'
                              : 'bg-surface-container text-on-surface-variant hover:text-on-surface')
                          }
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-on-surface/[0.06] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    saveSystemConfig(systemConfig);
                    logAction('상단 배너 저장', systemConfig.bannerText);
                    showToast('상단 배너 설정이 저장되어 전체 사이트에 즉시 적용되었습니다.');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
                >
                  배너 설정 즉시 적용
                </button>
              </div>
            </div>

            {/* 2. Global Print Permission Policy (2x2 Balanced Grid) */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-on-surface flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-purple-600 text-[20px]">print</span>
                  <span>도안 인쇄 권한 글로벌 정책</span>
                </h3>
                <p className="text-[11px] text-outline mb-4">
                  도안 인쇄 기능의 접근 권한을 클릭 한 번으로 사이트 전체에 실시간 적용합니다.
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'admin_only',
                      title: '👑 관리자 전용',
                      sub: '관리자 계정만 인쇄 가능',
                      rec: true
                    },
                    {
                      id: 'all_members',
                      title: '👤 로그인 회원',
                      sub: '로그인 회원 누구나 인쇄 가능'
                    },
                    {
                      id: 'public',
                      title: '🌐 전체 공개',
                      sub: '비로그인 방문자 포함 전원 허용'
                    },
                    {
                      id: 'disabled',
                      title: '⛔ 인쇄 차단',
                      sub: '도안 보호를 위해 전면 비활성화'
                    }
                  ].map((policy) => {
                    const isSelected = systemConfig.printPolicy === policy.id;
                    return (
                      <div
                        key={policy.id}
                        onClick={() => {
                          const updated = { ...systemConfig, printPolicy: policy.id };
                          saveSystemConfig(updated);
                          logAction('인쇄 정책 변경', policy.id);
                          showToast(`도안 인쇄 정책이 '${policy.title}'(으)로 변경되었습니다.`);
                        }}
                        className={
                          'p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ' +
                          (isSelected
                            ? 'border-primary bg-primary/5 shadow-xs'
                            : 'border-on-surface/[0.06] bg-surface-container hover:bg-surface-container-high')
                        }
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <strong className="text-xs font-bold text-on-surface">{policy.title}</strong>
                            {policy.rec && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-primary text-white">
                                권장
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-outline leading-tight">{policy.sub}</p>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-primary">
                          <span className="material-symbols-outlined text-[15px]">
                            {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>{isSelected ? '적용됨' : '선택'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-on-surface/[0.06]">
                <span className="text-[11px] text-outline">
                  현재 정책: <strong className="text-primary font-bold">{systemConfig.printPolicy}</strong> (실시간 반영 중)
                </span>
              </div>
            </div>
          </div>

          {/* 3. Database Backup & Restore */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-on-surface/[0.08] shadow-xs">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">database</span>
              <span>데이터베이스 백업 &amp; 복원 &amp; 리셋</span>
            </h3>
            <p className="text-xs text-outline mb-5">
              회원 목록, 커뮤니티 게시글 및 댓글 전체 데이터를 JSON 파일로 백업하거나 복구합니다.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExportBackup}
                className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface border border-on-surface/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                <span>전체 데이터 JSON 내보내기</span>
              </button>

              <label className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface border border-on-surface/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                <span className="material-symbols-outlined text-[17px]">upload</span>
                <span>백업 파일 복원 (JSON)</span>
                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
              </label>

              <button
                type="button"
                onClick={handleFactoryReset}
                className="px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span className="material-symbols-outlined text-[17px]">restart_alt</span>
                <span>기본 데이터 공장 초기화</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: AUDIT LOGS */}
      {/* ======================================================== */}
      {activeAdminTab === 'logs' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-on-surface/[0.08] shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-on-surface">관리자 보안 감사 로그</h3>
              <p className="text-xs text-outline">
                회원 권한 변경, 차단, 게시글 및 댓글 삭제 등 중요 작업이 시간순으로 자동 기록됩니다.
              </p>
            </div>
            <button
              onClick={() => {
                setAuditLogs([]);
                localStorage.removeItem('KNIT_ADMIN_AUDIT_LOGS');
                showToast('감사 로그가 비워졌습니다.');
              }}
              className="px-4 py-2 rounded-full bg-surface-container hover:bg-rose-50 hover:text-rose-600 text-xs font-bold text-on-surface-variant transition-colors cursor-pointer"
            >
              로그 비우기
            </button>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl border border-on-surface/[0.08] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-on-surface/[0.06]">
                    <th className="py-3.5 px-4">일시</th>
                    <th className="py-3.5 px-4">작업 구분</th>
                    <th className="py-3.5 px-4">대상</th>
                    <th className="py-3.5 px-4">세부 내용</th>
                    <th className="py-3.5 px-4 text-right">수행 관리자</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-on-surface/[0.04]">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-outline text-xs">
                        기록된 감사 로그가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-surface-container/40 transition-colors">
                        <td className="py-3.5 px-4 text-outline font-mono text-[11px]">{log.timestamp}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-on-surface">{log.target}</td>
                        <td className="py-3.5 px-4 text-on-surface-variant">{log.detail || '-'}</td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-primary">{log.operator}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: ADD USER MODAL */}
      {/* ======================================================== */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-6 shadow-2xl border border-on-surface/[0.08]">
            <div className="flex items-center justify-between pb-3 border-b border-on-surface/[0.06] mb-4">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">person_add</span>
                <span>신규 회원 직접 등록</span>
              </h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">이메일 주소 *</label>
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">닉네임 *</label>
                <input
                  type="text"
                  required
                  placeholder="니팅꿈나무"
                  value={newUserNickname}
                  onChange={(e) => setNewUserNickname(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">초기 권한 부여</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none font-bold"
                >
                  <option value="member">일반 회원 (Member)</option>
                  <option value="admin">관리자 (Admin)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">관리자 메모</label>
                <input
                  type="text"
                  placeholder="예: 오프라인 워크숍 참가자 수동 등록"
                  value={newUserNote}
                  onChange={(e) => setNewUserNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-on-surface/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-bold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary hover:bg-primary-hover text-white font-bold cursor-pointer shadow-xs"
                >
                  등록 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: EDIT USER MODAL */}
      {/* ======================================================== */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-6 shadow-2xl border border-on-surface/[0.08]">
            <div className="flex items-center justify-between pb-3 border-b border-on-surface/[0.06] mb-4">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">edit</span>
                <span>회원 정보 수정</span>
              </h3>
              <button
                onClick={() => setEditUser(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-outline mb-1">이메일 (변경 불가)</label>
                <input
                  type="text"
                  disabled
                  value={editUser.email}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high text-outline cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">닉네임</label>
                <input
                  type="text"
                  required
                  value={editUser.nickname}
                  onChange={(e) => setEditUser({ ...editUser, nickname: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">계정 상태</label>
                <select
                  value={editUser.status}
                  onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none font-bold"
                >
                  <option value="active">정상 (Active)</option>
                  <option value="warning">주의 (Warning)</option>
                  <option value="suspended">이용 정지 (Suspended)</option>
                  <option value="banned">영구 차단 (Banned)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">관리자 메모</label>
                <textarea
                  rows="3"
                  value={editUser.note || ''}
                  onChange={(e) => setEditUser({ ...editUser, note: e.target.value })}
                  placeholder="회원에 대한 메모를 입력하세요..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-on-surface/[0.06]">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-bold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary hover:bg-primary-hover text-white font-bold cursor-pointer shadow-xs"
                >
                  저장 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: EDIT POST MODAL */}
      {/* ======================================================== */}
      {editPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-on-surface/[0.08]">
            <div className="flex items-center justify-between pb-3 border-b border-on-surface/[0.06] mb-4">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
                <span>게시글 내용 관리 및 수정</span>
              </h3>
              <button
                onClick={() => setEditPost(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">카테고리</label>
                <select
                  value={editPost.category}
                  onChange={(e) => setEditPost({ ...editPost, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none font-bold"
                >
                  <option value="gallery">작품 갤러리</option>
                  <option value="tips">뜨개 꿀팁</option>
                  <option value="qna">Q&A 질문</option>
                  <option value="lounge">자유 수다</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">글 제목</label>
                <input
                  type="text"
                  required
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">글 본문</label>
                <textarea
                  rows="5"
                  required
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface border border-on-surface/[0.08] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editPost.isPinned || false}
                    onChange={(e) => setEditPost({ ...editPost, isPinned: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>📌 상단 공지로 고정</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-600">
                  <input
                    type="checkbox"
                    checked={editPost.isHidden || false}
                    onChange={(e) => setEditPost({ ...editPost, isHidden: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>🚫 커뮤니티에서 숨김 처리</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-on-surface/[0.06]">
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-bold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary hover:bg-primary-hover text-white font-bold cursor-pointer shadow-xs"
                >
                  수정 내용 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-6 shadow-2xl border border-on-surface/[0.08] animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <h3 className="text-base font-bold text-on-surface mb-2">{confirmModal.title}</h3>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">{confirmModal.message}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })}
                className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-bold cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                삭제 진행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
