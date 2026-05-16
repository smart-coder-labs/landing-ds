import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: 'Apple-inspired',
    description: 'Every component follows Apple\'s Human Interface Guidelines for a premium, native feel.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'TypeScript-first',
    description: 'Fully typed with TypeScript. Your editor knows every prop, variant, and size.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Accessible',
    description: 'Built with WAI-ARIA patterns. Screen readers and keyboard navigation work out of the box.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: 'Tailwind CSS v4',
    description: 'Uses CSS-native variables for theming. Zero config required — import and use.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Framer Motion',
    description: 'Physics-based animations baked in. Smooth, delightful interactions by default.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: 'Composable',
    description: 'Sub-components like CardHeader, CardContent, CardFooter — compose exactly what you need.',
  },
]

export default function IntroductionPage() {
  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="space-y-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Badge variant="info" size="sm">Documentation</Badge>
        <Title level={1} weight="bold">Introduction</Title>
        <Text variant="lead" color="secondary">
          An Apple-inspired design system for React, built with Tailwind CSS v4.
        </Text>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Title level={4} weight="semibold">What is it?</Title>
        <Text color="secondary">
          The Apple Design System is an open-source React component library that brings the clarity, depth, and elegance
          of Apple's design language to your web projects. Every component is thoughtfully designed, fully accessible,
          and ready for production.
        </Text>
        <Text color="secondary">
          It uses Tailwind CSS v4's CSS-native variable system for theming, so dark mode and custom tokens
          work without any JavaScript overhead. Components ship with Framer Motion animations that feel
          physical and natural.
        </Text>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <Title level={4} weight="semibold">Philosophy</Title>
        <Text color="secondary">
          Most design systems give you unstyled primitives and leave the design work to you.
          This library takes the opposite approach: we ship fully styled, opinionated components that look
          great out of the box. You still control the tokens (colors, radius, type scale) via CSS variables,
          but the sensible defaults are already there.
        </Text>
        <Text color="secondary">
          We believe the best developer experience is one where you can go from zero to a beautiful UI
          in minutes, not days.
        </Text>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <Title level={4} weight="semibold">Features</Title>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeUp} custom={index} className="h-full">
              <Card variant="outlined" padding="md" className="h-full">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-accent-blue flex-shrink-0">{feature.icon}</div>
                    <div>
                      <Text weight="semibold" className="mb-1">{feature.title}</Text>
                      <Text variant="small" color="secondary">{feature.description}</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <Card variant="flat" padding="md">
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <Text weight="semibold" className="mb-1">Quick install</Text>
                <code className="text-sm font-mono text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-lg">
                  npx @smart-coder-labs/apple-design-system add Button
                </code>
              </div>
              <Link to="/docs/installation">
                <Button variant="primary" size="sm">
                  Installation guide
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
