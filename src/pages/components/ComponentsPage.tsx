import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Title } from '../../components/ui/Title'
import Text from '../../components/ui/Text'
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

function ComponentRow({ component }: { component: ComponentEntry }) {
  return (
    <Link
      to={`/components/${component.name.toLowerCase()}`}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-colors"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">
          {component.name}
        </span>
        <p className="text-xs text-text-tertiary truncate mt-0.5">{component.description}</p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </Link>
  )
}

export default function ComponentsPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = React.useState('')
  const categoryParam = searchParams.get('category')

  // Scroll to category when component mounts or categoryParam changes
  React.useEffect(() => {
    if (categoryParam) {
      setTimeout(() => {
        const element = document.getElementById(`category-${categoryParam}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [categoryParam])

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {filtered.map((component) => (
                <ComponentRow key={component.name} component={component} />
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
                id={`category-${category}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="uppercase text-xs tracking-widest text-text-tertiary font-medium whitespace-nowrap">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-border-primary/60" />
                  <span className="text-xs text-text-tertiary tabular-nums">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                  {items.map((component) => (
                    <ComponentRow key={component.name} component={component} />
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
