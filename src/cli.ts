export interface CliArgs {
  url: string;
  format: string;
  outputDir: string;
}

export function parseArgs(args: string[]): CliArgs {
  if (args.length < 2) {
    console.log('Usage: steam-guide <guide-url> <output-format> [output-directory]');
    console.log('');
    console.log('Arguments:');
    console.log('  guide-url         Steam guide URL (e.g., https://steamcommunity.com/sharedfiles/filedetails/?id=123456)');
    console.log('  output-format     Output format: md, pdf, or html');
    console.log('  output-directory  Output directory (default: ./)');
    console.log('');
    console.log('Example:');
    console.log('  steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 md ./my_output');
    process.exit(1);
  }

  const url = args[0];
  const format = args[1];
  const outputDir = args[2] || './';

  // Validate URL
  if (!url.includes('steamcommunity.com/sharedfiles/filedetails/')) {
    throw new Error('Invalid Steam guide URL. Must be from steamcommunity.com/sharedfiles/filedetails/');
  }

  // Validate format
  const validFormats = ['md', 'markdown', 'pdf', 'html'];
  if (!validFormats.includes(format.toLowerCase())) {
    throw new Error(`Invalid format: ${format}. Valid formats: md, pdf, html`);
  }

  return {
    url,
    format,
    outputDir,
  };
}
