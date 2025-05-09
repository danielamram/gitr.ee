import { ExploreAssistant } from "@/components/explore-assistant"

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore GitHub Repositories</h1>
        <ExploreAssistant />
      </main>
    </div>
  )
}
