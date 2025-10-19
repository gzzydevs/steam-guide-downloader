# Usage Examples

## Basic Usage

### Download as Markdown (Recommended)
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 md ./my_output
```

This will create:
- `./my_output/images/` - Directory with all guide images
- `./my_output/guide.md` - The guide in Markdown format

### Download as HTML
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 html ./my_output
```

This will create:
- `./my_output/images/` - Directory with all guide images
- `./my_output/guide.html` - The guide in HTML format with styling

### Download as PDF-ready HTML
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947 pdf ./my_output
```

This will create:
- `./my_output/images/` - Directory with all guide images
- `./my_output/guide.html` - HTML file ready for PDF conversion
- `./my_output/PDF_CONVERSION_NOTE.txt` - Instructions for converting to PDF

## Advanced Examples

### Save to current directory
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=123456 md ./
```

### Download multiple guides
```bash
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=123456 md ./guide1
npx steam-guide https://steamcommunity.com/sharedfiles/filedetails/?id=789012 md ./guide2
```

## Output Structure

After running the command, you'll have:

```
my_output/
├── images/
│   ├── image_1.jpg
│   ├── image_2.png
│   ├── image_3.jpg
│   └── ...
└── guide.md (or guide.html)
```

## Converting HTML to PDF

If you chose the `pdf` format, you can convert the HTML to PDF using:

### Using Browser
1. Open `guide.html` in your browser
2. Press Ctrl+P (or Cmd+P on Mac)
3. Select "Save as PDF"
4. Save the file

### Using wkhtmltopdf (Linux/Mac)
```bash
wkhtmltopdf guide.html guide.pdf
```

### Using Chromium/Chrome (Command Line)
```bash
google-chrome --headless --disable-gpu --print-to-pdf=guide.pdf guide.html
```

## Troubleshooting

### Command not found
If you get "command not found", try:
```bash
npx --package steam-guide-downloader steam-guide <url> <format> <output-dir>
```

### Network errors
Make sure you have a stable internet connection and can access steamcommunity.com

### Permission errors
Make sure you have write permissions in the output directory
