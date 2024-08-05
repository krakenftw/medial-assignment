import { promises as fs } from "fs";

export const getPostData = async (id: string) => {
  const data: any = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const postData = JSON.parse(data)[id];
  return postData;
};
