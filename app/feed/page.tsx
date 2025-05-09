"use client";

import { useAuth } from "@/lib/auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect } from "react";

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
  const { user, loading } = useAuth();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      <CodeFeed />
    </div>
  );
}
