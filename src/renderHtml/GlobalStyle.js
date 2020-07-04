/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { mobileOnly, CLASS_NAME_DARK, A4_WIDTH, A4_HEIGHT } from './shared';
import fs from 'fs-extra';
import path from 'path';

const getFontUrl = (fileName, extension, isBase64) => {
  if(!isBase64) {
    return `./${fileName}.${extension}`;
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
      
      @page {
        margin: 69px 45px 63px 45px;
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
          zoom: 1.3;
          overflow: visible;
        }
      }
      
      body {
        width: ${A4_WIDTH}px;
        max-width: 100%;
        min-height: ${A4_HEIGHT}px;
        padding: 69px 45px 63px 45px;
        margin: auto;
        box-sizing: border-box;
        color: #000;
        font-family: Fira Sans, sans-serif;
        font-size: 12px;
        line-height: 1.67;
        transition: padding 0.3s;
        ::-webkit-scrollbar {
            width: 0;
        } 
        
        &.${CLASS_NAME_DARK} {
          color: #fff;
        }
        
        ${mobileOnly(`padding: 69px 20px;`)}
        
        @media print {
          height: 0;
          min-height: 0;
          padding: 0;
          overflow: visible;
        }
      }
      
      section {
        margin-top: 24px;
      }
      
      p {
        display: block;
        margin-top: 5px;
        margin-bottom: 4px;
      }
      
      h1 {
        margin: 0 0 0 -5px;
        line-height: 1.2;
        height: 40px;
        font-size: 3em;
        font-family: Letter Gothic Std;
      }
      
      h2 {
        margin: 0;
        line-height: 1;
        margin: 8px 0;
      }
      
      h3 {
        font-size: 1em;
        font-weight: normal;
        line-height: 1.5;
        margin: 8px 0;
      }
      
      ul {
        margin: 0;
        list-style-type: none;
        padding-inline-start: 1em;
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