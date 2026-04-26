const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const srcDir = path.join(__dirname, 'src');

walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  if (filePath.endsWith('Quote.tsx')) return; // Do not touch Quote.tsx

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Remove type: "spring" and related props, add smooth easing
  content = content.replace(/type:\s*['"]spring['"]\s*,\s*(?:damping:\s*\d+\s*,\s*stiffness:\s*\d+\s*,?|stiffness:\s*\d+\s*,\s*damping:\s*\d+\s*,?)/g, 'ease: [0.22, 1, 0.36, 1], duration: 0.8');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Removed spring from:', filePath);
  }
});
