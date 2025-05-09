"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RepoCard, type RepoCardProps } from "@/components/repo-card"
import { Sparkles, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

interface Message {
  role: "user" | "assistant"
  content: string
  repos?: RepoCardProps[]
}

export function ExploreAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you discover GitHub repositories. Ask me about specific technologies, compare tools, or get recommendations based on your interests.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: "",
        repos: [],
      }

      // Simple keyword matching for demo purposes
      const inputLower = input.toLowerCase()

      if (inputLower.includes("react") && inputLower.includes("vs") && inputLower.includes("vue")) {
        aiResponse.content =
          "React and Vue are both popular frontend frameworks with different philosophies. React, developed by Facebook, uses a virtual DOM and JSX syntax. Vue, created by Evan You, offers a more approachable learning curve with HTML templates. React has a larger ecosystem and community, while Vue is praised for its simplicity and elegant API."
        aiResponse.repos = [mockRepos[1]] // React
      } else if (inputLower.includes("best") && inputLower.includes("auth")) {
        aiResponse.content =
          "For authentication in modern web applications, several libraries stand out. NextAuth.js is excellent for Next.js applications, providing built-in support for many OAuth providers. Auth0 offers a comprehensive solution with features like social login, MFA, and user management. Firebase Authentication is great for quick implementation with Google's infrastructure."
        aiResponse.repos = mockRepos.filter((r) => r.topics.includes("react")).slice(0, 2)
      } else if (inputLower.includes("tailwind") || inputLower.includes("css framework")) {
        aiResponse.content =
          "Tailwind CSS is a utility-first CSS framework that has gained massive popularity. It provides low-level utility classes that let you build custom designs without leaving your HTML. Unlike Bootstrap or Bulma, Tailwind doesn't provide pre-designed components, giving you more flexibility but requiring more markup."
        aiResponse.repos = [mockRepos[2]] // Tailwind
      } else if (inputLower.includes("ai") || inputLower.includes("llm") || inputLower.includes("language model")) {
        aiResponse.content =
          "For building applications with Large Language Models (LLMs), LangChain has emerged as a popular framework. It provides tools for chaining together different LLM calls and integrating with various data sources and APIs."
        aiResponse.repos = [mockRepos[3]] // LangChain
      } else if (inputLower.includes("ui") || inputLower.includes("component")) {
        aiResponse.content =
          "For React UI components, shadcn/ui offers a collection of beautifully designed, accessible components built with Radix UI primitives and styled with Tailwind CSS. Unlike traditional component libraries, shadcn/ui components are meant to be copied into your project, giving you full control over the code."
        aiResponse.repos = [mockRepos[4]] // shadcn/ui
      } else if (inputLower.includes("next.js") || inputLower.includes("nextjs")) {
        aiResponse.content =
          "Next.js is a React framework that enables server-side rendering, static site generation, and other performance optimizations. It's maintained by Vercel and has become the standard approach for building production React applications."
        aiResponse.repos = [mockRepos[0]] // Next.js
      } else {
        aiResponse.content = "Based on your interests, here are some popular repositories you might find useful:"
        aiResponse.repos = mockRepos.slice(0, 3)
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      setInput("")
    }, 1500)
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6 overflow-hidden border border-border/40">
        <CardHeader className="px-6">
          <CardTitle>AI-Powered Explore Assistant</CardTitle>
          <CardDescription>Ask me anything about GitHub repositories, frameworks, libraries, or tools.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-6 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[90%] sm:max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="flex-shrink-0 mr-2">
                      {message.role === "assistant" ? (
                        <Avatar className="rounded-md">
                          <AvatarImage src="/ai-assistant-concept.png" />
                          <AvatarFallback className="rounded-md">AI</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="rounded-md">
                          <AvatarImage src="/abstract-geometric-shapes.png" />
                          <AvatarFallback className="rounded-md">U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground ml-2" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.repos && message.repos.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {message.repos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex max-w-[80%]">
                  <div className="flex-shrink-0 mr-2">
                    <Avatar className="rounded-md">
                      <AvatarImage src="/ai-assistant-concept.png" />
                      <AvatarFallback className="rounded-md">AI</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              placeholder="Ask about repositories, compare tools, or get recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Sparkles className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setInput("What's the difference between React and Vue?")}>
            Compare React vs Vue
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("Best auth libraries for Next.js?")}>
            Best auth libraries
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("Tell me about Tailwind CSS")}>
            About Tailwind CSS
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("Recommend AI/LLM libraries")}>
            AI/LLM libraries
          </Button>
        </div>
      </div>
    </div>
  )
}
