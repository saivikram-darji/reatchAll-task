#!/bin/bash

# Navigate to the project directory
cd /path/to/destination || exit

# Ensure the repository is up to date
git pull origin main

# Install dependencies
npm install

# Build the project (if necessary)
npm run build

# Start the application with PM2
pm2 start app.js --name "node-app" || pm2 restart "node-app"

# Save the PM2 process list and corresponding environment
pm2 save
