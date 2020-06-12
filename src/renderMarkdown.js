import dateFormat from 'dateformat';

function formatDate(date) {
  return dateFormat(new Date(date), 'mmm yyyy');
}

function emailLink(email) {
  return `[${email}](mailto:${email})`;
}

function profileLink(profiles, network) {
  const { url } = profiles.find(profile => profile.network === network) || {};
  if(!url) return '';
  return `[${url.replace(/https:\/\//, '')}](${url})`;
}

function companyLink(work) {
  const { website, company } = work;
  return website ? `[${company}](${website})` : company;
}

function basicInfo(basics) {
  const { name, email, summary, location: { city, region }, profiles } = basics;
  return `
# ${name}
${city} ${region}・${emailLink(email)}・${profileLink(profiles, 'Github')}・${profileLink(profiles, 'LinkedIn')}

${summary}
  `.trim();
}

function experience(work) {
  const { position, startDate, endDate, summary, highlights } = work;
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = endDate === null ? 'Present' : formatDate(endDate);
  return `
**${position}**・${companyLink(work)}・${formattedStartDate} - ${formattedEndDate}  
${summary}
${highlights.map(highlight => `- ${highlight}`).join('\n')}
  `.trim();
}

function education(education) {
  const { institution, area, studyType, startDate, endDate } = education;
  return `**${studyType} in ${area}**・${institution}・${formatDate(startDate)} - ${formatDate(endDate)}`
}

function award(award) {
  const { title, date, awarder, summary } = award;
  return `
**${title}**・${awarder}・${formatDate(date)}  
${summary}
  `.trim();
}

function skills(skills) {
  
}

export default function renderMarkdown(resume) {
  return `
${basicInfo(resume.basics)}

## Experience
${resume.work.map(experience).join('\n\n')}

## Education
${education(resume.education[0])}

## Awards & Projects
${resume.awards.map(award).join('\n\n')}

## Skills
${skills(resume.skills)}
  `.trim();
}