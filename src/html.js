/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ReactDOMServer from 'react-dom/server';
import { minify } from 'html-minifier';

const Template = ({ basics: { name, summary } }) => (
  <html>
  <body css={css`
    margin: 0;
  `}>
    <h1 css={css`
      margin: 0;
    `}>{name}</h1>
    <div>{summary}</div>
  </body>
  </html>
);

export default function render(resume) {
  const result = ReactDOMServer.renderToString(<Template {...resume}/>);
  return minify(result, {
    removeComments: true
  }) 
}