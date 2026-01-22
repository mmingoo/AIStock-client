// src/page/SavedSectorsPage.jsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import StockDetailModal from '../components/report/StockDetailModal';
import PageHeader from '../components/common/PageHeader/PageHeader';
import EmptyState from '../components/common/EmptyState/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog/ConfirmDialog';
import SavedSectorCard from '../components/report/SavedSectorCard ';
import DateSection from '../components/report/DateSection ';

export default function SavedSectorsPage() {
  const [savedSectors, setSavedSectors] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [groupedByDate, setGroupedByDate] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ 
    isOpen: false, 
    sectorName: '', 
    date: '' 
  });

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
          <DateSection 
            key={date} 
            date={date} 
            count={groupedByDate[date].length}
          >
            {groupedByDate[date].map((sector, index) => (
              <SavedSectorCard
                key={index}
                sector={sector}
                onStockClick={handleStockClick}
                onDelete={() => openDeleteConfirm(sector.sectorName, date)}
              />
            ))}
          </DateSection>
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