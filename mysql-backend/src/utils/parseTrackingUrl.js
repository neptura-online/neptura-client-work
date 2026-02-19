import { db } from "../db/db.js";

export const parseTrackingUrl = async (url) => {
  try {
    const parsedUrl = new URL(url);
    const params = parsedUrl.searchParams;

    const [allowed] = await db.query(`
      SELECT \`key\`
      FROM tracking_fields
      WHERE isActive=1
    `);

    const tracking = {};

    for (const f of allowed) {
      const val = params.get(f.key);
      if (val) tracking[f.key] = val;
    }

    return tracking;
  } catch {
    return {};
  }
};
