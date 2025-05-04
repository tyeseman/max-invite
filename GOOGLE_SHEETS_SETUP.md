# Google Sheets RSVP Integration Setup Guide

This guide will help you set up the Google Sheets integration for the RSVP form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to something like "Maxwell's Graduation RSVPs"
3. Add the following headers in row 1:
   - A1: Name
   - B1: Email
   - C1: Attending
   - D1: Guests
   - E1: Message
   - F1: Submitted At

## Step 2: Set Up Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and click "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name for your service account (e.g., "graduation-rsvp")
4. Click "Create and Continue"
5. For the role, select "Project" > "Editor"
6. Click "Continue" and then "Done"

## Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" and click "Create"
5. The key file will be downloaded to your computer

## Step 5: Share Your Google Sheet

1. Open your Google Sheet
2. Click the "Share" button in the top right
3. Add the email address of your service account (it's in the JSON file you downloaded)
4. Make sure to give it "Editor" access
5. Click "Share"

## Step 6: Add Environment Variables to Your Project

Add the following environment variables to your project:

\`\`\`env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
\`\`\`

The `GOOGLE_SHEET_ID` is the long string in the URL of your Google Sheet:
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit

## Step 7: Install Required Packages

Run the following command to install the required packages:

\`\`\`bash
npm install googleapis google-auth-library
\`\`\`

## Testing the Integration

After setting up everything:

1. Open your graduation invitation
2. Fill out and submit the RSVP form
3. Check your Google Sheet to see if the data was added

If you encounter any issues, check the console logs for error messages.
\`\`\`

Let's update the package.json to include the required dependencies:
