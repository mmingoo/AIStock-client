// src/components/common/Divider/Divider.jsx
import React from 'react';

export default function Divider({ className = '', variant = 'default' }) {
  const variants = {
    default: 'border-t border-gray-200',
    bold: 'border-t-2 border-gray-300',
    dashed: 'border-t border-dashed border-gray-300'
  };

  return <div className={`${variants[variant]} ${className}`} />;
}
