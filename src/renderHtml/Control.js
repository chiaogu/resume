/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { v4 as uuid } from 'uuid'
import { createCanvas, createImageData } from 'canvas';
import RgbQuant from 'rgbquant';
import { BREAK_POINT_SM } from './shared';

const script = (darkModeToggleId, printButtonId, bgColors) => {
  const CLASS_NAME_DARK = 'dark';
  const darkModeToggle = document.getElementById(darkModeToggleId);
  const printButton = document.getElementById(printButtonId);
  let isAnimating = false;
  let isDarkMode = false;
  const maxFrame = bgColors.length - 1;
  let transitionFrame = maxFrame;
  
  const preloadBgColors = () => {
    bgColors.forEach(img => new Image().src = img);
  }
  
  const animateColor = () => {
    isAnimating = true;
    transitionFrame += (isDarkMode ? -1 : 1);
    transitionFrame = Math.max(Math.min(transitionFrame, maxFrame), 0)
    document.documentElement.style.backgroundImage = `url(${bgColors[transitionFrame]})`;
    document.querySelectorAll('a').forEach(a => a.style.backgroundImage = `url(${bgColors[transitionFrame]})`);
    
    const shouldInvert = isDarkMode ? (transitionFrame < maxFrame / 2) : (transitionFrame >= maxFrame / 2);
    if(shouldInvert) {
      document.body.classList[isDarkMode ? 'add' : 'remove'](CLASS_NAME_DARK);
      document.querySelectorAll('a').forEach(a => a.classList[isDarkMode ? 'add' : 'remove'](CLASS_NAME_DARK));
    }
    
    const canStop = transitionFrame === (isDarkMode ? 0 : maxFrame);
    if(!canStop) {
      setTimeout(() => requestAnimationFrame(animateColor), 48);
    } else {
      isAnimating = false;
      document.documentElement.classList[isDarkMode ? 'add' : 'remove'](CLASS_NAME_DARK);
    }
  };
  
  preloadBgColors();
  darkModeToggle.addEventListener('click', () => {
    if(isAnimating) return;
    isDarkMode = !isDarkMode;
    animateColor(isDarkMode);
  });
}

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
    margin: 8px 0 0 8px;
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
  const scriptHtml = `(${script.toString()})('${darkModeToggleId}', '${printButtonId}', ${JSON.stringify(generateBackground())});`;
  
  return (
    <>
      <div css={css`
        position: fixed;
        display: flex;
        top: 20px;
        right: 20px;
        
        @media (max-width: ${BREAK_POINT_SM}px) {
          top: 8px;
          right: 8px;
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