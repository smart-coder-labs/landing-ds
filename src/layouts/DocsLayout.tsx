import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import { useTheme } from '../hooks/useTheme'
import { useHeadings } from '../hooks/useHeadings'
import { useActiveHeading } from '../hooks/useActiveHeading'
import { TableOfContents } from '../components/ui/TableOfContents'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/Collapsible'
import { COMPONENT_CATEGORIES } from '../data/components'

const CATEGORY_ORDER = [
  'Inputs', 'Layout', 'Typography', 'Navigation', 'Feedback', 'Data', 'Media',
  'Charts', 'Animations', 'AI', 'Auth', 'Commerce', 'Fintech', 'Communication',
  'Scheduling', 'Misc',
]

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

function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={`${className} fixed md:static top-11 md:top-0 left-0 md:left-auto bottom-0 w-60 border-r border-border-primary bg-background-primary overflow-y-auto z-40 md:z-auto`}>
      <div className="p-3 space-y-0.5">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors rounded-lg hover:bg-surface-secondary">
            <span>Getting Started</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-0.5 space-y-0 pb-1">
              <SidebarLink to="/docs">Introduction</SidebarLink>
              <SidebarLink to="/docs/installation">Installation</SidebarLink>
              <SidebarLink to="/docs/theming">Theming</SidebarLink>
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
  
  // Extract headings from main content
  const headings = useHeadings('[role="main"]')
  
  // Track which heading is currently in view
  const activeHeadingId = useActiveHeading(headings)

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <SiteNav />
      
      {/* 3-column grid: sidebar | content | toc */}
      {/* Mobile: 1 column (content only) */}
      {/* Tablet: 2 columns (sidebar + content) */}
      {/* Desktop: 3 columns (sidebar + content + toc) */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_280px] gap-4 pt-11">
        {/* Sidebar */}
        <Sidebar className="hidden md:block" />
        
        {/* Main content */}
        <main role="main" className="min-h-screen">
          <div className="max-w-3xl mx-auto px-8 py-10">
            <Outlet />
          </div>
        </main>
        
        {/* Table of Contents */}
        <TableOfContents headings={headings} activeId={activeHeadingId} />
      </div>
    </div>
  )
}
