// src/page/MainPage.jsx
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import SectorCard from '../components/report/SectorCard';
import TrendCard from '../components/report/TrendCard';

export default function MainPage() {
  const todayDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  // 오늘의 주요 뉴스 트렌드 (임시 데이터)
  const trends = [
    { keyword: 'AI 반도체 수요 급증', newsCount: 15 },
    { keyword: '연준 금리 동결 시사', newsCount: 8 },
    { keyword: '중국 전기차 시장 회복', newsCount: 5 }
  ];

  // 섹터별 인사이트 데이터 (임시 데이터)
  const sectors = [
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
        },
        {
          ticker: 'AMAT',
          name: 'Applied Materials',
          reasons: [
            '반도체 공정 장비 선두 기업',
            'AI 칩 생산에 필수적인 증착/식각 장비 공급',
            '삼성/TSMC 증설 계획과 직접 연관'
          ]
        },
        {
          ticker: '8035.T',
          name: 'Tokyo Electron',
          reasons: [
            '일본 대표 반도체 장비 기업',
            '메모리 반도체 장비 강점, AI 서버용 HBM 수요 증가'
          ]
        }
      ]
    },
    {
      sectorName: '클라우드 인프라',
      probability: '중상',
      order: 2,
      stocks: [
        {
          ticker: 'DLR',
          name: 'Digital Realty',
          reasons: [
            'AI 데이터센터 수요 급증',
            '과거 2021년 클라우드 확장기에 안정적 우상향',
            '오늘 뉴스: MS, Google의 데이터센터 확장 계획 발표'
          ]
        },
        {
          ticker: 'EQIX',
          name: 'Equinix',
          reasons: [
            '글로벌 데이터센터 1위 기업',
            'AI 워크로드 증가로 코로케이션 수요 증가'
          ]
        }
      ]
    },
    {
      sectorName: '전력/유틸리티',
      probability: '중',
      order: 3,
      stocks: [
        {
          ticker: 'NEE',
          name: 'NextEra Energy',
          reasons: [
            'AI 데이터센터 전력 소비 급증 (연관 효과)',
            '재생에너지 중심, ESG 트렌드 부합',
            '안정적 유틸리티 + 성장성 조합'
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
            '데이터센터 매출 전년 대비 200% 이상 성장',
            '오늘 뉴스: 차세대 GPU 아키텍처 발표 예정'
          ]
        },
        {
          ticker: 'AMD',
          name: 'AMD',
          reasons: [
            'NVIDIA 대항마로 AI 가속기 시장 점유율 확대',
            'MI300 시리즈로 엔터프라이즈 시장 공략'
          ]
        }
      ]
    }
  ];

  const handleStockClick = (stock) => {
    console.log('종목 클릭:', stock);
    // 나중에 종목 상세 페이지로 이동
  };

  return (
    <MainLayout>
      {/* 페이지 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 일간 섹터 인사이트 리포트
        </h1>
        <p className="text-sm text-gray-500">{todayDate}</p>
      </div>

      {/* 구분선 */}
      <div className="border-t-2 border-gray-300 mb-6"></div>

      {/* 오늘의 주요 뉴스 트렌드 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          [오늘의 주요 뉴스 트렌드]
        </h2>
        <div className="space-y-1">
          {trends.map((trend, index) => (
            <TrendCard 
              key={index}
              keyword={trend.keyword}
              newsCount={trend.newsCount}
            />
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t-2 border-gray-300 mb-6"></div>

      {/* 주목할 섹터 분석 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          [주목할 섹터 분석]
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ※ 상승 가능성 높은 순으로 정렬
        </p>
      </div>

      {/* 섹터 카드 리스트 */}
      <div className="space-y-6">
        {sectors
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
              onStockClick={handleStockClick}
            />
          ))}
      </div>

      {/* 면책 문구 */}
      <div className="mt-12 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          ⚠️ 본 서비스는 투자 참고 정보를 제공하며, 투자 판단의 책임은 사용자에게 있습니다.
        </p>
      </div>
    </MainLayout>
  );
}