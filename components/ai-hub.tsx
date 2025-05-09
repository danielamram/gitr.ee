"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PersonalizedFeed } from "@/components/ai-features/personalized-feed"
import { CodeCompletion } from "@/components/ai-features/code-completion"
import { CodeChallenge } from "@/components/ai-features/code-challenge"
import { Brain, Code, Sparkles, Wand2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AIHub() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("feed")

  return (
    <AnimatePresence mode="wait">
      {isExpanded ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card className="border border-border/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                AI Assistant Hub
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="feed" className="w-full" onValueChange={setActiveTab} value={activeTab}>
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
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Brain className="h-5 w-5 mr-2" />
            Open AI Assistant Hub
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
