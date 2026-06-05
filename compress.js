const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'assets');

async function compressImages() {
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(assetsDir, file);
      const tempPath = path.join(assetsDir, 'temp_' + file);
      
      console.log(`Compressing ${file}...`);
      
      try {
        if (file.endsWith('.png')) {
          await sharp(filePath)
            .png({ quality: 70 })
            .toFile(tempPath);
        } else {
          await sharp(filePath)
            .jpeg({ quality: 75 })
            .toFile(tempPath);
        }
        
        // Replace original with compressed
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        console.log(`Successfully compressed ${file}`);
      } catch (err) {
        console.error(`Error compressing ${file}:`, err);
      }
    }
  }
}

compressImages();
