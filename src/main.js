import fs from 'fs-extra';
import path from 'path';
import renderHtml from './renderHtml';
import renderMarkdown from './renderMarkdown';
import resume from './resume.json';

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const RENDERED_MSG = 'Rendered successfully';

(async () => {
  console.time(RENDERED_MSG);
  await fs.remove(OUTPUT_DIR);
  await fs.mkdir(OUTPUT_DIR);
  await renderHtml(OUTPUT_DIR, resume);
  await renderMarkdown(OUTPUT_DIR, resume);
  console.timeEnd(RENDERED_MSG);
})();