import React from 'react';

export default function Button({ 
  children, 
  type = 'button', 
  variant = 'primary',
  fullWidth = false,
  onClick,
  disabled = false
}) {
  const baseStyle = 'h-12 text-sm font-semibold rounded-lg transition-colors duration-200';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700'
  };

  const widthStyle = fullWidth ? 'w-full' : 'px-6';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${widthStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}