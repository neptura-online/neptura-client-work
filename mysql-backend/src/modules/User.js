import { db } from "../db/db.js";

export const User = {
  create: async (data) => {
    const sql = `
      INSERT INTO users (name,email,phone,password,role,roleAssignedBy)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [res] = await db.query(sql, [
      data.name,
      data.email,
      data.phone,
      data.password,
      data.role,
      data.roleAssignedBy,
    ]);
    return { _id: res.insertId, ...data }; // 🔥 important
  },

  findOne: async (filter) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      filter.email,
    ]);
    return rows[0];
  },

  find: async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows.map((r) => ({ ...r, _id: String(r._id) }));
  },

  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE _id = ?", [id]);
    const user = rows[0];
    return user ? { ...user, _id: String(user._id) } : null;
  },

  findByIdAndUpdate: async (id, data) => {
    await db.query(
      "UPDATE users SET name=?, email=?, phone=?, role=? WHERE _id=?",
      [data.name, data.email, data.phone, data.role, id]
    );
    return await User.findById(id);
  },

  findByIdAndDelete: async (id) => {
    await db.query("DELETE FROM users WHERE _id = ?", [id]);
  },
};
