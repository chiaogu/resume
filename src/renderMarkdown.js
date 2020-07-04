import dateFormat from 'dateformat';
import fs from 'fs-extra';
import path from 'path';

function formatDate(date) {
  return dateFormat(new Date(date), 'mmm yyyy');
}

function link(text, url) {
  return url ? `[${text}](${url})` : text;
}

function profileLink(profiles, network) {
  const { url } = profiles.find(profile => profile.network === network) || {};
  if(!url) return '';
  return `[${url.replace(/https:\/\//, '')}](${url})`;
}

function basicInfo(basics) {
  const { name, email, summary, location: { city, region }, profiles } = basics;
  return `
# ${name}
${city} ${region}・${link(email, `mailto:${email}`)}・${profileLink(profiles, 'Github')}・${profileLink(profiles, 'LinkedIn')}

${summary}
  `.trim();
}

function experience(work) {
  const { position, startDate, endDate, summary, highlights } = work;
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = endDate === null ? 'Present' : formatDate(endDate);
  const { website, company } = work;
  return `
**${position}**・${link(company, website)}・${formattedStartDate} - ${formattedEndDate}  
${highlights.map(highlight => `- ${highlight}`).join('\n')}
  `.trim();
}

function project(project) {
  const { name, description, url, endDate } = project;
  const date = formatDate(endDate);
  return `
**${name}**・[Github](${url})・${date}  
${description}
  `.trim();
}

function education(education) {
  const { institution, area, studyType, startDate, endDate } = education;
  return `**${studyType} in ${area}**・${institution}・${formatDate(startDate)} - ${formatDate(endDate)}`
}

function award(award) {
  const { title, date, awarder, summary, website } = award;
  return `
**${title}**・[${awarder}](${website})・${formatDate(date)}  
${summary}
  `.trim();
}

function skill(skill) {
  const { keywords } = skill;
  return keywords.join('・');
}

function renderMarkdown(resume) {
  return `
${basicInfo(resume.basics)}

## Experience
${resume.work.map(experience).join('\n\n')}

## Personal Projects
${resume.projects.map(project).join('\n\n')}

## Awards
${resume.awards.map(award).join('\n\n')}

## Education
${education(resume.education[0])}

## Skills
${resume.skills.map(skill).join('  \n')}


  `.trim();
}

export default async function writeMarkdown(outputFolder, resume) {
  await fs.writeFile(path.join(outputFolder, 'README.md'), renderMarkdown(resume));
}