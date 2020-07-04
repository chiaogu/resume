/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { mobileOnly } from './shared';
import Summary from './Summary';
import Experience from './Experience';
import Projects from './Projects';
import Awards from './Awards';
import Education from './Education';
import Skills from './Skills';

export const Flex = ({ children }) => (
  <div css={css`
    display: flex;
    justify-content: space-between;
    ${mobileOnly(`
      flex-direction: column;
    `)}
  `}>
    {React.Children.map(children, child => (
      <div css={css`
        width: calc(50% - 10px);
        ${mobileOnly(`
          width: 100%;
        `)}
      `}>{child}</div>
    ))}
  </div>
)

const Content = ({ basics, work, projects, awards, education, skills }) => (
  <>
    <h1>{basics.name}</h1>
    <Summary {...basics}/>
    <Experience work={work}/>
    <Flex>
      <Projects projects={projects}/>
      <>
        <Awards awards={awards}/>
        <Education education={education}/>
        <Skills skills={skills}/>
      </>
    </Flex>
  </>
);

export default Content;