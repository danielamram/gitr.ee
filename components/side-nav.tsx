"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  Github,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function SideNav() {
  const pathname = usePathname()

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
    <div className="flex flex-col h-full py-4 w-[240px]">
      <div className="flex items-center gap-2 px-4 py-2 mb-4 md:hidden">
        <Github className="h-6 w-6" />
        <span className="font-bold text-xl">gitr.ee</span>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-muted-foreground">Discover</h2>
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-secondary text-secondary-foreground")}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-muted-foreground">Categories</h2>
        <div className="space-y-1">
          {categoriesNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-secondary text-secondary-foreground")}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-muted-foreground">Your Library</h2>
        <div className="space-y-1">
          {userNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-secondary text-secondary-foreground")}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
