import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default function generateCertificate(data, outputPath) {
  try {
    // Input Validations
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Data object is required.');
    }
    if (!data.name || !data.course || !data.date) {
      throw new Error(
        'Missing required fields: name, course, and date are mandatory.'
      );
    }

    // Validate Output Path Directory
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      throw new Error(`Output directory does not exist: ${outputDir}`);
    }

    // Validate Image Paths (if provided)
    if (data.signaturePath && !fs.existsSync(data.signaturePath)) {
      throw new Error(`Signature file not found: ${data.signaturePath}`);
    }
    if (data.stampPath && !fs.existsSync(data.stampPath)) {
      throw new Error(`Stamp file not found: ${data.stampPath}`);
    }

    // Create Document
    const uniqueId = uuidv4();
    const doc = new PDFDocument();

    // Stream the document to the output file
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Add Certificate Content
    doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`This certifies that ${data.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(`Has successfully completed the course: ${data.course}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(`Date: ${data.date}`, { align: 'center' });

    // Add Optional Images
    if (data.signaturePath) {
      doc.image(data.signaturePath, doc.page.width / 2 - 50, doc.y + 20, { width: 100 });
    }
    if (data.stampPath) {
      doc.image(data.stampPath, doc.page.width - 150, doc.y - 50, { width: 100 });
    }

    // Add Certificate ID
    doc.moveDown(3);
    doc.fontSize(10).text(`Certificate ID: ${uniqueId}`, { align: 'center' });

    // Finalize the document
    doc.end();

    // Return a promise for file completion
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(uniqueId));
      writeStream.on('error', (err) => reject(`Error writing PDF: ${err.message}`));
    });
  } catch (error) {
    console.error(`Error generating certificate: ${error.message}`);
    throw error;
  }
}
