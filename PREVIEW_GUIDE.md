# How to Add Component Previews

Esta guía explica cómo agregar previews completos (estilo shadcn/ui) a nuevos componentes.

## Estructura de un Preview

Cada componente debe tener:

1. **Preview Visual** - Componente renderizado en un contenedor gris (bg-surface-secondary)
2. **Código Copiable** - TSX/JSX que el usuario puede copiar y usar
3. **Descripción** - Breve explicación del ejemplo

## Formato Estándar

```typescript
function ComponentNameExamples() {
  const [state, setState] = useState(initialValue)
  
  return (
    <>
      <ComponentExample
        title="Basic Usage"
        description="Simple usage example"
        preview={
          <ComponentName>Content</ComponentName>
        }
        code={`import { ComponentName } from '@/components/ui/ComponentName'

export function Example() {
  return (
    <ComponentName>Content</ComponentName>
  )
}`}
      />

      <ComponentExample
        title="Advanced Usage"
        description="More complex example"
        preview={
          <ComponentName variant="advanced">Content</ComponentName>
        }
        code={`import { ComponentName } from '@/components/ui/ComponentName'

export function Example() {
  return (
    <ComponentName variant="advanced">Content</ComponentName>
  )
}`}
      />
    </>
  )
}
```

## Pasos para Agregar un Componente

### 1. Crear función de ejemplos en `ComponentDetailPageV2.tsx`

```typescript
function MyComponentExamples() {
  return (
    <>
      {/* Example 1 */}
      <ComponentExample
        title="..."
        description="..."
        preview={...}
        code={`...`}
      />
      
      {/* Example 2, 3, etc */}
    </>
  )
}
```

### 2. Registrar en la función `ComponentExamples`

Busca la función `ComponentExamples` y agrega:

```typescript
function ComponentExamples({ componentName }: { componentName: string }) {
  const examples: Record<string, React.ReactNode> = {
    button: <ButtonExamples />,
    input: <InputExamples />,
    mycomponent: <MyComponentExamples />,  // ← ADD HERE
    // ...
  }
  
  return examples[componentName] || <DefaultExample componentName={componentName} />
}
```

### 3. Importar el componente al inicio del archivo

```typescript
import { MyComponent } from '../../components/ui/MyComponent'
```

## Mejores Prácticas

✅ **DO:**
- Mostrar 3-4 variantes por componente (basic, advanced, states, etc.)
- Incluir estados (disabled, loading, error, etc.)
- Usar max-w-sm/md para controlar tamaño del preview
- Copiar código exacto que renderiza en el preview
- Usar nombres descriptivos para titles

❌ **DON'T:**
- Omitir imports en el código de ejemplo
- Mostrar código que no coincide con el preview
- Usar componentes que requieren datos complejos sin mostrar cómo
- Dejar spacing inconsistente

## Ejemplos de Variantes Comunes

### Input Component
- Basic input
- With label
- With error
- Disabled state
- Different types (email, password, etc.)

### Button Component  
- All variants
- All sizes
- States (disabled, loading)
- Icon buttons

### Dialog/Modal Components
- Basic (open/close state)
- With actions
- Destructive confirmation

### Form Components
- Default state
- Error state
- Success state
- Disabled state

## Plantilla Rápida

```typescript
import { useState } from 'react'

function ExampleComponentExamples() {
  const [state, setState] = useState(false)

  return (
    <>
      <ComponentExample
        title="Básico"
        description="Uso simple"
        preview={
          <ExampleComponent />
        }
        code={`import { ExampleComponent } from '@/components/ui/ExampleComponent'

export function Example() {
  return <ExampleComponent />
}`}
      />
    </>
  )
}
```

## Checklist Antes de Commit

- [ ] Mínimo 3 variantes de ejemplo
- [ ] Código de ejemplo es copiable (sin errores)
- [ ] Preview y código coinciden
- [ ] Sin console errors
- [ ] Responsive (usa max-w-sm cuando necesario)
- [ ] Titles descriptivos y consistent
- [ ] Imports en el código de ejemplo

---

Para agregar más ejemplos, edita `src/pages/components/ComponentDetailPageV2.tsx` y sigue el patrón existente.
