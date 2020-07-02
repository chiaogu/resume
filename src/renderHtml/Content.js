import React from 'react';
import { 
  Flex
} from './shared';
import Summary from './Summary';
import Experience from './Experience';
import Projects from './Projects';
import Awards from './Awards';
import Education from './Education';
import Skills from './Skills';

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