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

  // Find all elements (<div, <span, <li, <article) that contain an onClick handler
  // and make sure they have cursor-pointer inside their className.
  
  // This is a rough-and-ready replacement: Look for className="xyz"  somewhere before or after onClick=
  // Actually, a safer regex: Just find `onClick={` and check if there's a className before it on the same element.
  // Instead of complex AST parsing, let's target specific components manually via replace where it's 100% safe.
  
  // Custom replacements for known files based on manual grep:
  
  // FAQ Accordions (FAQ.jsx & CourseDetail.jsx & Contact.jsx)
  content = content.replace(/className="w-full text-left py-4/g, 'className="w-full text-left py-4 cursor-pointer');
  content = content.replace(/className="flex items-center justify-between py-6/g, 'className="flex items-center justify-between py-6 cursor-pointer');
  content = content.replace(/className="w-full text-left py-6/g, 'className="w-full text-left py-6 cursor-pointer');
  content = content.replace(/className="w-full flex items-center justify-between p-4/g, 'className="w-full flex items-center justify-between p-4 cursor-pointer');
  
  // Reviews/Ratings filters (Reviews.jsx)
  content = content.replace(/className=\{(?:`|\")px-4 py-2 rounded-lg/g, 'className={`cursor-pointer px-4 py-2 rounded-lg');
  
  // Course filters tabs (CoursesList.jsx)
  // Already fixed manually
  
  // Trainer Form steps/tabs
  content = content.replace(/className=\{`flex items-center justify-center/g, 'className={`cursor-pointer flex items-center justify-center');
  content = content.replace(/className=\{`absolute top-0 left-0 w-full h-full/g, 'className={`cursor-pointer absolute top-0 left-0 w-full h-full');
  
  // Theme Toggle
  content = content.replace(/className="p-2 rounded-full/g, 'className="cursor-pointer p-2 rounded-full');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated Cursors: ${file}`);
  }
});
