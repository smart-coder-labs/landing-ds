import { useEffect, useState } from 'react'
import type { Heading } from './useHeadings'

/**
 * Track the active heading based on scroll position
 * Uses IntersectionObserver for efficient detection
 * @param headings - Array of heading objects from useHeadings
 * @param offset - Offset (in pixels) from top where a heading is considered "active" (default: 100)
 * @returns ID of the currently active heading
 */
export function useActiveHeading(
  headings: Heading[],
  offset: number = 100,
): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!headings.length) return

    // Collect all heading IDs (including nested ones)
    const getAllIds = (heads: Heading[]): string[] => {
      return heads.flatMap((h) => [h.id, ...getAllIds(h.children)])
    }

    const headingIds = getAllIds(headings)
    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!headingElements.length) return

    // Create intersection observer to detect visible headings
    const observer = new IntersectionObserver(
      (entries) => {
        // Find entries that are visible
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Use the topmost visible heading
          const topEntry = visibleEntries.reduce((top, current) => {
            return current.boundingClientRect.top < top.boundingClientRect.top
              ? current
              : top
          })

          setActiveId(topEntry.target.id)
        }
      },
      {
        rootMargin: `-${offset}px 0px -66%`,
      },
    )

    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings, offset])

  return activeId
}
