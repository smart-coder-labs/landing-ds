import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import { useTheme } from '../hooks/useTheme'
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

function Sidebar() {
  return (
    <aside className="fixed top-11 left-0 bottom-0 w-60 border-r border-border-primary bg-background-primary overflow-y-auto z-40">
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

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <SiteNav />
      <Sidebar />
      <main className="ml-60 pt-11 min-h-screen">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
