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
  content = content.replace(/heading-[a-z]+text/g, (match) => match.replace('text', ' text'));

  // 2. Comprehensive Heading cascades (matching text-2xl md:text-3xl lg:text-4xl font-bold etc)
  const heroRegex = /(?:text-[234567]xl\s*|sm:text-[34567]xl\s*|md:text-[4567]xl\s*|lg:text-[567]xl\s*){3,}font-(?:bold|extrabold|black)(?:\s*tracking-tight)?/g;
  content = content.replace(heroRegex, 'heading-hero');

  const lgRegex = /(?:text-[234]xl\s*|sm:text-[345]xl\s*|md:text-[3456]xl\s*|lg:text-[456]xl\s*){2,}font-(?:bold|semibold|extrabold)/g;
  content = content.replace(lgRegex, 'heading-lg');

  const mdRegex = /(?:text-[xl|2xl]\s*|sm:text-[2xl|3xl]\s*|md:text-[3xl|4xl]\s*|lg:text-[4xl|5xl]\s*){2,}font-(?:semibold|bold|extrabold)/g;
  content = content.replace(mdRegex, 'heading-md');

  // Strip remaining standalone font sizes that are inside classNames where possible
  // Using negative lookbehind to avoid matching sm:text-sm or text-small
  content = content.replace(/(?<![:a-zA-Z0-9-])text-xs\b(?!-)/g, 'text-caption');
  content = content.replace(/(?<![:a-zA-Z0-9-])text-sm\b(?!-)/g, 'text-small');
  content = content.replace(/(?<![:a-zA-Z0-9-])text-base\b(?!-)/g, 'text-body');
  content = content.replace(/(?<![:a-zA-Z0-9-])text-lg\b(?!-)/g, 'text-body-lg');

  // Strip arbitrary headings
  content = content.replace(/(?<![:a-zA-Z0-9-])text-xl\b(?!-)/g, 'heading-sm');
  content = content.replace(/(?<![:a-zA-Z0-9-])text-2xl\b(?!-)/g, 'heading-md');
  content = content.replace(/(?<![:a-zA-Z0-9-])text-3xl\b(?!-)/g, 'heading-lg');
  content = content.replace(/(?<![:a-zA-Z0-9-])text-[4567]xl\b(?!-)/g, 'heading-hero');
  
  // Cleanup duplicate typography classes in case we layered them
  content = content.replace(/heading-hero heading-hero/g, 'heading-hero');
  content = content.replace(/heading-herotext-[var\(--text-heading\)]/g, 'heading-hero text-[var(--text-heading)]');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated Pass 2: ${file}`);
  }
});
