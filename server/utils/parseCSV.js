const fs = require('fs');
const csv = require('csv-parser');

/**
 * Parses a CSV file into an array of objects
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<Array>} - Array of objects representing CSV rows
 */
async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert all keys to lowercase for consistency
        const normalizedData = {};
        Object.keys(data).forEach(key => {
          const lowerKey = key.toLowerCase().trim();
          normalizedData[lowerKey] = data[key];
        });
        
        // Make sure we have an email field
        if (!normalizedData.email && normalizedData.name) {
          // Try to find email in other possible fields
          normalizedData.email = normalizedData.mail || 
                                normalizedData.emailaddress || 
                                normalizedData.emailid || 
                                normalizedData.email_address ||
                                normalizedData.email_id;
        }
        
        results.push(normalizedData);
      })
      .on('end', () => {
        if (results.length === 0) {
          return reject(new Error('CSV file is empty or could not be parsed'));
        }
        
        // Validate that each entry has an email
        const validResults = results.filter(item => item.email && item.email.includes('@'));
        
        if (validResults.length === 0) {
          return reject(new Error('No valid email addresses found in CSV'));
        }
        
        resolve(validResults);
      })
      .on('error', (error) => reject(error));
  });
}

module.exports = { parseCSV };