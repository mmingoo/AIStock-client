// src/page/SavedSectorsPage.jsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import StockDetailModal from '../components/report/StockDetailModal';

export default function SavedSectorsPage() {
  const [savedSectors, setSavedSectors] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [groupedByDate, setGroupedByDate] = useState({});

  useEffect(() => {
    // 로컬스토리지에서 저장된 섹터 불러오기
    const saved = JSON.parse(localStorage.getItem('savedSectors') || '[]');
    setSavedSectors(saved);

    // 날짜별로 그룹화
    const grouped = saved.reduce((acc, sector) => {
      const date = sector.savedDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(sector);
      return acc;
    }, {});

    setGroupedByDate(grouped);
  }, []);

  const handleStockClick = (stock, sector) => {
    setSelectedStock(stock);
    setSelectedSector(sector);
  };

  const closeModal = () => {
    setSelectedStock(null);
    setSelectedSector(null);
  };

  const handleDeleteSector = (sectorName, date) => {
    if (!window.confirm(`${sectorName} 섹터를 삭제하시겠습니까?`)) {
      return;
    }

    const updated = savedSectors.filter(
      sector => !(sector.sectorName === sectorName && sector.savedDate === date)
    );
    
    localStorage.setItem('savedSectors', JSON.stringify(updated));
    setSavedSectors(updated);

    // 날짜별 그룹 다시 생성
    const grouped = updated.reduce((acc, sector) => {
      const d = sector.savedDate;
      if (!acc[d]) {
        acc[d] = [];
      }
      acc[d].push(sector);
      return acc;
    }, {});

    setGroupedByDate(grouped);
    alert('삭제되었습니다.');
  };

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

  // 날짜를 내림차순으로 정렬 (최신순)
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

  if (savedSectors.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            저장된 섹터가 없습니다
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            일간 리포트에서 관심 있는 섹터를 저장해보세요.
          </p>
          <a
            href="/main"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            일간 리포트 보기
          </a>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📚 저장된 섹터
        </h1>
        <p className="text-sm text-gray-500">
          총 {savedSectors.length}개의 섹터를 저장했습니다.
        </p>
      </div>

      {/* 날짜별 섹터 리스트 */}
      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date}>
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
                ({groupedByDate[date].length}개 섹터)
              </span>
            </div>

            {/* 해당 날짜의 섹터들 */}
            <div className="space-y-4">
              {groupedByDate[date].map((sector, index) => {
                const config = probabilityConfig[sector.probability] || probabilityConfig['중'];
                
                return (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
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
                          onClick={() => handleDeleteSector(sector.sectorName, date)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* 추천 종목 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700">추천 종목</h4>
                      {sector.stocks.map((stock, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-50 rounded-lg"
                        >
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
                                onClick={() => handleStockClick(stock, sector)}
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
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedStock && selectedSector && (
        <StockDetailModal
          stock={selectedStock}
          sector={selectedSector}
          onClose={closeModal}
        />
      )}
    </MainLayout>
  );
}