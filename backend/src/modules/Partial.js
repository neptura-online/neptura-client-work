import mongoose from "mongoose";

const partialLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    industry: { type: String },
    leadType: { type: String, default: "MainLead" },
    message: { type: String },

    tracking: {
      type: Map,
      of: String,
      default: {},
    },

    lpurl: { type: String },
    formID: { type: String },
  },
  { timestamps: true }
);

export const PartialLead = mongoose.model("Partiallead", partialLeadSchema);
