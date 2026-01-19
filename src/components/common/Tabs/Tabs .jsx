// src/components/common/Tabs/Tabs.jsx
import React from 'react';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium transition-colors
            ${activeTab === tab.id 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}