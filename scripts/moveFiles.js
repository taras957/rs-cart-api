const fs = require('fs');
const path = require('path');

const sourceFiles = ['serverless.yml', '.env'];
const distFolder = 'dist';

sourceFiles.forEach(file => {
  const sourcePath = path.join(__dirname, '..', file);
  const distPath = path.join(__dirname, '..', distFolder, file);

  fs.copyFileSync(sourcePath, distPath);
});

console.log('Files copied successfully!');
