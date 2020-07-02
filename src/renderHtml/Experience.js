/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { 
  Link,
  DotOrWrap,
  formatDate
} from './shared';

const Experience = ({ work }) => (
  <section>
    <h2>Experience</h2>
    {work.map(({ company, position, website, startDate, endDate, highlights }) => (
      <React.Fragment key={company}>
        <h3>
          <b>{position}</b>
          <DotOrWrap/>
          <Link url={website}>{company}</Link>
          ・{formatDate(startDate)} - {formatDate(endDate)}
        </h3>
        <ul>
          {highlights.map(highligh => <li key={highligh}>{highligh}</li>)}
        </ul>
      </React.Fragment>
    ))}
  </section>
);

export default Experience;