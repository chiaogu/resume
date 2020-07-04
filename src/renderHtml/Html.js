import React from 'react';
import GlobalStyle from './GlobalStyle';
import Content from './Content';
import Control from './Control';

const Head = ({ resume: { basics: { name, summary, label } }, config: { isInlineFont }}) => {
  const summarySentances = summary.split('. ');
  const description = `${label}・${summarySentances[summarySentances.length - 1]}`;
  return (
    <head>
      <title>{name}</title>
      <meta name="description" content={description}/>
      <meta property="og:title" content={name}/>
      <meta property="og:description" content={description}/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <GlobalStyle isInlineFont={isInlineFont}/>
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