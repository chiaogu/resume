/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { BREAK_POINT_SM } from './shared';

const SKILLS_BREAL_POINT = `@media screen and (min-width: 678px), (min-width: 402px) and (max-width: ${BREAK_POINT_SM}px)`;

const Break = ({ skills }) => (
  <p css={css`
    display: none;
    ${SKILLS_BREAL_POINT} { display: initial; }
  `}>
    {skills.map(({ name, keywords }) => (
      <React.Fragment key={name}>
        {keywords.map((keyword, index) => (
          <span key={keyword}>
            {keyword}
            {index !== keywords.length - 1 && '・'}
          </span>
        ))}
        <br/>
      </React.Fragment>
    ))}
  </p>
);

const Flow = ({ skills }) => (
  <p css={css`${SKILLS_BREAL_POINT} { display: none; }`}>
    {skills.map(({ name, keywords }, skillIndex) => (
      <React.Fragment key={name}>
        {keywords.map((keyword, index) => (
          <span key={keyword}>
            {keyword}
            {(index !== keywords.length - 1 || skillIndex !== skills.length - 1) && '・'}
          </span>
        ))}
      </React.Fragment>
    ))}
  </p>
);

const Skills = props => (
  <section>
    <h2>Skills</h2>
    <Break {...props}/>
    <Flow {...props}/>
  </section>
);

export default Skills;