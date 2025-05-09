"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { PersonalizedFeed } from "@/components/ai-features/personalized-feed"
import { CodeCompletion } from "@/components/ai-features/code-completion"
import { CodeChallenge } from "@/components/ai-features/code-challenge"

interface AIHubContentProps {
  activeTab: string
}

export function AIHubContent({ activeTab }: AIHubContentProps) {
  return (
    <Tabs defaultValue="feed" className="w-full">
      <TabsContent value="feed" className="p-4">
        <PersonalizedFeed />
      </TabsContent>

      <TabsContent value="generate" className="p-4">
        <CodeCompletion />
      </TabsContent>

      <TabsContent value="challenge" className="p-4">
        <CodeChallenge />
      </TabsContent>
    </Tabs>
  )
}
