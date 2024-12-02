import generateCertificate from './utils/generateCert.js';

const data = {
  name: 'John Doe',
  course: 'JavaScript Basics',
  date: 'December 2, 2024'
};

generateCertificate(data, 'public/certificate.pdf');