"use client";

import dynamic from "next/dynamic";

// Dynamically import CodeFeed with fallback
const CodeFeed = dynamic(
  () => import("@/components/code-feed").then((mod) => mod.CodeFeed),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-muted p-4"
          ></div>
        ))}
      </div>
    ),
  }
);

export default function FeedPage() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      <CodeFeed />
    </div>
  );
}
