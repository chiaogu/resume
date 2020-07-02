/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import dateFormat from 'dateformat';

export const BREAK_POINT_SM = 576;
export const formatDate = date => date ? dateFormat(new Date(date), 'mmm yyyy') : 'Present';
export const mobileOnly = style => `@media screen and (max-width: ${BREAK_POINT_SM}px) { ${style} }`;
export const desktopOnly = style => `@media screen and (min-width: ${BREAK_POINT_SM + 1}px) { ${style} }`;

export const Link = ({ children, url }) => url ? <a href={url} target="_blank">{children}</a> : children;

export const DotOrWrap = () => (
  <>
    <span css={css`
        ${mobileOnly(`display: none;`)}
    `}>・</span>
    <br css={css`
        ${desktopOnly(`display: none;`)}
    `}/>
  </>
);

export const Flex = ({ children }) => (
  <div css={css`
    display: flex;
    ${desktopOnly(`margin: 0 -13px;`)}
    ${mobileOnly(`flex-direction: column;`)}
  `}>
    {React.Children.map(children, child => (
      <div css={css`
        ${desktopOnly(`
          margin: 0 13px;
          flex: 1 1 50%;
        `)}
      `}>{child}</div>
    ))}
  </div>
)