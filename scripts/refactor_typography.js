import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        filelist = walkSync(filePath, filelist);
      }
    } else if (filePath.endsWith('.jsx')) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Accessibility & Generic Arbitrary classes
  content = content.replace(/text-\[9px\]|text-\[10px\]|text-\[11px\]/g, 'text-caption');
  content = content.replace(/text-\[13px\]|text-\[14px\]/g, 'text-small');
  content = content.replace(/text-\[15px\]|text-\[17px\]/g, 'text-body');
  content = content.replace(/text-\[19px\]|text-\[22px\]/g, 'heading-sm');
  
  // 2. Headings Replacement
  // Replace random Heading combos with system tags where we can safely identify it's a title
  // For legal pages <h2>
  content = content.replace(/text-2xl font-bold text-\[var\(--text-heading\)]/g, 'heading-md');
  // General text-2xl font-bold
  content = content.replace(/text-2xl font-bold/g, 'heading-md');
  // General paragraph styling replacement in legal section etc.
  content = content.replace(/text-\[var\(--text-muted\)] leading-relaxed text-sm|text-\[var\(--text-muted\)] leading-relaxed/g, 'text-body');

  // Hero Headings
  content = content.replace(/text-[34567]xl\s*(?:sm:text-[4567]xl)?\s*(?:md:text-[4567]xl)?\s*(?:lg:text-[4567]xl)?\s*font-[a-z]+\s*tracking-tight/g, 'heading-hero');
  content = content.replace(/text-[34]xl\s*(?:sm:text-[45]xl)?\s*(?:md:text-[56]xl)?\s*(?:lg:text-[67]xl)?\s*font-[a-z]+\s*(?:mb-\d)?/g, 'heading-hero');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
