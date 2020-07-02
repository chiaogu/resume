/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { minify } from 'html-minifier';
import fs from 'fs-extra';
import path from 'path';
import dateFormat from 'dateformat';

const BREAK_POINT_SM = 576;

const Style = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Fira Sans';
        font-weight: normal;
        src: url('./FiraSans-Regular.ttf');
      }

      @font-face {
        font-family: 'Fira Sans';
        font-weight: bold;
        src: url('./FiraSans-Medium.ttf');
      }
      
      @font-face {
        font-family: 'Letter Gothic Std';
        src: url('./LetterGothicStd-Bold.otf');
      }
      
      body {
        width: 794px;
        max-width: 100%;
        min-height: 1122px;
        margin: auto;
        padding: 69px 45px 63px 45px;
        background: #fff;
        /* border: 1px solid #000; */
        box-sizing: border-box;
        color: #000;
        font-family: Fira Sans, sans-serif;
        font-size: 12px;
        line-height: 1.67;
        transition: padding 0.3s;
        /* zoom: 1.3; */
        ::-webkit-scrollbar {
            width: 0;
        } 
        ${mobileOnly(`padding: 69px 20px;`)}
      }
      
      section {
        margin-top: 24px;
      }
      
      p {
        display: block;
        margin-top: 5px;
        margin-bottom: 4px;
      }
      
      h1 {
        margin: 0 0 0 -5px;
        line-height: 1.2;
        height: 40px;
        font-size: 3em;
        font-family: Letter Gothic Std;
      }
      
      h2 {
        margin: 0;
        line-height: 1;
        margin: 8px 0;
      }
      
      h3 {
        font-size: 1em;
        font-weight: normal;
        line-height: 1.5;
        margin: 8px 0;
      }
      
      ul {
        margin: 0;
        list-style-type: none;
        padding-inline-start: 1em;
      }
      
      li {
        position: relative;
        &::before {
          content: '・';
          position: absolute;
          left: -1em;
          top: 0;
        }
      }
      
      a {
        color: #000;
        :hover {
          font-weight: bold;
        }
      }
    `}
  />
)

const formatDate = date => date ? dateFormat(new Date(date), 'mmm yyyy') : 'Present';
const mobileOnly = style => `@media screen and (max-width: ${BREAK_POINT_SM}px) { ${style} }`;
const desktopOnly = style => `@media screen and (min-width: ${BREAK_POINT_SM + 1}px) { ${style} }`;

const Link = ({ children, url }) => url ? <a href={url} target="_blank">{children}</a> : children;

const DotOrWrap = () => (
  <>
    <span css={css`
        ${mobileOnly(`display: none;`)}
    `}>・</span>
    <br css={css`
        ${desktopOnly(`display: none;`)}
    `}/>
  </>
);

const Flex = ({ children }) => (
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

const SKILLS_BREAL_POINT = `@media screen and (min-width: 678px), (min-width: 402px) and (max-width: ${BREAK_POINT_SM}px)`;

const Skills = ({ skills }) => (
  <section>
    <h2>Skills</h2>
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
  </section>
)

const Template = ({ basics, work, projects, awards, education, skills }) => (
  <html>
  <head>
    <Style/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
  </head>
  <body>
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
  </body>
  </html>
);

function renderHtml(resume) {
  const result = ReactDOMServer.renderToString(<Template {...resume}/>);
  return minify(result, {
    removeComments: true
  }) 
}

export default async function writeHtml(outputFolder, resume) {
  const assetsFolder = path.join(__dirname, '..', 'assets');
  const files = await fs.readdir(assetsFolder);
  const copyAsset = file => fs.copyFile(path.join(assetsFolder, file), path.join(outputFolder, file));
  await Promise.all(files.map(copyAsset));
  fs.writeFileSync(path.join(outputFolder, 'index.html'), renderHtml(resume));
}