import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook that tracks which heading is currently visible in the viewport.
 * Uses Intersection Observer to efficiently detect visible headings.
 *
 * @returns The ID of the currently active (most visible) heading, or null if none
 */
export function useActiveHeading(): string | null {
  const [activeHeading, setActiveHeading] = useState<string | null>(null)
  const entriesMapRef = useRef<Map<string, IntersectionObserverEntry>>(new Map())

  const updateActiveHeading = useCallback(() => {
    const entries = Array.from(entriesMapRef.current.values())

    // Find the heading that is most visible (highest intersection ratio)
    let topHeading: IntersectionObserverEntry | null = null
    let maxRatio = 0

    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio
        topHeading = entry
      }
    }

    // If no heading is intersecting, find the one closest to the top
    if (!topHeading) {
      let smallestDistance = Infinity

      for (const entry of entries) {
        const distance = Math.abs(entry.boundingClientRect.top)
        if (distance < smallestDistance) {
          smallestDistance = distance
          topHeading = entry
        }
      }
    }

    if (topHeading && topHeading.target instanceof HTMLElement) {
      setActiveHeading(topHeading.target.id || null)
    } else {
      setActiveHeading(null)
    }
  }, [])

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -80% 0px', // Trigger when heading enters top 20% of viewport
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const observer = new IntersectionObserver((entries) => {
      // Update our entries map
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement) {
          const id = entry.target.id
          if (id) {
            entriesMapRef.current.set(id, entry)
          }
        }
      })

      // Update active heading
      updateActiveHeading()
    }, observerOptions)

    // Get all h2, h3, h4 elements that have IDs
    const headings = Array.from(document.querySelectorAll('h2[id], h3[id], h4[id]'))

    // Observe all headings
    headings.forEach((heading) => {
      observer.observe(heading)
    })

    // Initial update
    updateActiveHeading()

    return () => {
      entriesMapRef.current.clear()
      observer.disconnect()
    }
  }, [updateActiveHeading])

  return activeHeading
}
