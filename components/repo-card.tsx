"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Share2, MessageSquare, Bookmark, BookmarkCheck, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export interface RepoCardProps {
  id: string
  name: string
  owner: {
    login: string
    avatar_url: string
  }
  description: string
  aiSummary: string
  language: string
  stars: number
  forks: number
  updated_at: string
  topics: string[]
}

export function RepoCard({ repo }: { repo: RepoCardProps }) {
  const [isStarred, setIsStarred] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const isMobile = useMobile()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="mb-4"
    >
      <Card className="overflow-hidden border border-border/40 transition-all hover:border-border/80">
        <CardHeader className="p-4 pb-0 flex flex-row items-center space-x-2">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={repo.owner.avatar_url || "/placeholder.svg"} alt={repo.owner.login} />
            <AvatarFallback className="rounded-md">{repo.owner.login.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium text-sm">{repo.owner.login}</span>
              <span className="mx-1 text-muted-foreground">/</span>
              <Link href={`/repo/${repo.id}`} className="font-bold text-sm hover:underline">
                {repo.name}
              </Link>
            </div>
            <span className="text-xs text-muted-foreground">Updated on {formatDate(repo.updated_at)}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm mb-2">{repo.description}</p>
          <div className="text-sm font-medium mb-3">{repo.aiSummary}</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {repo.topics.slice(0, isMobile ? 2 : 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs rounded-md">
                {topic}
              </Badge>
            ))}
            {repo.topics.length > (isMobile ? 2 : 3) && (
              <Badge variant="outline" className="text-xs rounded-md">
                +{repo.topics.length - (isMobile ? 2 : 3)} more
              </Badge>
            )}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="flex items-center mr-4">
              <span className="w-3 h-3 rounded-full bg-foreground/80 mr-1"></span>
              {repo.language}
            </span>
            <span className="flex items-center mr-4">
              <Star className="h-3 w-3 mr-1" />
              {repo.stars.toLocaleString()}
            </span>
            <span className="flex items-center">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                ></path>
              </svg>
              {repo.forks.toLocaleString()}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap justify-between gap-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsStarred(!isStarred)}
              className={isStarred ? "text-yellow-500" : ""}
            >
              <Star className="h-4 w-4 mr-1" fill={isStarred ? "currentColor" : "none"} />
              <span className="hidden sm:inline">{isStarred ? "Starred" : "Star"}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsSaved(!isSaved)}>
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Save</span>
                </>
              )}
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/repo/${repo.id}`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
