"use client";
import type React from "react";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
  disabled: boolean;
}

export function ChatInput({ onSend, loading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || loading || disabled) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 z-10">
      <div className="p-6 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="bg-input-container hover:bg-input-container-hover transition-colors duration-200 rounded-2xl border border-border/50 shadow-lg">
            <div className="p-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      disabled
                        ? "Upload a video to start..."
                        : "Ask VidCut to edit your video..."
                    }
                    className="min-h-[60px] max-h-[120px] resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground p-0"
                    disabled={disabled || loading}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSend}
                    variant={"default"}
                    disabled={!message.trim() || loading || disabled}
                    className="h-10 w-10 p-0 bg-black text-white hover:shadow-[var(--shadow-glow)] transition-all duration-200 rounded-xl"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {disabled && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              Upload a video file to start analyzing it with AI
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
