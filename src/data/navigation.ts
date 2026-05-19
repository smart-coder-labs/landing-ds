import { COMPONENT_CATEGORIES } from './components'

export interface NavPage {
  path: string
  label: string
}

const CATEGORY_ORDER = [
  'Inputs', 'Layout', 'Typography', 'Navigation', 'Feedback', 'Data', 'Media',
  'Charts', 'Animations', 'AI', 'Auth', 'Commerce', 'Fintech', 'Communication',
  'Scheduling', 'Misc',
]

export const ALL_PAGES: NavPage[] = [
  { path: '/docs', label: 'Introduction' },
  { path: '/docs/installation', label: 'Installation' },
  { path: '/docs/theming', label: 'Theming' },
  { path: '/docs/architecture', label: 'Architecture' },
  { path: '/docs/versioning', label: 'Versioning' },
  ...CATEGORY_ORDER.flatMap((cat) =>
    (COMPONENT_CATEGORIES[cat] ?? []).map((name) => ({
      path: `/components/${name.toLowerCase()}`,
      label: name,
    }))
  ),
]

export function getAdjacentPages(pathname: string): { prev: NavPage | null; next: NavPage | null } {
  const idx = ALL_PAGES.findIndex((p) => p.path === pathname)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? ALL_PAGES[idx - 1] : null,
    next: idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null,
  }
}
