"use client";

import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  video?: string;
  size?: number;
  status?: "loading" | "idle";
}

export function ChatMessage({
  role,
  content,
  video,
  size,
  status = "idle",
}: ChatMessageProps) {
  const isUser = role === "user";

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`flex gap-4 px-6 py-5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
        ${isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div className={`flex-1 space-y-3 ${isUser ? "text-right" : ""}`}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className={`
            inline-block max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md
            ${
              isUser
                ? "bg-primary text-black rounded-br-md"
                : "bg-muted border border-border text-foreground rounded-bl-md"
            }
          `}
        >
          {!content ? (
            <h1>Thinking....</h1>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </motion.div>

        {video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`${isUser ? "flex justify-end" : "flex justify-start"}`}
          >
            <div className="space-y-1 max-w-md w-full">
              <video
                controls
                className="w-full rounded-xl border border-border shadow-md"
              >
                <source
                  src={`data:video/mp4;base64,${video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              {typeof size === "number" && (
                <p className="text-xs text-muted-foreground text-right pr-1">
                  File size: {formatSize(size)}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
