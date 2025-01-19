import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Folder containing all JSON files
const folderPath = './data';

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Update each product with a UUID
    const updatedData = data.map((product) => ({
      ...product,
      id: uuidv4(), // Assign a new UUID as the ID
    }));

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`Updated IDs in file: ${file}`);
  });

  console.log('All files updated with unique UUIDs!');
});
