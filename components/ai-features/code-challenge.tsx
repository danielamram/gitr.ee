"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, Clock, Code, LightbulbIcon, RefreshCw, Send, Sparkles, XCircle } from "lucide-react"
import { motion } from "framer-motion"

export function CodeChallenge() {
  const [activeTab, setActiveTab] = useState("challenge")
  const [userSolution, setUserSolution] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<null | {
    isCorrect: boolean
    score: number
    feedback: string
    improvements: string[]
  }>(null)

  // Mock challenge data
  const challenge = {
    title: "Implement a Debounce Function",
    description:
      "Create a debounce function that limits how often a function can be called. The debounced function should only execute after a specified delay has passed without it being called again.",
    difficulty: "Medium",
    timeEstimate: "15 minutes",
    starterCode: `function debounce(func, delay) {
  // Your implementation here
}

// Example usage:
// const debouncedSearch = debounce(searchFunction, 300);
// input.addEventListener('input', debouncedSearch);`,
    tests: [
      "Should only execute the function after the specified delay",
      "Should reset the timer if called again before the delay expires",
      "Should pass all arguments to the original function",
      "Should maintain the correct 'this' context",
    ],
    solution: `function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}`,
    hints: [
      "You'll need to use setTimeout to delay the execution",
      "Remember to clear any existing timeout if the function is called again",
      "Use the spread operator (...args) to capture all arguments",
      "Use Function.prototype.apply() to maintain the correct 'this' context",
    ],
  }

  const handleSubmit = () => {
    if (!userSolution.trim()) return

    setIsSubmitting(true)

    // Simulate API call to evaluate solution
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Mock feedback (in a real app, this would come from the AI evaluation)
      setFeedback({
        isCorrect: true,
        score: 85,
        feedback:
          "Your solution correctly implements the debounce functionality! It properly delays execution and clears previous timeouts.",
        improvements: [
          "Consider adding a way to cancel the debounced function if needed",
          "You could return a value from the debounced function for more flexibility",
          "For advanced usage, consider adding immediate execution option",
        ],
      })

      // Switch to feedback tab
      setActiveTab("feedback")
    }, 2000)
  }

  const resetChallenge = () => {
    setUserSolution("")
    setIsSubmitted(false)
    setFeedback(null)
    setActiveTab("challenge")
  }

  return (
    <Card className="border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-500" />
          Daily Code Challenge
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            {challenge.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {challenge.timeEstimate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="challenge" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="challenge" className="flex-1">
              <Code className="h-4 w-4 mr-2" />
              Challenge
            </TabsTrigger>
            <TabsTrigger value="hints" className="flex-1">
              <LightbulbIcon className="h-4 w-4 mr-2" />
              Hints
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex-1" disabled={!isSubmitted}>
              <Sparkles className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="challenge" className="p-4 space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
              <p className="text-muted-foreground mb-4">{challenge.description}</p>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Tests Your Solution Should Pass:</h4>
                <ul className="space-y-1">
                  {challenge.tests.map((test, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">•</span>
                      {test}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Starter Code:</h4>
                <div className="bg-muted/30 rounded-md overflow-hidden">
                  <CodeBlock code={challenge.starterCode} language="javascript" />
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Your Solution:</h4>
                <Textarea
                  value={userSolution}
                  onChange={(e) => setUserSolution(e.target.value)}
                  placeholder="Write your solution here..."
                  className="font-mono min-h-[200px]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hints" className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Stuck? Here are some hints to help you solve the challenge:
              </p>

              <div className="space-y-3">
                {challenge.hints.map((hint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: index * 0.2 }}
                    className="border rounded-md p-3"
                  >
                    <p className="text-sm">
                      <span className="font-medium">Hint {index + 1}:</span> {hint}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="p-4">
            {feedback && (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-md ${
                    feedback.isCorrect
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    {feedback.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <h3 className="font-medium">{feedback.isCorrect ? "Solution Accepted!" : "Not Quite Right"}</h3>
                  </div>
                  <p className="text-sm">{feedback.feedback}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Your Score</h3>
                    <span className="font-medium">{feedback.score}/100</span>
                  </div>
                  <Progress value={feedback.score} className="h-2" />
                </div>

                {feedback.improvements.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Potential Improvements:</h3>
                    <ul className="space-y-1">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-blue-500 mr-2">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-muted/30 rounded-md overflow-hidden">
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Example Solution:</h3>
                  </div>
                  <CodeBlock code={challenge.solution} language="javascript" />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between">
        <Button variant="outline" onClick={resetChallenge}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || !userSolution.trim()}>
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Evaluating...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Solution
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
