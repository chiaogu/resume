import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { minify } from 'html-minifier';
import fs from 'fs-extra';
import path from 'path';
import puppeteer from 'puppeteer';
import Html from './Html';
import { A4_WIDTH, A4_HEIGHT, PDF_FILE_NAME } from './shared';

function renderHtml(resume, config) {
  const result = ReactDOMServer.renderToString(<Html {...{ config, resume }}/>);
  return minify(result, {
    removeComments: true
  }) 
}

async function copyAssets(outputFolder) {
  const assetsFolder = path.join(__dirname, '..', '..', 'assets');
  const files = await fs.readdir(assetsFolder);
  const copyAsset = file => fs.copyFile(path.join(assetsFolder, file), path.join(outputFolder, file));
  await Promise.all(files.map(copyAsset));
}

async function writeHtml(outputFolder, html) {
  await fs.writeFile(path.join(outputFolder, 'index.html'), html);
}

async function printPDF(outputFolder, html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' })
  await page.pdf({
    path: path.join(outputFolder, PDF_FILE_NAME),
    format: 'A4',
    width: A4_WIDTH,
    height: A4_HEIGHT
  });
  await browser.close();
}

export default async function exportHtml(outputFolder, resume) {
  await copyAssets(outputFolder);
  await writeHtml(outputFolder, renderHtml(resume, { isInlineFont: false }));
  await printPDF(outputFolder, renderHtml(resume, { isInlineFont: true }));
}
