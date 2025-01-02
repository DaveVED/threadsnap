import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { AnimatedGridBackground } from "~/components/animated-grid-background";
import { FloatingElements } from "~/components/floating-elements";
import { SiteHeader } from "~/components/site-header";
import { ThemeProvider } from "~/components/theme-provider";
import { ThreadProvider } from "~/components/thread-provider";
import { Toaster } from "~/components/ui/toaster";
import { env } from "~/env";
import { Footer } from "~/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://threadsnap.dev"
      : "http://localhost:3000",
  ),
  title: "ThreadSnap",
  description:
    "ThreadSnap transforms X/Twitter threads into customizable React components. Perfect for embedding in your React projects or creating interactive archives.",
  openGraph: {
    title: "threadsnap",
    description:
      "ThreadSnap transforms X/Twitter threads into customizable React components. Perfect for embedding in your React projects or creating interactive archives.",
    url: "https://threadsnap.dev",
    siteName: "threadsnap",
  },
  twitter: {
    card: "summary_large_image",
    site: "@RateDaveR",
    creator: "@RateDaveR",
  },
  icons: {
    icon: "/threadsnap-icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThreadProvider>
            <TRPCReactProvider>
              <div className="relative">
                <AnimatedGridBackground />
                <FloatingElements />
                <SiteHeader />
                {props.children}
                <Footer />
                <Toaster />
              </div>
            </TRPCReactProvider>
          </ThreadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
