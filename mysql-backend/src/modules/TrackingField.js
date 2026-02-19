import { db } from "../db/db.js";

export const TrackingField = {
  find: async () => {
    const [rows] = await db.query(`
      SELECT * FROM tracking_fields
      ORDER BY createdAt DESC
    `);

    return rows.map((r) => ({
      _id: String(r._id),
      key: r.key,
      isActive: !!r.isActive,
    }));
  },

  create: async (data) => {
    const [result] = await db.query(
      `
      INSERT INTO tracking_fields (\`key\`)
      VALUES (?)
    `,
      [data.key]
    );

    return {
      _id: String(result.insertId),
      key: data.key,
      isActive: true,
    };
  },

  toggle: async (id, isActive) => {
    await db.query(
      `
      UPDATE tracking_fields
      SET isActive=?
      WHERE _id=?
    `,
      [isActive ? 1 : 0, id]
    );
  },

  delete: async (id) => {
    await db.query(
      `
      DELETE FROM tracking_fields
      WHERE _id=?
    `,
      [id]
    );
  },
};
