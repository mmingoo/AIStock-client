// src/components/report/SectorCard.jsx
import React, { useState } from 'react';

export default function SectorCard({ 
  sectorName, 
  probability, 
  order,
  stocks,
  onStockClick,
  date // 날짜 추가
}) {
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSaveSector = () => {
    const sectorData = {
      sectorName,
      probability,
      order,
      stocks,
      savedDate: date || new Date().toISOString().split('T')[0] // 오늘 날짜
    };

    // 로컬스토리지에서 기존 저장된 섹터 가져오기
    const savedSectors = JSON.parse(localStorage.getItem('savedSectors') || '[]');
    
    // 중복 체크 (같은 날짜, 같은 섹터명)
    const isDuplicate = savedSectors.some(
      sector => sector.sectorName === sectorName && sector.savedDate === sectorData.savedDate
    );

    if (isDuplicate) {
      alert('이미 저장된 섹터입니다.');
      return;
    }

    // 새 섹터 추가
    savedSectors.push(sectorData);
    localStorage.setItem('savedSectors', JSON.stringify(savedSectors));
    
    setIsSaved(true);
    console.log('섹터 저장:', sectorData);
    alert(`${sectorName} 섹터가 저장되었습니다!`);
  };

  const handleUnsaveSector = () => {
    const savedSectors = JSON.parse(localStorage.getItem('savedSectors') || '[]');
    const currentDate = date || new Date().toISOString().split('T')[0];
    
    const updatedSectors = savedSectors.filter(
      sector => !(sector.sectorName === sectorName && sector.savedDate === currentDate)
    );
    
    localStorage.setItem('savedSectors', JSON.stringify(updatedSectors));
    setIsSaved(false);
    alert(`${sectorName} 섹터 저장이 취소되었습니다.`);
  };

  // 컴포넌트 마운트 시 저장 여부 체크
  React.useEffect(() => {
    const savedSectors = JSON.parse(localStorage.getItem('savedSectors') || '[]');
    const currentDate = date || new Date().toISOString().split('T')[0];
    
    const isAlreadySaved = savedSectors.some(
      sector => sector.sectorName === sectorName && sector.savedDate === currentDate
    );
    
    setIsSaved(isAlreadySaved);
  }, [sectorName, date]);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
      {/* 섹터 헤더 */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900">🔷 {sectorName}</h3>
          <span className="text-xs text-gray-500 mt-1 block">{orderLabel[order]}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`text-sm font-semibold ${config.color}`}>
            상승 가능성: {probability} {config.stars}
          </div>
          
          {/* 섹터 저장 버튼 */}
          <button
            onClick={isSaved ? handleUnsaveSector : handleSaveSector}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isSaved
                ? 'bg-green-50 text-green-700 hover:bg-green-100'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill={isSaved ? "currentColor" : "none"}
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-sm">
              {isSaved ? '저장됨' : '저장'}
            </span>
          </button>
        </div>
      </div>

      {/* 추천 종목 */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">[추천 종목]</h4>
        {stocks.map((stock, index) => (
          <div 
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-base font-bold text-gray-900">{stock.ticker}</span>
                <span className="ml-2 text-sm text-gray-600">{stock.name}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-xs font-semibold text-gray-600 mb-1.5">💡 상승 이유:</div>
              <ul className="space-y-1 mb-3">
                {stock.reasons.map((reason, idx) => (
                  <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-3 relative">
                    <span className="absolute left-0">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
              
              {/* 자세히 보기 버튼 */}
              <button
                onClick={() => onStockClick(stock)}
                className="w-full mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>자세히 보기</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}