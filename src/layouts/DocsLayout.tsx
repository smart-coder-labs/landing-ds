import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import { useTheme } from '../hooks/useTheme'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/Collapsible'

const COMPONENTS = [
  'Button',
  'Card',
  'Badge',
  'Title',
  'Text',
  'Tabs',
  'Switch',
  'Divider',
  'Footer',
  'GridSystem',
  'CodeBlock',
  'Collapsible',
]

function SidebarLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `block px-3 py-1.5 rounded-lg text-sm transition-colors ${
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
    <aside className="fixed top-14 left-0 bottom-0 w-60 border-r border-border-primary bg-background-primary overflow-y-auto z-40">
      <div className="p-4 space-y-1">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors">
            <span>Getting Started</span>
            <ChevronIcon />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1 space-y-0.5 pb-2">
              <SidebarLink to="/docs">Introduction</SidebarLink>
              <SidebarLink to="/docs/installation">Installation</SidebarLink>
              <SidebarLink to="/docs/theming">Theming</SidebarLink>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border-primary my-2" />

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors">
            <span>Components</span>
            <ChevronIcon />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1 space-y-0.5 pb-2">
              {COMPONENTS.map((name) => (
                <SidebarLink key={name} to={`/components/${name.toLowerCase()}`}>
                  {name}
                </SidebarLink>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function DocsLayout() {
  useTheme()

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <SiteNav />
      <Sidebar />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
