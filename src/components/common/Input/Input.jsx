import React from 'react';

export default function Input({
  id,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error
}) {
  return (
    <div>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full h-12 px-4 text-sm border rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder:text-gray-400 transition-all
                   ${error ? 'border-red-500' : 'border-gray-200'}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}