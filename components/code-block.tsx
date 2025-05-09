"use client";

import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/autoloader/prism-autoloader";
import "prismjs/prism";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      Prism.highlightAll();
    }
  }, [code, language, mounted]);

  if (!mounted) return null;

  // Map language to Prism supported language
  const getPrismLanguage = (lang: string) => {
    const languageMap: Record<string, string> = {
      js: "javascript",
      ts: "typescript",
      jsx: "jsx",
      tsx: "tsx",
      css: "css",
      scss: "scss",
      json: "json",
      md: "markdown",
      bash: "bash",
      sh: "bash",
      yaml: "yaml",
      yml: "yaml",
      py: "python",
      python: "python",
    };

    return languageMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  const prismLanguage = getPrismLanguage(language);

  return (
    <pre
      className={cn("p-4 overflow-x-auto text-xs rounded-md bg-muted")}
      style={{ margin: 0 }}
    >
      <code className={`language-${prismLanguage}`}>{code}</code>
    </pre>
  );
}
