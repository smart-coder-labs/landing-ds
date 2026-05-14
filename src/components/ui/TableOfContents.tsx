import React from 'react'
import type { Heading } from '../../hooks/useHeadings'

export interface TableOfContentsProps {
  headings: Heading[]
  activeId: string
}

interface TOCNodeProps {
  node: Heading
  activeId: string
  depth: number
}

/**
 * Recursive component for rendering a single ToC node and its children
 */
const TOCNode: React.FC<TOCNodeProps> = ({ node, activeId, depth }) => {
  const isActive = node.id === activeId
  const indentAmount = depth * 12 // 12px per nesting level

  // Scale font size: h2 (base = 14px), h3 (13px), h4 (12.6px)
  const fontSizeScale = {
    2: 1,
    3: 0.95,
    4: 0.9,
  }

  const scale = fontSizeScale[node.level as keyof typeof fontSizeScale] || 1
  const fontSize = `${14 * scale}px`

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(node.id)
    if (!element) return

    // Detect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <li>
      <a
        href={`#${node.id}`}
        onClick={handleNavigate}
        aria-current={isActive ? 'page' : undefined}
        className={`
          block px-2.5 py-1.5 rounded-md transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-accent-blue
          ${
            isActive
              ? 'font-bold text-accent-blue border-l-2 border-accent-blue pl-2'
              : 'text-text-tertiary hover:text-text-secondary hover:bg-surface-secondary'
          }
        `}
        style={{
          marginLeft: `${indentAmount}px`,
          fontSize,
        }}
      >
        {node.text}
      </a>

      {node.children.length > 0 && (
        <ul className="space-y-1">
          {node.children.map((child: Heading) => (
            <TOCNode
              key={child.id}
              node={child}
              activeId={activeId}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

/**
 * Table of Contents component
 * Renders a sticky, hierarchical list of h2→h3→h4 headings
 * Only visible on desktop (lg breakpoint)
 * 
 * Accessibility:
 * - Semantic <nav> with aria-label for screen readers
 * - aria-current="page" on active link
 * - Keyboard navigation: Tab through links, Enter to navigate
 * - Focus-visible styling with ring for visibility
 * - Respects prefers-reduced-motion for scroll animation
 */
export const TableOfContents = React.memo<TableOfContentsProps>(
  ({ headings, activeId }) => {
    if (!headings?.length) return null

    return (
      <nav
        aria-label="On this page"
        className="hidden lg:block sticky top-11 h-[calc(100vh-44px)] overflow-y-auto pr-4 py-6 border-l border-border-primary"
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-4 px-3">
          On this page
        </div>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <TOCNode
              key={heading.id}
              node={heading}
              activeId={activeId}
              depth={0}
            />
          ))}
        </ul>
      </nav>
    )
  },
)

TableOfContents.displayName = 'TableOfContents'
