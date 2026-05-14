import { useState, useEffect, useMemo } from 'react'

export interface Heading {
  id: string
  text: string
  level: 2 | 3 | 4
  children: Heading[]
}

/**
 * Scans the DOM for headings (h2, h3, h4) and returns a hierarchical tree structure.
 * Automatically generates IDs for headings without them.
 *
 * @returns Array of heading trees (only h2 elements at root level)
 */
export function useHeadings(): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([])

  // Memoize the heading extraction and ID generation
  const extractHeadings = useMemo(
    () => () => {
      // Get all h2, h3, h4 elements from the document
      const headingElements = document.querySelectorAll('h2, h3, h4')
      if (headingElements.length === 0) return []

      const headingArray: Array<{ element: Element; level: 2 | 3 | 4; id: string; text: string }> = []
      const usedIds = new Set<string>()

      // Extract headings and ensure each has a unique ID
      headingElements.forEach((element, index) => {
        const tag = element.tagName.toLowerCase()
        const level = parseInt(tag[1]) as 2 | 3 | 4

        // Generate ID if not present
        let id = element.id
        if (!id) {
          const text = element.textContent || ''
          // Create a slug from the text
          let slug = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Collapse multiple hyphens

          // If slug is empty or just hyphens, use a fallback
          if (!slug || slug === '-') {
            slug = `heading-${index}`
          }

          // Handle duplicate IDs
          id = slug
          let counter = 1
          while (usedIds.has(id)) {
            id = `${slug}-${counter}`
            counter++
          }

          // Set the ID on the element
          element.id = id
        }

        usedIds.add(id)

        headingArray.push({
          element,
          level,
          id,
          text: element.textContent || '',
        })
      })

      // Build the hierarchical tree
      const root: Heading[] = []
      const stack: Array<{ heading: Heading; level: 2 | 3 | 4 }> = []

      headingArray.forEach(({ level, id, text }) => {
        const newHeading: Heading = { id, text, level, children: [] }

        // Pop from stack until we find the appropriate parent level
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop()
        }

        if (stack.length === 0) {
          // h2 is a root element
          if (level === 2) {
            root.push(newHeading)
            stack.push({ heading: newHeading, level })
          }
        } else {
          // Add as child to the current parent
          const parent = stack[stack.length - 1].heading
          parent.children.push(newHeading)
          stack.push({ heading: newHeading, level })
        }
      })

      return root
    },
    [],
  )

  useEffect(() => {
    // Initial extraction
    setHeadings(extractHeadings())

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      setHeadings(extractHeadings())
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'class'],
    })

    return () => observer.disconnect()
  }, [extractHeadings])

  return headings
}
