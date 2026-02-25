import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Genera un certificado de medicamento en formato PDF
 * @param {Object} medication - Datos del medicamento
 * @param {Object} user - Datos del usuario/paciente
 */
export const generateMedicationCertificate = (medication, user) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colores institucionales
  const primaryColor = [41, 128, 185]; // Azul
  const secondaryColor = [52, 73, 94]; // Gris oscuro
  const lightGray = [240, 240, 240];
  
  // Encabezado con borde
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Logo (simulado con texto estilizado)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('HIGHMED', pageWidth / 2, 22, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema de Gestión de Salud', pageWidth / 2, 32, { align: 'center' });
  doc.text('Certificación Médica Oficial', pageWidth / 2, 39, { align: 'center' });
  
  // Título del certificado con fondo
  doc.setFillColor(...lightGray);
  doc.rect(15, 52, pageWidth - 30, 15, 'F');
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO DE MEDICAMENTO', pageWidth / 2, 62, { align: 'center' });
  
  // Línea decorativa doble
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(15, 70, pageWidth - 15, 70);
  doc.setLineWidth(0.3);
  doc.line(15, 72, pageWidth - 15, 72);
  
  // Información del paciente
  let yPos = 85;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  
  const addField = (label, value) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text(label + ':', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(String(value), 75, yPos);
    yPos += 9;
  };
  
  // Sección: Datos del Paciente
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('DATOS DEL PACIENTE', 20, yPos);
  yPos += 2;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 90, yPos);
  yPos += 8;
  
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  addField('Nombre Completo', user.name);
  addField('Documento', user.document || user.userId);
  
  yPos += 5;
  
  // Sección: Información del Medicamento
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('INFORMACIÓN DEL MEDICAMENTO', 20, yPos);
  yPos += 2;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 120, yPos);
  yPos += 8;
  
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  addField('Medicamento', medication.name);
  addField('Categoría', medication.category);
  addField('Dosificación', medication.dosage);
  addField('Médico Prescriptor', medication.doctor);
  addField('Fecha de Receta', medication.prescribedDate);
  addField('Estado', getStatusText(medication.status));
  
  yPos += 5;
  
  // Fecha de generación
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  addField('Fecha de Generación', currentDate);
  
  yPos += 10;
  
  // Espacio para firma
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.3);
  doc.line(20, yPos + 20, 90, yPos + 20);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Firma del Médico Responsable', 55, yPos + 26, { align: 'center' });
  
  // Sello institucional (simulado)
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.circle(pageWidth - 40, yPos + 10, 15, 'S');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('SELLO', pageWidth - 40, yPos + 8, { align: 'center' });
  doc.text('OFICIAL', pageWidth - 40, yPos + 13, { align: 'center' });
  
  // Nota legal
  yPos += 45;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  const legalText = 'Este certificado es un documento informativo generado automáticamente por el sistema HIGHMED. ' +
                    'Para cualquier consulta médica, contacte con su profesional de salud. ' +
                    'Documento válido sin firma y sello según normativa vigente.';
  const splitText = doc.splitTextToSize(legalText, pageWidth - 40);
  doc.text(splitText, 20, yPos);
  
  // Pie de página
  doc.setFillColor(...primaryColor);
  doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('HIGHMED - Sistema de Gestión de Salud', pageWidth / 2, pageHeight - 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('www.highmed.com | soporte@highmed.com | Tel: +34 900 123 456', pageWidth / 2, pageHeight - 10, { align: 'center' });
  doc.text('Certificado generado electrónicamente', pageWidth / 2, pageHeight - 5, { align: 'center' });
  
  // Guardar el PDF
  const fileName = `Certificado_${medication.name.replace(/\s+/g, '_')}_${user.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};

/**
 * Convierte el código de estado a texto legible
 */
const getStatusText = (status) => {
  const statusTexts = {
    'disponible': 'DISPONIBLE',
    'recetado': 'RECETADO',
    'asignado': 'ASIGNADO',
    'reclamado': 'RECLAMADO'
  };
  return statusTexts[status] || status.toUpperCase();
};
