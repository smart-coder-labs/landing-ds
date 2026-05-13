import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

interface SiteNavProps {
  landingMode?: boolean
}

function MobileMenu({ landingMode }: { landingMode: boolean }) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
        <div className="fixed inset-0 top-14 z-40 bg-background-primary/98 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-6 pt-12">
            {landingMode ? (
              <>
                {['Features', 'Showcase', 'Docs'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/components"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Components
                </Link>
                <Link
                  to="/docs"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Docs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/components"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Components
                </Link>
                <Link
                  to="/docs"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Docs
                </Link>
                <a
                  href="https://github.com/smart-coder-labs/design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  GitHub
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default function SiteNav({ landingMode = false }: SiteNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <LogoIcon />
          Design System
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {landingMode ? (
            <>
              <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Features</a>
              <a href="#showcase" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Showcase</a>
            </>
          ) : null}
          <Link to="/components" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Components</Link>
          <Link to="/docs" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Docs</Link>
          <a
            href="https://github.com/smart-coder-labs/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <MobileMenu landingMode={landingMode} />
        </div>
      </div>
    </nav>
  )
}
