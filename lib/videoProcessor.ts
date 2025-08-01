import path from "path";
import crypto from "crypto";
import { spawn } from "child_process";
import { writeFile, readFile, stat, unlink } from "fs/promises";
import { existsSync } from "fs";
import { getFFmpegCommandFromPrompt } from "./openai";

export const handleVideoProcessing = async (file: File, prompt: string) => {
  const id = crypto.randomUUID();
  const tempDir = "/tmp";
  const inputPath = path.join(tempDir, `${id}-input.mp4`);
  const outputPath = path.join(tempDir, `${id}-output.mp4`);

  const bytes = await file.arrayBuffer();
  await writeFile(inputPath, Buffer.from(bytes));

  const ffmpegCommand = await getFFmpegCommandFromPrompt(
    prompt,
    inputPath,
    outputPath,
  );
  await runFFmpeg(ffmpegCommand);

  if (!existsSync(outputPath)) {
    throw new Error("Output video not found");
  }

  const base64Video = await readFile(outputPath).then((data) =>
    data.toString("base64"),
  );
  const stats = await stat(outputPath);

  await unlink(inputPath);
  await unlink(outputPath);

  return { base64Video, size: stats.size };
};

const runFFmpeg = (command: string) => {
  return new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");

    const ffmpeg = spawn(cmd, args);
    ffmpeg.stdout.on("data", (data) => console.log("stdout:", data.toString()));
    ffmpeg.stderr.on("data", (data) =>
      console.error("stderr:", data.toString()),
    );

    ffmpeg.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });

    ffmpeg.on("error", (err) => {
      reject(new Error(`Failed to run ffmpeg: ${err.message}`));
    });
  });
};
