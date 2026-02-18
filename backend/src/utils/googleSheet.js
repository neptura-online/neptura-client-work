import { google } from "googleapis";
import { formatDate } from "./formateDate.js";
import { SheetMapping } from "../modules/SheetMapping.js";

export const addLeadToSheet = async (lead) => {
  let leadPage = null;

  try {
    leadPage = new URL(lead.lpurl).pathname;
  } catch (err) {
    leadPage = null;
  }
  console.log(leadPage);

  const mapping = await SheetMapping.findOne({
    isActive: true,
    $or: [
      { formID: lead.formID, page: leadPage },
      { formID: lead.formID, page: null },
      { formID: null, page: leadPage },
      { formID: null, page: null },
    ],
  }).sort({
    formID: -1,
    page: -1,
  });

  console.log(mapping);

  if (!mapping) return;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      project_id: process.env.GOOGLE_PROJECT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const time = formatDate(lead.createdAt);

  const orderedFields = mapping.fields.sort((a, b) => a.order - b.order);

  const row = orderedFields.map((field) => {
    if (field.leadField === "time") return time;
    return lead[field.leadField] || "";
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: mapping.spreadsheetId,
    range: `${mapping.sheetName}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [row],
    },
  });
};
