'use client'

import { useState } from "react"
import { Scissors } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export function InputForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    console.log(`url is ${url}`)
    e.preventDefault()
    onSubmit(url)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Snap a Thread</CardTitle>
        <CardDescription>
          Enter a X/Twitter thread URL to capture and preview it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="url"
            placeholder="https://x.com/username/status/123456789"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Scissors className="h-4 w-4" />
            <span className="sr-only">Snap Thread</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

