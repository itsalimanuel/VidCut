# 🎬 VidCut

**VidCut** is an open-source, AI-powered video editing tool that lets you upload and edit videos directly in your browser using natural language prompts. It uses **FFmpeg** under the hood and **OpenAI GPT-4o** to generate smart video editing commands — no manual terminal work needed.

> ✂️ Compress, trim, cut, or remove watermarks from your videos — just tell VidCut what you want.

---

## 🚀 Features

- 🎥 **Drag-and-drop video upload**
- 💬 **AI prompt-based editing** (e.g., “cut from 00:10 to 00:45”, “remove watermark”)
- ⚙️ **Auto-generated FFmpeg commands** via OpenAI GPT
- 💾 **Download processed videos instantly** in your browser
- 🧩 Fully **open-source** and extendable

---

## 🧠 How It Works

1. Upload a `.mp4` video file.
2. Type a natural language prompt (e.g. "compress to 720p", "remove watermark in top right corner").
3. VidCut sends the prompt to OpenAI, which returns an FFmpeg command.
4. The command runs on the server.
5. The edited video is streamed back in your browser.

---

## 🤖 Example Prompts

- “Trim from 0:10 to 0:45”
- “Compress to 720p under 2MB”
- “Remove watermark in top right”
- “Crop to square and remove audio”
- “Extract audio only”

---

## 💡 Roadmap

- [ ] Add image input support
- [ ] Multiple export formats (GIF, WebM, MP3)
- [ ] Save/share prompt history
- [ ] Offline FFmpeg mode via WASM

---

## 🧠 Contributing

Pull requests and issues are welcome!
If you’d like to improve FFmpeg prompts, UI, or processing, feel free to open a PR.

---

## 🧑‍💻 Author

Made with ❤️ by [Ali Manuel](https://github.com/itsalimanuel)
