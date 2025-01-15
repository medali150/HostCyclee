import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the user who owns the website
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
  
);

const websiteModel = mongoose.models.website || mongoose.model("website", websiteSchema);

export default websiteModel;
