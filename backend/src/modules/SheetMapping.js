import mongoose from "mongoose";

const SheetMappingSchema = new mongoose.Schema({
  formID: {
    type: String,
    default: null,
  },

  page: {
    type: String,
    default: null,
  },

  spreadsheetId: String,
  sheetName: String,

  isActive: {
    type: Boolean,
    default: false,
  },

  fields: [
    {
      leadField: String,
      order: Number,
    },
  ],
});

export const SheetMapping = mongoose.model("SheetMapping", SheetMappingSchema);
