'use client'

import { useState } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Terminal,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Device = 'desktop' | 'tablet' | 'mobile'
type Tab = 'preview' | 'code'

const deviceWidth: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

export function PreviewPanel() {
  const [tab, setTab] = useState<Tab>('preview')
  const [device, setDevice] = useState<Device>('desktop')
  const [showLogs, setShowLogs] = useState(true)

  return (
    <div className="flex h-full flex-col bg-muted/40">
      {/* Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-3">
        {/* Preview / Code toggle */}
        <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
          {(['preview', 'code'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors',
                tab === t
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* URL bar */}
        <div className="hidden min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-1 md:flex">
          <span className="size-2 shrink-0 rounded-full bg-primary" />
          <span className="truncate font-mono text-xs text-muted-foreground">
            aurora-crm.loom.app
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          {tab === 'preview' && (
            <div className="mr-1 hidden items-center gap-0.5 rounded-lg bg-muted p-0.5 sm:flex">
              <DeviceBtn active={device === 'desktop'} onClick={() => setDevice('desktop')} icon={Monitor} label="Desktop" />
              <DeviceBtn active={device === 'tablet'} onClick={() => setDevice('tablet')} icon={Tablet} label="Tablet" />
              <DeviceBtn active={device === 'mobile'} onClick={() => setDevice('mobile')} icon={Smartphone} label="Mobile" />
            </div>
          )}
          <IconBtn icon={RotateCw} label="Reload" />
          <IconBtn icon={ExternalLink} label="Open in new tab" />
        </div>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-hidden p-3">
        {tab === 'preview' ? (
          <div className="mx-auto h-full overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all"
            style={{ maxWidth: deviceWidth[device] }}
          >
            <CrmPreview />
          </div>
        ) : (
          <CodeView />
        )}
      </div>

      {/* Terminal / logs */}
      <div className="shrink-0 border-t border-border bg-background">
        <button
          onClick={() => setShowLogs((s) => !s)}
          className="flex w-full items-center gap-2 px-3 py-2 text-left"
        >
          <Terminal className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Terminal
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            Ready in 1.2s
          </span>
          <ChevronDown
            className={cn(
              'ml-auto size-4 text-muted-foreground transition-transform',
              showLogs && 'rotate-180',
            )}
          />
        </button>
        {showLogs && (
          <div className="max-h-36 overflow-y-auto border-t border-border bg-[oklch(0.2_0.012_260)] px-3 py-2.5 font-mono text-xs leading-relaxed">
            {logLines.map((l, i) => (
              <div key={i} className="flex gap-2">
                <span className="shrink-0 text-[oklch(0.6_0.02_260)]">
                  {l.time}
                </span>
                <span className={l.className}>{l.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const logLines = [
  { time: '12:04:01', text: '▲ Next.js 16.3.0', className: 'text-[oklch(0.85_0.02_260)]' },
  { time: '12:04:01', text: '- Local:  http://localhost:3000', className: 'text-[oklch(0.72_0.08_200)]' },
  { time: '12:04:02', text: '✓ Compiled /board in 842ms', className: 'text-[oklch(0.8_0.12_150)]' },
  { time: '12:04:03', text: '✓ Ready — preview is live', className: 'text-[oklch(0.8_0.12_150)]' },
  { time: '12:04:05', text: 'GET /board 200 in 38ms', className: 'text-[oklch(0.7_0.02_260)]' },
]

function DeviceBtn({
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
      aria-label={label}
      className={cn(
        'flex size-7 items-center justify-center rounded-md transition-colors',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

function IconBtn({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <button
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="size-4" />
    </button>
  )
}

/* ---- Faux rendered app (the "preview") ---- */

const columns = [
  {
    stage: 'Lead',
    accent: 'bg-muted-foreground/40',
    deals: [
      { name: 'Northwind Co.', value: '$4,200', owner: 'MK' },
      { name: 'Beacon Labs', value: '$1,800', owner: 'JT' },
    ],
  },
  {
    stage: 'Qualified',
    accent: 'bg-energy',
    deals: [{ name: 'Vertex Media', value: '$9,500', owner: 'MK' }],
  },
  {
    stage: 'Proposal',
    accent: 'bg-chart-2',
    deals: [
      { name: 'Harbor Freight', value: '$12,000', owner: 'AL' },
      { name: 'Cloudpeak', value: '$6,300', owner: 'MK' },
    ],
  },
  {
    stage: 'Won',
    accent: 'bg-primary',
    deals: [{ name: 'Sunrise Retail', value: '$18,400', owner: 'JT' }],
  },
]

function CrmPreview() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Sales Pipeline
          </h2>
          <p className="text-xs text-muted-foreground">
            $52,400 in open deals
          </p>
        </div>
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
          +
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.stage} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <span className={cn('size-2 rounded-full', col.accent)} />
              <span className="text-sm font-medium">{col.stage}</span>
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {col.deals.length}
              </span>
            </div>
            {col.deals.map((d) => (
              <div
                key={d.name}
                className="rounded-lg border border-border bg-card p-3 shadow-sm"
              >
                <div className="text-sm font-medium">{d.name}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">
                    {d.value}
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                    {d.owner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Code view ---- */

const files = [
  { name: 'app/', depth: 0, dir: true },
  { name: 'board/', depth: 1, dir: true },
  { name: 'page.tsx', depth: 2, active: true },
  { name: 'components/', depth: 0, dir: true },
  { name: 'deal-card.tsx', depth: 1 },
  { name: 'stage-column.tsx', depth: 1 },
  { name: 'lib/', depth: 0, dir: true },
  { name: 'deals.ts', depth: 1 },
]

const code = `export default function BoardPage() {
  const stages = useStages()

  return (
    <main className="p-6">
      <PipelineHeader total={openTotal} />
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage) => (
          <StageColumn
            key={stage.id}
            stage={stage}
            deals={dealsByStage[stage.id]}
          />
        ))}
      </div>
    </main>
  )
}`

function CodeView() {
  return (
    <div className="flex h-full overflow-hidden rounded-xl border border-border bg-background">
      {/* file tree */}
      <div className="hidden w-48 shrink-0 overflow-y-auto border-r border-border bg-muted/30 py-2 sm:block">
        {files.map((f) => (
          <div
            key={f.name + f.depth}
            className={cn(
              'flex items-center py-1 pr-2 font-mono text-xs',
              f.active
                ? 'bg-primary/10 text-primary'
                : f.dir
                  ? 'text-foreground/70'
                  : 'text-muted-foreground',
            )}
            style={{ paddingLeft: `${0.75 + f.depth * 0.75}rem` }}
          >
            {f.name}
          </div>
        ))}
      </div>
      {/* code */}
      <div className="min-w-0 flex-1 overflow-auto">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
            board/page.tsx
          </span>
        </div>
        <pre className="overflow-auto p-4 font-mono text-xs leading-relaxed text-foreground/85">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
