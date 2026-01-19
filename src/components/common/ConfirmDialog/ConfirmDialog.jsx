// src/components/common/ConfirmDialog/ConfirmDialog.jsx
import React from 'react';
import Button from '../Button/Button';
export default function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText = '확인',
  cancelText = '취소',
  onConfirm, 
  onCancel,
  variant = 'danger' // 'danger' | 'primary'
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-red-600 hover:bg-red-700',
    primary: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        {message && (
          <p className="text-sm text-gray-600 mb-6">
            {message}
          </p>
        )}
        
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition-colors ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}