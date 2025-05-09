"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home, MessageSquare } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="mb-8">
        <img src="/error-illustration.png" alt="Error" className="mx-auto h-40 w-40" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Something went wrong 😕</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        An error occurred in the application. A digest property is included on this error instance which may provide
        additional details about the nature of the error.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/support" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Support
          </Link>
        </Button>
      </div>
    </div>
  )
}
