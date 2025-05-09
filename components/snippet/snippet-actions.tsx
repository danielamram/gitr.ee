"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import { AIExplanationToggle } from "@/components/ai-features/snippet/ai-explanation-toggle"

interface SnippetActionsProps {
  snippetId: string
  likes: number
  comments: number
  isLiked: boolean
  isSaved: boolean
  isExplanationExpanded: boolean
  hasAIExplanation: boolean
  onLike: () => void
  onSave: () => void
  onToggleExplanation: () => void
  onToggleExpand: () => void
  isExpanded: boolean
}

export function SnippetActions({
  snippetId,
  likes,
  comments,
  isLiked,
  isSaved,
  isExplanationExpanded,
  hasAIExplanation,
  onLike,
  onSave,
  onToggleExplanation,
  onToggleExpand,
  isExpanded,
}: SnippetActionsProps) {
  return (
    <div className="p-2 flex items-center justify-between border-t border-border/40">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onLike} className={isLiked ? "text-red-500" : ""}>
          <Heart className="h-4 w-4 mr-2" fill={isLiked ? "currentColor" : "none"} />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/snippet/${snippetId}`}>
            <MessageSquare className="h-4 w-4 mr-2" />
            {comments}
          </Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
      <div className="flex items-center">
        <AIExplanationToggle
          isExpanded={isExplanationExpanded}
          onToggle={onToggleExplanation}
          hasExplanation={hasAIExplanation}
        />
        <Button variant="ghost" size="sm" onClick={onToggleExpand}>
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
        <Button variant="ghost" size="sm" onClick={onSave}>
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
