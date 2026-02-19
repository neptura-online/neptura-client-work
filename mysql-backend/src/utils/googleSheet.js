import { google } from "googleapis";
import { formatDate } from "./formateDate.js";
import { db } from "../db/db.js";

export const addLeadToSheet = async (lead) => {
  let leadPage = null;

  try {
    leadPage = new URL(lead.lpurl).pathname;
  } catch {
    leadPage = null;
  }

  const [rows] = await db.query(
    `
    SELECT *
    FROM sheet_mappings
    WHERE isActive=1
    AND (
      (formID=? AND page=?)
      OR (formID=? AND page IS NULL)
      OR (formID IS NULL AND page=?)
      OR (formID IS NULL AND page IS NULL)
    )
    ORDER BY
      (formID IS NOT NULL) DESC,
      (page IS NOT NULL) DESC
    LIMIT 1
  `,
    [lead.formID, leadPage, lead.formID, leadPage]
  );

  if (!rows.length) return;

  const mapping = rows[0];

  const [fields] = await db.query(
    `
    SELECT leadField, fieldOrder as \`order\`
    FROM sheet_mapping_fields
    WHERE mappingId=?
    ORDER BY fieldOrder ASC
  `,
    [mapping._id]
  );

  const auth = new google.auth.GoogleAuth({
    credentials: {
      project_id: process.env.GOOGLE_PROJECT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  console.log(lead);
  let time;

  if (lead.createdAt) {
    time = formatDate(lead.createdAt);
  } else {
    time = formatDate(new Date());
  }

  const row = fields.map((field) => {
    if (field.leadField === "time") return time;

    // first check root lead field
    if (lead[field.leadField]) {
      return lead[field.leadField];
    }

    // then check dynamic tracking
    if (lead.tracking && lead.tracking[field.leadField]) {
      return lead.tracking[field.leadField];
    }

    return "";
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
