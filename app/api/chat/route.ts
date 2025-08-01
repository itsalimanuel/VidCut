import { NextRequest, NextResponse } from "next/server";
import { handleVideoProcessing } from "@/lib/videoProcessor";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("video") as File;
    const prompt = formData.get("prompt") as string;

    if (!file || !prompt) {
      return NextResponse.json(
        { error: "Missing file or prompt" },
        { status: 400 },
      );
    }

    const { base64Video, size } = await handleVideoProcessing(file, prompt);

    return NextResponse.json({
      message: "✅ Video processed successfully.",
      video: base64Video,
      size,
    });
  } catch (err: any) {
    console.error("❌ Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
};
