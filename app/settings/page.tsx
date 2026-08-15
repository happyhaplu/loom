import Link from 'next/link'
import { Zap, ArrowUpRight, Wrench, FileCode2, Rocket } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const usage = [
  { icon: Rocket, project: 'Aurora CRM', action: 'Generated pipeline board', cost: 8, time: '2 hours ago' },
  { icon: Wrench, project: 'Aurora CRM', action: 'Auto-fixed build error', cost: 1, time: '2 hours ago' },
  { icon: FileCode2, project: 'Ledger', action: 'Added PDF export', cost: 6, time: 'Yesterday' },
  { icon: Rocket, project: 'Sundial', action: 'Generated analytics view', cost: 11, time: '5 days ago' },
  { icon: FileCode2, project: 'Chorus', action: 'Edited weekly digest', cost: 4, time: '2 weeks ago' },
]

const usedThisMonth = 36
const total = 100
const remaining = total - usedThisMonth

export default function SettingsPage() {
  const pct = (remaining / total) * 100

  return (
    <AppShell title="Settings">
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, credits, and usage.
        </p>

        {/* Credit balance */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="size-4 fill-energy text-energy" />
                Credit balance
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tabular-nums tracking-tight">
                  {remaining}
                </span>
                <span className="text-muted-foreground">
                  / {total} this month
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Resets on Feb 1 · Free plan
              </p>
            </div>
            <Button
              render={<Link href="/pricing" />}
              size="lg"
              data-icon="inline-end"
              className="bg-energy text-energy-foreground hover:bg-energy/85"
            >
              Get more credits
              <ArrowUpRight />
            </Button>
          </div>
          <div className="h-2 w-full bg-muted">
            <div
              className="h-full rounded-r-full bg-energy"
              style={{ width: `${pct}%` }}
            />
          </div>
        </section>

        {/* Profile */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold tracking-tight">
            Profile
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 font-display text-lg font-semibold text-primary">
              MK
            </div>
            <div className="flex-1">
              <div className="font-medium">Maya Kapoor</div>
              <div className="text-sm text-muted-foreground">
                maya@studio.co
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </section>

        {/* Usage log */}
        <section className="mt-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-display text-base font-semibold tracking-tight">
              Recent usage
            </h2>
            <span className="text-sm text-muted-foreground">
              <span className="font-mono tabular-nums">{usedThisMonth}</span>{' '}
              credits used
            </span>
          </div>
          <ul>
            {usage.map((u, i) => (
              <li
                key={i}
                className={cn(
                  'flex items-center gap-3 px-6 py-3.5',
                  i !== usage.length - 1 && 'border-b border-border',
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <u.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {u.action}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {u.project} · {u.time}
                  </div>
                </div>
                <span className="flex items-center gap-1 font-mono text-sm tabular-nums text-muted-foreground">
                  -{u.cost}
                  <Zap className="size-3 fill-energy text-energy" />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Billing and invoices arrive with paid plans.
        </p>
      </div>
    </AppShell>
  )
}
