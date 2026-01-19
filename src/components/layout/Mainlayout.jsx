import React from 'react';
import { Link } from 'react-router-dom';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/main" className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-blue-600">아이</span>스톡
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/main" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              일간 리포트
            </Link>
            <Link 
              to="/sector-history" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              히스토리
            </Link>
            <Link 
              to="/saved-sectors" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              저장된 섹터
            </Link>
            <Link 
              to="/mypage" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              마이페이지
            </Link>
          </nav>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}