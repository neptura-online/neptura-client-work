import { db } from "./db.js";

export const migrateAll = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS leads (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      industry VARCHAR(255) NOT NULL,
      message TEXT,
      lpurl TEXT,
      formID VARCHAR(255),
      leadType VARCHAR(100) DEFAULT 'MainLead',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS lead_tracking (
      id INT AUTO_INCREMENT PRIMARY KEY,
      leadId INT,
      tkey VARCHAR(100),
      tvalue TEXT,
      FOREIGN KEY (leadId)
      REFERENCES leads(_id)
      ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS partialleads (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      industry VARCHAR(255),
      message TEXT,
      lpurl TEXT,
      formID VARCHAR(255),
      leadType VARCHAR(100) DEFAULT 'PartialLead',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS partiallead_tracking (
      id INT AUTO_INCREMENT PRIMARY KEY,
      leadId INT,
      tkey VARCHAR(100),
      tvalue TEXT,
      FOREIGN KEY (leadId)
      REFERENCES partialleads(_id)
      ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sheet_mappings (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      formID VARCHAR(255) DEFAULT NULL,
      page VARCHAR(255) DEFAULT NULL,
      spreadsheetId VARCHAR(255) NOT NULL,
      sheetName VARCHAR(255) NOT NULL,
      isActive BOOLEAN DEFAULT FALSE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sheet_mapping_fields (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mappingId INT,
      leadField VARCHAR(255),
      fieldOrder INT,
      FOREIGN KEY (mappingId)
      REFERENCES sheet_mappings(_id)
      ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS tracking_fields (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      \`key\` VARCHAR(100) UNIQUE NOT NULL,
      isActive BOOLEAN DEFAULT TRUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ All Tables Ready");
};
