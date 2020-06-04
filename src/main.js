import fs from 'fs-extra';
import path from 'path';
import renderHtml from './html';
import resume from './resume.json';

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
fs.removeSync(OUTPUT_DIR);
fs.mkdirSync(OUTPUT_DIR);
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), renderHtml(resume));