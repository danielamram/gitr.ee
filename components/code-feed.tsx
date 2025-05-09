"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Clock,
  Flame,
  Star,
  Code,
  RefreshCw,
  Filter,
  ChevronDown,
  Zap,
  Calendar,
  TrendingUp,
  Lightbulb,
  Repeat2,
  Layers,
  ArrowRight,
  Search,
  Bookmark,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AIHub } from "@/components/ai-features/ai-hub/ai-hub"
import { CodeSnippetCard } from "@/components/snippet/code-snippet-card"
// Types
interface CodeSnippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  author: {
    name: string
    username: string
    avatar: string
  }
  repository: {
    id: string
    name: string
    owner: string
    url: string
    stars: number
  }
  tags: string[]
  category: string
  timestamp: string
  likes: number
  comments: number
  isNew: boolean
  isTrending?: boolean
  isBookmarked?: boolean
  isLiked?: boolean
  type: "snippet" | "technique" | "pattern" | "update"
  hasAIExplanation?: boolean
}

interface TrendingRepo {
  id: string
  name: string
  owner: string
  avatar: string
  description: string
  language: string
  stars: number
  forks: number
  gainedStars: number
  url: string
}

// Mock data for code snippets
const mockCodeSnippets: CodeSnippet[] = [
  {
    id: "1",
    title: "React Server Components: Data Fetching Pattern",
    description:
      "A clean pattern for fetching data in React Server Components without prop drilling or client-side fetching.",
    code: `// app/users/page.tsx
import { db } from '@/lib/db'

// This component runs on the server and can directly access the database
export default async function UsersPage() {
  // Fetch data directly in the server component
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Recent Users</h1>
      <ul className="divide-y">
        {users.map(user => (
          <li key={user.id} className="py-2">
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  )
}

// This can be a client component that receives the data
function UserCard({ user }) {
  return (
    <div className="flex items-center gap-3">
      <img src={user.avatar || "/placeholder.svg"} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  )
}`,
    language: "tsx",
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "1",
      name: "next-patterns",
      owner: "vercel",
      url: "https://github.com/vercel/next-patterns",
      stars: 2300,
    },
    tags: ["react", "server-components", "data-fetching", "next.js"],
    category: "Frontend",
    timestamp: "2023-05-01T12:00:00Z",
    likes: 342,
    comments: 28,
    isNew: true,
    isTrending: true,
    type: "pattern",
    hasAIExplanation: true,
  },
  {
    id: "2",
    title: "Optimistic UI Updates with React",
    description:
      "Implement optimistic UI updates to make your React apps feel faster and more responsive to user actions.",
    code: `import { useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')
  
  const addTodo = async (e) => {
    e.preventDefault()
    
    // Generate a temporary ID
    const tempId = Date.now()
    
    // Optimistically update the UI
    setTodos(prev => [
      ...prev, 
      { id: tempId, text: newTodo, completed: false }
    ])
    setNewTodo('')
    
    try {
      // Send the request to the server
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text: newTodo }),
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await response.json()
      
      // Update with the real ID from the server
      setTodos(prev => prev.map(todo => 
        todo.id === tempId ? { ...todo, id: data.id } : todo
      ))
    } catch (error) {
      // If there's an error, revert the optimistic update
      setTodos(prev => prev.filter(todo => todo.id !== tempId))
      alert('Failed to add todo')
    }
  }
  
  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}`,
    language: "jsx",
    author: {
      name: "Alex Johnson",
      username: "alexjohnson",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "2",
      name: "react-patterns",
      owner: "facebook",
      url: "https://github.com/facebook/react-patterns",
      stars: 5600,
    },
    tags: ["react", "optimistic-updates", "ui", "performance"],
    category: "Frontend",
    timestamp: "2023-04-28T10:30:00Z",
    likes: 289,
    comments: 42,
    isNew: false,
    type: "technique",
    hasAIExplanation: true,
  },
  {
    id: "3",
    title: "Tailwind CSS Container Queries",
    description:
      "Use Tailwind's new container query variants to create components that adapt to their parent container's size.",
    code: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

// Component using container queries
function Card() {
  return (
    <div className="@container">
      <div className="@md:flex @md:items-center p-4">
        <img 
          src="/image.jpg" 
          className="@md:w-1/3 @md:mr-4 w-full mb-4 @md:mb-0 rounded-lg" 
        />
        <div>
          <h2 className="@md:text-xl text-lg font-bold">Card Title</h2>
          <p className="@md:block hidden mt-2 text-gray-600">
            This content only shows when the container is at the md breakpoint or larger.
          </p>
          <p className="@md:hidden block mt-2 text-gray-600">
            Smaller container view with less content.
          </p>
        </div>
      </div>
    </div>
  )
}`,
    language: "jsx",
    author: {
      name: "Taylor Wong",
      username: "tailwindtaylor",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "3",
      name: "tailwindcss",
      owner: "tailwindlabs",
      url: "https://github.com/tailwindlabs/tailwindcss",
      stars: 71000,
    },
    tags: ["tailwindcss", "css", "container-queries", "responsive"],
    category: "CSS",
    timestamp: "2023-04-30T15:45:00Z",
    likes: 176,
    comments: 15,
    isNew: true,
    type: "technique",
  },
  {
    id: "4",
    title: "LangChain Structured Output with Zod",
    description: "Use Zod with LangChain to validate and type the output from large language models in TypeScript.",
    code: `import { z } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";

// Define your output schema with Zod
const PersonSchema = z.object({
  name: z.string().describe("The person's name"),
  age: z.number().describe("The person's age"),
  hobbies: z.array(z.string()).describe("The person's hobbies"),
  isStudent: z.boolean().describe("Whether the person is a student")
});

// Create a parser from the schema
const parser = StructuredOutputParser.fromZodSchema(PersonSchema);

// Get the format instructions for the LLM
const formatInstructions = parser.getFormatInstructions();

// Create a prompt template
const prompt = new PromptTemplate({
  template: "Extract information about the person in the following text:\\n{text}\\n{format_instructions}",
  inputVariables: ["text"],
  partialVariables: { format_instructions: formatInstructions }
});

// Initialize the model
const model = new ChatOpenAI({ temperature: 0 });

// Use in an async function
async function extractPersonInfo(text) {
  const input = await prompt.format({ text });
  const response = await model.call(input);
  
  // Parse and validate the response
  const parsed = await parser.parse(response);
  
  // TypeScript knows the shape of parsed
  console.log(parsed.name); // string
  console.log(parsed.age); // number
  console.log(parsed.hobbies); // string[]
  
  return parsed;
}

// Example usage
const text = "John is a 25-year-old software engineer who enjoys hiking, reading, and playing guitar. He's currently studying part-time for his master's degree.";
const person = await extractPersonInfo(text);`,
    language: "typescript",
    author: {
      name: "Maria Rodriguez",
      username: "mariaai",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "4",
      name: "langchain-ts",
      owner: "langchain-ai",
      url: "https://github.com/langchain-ai/langchainjs",
      stars: 5800,
    },
    tags: ["ai", "langchain", "typescript", "zod", "llm"],
    category: "AI",
    timestamp: "2023-05-02T09:15:00Z",
    likes: 412,
    comments: 37,
    isNew: true,
    isTrending: true,
    type: "pattern",
  },
  {
    id: "5",
    title: "shadcn/ui Animated Accordion",
    description: "Create a smooth animated accordion component with shadcn/ui and Framer Motion.",
    code: `"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AnimatedAccordion({ items }: { items: AccordionItemProps[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} defaultOpen={item.defaultOpen}>
          {item.children}
        </AccordionItem>
      ))}
    </div>
  )
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border rounded-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full justify-between items-center p-4 text-left font-medium",
          isOpen && "rounded-t-md"
        )}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}`,
    language: "tsx",
    author: {
      name: "Jamie Smith",
      username: "jamiesmith",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "5",
      name: "ui-components",
      owner: "shadcn",
      url: "https://github.com/shadcn/ui",
      stars: 45000,
    },
    tags: ["react", "framer-motion", "animation", "ui", "shadcn"],
    category: "UI",
    timestamp: "2023-04-29T14:20:00Z",
    likes: 231,
    comments: 19,
    isNew: false,
    type: "snippet",
  },
  {
    id: "6",
    title: "Next.js App Router: Parallel Routes",
    description: "Use Next.js 13's parallel routes feature to render multiple pages in the same layout simultaneously.",
    code: `// app/layout.tsx
export default function Layout({
  children,
  analytics,
  team
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-4">
      <nav className="mb-6">
        {/* Navigation content */}
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Main content */}
          {children}
        </div>
        
        <div className="space-y-6">
          {/* Analytics panel */}
          <div className="border rounded-lg p-4">
            {analytics}
          </div>
          
          {/* Team panel */}
          <div className="border rounded-lg p-4">
            {team}
          </div>
        </div>
      </div>
    </div>
  )
}

// app/page.tsx - Main content
export default function Page() {
  return <h1>Main Content</h1>
}

// app/@analytics/page.tsx - Analytics panel
export default function AnalyticsPage() {
  return <h2>Analytics Panel</h2>
}

// app/@team/page.tsx - Team panel
export default function TeamPage() {
  return <h2>Team Panel</h2>
}`,
    language: "tsx",
    author: {
      name: "Lee Robinson",
      username: "leeerob",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "1",
      name: "next.js",
      owner: "vercel",
      url: "https://github.com/vercel/next.js",
      stars: 112000,
    },
    tags: ["next.js", "app-router", "parallel-routes", "react"],
    category: "Frontend",
    timestamp: "2023-05-03T16:30:00Z",
    likes: 387,
    comments: 42,
    isNew: true,
    isTrending: true,
    type: "technique",
  },
  {
    id: "7",
    title: "TypeScript Discriminated Unions",
    description:
      "Use TypeScript's discriminated unions pattern for type-safe handling of different states in your application.",
    code: `// Define a discriminated union type for API request states
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Example usage in a React component
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [state, setState] = useState<RequestState<User>>({ status: 'idle' });

  useEffect(() => {
    const fetchUser = async () => {
      setState({ status: 'loading' });
      
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const data = await response.json();
        setState({ status: 'success', data });
      } catch (error) {
        setState({ 
          status: 'error', 
          error: error instanceof Error ? error : new Error('Unknown error') 
        });
      }
    };

    fetchUser();
  }, [userId]);

  // Type-safe rendering based on state
  switch (state.status) {
    case 'idle':
      return <div>Ready to load user...</div>;
    
    case 'loading':
      return <div>Loading user...</div>;
    
    case 'error':
      return <div>Error: {state.error.message}</div>;
    
    case 'success':
      return (
        <div>
          <h1>{state.data.name}</h1>
          <p>{state.data.email}</p>
        </div>
      );
  }
}`,
    language: "tsx",
    author: {
      name: "Tomas Eriksson",
      username: "typescript_tom",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "7",
      name: "typescript-patterns",
      owner: "microsoft",
      url: "https://github.com/microsoft/typescript-patterns",
      stars: 8700,
    },
    tags: ["typescript", "patterns", "discriminated-unions", "type-safety"],
    category: "TypeScript",
    timestamp: "2023-05-04T11:20:00Z",
    likes: 276,
    comments: 31,
    isNew: true,
    type: "pattern",
  },
  {
    id: "8",
    title: "Rust-inspired Result Type in TypeScript",
    description: "Implement a Rust-like Result type in TypeScript for better error handling without exceptions.",
    code: `// Define the Result type
type Result<T, E> = Ok<T, E> | Err<T, E>;

class Ok<T, E> {
  readonly value: T;
  readonly _tag: 'Ok' = 'Ok';
  
  constructor(value: T) {
    this.value = value;
  }
  
  isOk(): this is Ok<T, E> {
    return true;
  }
  
  isErr(): this is Err<T, E> {
    return false;
  }
  
  map<U>(fn: (value: T) => U): Result<U, E> {
    return new Ok(fn(this.value));
  }
  
  mapErr<F>(_fn: (err: E) => F): Result<T, F> {
    return new Ok(this.value);
  }
  
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }
  
  unwrap(): T {
    return this.value;
  }
  
  unwrapOr(_defaultValue: T): T {
    return this.value;
  }
}

class Err<T, E> {
  readonly error: E;
  readonly _tag: 'Err' = 'Err';
  
  constructor(error: E) {
    this.error = error;
  }
  
  isOk(): this is Ok<T, E> {
    return false;
  }
  
  isErr(): this is Err<T, E> {
    return true;
  }
  
  map<U>(_fn: (value: T) => U): Result<U, E> {
    return new Err(this.error);
  }
  
  mapErr<F>(fn: (err: E) => F): Result<T, F> {
    return new Err(fn(this.error));
  }
  
  andThen<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
    return new Err(this.error);
  }
  
  unwrap(): never {
    throw new Error(\`Tried to unwrap an Err: \${this.error}\`);
  }
  
  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }
}

// Helper functions
function ok<T, E>(value: T): Result<T, E> {
  return new Ok(value);
}

function err<T, E>(error: E): Result<T, E> {
  return new Err(error);
}

// Example usage
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err('Division by zero');
  }
  return ok(a / b);
}

// Using the Result type
const result = divide(10, 2)
  .map(n => n * 2)
  .andThen(n => (n > 0 ? ok(n) : err('Negative number')));

if (result.isOk()) {
  console.log(\`Result: \${result.value}\`);
} else {
  console.error(\`Error: \${result.error}\`);
}

// Pattern matching with switch
switch (result._tag) {
  case 'Ok':
    console.log(\`Result: \${result.value}\`);
    break;
  case 'Err':
    console.error(\`Error: \${result.error}\`);
    break;
}`,
    language: "typescript",
    author: {
      name: "Eliza Weisman",
      username: "elizarust",
      avatar: "/diverse-avatars.png",
    },
    repository: {
      id: "8",
      name: "ts-results",
      owner: "vultix",
      url: "https://github.com/vultix/ts-results",
      stars: 1200,
    },
    tags: ["typescript", "rust", "error-handling", "functional-programming"],
    category: "TypeScript",
    timestamp: "2023-05-05T09:45:00Z",
    likes: 198,
    comments: 23,
    isNew: true,
    type: "pattern",
  },
]

// Mock data for trending repositories
const mockTrendingRepos: TrendingRepo[] = [
  {
    id: "1",
    name: "next.js",
    owner: "vercel",
    avatar: "/vercel-logo.png",
    description: "The React Framework for the Web",
    language: "TypeScript",
    stars: 112000,
    forks: 24500,
    gainedStars: 1200,
    url: "https://github.com/vercel/next.js",
  },
  {
    id: "2",
    name: "ui",
    owner: "shadcn",
    avatar: "/abstract-geometric-logo.png",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    language: "TypeScript",
    stars: 45000,
    forks: 2800,
    gainedStars: 980,
    url: "https://github.com/shadcn/ui",
  },
  {
    id: "3",
    name: "langchain",
    owner: "langchain-ai",
    avatar: "/langchain-logo.png",
    description: "Building applications with LLMs through composability",
    language: "TypeScript",
    stars: 65000,
    forks: 9200,
    gainedStars: 850,
    url: "https://github.com/langchain-ai/langchain",
  },
  {
    id: "4",
    name: "bun",
    owner: "oven-sh",
    avatar: "/bun-logo.png",
    description: "Incredibly fast JavaScript runtime, bundler, transpiler and package manager",
    language: "Zig",
    stars: 58000,
    forks: 1500,
    gainedStars: 780,
    url: "https://github.com/oven-sh/bun",
  },
  {
    id: "5",
    name: "htmx",
    owner: "bigskysoftware",
    avatar: "/htmx-logo.png",
    description: "High power tools for HTML",
    language: "JavaScript",
    stars: 24000,
    forks: 980,
    gainedStars: 650,
    url: "https://github.com/bigskysoftware/htmx",
  },
]

export function CodeFeed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [isLoading, setIsLoading] = useState(false)
  const [snippets, setSnippets] = useState<CodeSnippet[]>(mockCodeSnippets)
  const [savedSnippets, setSavedSnippets] = useState<string[]>([])
  const [likedSnippets, setLikedSnippets] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedExplanations, setExpandedExplanations] = useState<string[]>([])
  const feedRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Get unique categories and types for filters
  const categories = Array.from(new Set(snippets.map((snippet) => snippet.category)))
  const types = Array.from(new Set(snippets.map((snippet) => snippet.type)))

  // Filter snippets based on active tab, search, and filters
  const getFilteredSnippets = () => {
    let filtered = [...snippets]

    // Apply tab filter
    if (activeTab === "trending") {
      filtered = filtered.filter((snippet) => snippet.isTrending)
    } else if (activeTab === "recent") {
      filtered = filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    } else if (activeTab === "saved") {
      filtered = filtered.filter((snippet) => savedSnippets.includes(snippet.id))
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(query) ||
          snippet.description.toLowerCase().includes(query) ||
          snippet.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((snippet) => snippet.category === selectedCategory)
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter((snippet) => snippet.type === selectedType)
    }

    return filtered
  }

  const filteredSnippets = getFilteredSnippets()

  const toggleSaveSnippet = (id: string) => {
    setSavedSnippets((prev) => (prev.includes(id) ? prev.filter((snippetId) => snippetId !== id) : [...prev, id]))
  }

  const toggleLikeSnippet = (id: string) => {
    setLikedSnippets((prev) => (prev.includes(id) ? prev.filter((snippetId) => snippetId !== id) : [...prev, id]))

    // Update like count in the snippets
    setSnippets((prev) =>
      prev.map((snippet) => {
        if (snippet.id === id) {
          const isLiked = likedSnippets.includes(id)
          return {
            ...snippet,
            likes: isLiked ? snippet.likes - 1 : snippet.likes + 1,
            isLiked: !isLiked,
          }
        }
        return snippet
      }),
    )
  }

  const toggleExplanation = (id: string) => {
    setExpandedExplanations((prev) =>
      prev.includes(id) ? prev.filter((snippetId) => snippetId !== id) : [...prev, id],
    )
  }

  const loadMoreSnippets = () => {
    setIsLoading(true)
    // Simulate loading more snippets
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would fetch more snippets from an API
    }, 1000)
  }

  const refreshFeed = () => {
    setIsLoading(true)
    // Simulate refreshing the feed
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would fetch new snippets from an API
    }, 1000)
  }

  const resetFilters = () => {
    setSelectedCategory(null)
    setSelectedType(null)
    setSearchQuery("")
  }

  // Format relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Get icon for snippet type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "snippet":
        return <Code className="h-4 w-4" />
      case "technique":
        return <Lightbulb className="h-4 w-4" />
      case "pattern":
        return <Layers className="h-4 w-4" />
      case "update":
        return <Repeat2 className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  // Get human-readable type name
  const getTypeName = (type: string) => {
    switch (type) {
      case "snippet":
        return "Code Snippet"
      case "technique":
        return "Technique"
      case "pattern":
        return "Pattern"
      case "update":
        return "Update"
      default:
        return type
    }
  }

  return (
    <div className="max-w-4xl mx-auto" ref={feedRef}>
      {/* AI Hub Integration */}
      <AIHub />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Code Feed</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshFeed} disabled={isLoading}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", showFilters && "rotate-180")} />
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="mb-6 border border-border/40">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search code, techniques..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className={cn(
                        "cursor-pointer hover:bg-muted",
                        selectedCategory === category && "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className={cn(
                        "cursor-pointer hover:bg-muted",
                        selectedType === type && "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                    >
                      {getTypeName(type)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="for-you" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
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
              <TabsTrigger value="saved" className="flex items-center">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="mt-6 space-y-6">
              {filteredSnippets.length > 0 ? (
                <AnimatePresence initial={false}>
                  {filteredSnippets.map((snippet, index) => (
                    <motion.div
                      key={snippet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CodeSnippetCard
                        snippet={snippet}
                        isSaved={savedSnippets.includes(snippet.id)}
                        isLiked={likedSnippets.includes(snippet.id)}
                        isExplanationExpanded={expandedExplanations.includes(snippet.id)}
                        onSave={() => toggleSaveSnippet(snippet.id)}
                        onLike={() => toggleLikeSnippet(snippet.id)}
                        onToggleExplanation={() => toggleExplanation(snippet.id)}
                        formatRelativeTime={formatRelativeTime}
                        getTypeIcon={getTypeIcon}
                        getTypeName={getTypeName}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <Code className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No snippets found</h3>
                  <p className="text-muted-foreground mt-2">
                    {activeTab === "saved"
                      ? "You haven't saved any snippets yet."
                      : "Try adjusting your filters or check back later."}
                  </p>
                  {(searchQuery || selectedCategory || selectedType) && (
                    <Button variant="outline" className="mt-4" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  )}
                </div>
              )}

              {filteredSnippets.length > 0 && (
                <div className="flex justify-center pt-4">
                  <Button onClick={loadMoreSnippets} disabled={isLoading} variant="outline">
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Other tab contents with the same structure */}
            <TabsContent value="trending" className="mt-6 space-y-6">
              {/* Same content structure as "for-you" tab */}
              {filteredSnippets.length > 0 ? (
                <AnimatePresence initial={false}>
                  {filteredSnippets.map((snippet, index) => (
                    <motion.div
                      key={snippet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CodeSnippetCard
                        snippet={snippet}
                        isSaved={savedSnippets.includes(snippet.id)}
                        isLiked={likedSnippets.includes(snippet.id)}
                        isExplanationExpanded={expandedExplanations.includes(snippet.id)}
                        onSave={() => toggleSaveSnippet(snippet.id)}
                        onLike={() => toggleLikeSnippet(snippet.id)}
                        onToggleExplanation={() => toggleExplanation(snippet.id)}
                        formatRelativeTime={formatRelativeTime}
                        getTypeIcon={getTypeIcon}
                        getTypeName={getTypeName}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <Flame className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No trending snippets found</h3>
                  <p className="text-muted-foreground mt-2">Check back later for trending content.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="mt-6 space-y-6">
              {/* Same content structure as "for-you" tab */}
              {filteredSnippets.length > 0 ? (
                <AnimatePresence initial={false}>
                  {filteredSnippets.map((snippet, index) => (
                    <motion.div
                      key={snippet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CodeSnippetCard
                        snippet={snippet}
                        isSaved={savedSnippets.includes(snippet.id)}
                        isLiked={likedSnippets.includes(snippet.id)}
                        isExplanationExpanded={expandedExplanations.includes(snippet.id)}
                        onSave={() => toggleSaveSnippet(snippet.id)}
                        onLike={() => toggleLikeSnippet(snippet.id)}
                        onToggleExplanation={() => toggleExplanation(snippet.id)}
                        formatRelativeTime={formatRelativeTime}
                        getTypeIcon={getTypeIcon}
                        getTypeName={getTypeName}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No recent snippets found</h3>
                  <p className="text-muted-foreground mt-2">Check back later for new content.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-6 space-y-6">
              {/* Same content structure as "for-you" tab */}
              {filteredSnippets.length > 0 ? (
                <AnimatePresence initial={false}>
                  {filteredSnippets.map((snippet, index) => (
                    <motion.div
                      key={snippet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CodeSnippetCard
                        snippet={snippet}
                        isSaved={savedSnippets.includes(snippet.id)}
                        isLiked={likedSnippets.includes(snippet.id)}
                        isExplanationExpanded={expandedExplanations.includes(snippet.id)}
                        onSave={() => toggleSaveSnippet(snippet.id)}
                        onLike={() => toggleLikeSnippet(snippet.id)}
                        onToggleExplanation={() => toggleExplanation(snippet.id)}
                        formatRelativeTime={formatRelativeTime}
                        getTypeIcon={getTypeIcon}
                        getTypeName={getTypeName}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                    <Bookmark className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No saved snippets</h3>
                  <p className="text-muted-foreground mt-2">
                    Save snippets to access them later, even when you're offline.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden md:block">
          <div className="space-y-6 sticky top-20">
            <Card className="border border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending Repositories
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/trending">View all</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockTrendingRepos.slice(0, 3).map((repo) => (
                    <div key={repo.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8 rounded-md">
                        <AvatarImage src={repo.avatar || "/placeholder.svg"} alt={repo.owner} />
                        <AvatarFallback className="rounded-md">
                          {repo.owner.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">
                            <Link href={repo.url} className="hover:underline">
                              {repo.owner}/{repo.name}
                            </Link>
                          </h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {repo.stars.toLocaleString()}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{repo.description}</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            +{repo.gainedStars} stars
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Daily Digest
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/digest">View all</Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="rounded-md border p-3">
                    <h3 className="font-medium text-sm mb-1">TypeScript 5.3 Released</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      New features include import attributes, switch exhaustiveness, and more.
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/digest/typescript-5-3">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="rounded-md border p-3">
                    <h3 className="font-medium text-sm mb-1">React Server Components Guide</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Learn how to use React Server Components effectively in your Next.js applications.
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/digest/react-server-components">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Popular Tags
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    typescript
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    react
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    next.js
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    tailwindcss
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    ai
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    server-components
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    patterns
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    performance
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="text-xs text-muted-foreground text-center">
              <p>© 2023 gitr.ee</p>
              <div className="flex justify-center gap-3 mt-2">
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
