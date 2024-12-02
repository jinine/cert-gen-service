import PDFDocument from 'pdfkit';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function generateCertificate(data, outputPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  const uniqueId = uuidv4();

  doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text(`This certifies that ${data.name}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(15).text(`Has successfully completed the course: ${data.course}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(15).text(`Date: ${data.date}`, { align: 'center' });

  if (data.signaturePath) {
    doc.image(data.signaturePath, doc.page.width / 2 - 50, doc.y + 20, { width: 100 });
  }
  if (data.stampPath) {
    doc.image(data.stampPath, doc.page.width - 150, doc.y - 50, { width: 100 });
  }

  doc.moveDown(3);
  doc.fontSize(10).text(`Certificate ID: ${uniqueId}`, { align: 'center' });

  doc.end();

  return uniqueId; // Return the unique ID for reference
};