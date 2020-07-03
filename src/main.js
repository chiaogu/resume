import fs from 'fs-extra';
import path from 'path';
import renderHtml from './renderHtml';
import renderMarkdown from './renderMarkdown';
import resume from './resume.json';

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
fs.removeSync(OUTPUT_DIR);
fs.mkdirSync(OUTPUT_DIR);
renderHtml(OUTPUT_DIR, resume);
renderMarkdown(OUTPUT_DIR, resume);