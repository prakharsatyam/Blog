const { Client, Storage, ID, Permission, Role } = require('node-appwrite');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * -------------------------------------------------------------
 * Appwrite Public Storage Uploader
 * -------------------------------------------------------------
 * This script bulk-uploads all files from a local directory 
 * into your Appwrite storage bucket and sets their read 
 * permissions to "public" (Role.any()).
 * 
 * PREREQUISITES:
 * 1. npm install node-appwrite dotenv
 * 2. Add `APPWRITE_API_KEY` to your .env file with Storage (Files) scopes.
 * 
 * USAGE:
 * node scripts/uploadToAppwrite.js <relative-path-to-folder>
 * e.g. node scripts/uploadToAppwrite.js ./public
 */

const uploadFilesToPublicBucket = async (folderPath) => {
    // 1. Initialize Appwrite Client
    const client = new Client()
        .setEndpoint(process.env.VITE_APPWRITE_URL)
        .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    if (!process.env.APPWRITE_API_KEY) {
        console.error("❌ Error: APPWRITE_API_KEY is missing from .env");
        process.exit(1);
    }

    const storage = new Storage(client);
    const bucketId = process.env.VITE_APPWRITE_BUCKET_ID;

    // 2. Validate Target Folder
    const targetDir = path.resolve(__dirname, '..', folderPath);
    if (!fs.existsSync(targetDir)) {
        console.error(`❌ Error: Directory not found at ${targetDir}`);
        process.exit(1);
    }

    console.log(`📁 Scanning directory: ${targetDir}`);
    const files = fs.readdirSync(targetDir);
    
    // Filter out directories (only uploading raw files)
    const validFiles = files.filter(file => {
        const stat = fs.statSync(path.join(targetDir, file));
        return stat.isFile();
    });

    console.log(`🚀 Found ${validFiles.length} files. Beginning upload to Bucket ID: ${bucketId}...`);

    // 3. Upload files iteratively
    for (const fileName of validFiles) {
        const filePath = path.join(targetDir, fileName);
        
        try {
            console.log(`-> Uploading ${fileName}...`);
            
            // Note: node-appwrite uses the fs.createReadStream method for file uploads in NodeJS
            const response = await storage.createFile(
                bucketId,
                ID.unique(),
                fs.createReadStream(filePath),
                [
                    // Public read permissions for anyone visiting the blog
                    Permission.read(Role.any())
                ]
            );

            console.log(`✅ Success! File ID: ${response.$id}`);
        } catch (error) {
            console.error(`❌ Failed to upload ${fileName}:`, error.message);
        }
    }

    console.log("🎉 All uploads completed!");
};

// Execute if run directly
const args = process.argv.slice(2);
const folderArg = args[0] || './public'; // Default to public folder

uploadFilesToPublicBucket(folderArg);
