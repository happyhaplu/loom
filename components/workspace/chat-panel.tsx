'use client'

import { useState } from 'react'
import {
  ArrowUp,
  Sparkles,
  FileCode2,
  GitCommitHorizontal,
  CheckCircle2,
  ListChecks,
  AlertTriangle,
  Wrench,
} from 'lucide-react'
import { CreditTicker } from '@/components/credit-ticker'
import { cn } from '@/lib/utils'

export function ChatPanel() {
  const [value, setValue] = useState('')

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229
    ) {
      e.preventDefault()
      setValue('')
    }
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Scrollable transcript */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-xl flex-col gap-5">
          {/* User message */}
          <UserBubble>
            A CRM to track my sales pipeline with deal stages, contact notes,
            and reminders.
          </UserBubble>

          {/* Agent plan */}
          <AgentBlock>
            <p className="text-sm leading-relaxed">
              Great — I&apos;ll build a Kanban-style CRM. Here&apos;s the plan:
            </p>
            <div className="mt-3 rounded-lg border border-border bg-background p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <ListChecks className="size-3.5" />
                PLAN
              </div>
              <ul className="flex flex-col gap-1.5 text-sm">
                {[
                  'Set up the board with Lead → Won stages',
                  'Deal cards with value, contact, and owner',
                  'Contact drawer with notes timeline',
                  'Reminder chips with due dates',
                ].map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </AgentBlock>

          {/* Steps */}
          <AgentBlock>
            <div className="flex flex-col gap-1.5">
              <StepRow icon={FileCode2} label="Writing" mono="app/board/page.tsx" done />
              <StepRow icon={FileCode2} label="Writing" mono="components/deal-card.tsx" done />
              <StepRow
                icon={GitCommitHorizontal}
                label="Commit"
                mono="feat: pipeline board + deal cards"
                done
              />
            </div>
          </AgentBlock>

          {/* Error correction */}
          <AgentBlock tone="warn">
            <div className="flex items-center gap-2 text-sm font-medium text-energy-foreground">
              <AlertTriangle className="size-4" />
              Caught a build error
            </div>
            <p className="mt-1.5 font-mono text-xs text-muted-foreground">
              Type error: &apos;stage&apos; is possibly undefined in
              deal-card.tsx
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Wrench className="size-3.5 text-primary" />
              Fixing it myself — added a fallback stage…
            </div>
          </AgentBlock>

          {/* Verified */}
          <AgentBlock>
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="size-4 text-primary" />
              Verified — the preview is live on the right.
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Try dragging a deal between stages. Want me to add email
              reminders or an activity feed next?
            </p>
          </AgentBlock>
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border p-3">
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-border bg-background focus-within:border-ring/50 focus-within:ring-4 focus-within:ring-ring/10">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask for a change, or describe the next feature…"
              className="w-full resize-none bg-transparent px-3.5 pt-3 pb-1 text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
              <CreditTicker credits={64} size="sm" />
              <button
                disabled={!value.trim()}
                aria-label="Send"
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg transition-all',
                  value.trim()
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Each message uses credits based on the work involved.
          </p>
        </div>
      </div>
    </div>
  )
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
        {children}
      </div>
    </div>
  )
}

function AgentBlock({
  children,
  tone = 'default',
}: {
  children: React.ReactNode
  tone?: 'default' | 'warn'
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
        <Sparkles className="size-4" />
      </div>
      <div
        className={cn(
          'min-w-0 flex-1 rounded-2xl rounded-tl-sm border px-4 py-3',
          tone === 'warn'
            ? 'border-energy/30 bg-energy-muted/40'
            : 'border-border bg-background',
        )}
      >
        {children}
      </div>
    </div>
  )
}

function StepRow({
  icon: Icon,
  label,
  mono,
  done,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  mono: string
  done?: boolean
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="text-muted-foreground">{label}</span>
      <code className="truncate rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
        {mono}
      </code>
      {done && <CheckCircle2 className="ml-auto size-3.5 shrink-0 text-primary" />}
    </div>
  )
}
