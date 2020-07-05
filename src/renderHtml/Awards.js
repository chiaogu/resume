import React from 'react';
import { 
  formatDate,
  Link,
  DotOrWrap
} from './shared';

const Awards = ({ awards }) => (
  <section>
    <h2>Awards</h2>
    {awards.map(({ title, date, awarder, website, summary }) => (
      <React.Fragment key={title}>
        <h3>
          <b>{title}</b>
          <DotOrWrap/>
          <Link url={website}>{awarder}</Link>・{formatDate(date)}
        </h3>
        <p>{summary}</p>
      </React.Fragment>
    ))}
  </section>
);

export default Awards;