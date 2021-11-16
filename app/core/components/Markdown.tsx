import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const Markdown: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
)
