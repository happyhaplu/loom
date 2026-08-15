'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  Sparkles,
  MessagesSquare,
  MonitorPlay,
  Share2,
  Rocket,
} from 'lucide-react'
import { ChatPanel } from '@/components/workspace/chat-panel'
import { PreviewPanel } from '@/components/workspace/preview-panel'
import { CreditTicker } from '@/components/credit-ticker'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MobileView = 'chat' | 'preview'

export default function WorkspacePage() {
  const [mobileView, setMobileView] = useState<MobileView>('preview')

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-3 md:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/projects"
            aria-label="Back to projects"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="size-5" />
          </Link>
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-sm font-semibold tracking-tight">
              Aurora CRM
            </span>
            <span className="hidden truncate text-xs text-muted-foreground sm:block">
              Edited 2 hours ago · auto-saved
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CreditTicker credits={64} size="sm" className="hidden sm:inline-flex" />
          <Button variant="outline" size="sm" data-icon="inline-start" className="hidden sm:inline-flex">
            <Share2 />
            Share
          </Button>
          <Button size="sm" data-icon="inline-start">
            <Rocket />
            Publish
          </Button>
        </div>
      </header>

      {/* Mobile view toggle */}
      <div className="flex shrink-0 items-center gap-1 border-b border-border bg-background p-1.5 md:hidden">
        <MobileTab
          active={mobileView === 'chat'}
          onClick={() => setMobileView('chat')}
          icon={MessagesSquare}
          label="Chat"
        />
        <MobileTab
          active={mobileView === 'preview'}
          onClick={() => setMobileView('preview')}
          icon={MonitorPlay}
          label="Preview"
        />
      </div>

      {/* Split layout */}
      <div className="flex min-h-0 flex-1">
        <div
          className={cn(
            'w-full shrink-0 border-r border-border md:block md:w-[420px] lg:w-[460px]',
            mobileView === 'chat' ? 'block' : 'hidden',
          )}
        >
          <ChatPanel />
        </div>
        <div
          className={cn(
            'min-w-0 flex-1 md:block',
            mobileView === 'preview' ? 'block' : 'hidden',
          )}
        >
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}

function MobileTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
