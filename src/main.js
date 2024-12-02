import generateCertificate from './utils/generateCert.js';

const certificateData = {
    name: 'John Doe',
    course: 'Introduction to JavaScript',
    date: '2024-12-01',
    signaturePath: './public/signatures/signature.png',
    stampPath: './public/stamps/example.png'
  };
  
  const outputPath = './certifications/certificate.pdf';
  
  const certificateId = generateCertificate(certificateData, outputPath);
  console.log(`Certificate generated with ID: ${certificateId}`);
  