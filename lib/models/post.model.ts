import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: { type: String, maxlength: 500 }, // Common field for text, caption, or question
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  postType: {
    type: String,
    enum: ["text", "image", "video", "poll"],
    default: "text",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isEdited: { type: Boolean, default: false, index: true }, // Index on isEdited for quick lookups
  postVisibility: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },

  // Conditional fields based on postType
  media: { type: String }, // URL for image or video
  options: {
    option1: {
      text: { type: String },
      votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    option2: {
      text: { type: String },
      votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    option3: {
      text: { type: String },
      votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    option4: {
      text: { type: String },
      votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
});

// Index on author for fetching posts by author
postSchema.index({ author: 1 });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
