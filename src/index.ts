#!/usr/bin/env node

import { parseArgs } from './cli';
import { downloadGuide } from './downloader';
import { convertToMarkdown } from './converters/markdown';
import { convertToPdf } from './converters/pdf';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    
    console.log(`Downloading guide from: ${args.url}`);
    console.log(`Output format: ${args.format}`);
    console.log(`Output directory: ${args.outputDir}`);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(args.outputDir)) {
      fs.mkdirSync(args.outputDir, { recursive: true });
    }
    
    // Download the guide HTML and images
    const guideData = await downloadGuide(args.url, args.outputDir);
    
    // Convert based on format
    switch (args.format.toLowerCase()) {
      case 'md':
      case 'markdown':
        await convertToMarkdown(guideData, args.outputDir);
        console.log(`✓ Guide saved as Markdown in ${args.outputDir}`);
        break;
      case 'pdf':
        await convertToPdf(guideData, args.outputDir);
        console.log(`✓ Guide saved as PDF in ${args.outputDir}`);
        break;
      case 'html':
        // HTML is already saved by downloadGuide
        console.log(`✓ Guide saved as HTML in ${args.outputDir}`);
        break;
      default:
        throw new Error(`Unsupported format: ${args.format}`);
    }
    
    console.log('✓ Download complete!');
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the CLI
main();
