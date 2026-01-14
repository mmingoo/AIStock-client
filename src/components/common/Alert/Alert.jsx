import React from 'react';

export default function Alert({ 
  icon, 
  title, 
  message, 
  linkText, 
  linkHref 
}) {
  return (
    <div className="text-center">
      {icon && (
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
      )}
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>
      )}
      {message && (
        <p className="text-sm text-gray-500 mb-6">
          {message}
        </p>
      )}
      {linkText && linkHref && (
        <a
          href={linkHref}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          {linkText}
        </a>
      )}
    </div>
  );
}