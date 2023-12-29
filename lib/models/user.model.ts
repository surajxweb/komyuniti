import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  link: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  onboarded: { type: Boolean, default: false },
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  locationOfUser: { type: String },
  joinedAt: { type: Date, default: Date.now },

  //more field for future use
  hasPaid: { type: Boolean, default: false },
  dob: { type: Date, default: Date.now },
  preferences: {
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },
  },
  accountStatus: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
  },
  phoneOfUser: { type: String, unique: true },
  emailOfUser: { type: String, unique: true },
  termsOfServiceAgreed: { type: Boolean, default: false },
  customFields: [
    {
      key: { type: String },
      value: { type: mongoose.Schema.Types.Mixed },
    },
  ],
  visibility: { type: String, enum: ["private", "public"], default: "public" },
});

// Index on username for quick lookups
userSchema.index({ username: 1 }, { unique: true });

// Index on id for quick lookups
userSchema.index({ id: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
