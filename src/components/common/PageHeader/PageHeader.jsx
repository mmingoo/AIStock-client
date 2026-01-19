// src/components/common/PageHeader/PageHeader.jsx
import React from 'react';

export default function PageHeader({ 
  icon, 
  title, 
  subtitle, 
  actions 
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}