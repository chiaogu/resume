import React from 'react';
import GlobalStyle from './GlobalStyle';
import Content from './Content';
import Control from './Control';
import Tracking from './Tracking';

const Head = ({ resume: { basics: { name, summary } }, config: { isInlineFont }}) => {
  return (
    <head>
      <title>{name}</title>
      <meta name="description" content={summary}/>
      <meta property="og:title" content={name}/>
      <meta property="og:description" content={summary}/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <GlobalStyle isInlineFont={isInlineFont}/>
      <Tracking/>
    </head>
  )
};

const Html = ({ resume, config }) => (
  <html>
    <Head {...{ resume, config }}/>
    <body>
      <Content {...resume}/>
      <Control/>
    </body>
  </html>
);

export default Html;