import connectMongo from "@/lib/db";
import { Post } from "@/schema/post";
import { promises as fs } from "fs";

export const getPostData = async (id: string) => {
  await connectMongo();
  const postData = await Post.findOne({ _id: id });
  return postData;
};
