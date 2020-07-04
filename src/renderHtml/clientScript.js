export const controlScript = (darkModeToggleId, printButtonId, bgColors) => {
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
  
  const toggleDarkMode = () => {
    if(isAnimating) return;
    isDarkMode = !isDarkMode;
    animateColor(isDarkMode);
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
      const blur = ({ target }) => target.blur();
      a.addEventListener('mouseup', blur);
      a.addEventListener('mouseleave', blur);
    });
    darkModeToggle.addEventListener('click', toggleDarkMode);
    darkModeToggle.addEventListener('keydown', event => clickByKeyboard(event, toggleDarkMode));
    printButton.addEventListener('keydown', event => clickByKeyboard(event, event.target.click));
  }
  
  preloadBgColors();
  attachEventListener();
}