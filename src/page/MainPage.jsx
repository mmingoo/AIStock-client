import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import NewsCard from '../components/report/Newscard';
import StockCard from '../components/report/StockCard';

export default function MainPage() {
  // 임시 데이터 (나중에 API 연동)
  const todayDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const newsList = [
    {
      id: 1,
      title: '연준, 금리 동결 시사... "인플레이션 둔화 확인 필요"',
      summary: '제롬 파월 연준 의장이 기준금리 동결을 시사하며, 인플레이션이 목표치로 수렴하는지 더 지켜봐야 한다고 밝혔다.',
      source: 'Reuters',
      date: '2시간 전',
      relatedStocks: ['SPY', 'QQQ', 'TLT']
    },
    {
      id: 2,
      title: '엔비디아, AI 칩 수요 급증으로 실적 전망 상향',
      summary: '엔비디아가 데이터센터 AI 칩 수요 증가로 인해 다음 분기 실적 가이던스를 상향 조정했다.',
      source: 'Bloomberg',
      date: '3시간 전',
      relatedStocks: ['NVDA', 'AMD', 'TSM']
    },
    {
      id: 3,
      title: '테슬라, 중국 판매량 전월 대비 15% 감소',
      summary: '테슬라의 중국 내 전기차 판매량이 경쟁 심화로 인해 전월 대비 15% 감소했다.',
      source: 'CNBC',
      date: '5시간 전',
      relatedStocks: ['TSLA', 'NIO', 'BYD']
    }
  ];

  const stockList = [
    {
      symbol: 'NVDA',
      name: '엔비디아',
      sentiment: 'positive',
      reason: 'AI 칩 수요 급증, 데이터센터 매출 성장 지속. 실적 가이던스 상향 조정으로 긍정적 전망.'
    },
    {
      symbol: 'TSLA',
      name: '테슬라',
      sentiment: 'negative',
      reason: '중국 시장 경쟁 심화로 판매량 감소. 가격 인하 압박 지속될 전망.'
    },
    {
      symbol: 'AAPL',
      name: '애플',
      sentiment: 'neutral',
      reason: '신제품 출시 예정이나 중국 시장 불확실성 존재. 관망세 유지 권장.'
    },
    {
      symbol: 'AMD',
      name: 'AMD',
      sentiment: 'positive',
      reason: 'AI 가속기 시장 점유율 확대. 엔비디아 대안으로 수요 증가 예상.'
    }
  ];

  return (
    <MainLayout>
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">일간 리포트</h1>
        <p className="text-sm text-gray-500">{todayDate}</p>
      </div>

      {/* AI 요약 섹션 */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-blue-600 mb-2">AI 오늘의 요약</h2>
        <p className="text-gray-700 leading-relaxed">
          오늘 시장은 연준의 금리 동결 시사로 전반적으로 안정세를 보였습니다. 
          AI 반도체 섹터는 엔비디아의 실적 가이던스 상향으로 강세를 이어갔으며, 
          전기차 섹터는 테슬라의 중국 판매 부진으로 약세를 보였습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 뉴스 섹션 */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">주요 뉴스</h2>
          <div className="space-y-4">
            {newsList.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                summary={news.summary}
                source={news.source}
                date={news.date}
                relatedStocks={news.relatedStocks}
                onClick={() => console.log('뉴스 클릭:', news.id)}
              />
            ))}
          </div>
        </div>

        {/* 종목 섹션 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">관련 종목</h2>
          <div className="space-y-4">
            {stockList.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.name}
                sentiment={stock.sentiment}
                reason={stock.reason}
                onClick={() => console.log('종목 클릭:', stock.symbol)}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}