// src/components/report/SavedSectorCard.jsx
import React from 'react';

export default function SavedSectorCard({ 
  sector, 
  onStockClick, 
  onDelete 
}) {
  const probabilityConfig = {
    '높음': { stars: '⭐⭐⭐', color: 'text-green-600' },
    '중상': { stars: '⭐⭐', color: 'text-blue-600' },
    '중': { stars: '⭐', color: 'text-gray-600' },
    '낮음': { stars: '', color: 'text-gray-400' }
  };

  const orderLabel = {
    1: '1차 영향',
    2: '2차 영향',
    3: '3차 영향'
  };

  const config = probabilityConfig[sector.probability] || probabilityConfig['중'];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
      {/* 섹터 헤더 */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            🔷 {sector.sectorName}
          </h3>
          <span className="text-xs text-gray-500 mt-1 block">
            {orderLabel[sector.order]}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`text-sm font-semibold ${config.color}`}>
            상승 가능성: {sector.probability} {config.stars}
          </div>
          
          {/* 삭제 버튼 */}
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="섹터 삭제"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 추천 종목 */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">추천 종목</h4>
        {sector.stocks.map((stock, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-base font-bold text-gray-900">
                  {stock.ticker}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {stock.name}
                </span>
              </div>
              {stock.detailedReasons && (
                <button
                  onClick={() => onStockClick(stock, sector)}
                  className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  자세히 보기
                </button>
              )}
            </div>
            
            <ul className="space-y-1">
              {stock.reasons.map((reason, rIdx) => (
                <li key={rIdx} className="text-xs text-gray-600 pl-3 relative">
                  <span className="absolute left-0">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}