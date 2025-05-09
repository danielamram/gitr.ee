"use client";

import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
}
