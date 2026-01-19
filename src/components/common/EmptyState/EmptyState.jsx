// src/components/common/EmptyState/EmptyState.jsx
import React from 'react';

export default function EmptyState({ 
  icon, 
  title, 
  message, 
  actionText, 
  actionHref 
}) {
  return (
    <div className="text-center py-20">
      {icon && (
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
      )}
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      
      {message && (
        <p className="text-sm text-gray-500 mb-6">
          {message}
        </p>
      )}
      
      {actionText && actionHref && (
        <a
          href={actionHref}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}