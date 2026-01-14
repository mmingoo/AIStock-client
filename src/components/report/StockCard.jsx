import React from 'react';

export default function StockCard({ symbol, name, sentiment, reason, onClick }) {
  const sentimentConfig = {
    positive: {
      label: '긍정',
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100'
    },
    negative: {
      label: '부정',
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-100'
    },
    neutral: {
      label: '중립',
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-100'
    }
  };

  const config = sentimentConfig[sentiment] || sentimentConfig.neutral;

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border ${config.border} hover:shadow-sm 
                  transition-all cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-lg font-bold text-gray-900">{symbol}</span>
          <span className="ml-2 text-sm text-gray-500">{name}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-md ${config.bg} ${config.text}`}>
          {config.label}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 line-clamp-2">
        {reason}
      </p>
    </div>
  );
}