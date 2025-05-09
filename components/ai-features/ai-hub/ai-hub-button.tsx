"use client"

import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import { motion } from "framer-motion"

interface AIHubButtonProps {
  onClick: () => void
  isExpanded: boolean
}

export function AIHubButton({ onClick, isExpanded }: AIHubButtonProps) {
  if (isExpanded) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
      >
        <Brain className="h-5 w-5 mr-2" />
        Open AI Assistant Hub
      </Button>
    </motion.div>
  )
}
