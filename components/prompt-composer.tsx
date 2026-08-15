'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, Paperclip, Sparkles, Globe, Frame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { promptSuggestions } from '@/lib/data'
import { LoomMark } from '@/components/loom-mark'

export function PromptComposer() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function submit() {
    if (!value.trim()) return
    router.push('/workspace')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229
    ) {
      e.preventDefault()
      submit()
    }
  }

  const ready = value.trim().length > 0

  return (
    <div className="w-full">
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow',
          'focus-within:border-ring/50 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-ring/10',
        )}
      >
        {/* Header strip — sets the writing surface apart */}
        <div className="flex items-center justify-between gap-2 border-b border-border/70 bg-muted/40 px-4 py-2">
          <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <LoomMark className="size-3.5 text-primary" />
            Describe your app
          </span>
          <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
            <Sparkles className="size-3 text-energy" />
            <span className="font-mono">~8</span> credits per build
          </span>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="A CRM to track my sales pipeline with deal stages and reminders…"
          className="w-full resize-none bg-transparent px-4 pt-4 pb-2 text-base leading-relaxed outline-none placeholder:text-muted-foreground"
        />

        <div className="flex items-center justify-between gap-2 px-3 pb-3">
          <div className="flex items-center gap-1">
            <ComposerChip icon={Paperclip} label="Attach" />
            <ComposerChip icon={Frame} label="Figma" />
            <ComposerChip icon={Globe} label="URL" />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-1 text-[11px] text-muted-foreground md:flex">
              <kbd className="rounded border border-border bg-muted px-1 font-mono">
                ⏎
              </kbd>
              to build
            </span>
            <button
              onClick={submit}
              disabled={!ready}
              className={cn(
                'flex h-10 items-center gap-2 rounded-xl pl-4 pr-3.5 text-sm font-semibold transition-all',
                ready
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-inset ring-primary-foreground/15 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:translate-y-px'
                  : 'cursor-not-allowed bg-primary/25 text-primary-foreground/70',
              )}
            >
              Build
              <span
                className={cn(
                  'flex size-5 items-center justify-center rounded-md transition-colors',
                  ready ? 'bg-primary-foreground/20' : 'bg-transparent',
                )}
              >
                <ArrowUp className="size-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {promptSuggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setValue(s)
              textareaRef.current?.focus()
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function ComposerChip({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      <Icon className="size-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
