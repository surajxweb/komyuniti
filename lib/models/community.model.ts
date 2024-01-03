import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  themeColor: { type: String, default: "#586aea", required: true },
  description: { type: String, maxlength: 500 },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  memberRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },
  // Additional fields for future use
  // categories: [{ type: String }],
  // rules: { type: String },
  // tags: [{ type: String }],
  header_image: { type: String },
  bio: String,
});

// Index on name for quick lookups
communitySchema.index({ name: 1 }, { unique: true });

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
