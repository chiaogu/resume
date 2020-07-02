import React from 'react';
import GlobalStyle from './GlobalStyle';
import Content from './Content';
import Control from './Control';

const Html = resume => (
  <html>
  <head>
    <GlobalStyle/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
  </head>
  <body>
    <Content {...resume}/>
    <Control/>
  </body>
  </html>
);

export default Html;