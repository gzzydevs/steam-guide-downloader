import * as fs from 'fs';
import * as path from 'path';
import TurndownService from 'turndown';
import { GuideData } from '../types';

export async function convertToMarkdown(guideData: GuideData, outputDir: string): Promise<void> {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });
  
  // Convert HTML to Markdown
  const markdownContent = turndownService.turndown(guideData.content);
  
  // Build the full markdown document
  let markdown = `# ${guideData.title}\n\n`;
  markdown += `**Author:** ${guideData.author}\n\n`;
  
  if (guideData.description) {
    markdown += `${guideData.description}\n\n`;
    markdown += `---\n\n`;
  }
  
  markdown += markdownContent;
  
  // Save to file
  const outputPath = path.join(outputDir, 'guide.md');
  fs.writeFileSync(outputPath, markdown);
  
  console.log(`✓ Saved Markdown to ${outputPath}`);
}
