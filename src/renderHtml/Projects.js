import React from 'react';
import { 
  Link,
  formatDate
} from './shared';

const Projects = ({ projects }) => (
  <section>
    <h2>Personal Projects</h2>
    {projects.map(({ name, description, url, endDate }) => (
      <React.Fragment key={name}>
        <h3>
          <b>{name}</b>・<Link url={url}>Github</Link>・{formatDate(endDate)}
        </h3>
        <p>{description}</p>
      </React.Fragment>
    ))}
  </section>
);

export default Projects;