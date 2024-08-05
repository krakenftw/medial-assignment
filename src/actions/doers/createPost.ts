"use server";

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { generateOgImage } from "./generateImage";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const id = uuidv4();
  const post = {
    id,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  const dataFilePath = path.join(process.cwd(), "data.json");

  try {
    let posts = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, "utf8");
      posts = JSON.parse(fileContents);
    } catch (error) {}

    posts[id] = post;

    await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));

    await generateOgImage(id);

    return { success: true, id };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}
