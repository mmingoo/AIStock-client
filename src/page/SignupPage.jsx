import React, { useState } from 'react';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import PasswordInput from '../components/common/Input/PasswordInput';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (!passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('회원가입 시도:', { email, password, nickname });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-10">
        {/* 로고 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            <span className="text-blue-600">아이</span>스톡
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            회원가입
          </p>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="email"
            type="email"
            label="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            error={errors.email}
          />

          <Input
            id="nickname"
            type="text"
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            error={errors.nickname}
          />

          <PasswordInput
            id="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 입력하세요"
            error={errors.password}
          />

          <PasswordInput
            id="passwordConfirm"
            label="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            error={errors.passwordConfirm}
          />

          {/* 이메일 수신 동의 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="emailAgree"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="emailAgree" className="text-sm text-gray-600">
              일간 뉴스 요약 이메일 수신에 동의합니다. (선택)
            </label>
          </div>

          <div className="pt-2">
            <Button type="submit" fullWidth>
              회원가입
            </Button>
          </div>
        </form>

        {/* 하단 링크 */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">이미 계정이 있으신가요? </span>
          <a 
            href="/login" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}