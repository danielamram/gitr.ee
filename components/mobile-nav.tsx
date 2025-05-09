"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Compass,
  Star,
  Bookmark,
  MessageSquare,
  Settings,
  Zap,
  TrendingUpIcon as Trending,
  Code,
  Bell,
  Search,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const mainNavItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Explore",
      href: "/explore",
      icon: <Compass className="h-5 w-5" />,
    },
    {
      title: "Trending",
      href: "/trending",
      icon: <Trending className="h-5 w-5" />,
    },
    {
      title: "Search",
      href: "/search",
      icon: <Search className="h-5 w-5" />,
    },
  ]

  const categoriesNavItems: NavItem[] = [
    {
      title: "Frontend",
      href: "/category/frontend",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Backend",
      href: "/category/backend",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "AI & ML",
      href: "/category/ai-ml",
      icon: <Zap className="h-5 w-5" />,
    },
  ]

  const userNavItems: NavItem[] = [
    {
      title: "Starred",
      href: "/starred",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Saved",
      href: "/saved",
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs",
            pathname === "/" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Home className="h-5 w-5" />
          <span className="mt-1">Home</span>
        </Link>
        <Link
          href="/explore"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs",
            pathname === "/explore" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Compass className="h-5 w-5" />
          <span className="mt-1">Explore</span>
        </Link>
        <Link
          href="/saved"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs",
            pathname === "/saved" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Bookmark className="h-5 w-5" />
          <span className="mt-1">Saved</span>
        </Link>
        <Link
          href="/notifications"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs",
            pathname === "/notifications" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Bell className="h-5 w-5" />
          <span className="mt-1">Alerts</span>
        </Link>
      </div>
    </div>
  )
}
