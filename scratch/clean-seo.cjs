const fs = require('fs');
const path = require('path');

// Helper to recursively list files
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (!name.includes('node_modules') && !name.includes('.git') && !name.includes('dist')) {
        getFiles(name, fileList);
      }
    } else {
      fileList.push(name);
    }
  }
  return fileList;
}

// 1. Process source files and index.html
const filesToProcess = [
  path.join(__dirname, '../index.html'),
  ...getFiles(path.join(__dirname, '../src'))
];

console.log(`Processing ${filesToProcess.length} files...`);

for (const file of filesToProcess) {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.css')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace "kirana" / "Kirana" in various contexts
    // Handle specifically "kirana stores" / "kirana store"
    content = content.replace(/kirana store/gi, 'retail store');
    content = content.replace(/kirana stores/gi, 'retail stores');
    content = content.replace(/Sharma Kirana/g, 'Sharma Retail');
    content = content.replace(/Raju Kirana/g, 'Raju Retail');
    content = content.replace(/Ramesh Kirana/g, 'Ramesh Retail');
    content = content.replace(/Kirana Shop/g, 'Retail Shop');
    content = content.replace(/Kirana \/ General Store/g, 'Retail / General Store');
    content = content.replace(/Kirana Billing App/g, 'Retail Billing App');
    
    // Catch any leftover "kirana" (case-insensitive)
    content = content.replace(/kirana/gi, 'business');

    // Replace "dukaan" / "Dukaan"
    content = content.replace(/dukaan owners/gi, 'business owners');
    content = content.replace(/dukaan billing/gi, 'retail billing');
    content = content.replace(/dukaan/gi, 'business');

    // Remove Hindi characters from JSON-LD inside index.html
    content = content.replace(/"बी-व्यापारी",\s*/g, '');
    content = content.replace(/"बी-व्यापारी"/g, '"B-Vyapari"');
    
    // Update inLanguage setting
    content = content.replace(/"inLanguage":\s*\["hi",\s*"en"\]/g, '"inLanguage": ["en"]');

    // Translate Hinglish video reviews in ReviewsPage.tsx
    content = content.replace(
      /"Pehle din se hi sab kuch clear tha\. Setup mein 30 minute laga, pehla bill 2 minute mein nikal diya\."/g,
      '"Everything was clear from day one. Setup took 30 minutes, and the first bill was generated in 2 minutes."'
    );
    content = content.replace(
      /"UPI aur cash dono track hote hain ek jagah\. Khata book ki zaroorat hi nahi rahi\. Staff bhi aasaani se use kar lete hain\."/g,
      '"UPI and cash are both tracked in one place. There is no need for a physical ledger (Khata book) anymore. Staff can also use it easily."'
    );

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
}

// 2. Delete legacy HTML files from public directory
const publicDir = path.join(__dirname, '../public');
const htmlFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} legacy HTML files to delete.`);
for (const htmlFile of htmlFiles) {
  const filePath = path.join(publicDir, htmlFile);
  fs.unlinkSync(filePath);
  console.log(`Deleted legacy HTML: ${filePath}`);
}

console.log('SEO & translation cleanup finished successfully!');
