import React, { useState } from 'react';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import PasswordInput from '../components/common/Input/PasswordInput';
import AuthLayout from "../components/common/AuthLayout/AuthLayout"
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
  };

  return (
    <AuthLayout subtitle="AI 기반 미국 주식 뉴스 분석 서비스">
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
    </AuthLayout>
  );
}