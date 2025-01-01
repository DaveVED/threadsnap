"use client"

import * as React from "react"
import { Copy, Save, Trash2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"
// Mock Twitter thread data

interface ThreadPreviewProps {
    onClear: () => void;
  }

  const handleSave = () => {
    console.log("Saving thread...")
    // TODO: Implement actual save functionality
  }

  const handleCopy = () => {
    console.log("Copying code...")
    // TODO: Implement actual copy functionality
  }

export function ThreadPreview({ onClear }: ThreadPreviewProps) {
  return (
    <div className="not-prose relative rounded-xl overflow-hidden border">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
              <Save className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClear}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          </div>
        </div>
        <TabsContent value="preview" className="p-4">
          xxxxxx
        </TabsContent>
        <TabsContent value="code" className="p-4">
          xxxx
        </TabsContent>
      </Tabs>
    </div>
  )
}