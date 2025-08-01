export const getFFmpegCommandFromPrompt = async (
  prompt: string,
  inputPath: string,
  outputPath: string,
): Promise<string> => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in FFmpeg. Given a user request, return a single-line FFmpeg command ONLY. No explanations, no markdown, no backticks. Use 'input.mp4' as input and 'output.mp4' as output. If using color filters, use color names like 'black', not hex values.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  const result = await response.json();
  const raw = result.choices?.[0]?.message?.content || "";

  const sanitized = raw
    .replace(/```(bash)?/g, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^ffmpeg\s+/i, "")
    .replace(/0x([0-9a-fA-F]{6})/g, "$1")
    .replace(/[“”"]/g, "")
    .trim();

  return `ffmpeg ${sanitized}`
    .replace(/input\.mp4/g, inputPath)
    .replace(/output\.mp4/g, outputPath);
};
