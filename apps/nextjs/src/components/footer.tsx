"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// Removed Github and Twitter imports from lucide-react
import { GitHubIcon, TwitterIcon } from "~/components/icons";

import { Alert, AlertDescription } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col gap-4 px-4 py-6">
        <Alert variant="default" className="border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm text-primary">
            This site is currently under active development. Features and functionality may change.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ThreadSnap. All rights reserved.
          </p>
          
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link 
              href="/help-and-support" 
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/help-and-support" 
              className="hover:text-primary transition-colors"
            >
              Support
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

