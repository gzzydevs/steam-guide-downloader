import * as fs from 'fs';
import * as path from 'path';
import { GuideData } from '../types';

export async function convertToPdf(guideData: GuideData, outputDir: string): Promise<void> {
  // For now, we'll create a notice that PDF conversion requires additional setup
  // Users can use external tools to convert the HTML to PDF
  
  const noticePath = path.join(outputDir, 'PDF_CONVERSION_NOTE.txt');
  const notice = `PDF Conversion Notice
=====================

The guide has been downloaded as HTML (guide.html).

To convert to PDF, you can use one of these methods:

1. Open guide.html in your browser and use "Print to PDF"
2. Use a command-line tool like wkhtmltopdf:
   wkhtmltopdf guide.html guide.pdf
3. Use an online converter

The HTML file includes all images and formatting.
`;

  fs.writeFileSync(noticePath, notice);
  console.log(`✓ HTML saved. See ${noticePath} for PDF conversion instructions.`);
}
