const fs = require('fs').promises;
const path = require('path');

// Example usage: node src/update-data.js

async function findLatestDifferencesFile() {
  try {
    const files = await fs.readdir('.');
    const differencesFiles = files.filter(file => 
      file.startsWith('course-differences-') && file.endsWith('.json')
    );
    
    if (differencesFiles.length === 0) {
      throw new Error('No differences files found. Run the scraper first.');
    }
    
    // Sort by creation time (newest first)
    const fileStats = await Promise.all(
      differencesFiles.map(async (file) => {
        const stats = await fs.stat(file);
        return { file, mtime: stats.mtime };
      })
    );
    
    fileStats.sort((a, b) => b.mtime - a.mtime);
    return fileStats[0].file;
  } catch (error) {
    throw new Error(`Error finding differences file: ${error.message}`);
  }
}

async function updateDataWithDifferences() {
  try {
    // Read the current data
    const dataPath = './src/data.json';
    const differencesPath = await findLatestDifferencesFile();
    
    console.log('Reading current data...');
    const dataContent = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(dataContent);
    
    console.log(`Reading differences file: ${differencesPath}`);
    const differencesContent = await fs.readFile(differencesPath, 'utf8');
    const differences = JSON.parse(differencesContent);
    
    // Create a map of differences by slug for easy lookup
    const differencesMap = new Map();
    differences.forEach(diff => {
      if (diff.status === 'DIFFERENCES_FOUND' && diff.differences) {
        const updates = {};
        diff.differences.forEach(d => {
          updates[d.field] = d.scraped;
        });
        differencesMap.set(diff.slug, updates);
      }
    });
    
    console.log(`Found ${differencesMap.size} courses with updates`);
    
    // Update the courses in data.json
    let updatedCount = 0;
    data.pageProps.courses.forEach(course => {
      const updates = differencesMap.get(course.slug);
      if (updates) {
        // Update the course with new values
        if (updates.rating !== undefined) course.rating = updates.rating;
        if (updates.difficulty !== undefined) course.difficulty = updates.difficulty;
        if (updates.workload !== undefined) course.workload = updates.workload;
        if (updates.reviewCount !== undefined) course.reviewCount = updates.reviewCount;
        
        updatedCount++;
        console.log(`Updated ${course.name}:`, updates);
      }
    });
    
    // Write the updated data back to file
    const backupPath = `./src/data-backups/data-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    console.log(`Creating backup at: ${backupPath}`);
    await fs.writeFile(backupPath, dataContent);
    
    console.log(`Writing updated data to: ${dataPath}`);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 4));
    
    console.log(`\n✅ Successfully updated ${updatedCount} courses in data.json`);
    console.log(`📁 Backup saved to: ${backupPath}`);
    
  } catch (error) {
    console.error('Error updating data:', error);
    process.exit(1);
  }
}

updateDataWithDifferences(); 