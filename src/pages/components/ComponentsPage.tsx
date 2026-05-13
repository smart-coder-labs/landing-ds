import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const INSTALLED = new Set([
  'button', 'card', 'badge', 'title', 'text', 'tabs', 'switch',
  'divider', 'footer', 'gridsystem', 'codeblock', 'collapsible',
])

interface RegistryComponent {
  name: string
  description?: string
  category?: string
}

const FALLBACK_COMPONENTS: RegistryComponent[] = [
  { name: 'Button', description: 'Trigger actions and navigate between pages.', category: 'inputs' },
  { name: 'Card', description: 'Contain and group related content.', category: 'layout' },
  { name: 'Badge', description: 'Display status, counts, or short labels.', category: 'display' },
  { name: 'Title', description: 'Semantic heading with typographic scale.', category: 'typography' },
  { name: 'Text', description: 'Body and utility text with color variants.', category: 'typography' },
  { name: 'Tabs', description: 'Switch between sections in the same context.', category: 'navigation' },
  { name: 'Switch', description: 'Toggle a boolean setting on or off.', category: 'inputs' },
  { name: 'Divider', description: 'Separate content with a horizontal or vertical rule.', category: 'layout' },
  { name: 'Footer', description: 'Site-wide footer with columns and links.', category: 'layout' },
  { name: 'GridSystem', description: 'Responsive column grid built on CSS Grid.', category: 'layout' },
  { name: 'CodeBlock', description: 'Display syntax-highlighted code with copy button.', category: 'display' },
  { name: 'Collapsible', description: 'Reveal or hide sections of content.', category: 'disclosure' },
]

export default function ComponentsPage() {
  const [components, setComponents] = React.useState<RegistryComponent[]>(FALLBACK_COMPONENTS)
  const [loading, setLoading] = React.useState(true)
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    const controller = new AbortController()

    fetch(
      'https://raw.githubusercontent.com/smart-coder-labs/design-system/main/registry.json',
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed')
        return res.json()
      })
      .then((data: RegistryComponent[]) => {
        if (Array.isArray(data) && data.length > 0) setComponents(data)
      })
      .catch(() => {
        // stay with fallback
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const filtered = components.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Title level={1} weight="bold">Components</Title>
        <Text variant="lead" color="secondary">
          {components.length} components available. {INSTALLED.size} installed in this project.
        </Text>
      </div>

      <div className="relative">
        <input
          type="search"
          placeholder="Search components..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-border-primary bg-background-primary text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 transition-colors"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Loading registry...
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <Text color="secondary">No components match "{query}".</Text>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((component) => {
          const key = component.name.toLowerCase()
          const installed = INSTALLED.has(key)

          return (
            <Link key={component.name} to={`/components/${key}`} className="block group">
              <Card variant="outlined" padding="md" hoverable className="h-full">
                <CardContent>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Text weight="semibold">{component.name}</Text>
                    {installed && <Badge variant="success" size="sm">Installed</Badge>}
                  </div>
                  {component.description && (
                    <Text variant="small" color="secondary" lineClamp={2}>{component.description}</Text>
                  )}
                  <div className="mt-3">
                    <code className="text-xs font-mono text-text-tertiary">
                      add {component.name}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
