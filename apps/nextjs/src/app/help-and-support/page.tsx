"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Github } from 'lucide-react'

export default function HelpAndSupportPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By using our service, you agree to these Terms of Service. If you disagree with any part of the terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground">
              We provide a free service for managing and organizing thread snapshots. Our service includes basic features for capturing, storing, and organizing thread content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You agree to provide accurate and complete information when creating your account.</li>
              <li>You are solely responsible for the content you upload to our service.</li>
              <li>You agree to use the service in compliance with all applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Service Availability</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This is currently a free service, and as such:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We reserve the right to terminate or modify the service at any time without prior notice.</li>
                <li>We make no guarantees about the availability or reliability of the service.</li>
                <li>If the service becomes paid in the future, these terms will be amended accordingly.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Open Source Components</h2>
            <p className="text-muted-foreground mb-4">
              The components used in this service are open source and freely available for use under their respective licenses. You can find the source code and contribute to the project on GitHub.
            </p>
          </section>

          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground">Need help or want to report an issue?</p>
                <Button asChild>
                  <a
                    href="https://github.com/DaveVED/threadsnap/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Open GitHub Issue
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

