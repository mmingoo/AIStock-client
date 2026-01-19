// src/components/report/DateSection.jsx
import React from 'react';

export default function DateSection({ 
  date, 
  count, 
  children 
}) {
  return (
    <div>
      {/* 날짜 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}
        </h2>
        <span className="text-sm text-gray-500">
          ({count}개 섹터)
        </span>
      </div>

      {/* 섹터 리스트 */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}