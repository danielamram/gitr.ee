"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Check, Clock, Code, RefreshCw, Sparkles, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function DailyChallenge() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Mock challenge data
  const challenge = {
    title: "Implement a Debounce Function",
    description: "Create a function that limits how often another function can be called.",
    difficulty: "Medium",
    timeEstimate: "15 minutes",
    points: 50,
    streak: {
      current: 3,
      bonus: 5, // bonus points per day of streak
    },
  }

  const handleComplete = () => {
    setShowConfetti(true)
    setIsCompleted(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <Card className="border border-border/40 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-500" />
          Daily Challenge
        </CardTitle>
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
          {challenge.difficulty}
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-1">{challenge.title}</h3>
            <p className="text-muted-foreground">{challenge.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{challenge.timeEstimate}</span>
            </div>

            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
              <span className="text-sm font-medium">
                {challenge.points} + {challenge.streak.bonus * challenge.streak.current} streak bonus
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Streak bonus</span>
              <span className="text-sm text-muted-foreground">Day {challenge.streak.current}</span>
            </div>
            <Progress value={(challenge.streak.current / 7) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Complete 7 days in a row for a 2x point multiplier!</p>
          </div>

          <AnimatePresence>
            {isCompleted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 rounded-md p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Challenge completed!</p>
                    <p className="text-sm text-muted-foreground">
                      You earned {challenge.points + challenge.streak.bonus * challenge.streak.current} points
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsCompleted(false)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        {!isCompleted ? (
          <Button className="w-full" asChild>
            <Link href="/challenge">
              <Code className="h-4 w-4 mr-2" />
              Start Challenge
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" asChild>
            <Link href="/challenges">
              <Sparkles className="h-4 w-4 mr-2" />
              View More Challenges
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Confetti animation component
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            backgroundColor: getRandomColor(),
          }}
          animate={{
            top: "100%",
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// Helper function to get random confetti colors
function getRandomColor() {
  const colors = [
    "#FF5252", // red
    "#FF4081", // pink
    "#E040FB", // purple
    "#7C4DFF", // deep purple
    "#536DFE", // indigo
    "#448AFF", // blue
    "#40C4FF", // light blue
    "#18FFFF", // cyan
    "#64FFDA", // teal
    "#69F0AE", // green
    "#B2FF59", // light green
    "#EEFF41", // lime
    "#FFFF00", // yellow
    "#FFD740", // amber
    "#FFAB40", // orange
    "#FF6E40", // deep orange
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
