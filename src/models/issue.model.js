import mongoose, { Schema } from "mongoose";

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "under_review", "resolving", "resolved", "spam", "closed"],
      default: "open",
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" }, // [lng, lat]
    },
    address: String,
    images: [
      {
        fileId: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    // comments and upvotes can be added later as separate models
    // create zod schemas
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;
