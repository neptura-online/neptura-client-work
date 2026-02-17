import { google } from "googleapis";
import { SheetMapping } from "../modules/SheetMapping.js";
import { formatDate } from "./formateDate.js";

export const addLeadToSheet = async (lead) => {
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

  await sheets.spreadsheets.values.append({
    spreadsheetId: "1a9JNuD1IRVfeKcS1ZmqXVYTWd8LGD5mNukZOeHgPBbE",
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          time,
          lead.name,
          lead.email,
          lead.phone,
          lead.industry,
          lead.message,
          lead.utm_source,
          lead.utm_medium,
          lead.utm_term,
          lead.utm_campaign,
          lead.utm_content,
          lead.adgroupid,
          lead.gclid,
          lead.lpurl,
          lead.formID,
        ],
      ],
    },
  });
};
