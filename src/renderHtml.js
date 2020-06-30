/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ReactDOMServer from 'react-dom/server';
import { minify } from 'html-minifier';
import fs from 'fs-extra';
import path from 'path';

const fonts = `
  @font-face {
    font-family: 'Fira Sans';
    font-weight: normal;
    src: url('./FiraSans-Regular.ttf');
  }

  @font-face {
    font-family: 'Fira Sans';
    font-weight: bold;
    src: url('./FiraSans-Medium.ttf');
  }
  
  @font-face {
    font-family: 'Letter Gothic Std';
    src: url('./LetterGothicStd-Bold.otf');
  }
`;

const Template = ({ basics: { name, summary } }) => (
  <html>
  <body css={css`
    ${fonts}
    margin: 0;
    font-family: 'Fira Sans', sans-serif;
  `}>
    <h1 css={css`
      margin: 0;
      font-family: 'Letter Gothic Std';
    `}>{name}</h1>
    <div>{summary}</div>
  </body>
  </html>
);

function renderHtml(resume) {
  const result = ReactDOMServer.renderToString(<Template {...resume}/>);
  return minify(result, {
    removeComments: true
  }) 
}

export default async function writeHtml(outputFolder, resume) {
  const assetsFolder = path.join(__dirname, '..', 'assets');
  const files = await fs.readdir(assetsFolder);
  const copyAsset = file => fs.copyFile(path.join(assetsFolder, file), path.join(outputFolder, file));
  await Promise.all(files.map(copyAsset));
  fs.writeFileSync(path.join(outputFolder, 'index.html'), renderHtml(resume));
}