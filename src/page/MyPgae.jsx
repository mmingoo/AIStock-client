// src/page/MyPage.jsx
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button/Button';
import PasswordInput from '../components/common/Input/PasswordInput';
import Input from '../components/common/Input/Input';
import Tabs from '../components/common/Tabs/Tabs ';
import ToggleSwitch from '../components/common/ToggleSwitch/ToggleSwitch';
import ConfirmDialog from '../components/common/ConfirmDialog/ConfirmDialog';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [nickname, setNickname] = useState('홍길동');
  const [email] = useState('hong@email.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [emailNotification, setEmailNotification] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const tabs = [
    { id: 'profile', label: '프로필' },
    { id: 'password', label: '비밀번호 변경' },
    { id: 'notification', label: '알림 설정' },
    { id: 'delete', label: '회원 탈퇴' }
  ];

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    console.log('닉네임 변경:', nickname);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!currentPassword) {
      errors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }
    if (!newPassword) {
      errors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (newPassword.length < 8) {
      errors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
    }
    if (newPassword !== newPasswordConfirm) {
      errors.newPasswordConfirm = '비밀번호가 일치하지 않습니다.';
    }
    
    setPasswordErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      console.log('비밀번호 변경');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    }
  };

  const handleNotificationChange = () => {
    setEmailNotification(!emailNotification);
    console.log('알림 설정 변경:', !emailNotification);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === '회원탈퇴') {
      setShowDeleteDialog(true);
    }
  };

  const confirmDeleteAccount = () => {
    console.log('회원 탈퇴 처리');
    setShowDeleteDialog(false);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">마이페이지</h1>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* 프로필 탭 */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">프로필 정보</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <p className="text-sm text-gray-500">{email}</p>
            </div>

            <form onSubmit={handleNicknameSubmit} className="space-y-4">
              <Input
                id="nickname"
                type="text"
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
              />
              <Button type="submit">저장</Button>
            </form>
          </div>
        )}

        {/* 비밀번호 변경 탭 */}
        {activeTab === 'password' && (
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">비밀번호 변경</h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <PasswordInput
                id="currentPassword"
                label="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요"
                error={passwordErrors.currentPassword}
              />
              <PasswordInput
                id="newPassword"
                label="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="8자 이상 입력하세요"
                error={passwordErrors.newPassword}
              />
              <PasswordInput
                id="newPasswordConfirm"
                label="새 비밀번호 확인"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
                error={passwordErrors.newPasswordConfirm}
              />
              <Button type="submit">비밀번호 변경</Button>
            </form>
          </div>
        )}

        {/* 알림 설정 탭 */}
        {activeTab === 'notification' && (
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">알림 설정</h2>
            
            <ToggleSwitch
              checked={emailNotification}
              onChange={handleNotificationChange}
              label="일간 뉴스 요약 이메일"
              description="매일 아침 전일 분석 결과를 이메일로 받아보세요."
            />
          </div>
        )}

        {/* 회원 탈퇴 탭 */}
        {activeTab === 'delete' && (
          <div className="bg-white rounded-xl p-6 border border-red-100">
            <h2 className="text-lg font-semibold text-red-600 mb-4">회원 탈퇴</h2>
            
            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-600">
                회원 탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                id="deleteConfirm"
                type="text"
                label="탈퇴를 원하시면 '회원탈퇴'를 입력해주세요."
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="회원탈퇴"
              />
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== '회원탈퇴'}
                className={`px-4 h-12 text-sm font-semibold rounded-lg transition-colors
                  ${deleteConfirm === '회원탈퇴'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 회원 탈퇴 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="정말 탈퇴하시겠습니까?"
        message="모든 데이터가 삭제되며, 복구할 수 없습니다."
        confirmText="탈퇴"
        cancelText="취소"
        variant="danger"
        onConfirm={confirmDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </MainLayout>
  );
}