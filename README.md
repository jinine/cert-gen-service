# Cert-Gen-Service

Cert-Gen-Service is a Node.js package designed to streamline the process of generating certificates in PDF format. This service allows developers to easily integrate certificate creation into their applications by providing an automated way to generate certificates with custom data.

## Features

- Generate PDF certificates with customizable data.
- Easy to integrate into existing Node.js applications.
- Utilizes [pdfkit](http://pdfkit.org/) for generating PDFs.
- Flexible and simple API for developers.

## Installation

To install the necessary dependencies for the Cert-Gen-Service, run the following command in your project directory:

```bash
npm install
```

## Usage

### 1. Import the Module
Import the `generateCertificate` function from the `generateCert.js` file.

```javascript
import generateCertificate from './utils/generateCert.js';
```

### 2. Prepare Data
Create an object with the data you want to include in the certificate.

```javascript
const data = {
    name: 'John Doe',
    course: 'JavaScript Basics',
    date: 'December 2, 2024',
    signaturePath: './public/signatures/signature.png',
    stampPath: './public/stamps/example.png'
};
```

### 3. Generate Certificate
Call the `generateCertificate` function, passing the data object and the output path for the PDF certificate.

```javascript
generateCertificate(data, 'public/certificate.pdf');
```

## Example

Here’s a complete example showing how to use the `generateCertificate` function:

```javascript
import generateCertificate from './utils/generateCert.js';

const data = {
    name: 'John Doe',
    course: 'JavaScript Basics',
    date: 'December 2, 2024'
    signaturePath: './public/signatures/signature.png',
    stampPath: './public/stamps/example.png'
};

generateCertificate(data, 'public/certificate.pdf');
```

## Project Structure

```plaintext
pdf-cert/
├── lib/
│   └── generateCert.js
├── main.js
├── package.json
```

## Dependencies

The project relies on the following dependencies:
- [pdfkit](http://pdfkit.org/) - for generating PDF certificates.

## License

This project is licensed under the ISC License.

## Author

- **Tristan Engen**

For more information or issues, please refer to the project's repository.