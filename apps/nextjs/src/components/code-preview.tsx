"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";

interface CodePreviewProps {
  code: string;
  language?: string;
}

export function CodePreview({ code, language = "tsx" }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-4 z-10 h-6 w-6"
        onClick={onCopy}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
