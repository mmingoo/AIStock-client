import React from 'react';

export default function SectorCard({ 
  sectorName, 
  probability, 
  order,
  stocks,
  onStockClick 
}) {
  const probabilityConfig = {
    '높음': { stars: '⭐⭐⭐', color: 'text-green-600', bg: 'bg-green-50' },
    '중상': { stars: '⭐⭐', color: 'text-blue-600', bg: 'bg-blue-50' },
    '중': { stars: '⭐', color: 'text-gray-600', bg: 'bg-gray-50' },
    '낮음': { stars: '', color: 'text-gray-400', bg: 'bg-gray-50' }
  };

  const config = probabilityConfig[probability] || probabilityConfig['중'];
  
  const orderLabel = {
    1: '1차 영향',
    2: '2차 영향',
    3: '3차 영향'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
      {/* 섹터 헤더 */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900">🔷 {sectorName}</h3>
          <span className="text-xs text-gray-500 mt-1 block">{orderLabel[order]}</span>
        </div>
        <div className="text-right">
          <div className={`text-sm font-semibold ${config.color} mb-1`}>
            상승 가능성: {probability} {config.stars}
          </div>
        </div>
      </div>

      {/* 추천 종목 */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">[추천 종목]</h4>
        {stocks.map((stock, index) => (
          <div 
            key={index}
            onClick={() => onStockClick && onStockClick(stock)}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-base font-bold text-gray-900">{stock.ticker}</span>
                <span className="ml-2 text-sm text-gray-600">{stock.name}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-xs font-semibold text-gray-600 mb-1.5">💡 상승 이유:</div>
              <ul className="space-y-1">
                {stock.reasons.map((reason, idx) => (
                  <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-3 relative">
                    <span className="absolute left-0">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}