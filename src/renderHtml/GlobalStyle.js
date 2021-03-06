/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { mobileOnly, CLASS_NAME_DARK, A4_WIDTH, A4_HEIGHT } from './shared';
import fs from 'fs-extra';
import path from 'path';

const getFontUrl = (fileName, extension, isBase64) => {
  if(!isBase64) {
    return `./assets/${fileName}.${extension}`;
  } else {
    const fontFile = path.join(__dirname, '..', '..', 'assets', `${fileName}.${extension}`);
    const fontData = fs.readFileSync(fontFile).toString('base64');
    return `data:application/x-font-${extension};charset=utf-8;base64,${fontData}`
  }
}

const GlobalStyle = ({ isInlineFont }) => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Fira Sans';
        font-weight: normal;
        src: url(${getFontUrl('FiraSans-Regular', 'ttf', isInlineFont)});
      }

      @font-face {
        font-family: 'Fira Sans';
        font-weight: bold;
        src: url(${getFontUrl('FiraSans-Medium', 'ttf', isInlineFont)});
      }
      
      @font-face {
        font-family: 'Letter Gothic Std';
        font-weight: bold;
        src: url(${getFontUrl('LetterGothicStd-Bold', 'otf', isInlineFont)});
      }
      
      html {
        background-color: #fff;
        
        * ::selection {
          color: rgba(255,255,255,.99);
          background-color: rgba(0,0,0,.99);
        }
        
        &.${CLASS_NAME_DARK} {
          background-color: #000;
          
          * ::selection {
            color: rgba(0,0,0,.99);
            background-color: rgba(255,255,255,.99);
          }
        }
        
        @media screen {
          overflow: visible;
        }
      }
      
      @page {
        margin: 63px 45px;
      }
      
      body {
        width: 1024px;
        max-width: 100%;
        min-height: ${A4_HEIGHT}px;
        padding: 82px 44px;
        margin: auto;
        box-sizing: border-box;
        color: #000;
        font-size: 15.6px;
        font-family: Fira Sans, sans-serif;
        line-height: 1.67;
        transition: padding 0.3s;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%; 
        ::-webkit-scrollbar {
            width: 0;
        } 
        
        &.${CLASS_NAME_DARK} {
          color: #fff;
        }
        
        ${mobileOnly(`padding: 63px 24px 147px 24px;`)}
        
        @media print {
          width: ${A4_WIDTH}px;
          font-size: 12px;
          height: 0;
          min-height: 0;
          padding: 0;
          overflow: visible;
        }
      }
      
      section {
        margin-top: 32px;
        @media print {
          margin-top: 24px;
        }
      }
      
      p {
        display: block;
        margin-top: 5px;
        margin-bottom: 4px;
      }
      
      h1 {
        margin: 4px 0 8.5px -5px;
        line-height: 1;
        font-size: 3em;
        font-family: Letter Gothic Std, monospace;
      }
      
      h2 {
        margin: 10px 0;
        line-height: 1;
        -webkit-font-smoothing: subpixel-antialiased;
        @media print {
          margin: 8px 0;
        }
      }
      
      h3 {
        margin: 10px 0;
        font-size: 1em;
        font-weight: normal;
        line-height: 1.5;
        -webkit-font-smoothing: subpixel-antialiased;
        @media print {
          margin: 8px 0;
        }
      }
      
      ul {
        margin: 0;
        list-style-type: none;
        padding-left: 1em;
      }
      
      li {
        position: relative;
        &::before {
          content: '・';
          position: absolute;
          left: -1em;
          top: 0;
        }
      }
      
      a {
        color: #000;
        background-color: #fff;
        outline: none;
        border: none;
        box-shadow: none;
        -webkit-tap-highlight-color: transparent;
        
        &.${CLASS_NAME_DARK} {
          color: #fff;
          background-color: #000;
        }
        
        &.hover {
          filter: invert(1);
        }
          
        @media (hover: hover) {
          :hover,
          :focus {
            outline: none;
            filter: invert(1);
          }
        }
      }
    `}
  />
);

export default GlobalStyle;