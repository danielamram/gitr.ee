"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lightbulb, ArrowRight, RefreshCw, Layers, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface CodeExplainerProps {
  code: string
  language: string
  title?: string
}

export function CodeExplainer({ code, language, title }: CodeExplainerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("explanation")

  // Mock data for AI explanations
  const mockExplanation = {
    summary:
      "This code implements optimistic UI updates in React, allowing the interface to update immediately before the server confirms the change.",
    explanation: [
      {
        title: "State Initialization",
        content: "The component initializes state for todos and a new todo input field using the useState hook.",
      },
      {
        title: "Optimistic Update Pattern",
        content: "When adding a todo, the UI is updated immediately with a temporary ID before the server responds.",
      },
      {
        title: "Error Handling",
        content: "If the server request fails, the optimistic update is reverted by filtering out the temporary todo.",
      },
      {
        title: "ID Reconciliation",
        content:
          "Once the server responds successfully, the temporary ID is replaced with the real ID from the server.",
      },
    ],
    alternatives: [
      {
        title: "Using React Query",
        code: `import { useMutation, useQueryClient } from 'react-query';

function TodoList() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');
  
  const mutation = useMutation(
    (text) => fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()),
    {
      // When mutate is called:
      onMutate: async (text) => {
        // Cancel any outgoing refetches
        await queryClient.cancelQueries('todos');
        
        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData('todos');
        
        // Optimistically update to the new value
        queryClient.setQueryData('todos', old => [
          ...old, 
          { id: Date.now(), text, completed: false }
        ]);
        
        // Return a context object with the snapshot
        return { previousTodos };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        queryClient.setQueryData('todos', context.previousTodos);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );
  
  const addTodo = (e) => {
    e.preventDefault();
    mutation.mutate(newTodo);
    setNewTodo('');
  };
  
  return (
    // Component JSX
  );
}`,
        explanation:
          "This alternative uses React Query's useMutation hook which provides built-in support for optimistic updates with automatic rollback on errors.",
      },
      {
        title: "Using SWR",
        code: `import useSWR, { mutate } from 'swr';

function TodoList() {
  const { data: todos = [] } = useSWR('/api/todos');
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = async (e) => {
    e.preventDefault();
    
    const tempId = Date.now();
    const tempTodo = { id: tempId, text: newTodo, completed: false };
    
    // Optimistically update the local data
    mutate('/api/todos', [...todos, tempTodo], false);
    setNewTodo('');
    
    try {
      // Send the request to the server
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text: newTodo }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Trigger a revalidation (refetch) to make sure our local data is correct
      mutate('/api/todos');
    } catch (error) {
      // If there's an error, revert the optimistic update and trigger a revalidation
      mutate('/api/todos');
      alert('Failed to add todo');
    }
  };
  
  return (
    // Component JSX
  );
}`,
        explanation:
          "This approach uses SWR (stale-while-revalidate), which provides a simpler API for data fetching with built-in revalidation.",
      },
    ],
    bestPractices: [
      "Always handle error cases to revert optimistic updates when server requests fail",
      "Use a unique temporary ID for new items to correctly identify them later",
      "Consider using libraries like React Query or SWR that handle optimistic updates elegantly",
      "Keep the optimistic update logic separate from the UI rendering logic",
      "Provide feedback to users when operations succeed or fail",
    ],
    performance: {
      rating: "Good",
      notes:
        "This implementation is efficient for small to medium-sized lists. For larger lists, consider using virtualization and more efficient state updates.",
    },
  }

  const handleGenerateExplanation = () => {
    setIsLoading(true)
    // Simulate API call to AI service
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="border border-border/40 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-2">
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
          {title || "AI Code Insights"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="explanation" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="explanation" className="flex-1">
              <Lightbulb className="h-4 w-4 mr-2" />
              Explanation
            </TabsTrigger>
            <TabsTrigger value="alternatives" className="flex-1">
              <Layers className="h-4 w-4 mr-2" />
              Alternatives
            </TabsTrigger>
            <TabsTrigger value="bestPractices" className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              Best Practices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explanation" className="p-4 space-y-4">
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="font-medium">{mockExplanation.summary}</p>
            </div>

            <div className="space-y-3">
              {mockExplanation.explanation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-md p-3"
                >
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="sm" onClick={handleGenerateExplanation} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating insights...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Regenerate explanation
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="alternatives" className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Here are alternative approaches to solve the same problem with different techniques or libraries:
            </p>

            <div className="space-y-6">
              {mockExplanation.alternatives.map((alternative, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <div className="p-3 border-b bg-muted/30">
                    <h3 className="font-medium">{alternative.title}</h3>
                  </div>
                  <div className="bg-muted/10">
                    <CodeBlock code={alternative.code} language="jsx" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm">{alternative.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bestPractices" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Performance Rating</h3>
                <Badge
                  variant="outline"
                  className={
                    mockExplanation.performance.rating === "Excellent"
                      ? "bg-green-500/10 text-green-500"
                      : mockExplanation.performance.rating === "Good"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-yellow-500/10 text-yellow-500"
                  }
                >
                  {mockExplanation.performance.rating}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{mockExplanation.performance.notes}</p>

              <h3 className="font-medium mt-4">Best Practices</h3>
              <ul className="space-y-2">
                {mockExplanation.bestPractices.map((practice, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-green-500" />
                    <span className="text-sm">{practice}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
