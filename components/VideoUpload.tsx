"use client";

import { useRef, useState } from "react";
import { FileVideoCameraIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ✅ Make sure you're importing correctly

interface VideoUploadProps {
  onVideoSelect: (file: File | null) => void;
  selectedVideo: File | null;
}

export function VideoUpload({
  onVideoSelect,
  selectedVideo,
}: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("video/")) {
      onVideoSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const clearVideo = () => {
    onVideoSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!selectedVideo ? (
          <motion.div
            key="upload-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
              ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/30 hover:bg-muted/40"
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                animate={{ scale: isDragOver ? 1.1 : 1 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Upload className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  Drag & drop your video
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  MP4, WebM and more supported
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <Card key="file-info" className="border border-border shadow-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileVideoCameraIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {selectedVideo.name}
                      </p>
                      <Badge className="text-xs" variant="destructive">
                        {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearVideo}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <video
                  src={URL.createObjectURL(selectedVideo)}
                  controls
                  className="w-full rounded-lg"
                />
              </CardContent>
            </motion.div>
          </Card>
        )}
      </AnimatePresence>
    </div>
  );
}
