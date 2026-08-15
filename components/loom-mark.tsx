import { cn } from '@/lib/utils'

/**
 * Loom brand mark — a woven "endless knot" of two warp and two weft threads
 * that pass alternately over and under one another. The gaps at each crossing
 * read as a genuine weave, giving Loom a distinctive, memorable symbol.
 * Uses currentColor so it inherits theming from its container.
 */
export function LoomMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.3}
      strokeLinecap="round"
      className={cn('size-4', className)}
      aria-hidden="true"
    >
      {/* warp — left thread: over at top crossing, under at bottom crossing */}
      <path d="M9 3.2 V13.4 M9 15.8 V20.8" />
      {/* warp — right thread: under at top crossing, over at bottom crossing */}
      <path d="M15 3.2 V8.2 M15 10.6 V20.8" />
      {/* weft — top thread: under at left crossing, over at right crossing */}
      <path d="M3.2 9 H8.2 M10.6 9 H20.8" />
      {/* weft — bottom thread: over at left crossing, under at right crossing */}
      <path d="M3.2 15 H13.4 M15.8 15 H20.8" />
    </svg>
  )
}
