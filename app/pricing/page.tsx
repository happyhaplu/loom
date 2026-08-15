'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Cycle = 'monthly' | 'yearly'

const tiers = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    credits: '100 credits / mo',
    description: 'For trying things out and small experiments.',
    features: ['1 active project', 'Community templates', 'Public preview links'],
    cta: 'Current plan',
    highlight: false,
  },
  {
    name: 'Pro',
    monthly: 20,
    yearly: 16,
    credits: '1,000 credits / mo',
    description: 'For builders shipping real apps every week.',
    features: [
      'Unlimited projects',
      'Custom domains',
      'Remove Loom badge',
      'Priority build queue',
      'Version history',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Studio',
    monthly: 60,
    yearly: 50,
    credits: '4,000 credits / mo',
    description: 'For teams building together at scale.',
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Roles & permissions',
      'Centralized billing',
      'SSO (SAML)',
    ],
    cta: 'Upgrade to Studio',
    highlight: false,
  },
]

const packs = [
  { credits: 500, price: 8 },
  { credits: 1500, price: 20 },
  { credits: 5000, price: 60 },
]

export default function PricingPage() {
  const [cycle, setCycle] = useState<Cycle>('yearly')

  return (
    <AppShell title="Pricing">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Simple credits. Real apps.
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-muted-foreground">
            Credits power every build and edit. Pick a plan or top up any time
            — unused monthly credits roll over for 30 days.
          </p>

          {/* Cycle toggle */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {(['monthly', 'yearly'] as Cycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                  cycle === c
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {c}
                {c === 'yearly' && (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                      cycle === 'yearly'
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-energy-muted text-energy-foreground',
                    )}
                  >
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((tier) => {
            const price = cycle === 'monthly' ? tier.monthly : tier.yearly
            return (
              <div
                key={tier.name}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-card p-6',
                  tier.highlight
                    ? 'border-primary shadow-lg ring-1 ring-primary/20'
                    : 'border-border',
                )}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  {tier.name}
                </h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-tight">
                    ${price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ mo</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-energy-foreground">
                  <Zap className="size-3.5 fill-energy text-energy" />
                  {tier.credits}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tier.description}
                </p>
                <Button
                  variant={tier.highlight ? 'default' : 'outline'}
                  size="lg"
                  className="mt-5 w-full justify-center"
                  disabled={tier.name === 'Free'}
                >
                  {tier.cta}
                </Button>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Credit packs */}
        <div className="mt-12">
          <div className="mb-4 text-center">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Need a top-up?
            </h2>
            <p className="text-sm text-muted-foreground">
              One-time credit packs. No subscription required.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {packs.map((p) => (
              <div
                key={p.credits}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-energy-muted text-energy-foreground">
                    <Zap className="size-4 fill-current" />
                  </span>
                  <div className="leading-tight">
                    <div className="font-mono font-medium tabular-nums">
                      {p.credits.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">credits</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  ${p.price}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
