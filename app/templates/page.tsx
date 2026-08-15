import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { templates } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function TemplatesPage() {
  return (
    <AppShell title="Templates">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="max-w-xl">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Templates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start from a proven foundation. Every template is a real,
            editable app — Loom just gives you a head start.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <Link
              key={t.id}
              href="/workspace"
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {t.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap className="size-3 fill-energy text-energy" />
                  <span className="font-mono tabular-nums">{t.credits}</span>
                </span>
              </div>

              <div
                className={cn(
                  'mt-4 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br',
                  gradients[i % gradients.length],
                )}
              >
                <div className="grain absolute h-24 w-[calc(100%-2.5rem)] rounded-lg opacity-30" />
                <span className="font-display text-3xl font-semibold text-background/90">
                  {t.name.charAt(0)}
                </span>
              </div>

              <h3 className="mt-4 font-display font-semibold tracking-tight">
                {t.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>

              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Use template <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

const gradients = [
  'from-[oklch(0.55_0.09_200)] to-[oklch(0.48_0.083_195)]',
  'from-[oklch(0.72_0.15_68)] to-[oklch(0.62_0.13_55)]',
  'from-[oklch(0.6_0.11_300)] to-[oklch(0.52_0.12_285)]',
  'from-[oklch(0.6_0.09_160)] to-[oklch(0.5_0.09_175)]',
  'from-[oklch(0.58_0.1_230)] to-[oklch(0.5_0.1_245)]',
  'from-[oklch(0.68_0.13_30)] to-[oklch(0.58_0.14_20)]',
]
