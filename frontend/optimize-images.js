import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const IMAGES_DIR = './src/assets/images';
const OUTPUT_DIR = './src/assets/images';
const QUALITY = 80;
const MAX_WIDTH = 800;

async function optimizeImages() {
  try {
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to optimize\n`);

    for (const file of imageFiles) {
      const inputPath = join(IMAGES_DIR, file);
      const outputPath = join(OUTPUT_DIR, file.replace(/\.(png|jpg|jpeg)$/i, '-optimized.jpg'));

      console.log(`Processing: ${file}`);
      
      await sharp(inputPath)
        .resize(MAX_WIDTH, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(outputPath);

      console.log(`✓ Saved: ${outputPath}\n`);
    }

    // Optimize hero.png
    console.log('Processing: hero.png');
    await sharp('./src/assets/hero.png')
      .resize(1920, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile('./src/assets/hero-optimized.jpg');
    console.log('✓ Saved: ./src/assets/hero-optimized.jpg\n');

    console.log('✅ All images optimized!');
    console.log('\nNext steps:');
    console.log('1. Review the optimized images');
    console.log('2. Replace original files if satisfied');
    console.log('3. Update image imports in your code');
  } catch (error) {
    console.error('Error:', error);
  }
}

optimizeImages();
