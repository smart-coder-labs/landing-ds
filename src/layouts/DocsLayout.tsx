import React from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SiteNav from '../components/SiteNav'
import { useTheme, useHeadings, useActiveHeading } from '../hooks'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/Collapsible'
import { TableOfContents } from '../components/ui/TableOfContents'
import { COMPONENT_CATEGORIES } from '../data/components'
import { getAdjacentPages } from '../data/navigation'

const CATEGORY_ORDER = [
  'Inputs', 'Layout', 'Typography', 'Navigation', 'Feedback', 'Data', 'Media',
  'Charts', 'Animations', 'AI', 'Auth', 'Commerce', 'Fintech', 'Communication',
  'Scheduling', 'Misc',
]

function PageNav({ compact }: { compact?: boolean }) {
  const { pathname } = useLocation()
  const { prev, next } = getAdjacentPages(pathname)
  if (!prev && !next) return null

  if (compact) {
    return (
      <div className="flex items-center gap-1 ml-auto flex-shrink-0">
        {prev ? (
          <Link
            to={prev.path}
            title={prev.label}
            className="p-1 rounded hover:bg-surface-secondary text-text-tertiary hover:text-text-primary transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="p-1 w-[22px]" />
        )}
        {next ? (
          <Link
            to={next.path}
            title={next.label}
            className="p-1 rounded hover:bg-surface-secondary text-text-tertiary hover:text-text-primary transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="p-1 w-[22px]" />
        )}
      </div>
    )
  }

  return (
    <div className="mt-16 pt-6 border-t border-border-primary flex items-center justify-between gap-4">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors min-w-0"
        >
          <ChevronLeft className="w-4 h-4 flex-shrink-0 text-text-tertiary group-hover:text-text-primary transition-colors" />
          <span className="truncate">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors min-w-0 ml-auto"
        >
          <span className="truncate">{next.label}</span>
          <ChevronRight className="w-4 h-4 flex-shrink-0 text-text-tertiary group-hover:text-text-primary transition-colors" />
        </Link>
      ) : null}
    </div>
  )
}

function DocsBreadcrumb() {
  const { pathname } = useLocation()
  if (!pathname.startsWith('/docs')) return null

  const labels: Record<string, string> = {
    '/docs': 'Introduction',
    '/docs/installation': 'Installation',
    '/docs/theming': 'Theming',
    '/docs/architecture': 'Architecture',
    '/docs/versioning': 'Versioning',
  }
  const current = labels[pathname]
  if (!current) return null

  return (
    <div className="text-sm text-text-secondary flex items-center gap-2 mb-4 mt-4">
      <span className="text-text-tertiary">Docs</span>
      <span className="text-text-tertiary">/</span>
      <span className="text-text-primary font-medium">{current}</span>
      <PageNav compact />
    </div>
  )
}

function SidebarLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `block px-3 py-1 rounded-md text-[13px] transition-colors ${
          isActive
            ? 'bg-accent-blue/10 text-accent-blue font-medium'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

function Sidebar() {
  return (
    <aside className="fixed top-11 left-0 bottom-0 w-60 border-r border-border-primary bg-background-primary z-40 overflow-hidden">
      <div
        className="h-full overflow-y-auto p-3 space-y-0.5"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%)' }}
      >
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors rounded-lg hover:bg-surface-secondary">
            <span>Getting Started</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-0.5 space-y-0 pb-1">
              <SidebarLink to="/docs">Introduction</SidebarLink>
              <SidebarLink to="/docs/installation">Installation</SidebarLink>
              <SidebarLink to="/docs/theming">Theming</SidebarLink>
              <SidebarLink to="/docs/architecture">Architecture</SidebarLink>
              <SidebarLink to="/docs/versioning">Versioning</SidebarLink>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border-primary my-2" />

        {CATEGORY_ORDER.map((cat) => (
          <Collapsible key={cat}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors rounded-lg hover:bg-surface-secondary">
              <span>{cat}</span>
              <span className="text-[10px] tabular-nums text-text-tertiary/60">
                {COMPONENT_CATEGORIES[cat]?.length ?? 0}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-0.5 space-y-0 pb-1">
                {(COMPONENT_CATEGORIES[cat] ?? []).map((name) => (
                  <SidebarLink key={name} to={`/components/${name.toLowerCase()}`}>
                    {name}
                  </SidebarLink>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </aside>
  )
}

export default function DocsLayout() {
  useTheme()
  const headings = useHeadings()
  const activeHeadingId = useActiveHeading()

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <SiteNav />
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_280px]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main role="main" className="pt-11 md:pt-8 min-h-screen">
          <div className="max-w-3xl mx-auto px-8 py-10">
            <DocsBreadcrumb />
            <Outlet />
            <PageNav />
          </div>
        </main>
        <TableOfContents headings={headings} activeId={activeHeadingId} />
      </div>
    </div>
  )
}
