import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

function createPackage() {
  const distPath = path.join(__dirname, 'dist');
  const allFiles = getAllFiles(distPath);
  
  const packageContent = allFiles.reduce((acc, filePath) => {
    const relativePath = path.relative(distPath, filePath);
    const content = fs.readFileSync(filePath, 'base64');
    acc[relativePath] = content;
    return acc;
  }, {});

  const packageJson = JSON.stringify(packageContent);
  fs.writeFileSync('extension-package.json', packageJson);
  
  console.log('Extension package created: extension-package.json');
  console.log('You can download this file and use it to load the extension locally or submit to the Chrome Web Store.');
}

createPackage();