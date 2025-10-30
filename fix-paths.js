import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

function fixPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Convertir rutas absolutas a relativas
  content = content.replace(/href="\//g, 'href="./');
  content = content.replace(/src="\//g, 'src="./');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in: ${filePath}`);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      fixPaths(filePath);
    }
  });
}

processDirectory(distDir);
console.log('✓ All paths fixed!');
