import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
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
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
