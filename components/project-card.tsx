import Link from 'next/link'
import { Zap } from 'lucide-react'
import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href="/workspace"
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
    >
      {/* Cover */}
      <div
        className={cn(
          'relative flex h-28 items-center justify-center bg-gradient-to-br',
          project.gradient,
        )}
      >
        <div className="grain absolute inset-0 opacity-30" />
        <span className="relative font-display text-4xl font-semibold text-background/90">
          {project.name.charAt(0)}
        </span>
        <span
          className={cn(
            'absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm',
            'bg-background/80 text-foreground',
          )}
        >
          <span
            className={cn(
              'size-1.5 rounded-full',
              project.status === 'Live'
                ? 'bg-primary'
                : project.status === 'Building'
                  ? 'bg-energy'
                  : 'bg-muted-foreground',
            )}
          />
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {project.tagline}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Edited {project.updated}</span>
          <span className="flex items-center gap-1 font-mono tabular-nums">
            <Zap className="size-3 fill-energy text-energy" />
            {project.credits}
          </span>
        </div>
      </div>
    </Link>
  )
}
