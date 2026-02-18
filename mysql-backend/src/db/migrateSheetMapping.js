import { db } from "./db.js";

export const migrateSheetMapping = async () => {
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

  console.log("Sheet Mapping Tables Ready");
};
