/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { v4 as uuid } from 'uuid'
import { BREAK_POINT_SM, PDF_FILE_NAME } from './shared';
import ControlScript from './ControlScript';

const Button = props => (
  <a 
    {...props}
    css={css`
      width: 48px;
      height: 48px;
      margin: 0 0 12px 12px;
      font-size: 1em;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 24px;
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
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      background-image: url(${props.icon});
      pointer-events: none;
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
        bottom: 24px;
        right: 24px;
        flex-direction: column;
        
        @media (max-width: ${BREAK_POINT_SM}px) {
          bottom: 12px;
          right: 12px;
        }
        
        @media print {
          display: none;
        }
      `}>
        <Button
          id={darkModeToggleId}
          tabIndex="1"
          icon="./assets/icon-dark.svg"
          css={css`
            &.dark > div{
              background-image: url('./assets/icon-light.svg');
            }
          `}
        />
        <Button
          id={printButtonId}
          tabIndex="1"
          href={`./${PDF_FILE_NAME}`}
          download
          icon="./assets/icon-download.svg"
        />
      </div>
      <ControlScript {...{ darkModeToggleId, printButtonId }}/>
    </>
  );
}

export default Control;