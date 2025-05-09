"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CodeExplainer } from "@/components/ai-features/code-explainer"

interface AIExplanationPanelProps {
  isExpanded: boolean
  code: string
  language: string
  title: string
}

export function AIExplanationPanel({ isExpanded, code, language, title }: AIExplanationPanelProps) {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-t border-border/40 p-4">
            <CodeExplainer code={code} language={language} title={`AI Insights: ${title}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
