"use client"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"

interface SnippetCodeProps {
  code: string
  language: string
  isExpanded: boolean
}

export function SnippetCode({ code, language, isExpanded }: SnippetCodeProps) {
  return (
    <div className={cn("bg-muted/30 overflow-hidden transition-all", isExpanded ? "max-h-[800px]" : "max-h-[300px]")}>
      <CodeBlock code={code} language={language} />
    </div>
  )
}
