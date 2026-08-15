import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PromptComposer } from '@/components/prompt-composer'
import { TemplateChips } from '@/components/template-chips'
import { ProjectCard } from '@/components/project-card'
import { LoomMark } from '@/components/loom-mark'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const resume = projects[0]

  return (
    <AppShell>
      {/* Hero / prompt-first */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="weave pointer-events-none absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: 'var(--primary)' }}
        />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-12 pt-14 text-center md:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <LoomMark className="size-3.5 text-primary" />
            Forge — the AI app builder
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
            From a sentence to a shipped app
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-pretty text-muted-foreground md:text-lg">
            Describe what you have in mind. Forge plans it, writes the code, and
            builds you a working preview you can keep shaping.
          </p>

          <div className="mt-6">
            <PromptComposer />
          </div>

          {/* Secondary path — templates as a clearly-labelled alternative */}
          <div className="mt-7">
            <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
              <span className="h-px flex-1 bg-border" />
              <span className="font-medium uppercase tracking-wider">
                or start with a template
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-4">
              <TemplateChips />
            </div>
          </div>

          {/* Jump back in — keeps recent work present on the first screen */}
          {resume && (
            <div className="mt-7 flex justify-center">
              <Link
                href="/workspace"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/80 py-2 pl-2 pr-4 text-left shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br',
                    resume.gradient,
                  )}
                >
                  <RotateCcw className="size-4 text-background" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Jump back in
                  </span>
                  <span className="text-sm font-medium">
                    {resume.name}
                    <span className="ml-1.5 font-normal text-muted-foreground">
                      · edited {resume.updated}
                    </span>
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recent projects */}
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Your projects
            </h2>
            <p className="text-sm text-muted-foreground">
              Pick up where you left off.
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </AppShell>
  )
}
