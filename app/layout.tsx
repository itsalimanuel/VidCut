import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VidCut – AI Video Editing Tool",
  description:
    "VidCut is an open-source AI-powered video editing platform that lets you compress, trim, watermark, and enhance videos effortlessly using FFmpeg and a modern UI.",
  keywords: [
    "VidCut",
    "video editing",
    "AI video editor",
    "FFmpeg",
    "open source",
    "compress video",
    "remove watermark",
    "cut video",
    "edit video online",
    "Next.js video app",
    "serverless video processing",
    "upload and edit video",
  ],
  authors: [{ name: "Ali K", url: "https://github.com/alimanuel" }],
  creator: "Ali K",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
