const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('extension-package.json', 'utf8'));

for (const [filePath, content] of Object.entries(packageJson)) {
  const fullPath = path.join(__dirname, 'unpacked', filePath);
  const dirName = path.dirname(fullPath);
  
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, Buffer.from(content, 'base64'));
}

console.log('Extension unpacked successfully!');