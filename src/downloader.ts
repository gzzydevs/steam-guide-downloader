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
  const description = $('.guideTopDescription, #highlightContent, .workshopItemDescription').first().text().trim() || '';
  
  // Get the main content - Steam guides have sections with titles and descriptions
  const guideContainer = $('.guide.subSections');
  let contentHtml = '';
  
  if (guideContainer.length > 0) {
    // Process each subsection with its title
    guideContainer.find('.subSection').each((_, section) => {
      const sectionTitle = $(section).find('.subSectionTitle').html();
      const sectionContent = $(section).find('.subSectionDesc').html();
      
      if (sectionTitle) {
        contentHtml += `<h2>${sectionTitle}</h2>\n`;
      }
      if (sectionContent) {
        contentHtml += sectionContent + '\n';
      }
    });
  }
  
  // Fallback to simpler selectors if no subSections found
  if (!contentHtml) {
    const contentElement = $('.subSectionDesc, .guide_content, #highlightContent');
    contentHtml = contentElement.html() || '';
  }
  
  // Load the processed HTML back into cheerio for image processing
  const $content = cheerio.load(`<div>${contentHtml}</div>`);
  const contentElement = $content('div').first();
  
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
    
    // Skip UI/icon images
    if (imageUrl.includes('header_') || imageUrl.includes('footer') || 
        imageUrl.includes('review_award') || imageUrl.includes('logo_')) {
      continue;
    }
    
    // Handle relative URLs
    if (imageUrl.startsWith('//')) {
      imageUrl = 'https:' + imageUrl;
    } else if (imageUrl.startsWith('/')) {
      imageUrl = 'https://steamcommunity.com' + imageUrl;
    }
    
    try {
      // Get file extension from URL or default to .jpg
      const urlPath = imageUrl.split('?')[0];
      const ext = path.extname(urlPath) || '.jpg';
      const filename = `image_${images.length + 1}${ext}`;
      const localPath = path.join(imagesDir, filename);
      
      console.log(`Downloading image ${images.length + 1}...`);
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 30000
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
  
  console.log(`✓ Downloaded ${images.length} images`);
  
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
