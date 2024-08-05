import { supabase } from "@/lib/supabase";
import { createCanvas, loadImage, CanvasRenderingContext2D } from "canvas";

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  const lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + i * lineHeight);
  }
}

export async function generateOgImage(
  title: string,
  content: string,
  id: string,
) {
  try {
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.fillStyle = "#1a1a1b";
    context.fillRect(0, 0, width, height);

    const image = await loadImage(
      "https://www.getautismactive.com/wp-content/uploads/2021/01/Test-Logo-Circle-black-transparent.png",
    );
    context.drawImage(image, 50, 50, 100, 100);

    context.font = "bold 60px Inter";
    context.fillStyle = "#ffffff";
    context.textAlign = "left";
    context.textBaseline = "top";
    wrapText(context, title, 50, 180, width - 100, 70);

    context.font = "32px Inter";
    context.fillStyle = "#d7dadc";
    wrapText(
      context,
      content.substring(0, 100) + "...",
      50,
      400,
      width - 100,
      40,
    );

    context.fillStyle = "#4e4e4e";
    context.fillRect(0, height - 80, width, 80);
    context.font = "bold 32px Inter";
    context.fillStyle = "#ffffff";
    context.fillText("I will be a great intern btw!", 50, height - 50);

    const buffer = canvas.toBuffer("image/png");
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${id}.png`, buffer);

    if (error) {
      console.error("Error uploading og:image:", error);
      return null;
    }

    return data.path;
  } catch (error) {
    console.error("Error generating og:image:", error);
    return null;
  }
}
