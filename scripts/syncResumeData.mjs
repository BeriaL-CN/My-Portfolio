import { writeFile } from 'node:fs/promises';

const resumeDataUrl =
  'https://raw.githubusercontent.com/BeriaL-CN/digital_resume/main/resume_data_jiepeng_huang.json';
const outputPath = new URL('../src/data/public_resume_data.json', import.meta.url);

const response = await fetch(resumeDataUrl);

if (!response.ok) {
  throw new Error(`Failed to download resume data: ${response.status} ${response.statusText}`);
}

const resumeData = await response.json();

// Validate the response before replacing the bundled fallback used by the site.
if (!resumeData.basics || !Array.isArray(resumeData.projects)) {
  throw new Error('Downloaded resume data does not match the expected structure.');
}

// Optional manual refresh: sanitize the Digital Resume source before updating the portfolio bundle.
const publicResumeData = structuredClone(resumeData);
delete publicResumeData.basics.phone;
delete publicResumeData.basics.visa;

if (publicResumeData.basics.location) {
  delete publicResumeData.basics.location.address;
  delete publicResumeData.basics.location.postalCode;
}

await writeFile(outputPath, `${JSON.stringify(publicResumeData, null, 2)}\n`);
console.log('Synced public-safe resume data from digital_resume.');
