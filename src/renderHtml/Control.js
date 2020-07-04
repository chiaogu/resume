/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { v4 as uuid } from 'uuid'
import { createCanvas, createImageData } from 'canvas';
import RgbQuant from 'rgbquant';
import { BREAK_POINT_SM, PDF_FILE_NAME } from './shared';
import { controlScript } from './clientScript';

function generateBackground() {
  const SIZE = 8;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  const imageData = createImageData(SIZE, SIZE);
  const buf32 = new Uint32Array(imageData.data.buffer);
	const rgbQuant = new RgbQuant({
    colors: 2,
    palette: [[0,0,0], [255,255,255]],
    dithKern: 'Atkinson',
  });
  const colors = [];
  for(let i = 0; i <= 255; i += 24){
    ctx.fillStyle = `rgb(${i},${i},${i})`;
    ctx.fillRect(0, 0, SIZE, SIZE);
    rgbQuant.sample(canvas);
    buf32.set(new Uint32Array(rgbQuant.reduce(canvas).buffer));
    ctx.putImageData(imageData, 0, 0);
    colors.push(canvas.toDataURL());
  }
  return colors;
}

const Script = ({ darkModeToggleId, printButtonId }) => {
  const scriptHtml = `(${controlScript.toString()})('${darkModeToggleId}', '${printButtonId}', ${JSON.stringify(generateBackground())});`;
  return <script dangerouslySetInnerHTML={{ __html: scriptHtml }}></script>;
};

const Button = props => (
  <a 
    {...props}
    css={css`
      width: 36px;
      height: 36px;
      margin: 0 0 8px 8px;
      font-size: 1em;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      cursor: pointer;
      
      &:active {
        filter: invert(1);
      }
      
      &.dark > div{
        filter: invert(1);
      }
  `}
  >
    <div css={css`
      width: 18px;
      height: 18px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      background-image: url(${props.icon});
    `}></div>
  </a>
);

const Control = () => {
  const darkModeToggleId = uuid();
  const printButtonId = uuid();
  
  return (
    <>
      <div css={css`
        position: fixed;
        display: flex;
        top: 20px;
        right: 20px;
        flex-direction: column;
        
        @media (max-width: ${BREAK_POINT_SM}px) {
          top: 8px;
          right: 8px;
        }
        
        @media print {
          display: none;
        }
      `}>
        <Button
          id={darkModeToggleId}
          tabIndex="1"
          icon="./icon-dark.svg"
          css={css`
            &.dark > div{
              background-image: url('./icon-light.svg');
            }
          `}
        />
        <Button
          id={printButtonId}
          tabIndex="1"
          href={`./${PDF_FILE_NAME}`}
          download
          icon="./icon-download.svg"
        />
      </div>
      <Script {...{ darkModeToggleId, printButtonId }}/>
    </>
  );
}

export default Control;