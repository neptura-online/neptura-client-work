import { db } from "./db.js";

export const resetTables = async () => {
  console.log("⚠️ RESETTING DATABASE");

  // -----------------------------
  // CHILD TABLES FIRST
  // -----------------------------

  await db.query(`DROP TABLE IF EXISTS lead_tracking`);
  await db.query(`DROP TABLE IF EXISTS partiallead_tracking`);
  await db.query(`DROP TABLE IF EXISTS sheet_mapping_fields`);

  // -----------------------------
  // PARENT TABLES
  // -----------------------------

  await db.query(`DROP TABLE IF EXISTS leads`);
  await db.query(`DROP TABLE IF EXISTS partialleads`);
  await db.query(`DROP TABLE IF EXISTS sheet_mappings`);
  await db.query(`DROP TABLE IF EXISTS tracking_fields`);

  console.log("🔥 ALL TABLES DROPPED SUCCESSFULLY");
};
