import mongoose from "mongoose";

const partialLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    industry: { type: String },
    leadType: { type: String, default: "PartialLead" },
    message: { type: String },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_term: { type: String },
    utm_campaign: { type: String },
    utm_content: { type: String },
    adgroupid: { type: String },
    gclid: { type: String },
    lpurl: { type: String },
    formID: { type: String },
  },
  { timestamps: true }
);

export const PartialLead = mongoose.model("Partiallead", partialLeadSchema);
