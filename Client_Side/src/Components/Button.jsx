import React from 'react';

function Button({ text, onClick, type = 'button', variant = 'primary', className = '' }) {
  // Base styles
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none shadow-lg transform hover:scale-105';

  // Variants with attractive colors/gradients
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 shadow-red-500/50',
    secondary: 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 shadow-green-400/50',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-red-300/50',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {text}
    </button>
  );
}

export default Button;
