import React from 'react';

export default function TrendCard({ keyword, newsCount }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">• {keyword}</span>
      <span className="text-xs text-gray-500">뉴스 {newsCount}건</span>
    </div>
  );
}