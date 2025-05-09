"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { SnippetHeader } from "./snippet-header"
import { SnippetCode } from "./snippet-code"
import { SnippetActions } from "./snippet-actions"
import { AIExplanationPanel } from "@/components/ai-features/snippet/ai-explanation-panel"

interface CodeSnippetCardProps {
  snippet: {
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
    type: string
    hasAIExplanation?: boolean
  }
  isSaved: boolean
  isLiked: boolean
  isExplanationExpanded: boolean
  onSave: () => void
  onLike: () => void
  onToggleExplanation: () => void
  formatRelativeTime: (timestamp: string) => string
  getTypeIcon: (type: string) => React.ReactNode
  getTypeName: (type: string) => string
}

export function CodeSnippetCard({
  snippet,
  isSaved,
  isLiked,
  isExplanationExpanded,
  onSave,
  onLike,
  onToggleExplanation,
  formatRelativeTime,
  getTypeIcon,
  getTypeName,
}: CodeSnippetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="border border-border/40 overflow-hidden">
      <SnippetHeader
        author={snippet.author}
        repository={snippet.repository}
        title={snippet.title}
        description={snippet.description}
        tags={snippet.tags}
        timestamp={snippet.timestamp}
        isNew={snippet.isNew}
        type={snippet.type}
        formatRelativeTime={formatRelativeTime}
        getTypeIcon={getTypeIcon}
        getTypeName={getTypeName}
      />

      <SnippetCode code={snippet.code} language={snippet.language} isExpanded={isExpanded} />

      <SnippetActions
        snippetId={snippet.id}
        likes={snippet.likes}
        comments={snippet.comments}
        isLiked={isLiked}
        isSaved={isSaved}
        isExplanationExpanded={isExplanationExpanded}
        hasAIExplanation={snippet.hasAIExplanation || false}
        onLike={onLike}
        onSave={onSave}
        onToggleExplanation={onToggleExplanation}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
      />

      <AIExplanationPanel
        isExpanded={isExplanationExpanded}
        code={snippet.code}
        language={snippet.language}
        title={snippet.title}
      />
    </Card>
  )
}
