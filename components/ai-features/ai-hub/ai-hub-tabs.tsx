"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Sparkles, Wand2 } from "lucide-react"

interface AIHubTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function AIHubTabs({ activeTab, onTabChange }: AIHubTabsProps) {
  return (
    <Tabs defaultValue="feed" className="w-full" onValueChange={onTabChange} value={activeTab}>
      <TabsList className="w-full rounded-none border-b">
        <TabsTrigger value="feed" className="flex-1">
          <Sparkles className="h-4 w-4 mr-2" />
          For You
        </TabsTrigger>
        <TabsTrigger value="generate" className="flex-1">
          <Wand2 className="h-4 w-4 mr-2" />
          Generate
        </TabsTrigger>
        <TabsTrigger value="challenge" className="flex-1">
          <Code className="h-4 w-4 mr-2" />
          Challenge
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
