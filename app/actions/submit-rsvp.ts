"use server"

import { google } from "googleapis"
import { JWT } from "google-auth-library"

// Define the structure of our RSVP data
export type RsvpFormData = {
  name: string
  email: string
  attending: "yes" | "no" | "maybe"
  guests: number
  message?: string
  submittedAt: string
}

export async function submitRsvpToSheet(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    // Get form values
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const attending = formData.get("attending") as "yes" | "no" | "maybe"
    const guests = Number.parseInt(formData.get("guests") as string, 10)
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email || !attending || isNaN(guests)) {
      return {
        success: false,
        message: "Please fill out all required fields",
      }
    }

    // Create RSVP data object with submission timestamp
    const rsvpData: RsvpFormData = {
      name,
      email,
      attending,
      guests,
      message: message || "",
      submittedAt: new Date().toISOString(),
    }

    // Submit to Google Sheets
    const result = await appendToGoogleSheet(rsvpData)

    return {
      success: true,
      message: "Thank you for your RSVP!",
    }
  } catch (error) {
    console.error("Error submitting RSVP:", error)
    return {
      success: false,
      message: "There was an error submitting your RSVP. Please try again.",
    }
  }
}

async function appendToGoogleSheet(data: RsvpFormData) {
  try {
    // Get credentials from environment variables
    const credentials = {
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    }

    // Validate credentials
    if (!credentials.email || !credentials.key || !credentials.spreadsheetId) {
      throw new Error("Missing Google API credentials")
    }

    // Create JWT client for authentication
    const client = new JWT({
      email: credentials.email,
      key: credentials.key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    // Initialize Google Sheets API
    const sheets = google.sheets({ version: "v4", auth: client })

    // Prepare the data row
    const values = [[data.name, data.email, data.attending, data.guests, data.message, data.submittedAt]]

    // Append data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: credentials.spreadsheetId,
      range: "Sheet1!A:F", // Assumes headers are in row 1
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return response.data
  } catch (error) {
    console.error("Error appending to Google Sheet:", error)
    throw error
  }
}
