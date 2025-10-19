# Steam Guide Downloader 🎮

A powerful CLI tool to download Steam Community guides and convert them to multiple formats (Markdown, HTML, PDF-ready).

[![npm version](https://badge.fury.io/js/steam-guide-downloader.svg)](https://badge.fury.io/js/steam-guide-downloader)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- 📥 Download Steam Community guides
- 🖼️ Extract and save all images from guides
- 📄 Convert to multiple formats: Markdown, HTML, PDF-ready
- 🎨 Preserve guide structure and formatting
- 🔗 Support relative image paths in output
- ⚡ Fast and lightweight
- 🚀 No installation required with npx

## Quick Start

### Using npx (Recommended)

Run directly without installation:

```bash
npx steam-guide-downloader <guide-url> <output-format> [output-directory]
```

### Global Installation

```bash
npm install -g steam-guide-downloader
```

Then use:

```bash
steam-guide <guide-url> <output-format> [output-directory]
```

## Usage

### Command Syntax

```bash
npx steam-guide-downloader <guide-url> <output-format> [output-directory]
```

### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `guide-url` | **Required** | Steam guide URL | `https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947` |
| `output-format` | **Required** | Output format | `md`, `html`, or `pdf` |
| `output-directory` | Optional | Output directory | `./my-guides` (default: `./`) |

### Examples

**Download as Markdown:**
```bash
npx steam-guide-downloader https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 md ./guides
```

**Download as HTML:**
```bash
npx steam-guide-downloader https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 html ./output
```

**Download as PDF-ready HTML:**
```bash
npx steam-guide-downloader https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 pdf ./pdf-guides
```

**Using with global installation:**
```bash
# After npm install -g steam-guide-downloader
steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 md
```

## Output Structure

The tool generates a clean, organized output:

```
output-directory/
├── images/                 # All guide images
│   ├── image_1.jpg
│   ├── image_2.png
│   └── image_N.gif
└── guide.[format]         # Main guide file
```

### Output Files

- **Markdown (`.md`)**: Clean markdown file with relative image links
- **HTML (`.html`)**: Styled HTML file ready for viewing
- **PDF**: HTML file optimized for PDF conversion (use browser's "Print to PDF")

## Requirements

- Node.js 14 or higher
- Internet connection to access Steam Community

## Supported Formats

- **Markdown (`.md`)**: Clean, readable format perfect for documentation
- **HTML (`.html`)**: Styled web page ready for viewing in browsers  
- **PDF**: HTML file optimized for "Print to PDF" conversion

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Clone and setup
git clone https://github.com/gzzydevs/steam-guide-downloader.git
cd steam-guide-downloader
npm install

# Build and test
npm run build
node dist/index.js <guide-url> <format> [output-dir]
```

## License

ISC License - see LICENSE file for details

## Support

- 🐛 [Report issues](https://github.com/gzzydevs/steam-guide-downloader/issues)
- 💡 [Request features](https://github.com/gzzydevs/steam-guide-downloader/issues)
- ⭐ Star this repo if you find it helpful!
