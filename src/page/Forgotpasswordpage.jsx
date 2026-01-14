import React, { useState } from 'react';
import AuthLayout from '../components/common/AuthLayout/AuthLayout';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import Alert from '../components/common/Alert/Alert';
import PasswordInput from '../components/common/Input/PasswordInput'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: 이메일 입력, 2: 인증번호 확인, 3: 비밀번호 변경, 4: 완료
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: '이메일을 입력해주세요.' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: '올바른 이메일 형식이 아닙니다.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateCode = () => {
    if (!verificationCode) {
      setErrors({ code: '인증번호를 입력해주세요.' });
      return false;
    }
    if (verificationCode.length !== 6) {
      setErrors({ code: '인증번호는 6자리입니다.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log('인증번호 발송:', email);
      setStep(2);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (validateCode()) {
      console.log('인증번호 확인:', verificationCode);
      setStep(3);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      console.log('비밀번호 변경:', { email, password });
      setStep(4);
    }
  };

  const handleResendCode = () => {
    console.log('인증번호 재발송:', email);
  };

  const SuccessIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <AuthLayout subtitle="비밀번호 찾기">
      {/* Step 1: 이메일 입력 */}
      {step === 1 && (
        <>
          <p className="text-sm text-gray-500 text-center mb-6">
            가입한 이메일을 입력하시면<br />
            인증번호를 보내드립니다.
          </p>

          <form onSubmit={handleSendCode} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              error={errors.email}
            />

            <div className="pt-2">
              <Button type="submit" fullWidth>
                인증번호 받기
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

      {/* Step 2: 인증번호 확인 */}
      {step === 2 && (
        <>
          <p className="text-sm text-gray-500 text-center mb-6">
            <span className="font-medium text-gray-700">{email}</span>로<br />
            발송된 인증번호 6자리를 입력해주세요.
          </p>

          <form onSubmit={handleVerifyCode} className="space-y-5">
            <Input
              id="verificationCode"
              type="text"
              label="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              placeholder="6자리 숫자 입력"
              error={errors.code}
            />

            <div className="pt-2">
              <Button type="submit" fullWidth>
                인증번호 확인
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">인증번호를 받지 못하셨나요? </span>
            <button 
              onClick={handleResendCode}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              재발송
            </button>
          </div>
        </>
      )}

      {/* Step 3: 비밀번호 변경 */}
      {step === 3 && (
        <>
          <p className="text-sm text-gray-500 text-center mb-6">
            새로운 비밀번호를 입력해주세요.
          </p>

          <form onSubmit={handleResetPassword} className="space-y-5">
            <PasswordInput
              id="password"
              label="새 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상 입력하세요"
              error={errors.password}
            />

            <PasswordInput
              id="passwordConfirm"
              label="새 비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              error={errors.passwordConfirm}
            />

            <div className="pt-2">
              <Button type="submit" fullWidth>
                비밀번호 변경
              </Button>
            </div>
          </form>
        </>
      )}

      {/* Step 4: 완료 */}
      {step === 4 && (
        <Alert
          icon={SuccessIcon}
          title="비밀번호가 변경되었습니다"
          message="새로운 비밀번호로 로그인해주세요."
          linkText="로그인하기"
          linkHref="/login"
        />
      )}
    </AuthLayout>
  );
}