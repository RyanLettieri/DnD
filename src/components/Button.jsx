import React from 'react';

const Button = ({ children, color = 'blue', onClick }) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
    green: 'bg-green-500 hover:bg-green-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} text-white font-bold py-2 px-4 rounded transition-colors`}
    >
      {children}
    </button>
  );
};

export default Button;