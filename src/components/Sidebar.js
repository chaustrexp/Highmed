import React from 'react';

// Iconos SVG modernos y minimalistas
const Icons = {
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  pill: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  gift: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  clipboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  stethoscope: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
};

function Sidebar({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, userRole }) {
  const menuItems = userRole === 'usuario' ? [
    { id: 'inicio', text: 'Dashboard', icon: Icons.home, description: 'Vista general' },
    { id: 'mis-citas', text: 'Mis Citas', icon: Icons.calendar, description: 'Gestionar citas' },
    { id: 'medicamentos', text: 'Medicamentos', icon: Icons.pill, description: 'Recetas médicas' },
    { id: 'beneficios', text: 'Beneficios', icon: Icons.gift, description: 'Servicios exclusivos' }
  ] : [
    { id: 'inicio', text: 'Dashboard', icon: Icons.home, description: 'Vista general' },
    { id: 'gestion-citas', text: 'Gestión de Citas', icon: Icons.clipboard, description: 'Administrar citas' },
    { id: 'reportes', text: 'Reportes', icon: Icons.chart, description: 'Estadísticas' }
  ];

  const handlePageChange = (pageId) => {
    console.log('Navegando a:', pageId);
    
    if (setCurrentPage && typeof setCurrentPage === 'function') {
      setCurrentPage(pageId);
    }
    
    // Cerrar sidebar en móvil
    if (setSidebarOpen && typeof setSidebarOpen === 'function') {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className={`flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <div 
            className="flex flex-col flex-grow h-screen bg-white bg-opacity-95 border-r border-medical-200 shadow-soft"
          >
            {/* Header */}
            <div className={`flex items-center flex-shrink-0 border-b border-white border-opacity-20 transition-all duration-300 ${
              sidebarCollapsed ? 'px-3 py-4 justify-center' : 'px-6 py-6'
            }`}>
              {sidebarCollapsed ? (
                <div className="w-10 h-10 bg-gradient-to-br from-health-500 to-health-600 rounded-xl flex items-center justify-center shadow-medium">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-health-500 to-health-600 rounded-xl flex items-center justify-center shadow-medium">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-medical-900">HighMed</h1>
                    <p className="text-xs text-medical-500">by HIGHSOFT</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className={`flex-1 py-6 space-y-1 transition-all duration-300 ${
              sidebarCollapsed ? 'px-2' : 'px-4'
            }`}>
              {!sidebarCollapsed && (
                <div className="mb-4">
                  <h2 className="px-3 text-xs font-semibold text-medical-400 uppercase tracking-wider">
                    Navegación
                  </h2>
                </div>
              )}
              
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handlePageChange(item.id)}
                    className={`sidebar-nav-item w-full text-left group transition-all duration-200 ${
                      currentPage === item.id
                        ? 'sidebar-nav-item-active'
                        : 'sidebar-nav-item-inactive'
                    } ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'}`}
                  >
                    <div className={`transition-colors duration-200 ${
                      currentPage === item.id ? 'text-health-600' : 'text-medical-400 group-hover:text-medical-600'
                    } ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`}>
                      {item.icon}
                    </div>
                    
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{item.text}</div>
                        <div className="text-xs text-medical-400 mt-0.5">{item.description}</div>
                      </div>
                    )}
                    
                    {!sidebarCollapsed && currentPage === item.id && (
                      <div className="w-2 h-2 bg-health-600 rounded-full"></div>
                    )}
                  </button>

                  {/* Tooltip para modo colapsado */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-medical-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      <div className="font-medium">{item.text}</div>
                      <div className="text-xs text-medical-300">{item.description}</div>
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-medical-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* User Info Footer */}
            <div className={`border-t border-white border-opacity-20 transition-all duration-300 ${
              sidebarCollapsed ? 'px-2 py-3' : 'px-4 py-4'
            }`}>
              <div className={`flex items-center bg-medical-50 rounded-lg transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
              }`}>
                <div className="w-8 h-8 bg-gradient-to-br from-health-400 to-health-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                  {userRole === 'usuario' ? 'P' : 'A'}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-medical-900 truncate">
                      {userRole === 'usuario' ? 'Paciente' : 'Administrador'}
                    </p>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-health-500 rounded-full animate-pulse-soft"></div>
                      <p className="text-xs text-medical-500">En línea</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex flex-col h-full bg-transparent">
          {/* Mobile Header */}
          <div className="flex items-center justify-between flex-shrink-0 px-6 py-6 border-b border-white border-opacity-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-health-500 to-health-600 rounded-xl flex items-center justify-center shadow-medium">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-medical-900">HighMed</h1>
                <p className="text-xs text-medical-500">by HIGHSOFT</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-medical-400 hover:text-medical-600 hover:bg-medical-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-health-500"
            >
              <span className="sr-only">Cerrar sidebar</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <div className="mb-4">
              <h2 className="px-3 text-xs font-semibold text-medical-400 uppercase tracking-wider">
                Navegación
              </h2>
            </div>
            
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`sidebar-nav-item w-full text-left group px-3 py-2 ${
                  currentPage === item.id
                    ? 'sidebar-nav-item-active'
                    : 'sidebar-nav-item-inactive'
                }`}
              >
                <div className={`mr-3 transition-colors duration-200 ${
                  currentPage === item.id ? 'text-health-600' : 'text-medical-400 group-hover:text-medical-600'
                }`}>
                  {item.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{item.text}</div>
                  <div className="text-xs text-medical-400 mt-0.5">{item.description}</div>
                </div>
                
                {currentPage === item.id && (
                  <div className="w-2 h-2 bg-health-600 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="px-4 py-4 border-t border-white border-opacity-20">
            <div className="flex items-center space-x-3 px-3 py-2 bg-medical-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-health-400 to-health-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                {userRole === 'usuario' ? 'P' : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-medical-900 truncate">
                  {userRole === 'usuario' ? 'Paciente' : 'Administrador'}
                </p>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-health-500 rounded-full animate-pulse-soft"></div>
                  <p className="text-xs text-medical-500">En línea</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;