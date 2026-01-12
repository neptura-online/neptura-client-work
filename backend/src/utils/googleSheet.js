import { google } from "googleapis";
import { formatDate } from "./formateDate.js";

export const addToGoogleSheet = async (lead) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

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

export const deleteFromGoogleSheetByEmail = async (email) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./google.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1i6slEs05hVlyO9uXgmlIhrgxqB5M7yyL69SJXbobGP4";

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = meta.data.sheets.find((s) => s.properties.title === "Sheet1");
  const sheetId = sheet.properties.sheetId;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!C:C",
  });

  const rows = res.data.values || [];

  const rowIndex = rows.findIndex(
    (row, index) => index !== 0 && row[0]?.toLowerCase() === email.toLowerCase()
  );

  if (rowIndex === -1) {
    throw new Error("Lead not found in sheet");
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    },
  });
};
