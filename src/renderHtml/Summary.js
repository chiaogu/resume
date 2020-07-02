/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { 
  DotOrWrap,
  mobileOnly,
  Link
} from './shared';

const Summary = ({ summary, email, profiles, location: { city, region } }) => (
  <section css={css`margin-top: 8px;`}>
    {city} {region}
    <DotOrWrap/>
    <a href={`mailto:${email}`}>{email}</a>
    {profiles.map(({ url }) => (
      <React.Fragment key={url}>
        <DotOrWrap/>
        <Link url={url}>{url.replace(/https:\/\//, '')}</Link>
      </React.Fragment>
    ))}
    <p css={css`
      ${mobileOnly(`margin-top: 24px;`)}
    `}>{summary}</p>
  </section>
);

export default Summary;