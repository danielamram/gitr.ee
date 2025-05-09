"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { CodeExplainer } from "@/components/ai-features/code-explainer"
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Brain,
  Code,
  Copy,
  ExternalLink,
  Github,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react"

// Mock data for a single snippet
const mockSnippet = {
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
}

// Mock comments
const mockComments = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "/diverse-avatars.png",
    },
    content:
      "This is a great pattern! I've been using something similar in my projects. One thing to consider is adding a loading state during the API call to give users feedback.",
    timestamp: "2023-04-29T14:30:00Z",
    likes: 12,
  },
  {
    id: "2",
    author: {
      name: "Jamie Smith",
      username: "jamiesmith",
      avatar: "/diverse-avatars.png",
    },
    content:
      "Have you tried using React Query or SWR for this? They have built-in support for optimistic updates that can simplify this pattern even further.",
    timestamp: "2023-04-30T09:15:00Z",
    likes: 8,
  },
]

export default function SnippetPage() {
  const params = useParams()
  const snippetId = params.id as string
  const [activeTab, setActiveTab] = useState("code")
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  // In a real app, you would fetch the snippet data based on the ID
  const snippet = mockSnippet

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm hover:text-foreground/80 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to feed
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 rounded-md">
              <AvatarImage src={snippet.author.avatar || "/placeholder.svg"} alt={snippet.author.name} />
              <AvatarFallback className="rounded-md">
                {snippet.author.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center flex-wrap">
                <span className="font-medium">{snippet.author.name}</span>
                <span className="mx-1 text-muted-foreground">@{snippet.author.username}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Posted on {formatDate(snippet.timestamp)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-red-500" : ""}>
              <Heart className="h-4 w-4 mr-2" fill={isLiked ? "currentColor" : "none"} />
              Like
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

        <h1 className="text-2xl font-bold mt-4">{snippet.title}</h1>
        <p className="text-muted-foreground mt-2">{snippet.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {snippet.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-md">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="code" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="code" className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="discussion" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Discussion ({mockComments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="mt-6">
          <Card className="border border-border/40 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-4 bg-muted/30">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2 flex items-center">
                  <Github className="h-3 w-3 mr-1" />
                  {snippet.repository.owner}/{snippet.repository.name}
                </Badge>
                <Badge variant="outline">{snippet.language}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? "Copied!" : "Copy"}
                  <Copy className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={snippet.repository.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted/30">
                <CodeBlock code={snippet.code} language={snippet.language} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="mt-6">
          <CodeExplainer code={snippet.code} language={snippet.language} title="AI Code Insights" />
        </TabsContent>

        <TabsContent value="discussion" className="mt-6">
          <Card className="border border-border/40">
            <CardHeader>
              <CardTitle className="text-lg">Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 rounded-md">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback className="rounded-md">
                        {comment.author.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author.name}</span>
                        <span className="text-muted-foreground text-sm">@{comment.author.username}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="mt-1">{comment.content}</p>
                      <div className="flex items-center mt-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Heart className="h-4 w-4 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <h3 className="font-medium mb-2">Add a comment</h3>
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-md bg-background"
                  placeholder="Share your thoughts or ask a question..."
                />
                <div className="flex justify-end mt-2">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
