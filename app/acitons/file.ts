"use server";
import path from "node:path";
import * as fs from "node:fs";

export const uploadFile = async (formData: FormData) => {
  const file = formData.get("file") as File | null;
  const filename = formData.get("filename") as string;

  if (!file || !filename) {
    return { message: "No file or filename found", status: false };
  }

  const uploadDir = path.join(process.cwd(), "/public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    const filePath = path.join(uploadDir, filename);
    const writeStream = fs.createWriteStream(filePath);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    writeStream.write(buffer);
    writeStream.end();

    return {
      message: "File uploaded successfully",
      path: `/uploads/${filename}`,
      status: true,
    };
  } catch (e: any) {
    return { message: "Error uploading file", error: e.message, status: false };
  }
};
