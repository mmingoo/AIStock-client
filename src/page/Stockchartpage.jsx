// src/page/StockChartPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PageHeader from '../components/common/PageHeader/PageHeader';

export default function StockChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stock, sector } = location.state || {};
  
  const [activeTab, setActiveTab] = useState('details');
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('1D'); // 1D, 1W, 1M, 3M, 1Y
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
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

  // AI에게 질문 보내기
  const handleSendMessage = async () => {
    if (!userInput.trim() || isAnalyzing) return;

    const userMessage = {
      role: 'user',
      content: userInput,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsAnalyzing(true);

    // TODO: 실제 AI API 연동
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput);
      const aiMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsAnalyzing(false);
    }, 1500);
  };

  // AI 응답 생성 (임시)
  const generateAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('골든크로스') || lowerQuestion.includes('이동평균')) {
      return `현재 ${stock.ticker}의 5일 이동평균선($151.20)이 20일 이동평균선($148.50)을 상향 돌파하여 골든크로스가 발생했습니다. 이는 일반적으로 강한 매수 신호로 해석됩니다.\n\n과거 데이터를 분석한 결과, 골든크로스 발생 후 평균적으로 2주 내 5-8% 상승하는 경향을 보였습니다.`;
    }
    
    if (lowerQuestion.includes('매수') || lowerQuestion.includes('진입')) {
      return `현재 기술적 분석 결과:\n\n✅ 추천 진입가: $745-$755\n⚠️ 손절가: $720\n🎯 목표가: $785-$800\n\n현재 RSI가 72로 다소 과열 구간이므로, 분할 매수를 추천드립니다. 전체 물량의 50%를 현재가에, 나머지 50%는 $740 근처에서 추가 매수하는 것이 리스크 관리에 유리합니다.`;
    }
    
    if (lowerQuestion.includes('리스크') || lowerQuestion.includes('위험')) {
      return `현재 ${stock.ticker}의 주요 리스크 요인:\n\n1. RSI 과열 (72): 단기 조정 가능성\n2. 거래량 급증: 변동성 확대 가능성\n3. 섹터 전체 과열: ${sector.sectorName} 섹터 전체적으로 고평가 우려\n\n리스크 관리를 위해 손절가($720)를 반드시 설정하시고, 목표 수익률 달성 시 일부 익절을 추천드립니다.`;
    }
    
    if (lowerQuestion.includes('전망') || lowerQuestion.includes('예측')) {
      return `${stock.ticker}의 단기 전망(1-2주):\n\n📈 상승 확률: 78%\n\n긍정 요인:\n• 골든크로스 발생\n• 거래량 급증 (+35%)\n• ${sector.sectorName} 섹터 전체 강세\n• 최근 호재 뉴스 다수\n\n주의 요인:\n• RSI 과열 구간\n• 단기 차익실현 압력 가능성\n\n종합적으로 상승 추세는 유효하나, 단기 조정 가능성을 염두에 두고 분할 매수/익절 전략을 권장합니다.`;
    }

    // 기본 응답
    return `${stock.ticker}에 대해 궁금하신 내용을 분석해드리겠습니다.\n\n현재 주요 지표:\n• 현재가: $152.43 (+2.3%)\n• 5일 이평: $151.20\n• 20일 이평: $148.50\n• RSI: 72 (과열)\n• 거래량: 평균 대비 +35%\n\n더 구체적인 질문을 해주시면 상세히 분석해드리겠습니다. 예:\n- "골든크로스가 발생했나요?"\n- "언제 매수하면 좋을까요?"\n- "주요 리스크는 무엇인가요?"\n- "앞으로 전망이 어떤가요?"`;
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

      {/* 차트 섹션 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">📈 실시간 차트</h2>
          
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

        {/* 차트 영역 */}
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
        {/* 차트 탭 제거 */}
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
          <div className="h-[600px] flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🤖 AI 차트 분석</h2>
              <p className="text-sm text-gray-600">
                차트에 대해 궁금한 점을 물어보세요. AI가 기술적 분석을 도와드립니다.
              </p>
            </div>

            {/* 채팅 메시지 영역 */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AI에게 차트 분석을 요청하세요
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 max-w-md">
                    기술적 지표, 매매 타이밍, 리스크 등 궁금한 것을 자유롭게 물어보세요.
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-w-lg">
                    <button
                      onClick={() => setUserInput('골든크로스가 발생했나요?')}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      💡 골든크로스가 발생했나요?
                    </button>
                    <button
                      onClick={() => setUserInput('지금 매수해도 될까요?')}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      🤔 지금 매수해도 될까요?
                    </button>
                    <button
                      onClick={() => setUserInput('주요 리스크는 무엇인가요?')}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      ⚠️ 주요 리스크는?
                    </button>
                    <button
                      onClick={() => setUserInput('앞으로 전망이 어떤가요?')}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      📈 앞으로 전망은?
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className="flex items-end gap-2">
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                message.role === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white border border-gray-200 text-gray-900'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                            <p className={`text-xs text-gray-400 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* AI 응답 로딩 */}
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="flex items-end gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 입력 영역 */}
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="예: 골든크로스가 발생했나요? 지금 매수해도 될까요?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isAnalyzing}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2
                  ${userInput.trim() && !isAnalyzing
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isAnalyzing ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>

            {/* 안내 문구 */}
            <div className="mt-3 text-xs text-gray-500 text-center">
              💡 AI 분석은 참고용이며, 실제 투자 판단은 본인의 책임입니다.
            </div>
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