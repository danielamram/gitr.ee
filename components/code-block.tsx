"use client";

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
import { useEffect } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

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

  return (
    <pre className="p-4 overflow-x-auto text-sm" style={{ margin: 0 }}>
      <code className={`language-${getPrismLanguage(language)}`}>{code}</code>
    </pre>
  );
}
