/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { v4 as uuid } from 'uuid'
import { createCanvas, createImageData } from 'canvas';
import RgbQuant from 'rgbquant';
import { BREAK_POINT_SM } from './shared';
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

const Control = () => {
  const darkModeToggleId = uuid();
  const printButtonId = uuid();
  const buttonStyle = css`
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
  `;
  const scriptHtml = `(${controlScript.toString()})('${darkModeToggleId}', '${printButtonId}', ${JSON.stringify(generateBackground())});`;
  
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
        <a id={darkModeToggleId} css={buttonStyle}>O</a>
        <a id={printButtonId} css={buttonStyle}>X</a>
      </div>
      <script dangerouslySetInnerHTML={{ __html: scriptHtml }}></script>
    </>
  );
}

export default Control;