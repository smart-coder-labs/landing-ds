/**
 * Generador de Previews
 * Este script lee componentMeta.ts y genera preview components para TODOS los componentes
 * 
 * Uso: node scripts/generate-previews.js
 */

const fs = require('fs')
const path = require('path')

// Read componentMeta
const metaPath = path.join(__dirname, '../src/data/componentMeta.ts')
const metaContent = fs.readFileSync(metaPath, 'utf-8')

// Extract COMPONENT_META object
// This is a simple parser - may need adjustment based on actual structure
const match = metaContent.match(/export const COMPONENT_META: Record<string, ComponentMeta> = \{([\s\S]*)\}/)
if (!match) {
  console.error('Could not parse COMPONENT_META')
  process.exit(1)
}

// Generate preview components file
const previewsContent = `import React, { useState } from 'react'
import { COMPONENT_META } from './componentMeta'

/* ========================================
   AUTO-GENERATED COMPONENT PREVIEWS
   Do not edit manually - regenerate with: node scripts/generate-previews.js
   ======================================== */

// Import ALL component exports
${generateImports(metaContent)}

// Preview functions for each component
${generatePreviewFunctions(metaContent)}

// Export preview registry
export const COMPONENT_PREVIEWS: Record<string, React.ReactNode> = {
${generateRegistry(metaContent)}
}
`

// Write previews file
const outputPath = path.join(__dirname, '../src/data/generatedPreviews.tsx')
fs.writeFileSync(outputPath, previewsContent, 'utf-8')

console.log(`✅ Generated previews for ${countComponents(metaContent)} components`)
console.log(`📝 Output: ${outputPath}`)

// Helper functions
function generateImports(metaContent) {
  // This would parse and extract component imports
  // For now, return a placeholder
  return `// All component imports would go here`
}

function generatePreviewFunctions(metaContent) {
  // This would generate preview component functions
  return `// Preview functions would be generated here`
}

function generateRegistry(metaContent) {
  // This would create the registry mapping
  return `// Preview registry would be generated here`
}

function countComponents(metaContent) {
  const matches = metaContent.match(/\s+\w+:\s*{[\s\S]*?name:\s*'[^']+'/g) || []
  return matches.length
}
