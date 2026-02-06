import React from 'react';

function LoadingSpinner({ size = 'md', text = 'Cargando...' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {/* Spinner animado */}
      <div className="relative">
        {/* Círculo de fondo */}
        <div className={`${sizeClasses[size]} bg-health-100 rounded-full animate-ping opacity-20 absolute inset-0`}></div>
        
        {/* Círculo principal */}
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-health-500 to-health-600 rounded-full flex items-center justify-center shadow-medium animate-pulse-slow relative`}>
          {/* Icono de rayo */}
          <svg 
            className={`${iconSizes[size]} text-white animate-bounce-slow`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>
      </div>

      {/* Texto */}
      {text && (
        <div className="text-center space-y-1">
          <p className="text-sm text-medical-600 font-medium">{text}</p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-dot"></div>
            <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-dot animation-delay-200"></div>
            <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-dot animation-delay-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadingSpinner;
