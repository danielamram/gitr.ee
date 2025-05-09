"use client"

import { CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, X } from "lucide-react"

interface AIHubHeaderProps {
  onClose: () => void
}

export function AIHubHeader({ onClose }: AIHubHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
      <CardTitle className="text-lg flex items-center">
        <Brain className="h-5 w-5 mr-2 text-purple-500" />
        AI Assistant Hub
      </CardTitle>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </CardHeader>
  )
}
