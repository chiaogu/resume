import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { minify } from 'html-minifier';
import fs from 'fs-extra';
import path from 'path';
import Html from './Html';

function renderHtml(resume) {
  const result = ReactDOMServer.renderToString(<Html {...resume}/>);
  return minify(result, {
    removeComments: true
  }) 
}

export default async function writeHtml(outputFolder, resume) {
  const assetsFolder = path.join(__dirname, '..', '..', 'assets');
  const files = await fs.readdir(assetsFolder);
  const copyAsset = file => fs.copyFile(path.join(assetsFolder, file), path.join(outputFolder, file));
  await Promise.all(files.map(copyAsset));
  fs.writeFileSync(path.join(outputFolder, 'index.html'), renderHtml(resume));
}