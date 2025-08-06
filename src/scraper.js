const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Example usage: node src/scraper.js src/data.json

// Configuration
const CONFIG = {
  baseUrl: 'https://www.omscentral.com',
  delay: 1000,
  timeout: 15000,
  maxRetries: 2
};

class OMSCentralScraper {
  constructor(currentDataPath) {
    this.currentDataPath = currentDataPath;
    this.browser = null;
    this.currentData = [];
    this.scrapedData = [];
    this.differences = [];
  }

  async initialize() {
    // Load current data
    try {
      const data = await fs.readFile(this.currentDataPath, 'utf8');
      const parsed = JSON.parse(data);
      this.currentData = parsed.pageProps?.courses || parsed;
    } catch (error) {
      console.error('Error loading current data:', error);
      throw error;
    }

    // Launch browser
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log(`Loaded ${this.currentData.length} courses from current data`);
  }

  async scrapeOMSCentralData() {
    const url = 'https://www.omscentral.com/';
    
    try {
      const page = await this.browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      console.log(`Scraping: ${url}`);
      
      // Navigate to main page
      await page.goto(url, { 
        waitUntil: 'networkidle2', 
        timeout: CONFIG.timeout 
      });

      // Wait for the table to load
      await page.waitForSelector('table', { timeout: 10000 });

      // First, try to set the page size to show more courses at once
      console.log('Setting page size to show more courses...');
      
      try {
        // Try to click the "50" button using multiple strategies
        const clicked = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const fiftyButton = buttons.find(btn => btn.textContent.trim() === '50');
          if (fiftyButton && !fiftyButton.disabled) {
            fiftyButton.click();
            return true;
          }
          return false;
        });

        if (clicked) {
          console.log('Successfully clicked 50 courses per page');
          // Wait for the page to update
          await new Promise(resolve => setTimeout(resolve, 3000));
          await page.waitForSelector('table tbody tr', { timeout: 10000 });
        } else {
          console.log('Could not find or click 50 button, will paginate through 10 per page');
        }
      } catch (e) {
        console.log('Error setting page size, will paginate normally:', e.message);
      }

      let allCourses = [];
      let currentPage = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        console.log(`Scraping page ${currentPage}...`);

        // Extract courses from current page
        const courseData = await page.evaluate(() => {
          const courses = [];
          
          // Try to scrape from the table
          const rows = document.querySelectorAll('tbody tr');
          
          rows.forEach(row => {
            try {
              // Get course name from the first column
              const nameElement = row.querySelector('td:first-child .text-base') || 
                                 row.querySelector('td:first-child span:not(.text-xs)');
              
              if (!nameElement) return;

              const name = nameElement.textContent.trim();
              
              // Get course code - could be in first cell or second cell
              let code = '';
              const codeElement = row.querySelector('td:first-child .text-xs') || 
                                 row.querySelector('td:nth-child(2)');
              if (codeElement) {
                code = codeElement.textContent.trim();
              }

              // Get all table cells
              const cells = Array.from(row.querySelectorAll('td'));
              let rating = null, difficulty = null, workload = null, reviewCount = null;

              // Parse values by column position
              // Column order: Course | Code(s) | Rating | Difficulty | Workload | Reviews
              cells.forEach((cell, index) => {
                const text = cell.textContent.trim();
                const num = parseFloat(text);
                const intNum = parseInt(text);

                // Skip course name (index 0) and code (index 1)
                if (index < 2) return;

                // Parse by column position
                switch (index) {
                  case 2: // Rating column
                    if (!isNaN(num) && num >= 1 && num <= 5) {
                      rating = num;
                    }
                    break;
                  case 3: // Difficulty column
                    if (!isNaN(num) && num >= 1 && num <= 5) {
                      difficulty = num;
                    }
                    break;
                  case 4: // Workload column
                    if (!isNaN(num) && num > 0) {
                      workload = num;
                    }
                    break;
                  case 5: // Reviews column
                    if (!isNaN(intNum) && intNum > 0) {
                      reviewCount = intNum;
                    }
                    break;
                }
              });

              // Create slug from name
              const slug = name.toLowerCase()
                .replace(/special topics:\s*/i, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');

              courses.push({
                name,
                slug,
                codes: code ? [code] : [],
                rating,
                difficulty,
                workload,
                reviewCount
              });
            } catch (e) {
              console.log('Error parsing row:', e.message);
            }
          });

          return courses;
        });

        allCourses = allCourses.concat(courseData);
        console.log(`Page ${currentPage}: Found ${courseData.length} courses (Total: ${allCourses.length})`);

        // Try to go to next page
        const nextClicked = await page.evaluate(() => {
          // Find the Next button by looking for the button with Next in sr-only text
          const paginationButtons = Array.from(document.querySelectorAll('nav button'));
          const nextButton = paginationButtons.find(btn => {
            const srOnly = btn.querySelector('.sr-only');
            return srOnly && srOnly.textContent === 'Next' && !btn.disabled;
          });
          
          if (nextButton) {
            nextButton.click();
            return true;
          }
          return false;
        });
        
        if (nextClicked) {
          currentPage++;
          console.log(`Navigating to page ${currentPage}...`);
          // Wait for the new page to load
          await new Promise(resolve => setTimeout(resolve, 3000));
          await page.waitForSelector('table tbody tr', { timeout: 10000 });
        } else {
          hasNextPage = false;
          console.log('No more pages available');
        }

        // Safety check to avoid infinite loops
        if (currentPage > 15) {
          console.log('Reached maximum page limit (15), stopping');
          hasNextPage = false;
        }
      }

      await page.close();
      
      // Remove duplicates based on slug
      const uniqueCourses = allCourses.filter((course, index, self) => 
        index === self.findIndex(c => c.slug === course.slug && c.name === course.name)
      );

      console.log(`Total unique courses found: ${uniqueCourses.length}`);
      return uniqueCourses;

    } catch (error) {
      console.error(`Error scraping OMSCentral:`, error.message);
      return null;
    }
  }

  async scrapeAllCourses() {
    console.log('Starting to scrape OMSCentral...');
    
    // Get all course data from the main page
    const omsCentralData = await this.scrapeOMSCentralData();
    
    if (!omsCentralData || omsCentralData.length === 0) {
      console.log('Failed to scrape data from OMSCentral');
      return;
    }

    console.log(`Successfully scraped ${omsCentralData.length} courses from OMSCentral`);

    // Process each course from your current data and match with OMSCentral data
    for (let i = 0; i < this.currentData.length; i++) {
      const course = this.currentData[i];
      const progress = `${i + 1}/${this.currentData.length}`;
      
      console.log(`[${progress}] Processing: ${course.name} (${course.slug})`);
      
      // Find matching course in OMSCentral data
      const matchingCourse = this.findMatchingCourse(course, omsCentralData);
      
      if (matchingCourse) {
        const scrapedData = {
          rating: matchingCourse.rating,
          difficulty: matchingCourse.difficulty,
          workload: matchingCourse.workload,
          reviewCount: matchingCourse.reviewCount
        };

        this.scrapedData.push({
          slug: course.slug,
          name: course.name,
          current: {
            rating: course.rating,
            difficulty: course.difficulty,
            workload: course.workload,
            reviewCount: course.reviewCount
          },
          scraped: scrapedData
        });
        
        // Compare and record differences
        this.compareCourseData(course, scrapedData);
      } else {
        console.log(`No matching course found for: ${course.name}`);
        this.differences.push({
          slug: course.slug,
          name: course.name,
          status: 'NOT_FOUND_ON_OMSCENTRAL',
          current: {
            rating: course.rating,
            difficulty: course.difficulty,
            workload: course.workload,
            reviewCount: course.reviewCount
          },
          scraped: null
        });
      }
    }
  }

  findMatchingCourse(currentCourse, omsCentralCourses) {
    // Try to find exact slug match first
    let match = omsCentralCourses.find(course => course.slug === currentCourse.slug);
    if (match) return match;

    // Try to find by name
    match = omsCentralCourses.find(course => 
      course.name && course.name.toLowerCase() === currentCourse.name.toLowerCase()
    );
    if (match) return match;

    // Try to find by course codes
    if (currentCourse.codes && currentCourse.codes.length > 0) {
      match = omsCentralCourses.find(omsCourse => {
        if (!omsCourse.codes || omsCourse.codes.length === 0) return false;
        return currentCourse.codes.some(code => 
          omsCourse.codes.some(omsCode => 
            code.toLowerCase().replace(/[-\s]/g, '') === omsCode.toLowerCase().replace(/[-\s]/g, '')
          )
        );
      });
      if (match) return match;
    }

    // Try partial name matching for courses with similar names
    match = omsCentralCourses.find(course => {
      if (!course.name || !currentCourse.name) return false;
      const courseName = course.name.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      const currentName = currentCourse.name.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      
      // Check if names are very similar (> 80% match)
      const similarity = this.calculateStringSimilarity(courseName, currentName);
      return similarity > 0.8;
    });

    return match || null;
  }

  calculateStringSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  compareCourseData(currentCourse, scrapedData) {
    const differences = [];
    const fields = ['rating', 'difficulty', 'workload', 'reviewCount'];
    
    fields.forEach(field => {
      const currentValue = currentCourse[field];
      const scrapedValue = scrapedData[field];
      
      // Handle null/undefined values
      if (currentValue !== scrapedValue) {
        // Only report if there's a meaningful difference
        if ((currentValue == null && scrapedValue != null) ||
            (currentValue != null && scrapedValue == null) ||
            (Math.abs(currentValue - scrapedValue) >= 0.009)) {
          
          differences.push({
            field,
            current: currentValue,
            scraped: scrapedValue,
            change: scrapedValue != null && currentValue != null ? 
                   (scrapedValue - currentValue).toFixed(2) : 'N/A'
          });
        }
      }
    });

    if (differences.length > 0) {
      this.differences.push({
        slug: currentCourse.slug,
        name: currentCourse.name,
        status: 'DIFFERENCES_FOUND',
        differences
      });
    }
  }

  async generateReports() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Generate difference report
    if (this.differences.length > 0) {
      const reportPath = `course-differences-${timestamp}.json`;
      await fs.writeFile(reportPath, JSON.stringify(this.differences, null, 2));
      console.log(`\nDifferences found in ${this.differences.length} courses`);
      console.log(`Detailed report saved to: ${reportPath}`);
      
      // Generate summary
      console.log('\n--- SUMMARY ---');
      this.differences.forEach(diff => {
        if (diff.status === 'DIFFERENCES_FOUND') {
          console.log(`\n${diff.name} (${diff.slug}):`);
          diff.differences.forEach(d => {
            console.log(`  ${d.field}: ${d.current} → ${d.scraped} (${d.change})`);
          });
        } else if (diff.status === 'NOT_FOUND_ON_OMSCENTRAL') {
          console.log(`\n${diff.name} (${diff.slug}): NOT FOUND ON OMSCENTRAL`);
        }
      });
    } else {
      console.log('\nNo differences found! All course data is up to date.');
    }

    // Save complete scraped data
    const dataPath = `scraped-data-${timestamp}.json`;
    await fs.writeFile(dataPath, JSON.stringify(this.scrapedData, null, 2));
    console.log(`Complete scraped data saved to: ${dataPath}`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.initialize();
      await this.scrapeAllCourses();
      await this.generateReports();
    } catch (error) {
      console.error('Scraper failed:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Usage
async function main() {
  const dataPath = process.argv[2] || './course-data.json';
  
  if (!await fs.access(dataPath).then(() => true).catch(() => false)) {
    console.error(`Data file not found: ${dataPath}`);
    console.log('Usage: node scraper.js [path-to-current-data.json]');
    process.exit(1);
  }

  const scraper = new OMSCentralScraper(dataPath);
  await scraper.run();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = OMSCentralScraper;