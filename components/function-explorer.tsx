"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Copy,
  Check,
  ArrowRight,
  Code,
  Bookmark,
  BookmarkCheck,
  TypeIcon as FunctionIcon,
  Tag,
  Layers,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types for function data
interface FunctionData {
  id: string
  name: string
  description: string
  code: string
  language: string
  usage: string
  category: string
  complexity: "simple" | "moderate" | "complex"
  popularity: number
  repoId: string
  repoName: string
  repoOwner: string
  relatedFunctions?: string[]
  tags: string[]
}

// Mock data for interesting functions
const mockFunctions: FunctionData[] = [
  {
    id: "1",
    name: "getStaticProps",
    description: "Fetches data at build time for static generation",
    code: `export async function getStaticProps(context) {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 60, // re-generate at most once per minute
  }
}`,
    language: "typescript",
    usage:
      "Used in page components to fetch data during static site generation. The function runs at build time and provides props to the page.",
    category: "Data Fetching",
    complexity: "moderate",
    popularity: 95,
    repoId: "1",
    repoName: "next.js",
    repoOwner: "vercel",
    relatedFunctions: ["2", "3"],
    tags: ["SSG", "data fetching", "Next.js", "server"],
  },
  {
    id: "2",
    name: "useRouter",
    description: "React hook for accessing the router object",
    code: `import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    color: router.asPath === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}`,
    language: "typescript",
    usage: "Used in client components to access routing information and programmatically navigate between pages.",
    category: "Routing",
    complexity: "simple",
    popularity: 90,
    repoId: "1",
    repoName: "next.js",
    repoOwner: "vercel",
    relatedFunctions: ["1"],
    tags: ["routing", "hooks", "Next.js", "client"],
  },
  {
    id: "3",
    name: "getServerSideProps",
    description: "Fetches data on each request for server-side rendering",
    code: `export async function getServerSideProps(context) {
  const { params, req, res } = context
  const { id } = params
  
  const response = await fetch(\`https://api.example.com/posts/\${id}\`)
  const data = await response.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}`,
    language: "typescript",
    usage:
      "Used in page components to fetch data on each request. This function runs on the server for every request, making it suitable for frequently updated data.",
    category: "Data Fetching",
    complexity: "moderate",
    popularity: 88,
    repoId: "1",
    repoName: "next.js",
    repoOwner: "vercel",
    relatedFunctions: ["1"],
    tags: ["SSR", "data fetching", "Next.js", "server"],
  },
  {
    id: "4",
    name: "useState",
    description: "React hook for managing state in functional components",
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    language: "typescript",
    usage:
      "Used to add state management to functional components. The hook returns the current state value and a function to update it.",
    category: "State Management",
    complexity: "simple",
    popularity: 98,
    repoId: "2",
    repoName: "react",
    repoOwner: "facebook",
    relatedFunctions: ["5"],
    tags: ["hooks", "state", "React", "client"],
  },
  {
    id: "5",
    name: "useEffect",
    description: "React hook for performing side effects in components",
    code: `import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
    
    // Optional cleanup function
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    language: "typescript",
    usage:
      "Used to perform side effects in functional components, such as data fetching, subscriptions, or DOM manipulations. The second argument controls when the effect runs.",
    category: "Lifecycle",
    complexity: "moderate",
    popularity: 96,
    repoId: "2",
    repoName: "react",
    repoOwner: "facebook",
    relatedFunctions: ["4"],
    tags: ["hooks", "side effects", "React", "client", "lifecycle"],
  },
  {
    id: "6",
    name: "theme",
    description: "Extends the default Tailwind theme",
    code: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1fb6ff',
        'custom-purple': '#7e5bef',
        'custom-pink': '#ff49db',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // ...
}`,
    language: "javascript",
    usage:
      "Used to customize the default Tailwind theme by extending or overriding its values. This allows for consistent design tokens across your project.",
    category: "Configuration",
    complexity: "simple",
    popularity: 85,
    repoId: "3",
    repoName: "tailwindcss",
    repoOwner: "tailwindlabs",
    relatedFunctions: [],
    tags: ["configuration", "theming", "CSS", "design"],
  },
  {
    id: "7",
    name: "LLMChain",
    description: "Creates a chain with a language model and prompt template",
    code: `import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const model = new OpenAI({ temperature: 0.9 });
const prompt = PromptTemplate.fromTemplate(
  "What is a good name for a company that makes {product}?"
);

const chain = new LLMChain({ llm: model, prompt });

const result = await chain.call({ product: "colorful socks" });
console.log(result.text); // "Vibrant Soles"`,
    language: "typescript",
    usage:
      "Used to create a chain that combines a language model with a prompt template. This allows for structured interactions with language models.",
    category: "AI",
    complexity: "moderate",
    popularity: 78,
    repoId: "4",
    repoName: "langchain",
    repoOwner: "langchain-ai",
    relatedFunctions: [],
    tags: ["AI", "LLM", "chains", "prompts"],
  },
  {
    id: "8",
    name: "cn",
    description: "Utility for conditionally joining class names",
    code: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    language: "typescript",
    usage:
      "Used to conditionally apply class names and merge Tailwind classes efficiently. It combines clsx for conditional logic with tailwind-merge to handle class conflicts.",
    category: "Utilities",
    complexity: "simple",
    popularity: 92,
    repoId: "5",
    repoName: "shadcn-ui",
    repoOwner: "shadcn",
    relatedFunctions: ["9"],
    tags: ["utility", "CSS", "Tailwind", "classes"],
  },
  {
    id: "9",
    name: "buttonVariants",
    description: "Reusable button component with variants",
    code: `import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)`,
    language: "typescript",
    usage:
      "Used to create consistent button styles with variants. The component uses class-variance-authority to manage different visual states and sizes.",
    category: "Components",
    complexity: "moderate",
    popularity: 88,
    repoId: "5",
    repoName: "shadcn-ui",
    repoOwner: "shadcn",
    relatedFunctions: ["8"],
    tags: ["components", "UI", "variants", "styling"],
  },
  {
    id: "10",
    name: "useCallback",
    description: "React hook for memoizing callback functions",
    code: `import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // This function only changes when count changes
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={incrementCount} />
    </div>
  );
}

function ChildComponent({ onIncrement }) {
  console.log('ChildComponent rendered');
  return <button onClick={onIncrement}>Increment</button>;
}`,
    language: "typescript",
    usage:
      "Used to memoize callback functions to prevent unnecessary re-renders of child components that rely on reference equality.",
    category: "Performance",
    complexity: "moderate",
    popularity: 85,
    repoId: "2",
    repoName: "react",
    repoOwner: "facebook",
    relatedFunctions: ["4", "5"],
    tags: ["hooks", "performance", "memoization", "React"],
  },
]

export function FunctionExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedComplexity, setSelectedComplexity] = useState<string | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [savedFunctions, setSavedFunctions] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFunction, setSelectedFunction] = useState<FunctionData | null>(null)

  // Get unique categories, repos, and complexity levels for filters
  const categories = Array.from(new Set(mockFunctions.map((func) => func.category)))
  const repos = Array.from(
    new Set(mockFunctions.map((func) => ({ id: func.repoId, name: func.repoName, owner: func.repoOwner }))),
  )
  const complexityLevels = ["simple", "moderate", "complex"]

  // Filter functions based on search and filters
  const filteredFunctions = mockFunctions.filter((func) => {
    const matchesSearch =
      searchQuery === "" ||
      func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === null || func.category === selectedCategory
    const matchesComplexity = selectedComplexity === null || func.complexity === selectedComplexity
    const matchesRepo = selectedRepo === null || func.repoId === selectedRepo
    const matchesTab = activeTab === "all" || (activeTab === "saved" && savedFunctions.includes(func.id))

    return matchesSearch && matchesCategory && matchesComplexity && matchesRepo && matchesTab
  })

  // Get related functions for the selected function
  const relatedFunctions = selectedFunction?.relatedFunctions
    ? mockFunctions.filter((func) => selectedFunction.relatedFunctions?.includes(func.id))
    : []

  const toggleSaveFunction = (id: string) => {
    if (savedFunctions.includes(id)) {
      setSavedFunctions(savedFunctions.filter((funcId) => funcId !== id))
    } else {
      setSavedFunctions([...savedFunctions, id])
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedComplexity(null)
    setSelectedRepo(null)
  }

  // Get complexity badge color
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "moderate":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "complex":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left sidebar with filters */}
      <div className="lg:col-span-1">
        <Card className="sticky top-20 border border-border/40">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Explore Functions</h3>
              <p className="text-sm text-muted-foreground mb-4">Discover useful functions from popular repositories</p>

              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search functions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all" className="flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    All Functions
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Saved ({savedFunctions.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Filter className="h-4 w-4 mr-1" /> Filters
                </h4>
                <Button variant="ghost" size="sm" className="text-xs mb-2" onClick={resetFilters}>
                  Reset filters
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Repository</h4>
                <div className="flex flex-wrap gap-2">
                  {repos.map((repo) => (
                    <Badge
                      key={repo.id}
                      variant="outline"
                      className={cn(
                        "cursor-pointer hover:bg-muted",
                        selectedRepo === repo.id && "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      onClick={() => setSelectedRepo(selectedRepo === repo.id ? null : repo.id)}
                    >
                      {repo.owner}/{repo.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Category</h4>
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
                <h4 className="text-sm font-medium mb-2">Complexity</h4>
                <div className="flex flex-wrap gap-2">
                  {complexityLevels.map((level) => (
                    <Badge
                      key={level}
                      variant="outline"
                      className={cn(
                        "cursor-pointer hover:bg-muted",
                        selectedComplexity === level && "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      onClick={() => setSelectedComplexity(selectedComplexity === level ? null : level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <div className="lg:col-span-2">
        {selectedFunction ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="function-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setSelectedFunction(null)} className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to list
                </Button>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getComplexityColor(selectedFunction.complexity)}>
                    {selectedFunction.complexity.charAt(0).toUpperCase() + selectedFunction.complexity.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="bg-muted/50">
                    {selectedFunction.category}
                  </Badge>
                </div>
              </div>

              <Card className="border border-border/40 overflow-hidden mb-6">
                <div className="p-4 border-b border-border/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">{selectedFunction.name}</h2>
                        <Badge variant="outline" className="bg-muted/30">
                          {selectedFunction.repoOwner}/{selectedFunction.repoName}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{selectedFunction.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSaveFunction(selectedFunction.id)}
                        className={savedFunctions.includes(selectedFunction.id) ? "text-yellow-500" : ""}
                      >
                        {savedFunctions.includes(selectedFunction.id) ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(selectedFunction.code, selectedFunction.id)}
                      >
                        {copiedId === selectedFunction.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 overflow-x-auto">
                  <CodeBlock code={selectedFunction.code} language={selectedFunction.language} />
                </div>
                <div className="p-4 bg-muted/10">
                  <h3 className="text-sm font-medium mb-2">Usage</h3>
                  <p className="text-sm text-muted-foreground">{selectedFunction.usage}</p>
                </div>
                <div className="p-4 border-t border-border/40">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Tag className="h-4 w-4 mr-1" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFunction.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-muted/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {relatedFunctions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Layers className="h-5 w-5 mr-2" /> Related Functions
                  </h3>
                  <div className="space-y-4">
                    {relatedFunctions.map((func) => (
                      <Card
                        key={func.id}
                        className="border border-border/40 hover:border-border/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedFunction(func)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{func.name}</h4>
                                <Badge variant="outline" className="bg-muted/30 text-xs">
                                  {func.repoName}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{func.description}</p>
                            </div>
                            <Badge variant="outline" className={getComplexityColor(func.complexity)}>
                              {func.complexity}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="function-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {filteredFunctions.length} {activeTab === "saved" ? "Saved" : ""} Functions
                </h2>
                {filteredFunctions.length > 0 && (
                  <p className="text-sm text-muted-foreground">Click on a function to view details</p>
                )}
              </div>

              {filteredFunctions.length > 0 ? (
                <div className="space-y-4">
                  {filteredFunctions.map((func, index) => (
                    <motion.div
                      key={func.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card
                        className="border border-border/40 hover:border-border/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedFunction(func)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <FunctionIcon className="h-4 w-4 text-muted-foreground" />
                                <h3 className="font-medium">{func.name}</h3>
                                <Badge variant="outline" className="bg-muted/30 text-xs">
                                  {func.repoOwner}/{func.repoName}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{func.description}</p>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className={getComplexityColor(func.complexity)}>
                                  {func.complexity}
                                </Badge>
                                <Badge variant="outline" className="bg-muted/30">
                                  {func.category}
                                </Badge>
                                <Badge variant="outline" className="bg-muted/30 flex items-center">
                                  <Star className="h-3 w-3 mr-1" />
                                  {func.popularity}%
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleSaveFunction(func.id)
                                }}
                                className={savedFunctions.includes(func.id) ? "text-yellow-500" : ""}
                              >
                                {savedFunctions.includes(func.id) ? (
                                  <BookmarkCheck className="h-4 w-4" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyToClipboard(func.code, func.id)
                                }}
                              >
                                {copiedId === func.id ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="border border-border/40">
                  <CardContent className="p-6 text-center">
                    <FunctionIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No functions found</h3>
                    <p className="text-sm text-muted-foreground">
                      {activeTab === "saved"
                        ? "You haven't saved any functions yet."
                        : "Try adjusting your filters or search query."}
                    </p>
                    {(searchQuery !== "" ||
                      selectedCategory !== null ||
                      selectedComplexity !== null ||
                      selectedRepo !== null) && (
                      <Button variant="outline" className="mt-4" onClick={resetFilters}>
                        Reset filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
