"use client"

import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"

interface AIExplanationToggleProps {
  isExpanded: boolean
  onToggle: () => void
  hasExplanation: boolean
}

export function AIExplanationToggle({ isExpanded, onToggle, hasExplanation }: AIExplanationToggleProps) {
  if (!hasExplanation) return null

  return (
    <Button variant="ghost" size="sm" onClick={onToggle} className="text-purple-500">
      <Brain className="h-4 w-4 mr-2" />
      {isExpanded ? "Hide AI Insights" : "AI Insights"}
    </Button>
  )
}
