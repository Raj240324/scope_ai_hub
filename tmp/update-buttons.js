const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.jsx');
let filesChanged = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Track if we need to add framer-motion import
  let needsFramerMotion = false;
  let hasMotionLink = false;

  // 1. Replace <button ... className="...btn-..." ...>
  // We use a regex that matches <button followed by anything up to className that contains our target classes
  const buttonRegex = /<button([\s\S]*?)className=["']([^"']*\b(btn-primary|btn-secondary|glass-button)\b[^"']*)["']([\s\S]*?)>/g;
  content = content.replace(buttonRegex, (match, beforeClass, classAttr, targetClass, afterClass) => {
    needsFramerMotion = true;
    return `<m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}${beforeClass}className="${classAttr}"${afterClass}>`;
  });

  // Since we replaced <button with <m.button for matching ones, how do we close them?
  // It's dangerous to replace all </button> if we didn't replace all <button>.
  // But usually, all buttons in a file either get replaced or we replace all </button> to </m.button> safely ONLY if they match.
  // Actually, let's just use CSS for this. It's too risky with regex. 
  // Let's implement this regex logic properly:
}
