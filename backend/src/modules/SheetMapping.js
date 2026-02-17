import mongoose from "mongoose";

const SheetMappingSchema = new mongoose.Schema({
  formID: String,

  spreadsheetId: String,
  sheetName: String,

  isActive: {
    type: Boolean,
    default: false,
  },

  fields: [
    {
      leadField: String,
    },
  ],
});

export const SheetMapping = mongoose.model("SheetMapping", SheetMappingSchema);
