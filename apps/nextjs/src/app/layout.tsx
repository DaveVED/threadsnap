import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";
import { SiteHeader } from "~/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://acme.dev"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Transform X/Twitter threads into React components",
  openGraph: {
    title: "acme",
    description: "Transform X/Twitter threads into React components",
    url: "https://acme.com",
    siteName: "acme",
  },
  twitter: {
    card: "summary_large_image",
    site: "@RateDaveR",
    creator: "@RateDaveR",
  },
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
          <TRPCReactProvider>
          <SiteHeader />
            {props.children}</TRPCReactProvider>
      </body>
    </html>
  );
}