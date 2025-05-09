import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="mb-8">
        <img src="/404-not-found.png" alt="404 Not Found" className="mx-auto h-40 w-40" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/explore" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Explore Repositories
          </Link>
        </Button>
      </div>
    </div>
  )
}
