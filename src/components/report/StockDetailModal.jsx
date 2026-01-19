// src/components/report/StockDetailModal.jsx
import React, { useState } from 'react';

export default function StockDetailModal({ stock, sector, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!stock) return null;

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${stock.ticker} 관심 종목 ${!isFavorite ? '추가' : '제거'}`);
    // TODO: 나중에 API 연동
  };

  const handleEmailSend = () => {
    console.log(`${stock.ticker} 분석 이메일 발송`);
    // TODO: 이메일 발송 API 연동
  };

  const handleShare = () => {
    console.log(`${stock.ticker} 공유`);
    // TODO: 공유 기능 구현
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {stock.ticker} - {stock.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {sector.sectorName} 섹터 / {sector.order}차 영향
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* 관심 종목 추가 버튼 */}
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-sm">
                {isFavorite ? '관심 종목' : '관심 추가'}
              </span>
            </button>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-6">
          {/* 상승 이유 상세 */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              💡 상승 이유 상세
            </h3>
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
              ))}
            </div>
          </section>

          {/* 관련 뉴스 */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📰 관련 뉴스
            </h3>
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
              ))}
            </div>
          </section>

          {/* 과거 유사 사례 */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📊 과거 유사 사례
            </h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              {stock.historicalCase ? (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {stock.historicalCase.event}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">기간:</span> {stock.historicalCase.period}
                    </p>
                    <p>
                      <span className="font-medium">주가 변동:</span> {stock.historicalCase.priceChange}
                    </p>
                    <p className="leading-relaxed">
                      <span className="font-medium">분석:</span> {stock.historicalCase.analysis}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  현재 유사한 과거 사례 데이터가 없습니다.
                </p>
              )}
            </div>
          </section>

          {/* 리스크 요인 */}
          {stock.risks && stock.risks.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                ⚠️ 주의해야 할 리스크
              </h3>
              <div className="bg-red-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {stock.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-red-800 flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* 푸터 - 액션 버튼 */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3 mb-3">
            {/* 이메일로 받기 버튼 */}
            <button 
              onClick={handleEmailSend}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>이 분석 이메일로 받기</span>
            </button>

            {/* 공유 버튼 */}
            <button 
              onClick={handleShare}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            ⚠️ 본 정보는 투자 참고용이며, 투자 판단의 책임은 본인에게 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}