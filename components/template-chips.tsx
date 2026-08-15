import {
  LayoutDashboard,
  Rocket,
  Contact,
  ShoppingBag,
  MessageSquare,
  FileText,
  CalendarDays,
  User,
} from 'lucide-react'
import { templateChips } from '@/lib/data'

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  'Landing page': Rocket,
  CRM: Contact,
  Store: ShoppingBag,
  'AI chat': MessageSquare,
  Blog: FileText,
  Booking: CalendarDays,
  Portfolio: User,
}

export function TemplateChips() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {templateChips.map((label) => {
        const Icon = icons[label] ?? Rocket
        return (
          <button
            key={label}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
          >
            <Icon className="size-4 text-muted-foreground" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
