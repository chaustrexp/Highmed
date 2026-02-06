/**
 * MedicalCertificate.js
 * 
 * Componente para generar certificados médicos en formato PNG.
 * 
 * Funcionalidades:
 * - Genera certificado médico basado en la última consulta del paciente
 * - Certifica el estado físico y mental del paciente
 * - Incluye información del profesional de salud
 * - Diseño profesional con logo y marca de agua
 * - Optimizado para conversión a PNG con html2canvas
 * 
 * @param {Object} props - Props del componente
 * @param {Object} props.patient - Datos del paciente
 * @param {Array} props.appointments - Lista de citas del paciente
 * 
 * @author HighMed Development Team
 * @version 1.0.0
 */

import React from 'react';

function MedicalCertificate({ patient, appointments }) {
  /**
   * Formatea una fecha en formato legible en español
   * 
   * @param {string} dateString - Fecha en formato ISO
   * @returns {string} Fecha formateada (ej: "15 de febrero de 2026")
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Convierte el código de especialidad a nombre legible
   * 
   * @param {string} specialty - Código de especialidad
   * @returns {string} Nombre de la especialidad
   */
  const formatSpecialty = (specialty) => {
    const specialties = {
      'medicina-general': 'Medicina General',
      'cardiologia': 'Cardiología',
      'dermatologia': 'Dermatología',
      'neurologia': 'Neurología',
      'pediatria': 'Pediatría'
    };
    return specialties[specialty] || specialty;
  };

  /**
   * Obtiene el nombre del médico según la especialidad
   * 
   * @param {string} specialty - Código de especialidad
   * @returns {string} Nombre completo del médico
   */
  const getDoctorName = (specialty) => {
    const doctors = {
      'medicina-general': 'Dr. García Martínez',
      'cardiologia': 'Dr. Rodríguez López',
      'dermatologia': 'Dra. Fernández Silva',
      'neurologia': 'Dr. Morales Castro',
      'pediatria': 'Dra. López Hernández'
    };
    return doctors[specialty] || 'Médico Asignado';
  };

  /**
   * Obtiene la matrícula profesional del médico
   * 
   * @param {string} specialty - Código de especialidad
   * @returns {string} Número de matrícula profesional
   */
  const getDoctorLicense = (specialty) => {
    const licenses = {
      'medicina-general': 'MP-12345',
      'cardiologia': 'MP-23456',
      'dermatologia': 'MP-34567',
      'neurologia': 'MP-45678',
      'pediatria': 'MP-56789'
    };
    return licenses[specialty] || 'MP-00000';
  };

  /**
   * Genera la evaluación del estado de salud según la especialidad
   * 
   * @param {string} specialty - Código de especialidad
   * @returns {Object} Objeto con evaluación física y mental
   */
  const getHealthStatus = (specialty) => {
    const statuses = {
      'medicina-general': {
        physical: 'El paciente se encuentra en buen estado de salud general. No presenta síntomas de enfermedad aguda. Signos vitales dentro de parámetros normales.',
        mental: 'Estado mental estable, orientado en tiempo, espacio y persona. No se observan alteraciones cognitivas ni emocionales significativas.'
      },
      'cardiologia': {
        physical: 'Paciente con función cardiovascular estable. Presión arterial controlada. Ritmo cardíaco regular sin arritmias detectadas.',
        mental: 'Estado emocional estable. Sin signos de ansiedad o estrés cardiovascular.'
      },
      'dermatologia': {
        physical: 'Condición dermatológica evaluada y tratada. Piel sin lesiones activas significativas. Evolución favorable del tratamiento.',
        mental: 'Estado mental adecuado. Sin afectación psicológica relacionada con condición dermatológica.'
      },
      'neurologia': {
        physical: 'Función neurológica evaluada. Reflejos y respuestas motoras dentro de parámetros normales. Sin déficits neurológicos evidentes.',
        mental: 'Estado cognitivo preservado. Funciones mentales superiores sin alteraciones. Memoria y concentración adecuadas.'
      },
      'pediatria': {
        physical: 'Desarrollo físico acorde a la edad. Crecimiento y desarrollo psicomotor dentro de percentiles normales. Sin patologías agudas.',
        mental: 'Desarrollo cognitivo y emocional apropiado para la edad. Comportamiento dentro de parámetros esperados.'
      }
    };
    return statuses[specialty] || {
      physical: 'Paciente evaluado médicamente. Estado físico general estable sin alteraciones significativas.',
      mental: 'Estado mental y emocional dentro de parámetros normales.'
    };
  };

  /**
   * Obtiene la última cita del paciente (más reciente)
   * 
   * @returns {Object|null} Objeto de la última cita o null si no hay citas
   */
  const getLastAppointment = () => {
    if (!appointments || appointments.length === 0) return null;
    
    // Ordenar por fecha más reciente
    const sortedAppointments = [...appointments].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    return sortedAppointments[0];
  };

  // Obtener la última cita para el certificado
  const lastAppointment = getLastAppointment();
  
  // Fecha actual para el pie del certificado
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      id="medical-certificate"
      style={{
        width: '900px',
        minHeight: '1200px',
        backgroundColor: '#ffffff',
        padding: '0',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: 'relative',
        boxSizing: 'border-box',
        boxShadow: '0 0 40px rgba(0,0,0,0.1)'
      }}
    >
      {/* Borde decorativo superior */}
      <div style={{
        height: '20px',
        background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
        borderRadius: '0'
      }} />

      {/* Header con logo y título */}
      <div style={{ 
        backgroundColor: '#f9fafb',
        padding: '40px 60px',
        borderBottom: '4px solid #10b981'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo.jpeg" 
              alt="HighMed Logo" 
              style={{ 
                width: '90px', 
                height: '90px', 
                objectFit: 'contain',
                marginRight: '20px',
                border: '3px solid #10b981',
                borderRadius: '50%',
                padding: '5px',
                backgroundColor: '#ffffff'
              }}
            />
            <div>
              <h1 style={{ 
                fontSize: '38px', 
                fontWeight: 'bold', 
                color: '#10b981',
                margin: '0',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}>
                HIGHMED
              </h1>
              <p style={{ 
                fontSize: '15px', 
                color: '#6b7280',
                margin: '5px 0 0 0',
                fontWeight: '500'
              }}>
                Sistema de Gestión Médica Integral
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ 
              fontSize: '12px', 
              color: '#6b7280',
              margin: '0',
              lineHeight: '1.6'
            }}>
              <strong>Fecha de Emisión:</strong><br />
              {currentDate}
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#10b981',
          padding: '18px',
          borderRadius: '8px',
          marginTop: '25px',
          boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
        }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#ffffff',
            margin: '0',
            textAlign: 'center',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Certificado Médico
          </h2>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ padding: '50px 60px' }}>
        
        {/* Información del paciente */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '30px', 
          borderRadius: '12px',
          marginBottom: '40px',
          border: '3px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 style={{ 
              fontSize: '22px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0'
            }}>
              Datos del Paciente
            </h3>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            fontSize: '15px', 
            color: '#1f2937'
          }}>
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '15px',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ 
                margin: '0',
                color: '#6b7280',
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '5px'
              }}>
                Nombre Completo
              </p>
              <p style={{ 
                margin: '0',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                {patient.name}
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '15px',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ 
                margin: '0',
                color: '#6b7280',
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '5px'
              }}>
                Documento / ID
              </p>
              <p style={{ 
                margin: '0',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                {patient.userId}
              </p>
            </div>
          </div>
        </div>

        {lastAppointment ? (
          <>
            {/* Información de la consulta */}
            <div style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '30px', 
              borderRadius: '12px',
              marginBottom: '35px',
              border: '2px solid #10b981'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid #10b981'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'bold', 
                  color: '#1f2937',
                  margin: '0'
                }}>
                  Información de la Consulta
                </h3>
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '18px',
                fontSize: '15px'
              }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #059669'
                }}>
                  <p style={{ 
                    margin: '0 0 5px 0',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    📅 Fecha de Consulta
                  </p>
                  <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                    {formatDate(lastAppointment.date)}
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #059669'
                }}>
                  <p style={{ 
                    margin: '0 0 5px 0',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    🕐 Hora de Consulta
                  </p>
                  <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                    {lastAppointment.time}
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #059669',
                  gridColumn: 'span 2'
                }}>
                  <p style={{ 
                    margin: '0 0 5px 0',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    👨‍⚕️ Profesional de Salud
                  </p>
                  <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                    {getDoctorName(lastAppointment.specialty)}
                  </p>
                  <p style={{ margin: '0', fontSize: '13px', color: '#6b7280' }}>
                    {formatSpecialty(lastAppointment.specialty)} • Matrícula: {getDoctorLicense(lastAppointment.specialty)}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificación médica */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '35px', 
              borderRadius: '12px',
              marginBottom: '35px',
              border: '3px solid #10b981',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '25px',
                paddingBottom: '15px',
                borderBottom: '2px solid #e5e7eb'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'bold', 
                  color: '#1f2937',
                  margin: '0'
                }}>
                  Certificación Médica
                </h3>
              </div>

              <div style={{ 
                fontSize: '15px', 
                lineHeight: '1.8',
                color: '#1f2937'
              }}>
                <p style={{ 
                  margin: '0 0 20px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#059669',
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '8px'
                }}>
                  Por medio del presente certifico que:
                </p>

                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  borderLeft: '4px solid #10b981'
                }}>
                  <p style={{ 
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#059669',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    🏥 Estado Físico
                  </p>
                  <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.7', color: '#1f2937' }}>
                    {getHealthStatus(lastAppointment.specialty).physical}
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  borderLeft: '4px solid #10b981'
                }}>
                  <p style={{ 
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#059669',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    🧠 Estado Mental
                  </p>
                  <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.7', color: '#1f2937' }}>
                    {getHealthStatus(lastAppointment.specialty).mental}
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#d1fae5',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '2px solid #10b981',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    margin: '0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#065f46',
                    lineHeight: '1.6'
                  }}>
                    El paciente <strong>{patient.name}</strong> se encuentra en condiciones adecuadas de salud física y mental según la evaluación médica realizada en la fecha indicada.
                  </p>
                </div>
              </div>
            </div>

            {/* Firma médica */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '30px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                borderBottom: '2px solid #1f2937',
                width: '300px',
                margin: '0 auto 15px auto',
                paddingTop: '40px'
              }} />
              <p style={{ 
                margin: '0 0 5px 0',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                {getDoctorName(lastAppointment.specialty)}
              </p>
              <p style={{ 
                margin: '0 0 3px 0',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                {formatSpecialty(lastAppointment.specialty)}
              </p>
              <p style={{ 
                margin: '0',
                fontSize: '13px',
                color: '#9ca3af',
                fontStyle: 'italic'
              }}>
                Matrícula Profesional: {getDoctorLicense(lastAppointment.specialty)}
              </p>
            </div>
          </>
        ) : (
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #fbbf24',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: '#92400e', 
              fontSize: '16px', 
              margin: '0', 
              fontWeight: '600',
              lineHeight: '1.6'
            }}>
              No se encontraron consultas médicas registradas.<br />
              No es posible generar el certificado sin una consulta previa.
            </p>
          </div>
        )}
      </div>

      {/* Pie de página */}
      <div style={{ 
        backgroundColor: '#f9fafb',
        padding: '30px 60px',
        borderTop: '4px solid #10b981',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div>
            <p style={{ 
              fontSize: '13px', 
              color: '#1f2937',
              margin: '0',
              fontWeight: '600'
            }}>
              <strong style={{ color: '#10b981' }}>HIGHSOFT</strong> - Sistema de Gestión Médica
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ 
              fontSize: '11px', 
              color: '#6b7280',
              margin: '0',
              fontStyle: 'italic'
            }}>
              Certificado generado automáticamente
            </p>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '15px'
        }}>
          <p style={{ 
            fontSize: '11px', 
            color: '#9ca3af',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0'
          }}>
            Este documento es un certificado médico oficial generado por el sistema HIGHMED.<br />
            Para verificar su autenticidad, contacte con nuestro centro médico.<br />
            © {new Date().getFullYear()} HIGHMED - Todos los derechos reservados
          </p>
        </div>
      </div>

      {/* Borde decorativo inferior */}
      <div style={{
        height: '20px',
        background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
      }} />

      {/* Marca de agua sutil */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: '120px',
        color: 'rgba(16, 185, 129, 0.03)',
        fontWeight: 'bold',
        pointerEvents: 'none',
        zIndex: '0',
        whiteSpace: 'nowrap',
        letterSpacing: '10px'
      }}>
        HIGHMED
      </div>
    </div>
  );
}

export default MedicalCertificate;
