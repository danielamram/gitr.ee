"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Heart,
  Star,
  Users,
  Zap,
  Code,
  RefreshCw,
  ArrowRight,
  Bookmark,
  Award,
  Clock,
  Flame,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function CommunityActivity() {
  const [activeTab, setActiveTab] = useState("trending")
  const [isLoading, setIsLoading] = useState(false)

  // Mock community activity data
  const communityData = {
    trending: [
      {
        id: "1",
        user: {
          name: "Sarah Chen",
          username: "sarahchen",
          avatar: "/diverse-avatars.png",
          badge: "Top Contributor",
        },
        action: "shared a code snippet",
        title: "React Server Components: Data Fetching Pattern",
        engagement: {
          likes: 342,
          comments: 28,
          saves: 156,
        },
        timeAgo: "2h ago",
      },
      {
        id: "2",
        user: {
          name: "Alex Johnson",
          username: "alexjohnson",
          avatar: "/diverse-avatars.png",
          badge: "Code Expert",
        },
        action: "posted a technique",
        title: "Optimistic UI Updates with React",
        engagement: {
          likes: 289,
          comments: 42,
          saves: 124,
        },
        timeAgo: "4h ago",
      },
      {
        id: "3",
        user: {
          name: "Maria Rodriguez",
          username: "mariaai",
          avatar: "/diverse-avatars.png",
          badge: "AI Specialist",
        },
        action: "shared a pattern",
        title: "LangChain Structured Output with Zod",
        engagement: {
          likes: 412,
          comments: 37,
          saves: 201,
        },
        timeAgo: "6h ago",
      },
    ],
    discussions: [
      {
        id: "1",
        title: "Best practices for React Server Components?",
        participants: 24,
        replies: 42,
        lastActive: "15m ago",
        tags: ["react", "server-components", "next.js"],
      },
      {
        id: "2",
        title: "How to optimize large lists in React?",
        participants: 18,
        replies: 36,
        lastActive: "1h ago",
        tags: ["react", "performance", "optimization"],
      },
      {
        id: "3",
        title: "TypeScript discriminated unions vs. class hierarchies",
        participants: 15,
        replies: 28,
        lastActive: "2h ago",
        tags: ["typescript", "patterns", "type-safety"],
      },
    ],
    leaderboard: [
      {
        rank: 1,
        user: {
          name: "Taylor Wong",
          username: "tailwindtaylor",
          avatar: "/diverse-avatars.png",
        },
        points: 12450,
        contributions: 87,
        streak: 42,
        badge: "Diamond",
      },
      {
        rank: 2,
        user: {
          name: "Jamie Smith",
          username: "jamiesmith",
          avatar: "/diverse-avatars.png",
        },
        points: 10820,
        contributions: 76,
        streak: 38,
        badge: "Platinum",
      },
      {
        rank: 3,
        user: {
          name: "Eliza Weisman",
          username: "elizarust",
          avatar: "/diverse-avatars.png",
        },
        points: 9640,
        contributions: 68,
        streak: 31,
        badge: "Gold",
      },
    ],
  }

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Community Activity
        </CardTitle>
        <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
          {isLoading ? (
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
        <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="trending" className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex-1">
              <Award className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="p-4 space-y-4">
            <div className="space-y-4">
              {communityData.trending.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-md p-3"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                      <AvatarFallback className="rounded-md">
                        {item.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.user.name}</span>
                        <span className="text-muted-foreground">@{item.user.username}</span>
                        {item.user.badge && (
                          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500">
                            {item.user.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.action} • {item.timeAgo}
                      </p>
                      <h3 className="font-medium mt-1">{item.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Heart className="h-4 w-4 mr-1" />
                          {item.engagement.likes}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {item.engagement.comments}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Bookmark className="h-4 w-4 mr-1" />
                          {item.engagement.saves}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/trending">
                View All Trending Content
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </TabsContent>

          <TabsContent value="discussions" className="p-4 space-y-4">
            <div className="space-y-4">
              {communityData.discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-md p-3"
                >
                  <div>
                    <h3 className="font-medium">{discussion.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {discussion.participants} participants
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {discussion.replies} replies
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {discussion.lastActive}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/discussions">
                Join the Conversation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </TabsContent>

          <TabsContent value="leaderboard" className="p-4 space-y-4">
            <div className="space-y-4">
              {communityData.leaderboard.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-md p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted font-bold">
                      {user.rank}
                    </div>
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage src={user.user.avatar || "/placeholder.svg"} alt={user.user.name} />
                      <AvatarFallback className="rounded-md">
                        {user.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.user.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            user.badge === "Diamond"
                              ? "text-xs bg-purple-500/10 text-purple-500"
                              : user.badge === "Platinum"
                                ? "text-xs bg-blue-500/10 text-blue-500"
                                : "text-xs bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {user.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {user.points.toLocaleString()} pts
                        </div>
                        <div className="flex items-center">
                          <Code className="h-4 w-4 mr-1" />
                          {user.contributions} contributions
                        </div>
                        <div className="flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          {user.streak} day streak
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/leaderboard">
                View Full Leaderboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
