import React, { useState } from 'react';
import AuthLayout from '../components/common/AuthLayout/AuthLayout';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import Alert from '../components/common/Alert/Alert';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log('비밀번호 재설정 요청:', email);
      setIsSubmitted(true);
    }
  };

  const EmailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <AuthLayout subtitle="비밀번호 찾기">
      {isSubmitted ? (
        <Alert
          icon={EmailIcon}
          title="이메일을 확인해주세요"
          message={
            <>
              <span className="font-medium text-gray-700">{email}</span>로<br />
              비밀번호 재설정 링크를 보냈습니다.
            </>
          }
          linkText="로그인으로 돌아가기"
          linkHref="/login"
        />
      ) : (
        <>
          <p className="text-sm text-gray-500 text-center mb-6">
            가입한 이메일을 입력하시면<br />
            비밀번호 재설정 링크를 보내드립니다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              error={error}
            />

            <div className="pt-2">
              <Button type="submit" fullWidth>
                재설정 링크 보내기
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <a 
              href="/login" 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              로그인으로 돌아가기
            </a>
          </div>
        </>
      )}
    </AuthLayout>
  );
}