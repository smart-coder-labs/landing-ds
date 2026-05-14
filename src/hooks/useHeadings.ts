import { useEffect, useState } from 'react'

export interface Heading {
  id: string
  text: string
  level: 2 | 3 | 4
  children: Heading[]
}

/**
 * Extract hierarchical heading structure (h2→h3→h4) from a container
 * @param selector - CSS selector for the container to search (default: '[role="main"]')
 * @returns Array of top-level (h2) headings with nested children
 */
export function useHeadings(selector: string = '[role="main"]'): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const container = document.querySelector(selector)
    if (!container) return

    // Extract all h2, h3, h4 elements
    const headingElements = Array.from(
      container.querySelectorAll('h2[id], h3[id], h4[id]'),
    ) as HTMLHeadingElement[]

    // Build hierarchical structure
    const buildHierarchy = (): Heading[] => {
      const headings: Heading[] = []
      const stack: Heading[] = []

      headingElements.forEach((el) => {
        const level = parseInt(el.tagName[1]) as 2 | 3 | 4
        const heading: Heading = {
          id: el.id,
          text: el.textContent || '',
          level,
          children: [],
        }

        // Find the correct parent
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop()
        }

        if (stack.length === 0) {
          // Top-level heading
          headings.push(heading)
        } else {
          // Child of the current top of stack
          stack[stack.length - 1].children.push(heading)
        }

        stack.push(heading)
      })

      return headings
    }

    setHeadings(buildHierarchy())
  }, [selector])

  return headings
}
