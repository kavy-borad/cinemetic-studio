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

  // Replace text-[#C6A15B] with text-primary
  content = content.replace(/text-\[#C6A15B\]/g, 'text-primary');
  content = content.replace(/bg-\[#C6A15B\]/g, 'bg-primary');
  content = content.replace(/border-\[#C6A15B\]/g, 'border-primary');
  content = content.replace(/from-\[#C6A15B\]/g, 'from-primary');
  content = content.replace(/to-\[#C6A15B\]/g, 'to-primary');
  content = content.replace(/via-\[#C6A15B\]/g, 'via-primary');
  
  // Replace with opacity: text-[#C6A15B]/50 -> text-primary/50
  content = content.replace(/text-\[#C6A15B\]\/(\d+)/g, 'text-primary/$1');
  content = content.replace(/bg-\[#C6A15B\]\/(\d+)/g, 'bg-primary/$1');
  content = content.replace(/border-\[#C6A15B\]\/(\d+)/g, 'border-primary/$1');

  // Replace shadow-[0_0_20px_rgba(198,161,91,0.2)] with shadow-[0_0_20px_hsl(var(--primary)_/_0.2)]
  // or shadow-primary/20
  content = content.replace(/rgba\(198,161,91,([0-9.]+)\)/g, 'hsl(var(--primary) / $1)');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
});
