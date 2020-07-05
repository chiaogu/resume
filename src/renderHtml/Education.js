import React from 'react';
import { DotOrWrap } from './shared';
import dateFormat from 'dateformat';

const Education = ({ education }) => (
  <section>
    <h2>Education</h2>
    {education.map(({ institution, area, studyType, endDate }) => (
      <h3 key={`${institution}/${area}/${studyType}`}>
        <b>{studyType} in {area}</b>
        <DotOrWrap/>
        {institution}・{dateFormat(new Date(endDate), 'yyyy')}
      </h3>
    ))}
  </section>
);

export default Education;