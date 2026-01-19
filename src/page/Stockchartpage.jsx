// src/page/StockChartPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PageHeader from '../components/common/PageHeader/PageHeader';

export default function StockChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stock, sector } = location.state || {};
  
  const [activeTab, setActiveTab] = useState('chart');
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('1D'); // 1D, 1W, 1M, 3M, 1Y
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 차트 데이터 로딩 (임시 데이터)
  useEffect(() => {
    // TODO: 실제 API 연동
    const dummyData = generateDummyChartData(timeframe);
    setChartData(dummyData);
  }, [stock?.ticker, timeframe]);

  // 임시 차트 데이터 생성
  const generateDummyChartData = (period) => {
    const data = [];
    const points = period === '1D' ? 24 : period === '1W' ? 7 : period === '1M' ? 30 : period === '3M' ? 90 : 365;
    let basePrice = 150;
    
    for (let i = 0; i < points; i++) {
      basePrice += (Math.random() - 0.5) * 5;
      data.push({
        time: i,
        price: basePrice,
        volume: Math.random() * 1000000
      });
    }
    return data;
  };

  // AI 차트 분석 요청
  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // TODO: 실제 AI API 연동
    setTimeout(() => {
      setAiAnalysis({
        pattern: "상승 삼각형 패턴",
        signals: [
          { type: "골든크로스", description: "5일 이동평균선이 20일 이동평균선을 상향 돌파했습니다.", sentiment: "positive" },
          { type: "거래량 증가", description: "평균 거래량 대비 35% 증가하여 상승 모멘텀이 강화되고 있습니다.", sentiment: "positive" },
          { type: "RSI 과열", description: "RSI 지표가 72로 과열 구간입니다. 단기 조정 가능성에 유의하세요.", sentiment: "warning" }
        ],
        probability: 78,
        recommendation: "매수",
        targetPrice: "$785",
        stopLoss: "$720",
        summary: "기술적 지표와 패턴 모두 긍정적입니다. 다만 RSI 과열로 단기 조정 가능성이 있으니 분할 매수를 추천합니다."
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  if (!stock) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <p className="text-gray-600">주식 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/main')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            메인으로 돌아가기
          </button>
        </div>
      </MainLayout>
    );
  }

  const tabs = [
    { id: 'chart', label: '📈 차트', icon: '📈' },
    { id: 'details', label: '💡 상승 이유', icon: '💡' },
    { id: 'news', label: '📰 관련 뉴스', icon: '📰' },
    { id: 'history', label: '📊 과거 사례', icon: '📊' },
    { id: 'risks', label: '⚠️ 리스크', icon: '⚠️' },
    { id: 'ai', label: '🤖 AI 분석', icon: '🤖' }
  ];

  return (
    <MainLayout>
      {/* 페이지 헤더 */}
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <span>{stock.ticker}</span>
            <span className="text-gray-500 font-normal text-lg">-</span>
            <span className="text-gray-600 font-normal text-lg">{stock.name}</span>
          </div>
        }
        subtitle={`${sector?.sectorName} 섹터 / ${sector?.order}차 영향`}
      />

      {/* 탭 네비게이션 */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        {/* 차트 탭 */}
        {activeTab === 'chart' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">실시간 차트</h2>
              
              {/* 시간대 선택 */}
              <div className="flex gap-2">
                {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                      ${timeframe === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* 차트 영역 (실제로는 Chart.js나 Recharts 사용) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-4">
              <div className="text-center text-gray-600 mb-4">
                <p className="text-sm mb-2">여기에 실제 차트가 표시됩니다</p>
                <p className="text-xs text-gray-500">
                  Finnhub API + Recharts 또는 TradingView 위젯 사용 예정
                </p>
              </div>
              
              {/* 임시 차트 시각화 */}
              <div className="h-64 flex items-end justify-around gap-1">
                {chartData.slice(0, 50).map((point, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-blue-500 rounded-t opacity-60 hover:opacity-100 transition-opacity"
                    style={{ height: `${(point.price / 200) * 100}%` }}
                  />
                ))}
              </div>

              {/* 차트 정보 */}
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">현재가</p>
                  <p className="text-lg font-bold text-gray-900">$152.43</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">등락률</p>
                  <p className="text-lg font-bold text-green-600">+2.3%</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">거래량</p>
                  <p className="text-lg font-bold text-gray-900">1.2M</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">시가총액</p>
                  <p className="text-lg font-bold text-gray-900">$750B</p>
                </div>
              </div>
            </div>

            {/* 기술적 지표 */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">주요 기술적 지표</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">이동평균선(5일)</p>
                  <p className="text-sm font-semibold text-gray-900">$151.20</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">이동평균선(20일)</p>
                  <p className="text-sm font-semibold text-gray-900">$148.50</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">RSI</p>
                  <p className="text-sm font-semibold text-orange-600">72 (과열)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">MACD</p>
                  <p className="text-sm font-semibold text-green-600">+0.52 (매수)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">볼린저밴드</p>
                  <p className="text-sm font-semibold text-gray-900">상단 근접</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">거래량</p>
                  <p className="text-sm font-semibold text-green-600">평균 대비 +35%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 상승 이유 탭 */}
        {activeTab === 'details' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">💡 상승 이유 상세</h2>
            <div className="space-y-4">
              {stock.detailedReasons?.map((detail, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {index + 1}. {detail.title}
                  </h4>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {detail.description}
                  </p>
                  {detail.data && (
                    <div className="bg-blue-50 rounded p-3 text-sm">
                      <span className="font-medium text-blue-900">구체적 수치:</span>
                      <span className="text-blue-700 ml-2">{detail.data}</span>
                    </div>
                  )}
                </div>
              )) || (
                <p className="text-gray-600">상승 이유 상세 정보가 없습니다.</p>
              )}
            </div>
          </div>
        )}

        {/* 관련 뉴스 탭 */}
        {activeTab === 'news' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">📰 관련 뉴스</h2>
            <div className="space-y-3">
              {stock.relatedNews?.map((news, index) => (
                <a
                  key={index}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {news.summary}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              )) || (
                <p className="text-gray-600">관련 뉴스가 없습니다.</p>
              )}
            </div>
          </div>
        )}

        {/* 과거 사례 탭 */}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">📊 과거 유사 사례</h2>
            {stock.historicalCase ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                  {stock.historicalCase.event}
                </h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-[80px]">기간:</span>
                    <span>{stock.historicalCase.period}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-[80px]">주가 변동:</span>
                    <span className="text-green-600 font-semibold">{stock.historicalCase.priceChange}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-[80px]">분석:</span>
                    <span className="leading-relaxed">{stock.historicalCase.analysis}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">현재 유사한 과거 사례 데이터가 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {/* 리스크 탭 */}
        {activeTab === 'risks' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">⚠️ 주의해야 할 리스크</h2>
            {stock.risks && stock.risks.length > 0 ? (
              <div className="bg-red-50 rounded-lg p-6">
                <ul className="space-y-3">
                  {stock.risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-lg">⚠️</span>
                      <span className="text-sm text-red-800 leading-relaxed">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">현재 파악된 주요 리스크가 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {/* AI 분석 탭 */}
        {activeTab === 'ai' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">🤖 AI 차트 분석</h2>
              <button
                onClick={handleAIAnalysis}
                disabled={isAnalyzing}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
                  ${isAnalyzing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>분석 중...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>AI 분석 시작</span>
                  </>
                )}
              </button>
            </div>

            {!aiAnalysis ? (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  AI가 차트를 분석해드립니다
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  기술적 지표, 패턴 인식, 매매 신호 등을 종합적으로 분석합니다.
                </p>
                <p className="text-xs text-gray-500">
                  ※ 위 버튼을 눌러 분석을 시작하세요
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 종합 점수 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">종합 분석 결과</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">상승 확률</p>
                      <p className="text-3xl font-bold text-green-600">{aiAnalysis.probability}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">패턴</p>
                      <p className="text-sm font-semibold text-gray-900">{aiAnalysis.pattern}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">추천</p>
                      <p className="text-sm font-semibold text-green-600">{aiAnalysis.recommendation}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">목표가</p>
                      <p className="text-sm font-semibold text-blue-600">{aiAnalysis.targetPrice}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{aiAnalysis.summary}</p>
                  </div>
                </div>

                {/* 신호 분석 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">감지된 신호</h3>
                  <div className="space-y-3">
                    {aiAnalysis.signals.map((signal, index) => (
                      <div 
                        key={index}
                        className={`rounded-lg p-4 border-l-4 ${
                          signal.sentiment === 'positive' 
                            ? 'bg-green-50 border-green-500' 
                            : signal.sentiment === 'negative'
                            ? 'bg-red-50 border-red-500'
                            : 'bg-yellow-50 border-yellow-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">
                            {signal.sentiment === 'positive' ? '✅' : signal.sentiment === 'negative' ? '❌' : '⚠️'}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{signal.type}</h4>
                            <p className="text-sm text-gray-700">{signal.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 매매 가이드 */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">💡 AI 매매 가이드</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-2">추천 진입가</p>
                      <p className="text-2xl font-bold text-blue-600">{aiAnalysis.targetPrice}</p>
                      <p className="text-xs text-gray-600 mt-2">현재가 대비 +5.2%</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-2">손절가</p>
                      <p className="text-2xl font-bold text-red-600">{aiAnalysis.stopLoss}</p>
                      <p className="text-xs text-gray-600 mt-2">현재가 대비 -4.8%</p>
                    </div>
                  </div>
                </div>

                {/* 재분석 버튼 */}
                <div className="text-center pt-4">
                  <button
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    🔄 재분석하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 면책 문구 */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          ⚠️ 본 정보는 투자 참고용이며, 투자 판단의 책임은 본인에게 있습니다.
        </p>
      </div>
    </MainLayout>
  );
}