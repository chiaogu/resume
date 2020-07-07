import React from 'react';
import { createCanvas, createImageData } from 'canvas';
import RgbQuant from 'rgbquant';
import { RunOnClient, BG_TILE_SIZE } from './shared';

const script = (darkModeToggleId, printButtonId, bgColors) => {
  const CLASS_NAME_DARK = 'dark';
  const FAVICON_ID = 'favicon';
  
  const darkModeToggle = document.getElementById(darkModeToggleId);
  const printButton = document.getElementById(printButtonId);
  let isAnimating = false;
  let isDarkMode = false;
  const maxFrame = bgColors.length - 1;
  let transitionFrame = maxFrame;

  const preloadBackground = () => {
    bgColors.forEach(img => new Image().src = img);
  }
  
  const appendFavicon = () => {
    const imageData = bgColors[2 + Math.floor(Math.random() * (bgColors.length - 3))];
    const link = document.createElement('link');
    link.id = FAVICON_ID;
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = imageData;
    document.head.appendChild(link);
  }
  
  const animateColor = () => {
    isAnimating = true;
    transitionFrame += (isDarkMode ? -1 : 1);
    transitionFrame = Math.max(Math.min(transitionFrame, maxFrame), 0)
    document.documentElement.style.backgroundImage = `url(${bgColors[transitionFrame]})`;
    document.querySelectorAll('a').forEach(a => a.style.backgroundImage = `url(${bgColors[transitionFrame]})`);
    document.getElementById(FAVICON_ID).href = bgColors[transitionFrame];
    
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
  
  const toggleDarkMode = () => {
    if(isAnimating) return;
    isDarkMode = !isDarkMode;
    animateColor(isDarkMode);
    gtag('set', { 'dark_mode': isDarkMode });
    gtag('event', isDarkMode ? 'enable' : 'disable', {
      'event_category': 'set_dark_mode',
    });
  }
  
  const clickByKeyboard = (event, callback) => {
    const { code } = event;
    if (code === 'Space' || code === 'Enter') {
      event.preventDefault();
      callback();
    }
  };
  
  const attachEventListener = () => {
    document.querySelectorAll('a').forEach(a => {
      const blur = ({ target }) => {
        target.blur();
        target.classList.remove('hover');
      };
      a.addEventListener('mouseup', blur);
      a.addEventListener('mouseleave', blur);
      a.addEventListener('touchend', blur);
      a.addEventListener('touchcancel', blur);
      a.addEventListener('touchstart', ({ target }) => target.classList.add('hover'));
      a.addEventListener('click', ({ target }) => {
        if(!target.href) return;
        gtag('event', target.href, {
          'event_category': 'click_link',
        });
      });
    });
    darkModeToggle.addEventListener('click', toggleDarkMode);
    darkModeToggle.addEventListener('keydown', event => clickByKeyboard(event, toggleDarkMode));
    printButton.addEventListener('keydown', event => clickByKeyboard(event, event.target.click));
  }
  
  appendFavicon();
  preloadBackground();
  attachEventListener();
}

function generateBackground() {
  const canvas = createCanvas(BG_TILE_SIZE, BG_TILE_SIZE);
  const ctx = canvas.getContext('2d');
  const imageData = createImageData(BG_TILE_SIZE, BG_TILE_SIZE);
  const buf32 = new Uint32Array(imageData.data.buffer);
	const rgbQuant = new RgbQuant({
    colors: 2,
    palette: [[0,0,0], [255,255,255]],
    dithKern: 'Atkinson',
  });
  const colors = [];
  for(let i = 0; i <= 255; i += 24){
    ctx.fillStyle = `rgb(${i},${i},${i})`;
    ctx.fillRect(0, 0, BG_TILE_SIZE, BG_TILE_SIZE);
    rgbQuant.sample(canvas);
    buf32.set(new Uint32Array(rgbQuant.reduce(canvas).buffer));
    ctx.putImageData(imageData, 0, 0);
    colors.push(canvas.toDataURL());
  }
  return colors;
}

export default function ControlScript({ darkModeToggleId, printButtonId }) {
  return <RunOnClient func={script} args={[darkModeToggleId, printButtonId, generateBackground()]}/>;
};