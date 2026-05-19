import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { cn } from '../lib/utils'
import { SearchInput } from './ui/SearchInput'
import { ALL_COMPONENTS } from '../data/components'

const DOC_ITEMS = [
  { name: 'Introduction', path: '/docs', category: 'Docs' },
  { name: 'Installation', path: '/docs/installation', category: 'Docs' },
  { name: 'Theming', path: '/docs/theming', category: 'Docs' },
  { name: 'Architecture', path: '/docs/architecture', category: 'Docs' },
  { name: 'Versioning', path: '/docs/versioning', category: 'Docs' },
]

function GlobalSearch() {
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const results = React.useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const components = ALL_COMPONENTS
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 7)
      .map((c) => ({ name: c.name, path: `/components/${c.name.toLowerCase()}`, category: c.category }))
    const docs = DOC_ITEMS.filter((d) => d.name.toLowerCase().includes(q))
    return [...docs, ...components]
  }, [query])

  const grouped = React.useMemo(() => {
    const map = new Map<string, typeof results>()
    for (const item of results) {
      if (!map.has(item.category)) map.set(item.category, [])
      map.get(item.category)!.push(item)
    }
    return map
  }, [results])

  const select = (path: string) => {
    navigate(path)
    setQuery('')
    setOpen(false)
  }

  return (
    <SearchInput value={query} onChange={setQuery} containerClassName="w-56">
      <SearchInput.Input
        value={query}
        onChange={setQuery}
        placeholder="Search..."
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="h-7 text-xs rounded-lg pl-8 pr-8"
      />
      <SearchInput.Dropdown
        show={open && query.length > 0}
        hasResults={results.length > 0}
        query={query}
      >
        {Array.from(grouped.entries()).map(([cat, items]) => (
          <SearchInput.Section key={cat} title={cat}>
            {items.map((item) => (
              <SearchInput.Item key={item.path} onClick={() => select(item.path)}>
                <SearchInput.ItemContent label={item.name} />
              </SearchInput.Item>
            ))}
          </SearchInput.Section>
        ))}
      </SearchInput.Dropdown>
    </SearchInput>
  )
}

function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

interface NavLinkProps {
  to: string
  children: React.ReactNode
  onClick?: () => void
  external?: boolean
  href?: string
}

function NavLink({ to, children, onClick, external, href }: NavLinkProps) {
  const location = useLocation()
  const isActive = !external && (location.pathname === to || location.pathname.startsWith(to + '/'))

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "text-sm px-3 py-1.5 rounded-md transition-colors",
        isActive
          ? "text-text-primary font-medium"
          : "text-text-secondary hover:text-text-primary"
      )}
    >
      {children}
    </Link>
  )
}

function MobileMenu({ landingMode }: { landingMode: boolean }) {
  const [open, setOpen] = React.useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
        aria-label="Toggle menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-[44px] z-40 bg-background-primary/98 backdrop-blur-xl border-t border-border-primary">
          <div className="flex flex-col p-6 gap-1">
            {landingMode && (
              <>
                <a href="#features" onClick={close} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-md hover:bg-surface-secondary">Features</a>
                <a href="#showcase" onClick={close} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-md hover:bg-surface-secondary">Showcase</a>
              </>
            )}
            <Link to="/components" onClick={close} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-md hover:bg-surface-secondary">Components</Link>
            <Link to="/docs" onClick={close} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-md hover:bg-surface-secondary">Docs</Link>
            <a href="https://github.com/smart-coder-labs/design-system" target="_blank" rel="noopener noreferrer" onClick={close} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-md hover:bg-surface-secondary">GitHub</a>
            <a href="https://smart-coder-labs.github.io/design-system" target="_blank" rel="noopener noreferrer" onClick={close} className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 px-3 rounded-md hover:bg-surface-secondary">Storybook</a>
          </div>
        </div>
      )}
    </>
  )
}

interface SiteNavProps {
  landingMode?: boolean
}

export default function SiteNav({ landingMode = false }: SiteNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[44px] border-b border-border-primary bg-background-primary/80 backdrop-blur-xl">
      <div className="h-full px-4 flex items-center gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-text-primary mr-4 shrink-0">
          <LogoIcon />
          <span className="hidden sm:inline">Design System</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {landingMode && (
            <>
              <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-surface-secondary">Features</a>
              <a href="#showcase" className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-surface-secondary">Showcase</a>
            </>
          )}
          <NavLink to="/docs">Docs</NavLink>
          <NavLink to="/components">Components</NavLink>
          <a
            href="https://smart-coder-labs.github.io/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-surface-secondary"
          >
            Storybook
          </a>
        </div>

        {/* Spacer + Search */}
        <div className="flex-1" />
        <div className="hidden md:block">
          <GlobalSearch />
        </div>
        <div className="flex-1" />

        {/* Right side */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="https://github.com/smart-coder-labs/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-surface-secondary"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <MobileMenu landingMode={landingMode} />
        </div>
      </div>
    </nav>
  )
}
