import { google } from "googleapis";
import { SheetMapping } from "../modules/SheetMapping.js";
import { formatDate } from "./formateDate.js";

export const addLeadToSheet = async (lead) => {
  try {
    const mapping = await SheetMapping.findOne({ formID: lead.formID });
    if (!mapping || !mapping.isActive) return;

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const time = formatDate(lead.createdAt);
    const row = mapping.fields.map((field) => {
      if (field.leadField === "time") return time;
      return lead[field.leadField] || "-";
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: mapping.spreadsheetId,
      range: `${mapping.sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    console.log("Lead successfully added to sheet:", response.status);
  } catch (error) {
    console.error(
      "CRITICAL ERROR in addLeadToSheet:",
      error.response?.data || error.message
    );
  }
};
