import mongoose, { model, Schema } from "mongoose";

const postSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
