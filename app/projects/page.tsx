import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/data'

const filters = ['All', 'Live', 'Building', 'Drafts']

export default function ProjectsPage() {
  return (
    <AppShell title="Projects">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground">
              {projects.length} apps in your studio.
            </p>
          </div>
          <Button render={<Link href="/" />} data-icon="inline-start">
            <Plus />
            New project
          </Button>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {filters.map((f, i) => (
              <button
                key={f}
                className={
                  i === 0
                    ? 'rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground'
                    : 'rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                }
              >
                {f}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 sm:w-64">
            <Search className="size-4 text-muted-foreground" />
            <input
              placeholder="Filter projects"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
