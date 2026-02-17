import { SheetMapping } from "../modules/SheetMapping.js";

export const addLeadToSheet = async (lead) => {
  const mapping = await SheetMapping.findOne({
    formID: lead.formID,
  });

  if (!mapping || !mapping.isActive) return;

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

  const row = mapping.fields.map((field) => {
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
