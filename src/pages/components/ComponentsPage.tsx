import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Title } from '../../components/ui/Title'
import Text from '../../components/ui/Text'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent } from '../../components/ui/Card'
import { ALL_COMPONENTS, COMPONENT_CATEGORIES, ComponentEntry } from '../../data/components'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const CATEGORY_ORDER = [
  'Inputs', 'Layout', 'Typography', 'Navigation', 'Feedback', 'Data', 'Media',
  'Charts', 'Animations', 'AI', 'Auth', 'Commerce', 'Fintech', 'Communication',
  'Scheduling', 'Misc',
]

function ComponentCard({ component }: { component: ComponentEntry }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link to={`/components/${component.name.toLowerCase()}`}>
        <Card variant="outlined" padding="sm" hoverable className="h-full group">
          <CardContent className="flex flex-col gap-1.5 p-3">
            <div className="flex items-center justify-between gap-1">
              <span className="text-sm font-medium text-text-primary truncate">{component.name}</span>
              <Badge variant="success" size="sm" className="flex-shrink-0 text-[10px]">✓</Badge>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{component.description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function ComponentsPage() {
  const [query, setQuery] = React.useState('')

  const isSearching = query.trim().length > 0

  const filtered = isSearching
    ? ALL_COMPONENTS.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const totalCount = ALL_COMPONENTS.length
  const categoryCount = Object.keys(COMPONENT_CATEGORIES).length

  return (
    <div className="space-y-8">
      <motion.div
        className="space-y-3"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Title level={1} weight="bold">Components</Title>
        <Text color="secondary">{totalCount} components across {categoryCount} categories.</Text>
      </motion.div>

      <motion.div
        className="relative"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
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
      </motion.div>

      {isSearching ? (
        <div>
          {filtered.length === 0 ? (
            <Text color="secondary">No components match "{query}".</Text>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((component) => (
                <ComponentCard key={component.name} component={component} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {CATEGORY_ORDER.map((category) => {
            const items = ALL_COMPONENTS.filter((c) => c.category === category)
            if (items.length === 0) return null
            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="uppercase text-xs tracking-widest text-text-tertiary font-medium whitespace-nowrap">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-border-primary" />
                  <span className="text-xs text-text-tertiary">{items.length}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {items.map((component) => (
                    <ComponentCard key={component.name} component={component} />
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>
      )}
    </div>
  )
}
