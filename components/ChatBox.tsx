"use client";
import { useState, useRef, useEffect } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
interface Message {
  role: "user" | "assistant";
  message: string;
  video?: string;
  size?: number;
  status?: "loading" | "idle";
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !video) return;

    setLoading(true);

    const newMessages: Message[] = [
      { role: "user", message: content },
      { role: "assistant", message: "", status: "loading" },
    ];

    setMessages((prev) => [...prev, ...newMessages]);

    try {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("prompt", content);

      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          message: data.message || "⚠️ No response received",
          video: data.video,
          size: typeof data.size === "number" ? data.size : undefined,
          status: "idle",
        };
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          message: "❌ Sorry, there was an error processing your request.",
          status: "idle",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.header
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-lg animate-bounce flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src="/ai.png.png"
                alt="VidCut Logo"
                width={40}
                height={40}
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold font-mono uppercase tracking-widest text-foreground">
                VidCut
              </h1>
              <p className="text-sm text-muted-foreground">
                Upload a video and chat with AI about it
              </p>
            </div>
            <div className="ml-auto">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="p-4 border-b border-border">
          <VideoUpload onVideoSelect={setVideo} selectedVideo={video} />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {messages.length === 0 ? (
            <motion.div
              className="flex-1 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Ready to Edit your video
                </h3>
                <p className="text-muted-foreground">
                  Upload a video file and start editing it.
                </p>
              </div>
            </motion.div>
          ) : (
            <ScrollArea className="flex-1">
              <AnimatePresence initial={false}>
                <motion.div
                  className="space-y-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChatMessage
                        role={msg.role}
                        status={msg.status}
                        size={msg.size}
                        content={msg.message}
                        video={msg.video}
                      />
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
          )}
        </div>
        <ChatInput onSend={sendMessage} loading={loading} disabled={!video} />
      </main>
    </div>
  );
};

export default Index;
