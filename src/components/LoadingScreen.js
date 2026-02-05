import React from 'react';

function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay con gradiente mejorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-health-50/95 to-health-100/90"></div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-health-200 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-health-300 rounded-full blur-3xl opacity-15 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-health-100 to-transparent rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>
      
      {/* Contenido del loading */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-10 px-4">
        
        {/* Logo de la empresa */}
        <div className="relative animate-scale-in">
          {/* Anillos decorativos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-health-200 rounded-full animate-spin-slow opacity-30"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-health-300 rounded-full animate-spin-reverse opacity-20"></div>
          </div>
          
          {/* Logo principal con imagen */}
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-3xl shadow-strong flex items-center justify-center p-4 animate-float-gentle">
              <img 
                src="/logo.jpeg" 
                alt="HIGHSOFT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Icono de rayo superpuesto */}
            <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-br from-health-500 to-health-600 rounded-xl flex items-center justify-center shadow-medium animate-bounce-gentle">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Texto de marca con animación mejorada */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-health-600 via-health-500 to-health-600 bg-clip-text text-transparent animate-gradient">
            HighMed
          </h1>
          <div className="flex items-center justify-center space-x-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-health-400 to-health-400"></div>
            <p className="text-lg text-medical-600 font-semibold tracking-wide">
              by HIGHSOFT
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-health-400 to-health-400"></div>
          </div>
          
          {/* Slogan oficial */}
          <div className="pt-2">
            <p className="text-base md:text-lg text-medical-700 font-medium italic">
              Conectando pacientes, médicos y soluciones.
            </p>
          </div>
        </div>

        {/* Barra de progreso mejorada */}
        <div className="w-80 max-w-full space-y-4 animate-fade-in-delay">
          <div className="relative h-2 bg-medical-200 rounded-full overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <div className="h-full bg-gradient-to-r from-health-400 via-health-500 to-health-600 rounded-full animate-loading-bar shadow-soft"></div>
          </div>
          
          {/* Estado de carga */}
          <div className="text-center space-y-2">
            <p className="text-sm text-medical-600 font-medium">
              Iniciando sistema
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-smooth"></div>
              <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-smooth animation-delay-200"></div>
              <div className="w-2 h-2 bg-health-500 rounded-full animate-bounce-smooth animation-delay-400"></div>
            </div>
          </div>
        </div>

        {/* Mensaje inferior con mejor diseño */}
        <div className="absolute bottom-8 left-0 right-0 text-center space-y-3 px-4 animate-fade-in-delay-3">
          <p className="text-sm md:text-base text-medical-700 font-semibold">
            Sistema de Gestión Médica
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-health-200">
              <svg className="w-4 h-4 text-health-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm text-health-700 font-medium">Conexión segura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
