/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { v4 as uuid } from 'uuid'

const script = (darkModeToggleId, printButtonId) => {
  let isDarkMode = false;
  const darkModeToggle = document.getElementById(darkModeToggleId);
  const printButton = document.getElementById(printButtonId);
  darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.background = isDarkMode ? '#000' : '#fff';
    document.body.style.color = isDarkMode ? '#fff' : '#000';
    darkModeToggle.style.filter = isDarkMode ? 'invert(1)' : 'unset';
    printButton.style.filter = isDarkMode ? 'invert(1)' : 'unset';
  });
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
      <script 
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})('${darkModeToggleId}', '${printButtonId}');` }}
      ></script>
    </>
  );
}

export default Control;