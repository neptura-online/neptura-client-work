import { db } from "../db/db.js";

export const PartialLead = {
  create: async (data) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [result] = await conn.query(
        `
        INSERT INTO partialleads
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
          "PartialLead",
        ]
      );

      const leadId = result.insertId;

      // 🔥 dynamic tracking insert
      if (data.tracking) {
        for (const key in data.tracking) {
          await conn.query(
            `
            INSERT INTO partiallead_tracking
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
    const [rows] = await db.query(`
      SELECT
        l.*,
        t.tkey,
        t.tvalue
      FROM partialleads l
      LEFT JOIN partiallead_tracking t
      ON l._id = t.leadId
      ORDER BY l._id DESC
    `);

    const result = [];

    for (const r of rows) {
      let lead = result.find((x) => x._id == r._id);

      if (!lead) {
        lead = {
          _id: String(r._id),
          name: r.name,
          email: r.email,
          phone: r.phone,
          industry: r.industry,
          message: r.message,
          lpurl: r.lpurl,
          formID: r.formID,
          leadType: r.leadType,
          createdAt: r.createdAt,
          tracking: {},
        };

        result.push(lead);
      }

      if (r.tkey) {
        lead.tracking[r.tkey] = r.tvalue;
      }
    }

    return result;
  },

  findByIdAndDelete: async (id) => {
    await db.query(`DELETE FROM partialleads WHERE _id=?`, [id]);
  },

  deleteMany: async (ids) => {
    const placeholders = ids.map(() => "?").join(",");
    await db.query(
      `DELETE FROM partialleads WHERE _id IN (${placeholders})`,
      ids
    );
  },
};
