"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Gift, Calendar, Trophy, Star, Award, Crown } from "lucide-react"
import { motion } from "framer-motion"

export function StreakTracker() {
  const [showRewards, setShowRewards] = useState(false)

  // Mock streak data
  const streakData = {
    currentStreak: 12,
    longestStreak: 21,
    todayCompleted: true,
    weeklyProgress: 5, // out of 7 days
    milestones: [
      { days: 7, reward: "Weekly Badge", achieved: true },
      { days: 14, reward: "2-Week Trophy", achieved: false },
      { days: 30, reward: "Monthly Star", achieved: false },
      { days: 100, reward: "Century Award", achieved: false },
      { days: 365, reward: "Annual Crown", achieved: false },
    ],
    nextMilestone: { days: 14, reward: "2-Week Trophy", daysLeft: 2 },
    recentActivity: [
      { date: "2023-05-05", completed: true },
      { date: "2023-05-04", completed: true },
      { date: "2023-05-03", completed: true },
      { date: "2023-05-02", completed: true },
      { date: "2023-05-01", completed: true },
      { date: "2023-04-30", completed: false },
      { date: "2023-04-29", completed: true },
    ],
  }

  // Get icon for milestone
  const getMilestoneIcon = (milestone: { days: number; reward: string; achieved: boolean }) => {
    switch (milestone.days) {
      case 7:
        return <Badge className="h-5 w-5" />
      case 14:
        return <Trophy className="h-5 w-5" />
      case 30:
        return <Star className="h-5 w-5" />
      case 100:
        return <Award className="h-5 w-5" />
      case 365:
        return <Crown className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  return (
    <Card className="border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Flame className="h-5 w-5 mr-2 text-orange-500" />
          Your Learning Streak
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => setShowRewards(!showRewards)}>
          {showRewards ? "Hide Rewards" : "Show Rewards"}
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{streakData.currentStreak}</span>
                <span className="text-sm text-muted-foreground ml-1">days</span>
              </div>
              <p className="text-sm text-muted-foreground">Current streak</p>
            </div>

            <div className="text-right">
              <div className="flex items-baseline justify-end">
                <span className="text-xl font-medium">{streakData.longestStreak}</span>
                <span className="text-sm text-muted-foreground ml-1">days</span>
              </div>
              <p className="text-sm text-muted-foreground">Longest streak</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">This week</span>
              <span className="text-sm text-muted-foreground">{streakData.weeklyProgress}/7 days</span>
            </div>
            <Progress value={(streakData.weeklyProgress / 7) * 100} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Recent activity</span>
            </div>
          </div>

          <div className="flex justify-between">
            {streakData.recentActivity.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 rounded-md flex items-center justify-center ${
                    day.completed ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.completed ? <Flame className="h-4 w-4" /> : "-"}
                </div>
                <span className="text-xs mt-1 text-muted-foreground">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }).charAt(0)}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 p-3 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Gift className="h-5 w-5 mr-2 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Next milestone: {streakData.nextMilestone.reward}</p>
                <p className="text-xs text-muted-foreground">{streakData.nextMilestone.daysLeft} days to go</p>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
          </div>

          {showRewards && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-2"
            >
              <h4 className="font-medium text-sm">Milestone Rewards</h4>
              <div className="grid grid-cols-2 gap-3">
                {streakData.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-3 flex items-center ${
                      milestone.achieved ? "bg-green-500/10 border-green-500/20" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        milestone.achieved ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getMilestoneIcon(milestone)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{milestone.reward}</p>
                      <p className="text-xs text-muted-foreground">{milestone.days} day streak</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
