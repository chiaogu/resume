/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { mobileOnly } from './shared';

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Fira Sans';
        font-weight: normal;
        src: url('./FiraSans-Regular.ttf');
      }

      @font-face {
        font-family: 'Fira Sans';
        font-weight: bold;
        src: url('./FiraSans-Medium.ttf');
      }
      
      @font-face {
        font-family: 'Letter Gothic Std';
        font-weight: bold;
        src: url('./LetterGothicStd-Bold.otf');
      }
      
      html {
        background-color: #fff;
      }
      
      body {
        width: 794px;
        max-width: 100%;
        min-height: 1122px;
        margin: auto;
        padding: 69px 45px 63px 45px;
        /* border: 1px solid #000; */
        box-sizing: border-box;
        color: #000;
        font-family: Fira Sans, sans-serif;
        font-size: 12px;
        line-height: 1.67;
        transition: padding 0.3s;
        zoom: 1.3;
        ::-webkit-scrollbar {
            width: 0;
        } 
        ${mobileOnly(`padding: 69px 20px;`)}
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
        color: inherit;
        :hover {
          font-weight: bold;
        }
      }
    `}
  />
);

export default GlobalStyle;