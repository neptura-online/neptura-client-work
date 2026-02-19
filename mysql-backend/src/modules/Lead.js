import { db } from "../db/db.js";

export const Lead = {
  create: async (data) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [result] = await conn.query(
        `
        INSERT INTO leads
        (name,email,phone,industry,message,lpurl,formID,leadType)
        VALUES (?,?,?,?,?,?,?,?)
        `,
        [
          data.name,
          data.email,
          data.phone,
          data.industry,
          data.message,
          data.lpurl,
          data.formID,
          data.leadType || "MainLead",
        ]
      );

      const leadId = result.insertId;

      if (data.tracking) {
        for (const key in data.tracking) {
          await conn.query(
            `
            INSERT INTO lead_tracking
            (leadId,tkey,tvalue)
            VALUES (?,?,?)
            `,
            [leadId, key, data.tracking[key]]
          );
        }
      }

      await conn.commit();

      return {
        _id: String(leadId),
        ...data,
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  find: async () => {
    const [leads] = await db.query(`
    SELECT * FROM leads
    ORDER BY createdAt DESC
  `);

    if (!leads.length) return [];

    const leadIds = leads.map((l) => l._id);

    const placeholders = leadIds.map(() => "?").join(",");

    const [trackingRows] = await db.query(
      `
    SELECT * FROM lead_tracking
    WHERE leadId IN (${placeholders})
  `,
      leadIds
    );

    const trackingMap = {};

    for (const t of trackingRows) {
      if (!trackingMap[t.leadId]) trackingMap[t.leadId] = {};

      trackingMap[t.leadId][t.tkey] = t.tvalue;
    }

    return leads.map((l) => ({
      _id: String(l._id),
      name: l.name,
      email: l.email,
      phone: l.phone,
      industry: l.industry,
      message: l.message,
      lpurl: l.lpurl,
      formID: l.formID,
      leadType: l.leadType,
      createdAt: l.createdAt,
      tracking: trackingMap[l._id] || {},
    }));
  },
  findByIdAndDelete: async (id) => {
    await db.query("DELETE FROM leads WHERE _id=?", [id]);
  },

  deleteMany: async (ids) => {
    const placeholders = ids.map(() => "?").join(",");
    await db.query(`DELETE FROM leads WHERE _id IN (${placeholders})`, ids);
  },
};
