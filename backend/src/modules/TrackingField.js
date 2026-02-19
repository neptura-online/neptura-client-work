import mongoose from "mongoose";

const TrackingFieldSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const TrackingField = mongoose.model(
  "TrackingField",
  TrackingFieldSchema
);
