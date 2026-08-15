import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

type CreditTickerProps = {
  credits: number
  total?: number
  className?: string
  size?: 'sm' | 'md'
}

export function CreditTicker({
  credits,
  total = 100,
  className,
  size = 'md',
}: CreditTickerProps) {
  const pct = Math.max(0, Math.min(100, (credits / total) * 100))
  const empty = credits <= 0

  return (
    <div
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border bg-card pr-3 transition-colors',
        size === 'md' ? 'h-9 pl-1' : 'h-7 pl-0.5',
        empty ? 'border-destructive/30' : 'border-border',
        className,
      )}
    >
      <span
        className={cn(
          'flex aspect-square items-center justify-center rounded-full',
          size === 'md' ? 'h-7' : 'h-6',
          empty
            ? 'bg-destructive/10 text-destructive'
            : 'bg-energy-muted text-energy-foreground',
        )}
      >
        <Zap
          className={cn(size === 'md' ? 'size-3.5' : 'size-3', 'fill-current')}
        />
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-mono font-medium tabular-nums',
            size === 'md' ? 'text-sm' : 'text-xs',
            empty ? 'text-destructive' : 'text-foreground',
          )}
        >
          {credits}
          <span className="text-muted-foreground">/{total}</span>
        </span>
      </div>
      <div className="relative h-1 w-10 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            empty ? 'bg-destructive' : 'bg-energy',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
