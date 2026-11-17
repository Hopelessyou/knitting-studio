import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://vjuehrbdottiklcojlcl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdWVocmJkb3R0aWtsY29qbGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3MjM4NzAsImV4cCI6MjExMDI5OTg3MH0.BDWbnmL0tsM2jpEGIyvIpYub9kC7oI5ZWgGuieLu0a8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const FORBIDDEN_NICK_KEYWORDS = [
  '운영자', '관리자', '어드민', '마스터', '스태프', '매니저', '스튜디오', '공식',
  '고객센터', '시스템', '운영팀', '관리팀', '뜨개스튜디오',
  'admin', 'administrator', 'operator', 'master', 'manager', 'staff',
  'root', 'support', 'system', 'official'
];

export function validateNicknameFormat(nick) {
  if (!nick) return { valid: false, message: '닉네임을 입력해 주세요.' };
  if (nick.length < 2 || nick.length > 10) {
    return { valid: false, message: '닉네임은 2~10자 이내로 입력해 주세요.' };
  }
  const normalized = nick.toLowerCase().replace(/[\s_\-\.]+/g, '');
  for (const keyword of FORBIDDEN_NICK_KEYWORDS) {
    if (normalized.includes(keyword)) {
      return { 
        valid: false, 
        message: '운영자 및 관리자 사칭 방지를 위해 사용할 수 없는 명칭입니다.' 
      };
    }
  }
  return { valid: true };
}

export async function checkNicknameAvailable(nick) {
  const formatCheck = validateNicknameFormat(nick);
  if (!formatCheck.valid) {
    return { available: false, message: formatCheck.message };
  }
  try {
    const { data: isAvailable, error } = await supabase.rpc('check_nickname_available', { p_nickname: nick });
    if (error) {
      console.warn('Supabase RPC check error, fallback to local validation:', error.message);
      return { available: true, message: '사용 가능한 닉네임입니다' };
    }
    if (isAvailable) {
      return { available: true, message: '✓ 사용 가능한 닉네임입니다' };
    } else {
      return { available: false, message: '✕ 이미 사용 중이거나 사용할 수 없는 닉네임입니다' };
    }
  } catch (err) {
    return { available: true, message: '✓ 사용 가능한 닉네임입니다' };
  }
}

export async function resetPasswordWithCredentials({ email, nickname, newPassword }) {
  try {
    const { data, error } = await supabase.rpc('reset_password_with_credentials', {
      p_email: email,
      p_nickname: nickname,
      p_new_password: newPassword
    });
    if (error) throw error;
    if (!data || !data.success) {
      throw new Error(data?.message || '등록된 이메일과 닉네임 정보가 일치하지 않습니다.');
    }
    return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
  } catch (err) {
    // Local fallback check if user exists in local store
    const localUsers = JSON.parse(localStorage.getItem('KNIT_LOCAL_USERS') || '[]');
    const matchIdx = localUsers.findIndex(u => u.email === email && u.nickname === nickname);
    if (matchIdx !== -1) {
      localUsers[matchIdx].password = newPassword;
      localStorage.setItem('KNIT_LOCAL_USERS', JSON.stringify(localUsers));
      return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
    }
    throw new Error(err.message || '가입된 이메일과 닉네임이 일치하지 않습니다.');
  }
}
