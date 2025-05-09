"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Brain,
  Code,
  Cpu,
  Database,
  Fingerprint,
  Flame,
  Layers,
  LineChart,
  RefreshCw,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function PersonalizedFeed() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")

  // Mock data for AI insights
  const insights = {
    interests: [
      { name: "React", score: 92 },
      { name: "TypeScript", score: 87 },
      { name: "Next.js", score: 85 },
      { name: "Tailwind CSS", score: 78 },
      { name: "State Management", score: 72 },
    ],
    trending: [
      {
        id: "1",
        name: "React Server Components",
        description: "Server-side rendering approach for React applications",
        growth: "+240%",
        category: "Frontend",
      },
      {
        id: "2",
        name: "Bun",
        description: "Fast JavaScript runtime, bundler, and package manager",
        growth: "+180%",
        category: "Tools",
      },
      {
        id: "3",
        name: "HTMX",
        description: "High-power tools for HTML, directly in attributes",
        growth: "+150%",
        category: "Frontend",
      },
    ],
    recommendations: [
      {
        id: "1",
        title: "Optimizing React with useMemo and useCallback",
        type: "Article",
        relevance: "High",
        author: {
          name: "Alex Johnson",
          avatar: "/diverse-avatars.png",
        },
      },
      {
        id: "2",
        title: "Building Type-Safe APIs with tRPC",
        type: "Tutorial",
        relevance: "High",
        author: {
          name: "Sarah Chen",
          avatar: "/diverse-avatars.png",
        },
      },
      {
        id: "3",
        title: "Advanced TypeScript Patterns",
        type: "Code Examples",
        relevance: "Medium",
        author: {
          name: "Tomas Eriksson",
          avatar: "/diverse-avatars.png",
        },
      },
    ],
    learningPath: [
      {
        id: "1",
        title: "React Server Components",
        description: "Learn how to use React Server Components in Next.js",
        difficulty: "Intermediate",
        estimatedTime: "2 hours",
      },
      {
        id: "2",
        title: "TypeScript Discriminated Unions",
        description: "Master type-safe state handling with discriminated unions",
        difficulty: "Advanced",
        estimatedTime: "1.5 hours",
      },
      {
        id: "3",
        title: "Tailwind CSS Container Queries",
        description: "Build responsive components based on container size",
        difficulty: "Intermediate",
        estimatedTime: "1 hour",
      },
    ],
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call to refresh insights
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <Card className="border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Fingerprint className="h-5 w-5 mr-2 text-purple-500" />
          Your Personalized Insights
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="insights" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="insights" className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex-1">
              <Flame className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="p-4 space-y-4">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Your Interest Profile
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your activity, we've identified these as your primary interests:
              </p>

              <div className="space-y-3">
                {insights.interests.map((interest, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{interest.name}</span>
                      <span className="text-muted-foreground">{interest.score}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${interest.score}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-purple-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Learning Path
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Recommended topics to explore based on your interests and current skill level:
              </p>

              <div className="space-y-3">
                {insights.learningPath.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-md p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.difficulty === "Beginner"
                            ? "bg-green-500/10 text-green-500"
                            : item.difficulty === "Intermediate"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-purple-500/10 text-purple-500"
                        }
                      >
                        {item.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.estimatedTime}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                These topics are gaining significant attention in the developer community:
              </p>

              <div className="space-y-4">
                {insights.trending.map((trend, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-md p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{trend.name}</h4>
                        <p className="text-sm text-muted-foreground">{trend.description}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        {trend.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        {trend.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-muted/30 p-3 rounded-md">
                <h4 className="font-medium mb-2 flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Technology Adoption Trends
                </h4>
                <p className="text-sm text-muted-foreground">
                  Based on repository creation and star growth, these technologies are seeing rapid adoption:
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="flex items-center">
                    <Cpu className="h-3 w-3 mr-1" />
                    AI Tools
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Layers className="h-3 w-3 mr-1" />
                    Edge Computing
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Database className="h-3 w-3 mr-1" />
                    Vector Databases
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Code className="h-3 w-3 mr-1" />
                    WebAssembly
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Content recommendations tailored to your interests and skill level:
              </p>

              <div className="space-y-3">
                {insights.recommendations.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-md p-3"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 rounded-md">
                        <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                        <AvatarFallback className="rounded-md">
                          {item.author.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              item.relevance === "High"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-blue-500/10 text-blue-500"
                            }
                          >
                            {item.relevance}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground">{item.author.name}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/recommendations">
                  View All Recommendations
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
