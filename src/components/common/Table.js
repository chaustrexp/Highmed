import React from 'react';

function Table({ columns, data, emptyMessage = 'No hay datos disponibles', loading = false, className = '' }) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="table-modern">
          <div className="table-header">
            <div className="flex">
              {columns.map((_, index) => (
                <div key={index} className="table-header-cell">
                  <div className="h-4 bg-medical-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="table-body">
            {[...Array(3)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="table-cell">
                    <div className="h-4 bg-medical-100 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-medical-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-medical-500 text-lg font-medium">{emptyMessage}</p>
        <p className="text-medical-400 text-sm mt-1">Los datos aparecerán aquí cuando estén disponibles</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden animate-enter">
      {/* Vista desktop */}
      <div className="hidden md:block overflow-x-auto">
        <div className={`table-modern min-w-full ${className}`}>
          <thead className="table-header">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`table-header-cell ${
                    column.key === 'actions' ? 'w-60 min-w-60' : column.width || ''
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <svg className="w-4 h-4 text-medical-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`${
                      column.key === 'actions' ? 'table-cell-actions' : 'table-cell'
                    } ${column.key === 'actions' ? '' : 'whitespace-nowrap'} ${column.width || ''}`}
                  >
                    <div className={`flex items-center ${
                      column.key === 'actions' ? 'space-x-2' : ''
                    }`}>
                      {column.render ? column.render(row[column.key], row, rowIndex) : (
                        <span className="text-medical-900">
                          {row[column.key] || '-'}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </div>
      </div>
      
      {/* Vista móvil */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="card p-4">
            {columns.map((column, colIndex) => {
              if (column.key === 'actions') {
                return (
                  <div key={colIndex} className="mt-4 pt-4 border-t border-medical-200">
                    <div className="flex flex-wrap gap-2">
                      {column.render ? column.render(row[column.key], row, rowIndex) : null}
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={colIndex} className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-medical-600">{column.label}:</span>
                  <div className="text-sm text-medical-900">
                    {column.render ? column.render(row[column.key], row, rowIndex) : (
                      <span>{row[column.key] || '-'}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Table footer with row count */}
      <div className="px-6 py-3 bg-medical-50 border-t border-medical-200 rounded-b-xl">
        <div className="flex items-center justify-between">
          <p className="text-sm text-medical-600">
            Mostrando <span className="font-medium">{data.length}</span> resultado{data.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-medical-400">Actualizado hace unos momentos</span>
            <div className="w-2 h-2 bg-health-500 rounded-full animate-pulse-soft"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;