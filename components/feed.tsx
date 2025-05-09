"use client"

import { useState, useEffect } from "react"
import { RepoCard, type RepoCardProps } from "@/components/repo-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Clock, Flame, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for repositories
const mockRepos: RepoCardProps[] = [
  {
    id: "1",
    name: "next.js",
    owner: {
      login: "vercel",
      avatar_url: "/vercel-logo.png",
    },
    description: "The React Framework for the Web",
    aiSummary:
      "Production-grade React framework with hybrid static & server rendering, TypeScript support, and route pre-fetching.",
    language: "TypeScript",
    stars: 112000,
    forks: 24500,
    updated_at: "2023-05-01T12:00:00Z",
    topics: ["react", "nextjs", "javascript", "typescript", "framework", "ssr", "static-site-generator"],
  },
  {
    id: "2",
    name: "react",
    owner: {
      login: "facebook",
      avatar_url: "/facebook-logo.png",
    },
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    aiSummary: "The most popular JavaScript library for building interactive UIs with a component-based architecture.",
    language: "JavaScript",
    stars: 210000,
    forks: 43000,
    updated_at: "2023-04-28T10:30:00Z",
    topics: ["javascript", "library", "react", "frontend", "ui"],
  },
  {
    id: "3",
    name: "tailwindcss",
    owner: {
      login: "tailwindlabs",
      avatar_url: "/tailwind-logo.png",
    },
    description: "A utility-first CSS framework for rapid UI development.",
    aiSummary:
      "Highly customizable, low-level CSS framework that gives you all the building blocks you need to build designs.",
    language: "CSS",
    stars: 71000,
    forks: 3600,
    updated_at: "2023-04-30T15:45:00Z",
    topics: ["css", "framework", "responsive", "utility-first", "design"],
  },
  {
    id: "4",
    name: "langchain",
    owner: {
      login: "langchain-ai",
      avatar_url: "/langchain-logo.png",
    },
    description: "Building applications with LLMs through composability",
    aiSummary: "Framework for developing applications powered by language models with components for LLM integrations.",
    language: "TypeScript",
    stars: 65000,
    forks: 9200,
    updated_at: "2023-05-02T09:15:00Z",
    topics: ["ai", "llm", "nlp", "machine-learning", "typescript", "python"],
  },
  {
    id: "5",
    name: "shadcn-ui",
    owner: {
      login: "shadcn",
      avatar_url: "/abstract-geometric-logo.png",
    },
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    aiSummary: "Accessible and customizable React components that you can copy and paste into your apps.",
    language: "TypeScript",
    stars: 45000,
    forks: 2800,
    updated_at: "2023-04-29T14:20:00Z",
    topics: ["react", "components", "ui", "tailwindcss", "radix-ui", "design-system"],
  },
]

export function Feed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "card">("list")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isMobile = useMobile()

  // Get the appropriate repos based on the active tab
  const getReposForTab = () => {
    switch (activeTab) {
      case "for-you":
        return mockRepos
      case "trending":
        return [...mockRepos].reverse()
      case "recent":
        return [...mockRepos].sort(() => Math.random() - 0.5)
      default:
        return mockRepos
    }
  }

  const repos = getReposForTab()

  const loadMoreRepos = () => {
    setIsLoading(true)
    // Simulate loading more repositories
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x < -threshold) {
      // Swiped left
      if (currentCardIndex < repos.length - 1) {
        setDirection(1)
        setCurrentCardIndex(currentCardIndex + 1)
      }
    } else if (info.offset.x > threshold) {
      // Swiped right
      if (currentCardIndex > 0) {
        setDirection(-1)
        setCurrentCardIndex(currentCardIndex - 1)
      }
    }
  }

  const nextCard = () => {
    if (currentCardIndex < repos.length - 1) {
      setDirection(1)
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setDirection(-1)
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  // Auto-switch to card view on mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode("card")
    } else {
      setViewMode("list")
    }
  }, [isMobile])

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="for-you" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="for-you" className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            For You
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center">
            <Flame className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </TabsTrigger>
        </TabsList>

        {!isMobile && (
          <div className="flex justify-end mt-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List View
              </Button>
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("card")}
              >
                Card View
              </Button>
            </div>
          </div>
        )}

        <TabsContent value="for-you" className="mt-4">
          {viewMode === "list" ? (
            // List view
            <div>
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            // Card view (swipeable)
            <div className="relative h-[500px] overflow-hidden touch-none">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentCardIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction < 0 ? 300 : -300, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                >
                  <div className="w-full max-w-md px-4">
                    <RepoCard repo={repos[currentCardIndex]} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls for card view */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="flex items-center text-sm">
                  {currentCardIndex + 1} / {repos.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextCard}
                  disabled={currentCardIndex === repos.length - 1}
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Swipe instruction for mobile */}
              {isMobile && (
                <div className="absolute top-2 left-0 right-0 text-center text-sm text-muted-foreground">
                  Swipe to browse repositories
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="mt-4">
          {viewMode === "list" ? (
            <div>
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="relative h-[500px] overflow-hidden touch-none">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentCardIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction < 0 ? 300 : -300, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                >
                  <div className="w-full max-w-md px-4">
                    <RepoCard repo={repos[currentCardIndex]} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls for card view */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="flex items-center text-sm">
                  {currentCardIndex + 1} / {repos.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextCard}
                  disabled={currentCardIndex === repos.length - 1}
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Swipe instruction for mobile */}
              {isMobile && (
                <div className="absolute top-2 left-0 right-0 text-center text-sm text-muted-foreground">
                  Swipe to browse repositories
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          {viewMode === "list" ? (
            <div>
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="relative h-[500px] overflow-hidden touch-none">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentCardIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction < 0 ? 300 : -300, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                >
                  <div className="w-full max-w-md px-4">
                    <RepoCard repo={repos[currentCardIndex]} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls for card view */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="flex items-center text-sm">
                  {currentCardIndex + 1} / {repos.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextCard}
                  disabled={currentCardIndex === repos.length - 1}
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Swipe instruction for mobile */}
              {isMobile && (
                <div className="absolute top-2 left-0 right-0 text-center text-sm text-muted-foreground">
                  Swipe to browse repositories
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {viewMode === "list" && (
        <div className="flex justify-center my-6">
          <Button onClick={loadMoreRepos} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
