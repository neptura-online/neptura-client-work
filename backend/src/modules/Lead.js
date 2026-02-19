import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    industry: { type: String, required: true },
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

export const Lead = mongoose.model("lead", leadSchema);
