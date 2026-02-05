import React from 'react';

function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: 'url(/fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-health-50/90"></div>
      
      {/* Contenido del loading */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4">
        {/* Logo animado */}
        <div className="relative">
          {/* Círculo de fondo pulsante */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-health-100 rounded-full animate-ping opacity-20"></div>
          </div>
          
          {/* Círculo principal */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-health-500 to-health-600 rounded-2xl flex items-center justify-center shadow-strong animate-pulse-slow">
            {/* Icono de rayo (logo de HighMed) */}
            <svg 
              className="w-14 h-14 text-white animate-bounce-slow" 
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

        {/* Texto de marca */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-medical-900 animate-fade-in">
            HighMed
          </h1>
          <p className="text-sm text-medical-500 font-medium animate-fade-in-delay">
            by HIGHSOFT
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="w-64 h-2 bg-medical-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-health-500 to-health-600 rounded-full animate-loading-bar"></div>
        </div>

        {/* Texto de carga */}
        <div className="text-center space-y-1 animate-fade-in-delay-2">
          <p className="text-sm text-medical-600 font-medium">
            Cargando sistema...
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-dot"></div>
            <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-dot animation-delay-200"></div>
            <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-dot animation-delay-400"></div>
          </div>
        </div>

        {/* Mensaje adicional */}
        <div className="absolute bottom-8 text-center animate-fade-in-delay-3">
          <p className="text-xs text-medical-400">
            Sistema de Gestión Médica
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
