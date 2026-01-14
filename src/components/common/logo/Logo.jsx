import React from 'react';

export default function Logo({ subtitle }) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        <span className="text-blue-600">아이</span>스톡
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}