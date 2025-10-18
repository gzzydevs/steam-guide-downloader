import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { GuideData, ImageData } from './types';

export async function downloadGuide(url: string, outputDir: string): Promise<GuideData> {
  console.log('Fetching guide...');
  
  // Fetch the guide HTML
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  
  const html = response.data;
  const $ = cheerio.load(html);
  
  // Extract guide information
  const title = $('.workshopItemTitle').text().trim() || 'Steam Guide';
  const author = $('.friendBlockContent').text().trim() || 'Unknown';
  const description = $('.workshopItemDescription').text().trim() || '';
  
  // Get the main content
  const contentElement = $('.subSectionDesc, .guide_content, #highlightContent');
  
  // Create images directory
  const imagesDir = path.join(outputDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Extract and download images
  const images: ImageData[] = [];
  const imageElements = contentElement.find('img');
  
  console.log(`Found ${imageElements.length} images to download...`);
  
  for (let i = 0; i < imageElements.length; i++) {
    const img = imageElements.eq(i);
    let imageUrl = img.attr('src') || img.attr('data-src') || '';
    
    if (!imageUrl) continue;
    
    // Handle relative URLs
    if (imageUrl.startsWith('//')) {
      imageUrl = 'https:' + imageUrl;
    } else if (imageUrl.startsWith('/')) {
      imageUrl = 'https://steamcommunity.com' + imageUrl;
    }
    
    try {
      const filename = `image_${i + 1}${path.extname(imageUrl).split('?')[0] || '.jpg'}`;
      const localPath = path.join(imagesDir, filename);
      
      console.log(`Downloading image ${i + 1}/${imageElements.length}...`);
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      fs.writeFileSync(localPath, imageResponse.data);
      
      images.push({
        url: imageUrl,
        filename,
        localPath: path.relative(outputDir, localPath)
      });
      
      // Update img src in the HTML to point to local file
      img.attr('src', path.relative(outputDir, localPath));
    } catch (error) {
      console.warn(`Failed to download image ${imageUrl}:`, error instanceof Error ? error.message : error);
    }
  }
  
  // Get the processed HTML content
  const content = contentElement.html() || '';
  
  // Save the original HTML
  const htmlPath = path.join(outputDir, 'guide.html');
  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
    img { max-width: 100%; height: auto; }
    h1 { color: #333; }
    .author { color: #666; font-style: italic; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p class="author">By ${author}</p>
  ${description ? `<div class="description">${description}</div>` : ''}
  <hr>
  ${content}
</body>
</html>`;
  
  fs.writeFileSync(htmlPath, fullHtml);
  console.log(`✓ Saved HTML to ${htmlPath}`);
  
  return {
    title,
    author,
    description,
    content,
    images,
    htmlContent: fullHtml
  };
}
