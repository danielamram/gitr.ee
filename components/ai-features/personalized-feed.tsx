"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { summarizeRepo } from "@/lib/ai/summarizeRepo";
import { motion } from "framer-motion";
import {
  BarChart,
  Brain,
  Clock,
  Code,
  Cpu,
  Database,
  Fingerprint,
  Flame,
  Layers,
  LineChart,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RepoCard } from "../repo-card";

// Mock GitHub repository data
const mockRepos = [
  {
    id: "1",
    name: "next.js",
    owner: {
      login: "vercel",
      avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4",
    },
    description: "The React Framework for the Web",
    aiSummary: "", // To be populated by AI
    language: "JavaScript",
    stars: 112000,
    forks: 24500,
    updated_at: "2023-08-15T14:23:45Z",
    topics: ["react", "nextjs", "framework", "javascript", "vercel"],
  },
  {
    id: "2",
    name: "tailwindcss",
    owner: {
      login: "tailwindlabs",
      avatar_url: "https://avatars.githubusercontent.com/u/67109815?v=4",
    },
    description: "A utility-first CSS framework for rapid UI development",
    aiSummary: "", // To be populated by AI
    language: "CSS",
    stars: 71300,
    forks: 3700,
    updated_at: "2023-08-14T09:12:33Z",
    topics: ["css", "framework", "utility", "responsive"],
  },
  {
    id: "3",
    name: "supabase",
    owner: {
      login: "supabase",
      avatar_url: "https://avatars.githubusercontent.com/u/54469796?v=4",
    },
    description: "The open source Firebase alternative",
    aiSummary: "", // To be populated by AI
    language: "TypeScript",
    stars: 58400,
    forks: 4100,
    updated_at: "2023-08-13T18:45:22Z",
    topics: ["database", "firebase", "postgresql", "backend", "auth"],
  },
];

export function PersonalizedFeed() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("insights");
  const [repositories, setRepositories] = useState(mockRepos);
  const [loading, setLoading] = useState(true);

  // Fetch AI summaries for repositories
  useEffect(() => {
    const generateSummaries = async () => {
      try {
        const updatedRepos = await Promise.all(
          repositories.map(async (repo) => {
            if (!repo.aiSummary) {
              const summary = await summarizeRepo(repo);
              return { ...repo, aiSummary: summary };
            }
            return repo;
          })
        );

        setRepositories(updatedRepos);
        setLoading(false);
      } catch (error) {
        console.error("Error generating summaries:", error);
        setLoading(false);
      }
    };

    if (repositories.some((repo) => !repo.aiSummary)) {
      generateSummaries();
    } else {
      setLoading(false);
    }
  }, [repositories]);

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
        description:
          "Master type-safe state handling with discriminated unions",
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
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh insights
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <Card className="border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Fingerprint className="h-5 w-5 mr-2 text-purple-500" />
          Your Personalized Insights
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
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
        <Tabs
          defaultValue="insights"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="insights" className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex-1">
              <Flame className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="repositories" className="flex-1">
              <Code className="h-4 w-4 mr-2" />
              Repositories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="p-4 space-y-4">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Your Interest Profile
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your activity, we've identified these as your primary
                interests:
              </p>

              <div className="space-y-3">
                {insights.interests.map((interest, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{interest.name}</span>
                      <span className="text-muted-foreground">
                        {interest.score}%
                      </span>
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
                Recommended topics to explore based on your interests and
                current skill level:
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
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
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
                These topics are gaining significant attention in the developer
                community:
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
                        <p className="text-sm text-muted-foreground">
                          {trend.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500"
                      >
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
                  Based on repository creation and star growth, these
                  technologies are seeing rapid adoption:
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

          <TabsContent value="repositories" className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Repositories tailored to your interests with AI-generated
                summaries:
              </p>

              {loading ? (
                <div className="flex justify-center py-6">
                  <RefreshCw className="h-10 w-10 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  {repositories.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
