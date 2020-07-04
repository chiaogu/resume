/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import dateFormat from 'dateformat';

export const A4_WIDTH = 794;
export const A4_HEIGHT = 1122;
export const CLASS_NAME_DARK = 'dark';
export const BREAK_POINT_SM = 576;
export const formatDate = date => date ? dateFormat(new Date(date), 'mmm yyyy') : 'Present';
export const mobileOnly = style => `@media screen and (max-width: ${BREAK_POINT_SM}px) { ${style} }`;

export const Link = ({ children, url }) => url ? <a href={url} target="_blank">{children}</a> : children;

export const DotOrWrap = () => (
  <>
    <span css={css`
        ${mobileOnly(`display: none;`)}
    `}>・</span>
    <br css={css`
        display: none;
        ${mobileOnly(`display: block;`)}
    `}/>
  </>
);