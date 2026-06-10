import { writeFile } from 'node:fs/promises';

const resumeDataUrl =
  'https://raw.githubusercontent.com/BeriaL-CN/digital_resume/main/resume_data_jiepeng_huang.json';
const outputPath = new URL('../src/data/resume_data_jiepeng_huang.json', import.meta.url);

const response = await fetch(resumeDataUrl);

if (!response.ok) {
  throw new Error(`Failed to download resume data: ${response.status} ${response.statusText}`);
}

const resumeData = await response.json();

// Validate the response before replacing the bundled fallback used by the site.
if (!resumeData.basics || !Array.isArray(resumeData.projects)) {
  throw new Error('Downloaded resume data does not match the expected structure.');
}

await writeFile(outputPath, `${JSON.stringify(resumeData, null, 2)}\n`);
console.log('Synced resume data from digital_resume.');
