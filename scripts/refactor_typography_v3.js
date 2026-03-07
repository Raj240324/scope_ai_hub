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

  // 1. Fix malformed replacements from Pass 1
  content = content.replace(/heading-herotext/g, 'heading-hero text');
  // General fix for heading-mdtext etc.
  content = content.replace(/heading-(sm|md|lg|hero)text/g, 'heading-$1 text');

  // 2. Comprehensive Heading cascades (matching text-2xl md:text-3xl lg:text-4xl font-bold etc)
  // Replaced with safer individual standard replacements instead of complex union regex
  
  // Replace responsive cascades
  content = content.replace(/\btext-(?:2|3|4|5|6|7)xl\s+sm:text-(?:2|3|4|5|6|7)xl\s*(?:md:text-(?:2|3|4|5|6|7)xl\s*)?(?:lg:text-(?:2|3|4|5|6|7)xl\s*)?(?:font-(?:bold|extrabold|black))?(?:\s*tracking-tight)?/g, 'heading-hero');
  
  // Replace standalone arbitrary headings mapped by the user
  content = content.replace(/(?<![:-])\btext-(xs)\b(?!\s*\]|-)/g, 'text-caption');
  content = content.replace(/(?<![:-])\btext-(sm)\b(?!\s*\]|-)/g, 'text-small');
  content = content.replace(/(?<![:-])\btext-(base)\b(?!\s*\]|-)/g, 'text-body');
  content = content.replace(/(?<![:-])\btext-(lg)\b(?!\s*\]|-)/g, 'text-body-lg');

  content = content.replace(/(?<![:-])\btext-(xl)\b(?!\s*\]|-)/g, 'heading-sm');
  content = content.replace(/(?<![:-])\btext-(2xl)\b(?!\s*\]|-)/g, 'heading-md');
  content = content.replace(/(?<![:-])\btext-(3xl)\b(?!\s*\]|-)/g, 'heading-lg');
  content = content.replace(/(?<![:-])\btext-(4xl|5xl|6xl|7xl)\b(?!\s*\]|-)/g, 'heading-hero');
  
  // Cleanup duplicate typography classes in case we layered them
  content = content.replace(/heading-hero heading-hero/g, 'heading-hero');
  content = content.replace(/heading-md heading-md/g, 'heading-md');
  content = content.replace(/text-body text-body/g, 'text-body');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated Pass 3: ${file}`);
  }
});
