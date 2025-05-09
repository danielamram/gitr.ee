"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"

interface SnippetHeaderProps {
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
  title: string
  description: string
  tags: string[]
  timestamp: string
  isNew: boolean
  type: string
  formatRelativeTime: (timestamp: string) => string
  getTypeIcon: (type: string) => React.ReactNode
  getTypeName: (type: string) => string
}

export function SnippetHeader({
  author,
  repository,
  title,
  description,
  tags,
  timestamp,
  isNew,
  type,
  formatRelativeTime,
  getTypeIcon,
  getTypeName,
}: SnippetHeaderProps) {
  return (
    <div className="p-4 border-b border-border/40">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 rounded-md">
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback className="rounded-md">{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{author.name}</span>
              <span className="text-muted-foreground">@{author.username}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatRelativeTime(timestamp)}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Github className="h-3 w-3" />
                {repository.owner}/{repository.name}
              </Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                {getTypeIcon(type)}
                {getTypeName(type)}
              </Badge>
              {isNew && <Badge className="text-xs bg-green-500/10 text-green-500 border-green-500/20">New</Badge>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
