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
  let transitionFrame = bgColors.length - 1;
  
  const preloadBgColors = () => {
    bgColors.forEach(img => new Image().src = img);
  }
  
  const animateColor = () => {
    isAnimating = true;
    transitionFrame += (isDarkMode ? -1 : 1);
    if(!bgColors[transitionFrame]) console.log(transitionFrame, bgColors.length)
    document.documentElement.style.backgroundImage = `url(${bgColors[transitionFrame]})`;
    transitionFrame = Math.max(Math.min(transitionFrame, bgColors.length - 1), 0)
    const canStop = transitionFrame === (isDarkMode ? 0 : bgColors.length - 1);
    if(!canStop) {
      setTimeout(() => requestAnimationFrame(animateColor), 48);
    } else {
      isAnimating = false;
      document.body.style.color = isDarkMode ? '#fff' : '#000';
      darkModeToggle.style.filter = isDarkMode ? 'invert(1)' : 'unset';
      printButton.style.filter = isDarkMode ? 'invert(1)' : 'unset';
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