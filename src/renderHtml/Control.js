/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { v4 as uuid } from 'uuid'
import { createCanvas, createImageData } from 'canvas';
import RgbQuant from 'rgbquant';

const script = (darkModeToggleId, printButtonId, bgColors) => {
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
    
    const shouldInvert = isDarkMode ? (transitionFrame < maxFrame / 2) : (transitionFrame >= maxFrame / 2);
    if(shouldInvert) {
      document.body.style.color = isDarkMode ? '#fff' : '#000';
      darkModeToggle.style.filter = isDarkMode ? 'invert(1)' : 'unset';
      printButton.style.filter = isDarkMode ? 'invert(1)' : 'unset';
    }
    
    const canStop = transitionFrame === (isDarkMode ? 0 : maxFrame);
    if(!canStop) {
      setTimeout(() => requestAnimationFrame(animateColor), 48);
    } else {
      isAnimating = false;
      document.documentElement.style.background = isDarkMode ? '#000' : '#fff';
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
    width: 24px;
    height: 24px;
    margin-left: 8px;
    background: #fff;
    color: #000;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    cursor: pointer;
  `;
  const scriptHtml = `(${script.toString()})('${darkModeToggleId}', '${printButtonId}', ${JSON.stringify(generateBackground())});`;
  
  return (
    <>
      <div css={css`
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
      `}>
        <button id={darkModeToggleId} css={buttonStyle}>O</button>
        <a id={printButtonId} css={buttonStyle}>X</a>
      </div>
      <script dangerouslySetInnerHTML={{ __html: scriptHtml }}></script>
    </>
  );
}

export default Control;