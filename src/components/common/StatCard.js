import React from 'react';

function StatCard({ title, value, subtitle, color = 'health', trend, icon }) {
  const colorClasses = {
    health: {
      bg: 'bg-gradient-health',
      border: 'border-health-200',
      text: 'text-health-700',
      icon: 'text-health-600',
      accent: 'bg-health-600'
    },
    accent: {
      bg: 'bg-gradient-accent',
      border: 'border-accent-200',
      text: 'text-accent-700',
      icon: 'text-accent-600',
      accent: 'bg-accent-600'
    },
    medical: {
      bg: 'bg-gradient-medical',
      border: 'border-medical-200',
      text: 'text-medical-700',
      icon: 'text-medical-600',
      accent: 'bg-medical-600'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: 'text-amber-600',
      accent: 'bg-amber-600'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: 'text-red-600',
      accent: 'bg-red-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-700',
      icon: 'text-purple-600',
      accent: 'bg-purple-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.health;

  const defaultIcons = {
    health: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    accent: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    medical: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    )
  };

  return (
    <div className={`card-interactive ${colors.bg} ${colors.border} border-l-4 animate-enter`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-xl ${colors.icon} bg-white/50`}>
              {icon || defaultIcons[color] || defaultIcons.health}
            </div>
            <div>
              <p className="text-sm font-medium text-medical-600 uppercase tracking-wide">
                {title}
              </p>
            </div>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <p className={`text-3xl font-bold ${colors.text}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <div className={`flex items-center text-sm font-medium ${
                trend.direction === 'up' ? 'text-health-600' : 
                trend.direction === 'down' ? 'text-red-600' : 'text-medical-500'
              }`}>
                {trend.direction === 'up' && (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                )}
                {trend.direction === 'down' && (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                {trend.value}
              </div>
            )}
          </div>
          
          <p className="text-sm text-medical-500 mt-2">
            {subtitle}
          </p>
        </div>
        
        <div className={`w-1 h-16 ${colors.accent} rounded-full opacity-20`}></div>
      </div>
    </div>
  );
}

export default StatCard;