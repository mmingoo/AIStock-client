import React from 'react';

export default function NewsCard({ title, summary, source, date, relatedStocks, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 
                 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <span>{source}</span>
        <span>•</span>
        <span>{date}</span>
      </div>
      
      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
        {summary}
      </p>
      
      {relatedStocks && relatedStocks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {relatedStocks.map((stock, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md"
            >
              {stock}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}