'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  LayoutGrid,
  Shapes,
  Search,
  Plus,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import { LoomMark } from '@/components/loom-mark'
import { CreditTicker } from '@/components/credit-ticker'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: LayoutGrid },
  { href: '/templates', label: 'Templates', icon: Shapes },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const recent = projects.slice(0, 4)

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-4 pt-5"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <LoomMark className="size-4" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display text-base font-semibold tracking-tight">
            Loom
          </span>
          <span className="text-[11px] text-muted-foreground">
            Weave ideas into apps
          </span>
        </span>
      </Link>

      {/* Search */}
      <div className="px-3 pt-5">
        <button
          className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          type="button"
        >
          <Search className="size-4" />
          Search projects
          <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </button>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-col gap-0.5 px-3 pt-4">
        {nav.map((item) => {
          const Icon = item.icon
          const active =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Recent */}
      <div className="mt-6 flex min-h-0 flex-1 flex-col px-3">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Recent
        </p>
        <div className="flex flex-col gap-0.5 overflow-y-auto">
          {recent.map((project) => (
            <Link
              key={project.id}
              href="/workspace"
              onClick={onNavigate}
              className="group flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span
                className={cn(
                  'size-2 shrink-0 rounded-full bg-gradient-to-br',
                  project.gradient,
                )}
              />
              <span className="truncate">{project.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="mt-2 border-t border-border p-3">
        <Link
          href="/settings"
          onClick={onNavigate}
          className="mb-2 block"
        >
          <CreditTicker credits={64} size="sm" className="w-full justify-start" />
        </Link>
        <Link
          href="/settings"
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted',
            pathname.startsWith('/settings') && 'bg-muted',
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-semibold text-primary">
            MK
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">Maya Kapoor</span>
            <span className="text-[11px] text-muted-foreground">
              Settings &amp; billing
            </span>
          </span>
          <Settings className="ml-auto size-4 text-muted-foreground" />
        </Link>
      </div>
    </div>
  )
}

export function AppShell({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card/40 md:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-background shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
          >
            <Menu className="size-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LoomMark className="size-4" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              Loom
            </span>
          </Link>
          {title && (
            <span className="truncate text-sm font-medium text-muted-foreground">
              / {title}
            </span>
          )}
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            size="sm"
            data-icon="inline-start"
            className="ml-auto"
          >
            <Plus />
            New
          </Button>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
