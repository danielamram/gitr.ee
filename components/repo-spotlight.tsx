"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RepoCard, type RepoCardProps } from "@/components/repo-card"
import {
  Star,
  Share2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Code,
  FileText,
  Info,
  CheckCircle,
  XCircle,
  TypeIcon as FunctionIcon,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { FunctionExplorer } from "@/components/function-explorer"

interface RepoSpotlightProps {
  repo: RepoCardProps & {
    fullDescription: string
    aiAnalysis: {
      whatItIs: string
      whoItsFor: string
      prosAndCons: {
        pros: string[]
        cons: string[]
      }
      whyItMatters: string
    }
    relatedRepos: string[]
  }
}

// Mock data for repositories (same as in feed.tsx)
const mockRepos = [
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

export function RepoSpotlight({ repo }: RepoSpotlightProps) {
  const [isStarred, setIsStarred] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const isMobile = useMobile()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const relatedReposData = repo.relatedRepos
    .map((id) => mockRepos.find((r) => r.id === id))
    .filter(Boolean) as RepoCardProps[]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm hover:text-foreground/80 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to feed
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 rounded-md">
              <AvatarImage src={repo.owner.avatar_url || "/placeholder.svg"} alt={repo.owner.login} />
              <AvatarFallback className="rounded-md">{repo.owner.login.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center flex-wrap">
                <span className="font-medium text-muted-foreground">{repo.owner.login}</span>
                <span className="mx-1 text-muted-foreground">/</span>
                <h1 className="text-xl font-bold">{repo.name}</h1>
              </div>
              <div className="flex items-center text-sm text-muted-foreground flex-wrap gap-2">
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {repo.stars.toLocaleString()}
                </span>
                <span className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    ></path>
                  </svg>
                  {repo.forks.toLocaleString()}
                </span>
                <span>Updated on {formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsStarred(!isStarred)}
            className={isStarred ? "text-yellow-500 border-yellow-500" : ""}
          >
            <Star className="h-4 w-4 mr-2" fill={isStarred ? "currentColor" : "none"} />
            {isStarred ? "Starred" : "Star"}
          </Button>
          <Button variant="outline" onClick={() => setIsSaved(!isSaved)}>
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 mr-2" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {repo.topics.map((topic) => (
          <Badge key={topic} variant="outline" className="rounded-md">
            {topic}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Info</span>
          </TabsTrigger>
          <TabsTrigger value="readme" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            README
          </TabsTrigger>
          <TabsTrigger value="functions" className="flex items-center">
            <FunctionIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Functions</span>
            <span className="sm:hidden">Func</span>
          </TabsTrigger>
          <TabsTrigger value="ai-analysis" className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">AI Analysis</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
          <TabsTrigger value="discussion" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Discussion</span>
            <span className="sm:hidden">Chat</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="border border-border/40">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="mb-4">{repo.description}</p>
                  <div className="text-sm font-medium mb-4">{repo.aiSummary}</div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span className="flex items-center mr-4">
                      <span className="w-3 h-3 rounded-full bg-foreground/80 mr-1"></span>
                      {repo.language}
                    </span>
                    <span className="flex items-center mr-4">
                      <Star className="h-3 w-3 mr-1" />
                      {repo.stars.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        ></path>
                      </svg>
                      {repo.forks.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">What it is</h3>
                    <p>{repo.aiAnalysis.whatItIs}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Who it's for</h3>
                    <p>{repo.aiAnalysis.whoItsFor}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Why it matters</h3>
                    <p>{repo.aiAnalysis.whyItMatters}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Preview</h2>
                <div className="rounded-lg overflow-hidden border border-border/40">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=400&width=800&query=${repo.name} screenshot`}
                    alt={`${repo.name} preview`}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div>
              <Card className="mb-6 border border-border/40">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Pros & Cons</h2>
                  <div className="mb-4">
                    <h3 className="font-semibold text-green-500 flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Pros
                    </h3>
                    <ul className="space-y-2">
                      {repo.aiAnalysis.prosAndCons.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-500 flex items-center mb-2">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cons
                    </h3>
                    <ul className="space-y-2">
                      {repo.aiAnalysis.prosAndCons.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/40">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Try it out</h2>
                  <p className="text-sm mb-4">
                    Experiment with this library in an online playground without any setup.
                  </p>
                  <Button className="w-full mb-2">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in StackBlitz
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="readme" className="mt-6">
          <Card className="border border-border/40">
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
                <div className="whitespace-pre-line">{repo.fullDescription}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functions" className="mt-6">
          <FunctionExplorer />
        </TabsContent>

        <TabsContent value="ai-analysis" className="mt-6">
          <Card className="border border-border/40">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">AI Analysis</h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">What it is</h3>
                <p>{repo.aiAnalysis.whatItIs}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Who it's for</h3>
                <p>{repo.aiAnalysis.whoItsFor}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Pros & Cons</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-green-500 flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {repo.aiAnalysis.prosAndCons.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-500 flex items-center mb-2">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {repo.aiAnalysis.prosAndCons.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Why it matters</h3>
                <p>{repo.aiAnalysis.whyItMatters}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="mt-6">
          <Card className="border border-border/40">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Discussion</h2>
              <p className="text-muted-foreground mb-4">
                Join the conversation about {repo.name}. Ask questions, share your experiences, or provide feedback.
              </p>

              <div className="mb-6">
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-md bg-background"
                  placeholder={`What are your thoughts on ${repo.name}?`}
                />
                <div className="flex justify-end mt-2">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>

              <div className="text-center text-muted-foreground">
                <p>No comments yet. Be the first to start the discussion!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {relatedReposData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Related Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedReposData.map((relatedRepo) => (
              <RepoCard key={relatedRepo.id} repo={relatedRepo} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
