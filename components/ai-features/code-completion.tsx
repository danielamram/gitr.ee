"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CodeBlock } from "@/components/code-block"
import { Check, Code, Copy, CornerDownLeft, RefreshCw, Sparkles, ThumbsDown, ThumbsUp, Wand2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CodeCompletion() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [activeTab, setActiveTab] = useState("generate")
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Mock code generation
  const generateCode = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedCode("")

    // Simulate API call to AI service
    setTimeout(() => {
      // Mock generated code based on prompt
      const mockCode = `// Function to fetch data with retry logic
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    console.warn(\`Retrying fetch to \${url} in \${backoff}ms... Attempts left: \${retries}\`);
    
    // Wait for the backoff period
    await new Promise(resolve => setTimeout(resolve, backoff));
    
    // Retry with exponential backoff
    return fetchWithRetry(
      url, 
      options, 
      retries - 1, 
      backoff * 2
    );
  }
}

// Example usage
async function getData() {
  try {
    const data = await fetchWithRetry('https://api.example.com/data');
    console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch data after multiple retries:', error);
    throw error;
  }
}`

      setGeneratedCode(mockCode)
      setIsGenerating(false)
      setActiveTab("result")
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Generate on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      generateCode()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type)
    // In a real app, you would send this feedback to your API
  }

  const resetGenerator = () => {
    setPrompt("")
    setGeneratedCode("")
    setFeedback(null)
    setActiveTab("generate")
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  // Auto-focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  return (
    <Card className="border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Wand2 className="h-5 w-5 mr-2 text-purple-500" />
          AI Code Generator
        </CardTitle>
        <Badge variant="outline" className="flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          Powered by GPT-4
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="generate" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="generate" className="flex-1">
              <Code className="h-4 w-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="result" className="flex-1" disabled={!generatedCode}>
              <Sparkles className="h-4 w-4 mr-2" />
              Result
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Describe the code you want to generate. Be specific about functionality, language, and any special
                requirements.
              </p>

              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="E.g., Create a JavaScript function that fetches data from an API with retry logic"
                className="min-h-[150px] font-mono text-sm"
              />

              <div className="text-xs text-muted-foreground flex items-center">
                <CornerDownLeft className="h-3 w-3 mr-1" />
                Press <kbd className="mx-1 px-1 py-0.5 border rounded">Ctrl</kbd> +{" "}
                <kbd className="mx-1 px-1 py-0.5 border rounded">Enter</kbd> to generate
              </div>
            </div>
          </TabsContent>

          <TabsContent value="result" className="p-0">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 flex flex-col items-center justify-center"
                >
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Generating your code...</p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
                  <div className="bg-muted/30">
                    <CodeBlock code={generatedCode} language="javascript" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between">
        <Button variant="outline" onClick={resetGenerator}>
          <RefreshCw className="h-4 w-4 mr-2" />
          New Generation
        </Button>

        {activeTab === "generate" ? (
          <Button onClick={generateCode} disabled={!prompt.trim() || isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Code
              </>
            )}
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            {feedback === null ? (
              <>
                <Button variant="outline" size="icon" onClick={() => handleFeedback("negative")}>
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleFeedback("positive")}>
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" disabled>
                {feedback === "positive" ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Thanks for your feedback!
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2 text-red-500" />
                    We'll improve our results
                  </>
                )}
              </Button>
            )}
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
