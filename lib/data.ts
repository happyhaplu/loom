export type ProjectStatus = 'Live' | 'Building' | 'Draft'

export type Project = {
  id: string
  name: string
  tagline: string
  /** Tailwind gradient stops, used with `bg-gradient-to-br` */
  gradient: string
  updated: string
  status: ProjectStatus
  credits: number
}

export const projects: Project[] = [
  {
    id: 'aurora-crm',
    name: 'Aurora CRM',
    tagline: 'Kanban sales pipeline with deal stages and reminders.',
    gradient: 'from-[oklch(0.55_0.09_200)] to-[oklch(0.48_0.083_195)]',
    updated: '2 hours ago',
    status: 'Live',
    credits: 64,
  },
  {
    id: 'ledger',
    name: 'Ledger',
    tagline: 'Invoicing dashboard with PDF export and reminders.',
    gradient: 'from-[oklch(0.72_0.15_68)] to-[oklch(0.62_0.13_55)]',
    updated: 'Yesterday',
    status: 'Building',
    credits: 22,
  },
  {
    id: 'sundial',
    name: 'Sundial',
    tagline: 'Product analytics with cohort and retention views.',
    gradient: 'from-[oklch(0.6_0.11_300)] to-[oklch(0.52_0.12_285)]',
    updated: '5 days ago',
    status: 'Live',
    credits: 48,
  },
  {
    id: 'chorus',
    name: 'Chorus',
    tagline: 'Team digest that turns updates into a weekly recap.',
    gradient: 'from-[oklch(0.6_0.09_160)] to-[oklch(0.5_0.09_175)]',
    updated: '2 weeks ago',
    status: 'Draft',
    credits: 12,
  },
  {
    id: 'harbor',
    name: 'Harbor',
    tagline: 'Support inbox with triage, tags, and canned replies.',
    gradient: 'from-[oklch(0.58_0.1_230)] to-[oklch(0.5_0.1_245)]',
    updated: '3 weeks ago',
    status: 'Draft',
    credits: 5,
  },
  {
    id: 'quill',
    name: 'Quill',
    tagline: 'Markdown blog with drafts, tags, and scheduling.',
    gradient: 'from-[oklch(0.68_0.13_30)] to-[oklch(0.58_0.14_20)]',
    updated: 'Last month',
    status: 'Live',
    credits: 31,
  },
]

export const promptSuggestions: string[] = [
  'A CRM to track my sales pipeline',
  'An invoicing dashboard with PDF export',
  'A booking page for my studio',
  'An AI chatbot for my docs',
]

export const templateChips: string[] = [
  'Dashboard',
  'Landing page',
  'CRM',
  'Store',
  'AI chat',
  'Blog',
  'Booking',
  'Portfolio',
]

export type Template = {
  id: string
  name: string
  category: string
  tagline: string
  credits: number
}

export const templates: Template[] = [
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    category: 'Dashboard',
    tagline: 'Charts, KPIs, and a filterable data table.',
    credits: 12,
  },
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    category: 'Marketing',
    tagline: 'Hero, features, pricing, and a waitlist form.',
    credits: 8,
  },
  {
    id: 'sales-crm',
    name: 'Sales CRM',
    category: 'Internal',
    tagline: 'Pipeline board with deal stages and contacts.',
    credits: 14,
  },
  {
    id: 'storefront',
    name: 'Storefront',
    category: 'Commerce',
    tagline: 'Product grid, cart, and checkout flow.',
    credits: 16,
  },
  {
    id: 'ai-chat',
    name: 'AI Chat',
    category: 'AI',
    tagline: 'Streaming chat UI wired to your model.',
    credits: 10,
  },
  {
    id: 'booking',
    name: 'Booking',
    category: 'Scheduling',
    tagline: 'Availability calendar with confirmations.',
    credits: 11,
  },
]
