'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import AnimatedMesh from '../components/AnimatedMesh'
import DeviceMockup from '../components/DeviceMockup'
import ParticleCanvas from '../components/ParticleCanvas'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-11">
      {/* Animated gradient mesh background */}
      <AnimatedMesh />
      {/* Particle network */}
      <ParticleCanvas />

      {/* Two-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16 lg:py-20 min-h-[calc(100vh-44px)]">

          {/* Left — text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-5">
              <Badge variant="primary" size="lg" dot>
                🚀 v1.0.17 — Production Ready
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-5"
            >
              <span className="text-gradient">Build Beautiful</span>
              <br />
              <span className="text-gradient-accent">Apple-Style UIs</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              A production-ready React design system inspired by Apple's human interface
              guidelines. Components that feel native, look premium, and ship fast.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <a href="https://github.com/smart-coder-labs/design-system" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="min-w-[160px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1.5 flex-shrink-0">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </Button>
              </a>
              <Button
                variant="secondary"
                size="lg"
                className="min-w-[160px]"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Components
              </Button>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-8"
            >
              {['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface-secondary text-text-secondary border border-border-primary"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — device mockup */}
          <motion.div
            className="flex-1 w-full lg:max-w-[520px]"
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle float animation wrapper */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <DeviceMockup />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
