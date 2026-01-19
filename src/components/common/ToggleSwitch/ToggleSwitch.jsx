// src/components/common/ToggleSwitch/ToggleSwitch.jsx
import React from 'react';

export default function ToggleSwitch({ 
  checked, 
  onChange, 
  label, 
  description 
}) {
  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div>
          {label && (
            <p className="text-sm font-medium text-gray-900">
              {label}
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors
          ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
            ${checked ? 'right-1' : 'left-1'}`}
        />
      </button>
    </div>
  );
}