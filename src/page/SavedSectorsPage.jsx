// src/page/SavedSectorsPage.jsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import StockDetailModal from '../components/report/StockDetailModal';
import PageHeader from '../components/common/PageHeader/PageHeader';
import EmptyState from '../components/common/EmptyState/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog/ConfirmDialog';

export default function SavedSectorsPage() {
  const [savedSectors, setSavedSectors] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [groupedByDate, setGroupedByDate] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, sectorName: '', date: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedSectors') || '[]');
    setSavedSectors(saved);

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

  const openDeleteConfirm = (sectorName, date) => {
    setDeleteConfirm({ isOpen: true, sectorName, date });
  };

  const handleDeleteSector = () => {
    const { sectorName, date } = deleteConfirm;
    
    const updated = savedSectors.filter(
      sector => !(sector.sectorName === sectorName && sector.savedDate === date)
    );
    
    localStorage.setItem('savedSectors', JSON.stringify(updated));
    setSavedSectors(updated);

    const grouped = updated.reduce((acc, sector) => {
      const d = sector.savedDate;
      if (!acc[d]) {
        acc[d] = [];
      }
      acc[d].push(sector);
      return acc;
    }, {});

    setGroupedByDate(grouped);
    setDeleteConfirm({ isOpen: false, sectorName: '', date: '' });
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

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

  const emptyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );

  if (savedSectors.length === 0) {
    return (
      <MainLayout>
        <EmptyState
          icon={emptyIcon}
          title="저장된 섹터가 없습니다"
          message="일간 리포트에서 관심 있는 섹터를 저장해보세요."
          actionText="일간 리포트 보기"
          actionHref="/main"
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        icon="📚"
        title="저장된 섹터"
        subtitle={`총 ${savedSectors.length}개의 섹터를 저장했습니다.`}
      />

      {/* 날짜별 섹터 리스트 */}
      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date}>
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

            <div className="space-y-4">
              {groupedByDate[date].map((sector, index) => {
                const config = probabilityConfig[sector.probability] || probabilityConfig['중'];
                
                return (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
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
                        
                        <button
                          onClick={() => openDeleteConfirm(sector.sectorName, date)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

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

      {/* 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="섹터 삭제"
        message={`${deleteConfirm.sectorName} 섹터를 삭제하시겠습니까?`}
        confirmText="삭제"
        cancelText="취소"
        variant="danger"
        onConfirm={handleDeleteSector}
        onCancel={() => setDeleteConfirm({ isOpen: false, sectorName: '', date: '' })}
      />

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