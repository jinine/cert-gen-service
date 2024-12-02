import PDFDocument from 'pdfkit';
import fs from 'fs';

function generateCertificate(data, outputPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  // Add certificate content
  doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text(`This certifies that ${data.name}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(15).text(`Has successfully completed the course: ${data.course}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(15).text(`Date: ${data.date}`, { align: 'center' });

  doc.end();
}

export default generateCertificate;