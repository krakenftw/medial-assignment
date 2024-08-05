"use server";

import { v4 as uuidv4 } from "uuid";
import { generateOgImage } from "./generateImage";
import { Post } from "@/schema/post";
import connectMongo from "@/lib/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const id = uuidv4();
  await connectMongo();

  try {
    await generateOgImage(title, content, id);

    const post = new Post({
      _id: id,
      title,
      content,
      createdAt: new Date(),
    });

    await post.save();

    return { success: true, id };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}
