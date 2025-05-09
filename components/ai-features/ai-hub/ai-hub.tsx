"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { AIHubButton } from "./ai-hub-button"
import { AIHubHeader } from "./ai-hub-header"
import { AIHubTabs } from "./ai-hub-tabs"
import { AIHubContent } from "./ai-hub-content"

export function AIHub() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("feed")

  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border border-border/40">
              <AIHubHeader onClose={() => setIsExpanded(false)} />
              <CardContent className="p-0">
                <AIHubTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <AIHubContent activeTab={activeTab} />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <AIHubButton onClick={() => setIsExpanded(true)} isExpanded={isExpanded} />
        )}
      </AnimatePresence>
    </div>
  )
}
