import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useHeadings } from './useHeadings'

describe('useHeadings', () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('returns empty array when no headings exist', () => {
    const { result } = renderHook(() => useHeadings())
    expect(result.current).toEqual([])
  })

  it('extracts single h2 heading', () => {
    document.body.innerHTML = '<h2>Title</h2>'
    const { result } = renderHook(() => useHeadings())
    
    expect(result.current).toHaveLength(1)
    expect(result.current[0].text).toBe('Title')
    expect(result.current[0].level).toBe(2)
  })

  it('generates ID for heading without one', () => {
    document.body.innerHTML = '<h2>Hello World</h2>'
    const { result } = renderHook(() => useHeadings())
    
    expect(result.current[0].id).toBe('hello-world')
  })

  it('preserves existing ID', () => {
    document.body.innerHTML = '<h2 id="custom-id">Title</h2>'
    const { result } = renderHook(() => useHeadings())
    
    expect(result.current[0].id).toBe('custom-id')
  })

  it('builds hierarchical tree structure', () => {
    document.body.innerHTML = `
      <h2>Main</h2>
      <h3>Sub 1</h3>
      <h3>Sub 2</h3>
      <h4>Deep</h4>
      <h2>Main 2</h2>
    `
    const { result } = renderHook(() => useHeadings())
    
    expect(result.current).toHaveLength(2)
    expect(result.current[0].text).toBe('Main')
    expect(result.current[0].children).toHaveLength(2)
    expect(result.current[0].children[0].text).toBe('Sub 1')
    expect(result.current[0].children[1].text).toBe('Sub 2')
    expect(result.current[0].children[1].children).toHaveLength(1)
    expect(result.current[0].children[1].children[0].text).toBe('Deep')
  })

  it('handles h3 without parent h2 gracefully', () => {
    document.body.innerHTML = `
      <h3>Orphan Sub</h3>
      <h2>Main</h2>
    `
    const { result } = renderHook(() => useHeadings())
    
    // h3 without h2 parent should not appear at root level
    expect(result.current).toHaveLength(1)
    expect(result.current[0].text).toBe('Main')
  })

  it('handles headings with special characters in text', () => {
    document.body.innerHTML = '<h2>Hello & "World"!</h2>'
    const { result } = renderHook(() => useHeadings())
    
    // ID should be generated from normalized text
    expect(result.current[0].id).toBe('hello-world')
    expect(result.current[0].text).toBe('Hello & "World"!')
  })

  it('generates unique IDs for duplicate heading texts', () => {
    document.body.innerHTML = `
      <h2>Duplicate</h2>
      <h2>Duplicate</h2>
    `
    const { result } = renderHook(() => useHeadings())
    
    // Both should have some ID (the implementation should handle duplicates)
    expect(result.current[0].id).toBeDefined()
    expect(result.current[1].id).toBeDefined()
    // They should not have the exact same ID
    expect(result.current[0].id).not.toBe(result.current[1].id)
  })

  it('sets ID on actual DOM elements', () => {
    const h2 = document.createElement('h2')
    h2.textContent = 'Test Heading'
    document.body.appendChild(h2)

    renderHook(() => useHeadings())

    // The actual DOM element should have the ID set
    expect(h2.id).toBe('test-heading')
  })

  it('handles empty text headings', () => {
    document.body.innerHTML = `
      <h2></h2>
      <h2>Real</h2>
    `
    const { result } = renderHook(() => useHeadings())
    
    expect(result.current).toHaveLength(2)
    expect(result.current[1].text).toBe('Real')
  })

  it('only extracts h2, h3, h4 levels', () => {
    document.body.innerHTML = `
      <h1>Title</h1>
      <h2>Main</h2>
      <h5>Too Deep</h5>
    `
    const { result } = renderHook(() => useHeadings())
    
    // Should only have h2
    expect(result.current).toHaveLength(1)
    expect(result.current[0].text).toBe('Main')
  })
})
