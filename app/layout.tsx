import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vibe tracking",
  description:
    "Track your daily coding streak and build consistent programming habits. Log projects, unlock achievements, and maintain momentum with AI-powered project ideas. Start your coding journey today!",
  keywords: [
    "coding streak",
    "programming habits",
    "daily coding",
    "developer productivity",
    "coding tracker",
    "programming motivation",
    "coding achievements",
    "project tracker",
    "coding goals",
    "developer tools",
  ],
  authors: [{ name: "Vibe tracking" }],
  creator: "Vibe tracking",
  publisher: "Vibe tracking",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vibe-tracking.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vibe tracking - Daily Coding Streak Tracker",
    description:
      "Track your daily coding streak and build consistent programming habits. Log projects, unlock achievements, and maintain momentum with AI-powered project ideas.",
    url: "https://vibe-tracking.vercel.app",
    siteName: "Vibe tracking",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe tracking - Daily Coding Streak Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe tracking - Daily Coding Streak Tracker",
    description:
      "Track your daily coding streak and build consistent programming habits. Log projects, unlock achievements, and maintain momentum.",
    images: ["/og-image.png"],
    creator: "@vibetracking",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
