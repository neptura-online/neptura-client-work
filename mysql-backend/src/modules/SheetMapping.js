import { db } from "../db/db.js";

export const SheetMapping = {
  create: async (data) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [result] = await conn.query(
        `
        INSERT INTO sheet_mappings
        (formID,page,spreadsheetId,sheetName,isActive)
        VALUES (?,?,?,?,?)
      `,
        [
          data.formID || null,
          data.page || null,
          data.spreadsheetId,
          data.sheetName,
          data.isActive ? 1 : 0,
        ]
      );

      const mappingId = result.insertId;

      for (const field of data.fields) {
        await conn.query(
          `
          INSERT INTO sheet_mapping_fields
          (mappingId,leadField,fieldOrder)
          VALUES (?,?,?)
        `,
          [mappingId, field.leadField, field.order]
        );
      }

      await conn.commit();

      return { _id: mappingId };
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
        m.*,
        f.leadField,
        f.fieldOrder
      FROM sheet_mappings m
      LEFT JOIN sheet_mapping_fields f
      ON m._id = f.mappingId
      ORDER BY m._id DESC, f.fieldOrder ASC
    `);

    const result = [];

    for (const r of rows) {
      let mapping = result.find((x) => x._id == r._id);

      if (!mapping) {
        mapping = {
          _id: r._id,
          formID: r.formID,
          page: r.page,
          spreadsheetId: r.spreadsheetId,
          sheetName: r.sheetName,
          isActive: Boolean(r.isActive),
          fields: [],
        };

        result.push(mapping);
      }

      if (r.leadField) {
        mapping.fields.push({
          leadField: r.leadField,
          order: r.fieldOrder,
        });
      }
    }

    return result;
  },

  update: async (id, data) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      await conn.query(
        `
        UPDATE sheet_mappings
        SET formID=?,page=?,spreadsheetId=?,sheetName=?,isActive=?
        WHERE _id=?
      `,
        [
          data.formID || null,
          data.page || null,
          data.spreadsheetId,
          data.sheetName,
          data.isActive ? 1 : 0,
          id,
        ]
      );

      await conn.query(`DELETE FROM sheet_mapping_fields WHERE mappingId=?`, [
        id,
      ]);

      for (const field of data.fields) {
        await conn.query(
          `
          INSERT INTO sheet_mapping_fields
          (mappingId,leadField,fieldOrder)
          VALUES (?,?,?)
        `,
          [id, field.leadField, field.order]
        );
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  toggle: async (id, isActive) => {
    await db.query(`UPDATE sheet_mappings SET isActive=? WHERE _id=?`, [
      isActive ? 1 : 0,
      id,
    ]);
  },

  delete: async (id) => {
    await db.query(`DELETE FROM sheet_mappings WHERE _id=?`, [id]);
  },
};
