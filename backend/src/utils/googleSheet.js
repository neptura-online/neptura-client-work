import { google } from "googleapis";
import { formatDate } from "./formateDate.js";

const credentials =
  typeof process.env.GOOGLE_SERVICE_ACCOUNT === "string"
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
    : process.env.GOOGLE_SERVICE_ACCOUNT;

const auth = new google.auth.GoogleAuth({
  credentials, // ✅ NOT keyFile
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const addToGoogleSheet = async (lead) => {
  const time = formatDate(lead.createdAt);

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: "1i6slEs05hVlyO9uXgmlIhrgxqB5M7yyL69SJXbobGP4",
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
