# steam-guide-downloader

A CLI tool to download Steam guides in different formats (.html, .pdf, .md).

## Installation

```bash
npm install -g steam-guide-downloader
```

Or use directly with npx:

```bash
npx steam-guide-downloader <guide-url> <output-format> [output-directory]
```

## Usage

```bash
steam-guide <guide-url> <output-format> [output-directory]
```

### Parameters

- `guide-url`: The URL of the Steam guide (e.g., https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947)
- `output-format`: Desired output format - `md`, `pdf`, or `html`
- `output-directory`: Optional. Directory where files will be saved (default: current directory `./`)

### Examples

Download guide as Markdown:
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 md ./my_output
```

Download guide as HTML:
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 html ./guides
```

Download guide as PDF (creates HTML for conversion):
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 pdf ./output
```

## Output

The tool creates:
- An `images/` directory containing all downloaded images
- A `guide.md` file (for Markdown format) or `guide.html` file (for HTML format)
- For PDF format: HTML file with instructions on how to convert to PDF

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test locally
node dist/index.js <guide-url> <format> [output-dir]
```

## License

ISC
