import React, { useState, useEffect } from 'react';
import { supabase, checkNicknameAvailable, resetPasswordWithCredentials } from '../../services/supabaseClient';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'reset'
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Nickname validation state
  const [isNickChecking, setIsNickChecking] = useState(false);
  const [nickStatus, setNickStatus] = useState({ checked: false, available: false, message: '' });

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isOpen, tab]);

  if (!isOpen) return null;

  const handleNicknameChange = (val) => {
    setNickname(val);
    setNickStatus({ checked: false, available: false, message: '' });
    setErrorMsg('');
  };

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setNickStatus({ checked: true, available: false, message: '닉네임을 입력해 주세요.' });
      return;
    }
    setIsNickChecking(true);
    const result = await checkNicknameAvailable(nickname.trim());
    setIsNickChecking(false);
    setNickStatus({
      checked: true,
      available: result.available,
      message: result.message
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // 1. SIGNUP SUBMIT
    if (tab === 'signup') {
      if (!email.trim() || !password || !passwordConfirm || !nickname.trim()) {
        setErrorMsg('모든 필수 항목(이메일, 닉네임, 비밀번호, 비밀번호 확인)을 입력해 주세요.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('비밀번호는 최소 6자리 이상이어야 합니다.');
        return;
      }
      if (password !== passwordConfirm) {
        setErrorMsg('비밀번호가 일치하지 않습니다. 비밀번호 확인을 다시 확인해 주세요.');
        return;
      }
      if (!nickStatus.checked || !nickStatus.available) {
        setErrorMsg('닉네임 중복 확인을 완료해 주세요.');
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { nickname: nickname.trim() }
          }
        });
        if (error) throw error;

        // Save local backup for instantaneous offline sync
        const localUsers = JSON.parse(localStorage.getItem('KNIT_LOCAL_USERS') || '[]');
        localUsers.push({ email: email.trim(), nickname: nickname.trim(), password });
        localStorage.setItem('KNIT_LOCAL_USERS', JSON.stringify(localUsers));

        const user = data.user || { email: email.trim(), user_metadata: { nickname: nickname.trim() } };
        onAuthSuccess(user);
        onClose();
      } catch (err) {
        // Fallback: local register if Supabase network rate-limited
        const localUsers = JSON.parse(localStorage.getItem('KNIT_LOCAL_USERS') || '[]');
        localUsers.push({ email: email.trim(), nickname: nickname.trim(), password });
        localStorage.setItem('KNIT_LOCAL_USERS', JSON.stringify(localUsers));
        const user = { email: email.trim(), user_metadata: { nickname: nickname.trim() } };
        onAuthSuccess(user);
        onClose();
      } finally {
        setLoading(false);
      }
    }

    // 2. LOGIN SUBMIT
    else if (tab === 'login') {
      if (!email.trim() || !password) {
        setErrorMsg('이메일과 비밀번호를 입력해 주세요.');
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (error) {
          // Check local users fallback
          const localUsers = JSON.parse(localStorage.getItem('KNIT_LOCAL_USERS') || '[]');
          const matched = localUsers.find(u => u.email === email.trim() && u.password === password);
          if (matched) {
            const user = { email: matched.email, user_metadata: { nickname: matched.nickname } };
            onAuthSuccess(user);
            onClose();
            return;
          }
          throw error;
        }
        onAuthSuccess(data.user);
        onClose();
      } catch (err) {
        setErrorMsg(err.message.includes('Invalid login') ? '이메일 또는 비밀번호가 일치하지 않습니다.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    // 3. PASSWORD RESET SUBMIT
    else if (tab === 'reset') {
      if (!email.trim() || !nickname.trim() || !password || !passwordConfirm) {
        setErrorMsg('가입 이메일, 닉네임, 새 비밀번호를 모두 입력해 주세요.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('새 비밀번호는 6자리 이상이어야 합니다.');
        return;
      }
      if (password !== passwordConfirm) {
        setErrorMsg('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      setLoading(true);
      try {
        const res = await resetPasswordWithCredentials({
          email: email.trim(),
          nickname: nickname.trim(),
          newPassword: password
        });
        setSuccessMsg('비밀번호가 성공적으로 변경되었습니다! 새 비밀번호로 로그인해 주세요. 🔑');
        setPassword('');
        setPasswordConfirm('');
        setTimeout(() => {
          setTab('login');
          setSuccessMsg('');
        }, 1500);
      } catch (err) {
        setErrorMsg(err.message || '가입된 이메일과 닉네임이 일치하지 않습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-surface-container-lowest w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-on-surface/[0.08] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low border-b border-on-surface/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              🧶
            </span>
            <h3 className="text-base font-bold text-on-surface font-serif">
              {tab === 'login' && '니팅 스튜디오 로그인'}
              {tab === 'signup' && '니팅 스튜디오 회원가입'}
              {tab === 'reset' && '비밀번호 재설정'}
            </h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 3 Tabs Row */}
        <div className="p-6 pb-2">
          <div className="grid grid-cols-3 p-1 bg-surface-container rounded-full border border-on-surface/[0.05] text-xs">
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(''); }}
              className={
                "py-2 text-center font-bold rounded-full transition-all cursor-pointer " +
                (tab === 'login'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface')
              }
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setErrorMsg(''); }}
              className={
                "py-2 text-center font-bold rounded-full transition-all cursor-pointer " +
                (tab === 'signup'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface')
              }
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={() => { setTab('reset'); setErrorMsg(''); }}
              className={
                "py-2 text-center font-bold rounded-full transition-all cursor-pointer " +
                (tab === 'reset'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface')
              }
            >
              비번 찾기
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 flex flex-col gap-3.5 text-sm">
          {/* Error / Success Alerts */}
          {errorMsg && (
            <div className="text-xs text-error font-medium p-3 bg-error-container/40 rounded-xl border border-error/20 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="text-xs text-emerald-800 font-medium p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Email Field (All Tabs) */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              이메일 주소
            </label>
            <div className="relative">
              <span className="material-symbols-outlined text-outline text-[18px] absolute left-3 top-2.5">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="knitter@example.com"
                required
                className="w-full bg-surface-container-low border border-on-surface/[0.08] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 pl-9 pr-3 text-on-surface placeholder:text-outline/60 text-xs font-medium"
              />
            </div>
          </div>

          {/* Nickname Field (Signup & Reset) */}
          {(tab === 'signup' || tab === 'reset') && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-on-surface">
                  {tab === 'signup' ? '활동 닉네임' : '가입 시 등록한 닉네임'}
                </label>
                {tab === 'signup' && (
                  <span className="text-[10px] text-outline">2~10자 한글/영문/숫자</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined text-outline text-[18px] absolute left-3 top-2.5">
                    badge
                  </span>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => handleNicknameChange(e.target.value)}
                    placeholder="예: 포근한겨울"
                    required
                    maxLength={10}
                    className="w-full bg-surface-container-low border border-on-surface/[0.08] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 pl-9 pr-3 text-on-surface placeholder:text-outline/60 text-xs font-medium"
                  />
                </div>
                {tab === 'signup' && (
                  <button
                    type="button"
                    onClick={handleCheckNickname}
                    disabled={isNickChecking || !nickname.trim()}
                    className="px-3 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-bold rounded-xl text-xs shrink-0 cursor-pointer transition-colors border border-on-surface/[0.06] disabled:opacity-50"
                  >
                    {isNickChecking ? '확인 중...' : '중복 확인'}
                  </button>
                )}
              </div>

              {/* Realtime Nickname Feedback & Admin Forbidden Notice */}
              {tab === 'signup' && (
                <div className="mt-1 px-1 flex flex-col gap-0.5">
                  {nickStatus.message ? (
                    <span className={"text-[11px] font-semibold " + (nickStatus.available ? 'text-emerald-600' : 'text-error')}>
                      {nickStatus.message}
                    </span>
                  ) : (
                    <span className="text-[10px] text-outline">
                      * 관리자, 운영자, 어드민, admin, master 등 사칭 명칭은 사용할 수 없습니다.
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-on-surface">
                {tab === 'reset' ? '새 비밀번호' : '비밀번호'}
              </label>
              <span className="text-[10px] text-outline">6자리 이상</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined text-outline text-[18px] absolute left-3 top-2.5">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                required
                minLength={6}
                className="w-full bg-surface-container-low border border-on-surface/[0.08] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 pl-9 pr-10 text-on-surface placeholder:text-outline/60 text-xs font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Password Confirm Field (Signup & Reset) */}
          {(tab === 'signup' || tab === 'reset') && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-on-surface">
                  {tab === 'reset' ? '새 비밀번호 확인' : '비밀번호 확인'}
                </label>
                {password && passwordConfirm && (
                  <span className={"text-[11px] font-bold " + (password === passwordConfirm ? 'text-emerald-600' : 'text-error')}>
                    {password === passwordConfirm ? '✓ 비밀번호 일치' : '✕ 불일치'}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined text-outline text-[18px] absolute left-3 top-2.5">
                  lock_reset
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="비밀번호 한 번 더 입력"
                  required
                  className="w-full bg-surface-container-low border border-on-surface/[0.08] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 pl-9 pr-3 text-on-surface placeholder:text-outline/60 text-xs font-medium"
                />
              </div>
            </div>
          )}

          {/* Password Recovery Notice Box (Signup Tab Only) */}
          {tab === 'signup' && (
            <div className="p-3 rounded-2xl bg-primary/5 border border-primary/15 text-xs text-on-surface-variant leading-relaxed">
              <span className="font-bold text-primary block mb-0.5">📌 비밀번호 분실 시 안내</span>
              가입하신 <strong>이메일</strong>과 <strong>닉네임</strong>이 일치할 경우 언제든지 비밀번호를 안전하게 재설정할 수 있습니다. 별도의 전화번호나 본인인증 없이 간편하게 복구됩니다.
            </div>
          )}

          {/* Login Options (Login Tab Only) */}
          {tab === 'login' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-outline/40 text-primary focus:ring-primary"
                />
                <span>로그인 상태 유지</span>
              </label>
              <button
                type="button"
                onClick={() => { setTab('reset'); setErrorMsg(''); }}
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-2xl font-bold bg-primary text-white hover:bg-primary-hover active:scale-98 transition-all cursor-pointer shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>처리 중...</span>
            ) : (
              <>
                <span>
                  {tab === 'login' && '로그인하기'}
                  {tab === 'signup' && '회원가입 완료하고 시작하기'}
                  {tab === 'reset' && '비밀번호 재설정 및 변경하기'}
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}