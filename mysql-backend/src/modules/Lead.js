import { db } from "../db/db.js";

export const Lead = {
  create: async (data) => {
    const sql = `
      INSERT INTO leads
      (name,email,phone,industry,leadType,message,
       utm_source,utm_medium,utm_term,utm_campaign,
       utm_content,adgroupid,gclid,lpurl,formID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      data.name,
      data.email,
      data.phone,
      data.industry,
      data.leadType || "MainLead",
      data.message,
      data.utm_source,
      data.utm_medium,
      data.utm_term,
      data.utm_campaign,
      data.utm_content,
      data.adgroupid,
      data.gclid,
      data.lpurl,
      data.formID,
    ]);

    return { _id: result.insertId, ...data };
  },

  find: async () => {
    const [rows] = await db.query(
      "SELECT * FROM leads ORDER BY createdAt DESC"
    );
    return rows.map((r) => ({ ...r, _id: String(r._id) }));
  },

  findByIdAndDelete: async (id) => {
    await db.query("DELETE FROM leads WHERE _id = ?", [id]);
  },

  deleteMany: async (ids) => {
    const placeholders = ids.map(() => "?").join(",");
    await db.query(`DELETE FROM leads WHERE _id IN (${placeholders})`, ids);
  },
};
