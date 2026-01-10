import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    leadType: { type: String, default: "MainLead" },
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

export const Lead = mongoose.model("lead", leadSchema);
