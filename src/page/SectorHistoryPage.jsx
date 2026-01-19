// src/page/SectorHistoryPage.jsx
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import SectorCard from '../components/report/SectorCard';
import StockDetailModal from '../components/report/StockDetailModal';
import PageHeader from '../components/common/PageHeader/PageHeader';
import EmptyState from '../components/common/EmptyState/EmptyState';

export default function SectorHistoryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  // 임시 데이터 - 실제로는 API에서 날짜별로 가져와야 함
  const sectorHistoryData = {
    '2026-01-19': {
      trends: [
        { keyword: 'AI 반도체 수요 급증', newsCount: 15 },
        { keyword: '연준 금리 동결 시사', newsCount: 8 },
        { keyword: '중국 전기차 시장 회복', newsCount: 5 }
      ],
      sectors: [
        {
          sectorName: '반도체 장비',
          probability: '높음',
          order: 2,
          stocks: [
            {
              ticker: 'ASML',
              name: 'ASML',
              reasons: [
                'AI 반도체 생산 증가로 EUV 장비 수요 급증 예상',
                '과거 2023년 반도체 붐 때 NVIDIA 상승 후 3개월간 45% 상승',
                '최근 실적 발표에서 수주 증가 시사'
              ]
            }
          ]
        },
        {
          sectorName: 'AI 반도체',
          probability: '높음',
          order: 1,
          stocks: [
            {
              ticker: 'NVDA',
              name: 'NVIDIA',
              reasons: [
                '현재 AI 반도체 시장 점유율 80% 이상',
                '데이터센터 매출 전년 대비 200% 이상 성장'
              ]
            }
          ]
        }
      ]
    },
    '2026-01-18': {
      trends: [
        { keyword: '테슬라 자율주행 업데이트', newsCount: 12 },
        { keyword: '애플 비전프로 판매 호조', newsCount: 9 },
        { keyword: '유가 급등', newsCount: 7 }
      ],
      sectors: [
        {
          sectorName: '전기차',
          probability: '중상',
          order: 1,
          stocks: [
            {
              ticker: 'TSLA',
              name: 'Tesla',
              reasons: [
                'FSD 베타 업데이트로 자율주행 기술 진전',
                '중국 판매량 전월 대비 30% 증가',
                '신규 기가팩토리 건설 발표'
              ]
            }
          ]
        },
        {
          sectorName: 'AR/VR',
          probability: '중',
          order: 2,
          stocks: [
            {
              ticker: 'AAPL',
              name: 'Apple',
              reasons: [
                '비전프로 예상 초과 판매',
                '개발자 생태계 확대 중'
              ]
            }
          ]
        }
      ]
    },
    '2026-01-17': {
      trends: [
        { keyword: '메타 AI 챗봇 출시', newsCount: 18 },
        { keyword: '인텔 공장 증설 계획', newsCount: 10 },
        { keyword: '구글 클라우드 실적 호조', newsCount: 8 }
      ],
      sectors: [
        {
          sectorName: '소셜미디어',
          probability: '높음',
          order: 1,
          stocks: [
            {
              ticker: 'META',
              name: 'Meta',
              reasons: [
                'AI 챗봇 출시로 사용자 참여도 증가 기대',
                '광고 매출 회복세',
                'Reality Labs 적자 축소'
              ]
            }
          ]
        },
        {
          sectorName: '클라우드',
          probability: '중상',
          order: 1,
          stocks: [
            {
              ticker: 'GOOGL',
              name: 'Google',
              reasons: [
                'GCP 매출 전년 대비 25% 성장',
                'AI 서비스 확대로 클라우드 수요 증가'
              ]
            }
          ]
        }
      ]
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStockClick = (stock, sector) => {
    setSelectedStock(stock);
    setSelectedSector(sector);
  };

  const closeModal = () => {
    setSelectedStock(null);
    setSelectedSector(null);
  };

  const dateData = sectorHistoryData[selectedDate];

  // 날짜 선택 가능한 범위 설정 (최근 30일)
  const today = new Date();
  const minDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const maxDate = today.toISOString().split('T')[0];

  const calendarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const emptyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <MainLayout>
      <PageHeader
        icon={calendarIcon}
        title="섹터 추천 히스토리"
        subtitle="과거 날짜별 섹터 추천 내역을 확인할 수 있습니다."
      />

      {/* 날짜 선택 */}
      <div className="mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            📅 날짜 선택
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
            max={maxDate}
            className="w-full md:w-auto px-4 py-3 text-base border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">
            * 최근 30일 이내의 데이터만 조회 가능합니다.
          </p>
        </div>
      </div>

      {/* 선택된 날짜 표시 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {new Date(selectedDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}
          {' '}추천 섹터
        </h2>
      </div>

      {/* 데이터가 없는 경우 */}
      {!dateData ? (
        <EmptyState
          icon={emptyIcon}
          title="해당 날짜의 데이터가 없습니다"
          message="다른 날짜를 선택해주세요."
        />
      ) : (
        <>
          {/* 구분선 */}
          <div className="border-t-2 border-gray-300 mb-6"></div>

          {/* 주요 뉴스 트렌드 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              [당일 주요 뉴스 트렌드]
            </h3>
            <div className="space-y-1">
              {dateData.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-700">
                    • {trend.keyword}
                  </span>
                  <span className="text-xs text-gray-500">
                    뉴스 {trend.newsCount}건
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t-2 border-gray-300 mb-6"></div>

          {/* 추천 섹터 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              [추천 섹터 분석]
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              ※ 상승 가능성 높은 순으로 정렬
            </p>
          </div>

          {/* 섹터 카드 리스트 */}
          <div className="space-y-6">
            {dateData.sectors
              .sort((a, b) => {
                const order = { '높음': 1, '중상': 2, '중': 3, '낮음': 4 };
                return order[a.probability] - order[b.probability];
              })
              .map((sector, index) => (
                <SectorCard
                  key={index}
                  sectorName={sector.sectorName}
                  probability={sector.probability}
                  order={sector.order}
                  stocks={sector.stocks}
                  onStockClick={(stock) => handleStockClick(stock, sector)}
                  date={selectedDate}
                />
              ))}
          </div>

          {/* 안내 메시지 */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-yellow-800">
                과거 추천 섹터는 당시 시장 상황을 기반으로 분석된 것이며, 현재 투자 판단의 참고 자료로만 활용해주세요.
              </p>
            </div>
          </div>
        </>
      )}

      {/* 면책 문구 */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          ⚠️ 본 서비스는 투자 참고 정보를 제공하며, 투자 판단의 책임은 사용자에게 있습니다.
        </p>
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