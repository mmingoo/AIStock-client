import React from 'react';
import Logo from '../logo/Logo';

export default function AuthLayout({ children, subtitle }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-10">
        <Logo subtitle={subtitle} />
        {children}
      </div>
    </div>
  );
}