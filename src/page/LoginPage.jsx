import React, { useState } from 'react';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import PasswordInput from '../components/common/Input/PasswordInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-10">
        {/* 로고 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            <span className="text-blue-600">아이</span>스톡
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            AI 기반 미국 주식 뉴스 분석 서비스
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="email"
            type="email"
            label="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />

          <PasswordInput
            id="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button type="submit" fullWidth>
              로그인
            </Button>
          </div>
        </form>

        {/* 하단 링크 */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <a 
            href="/forgot-password" 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            비밀번호 찾기
          </a>
          <span className="text-gray-300">|</span>
          <a 
            href="/signup" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}