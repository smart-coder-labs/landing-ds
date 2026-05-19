import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Copy, Check, Maximize2, X, Search } from 'lucide-react'

import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Button } from '../../components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { ALL_COMPONENTS, COMPONENT_CATEGORIES, ComponentEntry } from '../../data/components'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
}

// Helper to generate scoped heading IDs
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const generateHeadingId = (componentName: string, sectionName: string): string => {
  return `doc-${componentName.toLowerCase()}-${slugify(sectionName)}`
}

// Helper to find component category
const findComponentCategory = (componentName: string): string | undefined => {
  for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
    if (components.includes(componentName)) {
      return category
    }
  }
  return undefined
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex items-center justify-between gap-4 flex-1 min-w-0">
      <pre className="text-xs font-mono text-text-secondary overflow-x-auto m-0 p-0 bg-transparent flex-1">
        <code>{command}</code>
      </pre>
      <button
        onClick={copy}
        className="p-1.5 rounded-md hover:bg-surface-secondary text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0"
        aria-label="Copy command"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  )
}

interface ComponentExampleProps {
  title: string
  description?: string
  preview: React.ReactNode
  code: string
}

function ComponentExample({ title, description, preview, code }: ComponentExampleProps) {
  const [showCode, setShowCode] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h3 className="text-base font-medium text-text-primary mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-background-primary flex items-center justify-center">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg border border-border-primary bg-surface-secondary hover:bg-surface-primary text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Exit fullscreen"
          >
            <X className="w-4 h-4" />
          </button>
          {preview}
        </div>
      )}

      {/* Preview Card */}
      <div className="border border-border-primary rounded-lg overflow-hidden bg-background-primary">
        {/* Preview Area */}
        <div className="relative px-6 py-8 min-h-[280px] flex items-center justify-center bg-background-primary">
          {preview}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute top-3 right-3 p-1.5 rounded-md border border-border-primary/50 bg-surface-secondary/60 hover:bg-surface-secondary text-text-tertiary hover:text-text-primary transition-colors backdrop-blur-sm"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Code section */}
        <motion.div 
          className="border-t border-border-primary"
          initial={false}
          animate={{ height: showCode ? 'auto' : 140 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <div className="relative overflow-hidden" style={{ height: '100%' }}>
            <CodeBlock code={code} language="typescript" showLineNumbers={false} className="!rounded-none" />
            
            {/* Gradient fade - only show when collapsed */}
            {!showCode && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/70 to-transparent pointer-events-none" />
            )}
          </div>
        </motion.div>

        {/* Buttons at bottom */}
        <div className="flex justify-center py-3 bg-[#1e1e1e] border-t border-[#3e3e42]">
          {showCode ? (
            <motion.button
              onClick={() => setShowCode(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-[#3e3e42] bg-[#252526]/90 hover:bg-[#2d2d30] text-[#cccccc] transition-colors backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Hide Code
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setShowCode(true)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-[#3e3e42] bg-[#252526]/90 hover:bg-[#2d2d30] text-[#cccccc] transition-colors backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              View Code
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  API REFERENCE SYSTEM
// ─────────────────────────────────────────────

interface PropRow {
  prop: string
  type: string
  default?: string
  required?: boolean
  description: string
}

interface ApiTable {
  name: string
  description?: string
  props: PropRow[]
}

function ApiReferenceTable({ table }: { table: ApiTable }) {
  return (
    <div className="rounded-lg border border-border-primary overflow-hidden">
      <div className="px-4 py-3 bg-surface-secondary border-b border-border-primary flex items-center gap-2">
        <Text weight="medium" variant="small">{table.name}</Text>
        {table.description && (
          <Text variant="small" color="secondary">— {table.description}</Text>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-primary bg-surface-secondary/40">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-36">Prop</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-48">Type</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-24">Default</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide">Description</th>
            </tr>
          </thead>
          <tbody>
            {table.props.map((row, i) => (
              <tr key={row.prop} className={i % 2 === 0 ? '' : 'bg-surface-secondary/20'}>
                <td className="px-4 py-3 align-top">
                  <code className="text-xs font-mono text-text-primary">{row.prop}</code>
                  {row.required && (
                    <span className="ml-1 text-[10px] text-status-error font-medium">*</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <code className="text-xs font-mono text-accent-primary">{row.type}</code>
                </td>
                <td className="px-4 py-3 align-top">
                  {row.default ? (
                    <code className="text-xs font-mono text-text-secondary">{row.default}</code>
                  ) : (
                    <span className="text-xs text-text-tertiary">—</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top text-xs text-text-secondary">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const API_REFERENCE: Record<string, ApiTable[]> = {
  button: [
    {
      name: 'Button',
      props: [
        { prop: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'subtle' | 'outline' | 'destructive'", default: "'primary'", description: 'Visual style of the button.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls height, padding, and font size.' },
        { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinning indicator and sets aria-busy.' },
        { prop: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before the label.' },
        { prop: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after the label.' },
        { prop: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the button to fill its container.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and grays the button.' },
        { prop: 'aria-label', type: 'string', description: 'Required when the button has no visible text (icon-only).' },
        { prop: 'children', type: 'ReactNode', description: 'Button label content.' },
      ],
    },
  ],

  input: [
    {
      name: 'Input',
      description: 'extends HTMLInputElement',
      props: [
        { prop: 'label', type: 'string', description: 'Floating label above the input.' },
        { prop: 'error', type: 'string', description: 'Error message shown below — triggers error styling.' },
        { prop: 'helperText', type: 'string', description: 'Hint text shown below when there is no error.' },
        { prop: 'leftIcon', type: 'ReactNode', description: 'Icon rendered inside the left side.' },
        { prop: 'rightIcon', type: 'ReactNode', description: 'Icon rendered inside the right side.' },
        { prop: 'inputSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls height and font size.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        { prop: 'placeholder', type: 'string', description: 'Placeholder text.' },
        { prop: 'type', type: 'string', default: "'text'", description: 'HTML input type (text, email, password, etc.).' },
      ],
    },
  ],

  switch: [
    {
      name: 'Switch',
      props: [
        { prop: 'checked', type: 'boolean', description: 'Controlled state of the switch.' },
        { prop: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state for uncontrolled usage.' },
        { prop: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Fired when the switch is toggled.' },
        { prop: 'label', type: 'string', description: 'Text label rendered next to the toggle.' },
        { prop: 'description', type: 'string', description: 'Helper text shown below the label.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the toggle dimensions.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      ],
    },
  ],

  card: [
    {
      name: 'Card',
      props: [
        { prop: 'variant', type: "'elevated' | 'glass' | 'outlined' | 'flat'", default: "'elevated'", description: 'Visual style of the card surface.' },
        { prop: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Inner padding preset.' },
        { prop: 'hoverable', type: 'boolean', default: 'false', description: 'Enables spring lift animation on hover.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', description: 'Card content — use sub-components for structure.' },
      ],
    },
    {
      name: 'CardHeader',
      description: 'Top section — typically holds CardTitle and CardDescription',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Header content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'CardTitle',
      description: 'Renders as an <h3>',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Title text.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'CardDescription',
      description: 'Secondary text below the title',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Description text.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'CardContent',
      description: 'Main body area',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Body content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'CardFooter',
      description: 'Bottom section — typically action buttons',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Footer content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  badge: [
    {
      name: 'Badge',
      props: [
        { prop: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Color variant of the badge.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Badge label.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  alert: [
    {
      name: 'Alert',
      description: 'Root container with role="alert"',
      props: [
        { prop: 'variant', type: "'default' | 'destructive' | 'success' | 'warning' | 'info'", default: "'default'", description: 'Severity level — also determines the auto-selected icon.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Use AlertTitle and AlertDescription inside.' },
      ],
    },
    {
      name: 'AlertTitle',
      description: 'Renders as an <h5>',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Alert headline.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'AlertDescription',
      description: 'Secondary descriptive text',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Alert body copy.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  tabs: [
    {
      name: 'Tabs',
      description: 'Root context provider',
      props: [
        { prop: 'defaultValue', type: 'string', description: 'Initially active tab (uncontrolled).' },
        { prop: 'value', type: 'string', description: 'Controlled active tab value.' },
        { prop: 'onValueChange', type: '(value: string) => void', description: 'Fired when the active tab changes.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'TabsList and TabsContent elements.' },
      ],
    },
    {
      name: 'TabsList',
      description: 'Tab navigation strip',
      props: [
        { prop: 'variant', type: "'default' | 'segmented'", default: "'default'", description: "'default' renders underline tabs; 'segmented' renders pill tabs." },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'TabsTrigger elements.' },
      ],
    },
    {
      name: 'TabsTrigger',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'Unique identifier — must match the corresponding TabsContent value.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents selecting this tab.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Tab label.' },
      ],
    },
    {
      name: 'TabsContent',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'Shown when the matching TabsTrigger is active.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Panel content.' },
      ],
    },
  ],

  accordion: [
    {
      name: 'Accordion',
      description: 'Root wrapper — manages open state',
      props: [
        { prop: 'type', type: "'single' | 'multiple'", default: "'single'", description: "'single' allows one open item; 'multiple' allows many." },
        { prop: 'defaultValue', type: 'string | string[]', description: 'Item(s) open on first render (uncontrolled).' },
        { prop: 'value', type: 'string | string[]', description: 'Controlled open item(s).' },
        { prop: 'onValueChange', type: '(value: string | string[]) => void', description: 'Fired when open state changes.' },
        { prop: 'collapsible', type: 'boolean', default: 'true', description: "When type is 'single', allows closing the open item." },
        { prop: 'variant', type: "'default' | 'bordered' | 'separated'", default: "'default'", description: 'Visual style of the accordion container.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'AccordionItem',
      description: 'Individual collapsible section',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'Unique identifier for this item.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents this item from being opened.' },
        { prop: 'variant', type: "'default' | 'bordered' | 'separated'", description: 'Overrides the root variant for this item only.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'AccordionTrigger',
      description: 'Clickable header — includes the chevron icon',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Trigger label text.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'AccordionContent',
      description: 'Animated collapsible content area',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Content shown when the item is open.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  avatar: [
    {
      name: 'Avatar',
      description: 'Root container — manages image load state via context',
      props: [
        { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Controls width, height, and font size.' },
        { prop: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Border radius preset.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'AvatarImage and/or AvatarFallback.' },
      ],
    },
    {
      name: 'AvatarImage',
      description: 'Must be used inside Avatar',
      props: [
        { prop: 'src', type: 'string', required: true, description: 'Image URL. Switches to fallback on error.' },
        { prop: 'alt', type: 'string', required: true, description: 'Accessible description of the image.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'AvatarFallback',
      description: 'Shown while loading or when the image fails',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Initials or icon to display.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  toast: [
    {
      name: 'ToastProvider',
      description: 'Wraps your app (or page section) — enables viewport portal',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Application content and ToastViewport.' },
      ],
    },
    {
      name: 'ToastViewport',
      description: 'Fixed overlay where toasts are rendered via portal',
      props: [
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes for position/layout.' },
      ],
    },
    {
      name: 'Toast',
      props: [
        { prop: 'variant', type: "'default' | 'destructive' | 'success'", default: "'default'", description: 'Color and semantic intent.' },
        { prop: 'open', type: 'boolean', description: 'Controlled visibility.' },
        { prop: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial visibility (uncontrolled).' },
        { prop: 'onOpenChange', type: '(open: boolean) => void', description: 'Fired when the toast opens or closes.' },
        { prop: 'duration', type: 'number', default: '5000', description: 'Auto-dismiss delay in ms. Use Infinity to disable.' },
        { prop: 'role', type: "'status' | 'alert'", default: "'status'", description: "Use 'alert' for urgent messages (assertive live region)." },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'ToastTitle',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Bold heading of the toast.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'ToastDescription',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Secondary body text.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
    {
      name: 'ToastAction',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Action button label.' },
        { prop: 'altText', type: 'string', description: 'Screen-reader label when action label is too short.' },
        { prop: 'onClick', type: '() => void', description: 'Handler for the action click.' },
      ],
    },
    {
      name: 'ToastClose',
      props: [
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  checkbox: [
    {
      name: 'Checkbox',
      props: [
        { prop: 'checked', type: "boolean | 'indeterminate'", description: 'Controlled checked state.' },
        { prop: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state (uncontrolled).' },
        { prop: 'onCheckedChange', type: "(checked: boolean | 'indeterminate') => void", description: 'Fired on state change.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
        { prop: 'id', type: 'string', description: 'Associates the checkbox with a <label>.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  tooltip: [
    {
      name: 'Tooltip',
      props: [
        { prop: 'content', type: 'ReactNode', required: true, description: 'Content rendered inside the tooltip bubble.' },
        { prop: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred placement relative to the trigger.' },
        { prop: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment along the side axis.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'The element that triggers the tooltip on hover/focus.' },
      ],
    },
  ],

  modal: [
    {
      name: 'Modal',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls visibility of the modal.' },
        { prop: 'onOpenChange', type: '(open: boolean) => void', required: true, description: 'Called when the modal opens or closes — receives the new boolean state.' },
        { prop: 'title', type: 'string', description: 'Heading text in the modal header.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Max-width preset of the modal panel.' },
        { prop: 'footer', type: 'ReactNode', description: 'Action buttons rendered in the modal footer.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Modal body content.' },
      ],
    },
  ],

  select: [
    {
      name: 'Select',
      props: [
        { prop: 'value', type: 'string', description: 'Controlled selected value.' },
        { prop: 'defaultValue', type: 'string', description: 'Initial selected value (uncontrolled).' },
        { prop: 'onValueChange', type: '(value: string) => void', description: 'Fired when selection changes.' },
        { prop: 'placeholder', type: 'string', description: 'Shown when no value is selected.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
        { prop: 'label', type: 'string', description: 'Label text above the select.' },
        { prop: 'error', type: 'string', description: 'Error message shown below.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'SelectItem elements.' },
      ],
    },
  ],

  divider: [
    {
      name: 'Divider',
      props: [
        { prop: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the divider line.' },
        { prop: 'label', type: 'string', description: 'Optional centered text label.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  spinner: [
    {
      name: 'Spinner',
      props: [
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the spinner dimensions.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  skeleton: [
    {
      name: 'Skeleton',
      props: [
        { prop: 'className', type: 'string', description: 'Use Tailwind width/height classes to match the element you are replacing (e.g. w-32 h-4).' },
        { prop: 'variant', type: "'default' | 'circle' | 'text'", default: "'default'", description: 'Shape preset.' },
      ],
    },
  ],

  progress: [
    {
      name: 'Progress',
      props: [
        { prop: 'value', type: 'number', required: true, description: 'Current progress value (0–100).' },
        { prop: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar height preset.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  slider: [
    {
      name: 'Slider',
      props: [
        { prop: 'value', type: 'number[]', description: 'Controlled value(s).' },
        { prop: 'defaultValue', type: 'number[]', description: 'Initial value(s) (uncontrolled).' },
        { prop: 'min', type: 'number', default: '0', description: 'Minimum allowed value.' },
        { prop: 'max', type: 'number', default: '100', description: 'Maximum allowed value.' },
        { prop: 'step', type: 'number', default: '1', description: 'Increment between steps.' },
        { prop: 'onValueChange', type: '(value: number[]) => void', description: 'Fired while dragging.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      ],
    },
  ],

  datepicker: [
    {
      name: 'DatePicker',
      props: [
        { prop: 'value', type: 'Date | null', description: 'Controlled selected date.' },
        { prop: 'onChange', type: '(date: Date | null) => void', required: true, description: 'Fired when date is selected.' },
        { prop: 'placeholder', type: 'string', default: "'Pick a date'", description: 'Trigger placeholder text.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
        { prop: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
        { prop: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
      ],
    },
  ],

  breadcrumb: [
    {
      name: 'Breadcrumb',
      props: [
        { prop: 'items', type: "Array<{ label: string; href?: string }>", required: true, description: 'Ordered list of crumbs. Last item is the current page.' },
        { prop: 'separator', type: 'ReactNode', default: "'/'", description: 'Custom separator between crumbs.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  pagination: [
    {
      name: 'Pagination',
      props: [
        { prop: 'currentPage', type: 'number', required: true, description: 'Currently active page (1-indexed).' },
        { prop: 'totalPages', type: 'number', required: true, description: 'Total number of pages.' },
        { prop: 'onPageChange', type: '(page: number) => void', required: true, description: 'Fired when the user navigates.' },
        { prop: 'siblingCount', type: 'number', default: '1', description: 'Pages shown on each side of the current page.' },
      ],
    },
  ],

  callout: [
    {
      name: 'Callout',
      props: [
        { prop: 'variant', type: "'info' | 'warning' | 'success' | 'error'", default: "'info'", description: 'Color and icon preset.' },
        { prop: 'title', type: 'string', description: 'Bold heading inside the callout.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Callout body content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  emptystate: [
    {
      name: 'EmptyState',
      props: [
        { prop: 'icon', type: 'ReactNode', description: 'Illustration or icon above the message.' },
        { prop: 'title', type: 'string', required: true, description: 'Primary empty state message.' },
        { prop: 'description', type: 'string', description: 'Secondary explanation.' },
        { prop: 'action', type: 'ReactNode', description: 'CTA button or link.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  collapsible: [
    {
      name: 'Collapsible',
      description: 'Root context provider. Wrap CollapsibleTrigger + CollapsibleContent inside.',
      props: [
        { prop: 'open', type: 'boolean', description: 'Controlled open state.' },
        { prop: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial state (uncontrolled).' },
        { prop: 'onOpenChange', type: '(open: boolean) => void', description: 'Fired when the panel opens or closes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'CollapsibleTrigger and CollapsibleContent elements.' },
      ],
    },
    {
      name: 'CollapsibleTrigger',
      description: 'The element that toggles open/close. Renders as a button by default.',
      props: [
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes for the trigger button.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Trigger label or icon.' },
      ],
    },
    {
      name: 'CollapsibleContent',
      description: 'The panel revealed when open. Animated with height transition.',
      props: [
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Content to reveal.' },
      ],
    },
  ],

  scrollarea: [
    {
      name: 'ScrollArea',
      props: [
        { prop: 'className', type: 'string', description: 'Set height via Tailwind (e.g. h-72) to enable scrolling.' },
        { prop: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Scroll direction.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Scrollable content.' },
      ],
    },
  ],

  table: [
    {
      name: 'Table',
      props: [
        { prop: 'columns', type: "Array<{ label: string; key: string; render?: (value, row) => ReactNode }>", required: true, description: 'Column definitions.' },
        { prop: 'data', type: 'Record<string, unknown>[]', required: true, description: 'Row data array.' },
        { prop: 'striped', type: 'boolean', default: 'false', description: 'Alternating row background.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  datagrid: [
    {
      name: 'DataGrid',
      props: [
        { prop: 'columns', type: 'DataGridColumn<T>[]', required: true, description: 'Column definitions with optional sort, filter, and custom render.' },
        { prop: 'data', type: 'T[]', required: true, description: 'Row data.' },
        { prop: 'selectable', type: 'boolean', default: 'false', description: 'Enables row checkboxes.' },
        { prop: 'density', type: "'compact' | 'default'", default: "'default'", description: 'Row height preset.' },
        { prop: 'pageSize', type: 'number', description: 'Rows per page — enables built-in pagination.' },
        { prop: 'striped', type: 'boolean', default: 'true', description: 'Alternating row background.' },
      ],
    },
  ],

  heading: [
    {
      name: 'Heading',
      props: [
        { prop: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '1', description: 'HTML heading element (h1–h6).' },
        { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'", description: 'Visual size independent of the semantic level.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Heading text.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  codeblock: [
    {
      name: 'CodeBlock',
      props: [
        { prop: 'code', type: 'string', required: true, description: 'Source code to display.' },
        { prop: 'language', type: 'string', default: "'typescript'", description: 'Syntax highlighting language.' },
        { prop: 'showLineNumbers', type: 'boolean', default: 'true', description: 'Shows line numbers on the left.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  kanbanboard: [
    {
      name: 'KanbanBoard',
      props: [
        { prop: 'columns', type: "Array<{ id: string; title: string; cards: KanbanCard[] }>", required: true, description: 'Column definitions with their cards.' },
        { prop: 'onCardMove', type: '(cardId: string, fromColumn: string, toColumn: string) => void', description: 'Fired when a card is dragged to a new column.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  commandmenu: [
    {
      name: 'CommandMenu',
      props: [
        { prop: 'groups', type: "Array<{ id: string; label?: string; items: CommandItem[] }>", required: true, description: 'Grouped command items.' },
        { prop: 'open', type: 'boolean', description: 'Controlled open state.' },
        { prop: 'onOpenChange', type: '(open: boolean) => void', description: 'Fired when the menu opens or closes.' },
        { prop: 'placeholder', type: 'string', default: "'Search commands…'", description: 'Search input placeholder.' },
      ],
    },
  ],

  fileupload: [
    {
      name: 'FileUpload',
      props: [
        { prop: 'onUpload', type: '(files: File[]) => void', required: true, description: 'Fired when files are selected or dropped.' },
        { prop: 'accept', type: 'string', description: 'MIME types or extensions (e.g. "image/*,.pdf").' },
        { prop: 'maxSize', type: 'number', description: 'Maximum file size in bytes.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the upload area.' },
      ],
    },
  ],

  calendar: [
    {
      name: 'Calendar',
      props: [
        { prop: 'value', type: 'Date | null', description: 'Controlled selected date.' },
        { prop: 'onChange', type: '(date: Date) => void', required: true, description: 'Fired on date selection.' },
        { prop: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
        { prop: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  popover: [
    {
      name: 'Popover',
      props: [
        { prop: 'trigger', type: 'ReactNode', required: true, description: 'Element that opens the popover on click.' },
        { prop: 'open', type: 'boolean', description: 'Controlled open state.' },
        { prop: 'onOpenChange', type: '(open: boolean) => void', description: 'Fired when open state changes.' },
        { prop: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred placement.' },
        { prop: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Alignment along the side axis.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Popover panel content.' },
      ],
    },
  ],

  sheet: [
    {
      name: 'Sheet',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls visibility.' },
        { prop: 'onOpenChange', type: '(open: boolean) => void', required: true, description: 'Called when the sheet opens or closes.' },
        { prop: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Side from which the sheet slides in.' },
        { prop: 'title', type: 'string', description: 'Sheet panel heading.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Sheet body content.' },
      ],
    },
  ],

  confirmdialog: [
    {
      name: 'ConfirmDialog',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls visibility.' },
        { prop: 'onConfirm', type: '() => void', required: true, description: 'Fired when the user confirms.' },
        { prop: 'onCancel', type: '() => void', required: true, description: 'Fired when the user cancels.' },
        { prop: 'title', type: 'string', required: true, description: 'Dialog heading.' },
        { prop: 'description', type: 'string', description: 'Explanatory text.' },
        { prop: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Confirm button label.' },
        { prop: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Cancel button label.' },
        { prop: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'Controls confirm button color.' },
      ],
    },
  ],

  avatargroup: [
    {
      name: 'AvatarGroup',
      props: [
        { prop: 'avatars', type: "Array<{ src?: string; name?: string; alt?: string }>", required: true, description: 'List of avatar data.' },
        { prop: 'max', type: 'number', default: '5', description: 'Maximum avatars shown before a +N overflow badge.' },
        { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of each avatar.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  chip: [
    {
      name: 'Chip',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Chip text.' },
        { prop: 'onRemove', type: '() => void', description: 'When provided, shows a remove (×) button.' },
        { prop: 'selected', type: 'boolean', default: 'false', description: 'Toggles selected styling.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  tag: [
    {
      name: 'Tag',
      props: [
        { prop: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Color variant.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Tag label.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  tagsinput: [
    {
      name: 'TagsInput',
      props: [
        { prop: 'value', type: 'string[]', required: true, description: 'Controlled list of tags.' },
        { prop: 'onChange', type: '(tags: string[]) => void', required: true, description: 'Fired when tags change.' },
        { prop: 'placeholder', type: 'string', default: "'Add tag…'", description: 'Input placeholder.' },
        { prop: 'maxTags', type: 'number', description: 'Maximum number of tags allowed.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents adding/removing tags.' },
      ],
    },
  ],

  radiogroup: [
    {
      name: 'RadioGroup',
      props: [
        { prop: 'value', type: 'string', description: 'Controlled selected value.' },
        { prop: 'defaultValue', type: 'string', description: 'Initial value (uncontrolled).' },
        { prop: 'onValueChange', type: '(value: string) => void', description: 'Fired on selection.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all items.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'RadioGroupItem elements.' },
      ],
    },
  ],

  // ─── INPUTS (remaining) ───────────────────────────────────────────────────

  buttonwithdropdown: [
    {
      name: 'ButtonWithDropdown',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Label for the primary action button.' },
        { prop: 'onClick', type: '() => void', required: true, description: 'Handler for the primary button click.' },
        { prop: 'items', type: "Array<{ label: string; onClick: () => void; disabled?: boolean }>", required: true, description: 'Dropdown menu items.' },
        { prop: 'variant', type: "'primary' | 'secondary' | 'outline'", default: "'primary'", description: 'Visual style.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables both the button and dropdown.' },
      ],
    },
  ],

  combobox: [
    {
      name: 'Combobox',
      props: [
        { prop: 'options', type: "Array<{ value: string; label: string }>", required: true, description: 'List of selectable options.' },
        { prop: 'value', type: 'string', description: 'Controlled selected value.' },
        { prop: 'onValueChange', type: '(value: string) => void', description: 'Fired when selection changes.' },
        { prop: 'placeholder', type: 'string', default: "'Search…'", description: 'Input placeholder text.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the combobox.' },
        { prop: 'label', type: 'string', description: 'Label above the input.' },
        { prop: 'error', type: 'string', description: 'Error message below the input.' },
      ],
    },
  ],

  controlcentertogles: [
    {
      name: 'ControlCenterToggles',
      props: [
        { prop: 'items', type: "Array<{ id: string; icon: ReactNode; label: string; active?: boolean; onToggle?: (active: boolean) => void }>", required: true, description: 'Toggle items to display in the grid.' },
        { prop: 'columns', type: 'number', default: '4', description: 'Number of columns in the grid.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  daterangepicker: [
    {
      name: 'DateRangePicker',
      props: [
        { prop: 'value', type: '{ from: Date | null; to: Date | null }', description: 'Controlled date range.' },
        { prop: 'onChange', type: '(range: { from: Date | null; to: Date | null }) => void', required: true, description: 'Fired when range selection changes.' },
        { prop: 'placeholder', type: 'string', default: "'Pick a range'", description: 'Trigger placeholder.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
        { prop: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
        { prop: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
      ],
    },
  ],

  fab: [
    {
      name: 'FAB',
      props: [
        { prop: 'icon', type: 'ReactNode', required: true, description: 'Icon displayed inside the button.' },
        { prop: 'onClick', type: '() => void', required: true, description: 'Click handler.' },
        { prop: 'label', type: 'string', description: 'Accessible label (aria-label).' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the FAB.' },
        { prop: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Color variant.' },
        { prop: 'position', type: "'bottom-right' | 'bottom-left' | 'bottom-center'", default: "'bottom-right'", description: 'Fixed position preset.' },
      ],
    },
  ],

  fabgroup: [
    {
      name: 'FABGroup',
      props: [
        { prop: 'icon', type: 'ReactNode', required: true, description: 'Icon for the main FAB button.' },
        { prop: 'actions', type: "Array<{ icon: ReactNode; label: string; onClick: () => void }>", required: true, description: 'Secondary action buttons that expand.' },
        { prop: 'position', type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: 'Fixed position preset.' },
      ],
    },
  ],

  hapticbutton: [
    {
      name: 'HapticButton',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Button content.' },
        { prop: 'onClick', type: '() => void', description: 'Click handler.' },
        { prop: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", description: 'Visual style.' },
        { prop: 'intensity', type: "'light' | 'medium' | 'heavy'", default: "'medium'", description: 'Spring animation intensity.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      ],
    },
  ],

  iconbutton: [
    {
      name: 'IconButton',
      props: [
        { prop: 'icon', type: 'ReactNode', required: true, description: 'Icon to display.' },
        { prop: 'label', type: 'string', required: true, description: 'Accessible label (aria-label).' },
        { prop: 'onClick', type: '() => void', description: 'Click handler.' },
        { prop: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'outline'", default: "'ghost'", description: 'Visual style.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      ],
    },
  ],

  otpinput: [
    {
      name: 'OTPInput',
      props: [
        { prop: 'length', type: 'number', default: '6', description: 'Number of OTP digit boxes.' },
        { prop: 'value', type: 'string', description: 'Controlled OTP value.' },
        { prop: 'onChange', type: '(value: string) => void', required: true, description: 'Fired on each digit change.' },
        { prop: 'onComplete', type: '(value: string) => void', description: 'Fired when all digits are filled.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all digit inputs.' },
        { prop: 'error', type: 'string', description: 'Error message shown below.' },
      ],
    },
  ],

  passwordinput: [
    {
      name: 'PasswordInput',
      props: [
        { prop: 'value', type: 'string', description: 'Controlled value.' },
        { prop: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', description: 'Change handler.' },
        { prop: 'label', type: 'string', description: 'Label above the input.' },
        { prop: 'error', type: 'string', description: 'Error message below.' },
        { prop: 'showStrength', type: 'boolean', default: 'false', description: 'Shows password strength indicator.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        { prop: 'placeholder', type: 'string', description: 'Placeholder text.' },
      ],
    },
  ],

  peertagin: [
    {
      name: 'PeerTagInput',
      props: [
        { prop: 'value', type: 'string[]', required: true, description: 'Controlled list of selected peer tags.' },
        { prop: 'onChange', type: '(tags: string[]) => void', required: true, description: 'Fired when tags change.' },
        { prop: 'contacts', type: "Array<{ id: string; name: string; avatar?: string }>", description: 'Contacts for autocomplete suggestions.' },
        { prop: 'placeholder', type: 'string', default: "'Add person…'", description: 'Input placeholder.' },
        { prop: 'maxTags', type: 'number', description: 'Maximum number of tags.' },
      ],
    },
  ],

  quantityselector: [
    {
      name: 'QuantitySelector',
      props: [
        { prop: 'value', type: 'number', required: true, description: 'Controlled quantity value.' },
        { prop: 'onChange', type: '(value: number) => void', required: true, description: 'Fired on increment/decrement.' },
        { prop: 'min', type: 'number', default: '1', description: 'Minimum allowed value.' },
        { prop: 'max', type: 'number', description: 'Maximum allowed value.' },
        { prop: 'step', type: 'number', default: '1', description: 'Increment step.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all controls.' },
      ],
    },
  ],

  rangeslider: [
    {
      name: 'RangeSlider',
      props: [
        { prop: 'value', type: '[number, number]', description: 'Controlled [min, max] range.' },
        { prop: 'defaultValue', type: '[number, number]', description: 'Initial range (uncontrolled).' },
        { prop: 'min', type: 'number', default: '0', description: 'Minimum bound.' },
        { prop: 'max', type: 'number', default: '100', description: 'Maximum bound.' },
        { prop: 'step', type: 'number', default: '1', description: 'Increment between steps.' },
        { prop: 'onValueChange', type: '(value: [number, number]) => void', description: 'Fired while dragging.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      ],
    },
  ],

  ratinginput: [
    {
      name: 'RatingInput',
      props: [
        { prop: 'value', type: 'number', description: 'Controlled rating (0–max).' },
        { prop: 'onChange', type: '(value: number) => void', description: 'Fired when a star is clicked.' },
        { prop: 'max', type: 'number', default: '5', description: 'Total number of stars.' },
        { prop: 'halfStars', type: 'boolean', default: 'false', description: 'Enables half-star increments.' },
        { prop: 'readOnly', type: 'boolean', default: 'false', description: 'Displays rating without interaction.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size.' },
      ],
    },
  ],

  rotaryselector: [
    {
      name: 'RotarySelector',
      props: [
        { prop: 'value', type: 'number', required: true, description: 'Controlled selected value.' },
        { prop: 'onChange', type: '(value: number) => void', required: true, description: 'Fired on rotation.' },
        { prop: 'min', type: 'number', default: '0', description: 'Minimum value.' },
        { prop: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { prop: 'size', type: 'number', default: '120', description: 'Diameter of the dial in pixels.' },
        { prop: 'label', type: 'string', description: 'Label displayed in the center.' },
      ],
    },
  ],

  searchinput: [
    {
      name: 'SearchInput',
      description: 'Root component. Works as a self-contained input or as a compound context provider when children are passed.',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'Controlled search query.' },
        { prop: 'onChange', type: '(value: string) => void', required: true, description: 'Fired on every input change.' },
        { prop: 'onSearch', type: '(value: string) => void', description: 'Fired on Enter key (simple mode) or when debounce fires.' },
        { prop: 'onClear', type: '() => void', description: 'Fired when the clear button is pressed.' },
        { prop: 'isLoading', type: 'boolean', default: 'false', description: 'Shows a spinner in place of the clear button.' },
        { prop: 'debounceTime', type: 'number', default: '0', description: 'Debounce delay in ms before onSearch fires. 0 = no debounce.' },
        { prop: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text for the input.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls input height (h-8 / h-10 / h-12) and text size.' },
        { prop: 'variant', type: "'default' | 'error'", default: "'default'", description: 'Border color variant — use error to show validation state.' },
        { prop: 'label', type: 'string', description: 'Optional label rendered above the input.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input and all interactive sub-components.' },
        { prop: 'containerClassName', type: 'string', description: 'Class applied to the outer wrapper div.' },
        { prop: 'children', type: 'ReactNode', description: 'When provided, switches to compound mode — wraps children in a shared Context provider. The actual input must be rendered via SearchInput.Input.' },
      ],
    },
    {
      name: 'SearchInput.Input',
      description: 'The actual <input> element with search icon, clear button, and spinner. Must be used inside SearchInput in compound mode.',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'Controlled input value.' },
        { prop: 'onChange', type: '(value: string) => void', required: true, description: 'Fired on every keystroke.' },
        { prop: 'onSearch', type: '(value: string) => void', description: 'Fired when the user presses Enter.' },
        { prop: 'onClear', type: '() => void', description: 'Fired when the clear button is clicked.' },
        { prop: 'isLoading', type: 'boolean', default: 'false', description: 'Shows a spinner instead of the clear button.' },
        { prop: 'placeholder', type: 'string', description: 'Placeholder text.' },
        { prop: 'disabled', type: 'boolean', description: 'Disables the input (also read from context).' },
      ],
    },
    {
      name: 'SearchInput.Dropdown',
      description: 'Animated results panel positioned absolutely below the input. Uses AnimatePresence for enter/exit transitions.',
      props: [
        { prop: 'show', type: 'boolean', required: true, description: 'Controls visibility — the component mounts/unmounts with animation.' },
        { prop: 'hasResults', type: 'boolean', default: 'false', description: 'When false and query is non-empty, shows a "No results for…" message.' },
        { prop: 'query', type: 'string', description: 'Current search query — used in the empty state message.' },
        { prop: 'maxHeight', type: 'string', default: "'50vh'", description: 'Max height before the panel becomes scrollable.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Sections and items to render inside the dropdown.' },
      ],
    },
    {
      name: 'SearchInput.Section',
      description: 'Groups related items under a labelled section header.',
      props: [
        { prop: 'title', type: 'string', required: true, description: 'Section header text (rendered uppercase with letter-spacing).' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Items inside this section.' },
      ],
    },
    {
      name: 'SearchInput.Item',
      description: 'A single result row. Renders as <button> when onClick is provided, <div> otherwise.',
      props: [
        { prop: 'onClick', type: '() => void', description: 'Click handler. When present, the row renders as a focusable, keyboard-accessible button.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Row content — typically ItemIcon + ItemContent + TrailingBadge.' },
      ],
    },
    {
      name: 'SearchInput.ItemContent',
      description: 'Two-line text block for a result row (label + optional subtitle).',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Primary label — truncated with ellipsis.' },
        { prop: 'subtitle', type: 'string', description: 'Secondary line — smaller and muted, also truncated.' },
      ],
    },
    {
      name: 'SearchInput.ItemIcon',
      description: 'Icon slot for a result row. Renders a predefined emoji for known resource types, or a custom ReactNode.',
      props: [
        { prop: 'type', type: "'paper' | 'book' | 'course' | 'website'", description: 'Renders a predefined emoji (📄/📚/🎓/💻). Ignored when icon is set.' },
        { prop: 'icon', type: 'ReactNode', description: 'Custom icon node. Takes precedence over type.' },
      ],
    },
    {
      name: 'SearchInput.TrailingBadge',
      description: 'Small color-coded badge anchored to the right side of an item row.',
      props: [
        { prop: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Color variant for the badge.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Badge content — typically a short label or icon.' },
      ],
    },
  ],

  segmentedinput: [
    {
      name: 'SegmentedInput',
      props: [
        { prop: 'options', type: "Array<{ value: string; label: ReactNode }>", required: true, description: 'Segment options.' },
        { prop: 'value', type: 'string', description: 'Controlled selected segment.' },
        { prop: 'defaultValue', type: 'string', description: 'Initial segment (uncontrolled).' },
        { prop: 'onValueChange', type: '(value: string) => void', description: 'Fired on segment change.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  signaturepad: [
    {
      name: 'SignaturePad',
      props: [
        { prop: 'onSave', type: '(dataUrl: string) => void', required: true, description: 'Called with the PNG data URL when saved.' },
        { prop: 'onClear', type: '() => void', description: 'Called when the canvas is cleared.' },
        { prop: 'width', type: 'number', default: '400', description: 'Canvas width in pixels.' },
        { prop: 'height', type: 'number', default: '200', description: 'Canvas height in pixels.' },
        { prop: 'strokeColor', type: 'string', default: "'#000000'", description: 'Pen stroke color.' },
        { prop: 'strokeWidth', type: 'number', default: '2', description: 'Pen stroke width.' },
      ],
    },
  ],

  splitbutton: [
    {
      name: 'SplitButton',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Primary button label.' },
        { prop: 'onClick', type: '() => void', required: true, description: 'Primary action handler.' },
        { prop: 'items', type: "Array<{ label: string; onClick: () => void }>", required: true, description: 'Dropdown items.' },
        { prop: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Visual variant.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables both parts.' },
      ],
    },
  ],

  textarea: [
    {
      name: 'Textarea',
      props: [
        { prop: 'label', type: 'string', description: 'Label above the textarea.' },
        { prop: 'error', type: 'string', description: 'Error message shown below.' },
        { prop: 'helperText', type: 'string', description: 'Helper text shown when no error.' },
        { prop: 'maxLength', type: 'number', description: 'Character limit — shows a counter when set.' },
        { prop: 'autoResize', type: 'boolean', default: 'true', description: 'Grows vertically with content.' },
        { prop: 'rows', type: 'number', default: '3', description: 'Initial visible rows.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
        { prop: 'placeholder', type: 'string', description: 'Placeholder text.' },
      ],
    },
  ],

  timepicker: [
    {
      name: 'TimePicker',
      props: [
        { prop: 'value', type: 'string', description: "Controlled time value in 'HH:mm' format." },
        { prop: 'onChange', type: '(time: string) => void', required: true, description: 'Fired when time changes.' },
        { prop: 'use24Hour', type: 'boolean', default: 'false', description: 'Uses 24-hour format instead of AM/PM.' },
        { prop: 'minuteStep', type: 'number', default: '1', description: 'Minute increment step.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
        { prop: 'label', type: 'string', description: 'Label above the input.' },
      ],
    },
  ],

  // ─── LAYOUT (remaining) ───────────────────────────────────────────────────

  footer: [
    {
      name: 'Footer',
      props: [
        { prop: 'brand', type: 'ReactNode', description: 'Logo or brand mark in the top-left area.' },
        { prop: 'columns', type: "Array<{ title: string; links: Array<{ label: string; href: string }> }>", description: 'Link column definitions.' },
        { prop: 'bottomContent', type: 'ReactNode', description: 'Copyright notice or bottom bar content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  gridsystem: [
    {
      name: 'GridSystem',
      props: [
        { prop: 'columns', type: 'number | string', default: '12', description: 'Number of columns (CSS grid template).' },
        { prop: 'gap', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Gap between grid cells.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Grid cell elements.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  layout: [
    {
      name: 'Layout',
      props: [
        { prop: 'header', type: 'ReactNode', description: 'Top header slot.' },
        { prop: 'sidebar', type: 'ReactNode', description: 'Left sidebar slot.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Main content area.' },
        { prop: 'footer', type: 'ReactNode', description: 'Bottom footer slot.' },
        { prop: 'sidebarWidth', type: 'string', default: "'240px'", description: 'CSS width of the sidebar.' },
      ],
    },
  ],

  masonrylayout: [
    {
      name: 'MasonryLayout',
      props: [
        { prop: 'columns', type: 'number', default: '3', description: 'Number of masonry columns.' },
        { prop: 'gap', type: 'number', default: '16', description: 'Gap between items in pixels.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Items to arrange in masonry order.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  panel: [
    {
      name: 'Panel',
      props: [
        { prop: 'title', type: 'string', description: 'Panel heading.' },
        { prop: 'actions', type: 'ReactNode', description: 'Trailing action buttons in the header.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Panel body content.' },
        { prop: 'scrollable', type: 'boolean', default: 'false', description: 'Makes the body area scroll independently.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  resizablepanel: [
    {
      name: 'ResizablePanel',
      props: [
        { prop: 'defaultSize', type: 'number', description: 'Initial size in pixels.' },
        { prop: 'minSize', type: 'number', description: 'Minimum allowed size in pixels.' },
        { prop: 'maxSize', type: 'number', description: 'Maximum allowed size in pixels.' },
        { prop: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Resize direction.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Panel content.' },
      ],
    },
  ],

  sidebar: [
    {
      name: 'Sidebar',
      props: [
        { prop: 'items', type: "Array<{ icon?: ReactNode; label: string; href?: string; children?: SidebarItem[] }>", required: true, description: 'Navigation items.' },
        { prop: 'collapsed', type: 'boolean', default: 'false', description: 'Collapses sidebar to icon-only mode.' },
        { prop: 'onCollapsedChange', type: '(collapsed: boolean) => void', description: 'Fired on collapse toggle.' },
        { prop: 'activeHref', type: 'string', description: 'Marks the active link.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  spacer: [
    {
      name: 'Spacer',
      props: [
        { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", description: 'Named spacing preset.' },
        { prop: 'axis', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Axis the spacer fills.' },
        { prop: 'flex', type: 'boolean', default: 'false', description: 'Expands to fill remaining flex space.' },
      ],
    },
  ],

  splitview: [
    {
      name: 'SplitView',
      props: [
        { prop: 'left', type: 'ReactNode', required: true, description: 'Left pane content.' },
        { prop: 'right', type: 'ReactNode', required: true, description: 'Right pane content.' },
        { prop: 'defaultSplit', type: 'number', default: '50', description: 'Initial left pane width as percentage.' },
        { prop: 'minLeft', type: 'number', description: 'Minimum left pane width in pixels.' },
        { prop: 'minRight', type: 'number', description: 'Minimum right pane width in pixels.' },
      ],
    },
  ],

  stickycontainer: [
    {
      name: 'StickyContainer',
      props: [
        { prop: 'top', type: 'number | string', default: '0', description: 'CSS top offset when sticky.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Content to make sticky.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  windowcontrols: [
    {
      name: 'WindowControls',
      props: [
        { prop: 'onClose', type: '() => void', description: 'Handler for the red close button.' },
        { prop: 'onMinimize', type: '() => void', description: 'Handler for the yellow minimize button.' },
        { prop: 'onMaximize', type: '() => void', description: 'Handler for the green maximize button.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  windowframe: [
    {
      name: 'WindowFrame',
      props: [
        { prop: 'title', type: 'string', description: 'Window title displayed in the title bar.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Window body content.' },
        { prop: 'showControls', type: 'boolean', default: 'true', description: 'Shows traffic-light window controls.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── TYPOGRAPHY (remaining) ───────────────────────────────────────────────

  blockquote: [
    {
      name: 'Blockquote',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Quoted text content.' },
        { prop: 'attribution', type: 'string', description: 'Author or source credit.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  caption: [
    {
      name: 'Caption',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Caption text.' },
        { prop: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  definitionlist: [
    {
      name: 'DefinitionList',
      props: [
        { prop: 'items', type: "Array<{ term: string; definition: string }>", required: true, description: 'Term-definition pairs.' },
        { prop: 'inline', type: 'boolean', default: 'false', description: 'Renders term and definition on the same line.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  descriptionblock: [
    {
      name: 'DescriptionBlock',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Field label text.' },
        { prop: 'value', type: 'ReactNode', required: true, description: 'Field value.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  keyvalueinfo: [
    {
      name: 'KeyValueInfo',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Key label.' },
        { prop: 'value', type: 'ReactNode', required: true, description: 'Value content.' },
        { prop: 'icon', type: 'ReactNode', description: 'Optional icon before the label.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  label: [
    {
      name: 'Label',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Label text.' },
        { prop: 'htmlFor', type: 'string', description: 'Associates the label with a form control.' },
        { prop: 'required', type: 'boolean', default: 'false', description: 'Shows a required asterisk.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  paragraph: [
    {
      name: 'Paragraph',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Paragraph text content.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Font size preset.' },
        { prop: 'color', type: "'primary' | 'secondary' | 'tertiary'", default: "'primary'", description: 'Text color token.' },
        { prop: 'maxWidth', type: 'string', description: 'CSS max-width for readability (e.g. "65ch").' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  propertylist: [
    {
      name: 'PropertyList',
      props: [
        { prop: 'items', type: "Array<{ label: string; value: ReactNode }>", required: true, description: 'Property-value pairs.' },
        { prop: 'dividers', type: 'boolean', default: 'true', description: 'Shows dividers between items.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  sectionheader: [
    {
      name: 'SectionHeader',
      props: [
        { prop: 'title', type: 'string', required: true, description: 'Section heading text.' },
        { prop: 'subtitle', type: 'string', description: 'Secondary text below the title.' },
        { prop: 'action', type: 'ReactNode', description: 'Trailing action (e.g. "View all" link).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  text: [
    {
      name: 'Text',
      props: [
        { prop: 'variant', type: "'body' | 'lead' | 'small' | 'tiny'", default: "'body'", description: 'Typographic scale variant.' },
        { prop: 'color', type: "'primary' | 'secondary' | 'tertiary' | 'accent'", default: "'primary'", description: 'Text color token.' },
        { prop: 'weight', type: "'normal' | 'medium' | 'semibold' | 'bold'", default: "'normal'", description: 'Font weight.' },
        { prop: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment.' },
        { prop: 'as', type: 'string', default: "'p'", description: 'HTML element to render.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Text content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  title: [
    {
      name: 'Title',
      props: [
        { prop: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '1', description: 'Semantic heading level (h1–h6).' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Heading text.' },
        { prop: 'id', type: 'string', description: 'HTML id for anchor links.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── NAVIGATION (remaining) ───────────────────────────────────────────────

  bottomnavigation: [
    {
      name: 'BottomNavigation',
      props: [
        { prop: 'items', type: "Array<{ icon: ReactNode; label: string; value: string }>", required: true, description: 'Navigation tab items.' },
        { prop: 'value', type: 'string', description: 'Controlled active tab value.' },
        { prop: 'onValueChange', type: '(value: string) => void', description: 'Fired when active tab changes.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  breadcrumbtabshybrid: [
    {
      name: 'BreadcrumbTabsHybrid',
      props: [
        { prop: 'breadcrumbs', type: "Array<{ label: string; href?: string }>", required: true, description: 'Breadcrumb items shown on mobile.' },
        { prop: 'tabs', type: "Array<{ value: string; label: string }>", required: true, description: 'Tab items shown on wider screens.' },
        { prop: 'activeTab', type: 'string', description: 'Controlled active tab value.' },
        { prop: 'onTabChange', type: '(value: string) => void', description: 'Fired when tab changes.' },
        { prop: 'breakpoint', type: 'string', default: "'md'", description: 'Tailwind breakpoint at which tabs appear.' },
      ],
    },
  ],

  contextmenu: [
    {
      name: 'ContextMenu',
      props: [
        { prop: 'items', type: "Array<{ label: string; icon?: ReactNode; onClick?: () => void; disabled?: boolean; separator?: boolean; children?: ContextMenuItem[] }>", required: true, description: 'Menu items including separators and sub-menus.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'The element that triggers the context menu on right-click.' },
      ],
    },
  ],

  dockbar: [
    {
      name: 'DockBar',
      props: [
        { prop: 'items', type: "Array<{ icon: ReactNode; label: string; onClick?: () => void; href?: string }>", required: true, description: 'Dock items.' },
        { prop: 'magnification', type: 'number', default: '1.5', description: 'Scale factor for hovered item.' },
        { prop: 'position', type: "'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Dock position.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  hamburgermenuicon: [
    {
      name: 'HamburgerMenuIcon',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls the open/close animation state.' },
        { prop: 'onClick', type: '() => void', required: true, description: 'Toggle handler.' },
        { prop: 'size', type: 'number', default: '24', description: 'Icon size in pixels.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  menubar: [
    {
      name: 'MenuBar',
      props: [
        { prop: 'menus', type: "Array<{ label: string; items: MenuItem[] }>", required: true, description: 'Top-level menu definitions.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  navbar: [
    {
      name: 'NavBar',
      props: [
        { prop: 'logo', type: 'ReactNode', description: 'Logo or brand element.' },
        { prop: 'links', type: "Array<{ label: string; href: string; active?: boolean }>", description: 'Navigation links.' },
        { prop: 'actions', type: 'ReactNode', description: 'Trailing action area (buttons, avatar, etc.).' },
        { prop: 'sticky', type: 'boolean', default: 'false', description: 'Makes the nav bar sticky on scroll.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  navigationdrawer: [
    {
      name: 'NavigationDrawer',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls drawer visibility.' },
        { prop: 'onClose', type: '() => void', required: true, description: 'Called when drawer is dismissed.' },
        { prop: 'items', type: "Array<{ icon?: ReactNode; label: string; href?: string }>", required: true, description: 'Navigation items.' },
        { prop: 'header', type: 'ReactNode', description: 'Content above the navigation items.' },
        { prop: 'footer', type: 'ReactNode', description: 'Content below the navigation items.' },
      ],
    },
  ],

  topactionbar: [
    {
      name: 'TopActionBar',
      props: [
        { prop: 'title', type: 'string', required: true, description: 'Page or section title.' },
        { prop: 'onBack', type: '() => void', description: 'Back button handler — shows back button when provided.' },
        { prop: 'actions', type: 'ReactNode', description: 'Trailing actions (icon buttons).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── FEEDBACK (remaining) ─────────────────────────────────────────────────

  errorboundary: [
    {
      name: 'ErrorBoundary',
      props: [
        { prop: 'fallback', type: 'ReactNode | ((error: Error) => ReactNode)', description: 'UI rendered when an error is caught.' },
        { prop: 'onError', type: '(error: Error, info: ErrorInfo) => void', description: 'Callback when an error is caught.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Protected subtree.' },
      ],
    },
  ],

  jargontooltip: [
    {
      name: 'JargonTooltip',
      props: [
        { prop: 'term', type: 'string', required: true, description: 'The jargon word displayed inline.' },
        { prop: 'definition', type: 'string', required: true, description: 'Plain-English explanation shown in the tooltip.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  loadingoverlay: [
    {
      name: 'LoadingOverlay',
      props: [
        { prop: 'visible', type: 'boolean', required: true, description: 'Controls overlay visibility.' },
        { prop: 'message', type: 'string', description: 'Optional text below the spinner.' },
        { prop: 'blur', type: 'boolean', default: 'true', description: 'Blurs the content behind the overlay.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  maintenancemode: [
    {
      name: 'MaintenanceMode',
      props: [
        { prop: 'title', type: 'string', default: "'We'll be right back'", description: 'Main heading.' },
        { prop: 'message', type: 'string', description: 'Explanatory message.' },
        { prop: 'estimatedTime', type: 'string', description: 'Estimated resolution time shown to users.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  modalstackmanager: [
    {
      name: 'ModalStackManager',
      props: [
        { prop: 'modals', type: "Array<{ id: string; component: ReactNode; onClose: () => void }>", required: true, description: 'Ordered stack of modals to display.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  offlinestate: [
    {
      name: 'OfflineState',
      props: [
        { prop: 'onRetry', type: '() => void', description: 'Handler for the retry button.' },
        { prop: 'title', type: 'string', default: "'No Internet Connection'", description: 'Heading text.' },
        { prop: 'message', type: 'string', description: 'Explanatory message.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  snackbar: [
    {
      name: 'Snackbar',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls visibility.' },
        { prop: 'message', type: 'string', required: true, description: 'Notification text.' },
        { prop: 'onClose', type: '() => void', required: true, description: 'Called when dismissed or duration expires.' },
        { prop: 'action', type: 'ReactNode', description: 'Optional action button (e.g. Undo).' },
        { prop: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms.' },
        { prop: 'variant', type: "'default' | 'success' | 'error' | 'warning'", default: "'default'", description: 'Color variant.' },
      ],
    },
  ],

  stepper: [
    {
      name: 'Stepper',
      props: [
        { prop: 'steps', type: "Array<{ label: string; description?: string; status?: 'completed' | 'active' | 'pending' | 'error' }>", required: true, description: 'Step definitions with status.' },
        { prop: 'currentStep', type: 'number', required: true, description: 'Index of the currently active step (0-based).' },
        { prop: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── DATA (remaining) ─────────────────────────────────────────────────────

  diffviewer: [
    {
      name: 'DiffViewer',
      props: [
        { prop: 'oldValue', type: 'string', required: true, description: 'Original content (left/before).' },
        { prop: 'newValue', type: 'string', required: true, description: 'Modified content (right/after).' },
        { prop: 'splitView', type: 'boolean', default: 'true', description: 'Side-by-side vs inline diff mode.' },
        { prop: 'language', type: 'string', default: "'text'", description: 'Syntax highlighting language.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  filterbar: [
    {
      name: 'FilterBar',
      props: [
        { prop: 'filters', type: "Array<{ id: string; label: string; active?: boolean }>", required: true, description: 'Filter chip definitions.' },
        { prop: 'onFilterChange', type: '(id: string, active: boolean) => void', required: true, description: 'Fired when a filter is toggled.' },
        { prop: 'onClearAll', type: '() => void', description: 'Clears all active filters.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  gallery: [
    {
      name: 'Gallery',
      props: [
        { prop: 'images', type: "Array<{ src: string; alt: string; caption?: string }>", required: true, description: 'Gallery image definitions.' },
        { prop: 'columns', type: 'number', default: '3', description: 'Number of grid columns.' },
        { prop: 'gap', type: 'number', default: '8', description: 'Gap between images in pixels.' },
        { prop: 'lightbox', type: 'boolean', default: 'true', description: 'Opens a lightbox on image click.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  imagecarousel: [
    {
      name: 'ImageCarousel',
      props: [
        { prop: 'images', type: "Array<{ src: string; alt: string }>", required: true, description: 'Carousel slides.' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Auto-advances slides.' },
        { prop: 'interval', type: 'number', default: '3000', description: 'Auto-play interval in ms.' },
        { prop: 'showIndicators', type: 'boolean', default: 'true', description: 'Shows dot indicators.' },
        { prop: 'showArrows', type: 'boolean', default: 'true', description: 'Shows prev/next arrows.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  inspectorpanel: [
    {
      name: 'InspectorPanel',
      props: [
        { prop: 'sections', type: "Array<{ title: string; properties: Array<{ key: string; value: ReactNode }> }>", required: true, description: 'Grouped property sections.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  jsonviewer: [
    {
      name: 'JsonViewer',
      props: [
        { prop: 'data', type: 'unknown', required: true, description: 'JSON-serializable data to display.' },
        { prop: 'defaultExpanded', type: 'boolean', default: 'true', description: 'Expands all nodes by default.' },
        { prop: 'maxDepth', type: 'number', description: 'Maximum depth auto-expanded.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  lightbox: [
    {
      name: 'Lightbox',
      props: [
        { prop: 'images', type: "Array<{ src: string; alt: string }>", required: true, description: 'Images available in the lightbox.' },
        { prop: 'open', type: 'boolean', required: true, description: 'Controls lightbox visibility.' },
        { prop: 'initialIndex', type: 'number', default: '0', description: 'Index of the initially displayed image.' },
        { prop: 'onClose', type: '() => void', required: true, description: 'Called when lightbox is dismissed.' },
      ],
    },
  ],

  querybuilder: [
    {
      name: 'QueryBuilder',
      props: [
        { prop: 'fields', type: "Array<{ name: string; label: string; type: 'string' | 'number' | 'boolean' | 'date' }>", required: true, description: 'Available filterable fields.' },
        { prop: 'value', type: 'QueryGroup', description: 'Controlled query rule tree.' },
        { prop: 'onChange', type: '(query: QueryGroup) => void', description: 'Fired when rules change.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  reviews: [
    {
      name: 'Reviews',
      props: [
        { prop: 'items', type: "Array<{ author: string; rating: number; date: string; body: string; avatar?: string }>", required: true, description: 'Review list items.' },
        { prop: 'averageRating', type: 'number', description: 'Average rating shown in the summary.' },
        { prop: 'totalReviews', type: 'number', description: 'Total review count.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  timeline: [
    {
      name: 'Timeline',
      props: [
        { prop: 'items', type: "Array<{ icon?: ReactNode; title: string; description?: string; date?: string; status?: 'completed' | 'active' | 'pending' }>", required: true, description: 'Timeline event items.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  treeview: [
    {
      name: 'TreeView',
      props: [
        { prop: 'nodes', type: "Array<TreeNode>", required: true, description: 'Root-level tree nodes (each may have children).' },
        { prop: 'defaultExpanded', type: 'string[]', description: 'IDs of nodes expanded by default.' },
        { prop: 'onSelect', type: '(nodeId: string) => void', description: 'Fired when a node is selected.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── MEDIA ────────────────────────────────────────────────────────────────

  audioplayer: [
    {
      name: 'AudioPlayer',
      props: [
        { prop: 'src', type: 'string', required: true, description: 'Audio file URL.' },
        { prop: 'title', type: 'string', description: 'Track title displayed in the player.' },
        { prop: 'artist', type: 'string', description: 'Artist name.' },
        { prop: 'coverArt', type: 'string', description: 'Cover art image URL.' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Starts playback automatically.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  barcodegenerator: [
    {
      name: 'BarcodeGenerator',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'String encoded in the barcode.' },
        { prop: 'format', type: "'CODE128' | 'EAN13' | 'UPC' | 'CODE39'", default: "'CODE128'", description: 'Barcode symbology.' },
        { prop: 'width', type: 'number', default: '2', description: 'Bar width in pixels.' },
        { prop: 'height', type: 'number', default: '100', description: 'Bar height in pixels.' },
        { prop: 'displayValue', type: 'boolean', default: 'true', description: 'Shows the encoded text below the barcode.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  comicpanel: [
    {
      name: 'ComicPanel',
      props: [
        { prop: 'panels', type: "Array<{ image?: string; text?: string; caption?: string }>", required: true, description: 'Comic strip panel definitions.' },
        { prop: 'layout', type: "'grid' | 'strip'", default: "'strip'", description: 'Panel layout mode.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  docscanoverlay: [
    {
      name: 'DocScanOverlay',
      props: [
        { prop: 'onCapture', type: '(imageData: string) => void', required: true, description: 'Called with the captured document image.' },
        { prop: 'onCancel', type: '() => void', description: 'Called when scanning is cancelled.' },
        { prop: 'aspectRatio', type: 'number', default: '1.414', description: 'Target document aspect ratio (default: A4).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  imagecropper: [
    {
      name: 'ImageCropper',
      props: [
        { prop: 'src', type: 'string', required: true, description: 'Source image URL to crop.' },
        { prop: 'onCrop', type: '(croppedDataUrl: string) => void', required: true, description: 'Called with the cropped PNG data URL.' },
        { prop: 'aspectRatio', type: 'number', description: 'Lock the crop to this aspect ratio (e.g. 1 for square).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  markdowneditor: [
    {
      name: 'MarkdownEditor',
      props: [
        { prop: 'value', type: 'string', description: 'Controlled markdown content.' },
        { prop: 'onChange', type: '(value: string) => void', description: 'Fired on content change.' },
        { prop: 'placeholder', type: 'string', default: "'Write something…'", description: 'Editor placeholder.' },
        { prop: 'previewMode', type: 'boolean', default: 'false', description: 'Shows rendered preview instead of raw markdown.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  multifileupload: [
    {
      name: 'MultiFileUpload',
      props: [
        { prop: 'onUpload', type: '(files: File[]) => void', required: true, description: 'Called with all selected/dropped files.' },
        { prop: 'accept', type: 'string', description: 'Accepted MIME types or extensions.' },
        { prop: 'maxFiles', type: 'number', description: 'Maximum number of files allowed.' },
        { prop: 'maxSize', type: 'number', description: 'Per-file size limit in bytes.' },
        { prop: 'showProgress', type: 'boolean', default: 'true', description: 'Shows a per-file upload progress bar.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the upload area.' },
      ],
    },
  ],

  qrcodegenerator: [
    {
      name: 'QRCodeGenerator',
      props: [
        { prop: 'value', type: 'string', required: true, description: 'URL or text encoded in the QR code.' },
        { prop: 'size', type: 'number', default: '200', description: 'QR code canvas size in pixels.' },
        { prop: 'errorCorrection', type: "'L' | 'M' | 'Q' | 'H'", default: "'M'", description: 'Error correction level.' },
        { prop: 'logo', type: 'string', description: 'Logo image URL overlaid in the center.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  richtexteditor: [
    {
      name: 'RichTextEditor',
      props: [
        { prop: 'value', type: 'string', description: 'Controlled HTML content.' },
        { prop: 'onChange', type: '(html: string) => void', description: 'Fired on content change.' },
        { prop: 'placeholder', type: 'string', description: 'Editor placeholder.' },
        { prop: 'toolbar', type: 'string[]', description: "Toolbar items to show (e.g. ['bold', 'italic', 'link'])." },
        { prop: 'readOnly', type: 'boolean', default: 'false', description: 'Renders content without editing capability.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  videoplayer: [
    {
      name: 'VideoPlayer',
      props: [
        { prop: 'src', type: 'string', required: true, description: 'Video file or stream URL.' },
        { prop: 'poster', type: 'string', description: 'Thumbnail image shown before playback.' },
        { prop: 'autoPlay', type: 'boolean', default: 'false', description: 'Starts playback automatically (muted).' },
        { prop: 'loop', type: 'boolean', default: 'false', description: 'Loops the video.' },
        { prop: 'controls', type: 'boolean', default: 'true', description: 'Shows custom player controls.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  voicerecorder: [
    {
      name: 'VoiceRecorder',
      props: [
        { prop: 'onRecordingComplete', type: '(blob: Blob) => void', required: true, description: 'Called with the recorded audio Blob.' },
        { prop: 'maxDuration', type: 'number', description: 'Maximum recording duration in seconds.' },
        { prop: 'showWaveform', type: 'boolean', default: 'true', description: 'Displays a live waveform visualizer.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── CHARTS ───────────────────────────────────────────────────────────────

  assetallocationchart: [
    {
      name: 'AssetAllocationChart',
      props: [
        { prop: 'data', type: "Array<{ label: string; value: number; color?: string }>", required: true, description: 'Allocation segments.' },
        { prop: 'total', type: 'number', description: 'Total value shown in the center.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency symbol for the center label.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  assetpriceticker: [
    {
      name: 'AssetPriceTicker',
      props: [
        { prop: 'symbol', type: 'string', required: true, description: 'Asset ticker symbol (e.g. "BTC").' },
        { prop: 'price', type: 'number', required: true, description: 'Current price.' },
        { prop: 'change', type: 'number', description: 'Price change value.' },
        { prop: 'changePercent', type: 'number', description: 'Percentage change.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  balancechart: [
    {
      name: 'BalanceChart',
      props: [
        { prop: 'data', type: "Array<{ date: string; value: number }>", required: true, description: 'Time-series balance data.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code for Y-axis labels.' },
        { prop: 'height', type: 'number', default: '200', description: 'Chart height in pixels.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  chart: [
    {
      name: 'Chart',
      props: [
        { prop: 'type', type: "'line' | 'bar' | 'area' | 'pie' | 'donut'", required: true, description: 'Chart visualization type.' },
        { prop: 'data', type: 'ChartData', required: true, description: 'Chart.js-compatible data object.' },
        { prop: 'options', type: 'ChartOptions', description: 'Chart.js options override.' },
        { prop: 'height', type: 'number', default: '300', description: 'Chart height in pixels.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  counters: [
    {
      name: 'Counters',
      props: [
        { prop: 'value', type: 'number', required: true, description: 'Target number to count to.' },
        { prop: 'prefix', type: 'string', description: 'Text before the number (e.g. "$").' },
        { prop: 'suffix', type: 'string', description: 'Text after the number (e.g. "k+").' },
        { prop: 'duration', type: 'number', default: '2000', description: 'Animation duration in ms.' },
        { prop: 'decimals', type: 'number', default: '0', description: 'Number of decimal places.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  counterslistwithchart: [
    {
      name: 'CountersListWithChart',
      props: [
        { prop: 'items', type: "Array<{ label: string; value: number; prefix?: string; suffix?: string; data: number[] }>", required: true, description: 'Counter items each with its own sparkline data.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  kpiblock: [
    {
      name: 'KPIBlock',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'KPI metric label.' },
        { prop: 'value', type: 'string | number', required: true, description: 'KPI metric value.' },
        { prop: 'trend', type: 'number', description: 'Percentage change (positive = up, negative = down).' },
        { prop: 'icon', type: 'ReactNode', description: 'Icon displayed beside the metric.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  portfoliodistribution: [
    {
      name: 'PortfolioDistribution',
      props: [
        { prop: 'segments', type: "Array<{ label: string; value: number; color?: string }>", required: true, description: 'Portfolio segment definitions.' },
        { prop: 'height', type: 'number', default: '40', description: 'Stacked bar height in pixels.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  resourcemonitor: [
    {
      name: 'ResourceMonitor',
      props: [
        { prop: 'metrics', type: "Array<{ label: string; value: number; max?: number; unit?: string }>", required: true, description: 'Resources to monitor (CPU, RAM, etc.).' },
        { prop: 'refreshInterval', type: 'number', description: 'Auto-refresh interval in ms.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  sparkline: [
    {
      name: 'Sparkline',
      props: [
        { prop: 'data', type: 'number[]', required: true, description: 'Series of values to plot.' },
        { prop: 'width', type: 'number', default: '100', description: 'Chart width in pixels.' },
        { prop: 'height', type: 'number', default: '40', description: 'Chart height in pixels.' },
        { prop: 'color', type: 'string', default: "'currentColor'", description: 'Line and fill color.' },
        { prop: 'filled', type: 'boolean', default: 'false', description: 'Fills the area under the line.' },
      ],
    },
  ],

  statisticdisplay: [
    {
      name: 'StatisticDisplay',
      props: [
        { prop: 'label', type: 'string', required: true, description: 'Metric label.' },
        { prop: 'value', type: 'string | number', required: true, description: 'Primary metric value.' },
        { prop: 'change', type: 'number', description: 'Percentage change value.' },
        { prop: 'icon', type: 'ReactNode', description: 'Icon in the stat card.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── ANIMATIONS ───────────────────────────────────────────────────────────

  floatingelement: [
    {
      name: 'FloatingElement',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Content to animate.' },
        { prop: 'amplitude', type: 'number', default: '10', description: 'Float distance in pixels.' },
        { prop: 'duration', type: 'number', default: '3', description: 'Full cycle duration in seconds.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  floatingtoolbar: [
    {
      name: 'FloatingToolbar',
      props: [
        { prop: 'visible', type: 'boolean', required: true, description: 'Controls toolbar visibility.' },
        { prop: 'children', type: 'ReactNode', required: true, description: 'Toolbar action buttons.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  gesturecard: [
    {
      name: 'GestureCard',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Card content.' },
        { prop: 'onSwipeLeft', type: '() => void', description: 'Handler for left swipe.' },
        { prop: 'onSwipeRight', type: '() => void', description: 'Handler for right swipe.' },
        { prop: 'threshold', type: 'number', default: '100', description: 'Minimum drag distance in pixels to trigger a swipe.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  immersivehero: [
    {
      name: 'ImmersiveHero',
      props: [
        { prop: 'title', type: 'string', required: true, description: 'Hero headline.' },
        { prop: 'subtitle', type: 'string', description: 'Supporting text below the headline.' },
        { prop: 'backgroundImage', type: 'string', description: 'Background image URL.' },
        { prop: 'actions', type: 'ReactNode', description: 'CTA buttons.' },
        { prop: 'parallaxIntensity', type: 'number', default: '0.3', description: 'Parallax scroll speed multiplier.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  infinitehorizontalloop: [
    {
      name: 'InfiniteHorizontalLoop',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Items to loop — duplicated automatically.' },
        { prop: 'speed', type: 'number', default: '30', description: 'Scroll speed in pixels per second.' },
        { prop: 'direction', type: "'left' | 'right'", default: "'left'", description: 'Scroll direction.' },
        { prop: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Pauses animation on hover.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  interactivecursor: [
    {
      name: 'InteractiveCursor',
      props: [
        { prop: 'size', type: 'number', default: '16', description: 'Default cursor dot size in pixels.' },
        { prop: 'expandOnHover', type: 'boolean', default: 'true', description: 'Expands cursor when hovering interactive elements.' },
        { prop: 'color', type: 'string', default: "'white'", description: 'Cursor color.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  parallaxbanner: [
    {
      name: 'ParallaxBanner',
      props: [
        { prop: 'src', type: 'string', required: true, description: 'Background image URL.' },
        { prop: 'alt', type: 'string', required: true, description: 'Alt text for the image.' },
        { prop: 'speed', type: 'number', default: '0.5', description: 'Parallax speed multiplier (0–1).' },
        { prop: 'height', type: 'string', default: "'400px'", description: 'Banner height CSS value.' },
        { prop: 'children', type: 'ReactNode', description: 'Content overlaid on the banner.' },
      ],
    },
  ],

  parallaxstorystage: [
    {
      name: 'ParallaxStoryStage',
      props: [
        { prop: 'layers', type: "Array<{ src: string; speed: number; zIndex?: number }>", required: true, description: 'Parallax layers from background to foreground.' },
        { prop: 'height', type: 'string', default: "'600px'", description: 'Stage height CSS value.' },
        { prop: 'children', type: 'ReactNode', description: 'Foreground content.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  scrollprogressbar: [
    {
      name: 'ScrollProgressBar',
      props: [
        { prop: 'color', type: 'string', default: "'accent-blue'", description: 'Tailwind color class for the bar.' },
        { prop: 'height', type: 'number', default: '3', description: 'Bar height in pixels.' },
        { prop: 'position', type: "'top' | 'bottom'", default: "'top'", description: 'Fixed position of the bar.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  scrollrevealcards: [
    {
      name: 'ScrollRevealCards',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'Cards to reveal on scroll.' },
        { prop: 'stagger', type: 'number', default: '0.1', description: 'Delay between each card reveal in seconds.' },
        { prop: 'direction', type: "'up' | 'down' | 'left' | 'right'", default: "'up'", description: 'Reveal direction.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  stickyimagetextswap: [
    {
      name: 'StickyImageTextSwap',
      props: [
        { prop: 'sections', type: "Array<{ image: string; alt: string; title: string; description: string }>", required: true, description: 'Content sections — image swaps as user scrolls.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  unscramblingtext: [
    {
      name: 'UnscramblingText',
      props: [
        { prop: 'text', type: 'string', required: true, description: 'Final text to reveal after unscrambling.' },
        { prop: 'duration', type: 'number', default: '1500', description: 'Total animation duration in ms.' },
        { prop: 'trigger', type: "'mount' | 'inView'", default: "'mount'", description: 'What triggers the animation.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── AI ───────────────────────────────────────────────────────────────────

  aithinkingindica: [
    {
      name: 'AIThinkingIndicator',
      props: [
        { prop: 'visible', type: 'boolean', required: true, description: 'Shows or hides the indicator.' },
        { prop: 'label', type: 'string', default: "'Thinking…'", description: 'Accessible label text.' },
        { prop: 'variant', type: "'dots' | 'pulse' | 'wave'", default: "'dots'", description: 'Animation style.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  hyperpersonalizedwidgetfeed: [
    {
      name: 'HyperPersonalizedWidgetFeed',
      props: [
        { prop: 'widgets', type: "Array<{ id: string; component: ReactNode; priority?: number }>", required: true, description: 'Widget definitions — ordered by priority.' },
        { prop: 'columns', type: 'number', default: '2', description: 'Grid columns.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  promptsuggestionchips: [
    {
      name: 'PromptSuggestionChips',
      props: [
        { prop: 'suggestions', type: 'string[]', required: true, description: 'Suggested prompt strings.' },
        { prop: 'onSelect', type: '(suggestion: string) => void', required: true, description: 'Called when a chip is clicked.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  smartinsightscard: [
    {
      name: 'SmartInsightsCard',
      props: [
        { prop: 'title', type: 'string', required: true, description: 'Insight card heading.' },
        { prop: 'insight', type: 'string', required: true, description: 'AI-generated insight text.' },
        { prop: 'confidence', type: 'number', description: 'Confidence score (0–1) shown as a progress indicator.' },
        { prop: 'actions', type: 'ReactNode', description: 'CTA buttons.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── AUTH ─────────────────────────────────────────────────────────────────

  accessiblehighcontrastmode: [
    {
      name: 'AccessibleHighContrastMode',
      props: [
        { prop: 'enabled', type: 'boolean', required: true, description: 'Controlled high-contrast state.' },
        { prop: 'onToggle', type: '(enabled: boolean) => void', required: true, description: 'Called when toggle changes.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  behavioralauthsimulator: [
    {
      name: 'BehavioralAuthSimulator',
      props: [
        { prop: 'onAuthResult', type: '(result: boolean) => void', required: true, description: 'Called with auth pass/fail result.' },
        { prop: 'sensitivity', type: 'number', default: '0.8', description: 'Detection sensitivity threshold (0–1).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  biometricprompt: [
    {
      name: 'BiometricPrompt',
      props: [
        { prop: 'type', type: "'faceId' | 'touchId' | 'fingerprint'", default: "'faceId'", description: 'Biometric method shown.' },
        { prop: 'onSuccess', type: '() => void', required: true, description: 'Called on successful authentication.' },
        { prop: 'onFailure', type: '() => void', description: 'Called on authentication failure.' },
        { prop: 'title', type: 'string', description: 'Prompt heading.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  identityverificationstep: [
    {
      name: 'IdentityVerificationStep',
      props: [
        { prop: 'step', type: "'document' | 'selfie' | 'review'", required: true, description: 'Current verification step.' },
        { prop: 'onComplete', type: '(data: VerificationData) => void', required: true, description: 'Called when step completes.' },
        { prop: 'onBack', type: '() => void', description: 'Navigates to the previous step.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  loginform: [
    {
      name: 'LoginForm',
      props: [
        { prop: 'onSubmit', type: '(data: { email: string; password: string }) => void', required: true, description: 'Called on form submission.' },
        { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading state on the submit button.' },
        { prop: 'error', type: 'string', description: 'Server-side error message.' },
        { prop: 'oauthProviders', type: "Array<{ name: string; icon: ReactNode; onClick: () => void }>", description: 'OAuth login options.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  permissionsmatrix: [
    {
      name: 'PermissionsMatrix',
      props: [
        { prop: 'roles', type: 'string[]', required: true, description: 'Role column headers.' },
        { prop: 'permissions', type: "Array<{ label: string; key: string }>", required: true, description: 'Permission row definitions.' },
        { prop: 'value', type: 'Record<string, string[]>', description: 'Controlled map of role → permission keys.' },
        { prop: 'onChange', type: '(value: Record<string, string[]>) => void', description: 'Fired on toggle.' },
        { prop: 'readOnly', type: 'boolean', default: 'false', description: 'Disables toggles.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  recoverycodedisplay: [
    {
      name: 'RecoveryCodeDisplay',
      props: [
        { prop: 'codes', type: 'string[]', required: true, description: 'Recovery code strings to display.' },
        { prop: 'onDownload', type: '() => void', description: 'Handler for download action.' },
        { prop: 'onCopyAll', type: '() => void', description: 'Handler for copy-all action.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  securityactivitylog: [
    {
      name: 'SecurityActivityLog',
      props: [
        { prop: 'events', type: "Array<{ type: string; description: string; timestamp: string; location?: string; device?: string }>", required: true, description: 'Security event log entries.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  securityotpinput: [
    {
      name: 'SecurityOTPInput',
      props: [
        { prop: 'length', type: 'number', default: '6', description: 'OTP length.' },
        { prop: 'onComplete', type: '(otp: string) => void', required: true, description: 'Called when all digits are entered.' },
        { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows verification loading state.' },
        { prop: 'error', type: 'string', description: 'Error message for invalid OTP.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  signupform: [
    {
      name: 'SignupForm',
      props: [
        { prop: 'onSubmit', type: '(data: SignupData) => void', required: true, description: 'Called on form submission.' },
        { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state.' },
        { prop: 'error', type: 'string', description: 'Server-side error message.' },
        { prop: 'fields', type: "Array<'name' | 'email' | 'password' | 'phone'>", description: 'Fields to render in the form.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  twofactorauth: [
    {
      name: 'TwoFactorAuth',
      props: [
        { prop: 'qrCodeUrl', type: 'string', description: 'QR code image URL for TOTP setup.' },
        { prop: 'secret', type: 'string', description: 'Manual entry secret key.' },
        { prop: 'onVerify', type: '(code: string) => void', required: true, description: 'Called with the entered OTP code.' },
        { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows verification loading state.' },
        { prop: 'error', type: 'string', description: 'Error message for invalid code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── COMMERCE ─────────────────────────────────────────────────────────────

  cartpreview: [
    {
      name: 'CartPreview',
      props: [
        { prop: 'items', type: "Array<{ id: string; name: string; price: number; quantity: number; image?: string }>", required: true, description: 'Cart line items.' },
        { prop: 'onRemove', type: '(id: string) => void', description: 'Called when an item is removed.' },
        { prop: 'onCheckout', type: '() => void', description: 'Checkout button handler.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  invoicepreview: [
    {
      name: 'InvoicePreview',
      props: [
        { prop: 'invoice', type: 'InvoiceData', required: true, description: 'Invoice object with line items, totals, and party info.' },
        { prop: 'onPrint', type: '() => void', description: 'Handler for print/download action.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  ordersummary: [
    {
      name: 'OrderSummary',
      props: [
        { prop: 'items', type: "Array<{ label: string; amount: number }>", required: true, description: 'Line items (subtotal, shipping, tax, etc.).' },
        { prop: 'total', type: 'number', required: true, description: 'Final total amount.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'onCheckout', type: '() => void', description: 'Checkout CTA handler.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  pricedisplay: [
    {
      name: 'PriceDisplay',
      props: [
        { prop: 'price', type: 'number', required: true, description: 'Current price.' },
        { prop: 'originalPrice', type: 'number', description: 'Original price — shows strikethrough when provided.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Text size preset.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  productcard: [
    {
      name: 'ProductCard',
      props: [
        { prop: 'name', type: 'string', required: true, description: 'Product name.' },
        { prop: 'price', type: 'number', required: true, description: 'Product price.' },
        { prop: 'image', type: 'string', description: 'Product image URL.' },
        { prop: 'rating', type: 'number', description: 'Average rating (0–5).' },
        { prop: 'badge', type: 'string', description: 'Promotional badge text (e.g. "New").' },
        { prop: 'onAddToCart', type: '() => void', description: 'Add-to-cart button handler.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  retailswapinterface: [
    {
      name: 'RetailSwapInterface',
      props: [
        { prop: 'products', type: "Array<{ id: string; name: string; image: string; price: number }>", required: true, description: 'Products available for swap selection.' },
        { prop: 'onSwap', type: '(fromId: string, toId: string) => void', required: true, description: 'Called when user confirms a swap.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── FINTECH ──────────────────────────────────────────────────────────────

  achtransactionsvisualizer: [
    {
      name: 'AchTransactionsVisualizer',
      props: [
        { prop: 'transactions', type: "Array<{ id: string; amount: number; status: 'pending' | 'completed' | 'failed'; date: string; description: string }>", required: true, description: 'ACH transaction list.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  bankaccountcard: [
    {
      name: 'BankAccountCard',
      props: [
        { prop: 'accountName', type: 'string', required: true, description: 'Account holder name.' },
        { prop: 'accountNumber', type: 'string', required: true, description: 'Account number (masked).' },
        { prop: 'balance', type: 'number', required: true, description: 'Current account balance.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'bankName', type: 'string', description: 'Bank institution name.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  cashbackwidget: [
    {
      name: 'CashbackWidget',
      props: [
        { prop: 'earned', type: 'number', required: true, description: 'Cashback earned so far.' },
        { prop: 'target', type: 'number', required: true, description: 'Cashback goal amount.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  creditlimitmanager: [
    {
      name: 'CreditLimitManager',
      props: [
        { prop: 'currentLimit', type: 'number', required: true, description: 'Current credit limit.' },
        { prop: 'used', type: 'number', required: true, description: 'Amount of credit used.' },
        { prop: 'onRequestIncrease', type: '() => void', description: 'Handler for increase request.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  creditscoresimulator: [
    {
      name: 'CreditScoreSimulator',
      props: [
        { prop: 'score', type: 'number', required: true, description: 'Current credit score (300–850).' },
        { prop: 'onSimulate', type: '(scenario: string) => void', description: 'Called when user selects a scenario.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  currencyconverterwidget: [
    {
      name: 'CurrencyConverterWidget',
      props: [
        { prop: 'rates', type: 'Record<string, number>', required: true, description: 'Exchange rates relative to a base currency.' },
        { prop: 'baseCurrency', type: 'string', default: "'USD'", description: 'Base currency code.' },
        { prop: 'onConvert', type: '(from: string, to: string, amount: number) => void', description: 'Called on conversion.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  earlypaymentdiscount: [
    {
      name: 'EarlyPaymentDiscount',
      props: [
        { prop: 'invoiceAmount', type: 'number', required: true, description: 'Full invoice amount.' },
        { prop: 'discountPercent', type: 'number', required: true, description: 'Early payment discount percentage.' },
        { prop: 'dueDate', type: 'string', required: true, description: 'Invoice due date (ISO string).' },
        { prop: 'onAccept', type: '() => void', description: 'Called when user accepts the early payment offer.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  expensecategorizer: [
    {
      name: 'ExpenseCategorizer',
      props: [
        { prop: 'expenses', type: "Array<{ id: string; description: string; amount: number; category?: string }>", required: true, description: 'Expense items to categorize.' },
        { prop: 'categories', type: 'string[]', required: true, description: 'Available category labels.' },
        { prop: 'onCategorize', type: '(id: string, category: string) => void', required: true, description: 'Called when expense is categorized.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  fairuselimittracker: [
    {
      name: 'FairUseLimitTracker',
      props: [
        { prop: 'used', type: 'number', required: true, description: 'Current usage amount.' },
        { prop: 'limit', type: 'number', required: true, description: 'Fair use limit.' },
        { prop: 'unit', type: 'string', default: "'GB'", description: 'Usage unit label.' },
        { prop: 'resetDate', type: 'string', description: 'Date when usage resets (ISO string).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  financialgoaltracker: [
    {
      name: 'FinancialGoalTracker',
      props: [
        { prop: 'goalName', type: 'string', required: true, description: 'Goal label (e.g. "Vacation fund").' },
        { prop: 'target', type: 'number', required: true, description: 'Goal target amount.' },
        { prop: 'saved', type: 'number', required: true, description: 'Amount saved so far.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'targetDate', type: 'string', description: 'Goal deadline (ISO string).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  fintechdashboardpreview: [
    {
      name: 'FintechDashboardPreview',
      props: [
        { prop: 'balance', type: 'number', description: 'Primary account balance.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'transactions', type: "Array<{ label: string; amount: number; date: string }>", description: 'Recent transactions.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  gamifiedrewardtier: [
    {
      name: 'GamifiedRewardTier',
      props: [
        { prop: 'tiers', type: "Array<{ name: string; threshold: number; badge?: string }>", required: true, description: 'Reward tier definitions.' },
        { prop: 'currentPoints', type: 'number', required: true, description: 'User current points.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  installmentsimulator: [
    {
      name: 'InstallmentSimulator',
      props: [
        { prop: 'principal', type: 'number', required: true, description: 'Loan principal amount.' },
        { prop: 'interestRate', type: 'number', required: true, description: 'Annual interest rate as percentage.' },
        { prop: 'onSimulate', type: '(months: number) => void', description: 'Called when user selects a term.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  interactivebillsplitter: [
    {
      name: 'InteractiveBillSplitter',
      props: [
        { prop: 'total', type: 'number', required: true, description: 'Total bill amount to split.' },
        { prop: 'participants', type: "Array<{ id: string; name: string; avatar?: string }>", required: true, description: 'People splitting the bill.' },
        { prop: 'onSplit', type: '(splits: Record<string, number>) => void', description: 'Called with final split amounts.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  multicurrencywallet: [
    {
      name: 'MultiCurrencyWallet',
      props: [
        { prop: 'balances', type: "Array<{ currency: string; amount: number; flag?: string }>", required: true, description: 'Currency balances.' },
        { prop: 'onConvert', type: '(from: string, to: string) => void', description: 'Called when user initiates conversion.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  paymentconfirmationmodal: [
    {
      name: 'PaymentConfirmationModal',
      props: [
        { prop: 'open', type: 'boolean', required: true, description: 'Controls modal visibility.' },
        { prop: 'amount', type: 'number', required: true, description: 'Payment amount.' },
        { prop: 'recipient', type: 'string', required: true, description: 'Recipient name.' },
        { prop: 'onConfirm', type: '() => void', required: true, description: 'Called when payment is confirmed.' },
        { prop: 'onCancel', type: '() => void', required: true, description: 'Called when cancelled.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'fee', type: 'number', description: 'Transaction fee.' },
      ],
    },
  ],

  paymentmethodselector: [
    {
      name: 'PaymentMethodSelector',
      props: [
        { prop: 'methods', type: "Array<{ id: string; type: 'card' | 'bank' | 'wallet'; label: string; last4?: string }>", required: true, description: 'Available payment methods.' },
        { prop: 'value', type: 'string', description: 'Controlled selected method id.' },
        { prop: 'onValueChange', type: '(id: string) => void', description: 'Fired on selection.' },
        { prop: 'onAddMethod', type: '() => void', description: 'Handler for "Add method" action.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  quicktransferbar: [
    {
      name: 'QuickTransferBar',
      props: [
        { prop: 'contacts', type: "Array<{ id: string; name: string; avatar?: string }>", required: true, description: 'Recent contacts for quick transfer.' },
        { prop: 'onSelect', type: '(contactId: string) => void', required: true, description: 'Called when a contact is selected.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  recurringinvestconfigurator: [
    {
      name: 'RecurringInvestConfigurator',
      props: [
        { prop: 'onSave', type: '(config: { amount: number; frequency: string; asset: string }) => void', required: true, description: 'Called when configuration is saved.' },
        { prop: 'assets', type: 'string[]', description: 'Available investment assets.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  roundupsavingstoggle: [
    {
      name: 'RoundUpSavingsToggle',
      props: [
        { prop: 'enabled', type: 'boolean', required: true, description: 'Controlled toggle state.' },
        { prop: 'onToggle', type: '(enabled: boolean) => void', required: true, description: 'Called on toggle.' },
        { prop: 'projectedMonthly', type: 'number', description: 'Estimated monthly round-up savings.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  socialpaymentfeed: [
    {
      name: 'SocialPaymentFeed',
      props: [
        { prop: 'events', type: "Array<{ id: string; sender: string; receiver: string; amount: number; note?: string; timestamp: string }>", required: true, description: 'Payment activity feed items.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  subscriptionmanager: [
    {
      name: 'SubscriptionManager',
      props: [
        { prop: 'plan', type: "{ name: string; price: number; features: string[]; billingCycle: 'monthly' | 'annual' }", required: true, description: 'Current subscription plan.' },
        { prop: 'plans', type: 'SubscriptionPlan[]', description: 'Available plans to upgrade/downgrade to.' },
        { prop: 'onChangePlan', type: '(planId: string) => void', description: 'Called when user selects a different plan.' },
        { prop: 'onCancel', type: '() => void', description: 'Called when user cancels subscription.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  transactionlist: [
    {
      name: 'TransactionList',
      props: [
        { prop: 'transactions', type: "Array<{ id: string; description: string; amount: number; date: string; type: 'credit' | 'debit'; category?: string }>", required: true, description: 'Transaction history items.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'onFilter', type: '(filters: TransactionFilter) => void', description: 'Called when filters change.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  transferform: [
    {
      name: 'TransferForm',
      props: [
        { prop: 'onSubmit', type: '(data: { recipient: string; amount: number; note?: string }) => void', required: true, description: 'Called on form submit.' },
        { prop: 'maxAmount', type: 'number', description: 'Maximum transferable amount (available balance).' },
        { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state on submit.' },
        { prop: 'currency', type: 'string', default: "'USD'", description: 'Currency code.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  virtualcardpreview: [
    {
      name: 'VirtualCardPreview',
      props: [
        { prop: 'cardNumber', type: 'string', required: true, description: 'Card number (masked or full).' },
        { prop: 'cardHolder', type: 'string', required: true, description: 'Cardholder name.' },
        { prop: 'expiryDate', type: 'string', required: true, description: 'Expiry date string.' },
        { prop: 'cvv', type: 'string', description: 'CVV (shown on card flip).' },
        { prop: 'network', type: "'visa' | 'mastercard' | 'amex'", description: 'Card network logo.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── COMMUNICATION ────────────────────────────────────────────────────────

  chatbubble: [
    {
      name: 'ChatBubble',
      props: [
        { prop: 'message', type: 'string', required: true, description: 'Message text content.' },
        { prop: 'sender', type: "'user' | 'other'", required: true, description: 'Aligns bubble left (other) or right (user).' },
        { prop: 'timestamp', type: 'string', description: 'Message timestamp.' },
        { prop: 'avatar', type: 'string', description: 'Avatar image URL for the sender.' },
        { prop: 'status', type: "'sent' | 'delivered' | 'read'", description: 'Delivery status indicator.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  chatinput: [
    {
      name: 'ChatInput',
      props: [
        { prop: 'onSend', type: '(message: string) => void', required: true, description: 'Called when user sends a message.' },
        { prop: 'placeholder', type: 'string', default: "'Type a message…'", description: 'Input placeholder.' },
        { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
        { prop: 'onAttach', type: '(files: File[]) => void', description: 'Called when files are attached.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  commentthread: [
    {
      name: 'CommentThread',
      props: [
        { prop: 'comments', type: "Array<{ id: string; author: string; avatar?: string; body: string; timestamp: string; replies?: Comment[] }>", required: true, description: 'Comment thread items.' },
        { prop: 'onReply', type: '(commentId: string, body: string) => void', description: 'Called when a reply is submitted.' },
        { prop: 'onLike', type: '(commentId: string) => void', description: 'Called when a comment is liked.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  messagereactions: [
    {
      name: 'MessageReactions',
      props: [
        { prop: 'reactions', type: "Array<{ emoji: string; count: number; reacted?: boolean }>", required: true, description: 'Available reactions with counts.' },
        { prop: 'onReact', type: '(emoji: string) => void', required: true, description: 'Called when user toggles a reaction.' },
        { prop: 'onAddReaction', type: '() => void', description: 'Opens the emoji picker.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  notificationcenterpanel: [
    {
      name: 'NotificationCenterPanel',
      props: [
        { prop: 'notifications', type: "Array<{ id: string; title: string; body: string; timestamp: string; read?: boolean; type?: string }>", required: true, description: 'Notification items.' },
        { prop: 'onMarkRead', type: '(id: string) => void', description: 'Called to mark a notification as read.' },
        { prop: 'onMarkAllRead', type: '() => void', description: 'Marks all notifications as read.' },
        { prop: 'onDismiss', type: '(id: string) => void', description: 'Removes a notification.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── SCHEDULING ───────────────────────────────────────────────────────────

  agendaview: [
    {
      name: 'AgendaView',
      props: [
        { prop: 'events', type: "Array<{ id: string; title: string; start: string; end: string; color?: string }>", required: true, description: 'Calendar events.' },
        { prop: 'date', type: 'Date', description: 'Focused date for the agenda view.' },
        { prop: 'onEventClick', type: '(event: AgendaEvent) => void', description: 'Called when an event is clicked.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  schedulertimeline: [
    {
      name: 'SchedulerTimeline',
      props: [
        { prop: 'events', type: "Array<{ id: string; title: string; start: string; end: string; resourceId?: string }>", required: true, description: 'Timeline events.' },
        { prop: 'resources', type: "Array<{ id: string; label: string }>", description: 'Resource rows (people, rooms, etc.).' },
        { prop: 'startHour', type: 'number', default: '8', description: 'First visible hour.' },
        { prop: 'endHour', type: 'number', default: '20', description: 'Last visible hour.' },
        { prop: 'onEventClick', type: '(event: TimelineEvent) => void', description: 'Called when an event is clicked.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  // ─── MISC ─────────────────────────────────────────────────────────────────

  activityfeed: [
    {
      name: 'ActivityFeed',
      props: [
        { prop: 'items', type: "Array<{ id: string; icon?: ReactNode; description: ReactNode; timestamp: string }>", required: true, description: 'Activity feed items.' },
        { prop: 'onLoadMore', type: '() => void', description: 'Loads older activity items.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  activitymonitor: [
    {
      name: 'ActivityMonitor',
      props: [
        { prop: 'processes', type: "Array<{ name: string; cpu: number; memory: number; status: 'running' | 'idle' | 'stopped' }>", required: true, description: 'Process list to monitor.' },
        { prop: 'refreshInterval', type: 'number', description: 'Auto-refresh interval in ms.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  addressselector: [
    {
      name: 'AddressSelector',
      props: [
        { prop: 'value', type: 'Address | null', description: 'Controlled selected address.' },
        { prop: 'onChange', type: '(address: Address) => void', required: true, description: 'Called when address is selected.' },
        { prop: 'addresses', type: 'Address[]', description: 'Pre-defined address list.' },
        { prop: 'allowManual', type: 'boolean', default: 'true', description: 'Allows manual address entry.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  cardsecuritycontrols: [
    {
      name: 'CardSecurityControls',
      props: [
        { prop: 'cardId', type: 'string', required: true, description: 'Card identifier.' },
        { prop: 'frozen', type: 'boolean', default: 'false', description: 'Card frozen state.' },
        { prop: 'onFreeze', type: '(frozen: boolean) => void', description: 'Called when freeze is toggled.' },
        { prop: 'onReportLost', type: '() => void', description: 'Called when "Report lost" is triggered.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  contextualtrust: [
    {
      name: 'ContextualTrustBadge',
      props: [
        { prop: 'level', type: "'verified' | 'trusted' | 'unverified'", required: true, description: 'Trust level of the entity.' },
        { prop: 'label', type: 'string', description: 'Custom badge label.' },
        { prop: 'tooltip', type: 'string', description: 'Explanation shown in a tooltip.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  devicelist: [
    {
      name: 'DeviceList',
      props: [
        { prop: 'devices', type: "Array<{ id: string; name: string; type: string; lastSeen: string; current?: boolean }>", required: true, description: 'Connected device list.' },
        { prop: 'onRevoke', type: '(deviceId: string) => void', description: 'Called to revoke a device session.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  fileintelligencepreview: [
    {
      name: 'FileIntelligencePreview',
      props: [
        { prop: 'file', type: '{ name: string; type: string; size: number; url?: string }', required: true, description: 'File metadata to preview.' },
        { prop: 'insights', type: 'string[]', description: 'AI-generated insights about the file.' },
        { prop: 'onDownload', type: '() => void', description: 'Download handler.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  microcommitmentstopper: [
    {
      name: 'MicroCommitmentStepper',
      props: [
        { prop: 'steps', type: "Array<{ question: string; options: string[] }>", required: true, description: 'Sequential micro-commitment steps.' },
        { prop: 'onComplete', type: '(answers: string[]) => void', required: true, description: 'Called when all steps are answered.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  progressivedisclosurepanel: [
    {
      name: 'ProgressiveDisclosurePanel',
      props: [
        { prop: 'summary', type: 'ReactNode', required: true, description: 'Always-visible summary content.' },
        { prop: 'details', type: 'ReactNode', required: true, description: 'Hidden detail content revealed on expand.' },
        { prop: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Initial expanded state.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  slidetodelete: [
    {
      name: 'SlideToDelete',
      props: [
        { prop: 'children', type: 'ReactNode', required: true, description: 'List item content.' },
        { prop: 'onDelete', type: '() => void', required: true, description: 'Called when delete is confirmed via slide.' },
        { prop: 'threshold', type: 'number', default: '0.5', description: 'Slide fraction required to trigger delete (0–1).' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],

  voicecommandoverlay: [
    {
      name: 'VoiceCommandOverlay',
      props: [
        { prop: 'active', type: 'boolean', required: true, description: 'Shows the listening overlay.' },
        { prop: 'onCommand', type: '(transcript: string) => void', required: true, description: 'Called with recognized speech text.' },
        { prop: 'onClose', type: '() => void', required: true, description: 'Closes the overlay.' },
        { prop: 'placeholder', type: 'string', default: "'Listening…'", description: 'Label shown while listening.' },
        { prop: 'className', type: 'string', description: 'Additional Tailwind classes.' },
      ],
    },
  ],
}

function ComponentApiReference({ componentName }: { componentName: string }) {
  const tables = API_REFERENCE[componentName]

  if (!tables) {
    return (
      <div className="rounded-lg border border-border-primary overflow-hidden">
        <div className="p-4 bg-surface-secondary border-b border-border-primary">
          <Text weight="medium" variant="small">Component Props</Text>
        </div>
        <div className="p-4">
          <Text variant="small" color="secondary">
            Refer to the component source file and <code className="text-xs font-mono">.types.ts</code> for detailed prop specifications.
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tables.map((table) => (
        <ApiReferenceTable key={table.name} table={table} />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
//  EXTENDED DOCUMENTATION SYSTEM
// ─────────────────────────────────────────────

interface AnatomyPart {
  name: string
  description: string
}

interface DosDontsEntry {
  dos: string[]
  donts: string[]
}

interface VariantEntry {
  name: string
  description: string
}

interface ComponentDoc {
  anatomy?: AnatomyPart[]
  dosdonts?: DosDontsEntry
  variants?: VariantEntry[]
}

function AnatomySection({ parts }: { parts: AnatomyPart[] }) {
  return (
    <div className="space-y-3">
      {parts.map((part, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="mt-1 w-2 h-2 rounded-full bg-accent-primary flex-shrink-0" />
          <div>
            <span className="text-sm font-medium text-text-primary">{part.name}</span>
            <span className="text-sm text-text-secondary ml-2">— {part.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DosDontsSection({ entry }: { entry: DosDontsEntry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border border-status-success/30 bg-status-success/5 p-4 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded-full bg-status-success flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-status-success">Do</span>
        </div>
        <ul className="space-y-1.5">
          {entry.dos.map((item, i) => (
            <li key={i} className="text-sm text-text-secondary flex gap-2">
              <span className="text-status-success mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-status-error/30 bg-status-error/5 p-4 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded-full bg-status-error flex items-center justify-center">
            <X className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-status-error">Don't</span>
        </div>
        <ul className="space-y-1.5">
          {entry.donts.map((item, i) => (
            <li key={i} className="text-sm text-text-secondary flex gap-2">
              <span className="text-status-error mt-0.5 flex-shrink-0">✗</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function VariantsSection({ variants }: { variants: VariantEntry[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {variants.map((v, i) => (
        <div key={i} className="rounded-lg border border-border-primary p-4">
          <div className="text-sm font-medium text-text-primary mb-1">{v.name}</div>
          <div className="text-sm text-text-secondary">{v.description}</div>
        </div>
      ))}
    </div>
  )
}

const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  button: {
    anatomy: [
      { name: 'Root', description: 'The <button> element — handles click, focus, disabled, and aria states.' },
      { name: 'Left Icon', description: 'Optional slot rendered before the label (leftIcon prop).' },
      { name: 'Label', description: 'The children content — the button text.' },
      { name: 'Right Icon', description: 'Optional slot rendered after the label (rightIcon prop).' },
      { name: 'Spinner', description: 'Animated indicator that replaces the label when loading={true}.' },
    ],
    dosdonts: {
      dos: [
        'Use a single primary button per section to establish clear hierarchy.',
        'Provide aria-label on icon-only buttons.',
        'Use loading={true} to prevent double-submits on async actions.',
        'Match button size to surrounding context (sm for dense UIs, lg for CTAs).',
      ],
      donts: [
        'Don\'t place two primary buttons side by side — use primary + secondary.',
        'Don\'t disable without explaining why (use helperText or tooltips).',
        'Don\'t use ghost variant for the most important action on a page.',
        'Don\'t rely on color alone to communicate state — pair with text.',
      ],
    },
    variants: [
      { name: 'primary', description: 'High-emphasis — for the single most important action. Use once per section.' },
      { name: 'secondary', description: 'Medium-emphasis — for complementary actions alongside a primary.' },
      { name: 'outline', description: 'Low-emphasis with a visible border — good for neutral or reversible actions.' },
      { name: 'ghost', description: 'Minimal — blends with the background, ideal for toolbars and icon buttons.' },
      { name: 'subtle', description: 'Tinted background without border — softer than outline, more visible than ghost.' },
      { name: 'destructive', description: 'Red-tinted — signals irreversible or dangerous actions (delete, revoke).' },
    ],
  },

  input: {
    anatomy: [
      { name: 'Label', description: 'Floats above the field — tied to the input via htmlFor.' },
      { name: 'Left Icon', description: 'Decorative or semantic icon inside the left edge.' },
      { name: 'Field', description: 'The native <input> element — accepts all standard HTML input attributes.' },
      { name: 'Right Icon', description: 'Action icon (clear, toggle visibility) inside the right edge.' },
      { name: 'Helper / Error Text', description: 'Shown below — switches from helper to error message when error prop is set.' },
    ],
    dosdonts: {
      dos: [
        'Always provide a label — do not rely on placeholder as the only label.',
        'Use helperText to explain format requirements (e.g. "Use your company email").',
        'Use error prop after validation — not on every keystroke.',
        'Group related inputs and maintain consistent sizing.',
      ],
      donts: [
        'Don\'t remove the label for a "cleaner" look — it breaks accessibility.',
        'Don\'t show red error state until the user has interacted with the field.',
        'Don\'t use placeholder for critical instructions — it disappears on focus.',
        'Don\'t use different input sizes in the same form.',
      ],
    },
    variants: [
      { name: 'default (text)', description: 'Standard single-line text input.' },
      { name: 'error state', description: 'Red border + error message when validation fails.' },
      { name: 'disabled', description: 'Grayed out — prevents any interaction.' },
      { name: 'with icons', description: 'Left and/or right icon slots for context and actions.' },
      { name: 'sm / md / lg', description: 'Three height presets controlled by inputSize prop.' },
    ],
  },

  card: {
    anatomy: [
      { name: 'Card', description: 'Root surface — sets variant, padding, and hover animation.' },
      { name: 'CardHeader', description: 'Top zone — conventionally holds CardTitle and CardDescription.' },
      { name: 'CardTitle', description: 'Renders as an <h3> — semantic heading inside the card.' },
      { name: 'CardDescription', description: 'Secondary text below the title — muted color.' },
      { name: 'CardContent', description: 'Primary body area — the main card content lives here.' },
      { name: 'CardFooter', description: 'Bottom zone — typically action buttons or metadata.' },
    ],
    dosdonts: {
      dos: [
        'Use CardHeader + CardTitle to give every card a clear purpose.',
        'Use hoverable only for cards that are clickable or navigable.',
        'Keep padding consistent across all cards in a grid.',
        'Use glass variant for floating overlays over imagery.',
      ],
      donts: [
        'Don\'t nest cards inside other cards — it creates confusing depth.',
        'Don\'t use hoverable on static informational cards.',
        'Don\'t use flat variant in dark backgrounds — it loses definition.',
        'Don\'t skip CardHeader on complex cards — content becomes hard to scan.',
      ],
    },
    variants: [
      { name: 'elevated', description: 'Default — subtle shadow lifts the card off the surface.' },
      { name: 'glass', description: 'Frosted glass effect with backdrop blur — best over imagery.' },
      { name: 'outlined', description: 'Border only, no shadow — flat and minimal.' },
      { name: 'flat', description: 'No shadow or border — blends into the surface.' },
    ],
  },

  alert: {
    anatomy: [
      { name: 'Alert', description: 'Root container — sets role="alert", variant color, and auto-selected icon.' },
      { name: 'Auto Icon', description: 'Rendered automatically based on variant (info, warning, success, destructive).' },
      { name: 'AlertTitle', description: 'Renders as <h5> — the bold heading of the alert.' },
      { name: 'AlertDescription', description: 'Secondary body text — provides more context.' },
    ],
    dosdonts: {
      dos: [
        'Use destructive for errors that block the user\'s workflow.',
        'Use info for neutral system messages and tips.',
        'Always pair AlertTitle with AlertDescription for complex messages.',
        'Place alerts near the content they relate to, not only at page top.',
      ],
      donts: [
        'Don\'t use alerts for every validation message — use input-level errors instead.',
        'Don\'t show multiple alerts of the same type simultaneously.',
        'Don\'t animate alerts in on every re-render — it causes distraction.',
        'Don\'t use warning for errors — reserve warning for preventable issues.',
      ],
    },
    variants: [
      { name: 'default', description: 'Neutral — informational messages without urgency.' },
      { name: 'destructive', description: 'Red — blocking errors that require immediate action.' },
      { name: 'success', description: 'Green — confirmation that an action succeeded.' },
      { name: 'warning', description: 'Yellow — caution; action is possible but risky.' },
      { name: 'info', description: 'Blue — contextual information or tips.' },
    ],
  },

  accordion: {
    anatomy: [
      { name: 'Accordion', description: 'Root — manages open state context (single or multiple).' },
      { name: 'AccordionItem', description: 'Individual collapsible section — holds trigger and content.' },
      { name: 'AccordionTrigger', description: 'Clickable header with auto-rotating chevron icon.' },
      { name: 'AccordionContent', description: 'Animated panel — collapses to height 0 when closed.' },
    ],
    dosdonts: {
      dos: [
        'Use type="single" when only one section should be readable at a time.',
        'Use type="multiple" for independent sections like FAQ items.',
        'Give each AccordionTrigger a clear, scannable label.',
        'Use separated variant to visually isolate important sections.',
      ],
      donts: [
        'Don\'t nest accordions inside accordion content — it creates disorientation.',
        'Don\'t hide critical information in accordions that must always be visible.',
        'Don\'t use accordion for very short content — a simple list is clearer.',
        'Don\'t label triggers with generic text like "Click here".',
      ],
    },
    variants: [
      { name: 'default', description: 'Flush — items share a single border at the bottom.' },
      { name: 'bordered', description: 'Each item has its own full border box.' },
      { name: 'separated', description: 'Items have gap between them — works as standalone cards.' },
    ],
  },

  tabs: {
    anatomy: [
      { name: 'Tabs', description: 'Root context provider — manages active tab state.' },
      { name: 'TabsList', description: 'Navigation strip — renders tab triggers in a row.' },
      { name: 'TabsTrigger', description: 'Individual tab button — sets active value on click.' },
      { name: 'TabsContent', description: 'Content panel — shown only when its value matches the active tab.' },
    ],
    dosdonts: {
      dos: [
        'Use default variant for content-heavy interfaces (documentation, settings).',
        'Use segmented variant for switching between two to four views.',
        'Keep tab labels short — one or two words maximum.',
        'Ensure TabsContent panels have consistent minimum height.',
      ],
      donts: [
        'Don\'t use tabs for sequential steps — use a Stepper instead.',
        'Don\'t use tabs for more than 7 items — use navigation or a dropdown.',
        'Don\'t hide required content in tabs that users might not visit.',
        'Don\'t mix segmented and default variants in the same layout.',
      ],
    },
    variants: [
      { name: 'default', description: 'Underline indicator — classic tab strip anchored to a bottom border.' },
      { name: 'segmented', description: 'Pill background — iOS-style selector for mutually exclusive views.' },
    ],
  },

  avatar: {
    anatomy: [
      { name: 'Avatar', description: 'Root — controls size, shape, and exposes image-load state via context.' },
      { name: 'AvatarImage', description: 'Renders the user photo — falls back to AvatarFallback on error.' },
      { name: 'AvatarFallback', description: 'Shown while the image loads or when it fails — initials or icon.' },
    ],
    dosdonts: {
      dos: [
        'Always provide AvatarFallback with meaningful initials.',
        'Use AvatarGroup when displaying 3–10 users in a compact space.',
        'Use consistent sizes within the same UI region.',
        'Provide descriptive alt text on AvatarImage for screen readers.',
      ],
      donts: [
        'Don\'t use avatars without a fallback — images always fail sometimes.',
        'Don\'t mix circle and square shapes in the same list.',
        'Don\'t use 2xl avatars in dense data tables — use xs or sm.',
        'Don\'t use avatars as decoration without meaningful content nearby.',
      ],
    },
    variants: [
      { name: 'circle (default)', description: 'Standard rounded-full shape — default for people.' },
      { name: 'square', description: 'Rounded rectangle — good for organization or product avatars.' },
      { name: 'xs / sm / md / lg / xl / 2xl', description: 'Six size presets from 24px to 96px.' },
    ],
  },

  modal: {
    anatomy: [
      { name: 'Backdrop', description: 'Full-screen overlay — traps focus and dismisses on click.' },
      { name: 'Panel', description: 'The modal container — centers on screen with max-width from size prop.' },
      { name: 'Header', description: 'Title bar — rendered when title prop is provided.' },
      { name: 'Body (children)', description: 'Main content area — any React content passed as children.' },
      { name: 'Footer', description: 'Action button area — rendered when footer prop is provided.' },
      { name: 'Close Button', description: 'X button in the header corner — calls onClose on click.' },
    ],
    dosdonts: {
      dos: [
        'Use for tasks that need full focus — forms, confirmations, detail views.',
        'Provide a title so users know what the modal is about immediately.',
        'Put primary action in the footer — keep body for content only.',
        'Allow Escape key to close — always wire onClose to keyboard events.',
      ],
      donts: [
        'Don\'t open modals from other modals — use ModalStackManager instead.',
        'Don\'t use modals for non-critical notifications — use Toast or Snackbar.',
        'Don\'t make modal body full-page length — keep content scannable.',
        'Don\'t remove the close button — users expect to escape.',
      ],
    },
    variants: [
      { name: 'sm', description: '480px max-width — for simple confirmations or compact forms.' },
      { name: 'md (default)', description: '640px max-width — general purpose.' },
      { name: 'lg', description: '800px max-width — rich forms or detail views.' },
      { name: 'xl', description: '1024px max-width — dashboards or side-by-side layouts.' },
      { name: 'full', description: 'Fills the entire viewport — immersive experiences.' },
    ],
  },

  toast: {
    anatomy: [
      { name: 'ToastProvider', description: 'Wraps the app — creates the viewport context.' },
      { name: 'ToastViewport', description: 'Fixed overlay container — toasts portal into this element.' },
      { name: 'Toast', description: 'Individual notification — manages open state, auto-dismiss timer.' },
      { name: 'ToastTitle', description: 'Bold heading — the primary message.' },
      { name: 'ToastDescription', description: 'Secondary body text — additional context.' },
      { name: 'ToastAction', description: 'Optional action button (e.g. Undo, View).' },
      { name: 'ToastClose', description: 'X button — calls close() from ToastItemContext.' },
    ],
    dosdonts: {
      dos: [
        'Use for transient confirmations — "Saved", "Copied", "Sent".',
        'Keep messages short — one sentence maximum.',
        'Use role="alert" for errors (assertive live region).',
        'Provide a ToastAction only when the action is immediately relevant.',
      ],
      donts: [
        'Don\'t use toasts for errors that block the workflow — use Alert or Modal.',
        'Don\'t stack more than 3 toasts at once — it overwhelms users.',
        'Don\'t set duration={Infinity} unless the toast has a manual dismiss.',
        'Don\'t put forms or complex content inside a toast.',
      ],
    },
    variants: [
      { name: 'default', description: 'Glass surface with primary text — neutral informational.' },
      { name: 'destructive', description: 'Red background — for errors or destructive action confirmation.' },
      { name: 'success', description: 'Green-tinted — for successful operation confirmation.' },
    ],
  },

  select: {
    anatomy: [
      { name: 'Trigger', description: 'The visible select button — shows selected value or placeholder.' },
      { name: 'Dropdown Panel', description: 'Floating list — appears below (or above) the trigger.' },
      { name: 'SelectItem', description: 'Individual option row — rendered as children.' },
      { name: 'Label', description: 'Optional field label above the trigger.' },
      { name: 'Error Text', description: 'Validation message shown below the trigger.' },
    ],
    dosdonts: {
      dos: [
        'Use when there are 5+ options — fewer options should use RadioGroup.',
        'Provide a meaningful placeholder (e.g. "Select country").',
        'Group related options using option groups when list is long.',
        'Use label prop — never rely on placeholder alone for accessibility.',
      ],
      donts: [
        'Don\'t use select for binary yes/no — use a Switch or Checkbox instead.',
        'Don\'t list more than 50 options without search — use Combobox.',
        'Don\'t use disabled options without explaining why.',
        'Don\'t use select inside popovers — floating elements stack poorly.',
      ],
    },
    variants: [
      { name: 'default', description: 'Standard dropdown with full list of SelectItem children.' },
      { name: 'error state', description: 'Red trigger border + error message when validation fails.' },
      { name: 'disabled', description: 'Grayed out — no interaction possible.' },
    ],
  },

  badge: {
    anatomy: [
      { name: 'Root', description: 'A <span> — small pill shape with color and text.' },
    ],
    dosdonts: {
      dos: [
        'Use badges to label statuses, categories, or counts.',
        'Keep badge text to 1–2 words or a small number.',
        'Use color variants consistently: green = success, red = error, etc.',
        'Place badges next to the content they describe.',
      ],
      donts: [
        'Don\'t use badges as interactive buttons — use Chip instead.',
        'Don\'t use long sentences inside a badge.',
        'Don\'t use more than 3 different badge colors in the same view.',
        'Don\'t use badges purely for decoration without semantic meaning.',
      ],
    },
    variants: [
      { name: 'default', description: 'Neutral gray — for generic labels and categories.' },
      { name: 'primary', description: 'Brand color — for highlighted or selected states.' },
      { name: 'success', description: 'Green — for completed, active, or verified states.' },
      { name: 'warning', description: 'Yellow/orange — for pending or needs-attention states.' },
      { name: 'error', description: 'Red — for failed, blocked, or critical states.' },
      { name: 'info', description: 'Blue — for informational or in-progress states.' },
    ],
  },

  checkbox: {
    anatomy: [
      { name: 'Indicator', description: 'The visible checkbox square — shows check, minus, or empty.' },
      { name: 'Label', description: 'Text next to the checkbox — associated via id/htmlFor.' },
    ],
    dosdonts: {
      dos: [
        'Use for multiple independent boolean selections.',
        'Use indeterminate state for "select all" when some items are checked.',
        'Always associate a label — do not leave unlabeled checkboxes.',
        'Group related checkboxes under a visible group heading.',
      ],
      donts: [
        'Don\'t use checkboxes for mutually exclusive choices — use RadioGroup.',
        'Don\'t use a single checkbox for a required selection — use a required toggle.',
        'Don\'t disable without explanation — users won\'t know why.',
        'Don\'t place checkboxes in a horizontal row if labels are long.',
      ],
    },
    variants: [
      { name: 'unchecked', description: 'Default empty state.' },
      { name: 'checked', description: 'Filled with checkmark.' },
      { name: 'indeterminate', description: 'Mixed state — partial selection of a group.' },
      { name: 'disabled', description: 'Grayed out — read-only.' },
    ],
  },

  switch: {
    anatomy: [
      { name: 'Track', description: 'The background pill — changes color when toggled.' },
      { name: 'Thumb', description: 'The sliding circle — animates left/right.' },
      { name: 'Label', description: 'Descriptive text next to the toggle.' },
      { name: 'Description', description: 'Helper text below the label.' },
    ],
    dosdonts: {
      dos: [
        'Use for settings that take immediate effect without a "Save" button.',
        'Provide a label that describes the on state (e.g. "Notifications enabled").',
        'Use sm size in dense settings lists, md/lg for prominent settings.',
        'Pair with a description when the implication isn\'t obvious.',
      ],
      donts: [
        'Don\'t require a "Save" click after toggling — it breaks the mental model.',
        'Don\'t use switch for multi-step decisions — use a Modal confirm.',
        'Don\'t use for irreversible destructive actions — use ConfirmDialog.',
        'Don\'t label both on and off states — keep one clear label.',
      ],
    },
    variants: [
      { name: 'sm', description: 'Compact — for dense settings panels.' },
      { name: 'md (default)', description: 'Standard — general purpose.' },
      { name: 'lg', description: 'Prominent — for key setting toggles.' },
      { name: 'disabled', description: 'Locked — prevents interaction.' },
    ],
  },

  tooltip: {
    anatomy: [
      { name: 'Trigger', description: 'The wrapped element — tooltip appears on hover or focus.' },
      { name: 'Content Bubble', description: 'Floating panel — renders the content prop.' },
      { name: 'Arrow', description: 'Pointer pointing to the trigger element.' },
    ],
    dosdonts: {
      dos: [
        'Use to clarify icon-only buttons with a text label.',
        'Use for supplementary information — never for required content.',
        'Ensure tooltip content is reachable via keyboard (focus trigger).',
        'Keep tooltip text concise — one or two lines maximum.',
      ],
      donts: [
        'Don\'t put interactive elements (buttons, links) inside tooltips.',
        'Don\'t use tooltips on mobile — they have no hover state.',
        'Don\'t repeat information that\'s already visible nearby.',
        'Don\'t use tooltips for error messages — use input-level errors.',
      ],
    },
    variants: [
      { name: 'top (default)', description: 'Appears above the trigger.' },
      { name: 'bottom', description: 'Appears below the trigger.' },
      { name: 'left', description: 'Appears to the left.' },
      { name: 'right', description: 'Appears to the right.' },
    ],
  },
}

function ComponentDocSections({ componentName }: { componentName: string }) {
  const doc = COMPONENT_DOCS[componentName]
  if (!doc) return null

  return (
    <>
      {doc.anatomy && (
        <div className="space-y-4 border-t border-border-primary pt-8">
          <div>
            <Title id={`doc-${componentName}-anatomy`} level={3} className="mb-1">Anatomy</Title>
            <Text color="secondary">Internal parts that make up this component.</Text>
          </div>
          <AnatomySection parts={doc.anatomy} />
        </div>
      )}

      {doc.dosdonts && (
        <div className="space-y-4 border-t border-border-primary pt-8">
          <div>
            <Title id={`doc-${componentName}-when-to-use`} level={3} className="mb-1">When to use</Title>
            <Text color="secondary">Guidelines for correct and incorrect usage.</Text>
          </div>
          <DosDontsSection entry={doc.dosdonts} />
        </div>
      )}

      {doc.variants && (
        <div className="space-y-4 border-t border-border-primary pt-8">
          <div>
            <Title id={`doc-${componentName}-variants`} level={3} className="mb-1">Variants & States</Title>
            <Text color="secondary">Available visual variants and behavioral states.</Text>
          </div>
          <VariantsSection variants={doc.variants} />
        </div>
      )}
    </>
  )
}

export default function ComponentDetailPageV2() {
  const { componentName } = useParams<{ componentName: string }>()
  const navigate = useNavigate()

  if (!componentName) {
    return <div>Component not found</div>
  }

  const component = ALL_COMPONENTS.find(
    (c) => c.name.toLowerCase() === componentName.toLowerCase()
  )

  if (!component) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/components')}
          className="gap-2"
        >
          <ChevronLeft size={16} />
          Back to Components
        </Button>
        <Title level={2} id="component-not-found">Component not found</Title>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
       {/* HEADER */}
      <div className="space-y-4 mt-4">
        {/* Breadcrumb - clickable and navigable */}
        <div className="text-sm text-text-secondary flex items-center gap-2">
          <button
            onClick={() => navigate('/components')}
            className="hover:text-text-primary transition-colors cursor-pointer"
          >
            Components
          </button>
          <span className="text-text-tertiary">/</span>
          <button
            onClick={() => {
              const category = findComponentCategory(component.name)
              navigate(`/components?category=${category}`)
            }}
            className="hover:text-text-primary transition-colors cursor-pointer"
          >
            {findComponentCategory(component.name)}
          </button>
          <span className="text-text-tertiary">/</span>
          <span className="text-text-primary font-medium">{component.name}</span>
        </div>

        <div className="space-y-2">
          <Title level={2}>{component.name}</Title>
          <Text color="secondary" className="text-base">{component.description}</Text>
        </div>

        {/* QUICK INSTALL */}
        <div className="mt-6 rounded-lg border border-border-primary/50 overflow-hidden">
          <div className="flex items-start gap-4 px-4 py-3 border-b border-border-primary/40">
            <span className="text-[10px] font-mono font-medium text-text-tertiary bg-surface-secondary px-1.5 py-0.5 rounded shrink-0 mt-0.5 tracking-wide uppercase">
              init
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-tertiary mb-1.5">Configure your project once — installs dependencies and sets up Tailwind CSS.</p>
              <CopyCommand command="npx @smart-coder-labs/apple-design-system init" />
            </div>
          </div>
          <div className="flex items-start gap-4 px-4 py-3">
            <span className="text-[10px] font-mono font-medium text-text-tertiary bg-surface-secondary px-1.5 py-0.5 rounded shrink-0 mt-0.5 tracking-wide uppercase">
              add
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-tertiary mb-1.5">Add this component — downloads the latest source directly into your project.</p>
              <CopyCommand command={`npx @smart-coder-labs/apple-design-system add ${component.name}`} />
            </div>
          </div>
        </div>
      </div>

      {/* ANATOMY / DOS & DON'TS / VARIANTS */}
      <ComponentDocSections componentName={component.name.toLowerCase()} />

      {/* EXAMPLES SECTION */}
      <div className="space-y-8 border-t border-border-primary pt-8">
        <div>
          <Title id={generateHeadingId(component.name, 'Examples')} level={3} className="mb-1">Code Integration</Title>
          <Text color="secondary">Copy-paste ready examples with interactive previews.</Text>
        </div>

        {/* Render component-specific examples */}
        <ComponentExamples componentName={component.name.toLowerCase()} />
      </div>

      {/* API REFERENCE SECTION */}
      <div className="space-y-6 border-t border-border-primary pt-8">
        <div>
          <Title id={generateHeadingId(component.name, 'API Reference')} level={3} className="mb-1">API Reference</Title>
          <Text color="secondary">Full prop tables for every exported part of this component.</Text>
        </div>
        <ComponentApiReference componentName={component.name.toLowerCase()} />
      </div>
    </motion.div>
  )
}

// Component examples based on component name
function ComponentExamples({ componentName }: { componentName: string }) {
  const examples: Record<string, React.ReactNode> = {
    // Original examples
    button: <ButtonExamples />,
    input: <InputExamples />,
    switch: <SwitchExamples />,
    card: <CardExamples />,
    badge: <BadgeExamples />,
    alert: <AlertExamples />,
    tabs: <TabsExamples />,
    // High-value component examples
    checkbox: <CheckboxExamples />,
    radiogroup: <RadioGroupExamples />,
    divider: <DividerExamples />,
    spacer: <SpacerExamples />,
    spinner: <SpinnerExamples />,
    skeleton: <SkeletonExamples />,
    blockquote: <BlockquoteExamples />,
    heading: <HeadingExamples />,
    paragraph: <ParagraphExamples />,
    label: <LabelExamples />,
    textarea: <TextareaExamples />,
    accordion: <AccordionExamples />,
    avatar: <AvatarExamples />,
    avatargroup: <AvatarGroupExamples />,
    chip: <ChipExamples />,
    tag: <TagExamples />,
    tagsinput: <TagsInputExamples />,
    callout: <CalloutExamples />,
    emptystate: <EmptyStateExamples />,
    collapsible: <CollapsibleExamples />,
    slider: <SliderExamples />,
    rangeslider: <RangeSliderExamples />,
    calendar: <CalendarExamples />,
    stepper: <StepperExamples />,
    scrollarea: <ScrollAreaExamples />,
    toast: <ToastExamples />,
    snackbar: <SnackbarExamples />,
    table: <TableExamples />,
    tooltip: <TooltipExamples />,
    popover: <PopoverExamples />,
    modal: <ModalExamples />,
    sheet: <SheetExamples />,
    confirmdialog: <ConfirmDialogExamples />,
    select: <SelectExamples />,
    combobox: <ComboboxExamples />,
    searchinput: <SearchInputExamples />,
    datepicker: <DatePickerExamples />,
    timepicker: <TimePickerExamples />,
    // Previously defaulted, now have real examples
    progress: <ProgressExamples />,
    caption: <CaptionExamples />,
    // Inputs
    buttonwithdropdown: <ButtonWithDropdownExamples />,
    controlcentertoggles: <ControlCenterTogglesExamples />,
    daterangepicker: <DateRangePickerExamples />,
    fab: <FABExamples />,
    fabgroup: <FABGroupExamples />,
    hapticbutton: <HapticButtonExamples />,
    iconbutton: <IconButtonExamples />,
    otpinput: <OTPInputExamples />,
    passwordinput: <PasswordInputExamples />,
    peertaginput: <PeerTagInputExamples />,
    quantityselector: <QuantitySelectorExamples />,
    ratinginput: <RatingInputExamples />,
    rotaryselector: <RotarySelectorExamples />,
    segmentedinput: <SegmentedInputExamples />,
    signaturepad: <SignaturePadExamples />,
    splitbutton: <SplitButtonExamples />,
    // Layout
    footer: <FooterExamples />,
    gridsystem: <GridSystemExamples />,
    layout: <LayoutExamples />,
    masonrylayout: <MasonryLayoutExamples />,
    panel: <PanelExamples />,
    resizablepanel: <ResizablePanelExamples />,
    sidebar: <SidebarExamples />,
    splitview: <SplitViewExamples />,
    stickycontainer: <StickyContainerExamples />,
    windowcontrols: <WindowControlsExamples />,
    windowframe: <WindowFrameExamples />,
    // Typography
    definitionlist: <DefinitionListExamples />,
    descriptionblock: <DescriptionBlockExamples />,
    keyvalueinfo: <KeyValueInfoExamples />,
    propertylist: <PropertyListExamples />,
    sectionheader: <SectionHeaderExamples />,
    text: <TextExamples />,
    title: <TitleExamples />,
    // Navigation
    bottomnavigation: <BottomNavigationExamples />,
    breadcrumb: <BreadcrumbExamples />,
    breadcrumbtabshybrid: <BreadcrumbTabsHybridExamples />,
    commandmenu: <CommandMenuExamples />,
    contextmenu: <ContextMenuExamples />,
    dockbar: <DockBarExamples />,
    hamburgermenuicon: <HamburgerMenuIconExamples />,
    menubar: <MenuBarExamples />,
    navbar: <NavBarExamples />,
    navigationdrawer: <NavigationDrawerExamples />,
    pagination: <PaginationExamples />,
    topactionbar: <TopActionBarExamples />,
    // Feedback
    errorboundary: <ErrorBoundaryExamples />,
    jargontooltip: <JargonTooltipExamples />,
    loadingoverlay: <LoadingOverlayExamples />,
    maintenancemode: <MaintenanceModeExamples />,
    modalstackmanager: <ModalStackManagerExamples />,
    offlinestate: <OfflineStateExamples />,
    // Data
    codeblock: <CodeBlockExamples />,
    datagrid: <DataGridExamples />,
    diffviewer: <DiffViewerExamples />,
    filterbar: <FilterBarExamples />,
    gallery: <GalleryExamples />,
    imagecarousel: <ImageCarouselExamples />,
    inspectorpanel: <InspectorPanelExamples />,
    jsonviewer: <JsonViewerExamples />,
    kanbanboard: <KanbanBoardExamples />,
    lightbox: <LightboxExamples />,
    querybuilder: <QueryBuilderExamples />,
    reviews: <ReviewsExamples />,
    timeline: <TimelineExamples />,
    treeview: <TreeViewExamples />,
    // Media
    audioplayer: <AudioPlayerExamples />,
    barcodegenerator: <BarcodeGeneratorExamples />,
    comicpanel: <ComicPanelExamples />,
    docscanoverlay: <DocScanOverlayExamples />,
    fileupload: <FileUploadExamples />,
    imagecropper: <ImageCropperExamples />,
    markdowneditor: <MarkdownEditorExamples />,
    multifileupload: <MultiFileUploadExamples />,
    qrcodegenerator: <QRCodeGeneratorExamples />,
    richtexteditor: <RichTextEditorExamples />,
    videoplayer: <VideoPlayerExamples />,
    voicerecorder: <VoiceRecorderExamples />,
    // Charts
    assetallocationchart: <AssetAllocationChartExamples />,
    assetpriceticker: <AssetPriceTickerExamples />,
    balancechart: <BalanceChartExamples />,
    chart: <ChartExamples />,
    counters: <CountersExamples />,
    counterslistwithchart: <CountersListWithChartExamples />,
    kpiblock: <KPIBlockExamples />,
    portfoliodistribution: <PortfolioDistributionExamples />,
    resourcemonitor: <ResourceMonitorExamples />,
    sparkline: <SparklineExamples />,
    statisticdisplay: <StatisticDisplayExamples />,
    // Animations
    floatingelement: <FloatingElementExamples />,
    floatingtoolbar: <FloatingToolbarExamples />,
    gesturecard: <GestureCardExamples />,
    immersivehero: <ImmersiveHeroExamples />,
    infinitehorizontalloop: <InfiniteHorizontalLoopExamples />,
    interactivecursor: <InteractiveCursorExamples />,
    parallaxbanner: <ParallaxBannerExamples />,
    parallaxstorystage: <ParallaxStoryStageExamples />,
    scrollprogressbar: <ScrollProgressBarExamples />,
    scrollrevealcards: <ScrollRevealCardsExamples />,
    stickyimagetextswap: <StickyImageTextSwapExamples />,
    unscramblingtext: <UnscramblingTextExamples />,
    // AI
    aithinkingindicator: <AIThinkingIndicatorExamples />,
    hyperpersonalizedwidgetfeed: <HyperPersonalizedWidgetFeedExamples />,
    promptsuggestionchips: <PromptSuggestionChipsExamples />,
    smartinsightscard: <SmartInsightsCardExamples />,
    // Auth
    accessiblehighcontrastmode: <AccessibleHighContrastModeExamples />,
    behavioralauthsimulator: <BehavioralAuthSimulatorExamples />,
    biometricprompt: <BiometricPromptExamples />,
    identityverificationstep: <IdentityVerificationStepExamples />,
    loginform: <LoginFormExamples />,
    permissionsmatrix: <PermissionsMatrixExamples />,
    recoverycodedisplay: <RecoveryCodeDisplayExamples />,
    securityactivitylog: <SecurityActivityLogExamples />,
    securityotpinput: <SecurityOTPInputExamples />,
    signupform: <SignupFormExamples />,
    twofactorauth: <TwoFactorAuthExamples />,
    // Commerce
    cartpreview: <CartPreviewExamples />,
    invoicepreview: <InvoicePreviewExamples />,
    ordersummary: <OrderSummaryExamples />,
    pricedisplay: <PriceDisplayExamples />,
    productcard: <ProductCardExamples />,
    retailswapinterface: <RetailSwapInterfaceExamples />,
    // Fintech
    achtransactionsvisualizer: <AchTransactionsVisualizerExamples />,
    bankaccountcard: <BankAccountCardExamples />,
    cashbackwidget: <CashbackWidgetExamples />,
    creditlimitmanager: <CreditLimitManagerExamples />,
    creditscoresimulator: <CreditScoreSimulatorExamples />,
    currencyconverterwidget: <CurrencyConverterWidgetExamples />,
    earlypaymentdiscount: <EarlyPaymentDiscountExamples />,
    expensecategorizer: <ExpenseCategorizerExamples />,
    fairuselimittracker: <FairUseLimitTrackerExamples />,
    financialgoaltracker: <FinancialGoalTrackerExamples />,
    fintechdashboardpreview: <FintechDashboardPreviewExamples />,
    gamifiedrewardtier: <GamifiedRewardTierExamples />,
    installmentsimulator: <InstallmentSimulatorExamples />,
    interactivebillsplitter: <InteractiveBillSplitterExamples />,
    multicurrencywallet: <MultiCurrencyWalletExamples />,
    paymentconfirmationmodal: <PaymentConfirmationModalExamples />,
    paymentmethodselector: <PaymentMethodSelectorExamples />,
    quicktransferbar: <QuickTransferBarExamples />,
    recurringinvestconfigurator: <RecurringInvestConfiguratorExamples />,
    roundupsavingstoggle: <RoundUpSavingsToggleExamples />,
    socialpaymentfeed: <SocialPaymentFeedExamples />,
    subscriptionmanager: <SubscriptionManagerExamples />,
    transactionlist: <TransactionListExamples />,
    transferform: <TransferFormExamples />,
    virtualcardpreview: <VirtualCardPreviewExamples />,
    // Communication
    chatbubble: <ChatBubbleExamples />,
    chatinput: <ChatInputExamples />,
    commentthread: <CommentThreadExamples />,
    messagereactions: <MessageReactionsExamples />,
    notificationcenterpanel: <NotificationCenterPanelExamples />,
    // Scheduling
    agendaview: <AgendaViewExamples />,
    schedulertimeline: <SchedulerTimelineExamples />,
    // Misc
    activityfeed: <ActivityFeedExamples />,
    activitymonitor: <ActivityMonitorExamples />,
    addressselector: <AddressSelectorExamples />,
    cardsecuritycontrols: <CardSecurityControlsExamples />,
    contextualtrustbadge: <ContextualTrustBadgeExamples />,
    devicelist: <DeviceListExamples />,
    fileintelligencepreview: <FileIntelligencePreviewExamples />,
    microcommitmentstepper: <MicroCommitmentStepperExamples />,
    progressivedisclosurepanel: <ProgressiveDisclosurePanelExamples />,
    slidetodelete: <SlideToDeleteExamples />,
    voicecommandoverlay: <VoiceCommandOverlayExamples />,
  }

  return examples[componentName] || <DefaultExample componentName={componentName} />
}

// ─── BUTTON EXAMPLES ───

import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'

function ButtonExamples() {
  return (
    <>
      <ComponentExample
        title="Variants"
        description="All six visual styles — primary through destructive"
        preview={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        }
        code={`import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Sizes"
        description="Three sizes — sm, md (default), lg"
        preview={
          <div className="flex gap-3 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        }
        code={`import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <div className="flex gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`}
      />

      <ComponentExample
        title="With icons"
        description="Use leftIcon or rightIcon to slot any ReactNode alongside the label"
        preview={
          <div className="flex gap-3 flex-wrap items-center">
            <Button variant="primary" leftIcon={<Search className="w-4 h-4" />}>Search</Button>
            <Button variant="secondary" rightIcon={<ChevronLeft className="w-4 h-4 rotate-180" />}>Next</Button>
            <Button variant="outline" leftIcon={<Copy className="w-4 h-4" />}>Copy link</Button>
          </div>
        }
        code={`import { Button } from '@/components/ui/Button'
import { Search, ChevronRight, Copy } from 'lucide-react'

export function Example() {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button variant="primary" leftIcon={<Search className="w-4 h-4" />}>
        Search
      </Button>
      <Button variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>
        Next
      </Button>
      <Button variant="outline" leftIcon={<Copy className="w-4 h-4" />}>
        Copy link
      </Button>
    </div>
  )
}`}
      />

      <ComponentExample
        title="States"
        description="Loading shows a spinner and sets aria-busy. Disabled prevents all interaction."
        preview={
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" loading>Saving…</Button>
            <Button variant="secondary" loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled</Button>
          </div>
        }
        code={`import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button variant="primary" loading>Saving…</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Full width"
        description="Stretches to fill its container — useful for mobile CTAs or form footers"
        preview={
          <div className="w-full max-w-xs space-y-2">
            <Button variant="primary" fullWidth>Create account</Button>
            <Button variant="outline" fullWidth>Sign in instead</Button>
          </div>
        }
        code={`import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <div className="space-y-2">
      <Button variant="primary" fullWidth>Create account</Button>
      <Button variant="outline" fullWidth>Sign in instead</Button>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── INPUT EXAMPLES ───

import { Input } from '../../components/ui/Input'

function InputExamples() {
  const [value, setValue] = React.useState('')
  const [email, setEmail] = React.useState('')

  return (
    <>
      <ComponentExample
        title="With label and helper text"
        description="The label and helperText props render inside the component — no extra wrapper needed"
        preview={
          <div className="space-y-4 w-full max-w-sm">
            <Input
              label="Full name"
              placeholder="Jane Smith"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              helperText="This will appear on your public profile."
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        }
        code={`import { Input } from '@/components/ui/Input'
import { useState } from 'react'

export function Example() {
  const [name, setName] = useState('')

  return (
    <Input
      label="Full name"
      placeholder="Jane Smith"
      value={name}
      onChange={(e) => setName(e.target.value)}
      helperText="This will appear on your public profile."
    />
  )
}`}
      />

      <ComponentExample
        title="Error state"
        description="Pass error to show inline validation feedback — replaces helperText"
        preview={
          <div className="space-y-4 w-full max-w-sm">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              defaultValue="not-an-email"
              error="Please enter a valid email address."
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error="Must be at least 8 characters."
            />
          </div>
        }
        code={`import { Input } from '@/components/ui/Input'

export function Example() {
  return (
    <Input
      label="Email address"
      type="email"
      defaultValue="not-an-email"
      error="Please enter a valid email address."
    />
  )
}`}
      />

      <ComponentExample
        title="With icons"
        description="leftIcon and rightIcon accept any ReactNode — typically lucide-react icons"
        preview={
          <div className="space-y-3 w-full max-w-sm">
            <Input
              placeholder="Search components…"
              leftIcon={<Search className="w-4 h-4" />}
            />
            <Input
              label="Website"
              placeholder="https://example.com"
              leftIcon={<span className="text-xs font-mono text-text-tertiary">URL</span>}
            />
          </div>
        }
        code={`import { Input } from '@/components/ui/Input'
import { Search } from 'lucide-react'

export function Example() {
  return (
    <Input
      placeholder="Search components…"
      leftIcon={<Search className="w-4 h-4" />}
    />
  )
}`}
      />

      <ComponentExample
        title="Sizes and disabled"
        description="Three sizes via inputSize. Disabled grays out and prevents interaction."
        preview={
          <div className="space-y-3 w-full max-w-sm">
            <Input inputSize="sm" placeholder="Small input" />
            <Input inputSize="md" placeholder="Medium input (default)" />
            <Input inputSize="lg" placeholder="Large input" />
            <Input placeholder="Disabled input" disabled />
          </div>
        }
        code={`import { Input } from '@/components/ui/Input'

export function Example() {
  return (
    <div className="space-y-3">
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
      <Input placeholder="Disabled" disabled />
    </div>
  )
}`}
      />
    </>
  )
}

// ─── SWITCH EXAMPLES ───

import { Switch } from '../../components/ui/Switch'

function SwitchExamples() {
  const [enabled, setEnabled] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <>
      <ComponentExample
        title="Basic Switch"
        description="Simple toggle switch"
        preview={
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            label="Enable notifications"
          />
        }
        code={`import { Switch } from '@/components/ui/Switch'
import { useState } from 'react'

export function Example() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Switch
      checked={enabled}
      onCheckedChange={setEnabled}
      label="Enable notifications"
    />
  )
}`}
      />

      <ComponentExample
        title="With Description"
        description="Switch with helper text"
        preview={
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            label="Dark Mode"
            description="Switch between light and dark theme"
          />
        }
        code={`import { Switch } from '@/components/ui/Switch'
import { useState } from 'react'

export function Example() {
  const [darkMode, setDarkMode] = useState(true)
  
  return (
    <Switch
      checked={darkMode}
      onCheckedChange={setDarkMode}
      label="Dark Mode"
      description="Switch between light and dark theme"
    />
  )
}`}
      />
    </>
  )
}

// ─── CARD EXAMPLES ───

function CardExamples() {
  return (
    <>
      <ComponentExample
        title="Variants"
        description="Elevated, glass, outlined, and flat"
        preview={
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <Card variant="elevated" padding="md">
              <CardHeader>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>Default shadow-based card</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small" color="secondary">Subtle elevation above the surface.</Text>
              </CardContent>
            </Card>
            <Card variant="glass" padding="md">
              <CardHeader>
                <CardTitle>Glass</CardTitle>
                <CardDescription>Frosted glass effect</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small" color="secondary">Blur and transparency combined.</Text>
              </CardContent>
            </Card>
            <Card variant="outlined" padding="md">
              <CardHeader>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>Border-only card</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small" color="secondary">Clean border without shadow.</Text>
              </CardContent>
            </Card>
            <Card variant="flat" padding="md">
              <CardHeader>
                <CardTitle>Flat</CardTitle>
                <CardDescription>Background tint, no border</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small" color="secondary">Minimal visual weight.</Text>
              </CardContent>
            </Card>
          </div>
        }
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Default shadow card</CardDescription>
        </CardHeader>
        <CardContent>Subtle elevation above the surface.</CardContent>
      </Card>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass</CardTitle>
          <CardDescription>Frosted glass effect</CardDescription>
        </CardHeader>
        <CardContent>Blur and transparency combined.</CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Border-only card</CardDescription>
        </CardHeader>
        <CardContent>Clean border without shadow.</CardContent>
      </Card>
      <Card variant="flat">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>Background tint, no border</CardDescription>
        </CardHeader>
        <CardContent>Minimal visual weight.</CardContent>
      </Card>
    </div>
  )
}`}
      />

      <ComponentExample
        title="With footer & actions"
        description="Full layout with header, content, and footer"
        preview={
          <Card variant="elevated" padding="md" className="max-w-sm w-full">
            <CardHeader>
              <CardTitle>Payment method</CardTitle>
              <CardDescription>Update your billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="small" color="secondary">
                Your Visa ending in •••• 4242 is used for all active subscriptions.
              </Text>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Update card</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </CardFooter>
          </Card>
        }
        code={`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from '@/components/ui/Card'

export function Example() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <CardDescription>Update your billing information</CardDescription>
      </CardHeader>
      <CardContent>
        Your Visa ending in •••• 4242 is used for all active subscriptions.
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Update card</Button>
        <Button variant="ghost" size="sm">Cancel</Button>
      </CardFooter>
    </Card>
  )
}`}
      />

      <ComponentExample
        title="Hoverable"
        description="Spring animation on hover — great for interactive grids"
        preview={
          <div className="flex gap-4 flex-wrap justify-center">
            {['Team member', 'Design doc', 'Deployment'].map((item) => (
              <Card key={item} variant="outlined" padding="md" hoverable className="w-44 text-center cursor-pointer">
                <CardContent>
                  <Text weight="medium">{item}</Text>
                  <Text variant="small" color="secondary" className="mt-1">Hover me</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        }
        code={`<Card variant="outlined" hoverable>
  <CardContent>
    <p>Hover me for the spring lift effect</p>
  </CardContent>
</Card>`}
      />
    </>
  )
}

// ─── BADGE EXAMPLES ───

function BadgeExamples() {
  return (
    <>
      <ComponentExample
        title="All Variants"
        description="Badge color variants"
        preview={
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        }
        code={`import { Badge } from '@/components/ui/Badge'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── ALERT EXAMPLES ───

import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert'

function AlertExamples() {
  return (
    <>
      <ComponentExample
        title="All variants"
        description="Five severity levels — default, success, warning, destructive, and info — each with an auto-selected icon"
        preview={
          <div className="space-y-3 max-w-md w-full">
            <Alert variant="default">
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>This is a default informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Changes saved</AlertTitle>
              <AlertDescription>Your profile has been updated successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Irreversible action</AlertTitle>
              <AlertDescription>This cannot be undone. Please review before continuing.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Session expired</AlertTitle>
              <AlertDescription>Please sign in again to continue.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>New version available</AlertTitle>
              <AlertDescription>Check the changelog for what's new in v2.4.</AlertDescription>
            </Alert>
          </div>
        }
        code={`import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert'

export function Example() {
  return (
    <div className="space-y-3">
      <Alert variant="default">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>This is a default informational alert.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Changes saved</AlertTitle>
        <AlertDescription>Your profile has been updated successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Irreversible action</AlertTitle>
        <AlertDescription>This cannot be undone. Please review before continuing.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Session expired</AlertTitle>
        <AlertDescription>Please sign in again to continue.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>New version available</AlertTitle>
        <AlertDescription>Check the changelog for what's new.</AlertDescription>
      </Alert>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Title only"
        description="AlertDescription is optional — use just AlertTitle for brief one-line messages"
        preview={
          <div className="space-y-3 max-w-md w-full">
            <Alert variant="success">
              <AlertTitle>Payment confirmed</AlertTitle>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Connection lost. Retrying…</AlertTitle>
            </Alert>
          </div>
        }
        code={`import { Alert, AlertTitle } from '@/components/ui/Alert'

export function Example() {
  return (
    <Alert variant="success">
      <AlertTitle>Payment confirmed</AlertTitle>
    </Alert>
  )
}`}
      />
    </>
  )
}

// ─── TABS EXAMPLES ───

function TabsExamples() {
  return (
    <>
      <ComponentExample
        title="Default — underline variant"
        description="Standard tab navigation with animated underline indicator"
        preview={
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Text color="secondary" className="mt-4 text-sm">Account overview and recent activity.</Text>
            </TabsContent>
            <TabsContent value="transactions">
              <Text color="secondary" className="mt-4 text-sm">All incoming and outgoing transactions.</Text>
            </TabsContent>
            <TabsContent value="analytics">
              <Text color="secondary" className="mt-4 text-sm">Spending patterns and monthly reports.</Text>
            </TabsContent>
          </Tabs>
        }
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Account overview and recent activity.</TabsContent>
      <TabsContent value="transactions">All incoming and outgoing transactions.</TabsContent>
      <TabsContent value="analytics">Spending patterns and monthly reports.</TabsContent>
    </Tabs>
  )
}`}
      />

      <ComponentExample
        title="Segmented — pill variant"
        description="Pill-shaped tabs ideal for trading or filter UIs"
        preview={
          <Tabs defaultValue="buy" className="w-full max-w-xs">
            <TabsList variant="segmented">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
              <TabsTrigger value="swap">Swap</TabsTrigger>
            </TabsList>
            <TabsContent value="buy">
              <Text color="secondary" className="mt-4 text-sm">Enter the amount you want to buy.</Text>
            </TabsContent>
            <TabsContent value="sell">
              <Text color="secondary" className="mt-4 text-sm">Choose assets to sell from your portfolio.</Text>
            </TabsContent>
            <TabsContent value="swap">
              <Text color="secondary" className="mt-4 text-sm">Swap between two assets instantly.</Text>
            </TabsContent>
          </Tabs>
        }
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export function Example() {
  return (
    <Tabs defaultValue="buy">
      <TabsList variant="segmented">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
        <TabsTrigger value="swap">Swap</TabsTrigger>
      </TabsList>
      <TabsContent value="buy">Enter the amount you want to buy.</TabsContent>
      <TabsContent value="sell">Choose assets to sell from your portfolio.</TabsContent>
      <TabsContent value="swap">Swap between two assets instantly.</TabsContent>
    </Tabs>
  )
}`}
      />

      <ComponentExample
        title="Controlled — with disabled tab"
        description="Fully controlled via useState, with one disabled tab"
        preview={
          (() => {
            const [tab, setTab] = React.useState('active')
            return (
              <Tabs value={tab} onValueChange={setTab} className="w-full max-w-md">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  <Text color="secondary" className="mt-4 text-sm">3 active subscriptions.</Text>
                </TabsContent>
                <TabsContent value="pending">
                  <Text color="secondary" className="mt-4 text-sm">1 subscription awaiting confirmation.</Text>
                </TabsContent>
                <TabsContent value="archived">
                  <Text color="secondary" className="mt-4 text-sm">Archived subscriptions.</Text>
                </TabsContent>
              </Tabs>
            )
          })()
        }
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { useState } from 'react'

export function Example() {
  const [tab, setTab] = useState('active')
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="active">3 active subscriptions.</TabsContent>
      <TabsContent value="pending">1 subscription awaiting confirmation.</TabsContent>
      <TabsContent value="archived">Archived subscriptions.</TabsContent>
    </Tabs>
  )
}`}
      />
    </>
  )
}

// ─── CHECKBOX EXAMPLES ───
import { Checkbox } from '../../components/ui/Checkbox'

function CheckboxExamples() {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false)
  return (
    <>
      <ComponentExample
        title="Basic Checkbox"
        description="Simple checkbox toggle"
        preview={
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <span className="text-sm text-text-primary">Accept terms and conditions</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox defaultChecked />
              <span className="text-sm text-text-primary">Subscribe to newsletter</span>
            </label>
            <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
              <Checkbox disabled />
              <span className="text-sm text-text-secondary">Disabled option</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked="indeterminate" />
              <span className="text-sm text-text-primary">Indeterminate state</span>
            </label>
          </div>
        }
        code={`import { Checkbox } from '@/components/ui/Checkbox'
import { useState } from 'react'

export function Example() {
  const [checked, setChecked] = useState(false)
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <span>Accept terms and conditions</span>
    </label>
  )
}`}
      />
    </>
  )
}

// ─── RADIOGROUP EXAMPLES ───
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'

function RadioGroupExamples() {
  const [plan, setPlan] = React.useState('pro')
  const [notify, setNotify] = React.useState('all')
  return (
    <>
      <ComponentExample
        title="Plan selector"
        description="Each option has a label and description. One option is disabled."
        preview={
          <RadioGroup value={plan} onValueChange={setPlan} className="space-y-2 w-full max-w-sm">
            <RadioGroupItem value="free">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Free</span>
                <span className="text-xs text-text-secondary">Up to 3 projects, community support</span>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="pro">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Pro</span>
                <span className="text-xs text-text-secondary">Unlimited projects, priority support</span>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="enterprise" disabled>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Enterprise</span>
                <span className="text-xs text-text-secondary">SSO, SLA, dedicated account manager</span>
              </div>
            </RadioGroupItem>
          </RadioGroup>
        }
        code={`import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'

export function Example() {
  const [plan, setPlan] = useState('pro')
  return (
    <RadioGroup value={plan} onValueChange={setPlan}>
      <RadioGroupItem value="free">
        <div className="flex flex-col">
          <span className="font-medium">Free</span>
          <span className="text-xs text-text-secondary">Up to 3 projects</span>
        </div>
      </RadioGroupItem>
      <RadioGroupItem value="pro">
        <div className="flex flex-col">
          <span className="font-medium">Pro</span>
          <span className="text-xs text-text-secondary">Unlimited projects</span>
        </div>
      </RadioGroupItem>
      <RadioGroupItem value="enterprise" disabled>
        <div className="flex flex-col">
          <span className="font-medium">Enterprise</span>
          <span className="text-xs text-text-secondary">SSO, SLA, dedicated support</span>
        </div>
      </RadioGroupItem>
    </RadioGroup>
  )
}`}
      />

      <ComponentExample
        title="Horizontal layout"
        description="Use a flex row when options are short labels"
        preview={
          <RadioGroup value={notify} onValueChange={setNotify} className="flex gap-6">
            <RadioGroupItem value="all">All</RadioGroupItem>
            <RadioGroupItem value="mentions">Mentions only</RadioGroupItem>
            <RadioGroupItem value="none">None</RadioGroupItem>
          </RadioGroup>
        }
        code={`import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'

export function Example() {
  const [notify, setNotify] = useState('all')
  return (
    <RadioGroup value={notify} onValueChange={setNotify} className="flex gap-6">
      <RadioGroupItem value="all">All</RadioGroupItem>
      <RadioGroupItem value="mentions">Mentions only</RadioGroupItem>
      <RadioGroupItem value="none">None</RadioGroupItem>
    </RadioGroup>
  )
}`}
      />
    </>
  )
}

// ─── DIVIDER EXAMPLES ───
import { Divider } from '../../components/ui/Divider'

function DividerExamples() {
  return (
    <>
      <ComponentExample
        title="Basic Divider"
        description="Horizontal line separator"
        preview={
          <div className="space-y-4 w-full max-w-md">
            <div>Section 1</div>
            <Divider />
            <div>Section 2</div>
          </div>
        }
        code={`import { Divider } from '@/components/ui/Divider'
export function Example() {
  return (
    <div>
      <p>Section 1</p>
      <Divider />
      <p>Section 2</p>
    </div>
  )
}`}
      />
      <ComponentExample
        title="Divider with Label"
        description="Divider with center label"
        preview={<Divider label="OR" />}
        code={`import { Divider } from '@/components/ui/Divider'
export function Example() {
  return <Divider label="OR" />
}`}
      />
    </>
  )
}

// ─── SPACER EXAMPLES ───
import { Spacer } from '../../components/ui/Spacer'

function SpacerExamples() {
  return (
    <>
      <ComponentExample
        title="Vertical Spacer"
        description="Vertical spacing element"
        preview={
          <div className="space-y-0">
            <div className="p-4 bg-surface-secondary rounded">Top</div>
            <Spacer size="lg" />
            <div className="p-4 bg-surface-secondary rounded">Bottom</div>
          </div>
        }
        code={`import { Spacer } from '@/components/ui/Spacer'
export function Example() {
  return (
    <div>
      <div>Top</div>
      <Spacer size="lg" />
      <div>Bottom</div>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── SPINNER EXAMPLES ───
import { Spinner } from '../../components/ui/Spinner'

function SpinnerExamples() {
  const [saving, setSaving] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Sizes"
        description="Three sizes — sm for inline use, md default, lg for full-area loading"
        preview={
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <Spinner size="sm" />
              <span className="text-xs text-text-secondary">sm</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Spinner size="md" />
              <span className="text-xs text-text-secondary">md</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Spinner size="lg" />
              <span className="text-xs text-text-secondary">lg</span>
            </div>
          </div>
        }
        code={`import { Spinner } from '@/components/ui/Spinner'

export function Example() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}`}
      />

      <ComponentExample
        title="Inline in button"
        description="Use size sm inside a Button to indicate async work"
        preview={
          <div className="flex gap-3">
            <Button
              onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 2000) }}
              disabled={saving}
            >
              {saving ? <><Spinner size="sm" /><span>Saving…</span></> : 'Save changes'}
            </Button>
            <Button variant="secondary" disabled={saving}>Cancel</Button>
          </div>
        }
        code={`import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function Example() {
  const [saving, setSaving] = useState(false)
  return (
    <Button onClick={() => setSaving(true)} disabled={saving}>
      {saving ? (
        <>
          <Spinner size="sm" />
          <span>Saving…</span>
        </>
      ) : 'Save changes'}
    </Button>
  )
}`}
      />
    </>
  )
}

// ─── SKELETON EXAMPLES ───
import { Skeleton } from '../../components/ui/Skeleton'

function SkeletonExamples() {
  return (
    <>
      <ComponentExample
        title="Card skeleton"
        description="Mimic a content card while data loads — match shapes to your real layout"
        preview={
          <div className="w-full max-w-sm rounded-xl border border-border-primary p-4 space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        }
        code={`import { Skeleton } from '@/components/ui/Skeleton'

export function Example() {
  return (
    <div className="rounded-xl border p-4 space-y-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Profile row skeleton"
        description="Avatar + two lines of text — common list/comment pattern"
        preview={
          <div className="space-y-3 w-full max-w-sm">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        }
        code={`import { Skeleton } from '@/components/ui/Skeleton'

export function Example() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}`}
      />
    </>
  )
}

// ─── BLOCKQUOTE EXAMPLES ───
import { Blockquote } from '../../components/ui/Blockquote'

function BlockquoteExamples() {
  return (
    <>
      <ComponentExample
        title="Basic Blockquote"
        description="Quote with author attribution"
        preview={
          <Blockquote author="Steve Jobs">
            The only way to do great work is to love what you do.
          </Blockquote>
        }
        code={`import { Blockquote } from '@/components/ui/Blockquote'
export function Example() {
  return (
    <Blockquote author="Steve Jobs">
      The only way to do great work is to love what you do.
    </Blockquote>
  )
}`}
      />
    </>
  )
}

// ─── HEADING EXAMPLES ───
import { Heading } from '../../components/ui/Heading'

function HeadingExamples() {
  return (
    <>
      <ComponentExample
        title="All Heading Levels"
        description="Different heading sizes"
        preview={
          <div className="space-y-4">
            <Heading level={1}>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
          </div>
        }
        code={`import { Heading } from '@/components/ui/Heading'
export function Example() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── PARAGRAPH EXAMPLES ───
import { Paragraph } from '../../components/ui/Paragraph'

function ParagraphExamples() {
  return (
    <>
      <ComponentExample
        title="Paragraph Text"
        description="Body text component"
        preview={
          <Paragraph>
            This is a paragraph of text with default styling.
          </Paragraph>
        }
        code={`import { Paragraph } from '@/components/ui/Paragraph'
export function Example() {
  return (
    <Paragraph>
      This is a paragraph of text with default styling.
    </Paragraph>
  )
}`}
      />
    </>
  )
}

// ─── LABEL EXAMPLES ───
import { Label } from '../../components/ui/Label'

function LabelExamples() {
  return (
    <>
      <ComponentExample
        title="Form Labels"
        description="Label for form inputs"
        preview={
          <div className="space-y-4 max-w-sm">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="you@example.com" className="mt-2" />
            </div>
          </div>
        }
        code={`import { Label } from '@/components/ui/Label'
export function Example() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" />
    </div>
  )
}`}
      />
    </>
  )
}

// ─── TEXTAREA EXAMPLES ───
import { Textarea } from '../../components/ui/Textarea'

function TextareaExamples() {
  const [bio, setBio] = React.useState('')
  const [feedback, setFeedback] = React.useState('')
  const MAX = 200
  return (
    <>
      <ComponentExample
        title="With label and helper text"
        description="Compose a label element above the Textarea and a helper line below"
        preview={
          <div className="w-full max-w-md space-y-1">
            <label className="text-sm font-medium text-text-primary" htmlFor="bio">Bio</label>
            <Textarea
              id="bio"
              placeholder="Tell us a bit about yourself…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className="text-xs text-text-secondary">This will appear on your public profile.</p>
          </div>
        }
        code={`import { Textarea } from '@/components/ui/Textarea'

export function Example() {
  const [bio, setBio] = useState('')
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="bio">Bio</label>
      <Textarea
        id="bio"
        placeholder="Tell us a bit about yourself…"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <p className="text-xs text-text-secondary">
        This will appear on your public profile.
      </p>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Error state"
        description="Apply a red ring via className and render an error message below"
        preview={
          <div className="w-full max-w-md space-y-1">
            <label className="text-sm font-medium text-text-primary" htmlFor="cancel-reason">Reason for cancellation</label>
            <Textarea
              id="cancel-reason"
              placeholder="Please explain…"
              className="border-status-error focus-visible:ring-status-error"
              aria-invalid="true"
            />
            <p className="text-xs text-status-error">This field is required before you can proceed.</p>
          </div>
        }
        code={`import { Textarea } from '@/components/ui/Textarea'

export function Example() {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="reason">Reason</label>
      <Textarea
        id="reason"
        placeholder="Please explain…"
        className="border-status-error focus-visible:ring-status-error"
        aria-invalid="true"
      />
      <p className="text-xs text-status-error">
        This field is required.
      </p>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Character counter"
        description="Track value.length in state — stop accepting input once the limit is hit"
        preview={
          <div className="w-full max-w-md space-y-1">
            <label className="text-sm font-medium text-text-primary" htmlFor="feedback">Feedback</label>
            <Textarea
              id="feedback"
              placeholder={`Max ${MAX} characters`}
              value={feedback}
              onChange={(e) => { if (e.target.value.length <= MAX) setFeedback(e.target.value) }}
            />
            <p className="text-xs text-text-secondary text-right">
              {feedback.length} / {MAX}
            </p>
          </div>
        }
        code={`import { Textarea } from '@/components/ui/Textarea'
import { useState } from 'react'

const MAX = 200
export function Example() {
  const [feedback, setFeedback] = useState('')
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="feedback">Feedback</label>
      <Textarea
        id="feedback"
        placeholder={\`Max \${MAX} characters\`}
        value={feedback}
        onChange={(e) => {
          if (e.target.value.length <= MAX) setFeedback(e.target.value)
        }}
      />
      <p className="text-xs text-text-secondary text-right">
        {feedback.length} / {MAX}
      </p>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Disabled"
        description="A pre-filled read-only textarea — user cannot edit"
        preview={
          <div className="w-full max-w-md space-y-1">
            <label className="text-sm font-medium text-text-primary">System notes</label>
            <Textarea
              value="Auto-generated by the onboarding flow on 2025-03-12."
              disabled
              readOnly
            />
          </div>
        }
        code={`import { Textarea } from '@/components/ui/Textarea'

export function Example() {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">System notes</label>
      <Textarea
        value="Auto-generated by the onboarding flow on 2025-03-12."
        disabled
        readOnly
      />
    </div>
  )
}`}
      />
    </>
  )
}

// ─── ACCORDION EXAMPLES ───
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/Accordion'

function AccordionExamples() {
  return (
    <>
      <ComponentExample
        title="Single — Collapsible"
        description="Only one item open at a time; can close all"
        preview={
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It ships with WAI-ARIA attributes and full keyboard navigation out of the box.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the design system tokens — fully customisable via className.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. Height animates smoothly using a ResizeObserver-based approach — no fixed heights needed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion'

export function Example() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. WAI-ARIA attributes and full keyboard navigation included.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. Fully customisable via className and design tokens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Smooth height animation via ResizeObserver — no fixed heights.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
      />

      <ComponentExample
        title="Multiple — Expand all"
        description="Multiple items can be open simultaneously"
        preview={
          <div className="w-full max-w-md">
            <Accordion type="multiple" defaultValue={['faq-1', 'faq-3']}>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                  We accept Visa, Mastercard, American Express and PayPal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel at any time from your account settings. No fees apply.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>How do I contact support?</AccordionTrigger>
                <AccordionContent>
                  Reach us at support@example.com or via the in-app chat widget.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion'

export function Example() {
  return (
    <Accordion type="multiple" defaultValue={['faq-1', 'faq-3']}>
      <AccordionItem value="faq-1">
        <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
        <AccordionContent>
          We accept Visa, Mastercard, American Express and PayPal.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
        <AccordionContent>
          Yes, you can cancel anytime from your account settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>How do I contact support?</AccordionTrigger>
        <AccordionContent>
          Reach us at support@example.com or via in-app chat.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
      />

      <ComponentExample
        title="Disabled item"
        description="Individual items can be disabled"
        preview={
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger>Available section</AccordionTrigger>
                <AccordionContent>This section is open and interactive.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b" disabled>
                <AccordionTrigger>Locked section</AccordionTrigger>
                <AccordionContent>This content is not accessible.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="c">
                <AccordionTrigger>Another available section</AccordionTrigger>
                <AccordionContent>Back to normal interaction here.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>Available section</AccordionTrigger>
    <AccordionContent>This section is open and interactive.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b" disabled>
    <AccordionTrigger>Locked section</AccordionTrigger>
    <AccordionContent>This content is not accessible.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="c">
    <AccordionTrigger>Another available section</AccordionTrigger>
    <AccordionContent>Back to normal interaction here.</AccordionContent>
  </AccordionItem>
</Accordion>`}
      />
    </>
  )
}

// ─── AVATAR EXAMPLES ───
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/Avatar'

function AvatarExamples() {
  return (
    <>
      <ComponentExample
        title="With image"
        description="Avatar with an image source and text fallback"
        preview={
          <div className="flex gap-4 items-center flex-wrap">
            <Avatar size="md">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://broken-url.example.com/img.jpg" alt="Fallback demo" />
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
          </div>
        }
        code={`import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

export function Example() {
  return (
    <div className="flex gap-4">
      {/* Image loads — shows photo */}
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Image fails — shows initials */}
      <Avatar>
        <AvatarImage src="https://broken-url.example.com/img.jpg" alt="Fallback" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Sizes"
        description="Six size options: xs · sm · md · lg · xl · 2xl"
        preview={
          <div className="flex gap-4 items-end flex-wrap">
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size}>
                  <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-xs text-text-tertiary font-mono">{size}</span>
              </div>
            ))}
          </div>
        }
        code={`import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export function Example() {
  return (
    <div className="flex gap-4 items-end">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}`}
      />

      <ComponentExample
        title="Shapes"
        description="Circle (default) and square shapes"
        preview={
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" shape="circle">
                <AvatarImage src="https://i.pravatar.cc/150?img=7" alt="Circle" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <span className="text-xs text-text-tertiary">circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" shape="square">
                <AvatarImage src="https://i.pravatar.cc/150?img=7" alt="Square" />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <span className="text-xs text-text-tertiary">square</span>
            </div>
          </div>
        }
        code={`import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

export function Example() {
  return (
    <div className="flex gap-6">
      <Avatar size="lg" shape="circle">
        <AvatarImage src="..." alt="Circle avatar" />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
      <Avatar size="lg" shape="square">
        <AvatarImage src="..." alt="Square avatar" />
        <AvatarFallback>SQ</AvatarFallback>
      </Avatar>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Fallback only"
        description="Text initials when no image is provided"
        preview={
          <div className="flex gap-3 items-center flex-wrap">
            <Avatar size="md"><AvatarFallback>AB</AvatarFallback></Avatar>
            <Avatar size="md"><AvatarFallback>JD</AvatarFallback></Avatar>
            <Avatar size="md"><AvatarFallback>MK</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>TS</AvatarFallback></Avatar>
          </div>
        }
        code={`import { Avatar, AvatarFallback } from '@/components/ui/Avatar'

export function Example() {
  return (
    <div className="flex gap-3">
      <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── AVATAR GROUP EXAMPLES ───
import { AvatarGroup } from '../../components/ui/AvatarGroup'

function AvatarGroupExamples() {
  return (
    <>
      <ComponentExample
        title="Avatar Group"
        description="Multiple user avatars"
        preview={<AvatarGroup items={[{alt: 'Alice', fallback: 'AL'}, {alt: 'Bob', fallback: 'BO'}, {alt: 'Clara', fallback: 'CL'}, {alt: 'Dan', fallback: 'DA'}, {alt: 'Eve', fallback: 'EV'}]} max={4} />}
        code={`import { AvatarGroup } from '@/components/ui/AvatarGroup'
export function Example() {
  return (
    <AvatarGroup
      items={[
        { alt: 'Alice', fallback: 'AL' },
        { alt: 'Bob', fallback: 'BO' },
        { alt: 'Clara', fallback: 'CL' },
        { alt: 'Dan', fallback: 'DA' },
        { alt: 'Eve', fallback: 'EV' },
      ]}
      max={4}
    />
  )
}`}
      />
    </>
  )
}

// ─── CHIP EXAMPLES ───
import { Chip } from '../../components/ui/Chip'

function ChipExamples() {
  const [chips, setChips] = React.useState(['React', 'TypeScript', 'Tailwind', 'Vite'])
  return (
    <>
      <ComponentExample
        title="Variants"
        description="Six semantic color variants — use them to convey meaning at a glance"
        preview={
          <div className="flex flex-wrap gap-2">
            <Chip label="Default" variant="default" />
            <Chip label="Primary" variant="primary" />
            <Chip label="Success" variant="success" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Error" variant="error" />
            <Chip label="Info" variant="info" />
          </div>
        }
        code={`import { Chip } from '@/components/ui/Chip'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip label="Default" variant="default" />
      <Chip label="Primary" variant="primary" />
      <Chip label="Success" variant="success" />
      <Chip label="Warning" variant="warning" />
      <Chip label="Error" variant="error" />
      <Chip label="Info" variant="info" />
    </div>
  )
}`}
      />

      <ComponentExample
        title="Removable chips"
        description="Pass onDelete to show the × button — click to remove from the list"
        preview={
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <Chip
                key={c}
                label={c}
                variant="primary"
                onDelete={() => setChips((prev) => prev.filter((x) => x !== c))}
              />
            ))}
          </div>
        }
        code={`import { Chip } from '@/components/ui/Chip'
import { useState } from 'react'

export function Example() {
  const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind', 'Vite'])
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <Chip
          key={c}
          label={c}
          variant="primary"
          onDelete={() => setChips((prev) => prev.filter((x) => x !== c))}
        />
      ))}
    </div>
  )
}`}
      />

      <ComponentExample
        title="Sizes and disabled"
        description="Three sizes. Disabled chips suppress the delete button."
        preview={
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Chip label="Small" size="sm" variant="success" />
              <Chip label="Medium" size="md" variant="success" />
              <Chip label="Large" size="lg" variant="success" />
            </div>
            <div className="flex gap-2">
              <Chip label="Disabled" variant="primary" disabled onDelete={() => {}} />
            </div>
          </div>
        }
        code={`import { Chip } from '@/components/ui/Chip'

export function Example() {
  return (
    <>
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
      <Chip label="Large" size="lg" />
      <Chip label="Disabled" disabled onDelete={() => {}} />
    </>
  )
}`}
      />
    </>
  )
}

// ─── TAG EXAMPLES ───
import { Tag } from '../../components/ui/Tag'

function TagExamples() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>(['active'])
  const toggle = (v: string) => setSelectedTags((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])
  return (
    <>
      <ComponentExample
        title="Variants"
        description="Seven variants — default, primary, outline, and four semantic colors"
        preview={
          <div className="flex flex-wrap gap-2">
            <Tag label="Default" variant="default" />
            <Tag label="Primary" variant="primary" />
            <Tag label="Outline" variant="outline" />
            <Tag label="Success" variant="success" />
            <Tag label="Warning" variant="warning" />
            <Tag label="Error" variant="error" />
            <Tag label="Info" variant="info" />
          </div>
        }
        code={`import { Tag } from '@/components/ui/Tag'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag label="Default" variant="default" />
      <Tag label="Primary" variant="primary" />
      <Tag label="Outline" variant="outline" />
      <Tag label="Success" variant="success" />
      <Tag label="Warning" variant="warning" />
      <Tag label="Error" variant="error" />
      <Tag label="Info" variant="info" />
    </div>
  )
}`}
      />

      <ComponentExample
        title="Clickable and removable"
        description="onClick makes the tag interactive; onRemove adds an × button"
        preview={
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {(['active', 'pending', 'archived'] as const).map((v) => (
                <Tag
                  key={v}
                  label={v.charAt(0).toUpperCase() + v.slice(1)}
                  variant={selectedTags.includes(v) ? 'primary' : 'outline'}
                  onClick={() => toggle(v)}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag label="React" variant="info" onRemove={() => {}} />
              <Tag label="TypeScript" variant="info" onRemove={() => {}} />
              <Tag label="Node.js" variant="info" onRemove={() => {}} />
            </div>
          </div>
        }
        code={`import { Tag } from '@/components/ui/Tag'
import { useState } from 'react'

export function Example() {
  const [selected, setSelected] = useState(['active'])
  const toggle = (v: string) =>
    setSelected((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])

  return (
    <div className="flex flex-wrap gap-2">
      {['active', 'pending', 'archived'].map((v) => (
        <Tag
          key={v}
          label={v}
          variant={selected.includes(v) ? 'primary' : 'outline'}
          onClick={() => toggle(v)}
        />
      ))}
    </div>
  )
}`}
      />
    </>
  )
}

// ─── TAGS INPUT EXAMPLES ───
import { TagsInput } from '../../components/ui/TagsInput'

function TagsInputExamples() {
  const [skills, setSkills] = React.useState(['React', 'TypeScript'])
  const [limited, setLimited] = React.useState(['design'])
  return (
    <>
      <ComponentExample
        title="Basic tags input"
        description="Type and press Enter or comma to add a tag. Backspace removes the last one."
        preview={
          <TagsInput
            label="Skills"
            placeholder="Add a skill…"
            helperText="Press Enter or comma to confirm each tag"
            value={skills}
            onChange={setSkills}
            className="max-w-md"
          />
        }
        code={`import { TagsInput } from '@/components/ui/TagsInput'
import { useState } from 'react'

export function Example() {
  const [skills, setSkills] = useState(['React', 'TypeScript'])
  return (
    <TagsInput
      label="Skills"
      placeholder="Add a skill…"
      helperText="Press Enter or comma to confirm each tag"
      value={skills}
      onChange={setSkills}
    />
  )
}`}
      />

      <ComponentExample
        title="With maxTags limit"
        description="maxTags stops new entries once the cap is reached"
        preview={
          <TagsInput
            label="Topics (max 3)"
            placeholder="Add topic…"
            value={limited}
            onChange={setLimited}
            maxTags={3}
            className="max-w-md"
          />
        }
        code={`import { TagsInput } from '@/components/ui/TagsInput'
import { useState } from 'react'

export function Example() {
  const [topics, setTopics] = useState(['design'])
  return (
    <TagsInput
      label="Topics (max 3)"
      placeholder="Add topic…"
      value={topics}
      onChange={setTopics}
      maxTags={3}
    />
  )
}`}
      />
    </>
  )
}

// ─── CALLOUT EXAMPLES ───
import { Callout } from '../../components/ui/Callout'

function CalloutExamples() {
  return (
    <>
      <ComponentExample
        title="All variants"
        description="Callout highlights inline content — use it for tips, warnings, and important notes within documentation or onboarding flows"
        preview={
          <div className="space-y-3 w-full max-w-md">
            <Callout>
              <strong>Tip:</strong> You can press <kbd className="text-xs bg-surface-tertiary border border-border-primary px-1.5 py-0.5 rounded font-mono">⌘K</kbd> to open the command menu from anywhere.
            </Callout>
            <Callout variant="warning">
              <strong>Warning:</strong> This action will affect all users in your workspace — not just your account.
            </Callout>
            <Callout variant="error">
              <strong>Destructive:</strong> Deleting this item is permanent. Make sure you have a backup before continuing.
            </Callout>
          </div>
        }
        code={`import { Callout } from '@/components/ui/Callout'

export function Example() {
  return (
    <div className="space-y-3">
      <Callout>
        Tip: Press ⌘K to open the command menu.
      </Callout>
      <Callout variant="warning">
        Warning: This affects all users in your workspace.
      </Callout>
      <Callout variant="error">
        Destructive: This action is permanent.
      </Callout>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── EMPTY STATE EXAMPLES ───
import { EmptyState } from '../../components/ui/EmptyState'

function EmptyStateExamples() {
  return (
    <>
      <ComponentExample
        title="With icon and action"
        description="icon, title, description, and action props — combine them to build meaningful zero-state screens"
        preview={
          <EmptyState
            icon={<span className="text-4xl">📭</span>}
            title="No messages yet"
            description="When someone sends you a message it will appear here. You can also start a new conversation."
            action={<Button variant="primary" size="sm">Start a conversation</Button>}
          />
        }
        code={`import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <EmptyState
      icon={<span className="text-4xl">📭</span>}
      title="No messages yet"
      description="When someone sends you a message it will appear here."
      action={<Button variant="primary" size="sm">Start a conversation</Button>}
    />
  )
}`}
      />

      <ComponentExample
        title="Minimal — title only"
        description="icon and action are optional — a title alone is enough for simple cases"
        preview={
          <div className="flex gap-8 flex-wrap justify-center">
            <EmptyState title="No results found" description="Try adjusting your search or filters." />
            <EmptyState
              icon={<span className="text-3xl">🔒</span>}
              title="Access restricted"
              description="Contact your admin to request access."
              action={<Button variant="outline" size="sm">Request access</Button>}
            />
          </div>
        }
        code={`import { EmptyState } from '@/components/ui/EmptyState'

export function Example() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters."
    />
  )
}`}
      />
    </>
  )
}

// ─── COLLAPSIBLE EXAMPLES ───
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/ui/Collapsible'

function CollapsibleExamples() {
  return (
    <>
      <ComponentExample
        title="Basic"
        description="Use CollapsibleTrigger to control the toggle and CollapsibleContent for the hidden panel"
        preview={
          <div className="w-full max-w-md space-y-2">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border-primary bg-surface-secondary/40 text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors">
                <span>What is the refund policy?</span>
                <ChevronLeft className="w-4 h-4 -rotate-90 transition-transform ui-open:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 py-3 text-sm text-text-secondary">
                  We offer a full refund within 30 days of purchase, no questions asked. After 30 days, refunds are reviewed case by case.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border-primary bg-surface-secondary/40 text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors">
                <span>Can I change my plan?</span>
                <ChevronLeft className="w-4 h-4 -rotate-90 transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 py-3 text-sm text-text-secondary">
                  Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        }
        code={`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/Collapsible'

export function Example() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg border text-sm font-medium">
        What is the refund policy?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="px-4 py-3 text-sm text-text-secondary">
          We offer a full refund within 30 days of purchase.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
      />

      <ComponentExample
        title="Controlled"
        description="Manage open state externally with onOpenChange"
        preview={
          (() => {
            const [open, setOpen] = React.useState(false)
            return (
              <div className="w-full max-w-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-secondary">Panel is {open ? 'open' : 'closed'}</span>
                  <Button size="sm" variant="ghost" onClick={() => setOpen(o => !o)}>
                    {open ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
                <Collapsible open={open} onOpenChange={setOpen}>
                  <CollapsibleTrigger className="w-full text-left px-4 py-3 rounded-lg border border-border-primary bg-surface-secondary/40 text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors">
                    Advanced settings
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 px-4 py-3 rounded-lg border border-border-primary text-sm text-text-secondary space-y-2">
                      <p>Debug mode: off</p>
                      <p>API timeout: 30s</p>
                      <p>Cache TTL: 60s</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )
          })()
        }
        code={`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/Collapsible'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Debug mode: off</p>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
      />
    </>
  )
}

// ─── SLIDER EXAMPLES ───
import { Slider } from '../../components/ui/Slider'

function SliderExamples() {
  const [volume, setVolume] = React.useState(60)
  const [brightness, setBrightness] = React.useState(40)
  return (
    <>
      <ComponentExample
        title="Basic"
        description="Controlled via value + onValueChange — value is a number"
        preview={
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Volume</span>
                <span className="font-mono text-text-primary">{volume}</span>
              </div>
              <Slider value={volume} onValueChange={setVolume} max={100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Brightness</span>
                <span className="font-mono text-text-primary">{brightness}%</span>
              </div>
              <Slider value={brightness} onValueChange={setBrightness} max={100} step={5} />
            </div>
          </div>
        }
        code={`import { Slider } from '@/components/ui/Slider'
import { useState } from 'react'

export function Example() {
  const [volume, setVolume] = useState(60)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Volume</span>
        <span>{volume}</span>
      </div>
      <Slider value={volume} onValueChange={setVolume} max={100} />
    </div>
  )
}`}
      />

      <ComponentExample
        title="Disabled"
        description="Pass disabled to prevent interaction — useful in read-only views"
        preview={
          <div className="w-full max-w-sm space-y-4">
            <Slider value={75} disabled max={100} />
            <p className="text-xs text-text-tertiary">Storage used: 75%</p>
          </div>
        }
        code={`import { Slider } from '@/components/ui/Slider'

export function Example() {
  return <Slider value={75} disabled max={100} />
}`}
      />
    </>
  )
}

// ─── RANGE SLIDER EXAMPLES ───
import { RangeSlider } from '../../components/ui/RangeSlider'

function RangeSliderExamples() {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([20, 80])
  return (
    <>
      <ComponentExample
        title="Dual Range Slider"
        description="Select minimum and maximum range"
        preview={
          <div className="w-full max-w-sm space-y-4">
            <div className="flex justify-between text-sm text-text-secondary">
              <span>Price range</span>
              <span>${priceRange[0]} – ${priceRange[1]}</span>
            </div>
            <RangeSlider
              value={priceRange}
              min={0}
              max={100}
              step={1}
              onValueChange={setPriceRange}
            />
          </div>
        }
        code={`import { RangeSlider } from '@/components/ui/RangeSlider'
import { useState } from 'react'

export function Example() {
  const [range, setRange] = useState<[number, number]>([20, 80])
  return (
    <RangeSlider
      value={range}
      min={0}
      max={100}
      step={1}
      onValueChange={setRange}
    />
  )
}`}
      />
    </>
  )
}

// ─── CALENDAR EXAMPLES ───
import { Calendar } from '../../components/ui/Calendar'

function CalendarExamples() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const today = new Date()
  const sampleEvents = [
    { id: '1', date: today, title: 'Team standup', startTime: '09:00', endTime: '09:30', color: '#007AFF' },
    { id: '2', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), title: 'Design review', startTime: '14:00', endTime: '15:00', color: '#34C759' },
    { id: '3', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), title: 'Sprint planning', startTime: '10:00', endTime: '11:30', color: '#FF9500' },
  ]
  return (
    <>
      <ComponentExample
        title="Interactive Calendar"
        description="Date picker calendar component with events"
        preview={
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            events={sampleEvents}
            highlightToday
          />
        }
        code={`import { Calendar } from '@/components/ui/Calendar'
import { useState } from 'react'

export function Example() {
  const [date, setDate] = useState(new Date())
  const events = [
    { id: '1', date: new Date(), title: 'Team standup', color: '#007AFF' },
  ]
  return (
    <Calendar
      value={date}
      onChange={setDate}
      events={events}
      highlightToday
    />
  )
}`}
      />
    </>
  )
}

// ─── STEPPER EXAMPLES ───
import { Stepper } from '../../components/ui/Stepper'

function StepperExamples() {
  const steps = [
    { id: 1, title: 'Account', description: 'Email & password' },
    { id: 2, title: 'Profile', description: 'Your details' },
    { id: 3, title: 'Billing', description: 'Payment method' },
    { id: 4, title: 'Review', description: 'Confirm & submit' },
  ]
  const [current, setCurrent] = React.useState(0)

  return (
    <>
      <ComponentExample
        title="Interactive"
        description="Controlled via activeStep — wire it to your form's step state"
        preview={
          <div className="w-full max-w-md space-y-6">
            <Stepper steps={steps} activeStep={current} />
            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                disabled={current === 0}
                onClick={() => setCurrent(s => s - 1)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={current === steps.length - 1}
                onClick={() => setCurrent(s => s + 1)}
              >
                {current === steps.length - 2 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        }
        code={`import { Stepper, type Step } from '@/components/ui/Stepper'
import { useState } from 'react'

const steps: Step[] = [
  { id: 1, title: 'Account', description: 'Email & password' },
  { id: 2, title: 'Profile', description: 'Your details' },
  { id: 3, title: 'Billing', description: 'Payment method' },
  { id: 4, title: 'Review', description: 'Confirm & submit' },
]

export function Example() {
  const [current, setCurrent] = useState(0)

  return (
    <div className="space-y-6">
      <Stepper steps={steps} activeStep={current} />
      <div className="flex justify-between">
        <button disabled={current === 0} onClick={() => setCurrent(s => s - 1)}>
          Back
        </button>
        <button
          disabled={current === steps.length - 1}
          onClick={() => setCurrent(s => s + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── SCROLL AREA EXAMPLES ───
import { ScrollArea } from '../../components/ui/ScrollArea'

function ScrollAreaExamples() {
  return (
    <>
      <ComponentExample
        title="Scrollable Area"
        description="Styled scrollable container"
        preview={
          <ScrollArea className="h-40 w-80 border border-border-primary rounded-lg p-4">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="py-2 text-sm">Item {i + 1}</div>
            ))}
          </ScrollArea>
        }
        code={`import { ScrollArea } from '@/components/ui/ScrollArea'
export function Example() {
  return (
    <ScrollArea className="h-40 w-80">
      <div>Content goes here</div>
    </ScrollArea>
  )
}`}
      />
    </>
  )
}

// ─── TOAST EXAMPLES ───
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../../components/ui/Toast'

function ToastDemo({ variant, title, description, actionLabel }: {
  variant: 'default' | 'destructive' | 'success'
  title: string
  description: string
  actionLabel?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <ToastProvider>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Show {variant} toast
      </Button>
      <Toast variant={variant} open={open} onOpenChange={setOpen} duration={4000}>
        <div className="grid gap-1">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </div>
        {actionLabel && (
          <ToastAction onClick={() => setOpen(false)}>{actionLabel}</ToastAction>
        )}
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

function ToastExamples() {
  return (
    <>
      <ComponentExample
        title="Default"
        description="Standard informational toast triggered by a button"
        preview={
          <ToastDemo
            variant="default"
            title="Scheduled: Catch up"
            description="Friday, February 10, 2024 at 5:57 PM"
            actionLabel="Undo"
          />
        }
        code={`import {
  Toast, ToastProvider, ToastViewport,
  ToastTitle, ToastDescription, ToastClose, ToastAction,
} from '@/components/ui/Toast'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <ToastProvider>
      <button onClick={() => setOpen(true)}>Show toast</button>
      <Toast open={open} onOpenChange={setOpen} duration={4000}>
        <div className="grid gap-1">
          <ToastTitle>Scheduled: Catch up</ToastTitle>
          <ToastDescription>Friday, February 10 at 5:57 PM</ToastDescription>
        </div>
        <ToastAction onClick={() => setOpen(false)}>Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}`}
      />

      <ComponentExample
        title="Success"
        description="Positive feedback toast"
        preview={
          <ToastDemo
            variant="success"
            title="Changes saved"
            description="Your profile has been updated successfully."
          />
        }
        code={`<Toast variant="success" open={open} onOpenChange={setOpen}>
  <div className="grid gap-1">
    <ToastTitle>Changes saved</ToastTitle>
    <ToastDescription>Your profile has been updated successfully.</ToastDescription>
  </div>
  <ToastClose />
</Toast>`}
      />

      <ComponentExample
        title="Destructive"
        description="Error or warning toast"
        preview={
          <ToastDemo
            variant="destructive"
            title="Uh oh! Something went wrong."
            description="There was a problem with your request."
            actionLabel="Try again"
          />
        }
        code={`<Toast variant="destructive" open={open} onOpenChange={setOpen}>
  <div className="grid gap-1">
    <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
    <ToastDescription>There was a problem with your request.</ToastDescription>
  </div>
  <ToastAction onClick={retry}>Try again</ToastAction>
  <ToastClose />
</Toast>`}
      />
    </>
  )
}

// ─── SNACKBAR EXAMPLES ───
import { Snackbar } from '../../components/ui/Snackbar'

function SnackbarExamples() {
  const [snackbar, setSnackbar] = React.useState<{ show: boolean; message: string; variant: 'default' | 'success' | 'error' | 'warning' }>({
    show: false,
    message: '',
    variant: 'default',
  })

  const show = (message: string, variant: typeof snackbar.variant) =>
    setSnackbar({ show: true, message, variant })

  return (
    <>
      <ComponentExample
        title="All variants"
        description="Snackbar requires open, message, and onClose — use variant to communicate status"
        preview={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => show('File saved successfully', 'success')}>Success</Button>
            <Button size="sm" variant="secondary" onClick={() => show('Upload failed — please retry', 'error')}>Error</Button>
            <Button size="sm" variant="secondary" onClick={() => show('Your session expires in 5 minutes', 'warning')}>Warning</Button>
            <Button size="sm" variant="secondary" onClick={() => show('3 items moved to archive', 'default')}>Default</Button>
            <Snackbar
              show={snackbar.show}
              message={snackbar.message}
              variant={snackbar.variant}
              onClose={() => setSnackbar(s => ({ ...s, show: false }))}
              duration={3000}
            />
          </div>
        }
        code={`import { Snackbar } from '@/components/ui/Snackbar'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Show snackbar</button>
      <Snackbar
        open={open}
        message="File saved successfully"
        variant="success"
        onClose={() => setOpen(false)}
        duration={4000}
      />
    </>
  )
}`}
      />

      <ComponentExample
        title="With action"
        description="action takes { label, onClick } — the button is rendered by Snackbar internally"
        preview={
          (() => {
            const [show, setShow] = React.useState(false)
            return (
              <>
                <Button size="sm" variant="secondary" onClick={() => setShow(true)}>Delete item</Button>
                <Snackbar
                  show={show}
                  message="Item deleted"
                  onClose={() => setShow(false)}
                  duration={5000}
                  action={{ label: 'Undo', onClick: () => setShow(false) }}
                />
              </>
            )
          })()
        }
        code={`import { Snackbar } from '@/components/ui/Snackbar'
import { useState } from 'react'

export function Example() {
  const [show, setShow] = useState(false)

  return (
    <>
      <button onClick={() => setShow(true)}>Delete item</button>
      <Snackbar
        show={show}
        message="Item deleted"
        onClose={() => setShow(false)}
        action={{ label: 'Undo', onClick: () => setShow(false) }}
      />
    </>
  )
}`}
      />
    </>
  )
}

// ─── TABLE EXAMPLES ───
import { Table } from '../../components/ui/Table'

function TableExamples() {
  type User = { name: string; role: string; status: string; joined: string }
  const columns = [
    { header: 'Name', key: 'name' as const, sortable: true },
    { header: 'Role', key: 'role' as const },
    {
      header: 'Status', key: 'status' as const,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-status-success/10 text-status-success' :
          value === 'Invited' ? 'bg-status-warning/10 text-status-warning' :
          'bg-surface-secondary text-text-secondary'
        }`}>{value}</span>
      ),
    },
    { header: 'Joined', key: 'joined' as const },
  ]
  const data: User[] = [
    { name: 'Alice Martin', role: 'Admin', status: 'Active', joined: '2024-01-10' },
    { name: 'Bob Chen', role: 'Developer', status: 'Active', joined: '2024-03-22' },
    { name: 'Clara Diaz', role: 'Designer', status: 'Invited', joined: '2024-05-01' },
    { name: 'Dan Wright', role: 'Viewer', status: 'Inactive', joined: '2023-11-14' },
  ]
  return (
    <>
      <ComponentExample
        title="Data table with sortable columns"
        description="Click a sortable header to toggle asc/desc. Rows stripe by default."
        preview={<Table columns={columns} data={data} />}
        code={`import { Table } from '@/components/ui/Table'

type User = { name: string; role: string; status: string; joined: string }

const columns = [
  { header: 'Name', key: 'name' as const, sortable: true },
  { header: 'Role', key: 'role' as const },
  {
    header: 'Status', key: 'status' as const,
    render: (value: string) => (
      <span className={value === 'Active' ? 'text-green-600' : 'text-text-secondary'}>
        {value}
      </span>
    ),
  },
  { header: 'Joined', key: 'joined' as const },
]

const data: User[] = [
  { name: 'Alice Martin', role: 'Admin', status: 'Active', joined: '2024-01-10' },
  { name: 'Bob Chen', role: 'Developer', status: 'Active', joined: '2024-03-22' },
  { name: 'Clara Diaz', role: 'Designer', status: 'Invited', joined: '2024-05-01' },
]

export function Example() {
  return <Table columns={columns} data={data} />
}`}
      />

      <ComponentExample
        title="Compact density, no stripe"
        description="Use density compact for dense data views; disable striped for a flat look"
        preview={
          <Table
            columns={[
              { header: 'Name', key: 'name' as const },
              { header: 'Role', key: 'role' as const },
              { header: 'Status', key: 'status' as const },
            ]}
            data={data}
            density="compact"
            striped={false}
          />
        }
        code={`import { Table } from '@/components/ui/Table'

export function Example() {
  return (
    <Table
      columns={columns}
      data={data}
      density="compact"
      striped={false}
    />
  )
}`}
      />
    </>
  )
}

// ─── TOOLTIP EXAMPLES ───
import { Tooltip } from '../../components/ui/Tooltip'

function TooltipExamples() {
  return (
    <>
      <ComponentExample
        title="Basic"
        description="Wrap any element — the tooltip appears on hover and keyboard focus"
        preview={
          <div className="flex gap-6 items-center flex-wrap">
            <Tooltip content="This is helpful information">
              <Button variant="secondary" size="sm">Hover me</Button>
            </Tooltip>
            <Tooltip content="Copy to clipboard">
              <button className="p-2 rounded-lg border border-border-primary hover:bg-surface-secondary transition-colors">
                <Copy className="w-4 h-4 text-text-secondary" />
              </button>
            </Tooltip>
            <Tooltip content="Required field — cannot be empty">
              <span className="text-sm text-text-secondary underline decoration-dotted cursor-help">
                Why is this required?
              </span>
            </Tooltip>
          </div>
        }
        code={`import { Tooltip } from '@/components/ui/Tooltip'

export function Example() {
  return (
    <Tooltip content="This is helpful information">
      <button>Hover me</button>
    </Tooltip>
  )
}`}
      />

      <ComponentExample
        title="Placement"
        description="Control which side the tooltip appears with the side prop"
        preview={
          <div className="flex gap-4 items-center justify-center flex-wrap py-4">
            {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
              <Tooltip key={side} content={`Appears on the ${side}`} side={side}>
                <Button variant="outline" size="sm">{side}</Button>
              </Tooltip>
            ))}
          </div>
        }
        code={`import { Tooltip } from '@/components/ui/Tooltip'

export function Example() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Appears on the top" side="top">
        <button>top</button>
      </Tooltip>
      <Tooltip content="Appears on the bottom" side="bottom">
        <button>bottom</button>
      </Tooltip>
      <Tooltip content="Appears on the left" side="left">
        <button>left</button>
      </Tooltip>
      <Tooltip content="Appears on the right" side="right">
        <button>right</button>
      </Tooltip>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── POPOVER EXAMPLES ───
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover'

function PopoverExamples() {
  return (
    <>
      <ComponentExample
        title="Basic popover"
        description="Compound API — PopoverTrigger wraps the element; PopoverContent holds the panel"
        preview={
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2 p-1">
                <p className="text-sm font-medium text-text-primary">Settings</p>
                <p className="text-xs text-text-secondary">Manage your preferences and account settings from this panel.</p>
              </div>
            </PopoverContent>
          </Popover>
        }
        code={`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover'

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>Open</button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover content</p>
      </PopoverContent>
    </Popover>
  )
}`}
      />

      <ComponentExample
        title="Action menu"
        description="Icon button trigger with a list of actions inside"
        preview={
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-lg border border-border-primary hover:bg-surface-secondary transition-colors">
                <Copy className="w-4 h-4 text-text-secondary" />
              </button>
            </PopoverTrigger>
            <PopoverContent>
            <div className="min-w-[160px] py-1">
              {['Edit', 'Duplicate', 'Share'].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors rounded-md"
                >
                  {action}
                </button>
              ))}
              <div className="my-1 border-t border-border-primary" />
              <button className="w-full text-left px-3 py-2 text-sm text-status-error hover:bg-surface-secondary transition-colors rounded-md">
                Delete
              </button>
            </div>
          </PopoverContent>
          </Popover>
        }
        code={`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover'

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>•••</button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-[160px] py-1">
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-surface-secondary rounded-md">Edit</button>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-surface-secondary rounded-md">Duplicate</button>
          <div className="my-1 border-t" />
          <button className="w-full text-left px-3 py-2 text-sm text-status-error hover:bg-surface-secondary rounded-md">Delete</button>
        </div>
      </PopoverContent>
    </Popover>
  )
}`}
      />
    </>
  )
}

// ─── MODAL EXAMPLES ───
import { Modal } from '../../components/ui/Modal'

function ModalExamples() {
  const [open, setOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Basic modal"
        description="Centered overlay dialog — controlled via open / onOpenChange"
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal open={open} onOpenChange={setOpen}>
              <div className="space-y-4 p-6">
                <h2 className="text-lg font-semibold text-text-primary">Edit profile</h2>
                <Text color="secondary" variant="small">Update your public profile information below.</Text>
                <Input label="Display name" placeholder="Jane Smith" />
                <Input label="Bio" placeholder="Something about you…" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save</Button>
                </div>
              </div>
            </Modal>
          </>
        }
        code={`import { Modal } from '@/components/ui/Modal'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Edit profile</h2>
          <p className="text-sm text-text-secondary">
            Update your public profile information below.
          </p>
          <Input label="Display name" placeholder="Jane Smith" />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}`}
      />

      <ComponentExample
        title="Destructive confirmation"
        description="Embed the title and footer actions directly inside children — Modal has no title or footer props"
        preview={
          <>
            <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>Delete account</Button>
            <Modal open={confirmOpen} onOpenChange={setConfirmOpen} size="sm">
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-text-primary">Delete account</h2>
                <Text color="secondary" variant="small">
                  This action is permanent and cannot be undone. All your data will be removed within 24 hours.
                </Text>
                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                  <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(false)}>Delete</Button>
                </div>
              </div>
            </Modal>
          </>
        }
        code={`import { Modal } from '@/components/ui/Modal'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete account</Button>
      <Modal open={open} onOpenChange={setOpen} size="sm">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Delete account</h2>
          <p className="text-sm text-text-secondary">
            This action is permanent and cannot be undone.
          </p>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}`}
      />
    </>
  )
}

// ─── SHEET EXAMPLES ───
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/Sheet'

function SheetExamples() {
  const [rightOpen, setRightOpen] = React.useState(false)
  const [bottomOpen, setBottomOpen] = React.useState(false)

  return (
    <>
      <ComponentExample
        title="Right sheet — settings panel"
        description="Slides in from the right — ideal for detail panels, filters, and settings"
        preview={
          <>
            <Button variant="secondary" onClick={() => setRightOpen(true)}>Open settings</Button>
            <Sheet open={rightOpen} onOpenChange={setRightOpen}>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Notification settings</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 p-4">
                  <p className="text-sm text-text-secondary">Choose which notifications you receive.</p>
                  <div className="space-y-3">
                    {['Email digest', 'Push notifications', 'Slack alerts', 'SMS alerts'].map(item => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">{item}</span>
                        <input type="checkbox" defaultChecked={item !== 'SMS alerts'} className="w-4 h-4 accent-accent-blue" />
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
        code={`import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Notification settings</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <p>Sheet content goes here</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}`}
      />

      <ComponentExample
        title="Bottom sheet — mobile action panel"
        description="Slides up from the bottom — common for mobile-style action menus"
        preview={
          <>
            <Button variant="secondary" onClick={() => setBottomOpen(true)}>Share document</Button>
            <Sheet open={bottomOpen} onOpenChange={setBottomOpen}>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Share</SheetTitle>
                </SheetHeader>
                <div className="p-4 space-y-2">
                  {['Copy link', 'Send via email', 'Export as PDF', 'Download'].map(action => (
                    <button
                      key={action}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                      onClick={() => setBottomOpen(false)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
        code={`import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Share</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Share</SheetTitle>
          </SheetHeader>
          <div className="p-4">
          <button onClick={() => setOpen(false)}>Copy link</button>
        </div>
      </Sheet>
    </>
  )
}`}
      />
    </>
  )
}

// ─── CONFIRM DIALOG EXAMPLES ───
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'

function ConfirmDialogExamples() {
  const [defaultOpen, setDefaultOpen] = React.useState(false)
  const [destructiveOpen, setDestructiveOpen] = React.useState(false)

  return (
    <>
      <ComponentExample
        title="Default confirmation"
        description="open, onConfirm, and onCancel are all required — ConfirmDialog is fully controlled"
        preview={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDefaultOpen(true)}>Publish changes</Button>
            <ConfirmDialog
              open={defaultOpen}
              onOpenChange={setDefaultOpen}
              title="Publish changes?"
              description="This will make your changes visible to all users immediately. You can revert later from the history panel."
              confirmLabel="Publish"
              cancelLabel="Keep editing"
              onConfirm={() => setDefaultOpen(false)}
              onCancel={() => setDefaultOpen(false)}
            />
          </>
        }
        code={`import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Publish changes</button>
      <ConfirmDialog
        open={open}
        title="Publish changes?"
        description="This will make your changes visible to all users."
        confirmLabel="Publish"
        cancelLabel="Keep editing"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}`}
      />

      <ComponentExample
        title="Destructive variant"
        description={'Use variant="destructive" to make the confirm button red — ideal for delete or reset flows'}
        preview={
          <>
            <Button variant="destructive" size="sm" onClick={() => setDestructiveOpen(true)}>Reset workspace</Button>
            <ConfirmDialog
              open={destructiveOpen}
              onOpenChange={setDestructiveOpen}
              title="Reset workspace?"
              description="All projects, members, and settings will be permanently deleted. This cannot be undone."
              confirmLabel="Reset everything"
              cancelLabel="Cancel"
              variant="destructive"
              onConfirm={() => setDestructiveOpen(false)}
              onCancel={() => setDestructiveOpen(false)}
            />
          </>
        }
        code={`import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Reset workspace</button>
      <ConfirmDialog
        open={open}
        title="Reset workspace?"
        description="This cannot be undone."
        confirmLabel="Reset everything"
        variant="destructive"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}`}
      />
    </>
  )
}

// ─── SELECT EXAMPLES ───
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/Select'

function SelectExamples() {
  const [role, setRole] = React.useState('')
  const [timezone, setTimezone] = React.useState('utc')

  return (
    <>
      <ComponentExample
        title="With placeholder"
        description="Compound API — SelectTrigger > SelectValue; options via SelectItem inside SelectContent"
        preview={
          <div className="w-full max-w-xs">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        code={`import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/Select'
import { useState } from 'react'

export function Example() {
  const [role, setRole] = useState('')

  return (
    <Select value={role} onValueChange={setRole}>
      <SelectTrigger>
        <SelectValue placeholder="Select a role…" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
      />

      <ComponentExample
        title="With default value and disabled option"
        description="Pass defaultValue for uncontrolled; disabled prop on SelectItem prevents selection"
        preview={
          <div className="w-full max-w-xs">
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="et">America/New_York (ET)</SelectItem>
                <SelectItem value="pt">America/Los_Angeles (PT)</SelectItem>
                <SelectItem value="gmt">Europe/London (GMT)</SelectItem>
                <SelectItem value="jst" disabled>Asia/Tokyo (JST) — coming soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        code={`import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/Select'
import { useState } from 'react'

export function Example() {
  const [timezone, setTimezone] = useState('utc')

  return (
    <Select value={timezone} onValueChange={setTimezone}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="utc">UTC</SelectItem>
        <SelectItem value="et">Eastern Time</SelectItem>
        <SelectItem value="pt">Pacific Time</SelectItem>
        <SelectItem value="jst" disabled>Asia/Tokyo — coming soon</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
      />
    </>
  )
}

// ─── COMBOBOX EXAMPLES ───
import { Combobox } from '../../components/ui/Combobox'

function ComboboxExamples() {
  return (
    <>
      <ComponentExample
        title="Searchable Combobox"
        description="Searchable dropdown select"
        preview={
          <Combobox
            items={[
              { label: 'React', value: 'react' },
              { label: 'Vue', value: 'vue' },
              { label: 'Svelte', value: 'svelte' },
              { label: 'Angular', value: 'angular' },
              { label: 'SolidJS', value: 'solid' },
            ]}
            placeholder="Pick a framework…"
            className="max-w-xs"
          />
        }
        code={`import { Combobox } from '@/components/ui/Combobox'

export function Example() {
  return (
    <Combobox
      items={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
      ]}
      placeholder="Pick a framework…"
    />
  )
}`}
      />
    </>
  )
}

// ─── SEARCH INPUT EXAMPLES ───
import { SearchInput } from '../../components/ui/SearchInput'

function SearchInputExamples() {
  const [search, setSearch] = React.useState('')
  const [compoundSearch, setCompoundSearch] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)

  const resources = [
    { label: 'Introduction to React', subtitle: 'Beginner · 2h', type: 'book' as const },
    { label: 'TypeScript Handbook', subtitle: 'Intermediate · 3h', type: 'course' as const },
    { label: 'Advanced Patterns', subtitle: 'Expert · 5h', type: 'paper' as const },
    { label: 'Smart Coder Labs', subtitle: 'smartcoder.io', type: 'website' as const },
  ]

  const filtered = resources.filter(r =>
    compoundSearch.length > 0 &&
    r.label.toLowerCase().includes(compoundSearch.toLowerCase())
  )

  return (
    <>
      <ComponentExample
        title="Simple mode"
        description="Drop-in search field with built-in clear button and loading state. No children required."
        preview={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search..."
            className="w-72"
          />
        }
        code={`import { SearchInput } from '@/components/ui/SearchInput'
import { useState } from 'react'

export function Example() {
  const [search, setSearch] = useState('')

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder="Search..."
    />
  )
}`}
      />

      <ComponentExample
        title="Compound mode — with dropdown"
        description="Pass children to take full control. Use SearchInput.Input for the field and SearchInput.Dropdown for the results panel."
        preview={
          <div className="w-80 relative">
            <SearchInput
              value={compoundSearch}
              onChange={setCompoundSearch}
              containerClassName="w-full"
            >
              <SearchInput.Input
                value={compoundSearch}
                onChange={(v) => { setCompoundSearch(v); setIsOpen(v.length > 0) }}
                onClear={() => { setCompoundSearch(''); setIsOpen(false) }}
                placeholder="Search resources..."
              />
              <SearchInput.Dropdown
                show={isOpen}
                hasResults={filtered.length > 0}
                query={compoundSearch}
              >
                {filtered.length > 0 && (
                  <SearchInput.Section title="Resources">
                    {filtered.map(r => (
                      <SearchInput.Item
                        key={r.label}
                        onClick={() => { setCompoundSearch(r.label); setIsOpen(false) }}
                      >
                        <SearchInput.ItemIcon type={r.type} />
                        <SearchInput.ItemContent label={r.label} subtitle={r.subtitle} />
                        <SearchInput.TrailingBadge variant="primary">{r.type}</SearchInput.TrailingBadge>
                      </SearchInput.Item>
                    ))}
                  </SearchInput.Section>
                )}
              </SearchInput.Dropdown>
            </SearchInput>
          </div>
        }
        code={`import { SearchInput } from '@/components/ui/SearchInput'
import { useState } from 'react'

const resources = [
  { label: 'Introduction to React', subtitle: 'Beginner · 2h', type: 'book' },
  { label: 'TypeScript Handbook', subtitle: 'Intermediate · 3h', type: 'course' },
  { label: 'Advanced Patterns', subtitle: 'Expert · 5h', type: 'paper' },
]

export function Example() {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filtered = resources.filter(r =>
    search.length > 0 && r.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <SearchInput value={search} onChange={setSearch}>
      <SearchInput.Input
        value={search}
        onChange={(v) => { setSearch(v); setIsOpen(v.length > 0) }}
        onClear={() => { setSearch(''); setIsOpen(false) }}
        placeholder="Search resources..."
      />
      <SearchInput.Dropdown show={isOpen} hasResults={filtered.length > 0} query={search}>
        {filtered.length > 0 && (
          <SearchInput.Section title="Resources">
            {filtered.map(r => (
              <SearchInput.Item key={r.label} onClick={() => { setSearch(r.label); setIsOpen(false) }}>
                <SearchInput.ItemIcon type={r.type} />
                <SearchInput.ItemContent label={r.label} subtitle={r.subtitle} />
                <SearchInput.TrailingBadge variant="primary">{r.type}</SearchInput.TrailingBadge>
              </SearchInput.Item>
            ))}
          </SearchInput.Section>
        )}
      </SearchInput.Dropdown>
    </SearchInput>
  )
}`}
      />
    </>
  )
}

// ─── DATE PICKER EXAMPLES ───
import { DatePicker } from '../../components/ui/DatePicker'

function DatePickerExamples() {
  const [date, setDate] = React.useState<Date | null>(null)
  return (
    <>
      <ComponentExample
        title="Date Picker"
        description="Select a specific date"
        preview={
          <div className="w-64">
            <DatePicker
              label="Event date"
              value={date ?? undefined}
              onChange={setDate}
              placeholder="Pick a date"
            />
          </div>
        }
        code={`import { DatePicker } from '@/components/ui/DatePicker'
import { useState } from 'react'

export function Example() {
  const [date, setDate] = useState<Date | null>(null)
  return (
    <DatePicker
      label="Event date"
      value={date ?? undefined}
      onChange={setDate}
      placeholder="Pick a date"
    />
  )
}`}
      />
    </>
  )
}

// ─── TIME PICKER EXAMPLES ───
import { TimePicker } from '../../components/ui/TimePicker'

function TimePickerExamples() {
  return (
    <>
      <ComponentExample
        title="Time Picker"
        description="Select a specific time"
        preview={
          <div className="w-64">
            <TimePicker
              label="Meeting time"
              value="09:30"
              format="12h"
              step={15}
            />
          </div>
        }
        code={`import { TimePicker } from '@/components/ui/TimePicker'
import { useState } from 'react'

export function Example() {
  const [time, setTime] = useState('09:30')
  return (
    <TimePicker
      label="Meeting time"
      value={time}
      onChange={setTime}
      format="12h"
      step={15}
    />
  )
}`}
      />
    </>
  )
}

// ─── DEFAULT EXAMPLE ───

function DefaultExample({ componentName }: { componentName: string }) {
  return (
    <div className="p-8 rounded-lg bg-surface-secondary border border-border-primary text-center">
      <Text color="secondary">
        Examples for <span className="font-medium">{componentName}</span> component coming soon.
      </Text>
    </div>
  )
}

// ─── PROGRESS EXAMPLES ───
import { Progress } from '../../components/ui/Progress'

function ProgressExamples() {
  const [upload, setUpload] = React.useState(0)
  React.useEffect(() => {
    if (upload >= 100) return
    const t = setInterval(() => setUpload((v) => Math.min(v + 2, 100)), 80)
    return () => clearInterval(t)
  }, [upload])
  return (
    <>
      <ComponentExample
        title="Labeled progress bars"
        description="Pair each bar with a label and value for clarity — storage, tasks, quotas"
        preview={
          <div className="space-y-4 w-full max-w-md">
            {[
              { label: 'Storage', value: 68, sub: '6.8 GB of 10 GB used' },
              { label: 'Tasks complete', value: 42, sub: '21 of 50 tasks done' },
              { label: 'Profile', value: 90, sub: 'Almost there!' },
              { label: 'Quota', value: 100, sub: 'Limit reached' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary font-medium">{label}</span>
                  <span className="text-text-secondary">{value}%</span>
                </div>
                <Progress value={value} />
                <p className="text-xs text-text-secondary">{sub}</p>
              </div>
            ))}
          </div>
        }
        code={`import { Progress } from '@/components/ui/Progress'

const items = [
  { label: 'Storage', value: 68, sub: '6.8 GB of 10 GB used' },
  { label: 'Tasks complete', value: 42, sub: '21 of 50 tasks done' },
]

export function Example() {
  return (
    <div className="space-y-4">
      {items.map(({ label, value, sub }) => (
        <div key={label} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{label}</span>
            <span className="text-text-secondary">{value}%</span>
          </div>
          <Progress value={value} />
          <p className="text-xs text-text-secondary">{sub}</p>
        </div>
      ))}
    </div>
  )
}`}
      />

      <ComponentExample
        title="Animated upload"
        description="Drive value from state to animate — Progress responds to changes automatically"
        preview={
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-primary font-medium">Uploading file…</span>
              <span className="text-text-secondary">{upload}%</span>
            </div>
            <Progress value={upload} />
            {upload === 100 && (
              <div className="flex items-center gap-2 text-sm text-status-success">
                <span>Upload complete</span>
              </div>
            )}
            {upload < 100 && (
              <button
                className="text-xs text-text-secondary underline"
                onClick={() => setUpload(0)}
              >
                Reset
              </button>
            )}
          </div>
        }
        code={`import { Progress } from '@/components/ui/Progress'
import { useState, useEffect } from 'react'

export function Example() {
  const [upload, setUpload] = useState(0)
  useEffect(() => {
    if (upload >= 100) return
    const t = setInterval(() => setUpload((v) => Math.min(v + 2, 100)), 80)
    return () => clearInterval(t)
  }, [upload])

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading…</span>
        <span>{upload}%</span>
      </div>
      <Progress value={upload} />
      {upload === 100 && <p className="text-status-success text-sm">Done!</p>}
    </div>
  )
}`}
      />
    </>
  )
}

// ─── CAPTION EXAMPLES ───
import { Caption } from '../../components/ui/Caption'

function CaptionExamples() {
  return (
    <>
      <ComponentExample
        title="Caption Text"
        description="Small caption text for media and tables"
        preview={
          <div className="space-y-4 max-w-sm">
            <div>
              <div className="h-24 bg-surface-secondary rounded-lg mb-2" />
              <Caption>Figure 1: An example image caption</Caption>
            </div>
          </div>
        }
        code={`import { Caption } from '@/components/ui/Caption'

export function Example() {
  return (
    <div>
      <img src="..." alt="Example" />
      <Caption>Figure 1: An example image caption</Caption>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── BUTTON WITH DROPDOWN EXAMPLES ───
import { ButtonWithDropdown } from '../../components/ui/ButtonWithDropdown'

function ButtonWithDropdownExamples() {
  return (
    <>
      <ComponentExample
        title="Button with Dropdown"
        description="Button with an attached dropdown menu"
        preview={
          <ButtonWithDropdown
            label="Actions"
            actions={[
              { label: 'Edit', onClick: () => {} },
              { label: 'Duplicate', onClick: () => {} },
              { label: 'Delete', onClick: () => {} },
            ]}
          />
        }
        code={`import { ButtonWithDropdown } from '@/components/ui/ButtonWithDropdown'

export function Example() {
  return (
    <ButtonWithDropdown
      label="Actions"
      actions={[
        { label: 'Edit', onClick: () => {} },
        { label: 'Duplicate', onClick: () => {} },
        { label: 'Delete', onClick: () => {} },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── CONTROL CENTER TOGGLES EXAMPLES ───
import { ControlCenterToggles } from '../../components/ui/ControlCenterToggles'
import { Wifi, Bluetooth, Moon } from 'lucide-react'

function ControlCenterTogglesExamples() {
  const [controls, setControls] = React.useState([
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-5 h-5" />, enabled: true, onToggle: (v: boolean) => {} },
    { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth className="w-5 h-5" />, enabled: false, onToggle: (v: boolean) => {} },
    { id: 'darkmode', label: 'Dark Mode', icon: <Moon className="w-5 h-5" />, enabled: true, onToggle: (v: boolean) => {} },
  ])

  return (
    <>
      <ComponentExample
        title="Control Center Toggles"
        description="iOS-style control center toggles"
        preview={
          <ControlCenterToggles
            controls={controls.map(c => ({
              ...c,
              onToggle: (v: boolean) => setControls(prev => prev.map(p => p.id === c.id ? { ...p, enabled: v } : p))
            }))}
          />
        }
        code={`import { ControlCenterToggles } from '@/components/ui/ControlCenterToggles'
import { Wifi, Bluetooth, Moon } from 'lucide-react'

export function Example() {
  return (
    <ControlCenterToggles
      controls={[
        { id: 'wifi', label: 'Wi-Fi', icon: <Wifi />, enabled: true, onToggle: () => {} },
        { id: 'bt', label: 'Bluetooth', icon: <Bluetooth />, enabled: false, onToggle: () => {} },
        { id: 'dark', label: 'Dark Mode', icon: <Moon />, enabled: true, onToggle: () => {} },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── DATE RANGE PICKER EXAMPLES ───
import { DateRangePicker } from '../../components/ui/DateRangePicker'

function DateRangePickerExamples() {
  return (
    <>
      <ComponentExample
        title="Date Range Picker"
        description="Select a start and end date range"
        preview={<DateRangePicker label="Select date range" />}
        code={`import { DateRangePicker } from '@/components/ui/DateRangePicker'

export function Example() {
  return <DateRangePicker label="Select date range" />
}`}
      />
    </>
  )
}

// ─── FAB EXAMPLES ───
import { FAB } from '../../components/ui/FAB'
import { Plus } from 'lucide-react'

function FABExamples() {
  return (
    <>
      <ComponentExample
        title="Floating Action Button"
        description="FAB with different variants"
        preview={
          <div className="flex gap-4 items-center">
            <FAB position="none" icon={Plus} variant="primary" />
            <FAB position="none" icon={Plus} variant="secondary" />
            <FAB position="none" label="Create" icon={Plus} variant="primary" />
          </div>
        }
        code={`import { FAB } from '@/components/ui/FAB'
import { Plus } from 'lucide-react'

export function Example() {
  return <FAB position="none" icon={Plus} label="Create" />
}`}
      />
    </>
  )
}

// ─── FAB GROUP EXAMPLES ───
import { FABGroup } from '../../components/ui/FABGroup'

function FABGroupExamples() {
  return (
    <>
      <ComponentExample
        title="FAB Group"
        description="Expandable floating action button group"
        preview={
          <div className="relative h-48 w-full border border-border-primary rounded-xl overflow-hidden bg-surface-secondary">
            <p className="absolute top-4 left-4 text-sm text-text-secondary">Click the + button</p>
            <FABGroup
              position="bottom-right"
              actions={[
                { icon: Plus, label: 'New document', onClick: () => {} },
                { icon: Heart, label: 'Add to favorites', onClick: () => {}, variant: 'secondary' },
                { icon: Settings, label: 'Settings', onClick: () => {}, variant: 'tertiary' },
              ]}
            />
          </div>
        }
        code={`import { FABGroup } from '@/components/ui/FABGroup'
import { Plus, Heart, Settings } from 'lucide-react'

export function Example() {
  return (
    <FABGroup
      position="bottom-right"
      actions={[
        { icon: Plus, label: 'New document', onClick: () => {} },
        { icon: Heart, label: 'Favorite', onClick: () => {}, variant: 'secondary' },
        { icon: Settings, label: 'Settings', onClick: () => {}, variant: 'tertiary' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── HAPTIC BUTTON EXAMPLES ───
import { HapticButton } from '../../components/ui/HapticButton'

function HapticButtonExamples() {
  return (
    <>
      <ComponentExample
        title="Haptic Button"
        description="Button with haptic feedback on supported devices"
        preview={
          <div className="flex gap-3 flex-wrap">
            <HapticButton variant="primary" hapticFeedback="light">Light</HapticButton>
            <HapticButton variant="secondary" hapticFeedback="medium">Medium</HapticButton>
            <HapticButton variant="destructive" hapticFeedback="heavy">Heavy</HapticButton>
          </div>
        }
        code={`import { HapticButton } from '@/components/ui/HapticButton'

export function Example() {
  return (
    <div className="flex gap-3">
      <HapticButton variant="primary" hapticFeedback="light">Light</HapticButton>
      <HapticButton variant="secondary" hapticFeedback="medium">Medium</HapticButton>
      <HapticButton variant="destructive" hapticFeedback="heavy">Heavy</HapticButton>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── ICON BUTTON EXAMPLES ───
import { IconButton } from '../../components/ui/IconButton'
import { Heart, Trash2, Settings } from 'lucide-react'

function IconButtonExamples() {
  return (
    <>
      <ComponentExample
        title="Icon Button Variants"
        description="Compact icon-only buttons"
        preview={
          <div className="flex gap-3 items-center flex-wrap">
            <IconButton icon={Heart} aria-label="Like" variant="primary" />
            <IconButton icon={Settings} aria-label="Settings" variant="secondary" />
            <IconButton icon={Trash2} aria-label="Delete" variant="danger" />
            <IconButton icon={Settings} aria-label="Ghost" variant="ghost" />
          </div>
        }
        code={`import { IconButton } from '@/components/ui/IconButton'
import { Heart, Trash2, Settings } from 'lucide-react'

export function Example() {
  return (
    <div className="flex gap-3 items-center">
      <IconButton icon={Heart} aria-label="Like" variant="primary" />
      <IconButton icon={Settings} aria-label="Settings" variant="secondary" />
      <IconButton icon={Trash2} aria-label="Delete" variant="danger" />
    </div>
  )
}`}
      />
    </>
  )
}

// ─── OTP INPUT EXAMPLES ───
import { OTPInput } from '../../components/ui/OTPInput'

function OTPInputExamples() {
  const [otp, setOtp] = React.useState('')
  const [verified, setVerified] = React.useState(false)
  const [errorOtp, setErrorOtp] = React.useState('123')
  return (
    <>
      <ComponentExample
        title="Basic — with onComplete callback"
        description="Auto-advances focus between cells. onComplete fires when all digits are filled."
        preview={
          <div className="space-y-3">
            <OTPInput
              length={6}
              value={otp}
              onChange={setOtp}
              onComplete={(v) => setVerified(v.length === 6)}
            />
            {verified && (
              <p className="text-sm text-status-success font-medium">Code accepted</p>
            )}
            {!verified && otp.length > 0 && otp.length < 6 && (
              <p className="text-sm text-text-secondary">{6 - otp.length} digits remaining</p>
            )}
          </div>
        }
        code={`import { OTPInput } from '@/components/ui/OTPInput'
import { useState } from 'react'

export function Example() {
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)
  return (
    <div className="space-y-3">
      <OTPInput
        length={6}
        value={otp}
        onChange={setOtp}
        onComplete={() => setVerified(true)}
      />
      {verified && <p className="text-status-success">Code accepted</p>}
    </div>
  )
}`}
      />

      <ComponentExample
        title="Error state"
        description="Pass error={true} to highlight all cells in red — use after a failed verification"
        preview={
          <div className="space-y-3">
            <OTPInput
              length={6}
              value={errorOtp}
              onChange={setErrorOtp}
              error
            />
            <p className="text-sm text-status-error">Invalid code — please try again.</p>
          </div>
        }
        code={`import { OTPInput } from '@/components/ui/OTPInput'
import { useState } from 'react'

export function Example() {
  const [otp, setOtp] = useState('')
  const [hasError, setHasError] = useState(false)

  const verify = () => {
    if (otp !== '123456') setHasError(true)
  }

  return (
    <div className="space-y-3">
      <OTPInput length={6} value={otp} onChange={setOtp} error={hasError} />
      {hasError && (
        <p className="text-sm text-status-error">Invalid code — please try again.</p>
      )}
    </div>
  )
}`}
      />
    </>
  )
}

// ─── PASSWORD INPUT EXAMPLES ───
import { PasswordInput } from '../../components/ui/PasswordInput'

function PasswordInputExamples() {
  const [password, setPassword] = React.useState('')
  return (
    <>
      <ComponentExample
        title="Password Input"
        description="Password field with visibility toggle and strength meter"
        preview={
          <PasswordInput
            label="Password"
            value={password}
            onChange={setPassword}
            showStrengthMeter
            className="max-w-sm"
          />
        }
        code={`import { PasswordInput } from '@/components/ui/PasswordInput'
import { useState } from 'react'

export function Example() {
  const [password, setPassword] = useState('')
  return (
    <PasswordInput
      label="Password"
      value={password}
      onChange={setPassword}
      showStrengthMeter
    />
  )
}`}
      />
    </>
  )
}

// ─── PEER TAG INPUT EXAMPLES ───
import { PeerTagInput } from '../../components/ui/PeerTagInput'

function PeerTagInputExamples() {
  return (
    <>
      <ComponentExample
        title="Peer Tag Input"
        description="Tag input with autocomplete for peers"
        preview={
          <PeerTagInput
            contacts={[
              { id: '1', tag: '@alice', name: 'Alice Martin' },
              { id: '2', tag: '@bob', name: 'Bob Chen' },
              { id: '3', tag: '@clara', name: 'Clara Diaz' },
              { id: '4', tag: '@dan', name: 'Dan Wright' },
            ]}
            className="max-w-sm"
          />
        }
        code={`import { PeerTagInput } from '@/components/ui/PeerTagInput'

export function Example() {
  return (
    <PeerTagInput
      contacts={[
        { tag: '@alice', name: 'Alice Martin' },
        { tag: '@bob', name: 'Bob Chen' },
        { tag: '@clara', name: 'Clara Diaz' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── QUANTITY SELECTOR EXAMPLES ───
import { QuantitySelector } from '../../components/ui/QuantitySelector'

function QuantitySelectorExamples() {
  const [qty, setQty] = React.useState(1)
  return (
    <>
      <ComponentExample
        title="Quantity Selector"
        description="Numeric stepper with min/max bounds"
        preview={
          <QuantitySelector
            value={qty}
            onChange={setQty}
            min={1}
            max={10}
          />
        }
        code={`import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { useState } from 'react'

export function Example() {
  const [qty, setQty] = useState(1)
  return (
    <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
  )
}`}
      />
    </>
  )
}

// ─── RATING INPUT EXAMPLES ───
import { RatingInput } from '../../components/ui/RatingInput'

function RatingInputExamples() {
  const [rating, setRating] = React.useState(3)
  return (
    <>
      <ComponentExample
        title="Star Rating"
        description="Interactive star rating input"
        preview={
          <RatingInput
            value={rating}
            onChange={setRating}
            label="Rate this product"
          />
        }
        code={`import { RatingInput } from '@/components/ui/RatingInput'
import { useState } from 'react'

export function Example() {
  const [rating, setRating] = useState(3)
  return (
    <RatingInput value={rating} onChange={setRating} label="Rate this" />
  )
}`}
      />
    </>
  )
}

// ─── ROTARY SELECTOR EXAMPLES ───
import { RotarySelector } from '../../components/ui/RotarySelector'

function RotarySelectorExamples() {
  const [speed, setSpeed] = React.useState<string | number>('medium')
  return (
    <>
      <ComponentExample
        title="Rotary Selector"
        description="Circular dial for value selection"
        preview={
          <RotarySelector
            options={[
              { id: 'slow', label: 'Slow', value: 'slow' },
              { id: 'medium', label: 'Medium', value: 'medium' },
              { id: 'fast', label: 'Fast', value: 'fast' },
              { id: 'max', label: 'Max', value: 'max' },
            ]}
            value={speed}
            onChange={(val) => setSpeed(val)}
            showLabel
          />
        }
        code={`import { RotarySelector } from '@/components/ui/RotarySelector'
import { useState } from 'react'

export function Example() {
  const [speed, setSpeed] = useState('medium')
  return (
    <RotarySelector
      options={[
        { id: 'slow', label: 'Slow', value: 'slow' },
        { id: 'medium', label: 'Medium', value: 'medium' },
        { id: 'fast', label: 'Fast', value: 'fast' },
      ]}
      value={speed}
      onChange={setSpeed}
      showLabel
    />
  )
}`}
      />
    </>
  )
}

// ─── SEGMENTED INPUT EXAMPLES ───
import { SegmentedInput } from '../../components/ui/SegmentedInput'

function SegmentedInputExamples() {
  const [val, setVal] = React.useState('')
  return (
    <>
      <ComponentExample
        title="Segmented Input"
        description="iOS-style segmented character input"
        preview={<SegmentedInput length={4} value={val} onChange={setVal} />}
        code={`import { SegmentedInput } from '@/components/ui/SegmentedInput'
import { useState } from 'react'

export function Example() {
  const [val, setVal] = useState('')
  return <SegmentedInput length={4} value={val} onChange={setVal} />
}`}
      />
    </>
  )
}

// ─── SIGNATURE PAD EXAMPLES ───
import { SignaturePad } from '../../components/ui/SignaturePad'

function SignaturePadExamples() {
  return (
    <>
      <ComponentExample
        title="Signature Pad"
        description="Canvas-based signature input"
        preview={
          <SignaturePad
            height={160}
            penColor="#007AFF"
            backgroundColor="#F5F5F7"
            strokeWidth={2}
            onEnd={(dataUrl) => console.log('Signature captured', dataUrl.length)}
            className="w-full rounded-xl"
          />
        }
        code={`import { SignaturePad } from '@/components/ui/SignaturePad'

export function Example() {
  return (
    <SignaturePad
      height={160}
      penColor="#007AFF"
      strokeWidth={2}
      onEnd={(dataUrl) => console.log('Signature:', dataUrl)}
    />
  )
}`}
      />
    </>
  )
}

// ─── SPLIT BUTTON EXAMPLES ───
import { SplitButton } from '../../components/ui/SplitButton'

function SplitButtonExamples() {
  return (
    <>
      <ComponentExample
        title="Split Button"
        description="Primary action button with dropdown"
        preview={
          <SplitButton
            label="Save"
            onClick={() => {}}
            actions={[
              { label: 'Save as Draft', onClick: () => {} },
              { label: 'Save & Publish', onClick: () => {} },
            ]}
          />
        }
        code={`import { SplitButton } from '@/components/ui/SplitButton'

export function Example() {
  return (
    <SplitButton
      label="Save"
      onClick={() => {}}
      actions={[
        { label: 'Save as Draft', onClick: () => {} },
        { label: 'Save & Publish', onClick: () => {} },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── LAYOUT EXAMPLES ───
import { Footer, FooterTop, FooterContent, FooterColumn, FooterLink, FooterBottom } from '../../components/ui/Footer'
import { GridContainer, Row, Col } from '../../components/ui/GridSystem'
import { Stack, HStack, VStack, Grid } from '../../components/ui/Layout'
import { MasonryLayout } from '../../components/ui/MasonryLayout'
import { Panel } from '../../components/ui/Panel'
import { ResizablePanel } from '../../components/ui/ResizablePanel'
import { SplitView } from '../../components/ui/SplitView'
import { StickyContainer } from '../../components/ui/StickyContainer'
import { WindowControls } from '../../components/ui/WindowControls'
import { WindowFrame } from '../../components/ui/WindowFrame'

function FooterExamples() {
  return (
    <>
      <ComponentExample
        title="Footer"
        description="Site-wide footer component"
        preview={
          <Footer>
            <FooterContent>
              <FooterColumn title="Product">
                <FooterLink href="#">Features</FooterLink>
                <FooterLink href="#">Pricing</FooterLink>
                <FooterLink href="#">Changelog</FooterLink>
              </FooterColumn>
              <FooterColumn title="Company">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
              </FooterColumn>
              <FooterColumn title="Legal">
                <FooterLink href="#">Privacy</FooterLink>
                <FooterLink href="#">Terms</FooterLink>
              </FooterColumn>
            </FooterContent>
            <FooterBottom>
              <span className="text-sm text-text-tertiary">© 2025 Acme Inc. All rights reserved.</span>
            </FooterBottom>
          </Footer>
        }
        code={`import { Footer, FooterContent, FooterColumn, FooterLink, FooterBottom } from '@/components/ui/Footer'

export function Example() {
  return (
    <Footer>
      <FooterContent>
        <FooterColumn title="Product">
          <FooterLink href="#">Features</FooterLink>
          <FooterLink href="#">Pricing</FooterLink>
        </FooterColumn>
        <FooterColumn title="Company">
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </FooterColumn>
      </FooterContent>
      <FooterBottom>
        <span>© 2025 Acme Inc.</span>
      </FooterBottom>
    </Footer>
  )
}`}
      />
    </>
  )
}

function GridSystemExamples() {
  return (
    <>
      <ComponentExample
        title="Grid System"
        description="Responsive column grid"
        preview={
          <GridContainer>
            <Row gutterX={4}>
              {[1, 2, 3].map(i => (
                <Col key={i} md={4}>
                  <div className="h-16 bg-surface-secondary rounded-lg flex items-center justify-center text-sm text-text-secondary">Col {i}</div>
                </Col>
              ))}
            </Row>
          </GridContainer>
        }
        code={`import { GridContainer, Row, Col } from '@/components/ui/GridSystem'

export function Example() {
  return (
    <GridContainer>
      <Row>
        <Col md={4}><div>Col 1</div></Col>
        <Col md={4}><div>Col 2</div></Col>
        <Col md={4}><div>Col 3</div></Col>
      </Row>
    </GridContainer>
  )
}`}
      />
    </>
  )
}

function LayoutExamples() {
  return (
    <>
      <ComponentExample
        title="VStack & HStack"
        description="Vertical and horizontal stack layout primitives"
        preview={
          <div className="space-y-4 w-full max-w-sm">
            <VStack gap={2}>
              <div className="w-full h-8 rounded bg-accent-blue/20 flex items-center justify-center text-xs text-text-secondary">Item 1</div>
              <div className="w-full h-8 rounded bg-accent-blue/20 flex items-center justify-center text-xs text-text-secondary">Item 2</div>
              <div className="w-full h-8 rounded bg-accent-blue/20 flex items-center justify-center text-xs text-text-secondary">Item 3</div>
            </VStack>
            <HStack gap={2}>
              <div className="flex-1 h-8 rounded bg-accent-blue/30 flex items-center justify-center text-xs text-text-secondary">A</div>
              <div className="flex-1 h-8 rounded bg-accent-blue/30 flex items-center justify-center text-xs text-text-secondary">B</div>
              <div className="flex-1 h-8 rounded bg-accent-blue/30 flex items-center justify-center text-xs text-text-secondary">C</div>
            </HStack>
          </div>
        }
        code={`import { VStack, HStack, Grid } from '@/components/ui/Layout'

export function Example() {
  return (
    <VStack gap={2}>
      <div>Item 1</div>
      <div>Item 2</div>
      <HStack gap={2}>
        <div>A</div>
        <div>B</div>
      </HStack>
    </VStack>
  )
}`}
      />
      <ComponentExample
        title="Grid"
        description="Responsive grid layout"
        preview={
          <Grid columns={3} gap={2} className="w-full max-w-sm">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-12 rounded bg-accent-blue/20 flex items-center justify-center text-xs text-text-secondary">{i}</div>
            ))}
          </Grid>
        }
        code={`import { Grid } from '@/components/ui/Layout'

export function Example() {
  return (
    <Grid columns={3} gap={2}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Grid>
  )
}`}
      />
    </>
  )
}

function MasonryLayoutExamples() {
  return (
    <>
      <ComponentExample
        title="Masonry Layout"
        description="Pinterest-style masonry grid"
        preview={
          <MasonryLayout columns={3} gap={12}>
            {[
              { h: 'h-24', label: 'Card A' },
              { h: 'h-40', label: 'Card B' },
              { h: 'h-32', label: 'Card C' },
              { h: 'h-48', label: 'Card D' },
              { h: 'h-28', label: 'Card E' },
              { h: 'h-36', label: 'Card F' },
            ].map((item, i) => (
              <div key={i} className={`${item.h} rounded-xl bg-surface-secondary border border-border-primary flex items-center justify-center text-sm text-text-secondary`}>
                {item.label}
              </div>
            ))}
          </MasonryLayout>
        }
        code={`import { MasonryLayout } from '@/components/ui/MasonryLayout'

export function Example() {
  return (
    <MasonryLayout columns={3} gap={12}>
      <div className="h-24 rounded-xl bg-surface-secondary">Card A</div>
      <div className="h-40 rounded-xl bg-surface-secondary">Card B</div>
      <div className="h-32 rounded-xl bg-surface-secondary">Card C</div>
    </MasonryLayout>
  )
}`}
      />
    </>
  )
}

function PanelExamples() {
  return (
    <>
      <ComponentExample
        title="Panel"
        description="Surface panel with title and body"
        preview={<Panel title="Panel Title"><Text color="secondary" variant="small">Panel content area</Text></Panel>}
        code={`import { Panel } from '@/components/ui/Panel'

export function Example() {
  return (
    <Panel title="Panel Title">
      Panel content area
    </Panel>
  )
}`}
      />
    </>
  )
}

function ResizablePanelExamples() {
  return (
    <>
      <ComponentExample
        title="Resizable Panel"
        description="Panel with draggable resize handle"
        preview={
          <ResizablePanel initialSize="260px" minSize={120} maxSize={500} direction="horizontal">
            <div className="h-32 p-4 bg-surface-secondary flex items-center justify-center text-sm text-text-secondary rounded-lg">
              Drag the handle to resize
            </div>
          </ResizablePanel>
        }
        code={`import { ResizablePanel } from '@/components/ui/ResizablePanel'

export function Example() {
  return (
    <ResizablePanel initialSize="260px" minSize={120} maxSize={500} direction="horizontal">
      <div>Drag the handle to resize</div>
    </ResizablePanel>
  )
}`}
      />
    </>
  )
}

function SidebarExamples() {
  return (
    <>
      <ComponentExample
        title="Sidebar"
        description="Collapsible navigation sidebar"
        preview={
          <div className="p-4 bg-surface-secondary rounded-lg text-sm text-text-secondary">
            Sidebar renders as a navigation component. Integrate with your app's navigation structure.
          </div>
        }
        code={`import { Sidebar } from '@/components/ui/Sidebar'

export function Example() {
  return <Sidebar />
}`}
      />
    </>
  )
}

function SplitViewExamples() {
  return (
    <>
      <ComponentExample
        title="Split View"
        description="Two-pane layout with adjustable split"
        preview={
          <SplitView
            initialLeftSize="180px"
            minLeftSize={100}
            maxLeftSize={320}
            left={
              <div className="h-full p-3 space-y-1">
                {['Documents', 'Images', 'Videos', 'Downloads'].map(item => (
                  <div key={item} className="px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:bg-surface-secondary cursor-pointer">{item}</div>
                ))}
              </div>
            }
            right={
              <div className="h-full p-4 flex items-center justify-center text-sm text-text-tertiary">
                Select a folder to view contents
              </div>
            }
            className="h-48"
          />
        }
        code={`import { SplitView } from '@/components/ui/SplitView'

export function Example() {
  return (
    <SplitView
      initialLeftSize="200px"
      left={<div>Sidebar content</div>}
      right={<div>Main content</div>}
    />
  )
}`}
      />
    </>
  )
}

function StickyContainerExamples() {
  return (
    <>
      <ComponentExample
        title="Sticky Container"
        description="Sticky element within a scroll parent"
        preview={<StickyContainer><div className="p-3 bg-accent-blue/10 rounded-lg text-sm text-text-primary">Sticky header content</div></StickyContainer>}
        code={`import { StickyContainer } from '@/components/ui/StickyContainer'

export function Example() {
  return (
    <StickyContainer>
      <div>Sticky content</div>
    </StickyContainer>
  )
}`}
      />
    </>
  )
}

function WindowControlsExamples() {
  return (
    <>
      <ComponentExample
        title="Window Controls"
        description="macOS traffic-light window control buttons"
        preview={
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-surface-secondary rounded-xl flex items-center gap-3">
              <WindowControls variant="macos" onClose={() => {}} onMinimize={() => {}} onMaximize={() => {}} />
              <span className="text-xs text-text-secondary ml-2">macOS style</span>
            </div>
            <div className="p-3 bg-surface-secondary rounded-xl flex items-center gap-3">
              <WindowControls variant="windows" onClose={() => {}} onMinimize={() => {}} onMaximize={() => {}} />
              <span className="text-xs text-text-secondary ml-2">Windows style</span>
            </div>
          </div>
        }
        code={`import { WindowControls } from '@/components/ui/WindowControls'

export function Example() {
  return (
    <WindowControls
      variant="macos"
      onClose={() => {}}
      onMinimize={() => {}}
      onMaximize={() => {}}
    />
  )
}`}
      />
    </>
  )
}

function WindowFrameExamples() {
  return (
    <>
      <ComponentExample
        title="Window Frame"
        description="macOS-style window frame with title bar"
        preview={<WindowFrame title="My App"><div className="p-4 text-sm text-text-secondary">Window content area</div></WindowFrame>}
        code={`import { WindowFrame } from '@/components/ui/WindowFrame'

export function Example() {
  return (
    <WindowFrame title="My App">
      Window content
    </WindowFrame>
  )
}`}
      />
    </>
  )
}

// ─── TYPOGRAPHY EXAMPLES ───
import { DefinitionList } from '../../components/ui/DefinitionList'
import { DescriptionBlock } from '../../components/ui/DescriptionBlock'
import { KeyValueInfo } from '../../components/ui/KeyValueInfo'
import { PropertyList } from '../../components/ui/PropertyList'
import { SectionHeader } from '../../components/ui/SectionHeader'
// Note: Text and Title are already imported at the top of this file

function DefinitionListExamples() {
  return (
    <>
      <ComponentExample
        title="Definition List"
        description="Term-definition pairs in a structured list"
        preview={
          <DefinitionList
            items={[
              { term: 'API', description: 'Application Programming Interface' },
              { term: 'UI', description: 'User Interface' },
              { term: 'UX', description: 'User Experience' },
            ]}
          />
        }
        code={`import { DefinitionList } from '@/components/ui/DefinitionList'

export function Example() {
  return (
    <DefinitionList items={[
      { term: 'API', description: 'Application Programming Interface' },
      { term: 'UI', description: 'User Interface' },
    ]} />
  )
}`}
      />
    </>
  )
}

function DescriptionBlockExamples() {
  return (
    <>
      <ComponentExample
        title="Description Block"
        description="Label and value pair block for detail views"
        preview={<DescriptionBlock title="Premium Plan" subtitle="Billed annually" description="Includes unlimited access to all features." />}
        code={`import { DescriptionBlock } from '@/components/ui/DescriptionBlock'

export function Example() {
  return (
    <DescriptionBlock
      title="Premium Plan"
      subtitle="Billed annually"
      description="Includes unlimited access to all features."
    />
  )
}`}
      />
    </>
  )
}

function KeyValueInfoExamples() {
  return (
    <>
      <ComponentExample
        title="Key Value Info"
        description="Key-value pair row with label and value"
        preview={
          <KeyValueInfo
            items={[
              { key: 'Status', value: 'Active' },
              { key: 'Plan', value: 'Pro' },
              { key: 'Joined', value: 'Jan 2024' },
            ]}
          />
        }
        code={`import { KeyValueInfo } from '@/components/ui/KeyValueInfo'

export function Example() {
  return (
    <KeyValueInfo items={[
      { key: 'Status', value: 'Active' },
      { key: 'Plan', value: 'Pro' },
    ]} />
  )
}`}
      />
    </>
  )
}

function PropertyListExamples() {
  return (
    <>
      <ComponentExample
        title="Property List"
        description="Vertical list of property-value pairs"
        preview={
          <PropertyList
            sections={[{
              id: 'meta',
              items: [
                { label: 'Version', value: '1.0.0' },
                { label: 'License', value: 'MIT' },
                { label: 'Author', value: 'Smart Coder Labs' },
              ]
            }]}
          />
        }
        code={`import { PropertyList } from '@/components/ui/PropertyList'

export function Example() {
  return (
    <PropertyList sections={[{
      id: 'meta',
      items: [
        { label: 'Version', value: '1.0.0' },
        { label: 'License', value: 'MIT' },
      ]
    }]} />
  )
}`}
      />
    </>
  )
}

function SectionHeaderExamples() {
  return (
    <>
      <ComponentExample
        title="Section Header"
        description="Section heading with subtitle and trailing action"
        preview={<SectionHeader title="Recent Activity" description="Last 30 days" />}
        code={`import { SectionHeader } from '@/components/ui/SectionHeader'

export function Example() {
  return (
    <SectionHeader title="Recent Activity" description="Last 30 days" />
  )
}`}
      />
    </>
  )
}

function TextExamples() {
  return (
    <>
      <ComponentExample
        title="Text Variants"
        description="Body, lead, small and tiny text sizes"
        preview={
          <div className="space-y-3 max-w-sm">
            <Text variant="lead">Lead text — larger body for introductions</Text>
            <Text>Default body text — the standard paragraph size</Text>
            <Text variant="small" color="secondary">Small text — secondary information</Text>
            <Text variant="tiny" color="tertiary">Tiny text — captions and metadata</Text>
          </div>
        }
        code={`import { Text } from '@/components/ui/Text'

export function Example() {
  return (
    <div className="space-y-3">
      <Text variant="lead">Lead text</Text>
      <Text>Default body text</Text>
      <Text variant="small" color="secondary">Small text</Text>
      <Text variant="tiny" color="tertiary">Tiny text</Text>
    </div>
  )
}`}
      />
    </>
  )
}

function TitleExamples() {
  return (
    <>
      <ComponentExample
        title="Title Levels"
        description="Semantic headings h1–h4"
        preview={
          <div className="space-y-3">
            <Title level={1}>Heading 1</Title>
            <Title level={2}>Heading 2</Title>
            <Title level={3}>Heading 3</Title>
            <Title level={4}>Heading 4</Title>
          </div>
        }
        code={`import { Title } from '@/components/ui/Title'

export function Example() {
  return (
    <div className="space-y-3">
      <Title level={1}>Heading 1</Title>
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
    </div>
  )
}`}
      />
    </>
  )
}

// ─── NAVIGATION EXAMPLES ───
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as BreadcrumbItemComp,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/Breadcrumb'
import { BreadcrumbTabsHybrid } from '../../components/ui/BreadcrumbTabsHybrid'
import { BottomNavigation } from '../../components/ui/BottomNavigation'
import { CommandMenu } from '../../components/ui/CommandMenu'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuLabel } from '../../components/ui/ContextMenu'
import { DockBar } from '../../components/ui/DockBar'
import { HamburgerMenuIcon } from '../../components/ui/HamburgerMenuIcon'
import { MenuBar } from '../../components/ui/MenuBar'
import { NavBar, NavBarBrand, NavBarContent, NavBarItem } from '../../components/ui/NavBar'
import { NavigationDrawer } from '../../components/ui/NavigationDrawer'
import { Pagination } from '../../components/ui/Pagination'
import { TopActionBar } from '../../components/ui/TopActionBar'

function BottomNavigationExamples() {
  const [activeTab, setActiveTab] = React.useState('home')
  return (
    <>
      <ComponentExample
        title="Bottom Navigation"
        description="Mobile bottom tab bar"
        preview={
          <div className="w-full max-w-sm">
            <BottomNavigation
              items={[
                { id: 'home', label: 'Home', icon: Heart, active: activeTab === 'home', onClick: () => setActiveTab('home') },
                { id: 'search', label: 'Search', icon: Settings, active: activeTab === 'search', onClick: () => setActiveTab('search') },
                { id: 'add', label: 'Add', icon: Plus, active: activeTab === 'add', onClick: () => setActiveTab('add'), badge: 3 },
                { id: 'profile', label: 'Profile', icon: Wifi, active: activeTab === 'profile', onClick: () => setActiveTab('profile') },
              ]}
              variant="elevated"
              showLabels
            />
          </div>
        }
        code={`import { BottomNavigation } from '@/components/ui/BottomNavigation'
import { Home, Search, Plus, User } from 'lucide-react'
import { useState } from 'react'

export function Example() {
  const [active, setActive] = useState('home')
  return (
    <BottomNavigation
      items={[
        { id: 'home', label: 'Home', icon: Home, active: active === 'home', onClick: () => setActive('home') },
        { id: 'search', label: 'Search', icon: Search, active: active === 'search', onClick: () => setActive('search') },
        { id: 'add', label: 'Add', icon: Plus, active: active === 'add', badge: 3, onClick: () => setActive('add') },
        { id: 'profile', label: 'Profile', icon: User, active: active === 'profile', onClick: () => setActive('profile') },
      ]}
      showLabels
    />
  )
}`}
      />
    </>
  )
}

function BreadcrumbExamples() {
  return (
    <>
      <ComponentExample
        title="Breadcrumb Navigation"
        description="Breadcrumb trail with separator"
        preview={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItemComp>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItemComp>
              <BreadcrumbSeparator />
              <BreadcrumbItemComp>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItemComp>
              <BreadcrumbSeparator />
              <BreadcrumbItemComp>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItemComp>
            </BreadcrumbList>
          </Breadcrumb>
        }
        code={`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from '@/components/ui/Breadcrumb'

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`}
      />
    </>
  )
}

function BreadcrumbTabsHybridExamples() {
  return (
    <>
      <ComponentExample
        title="Breadcrumb Tabs Hybrid"
        description="Breadcrumb that switches into tabs on wider screens"
        preview={
          <BreadcrumbTabsHybrid
            breadcrumbs={[
              { label: 'Home', href: '#' },
              { label: 'Components', href: '#' },
              { label: 'Navigation' },
            ]}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'api', label: 'API' },
              { id: 'examples', label: 'Examples', badge: 3 },
            ]}
            activeTab="overview"
          />
        }
        code={`import { BreadcrumbTabsHybrid } from '@/components/ui/BreadcrumbTabsHybrid'

export function Example() {
  return (
    <BreadcrumbTabsHybrid
      breadcrumbs={[
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Navigation' },
      ]}
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'api', label: 'API' },
        { id: 'examples', label: 'Examples', badge: 3 },
      ]}
      activeTab="overview"
    />
  )
}`}
      />
    </>
  )
}

function CommandMenuExamples() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Command Menu"
        description="CMD+K command palette with search"
        preview={
          <div className="flex flex-col items-center gap-3">
            <Button size="sm" onClick={() => setOpen(true)}>Open Command Menu ⌘K</Button>
            <CommandMenu
              isOpen={open}
              onClose={() => setOpen(false)}
              placeholder="Search commands..."
              groups={[
                {
                  title: 'Navigation',
                  items: [
                    { id: 'home', label: 'Go to Home', description: 'Navigate to homepage', shortcut: '⌘H', onSelect: () => setOpen(false) },
                    { id: 'settings', label: 'Open Settings', description: 'Manage your preferences', shortcut: '⌘,', onSelect: () => setOpen(false) },
                  ],
                },
                {
                  title: 'Actions',
                  items: [
                    { id: 'new', label: 'New Document', description: 'Create a new document', shortcut: '⌘N', onSelect: () => setOpen(false) },
                    { id: 'export', label: 'Export as PDF', onSelect: () => setOpen(false) },
                  ],
                },
              ]}
            />
          </div>
        }
        code={`import { CommandMenu } from '@/components/ui/CommandMenu'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open ⌘K</button>
      <CommandMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        groups={[
          {
            title: 'Navigation',
            items: [
              { id: 'home', label: 'Go to Home', shortcut: '⌘H', onSelect: () => setOpen(false) },
            ],
          },
        ]}
      />
    </>
  )
}`}
      />
    </>
  )
}

function ContextMenuExamples() {
  return (
    <>
      <ComponentExample
        title="Context Menu"
        description="Right-click context menu"
        preview={
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="h-28 w-full rounded-xl border-2 border-dashed border-border-primary flex items-center justify-center text-sm text-text-secondary select-none cursor-context-menu hover:border-accent-blue/50 transition-colors">
                Right-click here to open menu
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuGroup>
                <ContextMenuItem onSelect={() => {}}>Open</ContextMenuItem>
                <ContextMenuItem onSelect={() => {}}>Open in New Tab</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem onSelect={() => {}}>Copy</ContextMenuItem>
                <ContextMenuItem onSelect={() => {}}>Paste</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuItem onSelect={() => {}} className="text-status-error">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        }
        code={`import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuSeparator
} from '@/components/ui/ContextMenu'

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => {}}>Open</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => {}}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
      />
    </>
  )
}

function DockBarExamples() {
  return (
    <>
      <ComponentExample
        title="Dock Bar"
        description="macOS-style dock bar with magnification"
        preview={
          <DockBar
            position="bottom"
            size="md"
            magnification
            items={[
              { id: 'finder', label: 'Finder', icon: <span className="text-xl">🗂️</span>, active: true },
              { id: 'mail', label: 'Mail', icon: <span className="text-xl">✉️</span>, badge: 4 },
              { id: 'photos', label: 'Photos', icon: <span className="text-xl">🖼️</span> },
              { id: 'settings', label: 'Settings', icon: <span className="text-xl">⚙️</span> },
              { id: 'terminal', label: 'Terminal', icon: <span className="text-xl">💻</span> },
            ]}
          />
        }
        code={`import { DockBar } from '@/components/ui/DockBar'

export function Example() {
  return (
    <DockBar
      position="bottom"
      magnification
      items={[
        { id: 'finder', label: 'Finder', icon: <span>🗂️</span> },
        { id: 'mail', label: 'Mail', icon: <span>✉️</span>, badge: 4 },
        { id: 'settings', label: 'Settings', icon: <span>⚙️</span> },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function HamburgerMenuIconExamples() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Hamburger Menu Icon"
        description="Animated hamburger-to-close icon"
        preview={<HamburgerMenuIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />}
        code={`import { HamburgerMenuIcon } from '@/components/ui/HamburgerMenuIcon'
import { useState } from 'react'

export function Example() {
  const [isOpen, setIsOpen] = useState(false)
  return <HamburgerMenuIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
}`}
      />
    </>
  )
}

function MenuBarExamples() {
  return (
    <>
      <ComponentExample
        title="Menu Bar"
        description="Application menu bar with dropdown menus"
        preview={
          <MenuBar
            menus={[
              {
                id: 'file',
                label: 'File',
                items: [
                  { id: 'new', label: 'New', shortcut: '⌘N', onSelect: () => {} },
                  { id: 'open', label: 'Open…', shortcut: '⌘O', onSelect: () => {} },
                  { id: 'sep1', label: '', divider: true },
                  { id: 'save', label: 'Save', shortcut: '⌘S', onSelect: () => {} },
                ],
              },
              {
                id: 'edit',
                label: 'Edit',
                items: [
                  { id: 'undo', label: 'Undo', shortcut: '⌘Z', onSelect: () => {} },
                  { id: 'redo', label: 'Redo', shortcut: '⌘⇧Z', onSelect: () => {} },
                  { id: 'sep2', label: '', divider: true },
                  { id: 'copy', label: 'Copy', shortcut: '⌘C', onSelect: () => {} },
                  { id: 'paste', label: 'Paste', shortcut: '⌘V', onSelect: () => {} },
                ],
              },
              {
                id: 'view',
                label: 'View',
                items: [
                  { id: 'zoom', label: 'Zoom In', shortcut: '⌘+', onSelect: () => {} },
                  { id: 'zoomout', label: 'Zoom Out', shortcut: '⌘-', onSelect: () => {} },
                ],
              },
            ]}
          />
        }
        code={`import { MenuBar } from '@/components/ui/MenuBar'

export function Example() {
  return (
    <MenuBar
      menus={[
        {
          id: 'file',
          label: 'File',
          items: [
            { id: 'new', label: 'New', shortcut: '⌘N', onSelect: () => {} },
            { id: 'open', label: 'Open…', shortcut: '⌘O', onSelect: () => {} },
          ],
        },
        {
          id: 'edit',
          label: 'Edit',
          items: [
            { id: 'undo', label: 'Undo', shortcut: '⌘Z', onSelect: () => {} },
          ],
        },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function NavBarExamples() {
  return (
    <>
      <ComponentExample
        title="NavBar"
        description="Top navigation bar with logo, links and actions"
        preview={
          <NavBar variant="default">
            <NavBarBrand>
              <span className="font-semibold text-text-primary">Acme</span>
            </NavBarBrand>
            <NavBarContent align="center">
              <NavBarItem active>Home</NavBarItem>
              <NavBarItem>Components</NavBarItem>
              <NavBarItem>Docs</NavBarItem>
            </NavBarContent>
            <NavBarContent align="right">
              <NavBarItem>Sign in</NavBarItem>
            </NavBarContent>
          </NavBar>
        }
        code={`import { NavBar, NavBarBrand, NavBarContent, NavBarItem } from '@/components/ui/NavBar'

export function Example() {
  return (
    <NavBar variant="default">
      <NavBarBrand>
        <span>Acme</span>
      </NavBarBrand>
      <NavBarContent align="center">
        <NavBarItem active>Home</NavBarItem>
        <NavBarItem>Components</NavBarItem>
      </NavBarContent>
      <NavBarContent align="right">
        <NavBarItem>Sign in</NavBarItem>
      </NavBarContent>
    </NavBar>
  )
}`}
      />
    </>
  )
}

function NavigationDrawerExamples() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Navigation Drawer"
        description="Full-height side drawer for navigation"
        preview={
          <div className="relative">
            <Button size="sm" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
            <NavigationDrawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              position="left"
              width="md"
              showBackdrop
              sections={[
                {
                  title: 'Main',
                  items: [
                    { label: 'Dashboard', active: true, onClick: () => setDrawerOpen(false) },
                    { label: 'Components', onClick: () => setDrawerOpen(false) },
                    { label: 'Documentation', onClick: () => setDrawerOpen(false) },
                  ],
                },
                {
                  title: 'Settings',
                  items: [
                    { label: 'Profile', onClick: () => setDrawerOpen(false) },
                    { label: 'Preferences', badge: 'New', onClick: () => setDrawerOpen(false) },
                  ],
                },
              ]}
            />
          </div>
        }
        code={`import { NavigationDrawer } from '@/components/ui/NavigationDrawer'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <NavigationDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        sections={[
          {
            title: 'Main',
            items: [
              { label: 'Dashboard', active: true },
              { label: 'Components' },
            ],
          },
        ]}
      />
    </>
  )
}`}
      />
    </>
  )
}

function PaginationExamples() {
  const [page, setPage] = React.useState(3)
  return (
    <>
      <ComponentExample
        title="Pagination"
        description="Page navigator with prev/next and numbered pages"
        preview={
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
          />
        }
        code={`import { Pagination } from '@/components/ui/Pagination'
import { useState } from 'react'

export function Example() {
  const [page, setPage] = useState(1)
  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
    />
  )
}`}
      />
    </>
  )
}

function TopActionBarExamples() {
  return (
    <>
      <ComponentExample
        title="Top Action Bar"
        description="Top bar with back button, title and trailing actions"
        preview={<TopActionBar centerContent={<span className="font-medium text-text-primary">Page Title</span>} />}
        code={`import { TopActionBar } from '@/components/ui/TopActionBar'

export function Example() {
  return <TopActionBar centerContent={<span>Page Title</span>} />
}`}
      />
    </>
  )
}

// ─── FEEDBACK EXAMPLES ───
import { ErrorBoundary } from '../../components/ui/ErrorBoundary'
import { JargonTooltip } from '../../components/ui/JargonTooltip'
import { LoadingOverlay } from '../../components/ui/LoadingOverlay'
import { MaintenanceMode } from '../../components/ui/MaintenanceMode'
import { ModalStackManager } from '../../components/ui/ModalStackManager'
import { OfflineState } from '../../components/ui/OfflineState'

function ErrorBoundaryExamples() {
  return (
    <>
      <ComponentExample
        title="Error Boundary"
        description="React error boundary with fallback UI"
        preview={
          <ErrorBoundary fallback={<div className="p-4 text-status-error text-sm">Something went wrong.</div>}>
            <div className="p-4 bg-surface-secondary rounded-lg text-sm text-text-secondary">
              Wrap components in ErrorBoundary to catch runtime errors.
            </div>
          </ErrorBoundary>
        }
        code={`import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export function Example() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <YourComponent />
    </ErrorBoundary>
  )
}`}
      />
    </>
  )
}

function JargonTooltipExamples() {
  return (
    <>
      <ComponentExample
        title="Jargon Tooltip"
        description="Tooltip that explains technical terms inline"
        preview={<JargonTooltip term="API" definition="Application Programming Interface — a way for software to communicate." />}
        code={`import { JargonTooltip } from '@/components/ui/JargonTooltip'

export function Example() {
  return (
    <JargonTooltip term="API" definition="Application Programming Interface" />
  )
}`}
      />
    </>
  )
}

function LoadingOverlayExamples() {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Loading Overlay"
        description="Full-surface loading overlay with spinner"
        preview={
          <div className="relative w-full h-32 bg-surface-secondary rounded-lg overflow-hidden">
            <Button size="sm" onClick={() => { setShow(true); setTimeout(() => setShow(false), 2000) }} className="absolute top-2 left-2">
              Show Overlay
            </Button>
            {show && <LoadingOverlay isLoading message="Processing…" />}
          </div>
        }
        code={`import { LoadingOverlay } from '@/components/ui/LoadingOverlay'

export function Example() {
  return (
    <div className="relative h-32">
      <LoadingOverlay isLoading message="Processing…" />
    </div>
  )
}`}
      />
    </>
  )
}

function MaintenanceModeExamples() {
  return (
    <>
      <ComponentExample
        title="Maintenance Mode"
        description="Full-page maintenance screen"
        preview={
          <MaintenanceMode
            title="Scheduled Maintenance"
            description="We're upgrading our infrastructure to serve you better. Back in a bit."
            estimatedReturnTime="Today at 4:00 PM UTC"
            showContactSupport
            fullPage={false}
            onContactSupport={() => {}}
          />
        }
        code={`import { MaintenanceMode } from '@/components/ui/MaintenanceMode'

export function Example() {
  return (
    <MaintenanceMode
      title="Scheduled Maintenance"
      description="We're upgrading our infrastructure. Back in a bit."
      estimatedReturnTime="Today at 4:00 PM UTC"
    />
  )
}`}
      />
    </>
  )
}

function ModalStackManagerExamples() {
  const [stackOpen, setStackOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Modal Stack Manager"
        description="Manages a stacked queue of modals"
        preview={
          <div>
            <Button size="sm" onClick={() => setStackOpen(true)}>Open Modal Stack</Button>
            <ModalStackManager
              open={stackOpen}
              onCloseAll={() => setStackOpen(false)}
              initialStack={[
                {
                  title: 'First Modal',
                  description: 'This is the first modal in the stack.',
                  content: <p className="text-sm text-text-secondary">Content of the first modal. You can push another modal on top.</p>,
                },
              ]}
            />
          </div>
        }
        code={`import { ModalStackManager } from '@/components/ui/ModalStackManager'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal Stack</button>
      <ModalStackManager
        open={open}
        onCloseAll={() => setOpen(false)}
        initialStack={[
          {
            title: 'First Modal',
            content: <p>Modal content here</p>,
          },
        ]}
      />
    </>
  )
}`}
      />
    </>
  )
}

function OfflineStateExamples() {
  const [retrying, setRetrying] = React.useState(false)
  return (
    <>
      <ComponentExample
        title="Offline State"
        description="Full-page offline indicator with retry action"
        preview={
          <OfflineState
            title="No Internet Connection"
            description="Check your network settings and try again."
            isRetrying={retrying}
            onRetry={() => {
              setRetrying(true)
              setTimeout(() => setRetrying(false), 2000)
            }}
          />
        }
        code={`import { OfflineState } from '@/components/ui/OfflineState'
import { useState } from 'react'

export function Example() {
  const [retrying, setRetrying] = useState(false)
  return (
    <OfflineState
      title="No Internet Connection"
      description="Check your network settings and try again."
      isRetrying={retrying}
      onRetry={() => {
        setRetrying(true)
        setTimeout(() => setRetrying(false), 2000)
      }}
    />
  )
}`}
      />
    </>
  )
}

// ─── DATA EXAMPLES ───
import { DataGrid } from '../../components/ui/DataGrid'
import { DiffViewer } from '../../components/ui/DiffViewer'
import { FilterBar } from '../../components/ui/FilterBar'
import { Gallery } from '../../components/ui/Gallery'
import { ImageCarousel } from '../../components/ui/ImageCarousel'
import { InspectorPanel } from '../../components/ui/InspectorPanel'
import { JsonViewer } from '../../components/ui/JsonViewer'
import { KanbanBoard } from '../../components/ui/KanbanBoard'
import { Lightbox } from '../../components/ui/Lightbox'
import { QueryBuilder } from '../../components/ui/QueryBuilder'
import { ReviewsList } from '../../components/ui/Reviews'
import { Timeline, TimelineItem } from '../../components/ui/Timeline'
import { TreeView } from '../../components/ui/TreeView'

function CodeBlockExamples() {
  return (
    <>
      <ComponentExample
        title="Code Block"
        description="Syntax-highlighted code with copy button"
        preview={
          <CodeBlock
            code={`const greeting = (name: string) => \`Hello, \${name}!\``}
            language="typescript"
          />
        }
        code={`import { CodeBlock } from '@/components/ui/CodeBlock'

export function Example() {
  return (
    <CodeBlock
      code="const greeting = (name) => \`Hello, \${name}!\`"
      language="typescript"
    />
  )
}`}
      />
    </>
  )
}

function DataGridExamples() {
  const columns = [
    { key: 'name' as const, header: 'Name', sortable: true, width: 160 },
    { key: 'role' as const, header: 'Role', sortable: true, width: 140 },
    { key: 'status' as const, header: 'Status', width: 120, render: (val: string) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${val === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{val}</span>
    )},
    { key: 'joined' as const, header: 'Joined', sortable: true, width: 120 },
  ]
  const data = [
    { name: 'Alice Johnson', role: 'Designer', status: 'Active', joined: 'Jan 2023' },
    { name: 'Bob Martinez', role: 'Engineer', status: 'Active', joined: 'Mar 2022' },
    { name: 'Carol White', role: 'Product', status: 'Inactive', joined: 'Sep 2021' },
    { name: 'David Lee', role: 'Engineer', status: 'Active', joined: 'Jun 2023' },
    { name: 'Eva Chen', role: 'Design', status: 'Active', joined: 'Nov 2022' },
  ]
  return (
    <>
      <ComponentExample
        title="Data Grid"
        description="Advanced data table with sort and filter"
        preview={
          <DataGrid
            columns={columns}
            data={data}
            selectable
            striped
            hoverable
            density="comfortable"
          />
        }
        code={`import { DataGrid } from '@/components/ui/DataGrid'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status' },
]
const data = [
  { name: 'Alice Johnson', role: 'Designer', status: 'Active' },
  { name: 'Bob Martinez', role: 'Engineer', status: 'Active' },
]

export function Example() {
  return (
    <DataGrid columns={columns} data={data} selectable striped hoverable />
  )
}`}
      />
    </>
  )
}

function DiffViewerExamples() {
  return (
    <>
      <ComponentExample
        title="Diff Viewer"
        description="Side-by-side code diff viewer"
        preview={
          <DiffViewer
            oldText={`function greet(name) {\n  return 'Hello, ' + name;\n}`}
            newText={`function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}`}
            oldTitle="Before"
            newTitle="After"
            initialMode="split"
          />
        }
        code={`import { DiffViewer } from '@/components/ui/DiffViewer'

export function Example() {
  return (
    <DiffViewer
      oldText="function greet(name) { return 'Hello, ' + name; }"
      newText="function greet(name: string): string { return \`Hello, \${name}!\`; }"
      oldTitle="Before"
      newTitle="After"
    />
  )
}`}
      />
    </>
  )
}

function FilterBarExamples() {
  return (
    <>
      <ComponentExample
        title="Filter Bar"
        description="Row of filter chips with active state"
        preview={
          <FilterBar
            showSearch
            groups={[
              {
                id: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  { id: 'active', label: 'Active', value: 'active', count: 12 },
                  { id: 'inactive', label: 'Inactive', value: 'inactive', count: 4 },
                  { id: 'pending', label: 'Pending', value: 'pending', count: 7 },
                ],
              },
              {
                id: 'role',
                label: 'Role',
                type: 'multiselect',
                options: [
                  { id: 'admin', label: 'Admin', value: 'admin' },
                  { id: 'user', label: 'User', value: 'user' },
                  { id: 'guest', label: 'Guest', value: 'guest' },
                ],
              },
            ]}
          />
        }
        code={`import { FilterBar } from '@/components/ui/FilterBar'

export function Example() {
  return (
    <FilterBar
      groups={[
        {
          id: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { id: 'active', label: 'Active', value: 'active' },
            { id: 'inactive', label: 'Inactive', value: 'inactive' },
          ],
        },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function GalleryExamples() {
  return (
    <>
      <ComponentExample
        title="Gallery"
        description="Responsive image gallery with lightbox"
        preview={
          <Gallery
            columns={3}
            gap={8}
            aspectRatio="square"
            images={[
              { src: 'https://picsum.photos/seed/a1/400/400', alt: 'Mountain landscape' },
              { src: 'https://picsum.photos/seed/b2/400/400', alt: 'Ocean view' },
              { src: 'https://picsum.photos/seed/c3/400/400', alt: 'Forest path' },
              { src: 'https://picsum.photos/seed/d4/400/400', alt: 'City skyline' },
              { src: 'https://picsum.photos/seed/e5/400/400', alt: 'Desert dunes' },
              { src: 'https://picsum.photos/seed/f6/400/400', alt: 'Snow peaks' },
            ]}
          />
        }
        code={`import { Gallery } from '@/components/ui/Gallery'

export function Example() {
  return (
    <Gallery
      columns={3}
      aspectRatio="square"
      images={[
        { src: 'https://picsum.photos/seed/a1/400/400', alt: 'Mountain' },
        { src: 'https://picsum.photos/seed/b2/400/400', alt: 'Ocean' },
        { src: 'https://picsum.photos/seed/c3/400/400', alt: 'Forest' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function ImageCarouselExamples() {
  return (
    <>
      <ComponentExample
        title="Image Carousel"
        description="Touch-friendly image carousel"
        preview={
          <ImageCarousel
            height={240}
            showArrows
            showIndicators
            effect="slide"
            images={[
              { src: 'https://picsum.photos/seed/car1/800/400', alt: 'Slide 1', caption: 'Beautiful mountain vista' },
              { src: 'https://picsum.photos/seed/car2/800/400', alt: 'Slide 2', caption: 'Serene ocean view' },
              { src: 'https://picsum.photos/seed/car3/800/400', alt: 'Slide 3', caption: 'Lush forest trail' },
            ]}
          />
        }
        code={`import { ImageCarousel } from '@/components/ui/ImageCarousel'

export function Example() {
  return (
    <ImageCarousel
      height={240}
      showArrows
      showIndicators
      images={[
        { src: 'https://picsum.photos/seed/car1/800/400', alt: 'Slide 1', caption: 'Mountain vista' },
        { src: 'https://picsum.photos/seed/car2/800/400', alt: 'Slide 2', caption: 'Ocean view' },
        { src: 'https://picsum.photos/seed/car3/800/400', alt: 'Slide 3', caption: 'Forest trail' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function InspectorPanelExamples() {
  return (
    <>
      <ComponentExample
        title="Inspector Panel"
        description="Property inspector panel for dev tools"
        preview={
          <InspectorPanel
            width="280px"
            sections={[
              {
                id: 'layout',
                title: 'Layout',
                defaultExpanded: true,
                content: (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-text-secondary">Width</span><span className="font-mono">320px</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Height</span><span className="font-mono">auto</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Display</span><span className="font-mono">flex</span></div>
                  </div>
                ),
              },
              {
                id: 'typography',
                title: 'Typography',
                defaultExpanded: false,
                content: (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-text-secondary">Font size</span><span className="font-mono">14px</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Weight</span><span className="font-mono">500</span></div>
                  </div>
                ),
              },
            ]}
          />
        }
        code={`import { InspectorPanel } from '@/components/ui/InspectorPanel'

export function Example() {
  return (
    <InspectorPanel
      sections={[
        {
          id: 'layout',
          title: 'Layout',
          defaultExpanded: true,
          content: (
            <div>
              <div>Width: 320px</div>
              <div>Height: auto</div>
            </div>
          ),
        },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function JsonViewerExamples() {
  return (
    <>
      <ComponentExample
        title="JSON Viewer"
        description="Collapsible JSON tree viewer"
        preview={
          <JsonViewer
            data={{ name: 'John', age: 30, address: { city: 'NYC', zip: '10001' } }}
          />
        }
        code={`import { JsonViewer } from '@/components/ui/JsonViewer'

export function Example() {
  return (
    <JsonViewer data={{ name: 'John', age: 30, city: 'NYC' }} />
  )
}`}
      />
    </>
  )
}

function KanbanBoardExamples() {
  return (
    <>
      <ComponentExample
        title="Kanban Board"
        description="Drag-and-drop Kanban board"
        preview={
          <KanbanBoard
            showCardCount
            variant="default"
            columns={[
              {
                id: 'todo',
                title: 'To Do',
                color: '#6B7280',
                cards: [
                  { id: 'c1', title: 'Design system audit', priority: 'high', tags: ['design'], assignee: { name: 'Alice' } },
                  { id: 'c2', title: 'Update documentation', priority: 'medium', tags: ['docs'] },
                ],
              },
              {
                id: 'in-progress',
                title: 'In Progress',
                color: '#3B82F6',
                cards: [
                  { id: 'c3', title: 'Build DataGrid component', priority: 'urgent', tags: ['dev'], comments: 3, attachments: 2 },
                ],
              },
              {
                id: 'done',
                title: 'Done',
                color: '#10B981',
                cards: [
                  { id: 'c4', title: 'Setup CI/CD pipeline', priority: 'low', tags: ['infra'] },
                ],
              },
            ]}
          />
        }
        code={`import { KanbanBoard } from '@/components/ui/KanbanBoard'

export function Example() {
  return (
    <KanbanBoard
      columns={[
        {
          id: 'todo',
          title: 'To Do',
          cards: [
            { id: 'c1', title: 'Design system audit', priority: 'high' },
          ],
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          cards: [
            { id: 'c2', title: 'Build DataGrid', priority: 'urgent' },
          ],
        },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function LightboxExamples() {
  const [lbOpen, setLbOpen] = React.useState(false)
  const [lbIndex, setLbIndex] = React.useState(0)
  const lbImages = [
    { src: 'https://picsum.photos/seed/lb1/1200/800', alt: 'Mountain landscape', caption: 'Alpine sunrise' },
    { src: 'https://picsum.photos/seed/lb2/1200/800', alt: 'Ocean waves', caption: 'Pacific coast' },
    { src: 'https://picsum.photos/seed/lb3/1200/800', alt: 'Forest path', caption: 'Pacific Northwest' },
  ]
  return (
    <>
      <ComponentExample
        title="Lightbox"
        description="Full-screen image lightbox with navigation"
        preview={
          <div className="flex gap-2">
            {lbImages.map((img, i) => (
              <button key={i} onClick={() => { setLbIndex(i); setLbOpen(true) }} className="w-20 h-16 rounded-lg overflow-hidden border-2 border-border-primary hover:border-accent-blue transition-colors">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
            <Lightbox
              isOpen={lbOpen}
              images={lbImages}
              currentIndex={lbIndex}
              onClose={() => setLbOpen(false)}
              onNext={() => setLbIndex(i => Math.min(i + 1, lbImages.length - 1))}
              onPrev={() => setLbIndex(i => Math.max(i - 1, 0))}
              onIndexChange={setLbIndex}
            />
          </div>
        }
        code={`import { Lightbox } from '@/components/ui/Lightbox'
import { useState } from 'react'

const images = [
  { src: 'https://picsum.photos/seed/lb1/1200/800', alt: 'Mountain', caption: 'Alpine sunrise' },
  { src: 'https://picsum.photos/seed/lb2/1200/800', alt: 'Ocean', caption: 'Pacific coast' },
]

export function Example() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  return (
    <>
      <button onClick={() => { setIndex(0); setOpen(true) }}>Open Lightbox</button>
      <Lightbox
        isOpen={open}
        images={images}
        currentIndex={index}
        onClose={() => setOpen(false)}
        onNext={() => setIndex(i => Math.min(i + 1, images.length - 1))}
        onPrev={() => setIndex(i => Math.max(i - 1, 0))}
        onIndexChange={setIndex}
      />
    </>
  )
}`}
      />
    </>
  )
}

function QueryBuilderExamples() {
  return (
    <>
      <ComponentExample
        title="Query Builder"
        description="Visual rule builder for complex filter queries"
        preview={
          <QueryBuilder
            fields={[
              { id: 'name', label: 'Name', type: 'text' },
              { id: 'age', label: 'Age', type: 'number' },
              { id: 'status', label: 'Status', type: 'select', options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]},
              { id: 'created', label: 'Created At', type: 'date' },
            ]}
          />
        }
        code={`import { QueryBuilder } from '@/components/ui/QueryBuilder'

export function Example() {
  return (
    <QueryBuilder
      fields={[
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'age', label: 'Age', type: 'number' },
        { id: 'status', label: 'Status', type: 'select', options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]},
      ]}
    />
  )
}`}
      />
    </>
  )
}

function ReviewsExamples() {
  const reviews = [
    { id: 1, author: 'Sarah K.', rating: 5, date: 'Jan 2025', text: 'Absolutely love this design system. The components are polished and easy to use.' },
    { id: 2, author: 'Marc D.', rating: 4, date: 'Feb 2025', text: 'Great library. The animations feel native and the dark mode is flawless.' },
    { id: 3, author: 'Lucia P.', rating: 5, date: 'Mar 2025', text: 'Best component library I have used in years. Highly recommended.' },
  ]
  return (
    <>
      <ComponentExample
        title="Reviews List"
        description="Review list with star ratings and author info"
        preview={<ReviewsList reviews={reviews} />}
        code={`import { ReviewsList } from '@/components/ui/Reviews'

const reviews = [
  { id: 1, author: 'Sarah K.', rating: 5, date: 'Jan 2025', text: 'Absolutely love this design system.' },
  { id: 2, author: 'Marc D.', rating: 4, date: 'Feb 2025', text: 'Great library with native-feeling animations.' },
]

export function Example() {
  return <ReviewsList reviews={reviews} />
}`}
      />
      <ComponentExample
        title="Compact"
        description="Compact layout for tight spaces"
        preview={<ReviewsList reviews={reviews} compact />}
        code={`import { ReviewsList } from '@/components/ui/Reviews'

export function Example() {
  return <ReviewsList reviews={reviews} compact />
}`}
      />
    </>
  )
}

function TimelineExamples() {
  return (
    <>
      <ComponentExample
        title="Timeline"
        description="Vertical timeline of events"
        preview={
          <Timeline>
            <TimelineItem title="Project Started" date="Jan 2024" description="Kicked off the project." status="success" />
            <TimelineItem title="Beta Launch" date="Mar 2024" description="Released to beta users." status="success" />
            <TimelineItem title="Public Launch" date="May 2024" description="Launched to the public." isActive />
          </Timeline>
        }
        code={`import { Timeline, TimelineItem } from '@/components/ui/Timeline'

export function Example() {
  return (
    <Timeline>
      <TimelineItem title="Started" date="Jan 2024" status="success" />
      <TimelineItem title="Beta Launch" date="Mar 2024" status="success" />
      <TimelineItem title="Public Launch" date="May 2024" isActive />
    </Timeline>
  )
}`}
      />
    </>
  )
}

function TreeViewExamples() {
  return (
    <>
      <ComponentExample
        title="Tree View"
        description="Collapsible tree of nested items"
        preview={
          <TreeView
            defaultExpandedIds={['src', 'components']}
            data={[
              {
                id: 'src',
                name: 'src',
                type: 'folder',
                children: [
                  {
                    id: 'components',
                    name: 'components',
                    type: 'folder',
                    children: [
                      { id: 'button', name: 'Button.tsx', type: 'file', meta: '2.1 KB' },
                      { id: 'input', name: 'Input.tsx', type: 'file', meta: '1.8 KB' },
                    ],
                  },
                  { id: 'app', name: 'App.tsx', type: 'file', meta: '3.4 KB' },
                  { id: 'index', name: 'index.ts', type: 'file', meta: '0.5 KB' },
                ],
              },
              {
                id: 'public',
                name: 'public',
                type: 'folder',
                children: [
                  { id: 'favicon', name: 'favicon.ico', type: 'file' },
                ],
              },
            ]}
          />
        }
        code={`import { TreeView } from '@/components/ui/TreeView'

export function Example() {
  return (
    <TreeView
      defaultExpandedIds={['src']}
      data={[
        {
          id: 'src',
          name: 'src',
          type: 'folder',
          children: [
            { id: 'app', name: 'App.tsx', type: 'file' },
            { id: 'index', name: 'index.ts', type: 'file' },
          ],
        },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── MEDIA EXAMPLES ───
import { AudioPlayer } from '../../components/ui/AudioPlayer'
import { BarcodeGenerator } from '../../components/ui/BarcodeGenerator'
import { ComicPanel } from '../../components/ui/ComicPanel'
import { DocScanOverlay } from '../../components/ui/DocScanOverlay'
import { FileUpload } from '../../components/ui/FileUpload'
import { ImageCropper } from '../../components/ui/ImageCropper'
import { MarkdownEditor } from '../../components/ui/MarkdownEditor'
import { MultiFileUpload } from '../../components/ui/MultiFileUpload'
import { QRCodeGenerator } from '../../components/ui/QRCodeGenerator'
import { RichTextEditor } from '../../components/ui/RichTextEditor'
import { VideoPlayer } from '../../components/ui/VideoPlayer'
import { VoiceRecorder } from '../../components/ui/VoiceRecorder'

function AudioPlayerExamples() {
  return (
    <>
      <ComponentExample
        title="Audio Player"
        description="Audio player with play, seek and volume controls"
        preview={
          <AudioPlayer
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            title="SoundHelix Song 1"
            artist="SoundHelix"
            coverArt="https://picsum.photos/seed/audio1/200/200"
          />
        }
        code={`import { AudioPlayer } from '@/components/ui/AudioPlayer'

export function Example() {
  return (
    <AudioPlayer
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      title="SoundHelix Song 1"
      artist="SoundHelix"
    />
  )
}`}
      />
    </>
  )
}

function BarcodeGeneratorExamples() {
  return (
    <>
      <ComponentExample
        title="Barcode Generator"
        description="Generate and display barcodes"
        preview={<BarcodeGenerator defaultValue="1234567890" />}
        code={`import { BarcodeGenerator } from '@/components/ui/BarcodeGenerator'

export function Example() {
  return <BarcodeGenerator defaultValue="1234567890" />
}`}
      />
    </>
  )
}

function ComicPanelExamples() {
  return (
    <>
      <ComponentExample
        title="Comic Panel"
        description="Comic-strip style panel layout"
        preview={
          <div className="grid grid-cols-2 gap-4">
            <ComicPanel direction="left">
              <p className="text-sm font-semibold text-text-primary mb-2">Scene 01: The Meeting</p>
              <p className="text-sm text-text-secondary">Two engineers debate the best state management solution. Again.</p>
            </ComicPanel>
            <ComicPanel direction="right">
              <p className="text-sm font-semibold text-text-primary mb-2">Scene 02: The Revelation</p>
              <p className="text-sm text-text-secondary">They realize they've been using Context API all along. Plot twist.</p>
            </ComicPanel>
          </div>
        }
        code={`import { ComicPanel } from '@/components/ui/ComicPanel'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ComicPanel direction="left">
        <p className="font-semibold mb-2">Scene 01</p>
        <p>Two engineers debate state management.</p>
      </ComicPanel>
      <ComicPanel direction="right">
        <p className="font-semibold mb-2">Scene 02</p>
        <p>They discover Context API. Revelation.</p>
      </ComicPanel>
    </div>
  )
}`}
      />
    </>
  )
}

function DocScanOverlayExamples() {
  return (
    <>
      <ComponentExample
        title="Document Scan Overlay"
        description="Document scanning overlay with corner guides"
        preview={
          <DocScanOverlay
            scanState="scanning"
            documentType="ID"
            instructionMessage="Align your ID within the frame"
          />
        }
        code={`import { DocScanOverlay } from '@/components/ui/DocScanOverlay'

export function Example() {
  return (
    <DocScanOverlay
      scanState="scanning"
      documentType="ID"
      instructionMessage="Align your ID within the frame"
      onCapture={() => console.log('captured')}
    />
  )
}`}
      />
    </>
  )
}

function FileUploadExamples() {
  return (
    <>
      <ComponentExample
        title="File Upload"
        description="Drag-and-drop file upload with preview"
        preview={
          <FileUpload
            label="Upload document"
            accept=".pdf,.doc,.docx"
            maxSize={5 * 1024 * 1024}
            helperText="PDF or Word document, max 5 MB"
          />
        }
        code={`import { FileUpload } from '@/components/ui/FileUpload'

export function Example() {
  return (
    <FileUpload
      label="Upload document"
      accept=".pdf,.doc,.docx"
      maxSize={5 * 1024 * 1024}
      helperText="PDF or Word document, max 5 MB"
      onChange={(file) => console.log('File selected:', file)}
    />
  )
}`}
      />
    </>
  )
}

function ImageCropperExamples() {
  return (
    <>
      <ComponentExample
        title="Image Cropper"
        description="Interactive image crop tool"
        preview={
          <ImageCropper
            src="https://picsum.photos/seed/crop1/600/400"
            aspectRatio={1}
            onCrop={(croppedImage) => console.log('Cropped:', croppedImage.length)}
            onCancel={() => {}}
          />
        }
        code={`import { ImageCropper } from '@/components/ui/ImageCropper'

export function Example() {
  return (
    <ImageCropper
      src="https://picsum.photos/seed/crop1/600/400"
      aspectRatio={1}
      onCrop={(croppedImage) => console.log('Cropped:', croppedImage)}
      onCancel={() => {}}
    />
  )
}`}
      />
    </>
  )
}

function MarkdownEditorExamples() {
  return (
    <>
      <ComponentExample
        title="Markdown Editor"
        description="Markdown editor with preview toggle"
        preview={
          <MarkdownEditor
            label="Description"
            value={`## Getting Started\n\nWelcome to the **Markdown Editor** component.\n\n- Supports **bold**, *italic*, and \`code\`\n- Toggle between write and preview modes\n- Keyboard shortcuts for formatting`}
            placeholder="Write your markdown here..."
            minHeight="180px"
          />
        }
        code={`import { MarkdownEditor } from '@/components/ui/MarkdownEditor'
import { useState } from 'react'

export function Example() {
  const [content, setContent] = useState('## Hello\\n\\nStart writing **markdown** here.')
  return (
    <MarkdownEditor
      label="Description"
      value={content}
      onChange={setContent}
      minHeight="180px"
    />
  )
}`}
      />
    </>
  )
}

function MultiFileUploadExamples() {
  return (
    <>
      <ComponentExample
        title="Multi File Upload"
        description="Multi-file upload with per-file progress"
        preview={
          <MultiFileUpload
            label="Upload files"
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024}
            maxFiles={5}
            helperText="Images or PDFs, up to 10 MB each, max 5 files"
          />
        }
        code={`import { MultiFileUpload } from '@/components/ui/MultiFileUpload'

export function Example() {
  return (
    <MultiFileUpload
      label="Upload files"
      accept="image/*,.pdf"
      maxFiles={5}
      maxSize={10 * 1024 * 1024}
      onChange={(files) => console.log('Files:', files)}
    />
  )
}`}
      />
    </>
  )
}

function QRCodeGeneratorExamples() {
  return (
    <>
      <ComponentExample
        title="QR Code Generator"
        description="Generate QR codes from a URL or string"
        preview={<QRCodeGenerator defaultValue="https://example.com" />}
        code={`import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator'

export function Example() {
  return <QRCodeGenerator defaultValue="https://example.com" />
}`}
      />
    </>
  )
}

function RichTextEditorExamples() {
  return (
    <>
      <ComponentExample
        title="Rich Text Editor"
        description="WYSIWYG rich text editor with toolbar"
        preview={
          <RichTextEditor
            label="Message"
            value="<p>Start typing your <strong>rich text</strong> content here. Use the toolbar to format.</p>"
            placeholder="Start typing..."
            minHeight="150px"
          />
        }
        code={`import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { useState } from 'react'

export function Example() {
  const [html, setHtml] = useState('<p>Hello <strong>world</strong></p>')
  return (
    <RichTextEditor
      label="Message"
      value={html}
      onChange={setHtml}
      minHeight="150px"
    />
  )
}`}
      />
    </>
  )
}

function VideoPlayerExamples() {
  return (
    <>
      <ComponentExample
        title="Video Player"
        description="Video player with custom controls"
        preview={
          <VideoPlayer
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            muted
          />
        }
        code={`import { VideoPlayer } from '@/components/ui/VideoPlayer'

export function Example() {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
    />
  )
}`}
      />
    </>
  )
}

function VoiceRecorderExamples() {
  return (
    <>
      <ComponentExample
        title="Voice Recorder"
        description="Microphone recorder with waveform visualizer"
        preview={
          <VoiceRecorder
            maxDuration={60}
            showWaveform
            onRecordingComplete={(blob, duration) => console.log('Recording complete', duration, 's')}
          />
        }
        code={`import { VoiceRecorder } from '@/components/ui/VoiceRecorder'

export function Example() {
  return (
    <VoiceRecorder
      maxDuration={60}
      showWaveform
      onRecordingComplete={(blob, duration) => {
        console.log('Recording complete:', duration, 's')
      }}
    />
  )
}`}
      />
    </>
  )
}

// ─── CHARTS EXAMPLES ───
import { AssetAllocationChart } from '../../components/ui/AssetAllocationChart'
import { AssetPriceTicker } from '../../components/ui/AssetPriceTicker'
import { BalanceChart } from '../../components/ui/BalanceChart'
import { Chart } from '../../components/ui/Chart'
import { Counters } from '../../components/ui/Counters'
import { CountersListWithChart } from '../../components/ui/CountersListWithChart'
import { KPIBlock } from '../../components/ui/KPIBlock'
import { PortfolioDistribution } from '../../components/ui/PortfolioDistribution'
import { ResourceMonitor } from '../../components/ui/ResourceMonitor'
import { Sparkline } from '../../components/ui/Sparkline'
import { StatisticDisplay } from '../../components/ui/StatisticDisplay'

function AssetAllocationChartExamples() {
  return (
    <>
      <ComponentExample
        title="Asset Allocation Chart"
        description="Donut chart for portfolio asset allocation"
        preview={
          <AssetAllocationChart
            currency="USD"
            assets={[
              { id: 'aapl', name: 'Apple Inc.', ticker: 'AAPL', value: 45000, color: '#007AFF', riskLevel: 'medium' },
              { id: 'msft', name: 'Microsoft', ticker: 'MSFT', value: 32000, color: '#34C759', riskLevel: 'low' },
              { id: 'btc', name: 'Bitcoin', ticker: 'BTC', value: 18000, color: '#FF9500', riskLevel: 'high' },
              { id: 'bonds', name: 'US Bonds', ticker: 'BOND', value: 25000, color: '#5AC8FA', riskLevel: 'low' },
              { id: 'cash', name: 'Cash', ticker: 'USD', value: 10000, color: '#8E8E93', riskLevel: 'low' },
            ]}
          />
        }
        code={`import { AssetAllocationChart } from '@/components/ui/AssetAllocationChart'

export function Example() {
  return (
    <AssetAllocationChart
      currency="USD"
      assets={[
        { id: 'aapl', name: 'Apple Inc.', ticker: 'AAPL', value: 45000, color: '#007AFF', riskLevel: 'medium' },
        { id: 'msft', name: 'Microsoft', ticker: 'MSFT', value: 32000, color: '#34C759', riskLevel: 'low' },
        { id: 'btc', name: 'Bitcoin', ticker: 'BTC', value: 18000, color: '#FF9500', riskLevel: 'high' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function AssetPriceTickerExamples() {
  return (
    <>
      <ComponentExample
        title="Asset Price Ticker"
        description="Live-updating asset price ticker"
        preview={
          <AssetPriceTicker
            layout="vertical"
            assets={[
              { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 67420.50, change: 2.34, type: 'crypto' },
              { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 3580.20, change: -1.12, type: 'crypto' },
              { id: 'aapl', symbol: 'AAPL', name: 'Apple', price: 189.45, change: 0.87, type: 'stock' },
              { id: 'googl', symbol: 'GOOGL', name: 'Alphabet', price: 178.30, change: -0.45, type: 'stock' },
            ]}
          />
        }
        code={`import { AssetPriceTicker } from '@/components/ui/AssetPriceTicker'

export function Example() {
  return (
    <AssetPriceTicker
      layout="vertical"
      assets={[
        { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 67420, change: 2.34, type: 'crypto' },
        { id: 'aapl', symbol: 'AAPL', name: 'Apple', price: 189.45, change: 0.87, type: 'stock' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function BalanceChartExamples() {
  return (
    <>
      <ComponentExample
        title="Balance Chart"
        description="Area chart for account balance over time"
        preview={
          <BalanceChart
            title="Account Balance"
            maskable
            data={[
              { label: 'Jan', value: 12400 },
              { label: 'Feb', value: 13800 },
              { label: 'Mar', value: 11200 },
              { label: 'Apr', value: 15600 },
              { label: 'May', value: 14300 },
              { label: 'Jun', value: 17800 },
              { label: 'Jul', value: 19200 },
              { label: 'Aug', value: 18400 },
            ]}
          />
        }
        code={`import { BalanceChart } from '@/components/ui/BalanceChart'

export function Example() {
  return (
    <BalanceChart
      title="Account Balance"
      data={[
        { label: 'Jan', value: 12400 },
        { label: 'Feb', value: 13800 },
        { label: 'Mar', value: 11200 },
        { label: 'Apr', value: 15600 },
        { label: 'May', value: 14300 },
        { label: 'Jun', value: 17800 },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function ChartExamples() {
  return (
    <>
      <ComponentExample
        title="Donut Chart"
        description="Generic chart — donut mode"
        preview={
          <Chart
            type="donut"
            size={200}
            data={{
              labels: ['React', 'Vue', 'Angular', 'Svelte'],
              datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#007AFF', '#34C759', '#FF9500', '#AF52DE'],
              }],
            }}
          />
        }
        code={`import { Chart } from '@/components/ui/Chart'

export function Example() {
  return (
    <Chart
      type="donut"
      size={200}
      data={{
        labels: ['React', 'Vue', 'Angular', 'Svelte'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#007AFF', '#34C759', '#FF9500', '#AF52DE'],
        }],
      }}
    />
  )
}`}
      />
    </>
  )
}

function CountersExamples() {
  return (
    <>
      <ComponentExample
        title="Counters"
        description="Animated number counters"
        preview={
          <Counters
            items={[
              { value: '48K+', label: 'Active Users', subtitle: 'This month' },
              { value: '$2.4M', label: 'Revenue', subtitle: 'Year to date' },
              { value: '99.9%', label: 'Uptime', subtitle: 'Last 90 days' },
              { value: '4.8★', label: 'Rating', subtitle: 'App Store avg' },
            ]}
          />
        }
        code={`import { Counters } from '@/components/ui/Counters'

export function Example() {
  return (
    <Counters
      items={[
        { value: '48K+', label: 'Active Users', subtitle: 'This month' },
        { value: '$2.4M', label: 'Revenue', subtitle: 'Year to date' },
        { value: '99.9%', label: 'Uptime', subtitle: 'Last 90 days' },
        { value: '4.8★', label: 'Rating' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function CountersListWithChartExamples() {
  return (
    <>
      <ComponentExample
        title="Counters List with Chart"
        description="List of counters with donut chart"
        preview={
          <CountersListWithChart
            title="Traffic Sources"
            chartType="donut"
            items={[
              { label: 'Organic Search', value: 42800, percent: 43, color: '#007AFF' },
              { label: 'Direct', value: 28100, percent: 28, color: '#34C759' },
              { label: 'Social Media', value: 18500, percent: 18, color: '#FF9500' },
              { label: 'Referral', value: 10600, percent: 11, color: '#AF52DE' },
            ]}
          />
        }
        code={`import { CountersListWithChart } from '@/components/ui/CountersListWithChart'

export function Example() {
  return (
    <CountersListWithChart
      title="Traffic Sources"
      chartType="donut"
      items={[
        { label: 'Organic Search', value: 42800, percent: 43, color: '#007AFF' },
        { label: 'Direct', value: 28100, percent: 28, color: '#34C759' },
        { label: 'Social Media', value: 18500, percent: 18, color: '#FF9500' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function KPIBlockExamples() {
  return (
    <>
      <ComponentExample
        title="KPI Block"
        description="KPI metric block with value, trend and label"
        preview={
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <KPIBlock label="Revenue" value="$84,200" change="+12.5%" trend="up" variant="default" />
            <KPIBlock label="Churn Rate" value="2.4%" change="-0.8%" trend="down" variant="bordered" />
            <KPIBlock label="NPS Score" value="72" change="+3 pts" trend="up" variant="elevated" />
            <KPIBlock label="Avg Session" value="4m 32s" change="+18s" trend="up" variant="minimal" />
          </div>
        }
        code={`import { KPIBlock } from '@/components/ui/KPIBlock'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <KPIBlock label="Revenue" value="$84,200" change="+12.5%" trend="up" />
      <KPIBlock label="Churn Rate" value="2.4%" change="-0.8%" trend="down" variant="bordered" />
    </div>
  )
}`}
      />
    </>
  )
}

function PortfolioDistributionExamples() {
  return (
    <>
      <ComponentExample
        title="Portfolio Distribution"
        description="Donut chart for portfolio distribution"
        preview={
          <PortfolioDistribution
            totalLabel="Total Portfolio"
            currency="USD"
            assets={[
              { id: 'stocks', name: 'US Stocks', value: 58000, color: '#007AFF', change: 4.2 },
              { id: 'intl', name: 'Intl Stocks', value: 22000, color: '#34C759', change: -1.8 },
              { id: 'bonds', name: 'Bonds', value: 15000, color: '#5AC8FA', change: 0.5 },
              { id: 'crypto', name: 'Crypto', value: 8000, color: '#FF9500', change: 12.3 },
              { id: 'cash', name: 'Cash', value: 7000, color: '#8E8E93', change: 0 },
            ]}
          />
        }
        code={`import { PortfolioDistribution } from '@/components/ui/PortfolioDistribution'

export function Example() {
  return (
    <PortfolioDistribution
      currency="USD"
      assets={[
        { id: 'stocks', name: 'US Stocks', value: 58000, color: '#007AFF', change: 4.2 },
        { id: 'bonds', name: 'Bonds', value: 15000, color: '#5AC8FA', change: 0.5 },
        { id: 'crypto', name: 'Crypto', value: 8000, color: '#FF9500', change: 12.3 },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function ResourceMonitorExamples() {
  return (
    <>
      <ComponentExample
        title="Resource Monitor"
        description="Real-time resource usage monitor"
        preview={
          <ResourceMonitor
            currentCpu={42}
            currentMemory={6.8}
            currentTokens={7.2}
            autoRefresh
            refreshInterval={2000}
          />
        }
        code={`import { ResourceMonitor } from '@/components/ui/ResourceMonitor'

export function Example() {
  return (
    <ResourceMonitor
      currentCpu={42}
      currentMemory={6.8}
      currentTokens={7.2}
      autoRefresh
      refreshInterval={2000}
    />
  )
}`}
      />
    </>
  )
}

function SparklineExamples() {
  return (
    <>
      <ComponentExample
        title="Sparkline"
        description="Inline mini chart for trend visualization"
        preview={<Sparkline data={[10, 25, 18, 40, 30, 55, 45, 60]} />}
        code={`import { Sparkline } from '@/components/ui/Sparkline'

export function Example() {
  return <Sparkline data={[10, 25, 18, 40, 30, 55, 45, 60]} />
}`}
      />
    </>
  )
}

function StatisticDisplayExamples() {
  return (
    <>
      <ComponentExample
        title="Statistic Display"
        description="Statistic card with icon, value and change"
        preview={
          <StatisticDisplay
            variant="card"
            columns={2}
            metrics={[
              { label: 'Total Revenue', value: '$284,500', change: '+18.2%', trend: 'up', sparkline: [30, 45, 38, 60, 52, 70, 65, 80] },
              { label: 'Active Users', value: '12,840', change: '+4.7%', trend: 'up', sparkline: [20, 35, 28, 45, 40, 55, 50, 62] },
              { label: 'Bounce Rate', value: '24.3%', change: '-2.1%', trend: 'down', sparkline: [40, 35, 42, 30, 28, 25, 24, 22] },
              { label: 'Avg Session', value: '4m 32s', change: '+0:18', trend: 'up', sparkline: [15, 22, 18, 30, 25, 35, 32, 38] },
            ]}
          />
        }
        code={`import { StatisticDisplay } from '@/components/ui/StatisticDisplay'

export function Example() {
  return (
    <StatisticDisplay
      variant="card"
      columns={2}
      metrics={[
        { label: 'Total Revenue', value: '$284,500', change: '+18.2%', trend: 'up', sparkline: [30, 45, 60, 80] },
        { label: 'Active Users', value: '12,840', change: '+4.7%', trend: 'up', sparkline: [20, 35, 50, 62] },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── ANIMATIONS EXAMPLES ───
import { FloatingElement } from '../../components/ui/FloatingElement'
import { FloatingToolbar } from '../../components/ui/FloatingToolbar'
import { GestureCard } from '../../components/ui/GestureCard'
import { ImmersiveHero } from '../../components/ui/ImmersiveHero'
import { InfiniteHorizontalLoop } from '../../components/ui/InfiniteHorizontalLoop'
import { InteractiveCursor } from '../../components/ui/InteractiveCursor'
import { ParallaxBanner } from '../../components/ui/ParallaxBanner'
import { ParallaxStoryStage } from '../../components/ui/ParallaxStoryStage'
import { ScrollProgressBar } from '../../components/ui/ScrollProgressBar'
import { ScrollRevealCards } from '../../components/ui/ScrollRevealCards'
import { StickyImageTextSwap } from '../../components/ui/StickyImageTextSwap'
import { UnscramblingText } from '../../components/ui/UnscramblingText'

function FloatingElementExamples() {
  return (
    <>
      <ComponentExample
        title="Floating Element"
        description="Element with continuous float animation"
        preview={<FloatingElement><div className="p-4 bg-accent-blue/10 border border-accent-blue/20 rounded-xl text-sm">Floating</div></FloatingElement>}
        code={`import { FloatingElement } from '@/components/ui/FloatingElement'

export function Example() {
  return (
    <FloatingElement>
      <div>Floating content</div>
    </FloatingElement>
  )
}`}
      />
    </>
  )
}

function FloatingToolbarExamples() {
  return (
    <>
      <ComponentExample
        title="Floating Toolbar"
        description="Toolbar that floats above selected content"
        preview={
          <div className="relative h-32 border border-border-primary rounded-xl bg-surface-secondary overflow-hidden">
            <FloatingToolbar
              position="bottom"
              variant="glass"
              showLabels
              actions={[
                { id: 'bold', label: 'Bold', icon: <span className="font-bold text-xs">B</span>, onClick: () => {} },
                { id: 'italic', label: 'Italic', icon: <span className="italic text-xs">I</span>, onClick: () => {} },
                { id: 'link', label: 'Link', icon: <span className="text-xs underline">A</span>, onClick: () => {} },
                { id: 'delete', label: 'Delete', icon: <span className="text-xs">🗑</span>, onClick: () => {}, variant: 'danger' },
              ]}
            />
          </div>
        }
        code={`import { FloatingToolbar } from '@/components/ui/FloatingToolbar'

export function Example() {
  return (
    <FloatingToolbar
      position="bottom"
      variant="glass"
      showLabels
      actions={[
        { id: 'bold', label: 'Bold', icon: <span className="font-bold">B</span>, onClick: () => {} },
        { id: 'italic', label: 'Italic', icon: <span className="italic">I</span>, onClick: () => {} },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function GestureCardExamples() {
  return (
    <>
      <ComponentExample
        title="Gesture Card"
        description="Card with 3D tilt effect on hover"
        preview={
          <GestureCard
            intensity={12}
            glowEffect
            glowColor="rgba(0, 122, 255, 0.3)"
            variant="elevated"
            padding="md"
            className="max-w-xs"
          >
            <div className="p-2">
              <p className="font-semibold text-text-primary mb-1">Hover over me</p>
              <p className="text-sm text-text-secondary">Move your cursor around to see the 3D tilt effect with glow.</p>
            </div>
          </GestureCard>
        }
        code={`import { GestureCard } from '@/components/ui/GestureCard'

export function Example() {
  return (
    <GestureCard intensity={12} glowEffect>
      <div>
        <p className="font-semibold">Hover over me</p>
        <p>Move your cursor to see the 3D tilt effect.</p>
      </div>
    </GestureCard>
  )
}`}
      />
    </>
  )
}

function ImmersiveHeroExamples() {
  return (
    <>
      <ComponentExample
        title="Immersive Hero"
        description="Full-screen hero with parallax and scroll effects"
        preview={
          <ImmersiveHero
            title="Craft Experiences That Last"
            subtitle="A design system built for scale, speed, and delight."
            backgroundImage="https://picsum.photos/seed/hero1/1200/600"
            className="h-64 rounded-xl overflow-hidden"
          />
        }
        code={`import { ImmersiveHero } from '@/components/ui/ImmersiveHero'

export function Example() {
  return (
    <ImmersiveHero
      title="Craft Experiences That Last"
      subtitle="A design system built for scale, speed, and delight."
      backgroundImage="https://picsum.photos/seed/hero1/1200/600"
    />
  )
}`}
      />
    </>
  )
}

function InfiniteHorizontalLoopExamples() {
  return (
    <>
      <ComponentExample
        title="Infinite Horizontal Loop"
        description="Infinite marquee loop for logos or text"
        preview={
          <InfiniteHorizontalLoop
            items={['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite', 'Node.js'].map((t) => (
              <span key={t} className="px-4 py-2 bg-surface-secondary rounded-full text-sm text-text-secondary mx-2">{t}</span>
            ))}
            speed={25}
          />
        }
        code={`import { InfiniteHorizontalLoop } from '@/components/ui/InfiniteHorizontalLoop'

export function Example() {
  const items = ['React', 'TypeScript', 'Tailwind', 'Vite'].map((t) => (
    <span key={t} className="px-4 py-2 bg-surface-secondary rounded-full text-sm">
      {t}
    </span>
  ))

  return <InfiniteHorizontalLoop items={items} speed={25} />
}`}
      />
    </>
  )
}

function InteractiveCursorExamples() {
  return (
    <>
      <ComponentExample
        title="Interactive Cursor"
        description="Custom cursor that reacts to interactive elements"
        preview={
          <div className="relative w-full h-32 rounded-xl border border-border-primary bg-surface-secondary flex items-center justify-center overflow-hidden">
            <InteractiveCursor />
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-3">Move your mouse inside this area</p>
              <button className="interactive px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium">
                Hover me (interactive)
              </button>
            </div>
          </div>
        }
        code={`import { InteractiveCursor } from '@/components/ui/InteractiveCursor'

export function Example() {
  return (
    <div className="relative">
      <InteractiveCursor />
      <button className="interactive">Hover to see cursor change</button>
    </div>
  )
}`}
      />
    </>
  )
}

function ParallaxBannerExamples() {
  return (
    <>
      <ComponentExample
        title="Parallax Banner"
        description="Image banner with parallax scroll effect"
        preview={
          <ParallaxBanner
            image="https://picsum.photos/seed/parallax1/1200/400"
            height="h-48"
            speed={0.4}
            className="rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-center h-full bg-black/30">
              <h2 className="text-white text-2xl font-bold tracking-tight drop-shadow-lg">Scroll to see parallax</h2>
            </div>
          </ParallaxBanner>
        }
        code={`import { ParallaxBanner } from '@/components/ui/ParallaxBanner'

export function Example() {
  return (
    <ParallaxBanner
      image="https://picsum.photos/seed/parallax1/1200/400"
      height="h-48"
      speed={0.4}
    >
      <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-2xl font-bold">Scroll to see parallax</h2>
      </div>
    </ParallaxBanner>
  )
}`}
      />
    </>
  )
}

function ParallaxStoryStageExamples() {
  return (
    <>
      <ComponentExample
        title="Parallax Story Stage"
        description="Scroll-based horizontal storytelling stage with comic panels"
        preview={
          <div className="w-full overflow-hidden rounded-xl border border-border-primary" style={{ height: 300 }}>
            <ParallaxStoryStage className="h-[300vh]" />
          </div>
        }
        code={`import { ParallaxStoryStage } from '@/components/ui/ParallaxStoryStage'

export function Example() {
  return (
    <div style={{ height: '100vh' }}>
      <ParallaxStoryStage />
    </div>
  )
}`}
      />
    </>
  )
}

function ScrollProgressBarExamples() {
  return (
    <>
      <ComponentExample
        title="Scroll Progress Bar"
        description="Reading progress bar that fills on scroll"
        preview={<ScrollProgressBar />}
        code={`import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

export function Example() {
  return <ScrollProgressBar />
}`}
      />
    </>
  )
}

function ScrollRevealCardsExamples() {
  return (
    <>
      <ComponentExample
        title="Scroll Reveal Cards"
        description="Cards that reveal with animation on scroll"
        preview={
          <ScrollRevealCards
            items={[
              { title: 'Ship faster', description: 'Pre-built components ready to copy into your project.' },
              { title: 'Stay consistent', description: 'Design tokens and CVA variants baked in.' },
              { title: 'Own your code', description: 'Copy-owned — no runtime dependency.' },
            ]}
            columns={3}
          />
        }
        code={`import { ScrollRevealCards } from '@/components/ui/ScrollRevealCards'

export function Example() {
  return (
    <ScrollRevealCards
      items={[
        { title: 'Ship faster', description: 'Pre-built components ready to copy.' },
        { title: 'Stay consistent', description: 'Design tokens baked in.' },
        { title: 'Own your code', description: 'No runtime dependency.' },
      ]}
      columns={3}
    />
  )
}`}
      />
    </>
  )
}

function StickyImageTextSwapExamples() {
  return (
    <>
      <ComponentExample
        title="Sticky Image Text Swap"
        description="Sticky scroll section that swaps text and image"
        preview={
          <StickyImageTextSwap
            items={[
              { title: 'Component library', description: 'Drop-in components built with design tokens and CVA.', image: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Components' },
              { title: 'CLI tooling', description: 'Add, update, or rollback any component from the terminal.', image: 'https://placehold.co/600x400/16213e/ffffff?text=CLI' },
              { title: 'Copy ownership', description: 'No runtime package — the code lives in your repo.', image: 'https://placehold.co/600x400/0f3460/ffffff?text=Ownership' },
            ]}
          />
        }
        code={`import { StickyImageTextSwap } from '@/components/ui/StickyImageTextSwap'

export function Example() {
  return (
    <StickyImageTextSwap
      items={[
        {
          title: 'Component library',
          description: 'Drop-in components built with design tokens.',
          image: '/images/components.png',
        },
        {
          title: 'CLI tooling',
          description: 'Add, update, or rollback any component.',
          image: '/images/cli.png',
        },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function UnscramblingTextExamples() {
  return (
    <>
      <ComponentExample
        title="Unscrambling Text"
        description="Text that unscrambles into the final string"
        preview={<UnscramblingText text="Hello, World!" />}
        code={`import { UnscramblingText } from '@/components/ui/UnscramblingText'

export function Example() {
  return <UnscramblingText text="Hello, World!" />
}`}
      />
    </>
  )
}

// ─── AI EXAMPLES ───
import { AIThinkingIndicator } from '../../components/ui/AIThinkingIndicator'
import { HyperPersonalizedWidgetFeed } from '../../components/ui/HyperPersonalizedWidgetFeed'
import { PromptSuggestionChips } from '../../components/ui/PromptSuggestionChips'
import { SmartInsightsCard } from '../../components/ui/SmartInsightsCard'

function AIThinkingIndicatorExamples() {
  return (
    <>
      <ComponentExample
        title="AI Thinking Indicator"
        description="Animated indicator for AI processing state"
        preview={<AIThinkingIndicator />}
        code={`import { AIThinkingIndicator } from '@/components/ui/AIThinkingIndicator'

export function Example() {
  return <AIThinkingIndicator />
}`}
      />
    </>
  )
}

function HyperPersonalizedWidgetFeedExamples() {
  return (
    <>
      <ComponentExample
        title="Hyper Personalized Widget Feed"
        description="AI-curated personalized widget feed"
        preview={<HyperPersonalizedWidgetFeed />}
        code={`import { HyperPersonalizedWidgetFeed } from '@/components/ui/HyperPersonalizedWidgetFeed'

export function Example() {
  return <HyperPersonalizedWidgetFeed />
}`}
      />
    </>
  )
}

function PromptSuggestionChipsExamples() {
  return (
    <>
      <ComponentExample
        title="Prompt Suggestion Chips"
        description="Suggested prompts as clickable chips"
        preview={
          <PromptSuggestionChips
            suggestions={[
              { id: '1', text: 'Summarize this document' },
              { id: '2', text: 'Translate to Spanish' },
              { id: '3', text: 'Find action items' },
              { id: '4', text: 'Write a follow-up email' },
            ]}
            onSuggestionClick={(s) => console.log(s.text)}
          />
        }
        code={`import { PromptSuggestionChips } from '@/components/ui/PromptSuggestionChips'

export function Example() {
  return (
    <PromptSuggestionChips
      suggestions={[
        { id: '1', text: 'Summarize this document' },
        { id: '2', text: 'Translate to Spanish' },
        { id: '3', text: 'Find action items' },
      ]}
      onSuggestionClick={(s) => console.log(s.text)}
    />
  )
}`}
      />
    </>
  )
}

function SmartInsightsCardExamples() {
  return (
    <>
      <ComponentExample
        title="Smart Insights Card"
        description="AI-generated insights card with confidence score"
        preview={
          <SmartInsightsCard
            title="Revenue up 24% this month"
            summary="Driven by a surge in enterprise signups and a 12% reduction in churn. The cohort from Q1 campaign shows the highest lifetime value so far."
          />
        }
        code={`import { SmartInsightsCard } from '@/components/ui/SmartInsightsCard'

export function Example() {
  return (
    <SmartInsightsCard
      title="Revenue up 24% this month"
      summary="Driven by a surge in enterprise signups and a 12% reduction in churn."
    />
  )
}`}
      />
    </>
  )
}

// ─── AUTH EXAMPLES ───
import { AccessibleHighContrastMode } from '../../components/ui/AccessibleHighContrastMode'
import { BehavioralAuthSimulator } from '../../components/ui/BehavioralAuthSimulator'
import { BiometricPrompt } from '../../components/ui/BiometricPrompt'
import { IdentityVerificationStep } from '../../components/ui/IdentityVerificationStep'
import { LoginForm } from '../../components/ui/LoginForm'
import { PermissionsMatrix } from '../../components/ui/PermissionsMatrix'
import { RecoveryCodeDisplay } from '../../components/ui/RecoveryCodeDisplay'
import { SecurityActivityLog } from '../../components/ui/SecurityActivityLog'
import { SecurityOTPInput } from '../../components/ui/SecurityOTPInput'
import { SignupForm } from '../../components/ui/SignupForm'
import { TwoFactorAuth } from '../../components/ui/TwoFactorAuth'

function AccessibleHighContrastModeExamples() {
  return (
    <>
      <ComponentExample
        title="Accessible High Contrast Mode"
        description="Toggle for high-contrast accessibility mode"
        preview={<AccessibleHighContrastMode />}
        code={`import { AccessibleHighContrastMode } from '@/components/ui/AccessibleHighContrastMode'

export function Example() {
  return <AccessibleHighContrastMode />
}`}
      />
    </>
  )
}

function BehavioralAuthSimulatorExamples() {
  return (
    <>
      <ComponentExample
        title="Behavioral Auth Simulator"
        description="Behavioral biometrics authentication simulator"
        preview={<BehavioralAuthSimulator />}
        code={`import { BehavioralAuthSimulator } from '@/components/ui/BehavioralAuthSimulator'

export function Example() {
  return <BehavioralAuthSimulator />
}`}
      />
    </>
  )
}

function BiometricPromptExamples() {
  return (
    <>
      <ComponentExample
        title="Biometric Prompt"
        description="Face ID / Touch ID authentication prompt"
        preview={<BiometricPrompt />}
        code={`import { BiometricPrompt } from '@/components/ui/BiometricPrompt'

export function Example() {
  return <BiometricPrompt />
}`}
      />
    </>
  )
}

function IdentityVerificationStepExamples() {
  return (
    <>
      <ComponentExample
        title="Identity Verification Step"
        description="Step-by-step identity verification flow"
        preview={
          <IdentityVerificationStep
            documents={[
              { id: 'passport', label: 'Passport', status: 'pending' },
              { id: 'selfie', label: 'Selfie', status: 'pending' },
            ]}
          />
        }
        code={`import { IdentityVerificationStep } from '@/components/ui/IdentityVerificationStep'

export function Example() {
  return (
    <IdentityVerificationStep
      documents={[
        { id: 'passport', label: 'Passport', status: 'pending' },
        { id: 'selfie', label: 'Selfie', status: 'pending' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function LoginFormExamples() {
  return (
    <>
      <ComponentExample
        title="Login Form"
        description="Accessible login form with email and password"
        preview={<LoginForm />}
        code={`import { LoginForm } from '@/components/ui/LoginForm'

export function Example() {
  return <LoginForm />
}`}
      />
    </>
  )
}

function PermissionsMatrixExamples() {
  return (
    <>
      <ComponentExample
        title="Permissions Matrix"
        description="Role-permission matrix table with toggles"
        preview={
          <PermissionsMatrix
            roles={[
              { id: 'admin', name: 'Admin' },
              { id: 'editor', name: 'Editor' },
              { id: 'viewer', name: 'Viewer' },
            ]}
            permissions={[
              { id: 'read', name: 'Read' },
              { id: 'write', name: 'Write' },
              { id: 'delete', name: 'Delete' },
            ]}
            rolePermissions={{ admin: ['read', 'write', 'delete'], editor: ['read', 'write'], viewer: ['read'] }}
          />
        }
        code={`import { PermissionsMatrix } from '@/components/ui/PermissionsMatrix'

export function Example() {
  return (
    <PermissionsMatrix
      roles={[
        { id: 'admin', name: 'Admin' },
        { id: 'editor', name: 'Editor' },
        { id: 'viewer', name: 'Viewer' },
      ]}
      permissions={[
        { id: 'read', name: 'Read' },
        { id: 'write', name: 'Write' },
        { id: 'delete', name: 'Delete' },
      ]}
      rolePermissions={{
        admin: ['read', 'write', 'delete'],
        editor: ['read', 'write'],
        viewer: ['read'],
      }}
    />
  )
}`}
      />
    </>
  )
}

function RecoveryCodeDisplayExamples() {
  return (
    <>
      <ComponentExample
        title="Recovery Code Display"
        description="Recovery codes display with copy and download"
        preview={
          <RecoveryCodeDisplay
            codes={[
              'ABCD-1234', 'EFGH-5678', 'IJKL-9012',
              'MNOP-3456', 'QRST-7890', 'UVWX-2345',
            ]}
          />
        }
        code={`import { RecoveryCodeDisplay } from '@/components/ui/RecoveryCodeDisplay'

export function Example() {
  return (
    <RecoveryCodeDisplay
      codes={['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456', 'QRST-7890', 'UVWX-2345']}
    />
  )
}`}
      />
    </>
  )
}

function SecurityActivityLogExamples() {
  return (
    <>
      <ComponentExample
        title="Security Activity Log"
        description="Log of recent security events and logins"
        preview={
          <SecurityActivityLog
            events={[
              { id: '1', type: 'login', description: 'Login from Chrome on macOS', timestamp: new Date('2025-05-18T09:00:00'), location: 'Buenos Aires, AR' },
              { id: '2', type: 'password_change', description: 'Password changed', timestamp: new Date('2025-05-17T14:30:00'), location: 'Buenos Aires, AR' },
              { id: '3', type: 'login', description: 'Login from Safari on iPhone', timestamp: new Date('2025-05-16T20:10:00'), location: 'Montevideo, UY' },
            ]}
          />
        }
        code={`import { SecurityActivityLog } from '@/components/ui/SecurityActivityLog'

export function Example() {
  return (
    <SecurityActivityLog
      events={[
        { id: '1', type: 'login', description: 'Login from Chrome on macOS', timestamp: new Date(), location: 'Buenos Aires, AR' },
        { id: '2', type: 'password_change', description: 'Password changed', timestamp: new Date(), location: 'Buenos Aires, AR' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function SecurityOTPInputExamples() {
  return (
    <>
      <ComponentExample
        title="Security OTP Input"
        description="Secure OTP input for 2FA flows"
        preview={<SecurityOTPInput />}
        code={`import { SecurityOTPInput } from '@/components/ui/SecurityOTPInput'

export function Example() {
  return <SecurityOTPInput />
}`}
      />
    </>
  )
}

function SignupFormExamples() {
  return (
    <>
      <ComponentExample
        title="Signup Form"
        description="Multi-field signup form with validation"
        preview={<SignupForm />}
        code={`import { SignupForm } from '@/components/ui/SignupForm'

export function Example() {
  return <SignupForm />
}`}
      />
    </>
  )
}

function TwoFactorAuthExamples() {
  return (
    <>
      <ComponentExample
        title="Two Factor Auth"
        description="Two-factor authentication setup and verification"
        preview={<TwoFactorAuth />}
        code={`import { TwoFactorAuth } from '@/components/ui/TwoFactorAuth'

export function Example() {
  return <TwoFactorAuth />
}`}
      />
    </>
  )
}

// ─── COMMERCE EXAMPLES ───
import { CartPreview } from '../../components/ui/CartPreview'
import { InvoicePreview } from '../../components/ui/InvoicePreview'
import { OrderSummary } from '../../components/ui/OrderSummary'
import { PriceDisplay } from '../../components/ui/PriceDisplay'
import { ProductCard } from '../../components/ui/ProductCard'
import { RetailSwapInterface } from '../../components/ui/RetailSwapInterface'

function CartPreviewExamples() {
  return (
    <>
      <ComponentExample
        title="Cart Preview"
        description="Mini cart preview with items and checkout button"
        preview={
          <CartPreview
            items={[
              { id: '1', name: 'Wireless Headphones', price: 79.99, quantity: 1, image: 'https://placehold.co/60x60/1a1a2e/ffffff?text=HP' },
              { id: '2', name: 'USB-C Cable', price: 12.50, quantity: 2, image: 'https://placehold.co/60x60/16213e/ffffff?text=USB' },
            ]}
          />
        }
        code={`import { CartPreview } from '@/components/ui/CartPreview'

export function Example() {
  return (
    <CartPreview
      items={[
        { id: '1', name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: '2', name: 'USB-C Cable', price: 12.50, quantity: 2 },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function InvoicePreviewExamples() {
  return (
    <>
      <ComponentExample
        title="Invoice Preview"
        description="Printable invoice preview with line items"
        preview={
          <InvoicePreview
            invoiceNumber="INV-2025-001"
            dateIssued="2025-05-01"
            dueDate="2025-05-31"
            status="pending"
            from={{ name: 'Acme Corp', address: '123 Main St, NY', email: 'billing@acme.com' }}
            to={{ name: 'Jane Smith', address: '456 Oak Ave, CA', email: 'jane@example.com' }}
            items={[
              { description: 'Design system setup', quantity: 1, unitPrice: 2500, total: 2500 },
              { description: 'Component library', quantity: 3, unitPrice: 800, total: 2400 },
            ]}
            subtotal={4900}
            tax={490}
            total={5390}
          />
        }
        code={`import { InvoicePreview } from '@/components/ui/InvoicePreview'

export function Example() {
  return (
    <InvoicePreview
      invoiceNumber="INV-2025-001"
      dateIssued="2025-05-01"
      dueDate="2025-05-31"
      status="pending"
      from={{ name: 'Acme Corp', address: '123 Main St', email: 'billing@acme.com' }}
      to={{ name: 'Jane Smith', address: '456 Oak Ave', email: 'jane@example.com' }}
      items={[{ description: 'Design system setup', quantity: 1, unitPrice: 2500, total: 2500 }]}
      subtotal={2500}
      tax={250}
      total={2750}
    />
  )
}`}
      />
    </>
  )
}

function OrderSummaryExamples() {
  return (
    <>
      <ComponentExample
        title="Order Summary"
        description="Order summary with subtotal, tax and total"
        preview={
          <OrderSummary
            items={[
              { id: '1', name: 'Wireless Headphones', price: 79.99, quantity: 1 },
              { id: '2', name: 'USB-C Cable', price: 12.50, quantity: 2 },
              { id: '3', name: 'Phone Case', price: 19.99, quantity: 1 },
            ]}
          />
        }
        code={`import { OrderSummary } from '@/components/ui/OrderSummary'

export function Example() {
  return (
    <OrderSummary
      items={[
        { id: '1', name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: '2', name: 'USB-C Cable', price: 12.50, quantity: 2 },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function PriceDisplayExamples() {
  return (
    <>
      <ComponentExample
        title="Price Display"
        description="Formatted price with currency and discount"
        preview={
          <div className="flex flex-wrap gap-6 items-center">
            <PriceDisplay amount={99.99} />
            <PriceDisplay amount={149.00} originalAmount={199.00} />
            <PriceDisplay amount={0} label="Free" />
          </div>
        }
        code={`import { PriceDisplay } from '@/components/ui/PriceDisplay'

export function Example() {
  return (
    <div className="flex gap-6">
      <PriceDisplay amount={99.99} />
      <PriceDisplay amount={149.00} originalAmount={199.00} />
      <PriceDisplay amount={0} label="Free" />
    </div>
  )
}`}
      />
    </>
  )
}

function ProductCardExamples() {
  return (
    <>
      <ComponentExample
        title="Product Card"
        description="E-commerce product card with image, price and CTA"
        preview={
          <div className="flex flex-wrap gap-4">
            <ProductCard
              id="1"
              name="Wireless Headphones"
              price={79.99}
              image="https://placehold.co/200x200/1a1a2e/ffffff?text=HP"
            />
            <ProductCard
              id="2"
              name="USB-C Hub"
              price={49.99}
              image="https://placehold.co/200x200/16213e/ffffff?text=HUB"
            />
          </div>
        }
        code={`import { ProductCard } from '@/components/ui/ProductCard'

export function Example() {
  return (
    <ProductCard
      id="1"
      name="Wireless Headphones"
      price={79.99}
      image="/images/headphones.jpg"
    />
  )
}`}
      />
    </>
  )
}

function RetailSwapInterfaceExamples() {
  return (
    <>
      <ComponentExample
        title="Retail Swap Interface"
        description="Product swap / exchange interface"
        preview={
          <RetailSwapInterface
            assets={[
              { id: 'btc', symbol: 'BTC', name: 'Bitcoin', balance: 0.0234, price: 67500 },
              { id: 'eth', symbol: 'ETH', name: 'Ethereum', balance: 1.45, price: 3200 },
              { id: 'usdc', symbol: 'USDC', name: 'USD Coin', balance: 500, price: 1 },
            ]}
          />
        }
        code={`import { RetailSwapInterface } from '@/components/ui/RetailSwapInterface'

export function Example() {
  return (
    <RetailSwapInterface
      assets={[
        { id: 'btc', symbol: 'BTC', name: 'Bitcoin', balance: 0.02, price: 67500 },
        { id: 'eth', symbol: 'ETH', name: 'Ethereum', balance: 1.4, price: 3200 },
        { id: 'usdc', symbol: 'USDC', name: 'USD Coin', balance: 500, price: 1 },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── FINTECH EXAMPLES ───
import { AchTransactionsVisualizer } from '../../components/ui/AchTransactionsVisualizer'
import { BankAccountCard } from '../../components/ui/BankAccountCard'
import { CashbackWidget } from '../../components/ui/CashbackWidget'
import { CreditLimitManager } from '../../components/ui/CreditLimitManager'
import { CreditScoreSimulator } from '../../components/ui/CreditScoreSimulator'
import { CurrencyConverterWidget } from '../../components/ui/CurrencyConverterWidget'
import { EarlyPaymentDiscount } from '../../components/ui/EarlyPaymentDiscount'
import { ExpenseCategorizer } from '../../components/ui/ExpenseCategorizer'
import { FairUseLimitTracker } from '../../components/ui/FairUseLimitTracker'
import { FinancialGoalTracker } from '../../components/ui/FinancialGoalTracker'
import { FintechDashboardPreview } from '../../components/ui/FintechDashboardPreview'
import { GamifiedRewardTier } from '../../components/ui/GamifiedRewardTier'
import { InstallmentSimulator } from '../../components/ui/InstallmentSimulator'
import { InteractiveBillSplitter } from '../../components/ui/InteractiveBillSplitter'
import { MultiCurrencyWallet } from '../../components/ui/MultiCurrencyWallet'
import { PaymentConfirmationModal } from '../../components/ui/PaymentConfirmationModal'
import { PaymentMethodSelector } from '../../components/ui/PaymentMethodSelector'
import { QuickTransferBar } from '../../components/ui/QuickTransferBar'
import { RecurringInvestConfigurator } from '../../components/ui/RecurringInvestConfigurator'
import { RoundUpSavingsToggle } from '../../components/ui/RoundUpSavingsToggle'
import { SocialPaymentFeed } from '../../components/ui/SocialPaymentFeed'
import { SubscriptionManager } from '../../components/ui/SubscriptionManager'
import { TransactionList } from '../../components/ui/TransactionList'
import { TransferForm } from '../../components/ui/TransferForm'
import { VirtualCardPreview } from '../../components/ui/VirtualCardPreview'

function AchTransactionsVisualizerExamples() {
  return (
    <>
      <ComponentExample
        title="ACH Transactions Visualizer"
        description="Visualizes ACH transaction flow and status"
        preview={
          <AchTransactionsVisualizer
            transactions={[
              { id: '1', amount: 1250.00, type: 'CREDIT', status: 'completed', date: 'May 15', title: 'Payroll deposit' },
              { id: '2', amount: 89.99, type: 'DEBIT', status: 'pending', date: 'May 16', title: 'Netflix subscription' },
              { id: '3', amount: 500.00, type: 'CREDIT', status: 'completed', date: 'May 17', title: 'Client payment' },
            ]}
          />
        }
        code={`import { AchTransactionsVisualizer } from '@/components/ui/AchTransactionsVisualizer'

export function Example() {
  return (
    <AchTransactionsVisualizer
      transactions={[
        { id: '1', amount: 1250, type: 'CREDIT', status: 'completed', date: 'May 15', title: 'Payroll deposit' },
        { id: '2', amount: 89.99, type: 'DEBIT', status: 'pending', date: 'May 16', title: 'Netflix' },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function BankAccountCardExamples() {
  return (<><ComponentExample title="Bank Account Card" description="Bank account card with balance" preview={<BankAccountCard />} code={`import { BankAccountCard } from '@/components/ui/BankAccountCard'\nexport function Example() { return <BankAccountCard /> }`} /></>)
}
function CashbackWidgetExamples() {
  return (<><ComponentExample title="Cashback Widget" description="Cashback earned widget with progress" preview={<CashbackWidget earned={47.50} />} code={`import { CashbackWidget } from '@/components/ui/CashbackWidget'\nexport function Example() { return <CashbackWidget earned={47.50} /> }`} /></>)
}
function CreditLimitManagerExamples() {
  return (<><ComponentExample title="Credit Limit Manager" description="Credit limit display and adjustment controls" preview={<CreditLimitManager maxLimit={10000} />} code={`import { CreditLimitManager } from '@/components/ui/CreditLimitManager'\nexport function Example() { return <CreditLimitManager maxLimit={10000} /> }`} /></>)
}
function CreditScoreSimulatorExamples() {
  return (<><ComponentExample title="Credit Score Simulator" description="Interactive credit score simulator" preview={<CreditScoreSimulator />} code={`import { CreditScoreSimulator } from '@/components/ui/CreditScoreSimulator'\nexport function Example() { return <CreditScoreSimulator /> }`} /></>)
}
function CurrencyConverterWidgetExamples() {
  return (
    <>
      <ComponentExample
        title="Currency Converter Widget"
        description="Real-time currency converter with fee and delivery estimate"
        preview={
          <CurrencyConverterWidget
            currencies={[
              { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
              { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
              { code: 'ARS', flag: '🇦🇷', name: 'Argentine Peso' },
            ]}
            exchangeRate={0.92}
            feePercentage={1.5}
            estimatedDelivery="1–2 business days"
          />
        }
        code={`import { CurrencyConverterWidget } from '@/components/ui/CurrencyConverterWidget'

export function Example() {
  return (
    <CurrencyConverterWidget
      currencies={[
        { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
        { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
      ]}
      exchangeRate={0.92}
      feePercentage={1.5}
      estimatedDelivery="1–2 business days"
    />
  )
}`}
      />
    </>
  )
}
function EarlyPaymentDiscountExamples() {
  return (<><ComponentExample title="Early Payment Discount" description="Early payment discount calculator" preview={<EarlyPaymentDiscount totalInterestRemaining={3200} remainingMonths={24} monthlyPayment={450} />} code={`import { EarlyPaymentDiscount } from '@/components/ui/EarlyPaymentDiscount'\nexport function Example() { return <EarlyPaymentDiscount totalInterestRemaining={3200} remainingMonths={24} monthlyPayment={450} /> }`} /></>)
}
function ExpenseCategorizerExamples() {
  return (<><ComponentExample title="Expense Categorizer" description="Drag-and-drop expense categorization" preview={<ExpenseCategorizer />} code={`import { ExpenseCategorizer } from '@/components/ui/ExpenseCategorizer'\nexport function Example() { return <ExpenseCategorizer /> }`} /></>)
}
function FairUseLimitTrackerExamples() {
  return (
    <>
      <ComponentExample
        title="Fair Use Limit Tracker"
        description="Fair use limit tracker with usage bars per category"
        preview={
          <FairUseLimitTracker
            categories={[
              { id: 'transfers', title: 'Transfers', used: 3200, total: 5000 },
              { id: 'withdrawals', title: 'Withdrawals', used: 800, total: 1000 },
              { id: 'payments', title: 'Payments', used: 150, total: 500 },
            ]}
          />
        }
        code={`import { FairUseLimitTracker } from '@/components/ui/FairUseLimitTracker'

export function Example() {
  return (
    <FairUseLimitTracker
      categories={[
        { id: 'transfers', title: 'Transfers', used: 3200, total: 5000 },
        { id: 'withdrawals', title: 'Withdrawals', used: 800, total: 1000 },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function FinancialGoalTrackerExamples() {
  return (<><ComponentExample title="Financial Goal Tracker" description="Financial savings goal with progress ring" preview={<FinancialGoalTracker />} code={`import { FinancialGoalTracker } from '@/components/ui/FinancialGoalTracker'\nexport function Example() { return <FinancialGoalTracker /> }`} /></>)
}
function FintechDashboardPreviewExamples() {
  return (<><ComponentExample title="Fintech Dashboard Preview" description="Preview card of a fintech dashboard layout" preview={<FintechDashboardPreview />} code={`import { FintechDashboardPreview } from '@/components/ui/FintechDashboardPreview'\nexport function Example() { return <FintechDashboardPreview /> }`} /></>)
}
function GamifiedRewardTierExamples() {
  return (<><ComponentExample title="Gamified Reward Tier" description="Reward tier progress with gamification badges" preview={<GamifiedRewardTier />} code={`import { GamifiedRewardTier } from '@/components/ui/GamifiedRewardTier'\nexport function Example() { return <GamifiedRewardTier /> }`} /></>)
}
function InstallmentSimulatorExamples() {
  return (<><ComponentExample title="Installment Simulator" description="Loan installment calculator and preview" preview={<InstallmentSimulator purchaseAmount={1200} />} code={`import { InstallmentSimulator } from '@/components/ui/InstallmentSimulator'\nexport function Example() { return <InstallmentSimulator purchaseAmount={1200} /> }`} /></>)
}
function InteractiveBillSplitterExamples() {
  return (
    <>
      <ComponentExample
        title="Interactive Bill Splitter"
        description="Split the bill equally or by custom amounts among friends"
        preview={
          <InteractiveBillSplitter
            billAmount={124.50}
            friends={[
              { id: '1', name: 'Alice' },
              { id: '2', name: 'Bob' },
              { id: '3', name: 'Clara' },
            ]}
          />
        }
        code={`import { InteractiveBillSplitter } from '@/components/ui/InteractiveBillSplitter'

export function Example() {
  return (
    <InteractiveBillSplitter
      billAmount={124.50}
      friends={[
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Clara' },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function MultiCurrencyWalletExamples() {
  return (
    <>
      <ComponentExample
        title="Multi Currency Wallet"
        description="Wallet balances across multiple currencies"
        preview={
          <MultiCurrencyWallet
            wallets={[
              { id: '1', currencyCode: 'USD', currencyName: 'US Dollar', flag: '🇺🇸', balance: 1250.00 },
              { id: '2', currencyCode: 'EUR', currencyName: 'Euro', flag: '🇪🇺', balance: 890.50 },
              { id: '3', currencyCode: 'GBP', currencyName: 'British Pound', flag: '🇬🇧', balance: 320.75 },
            ]}
          />
        }
        code={`import { MultiCurrencyWallet } from '@/components/ui/MultiCurrencyWallet'

export function Example() {
  return (
    <MultiCurrencyWallet
      wallets={[
        { id: '1', currencyCode: 'USD', currencyName: 'US Dollar', flag: '🇺🇸', balance: 1250 },
        { id: '2', currencyCode: 'EUR', currencyName: 'Euro', flag: '🇪🇺', balance: 890 },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function PaymentConfirmationModalExamples() {
  return (<><ComponentExample title="Payment Confirmation Modal" description="Payment confirmation modal with details" preview={<PaymentConfirmationModal data={{ recipientName: 'Bob Chen', amount: 250, currency: 'USD' }} />} code={`import { PaymentConfirmationModal } from '@/components/ui/PaymentConfirmationModal'\nexport function Example() { return <PaymentConfirmationModal data={{ recipientName: 'Bob Chen', amount: 250, currency: 'USD' }} /> }`} /></>)
}
function PaymentMethodSelectorExamples() {
  return (
    <>
      <ComponentExample
        title="Payment Method Selector"
        description="Select from saved payment methods"
        preview={
          <PaymentMethodSelector
            methods={[
              { id: '1', type: 'card', last4: '4242', brand: 'Visa' },
              { id: '2', type: 'applepay' },
              { id: '3', type: 'paypal' },
            ]}
          />
        }
        code={`import { PaymentMethodSelector } from '@/components/ui/PaymentMethodSelector'

export function Example() {
  return (
    <PaymentMethodSelector
      methods={[
        { id: '1', type: 'card', last4: '4242', brand: 'Visa' },
        { id: '2', type: 'applepay' },
        { id: '3', type: 'paypal' },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function QuickTransferBarExamples() {
  return (<><ComponentExample title="Quick Transfer Bar" description="Quick transfer bar with recent contacts" preview={<QuickTransferBar contacts={[{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }, { id: '3', name: 'Clara' }, { id: '4', name: 'Dan' }]} />} code={`import { QuickTransferBar } from '@/components/ui/QuickTransferBar'\nexport function Example() { return <QuickTransferBar contacts={[{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }]} /> }`} /></>)
}
function RecurringInvestConfiguratorExamples() {
  return (<><ComponentExample title="Recurring Invest Configurator" description="Recurring investment configuration form" preview={<RecurringInvestConfigurator />} code={`import { RecurringInvestConfigurator } from '@/components/ui/RecurringInvestConfigurator'\nexport function Example() { return <RecurringInvestConfigurator /> }`} /></>)
}
function RoundUpSavingsToggleExamples() {
  return (<><ComponentExample title="Round Up Savings Toggle" description="Round-up savings toggle with projected amount" preview={<RoundUpSavingsToggle />} code={`import { RoundUpSavingsToggle } from '@/components/ui/RoundUpSavingsToggle'\nexport function Example() { return <RoundUpSavingsToggle /> }`} /></>)
}
function SocialPaymentFeedExamples() {
  return (
    <>
      <ComponentExample
        title="Social Payment Feed"
        description="Social-style payment activity feed"
        preview={
          <SocialPaymentFeed
            payments={[
              { id: '1', senderName: 'Alice', receiverName: 'Bob', note: 'Dinner last night 🍕', timestamp: new Date('2025-05-18T19:00:00'), likes: 3, comments: 1, privacy: 'public' },
              { id: '2', senderName: 'Clara', receiverName: 'Dan', note: 'Concert tickets 🎸', timestamp: new Date('2025-05-17T15:30:00'), likes: 7, comments: 2, privacy: 'friends' },
            ]}
          />
        }
        code={`import { SocialPaymentFeed } from '@/components/ui/SocialPaymentFeed'

export function Example() {
  return (
    <SocialPaymentFeed
      payments={[
        { id: '1', senderName: 'Alice', receiverName: 'Bob', note: 'Dinner', timestamp: new Date(), likes: 3, comments: 1, privacy: 'public' },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function SubscriptionManagerExamples() {
  return (<><ComponentExample title="Subscription Manager" description="Subscription plan manager with billing info" preview={<SubscriptionManager />} code={`import { SubscriptionManager } from '@/components/ui/SubscriptionManager'\nexport function Example() { return <SubscriptionManager /> }`} /></>)
}
function TransactionListExamples() {
  return (
    <>
      <ComponentExample
        title="Transaction List"
        description="Transaction history with income and expense entries"
        preview={
          <TransactionList
            transactions={[
              { id: '1', title: 'Payroll deposit', amount: 3500, type: 'income', date: '2025-05-15' },
              { id: '2', title: 'Netflix', amount: 17.99, type: 'expense', date: '2025-05-14' },
              { id: '3', title: 'Freelance project', amount: 800, type: 'income', date: '2025-05-12' },
              { id: '4', title: 'Grocery store', amount: 124.50, type: 'expense', date: '2025-05-11' },
            ]}
          />
        }
        code={`import { TransactionList } from '@/components/ui/TransactionList'

export function Example() {
  return (
    <TransactionList
      transactions={[
        { id: '1', title: 'Payroll deposit', amount: 3500, type: 'income', date: '2025-05-15' },
        { id: '2', title: 'Netflix', amount: 17.99, type: 'expense', date: '2025-05-14' },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function TransferFormExamples() {
  return (<><ComponentExample title="Transfer Form" description="Money transfer form with recipient and amount" preview={<TransferForm />} code={`import { TransferForm } from '@/components/ui/TransferForm'\nexport function Example() { return <TransferForm /> }`} /></>)
}
function VirtualCardPreviewExamples() {
  return (<><ComponentExample title="Virtual Card Preview" description="Animated virtual card with flip to show details" preview={<VirtualCardPreview />} code={`import { VirtualCardPreview } from '@/components/ui/VirtualCardPreview'\nexport function Example() { return <VirtualCardPreview /> }`} /></>)
}

// ─── COMMUNICATION EXAMPLES ───
import { ChatBubble } from '../../components/ui/ChatBubble'
import { ChatInput } from '../../components/ui/ChatInput'
import { CommentThread } from '../../components/ui/CommentThread'
import { MessageReactions } from '../../components/ui/MessageReactions'
import { NotificationCenterPanel } from '../../components/ui/NotificationCenterPanel'

function ChatBubbleExamples() {
  return (
    <>
      <ComponentExample
        title="Chat Bubble"
        description="Chat message bubble with avatar and timestamp"
        preview={
          <div className="space-y-2 max-w-sm w-full">
            <ChatBubble message="Hello! How are you doing?" sender="Alice" />
            <ChatBubble message="I'm doing great, thanks for asking!" isOwn />
          </div>
        }
        code={`import { ChatBubble } from '@/components/ui/ChatBubble'

export function Example() {
  return (
    <div className="space-y-2">
      <ChatBubble message="Hello!" sender="Alice" />
      <ChatBubble message="Hi there!" isOwn />
    </div>
  )
}`}
      />
    </>
  )
}

function ChatInputExamples() {
  return (
    <>
      <ComponentExample
        title="Chat Input"
        description="Chat input with attachments, emoji and send button"
        preview={<ChatInput className="max-w-md" />}
        code={`import { ChatInput } from '@/components/ui/ChatInput'

export function Example() {
  return <ChatInput />
}`}
      />
    </>
  )
}

function CommentThreadExamples() {
  return (
    <>
      <ComponentExample
        title="Comment Thread"
        description="Nested comment thread with replies and reactions"
        preview={
          <CommentThread
            comments={[
              { id: '1', author: 'Alice Martin', content: 'Great work on this feature!', timestamp: new Date('2025-05-18T10:00:00'), likes: 4 },
              { id: '2', author: 'Bob Chen', content: 'Agreed — the animation is really smooth.', timestamp: new Date('2025-05-18T10:15:00'), likes: 2 },
              { id: '3', author: 'Clara Diaz', content: 'Can we add dark mode support?', timestamp: new Date('2025-05-18T11:00:00'), likes: 1 },
            ]}
          />
        }
        code={`import { CommentThread } from '@/components/ui/CommentThread'

export function Example() {
  return (
    <CommentThread
      comments={[
        { id: '1', author: 'Alice Martin', content: 'Great work!', timestamp: new Date(), likes: 4 },
        { id: '2', author: 'Bob Chen', content: 'Agreed!', timestamp: new Date(), likes: 2 },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function MessageReactionsExamples() {
  return (
    <>
      <ComponentExample
        title="Message Reactions"
        description="Emoji reaction picker and display for messages"
        preview={
          <MessageReactions
            reactions={[
              { emoji: '👍', count: 5, reacted: true },
              { emoji: '❤️', count: 3, reacted: false },
              { emoji: '😂', count: 2, reacted: false },
            ]}
          />
        }
        code={`import { MessageReactions } from '@/components/ui/MessageReactions'

export function Example() {
  return (
    <MessageReactions
      reactions={[
        { emoji: '👍', count: 5, reacted: true },
        { emoji: '❤️', count: 3, reacted: false },
        { emoji: '😂', count: 2, reacted: false },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function NotificationCenterPanelExamples() {
  return (
    <>
      <ComponentExample
        title="Notification Center Panel"
        description="Notification center with grouped and unread"
        preview={
          <NotificationCenterPanel
            notifications={[
              { id: '1', title: 'New comment', message: 'Alice commented on your post', read: false, timestamp: new Date('2025-05-18T09:00:00') },
              { id: '2', title: 'Payment received', message: 'You received $250 from Bob', read: false, timestamp: new Date('2025-05-18T08:30:00') },
              { id: '3', title: 'Security alert', message: 'New login from Chrome on macOS', read: true, timestamp: new Date('2025-05-17T22:00:00') },
            ]}
          />
        }
        code={`import { NotificationCenterPanel } from '@/components/ui/NotificationCenterPanel'

export function Example() {
  return (
    <NotificationCenterPanel
      notifications={[
        { id: '1', title: 'New comment', message: 'Alice commented on your post', read: false, timestamp: new Date() },
        { id: '2', title: 'Payment received', message: 'You received $250 from Bob', read: true, timestamp: new Date() },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── SCHEDULING EXAMPLES ───
import { AgendaView } from '../../components/ui/AgendaView'
import { SchedulerTimeline } from '../../components/ui/SchedulerTimeline'

function AgendaViewExamples() {
  return (
    <>
      <ComponentExample
        title="Agenda View"
        description="Day/week agenda view for events"
        preview={
          <AgendaView
            currentDate={new Date('2025-05-18')}
            events={[
              { id: '1', date: new Date('2025-05-18T09:00:00'), title: 'Team standup' },
              { id: '2', date: new Date('2025-05-18T14:00:00'), title: 'Design review' },
              { id: '3', date: new Date('2025-05-19T10:00:00'), title: 'Sprint planning' },
            ]}
          />
        }
        code={`import { AgendaView } from '@/components/ui/AgendaView'

export function Example() {
  return (
    <AgendaView
      currentDate={new Date()}
      events={[
        { id: '1', date: new Date(), title: 'Team standup' },
        { id: '2', date: new Date(), title: 'Design review' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

function SchedulerTimelineExamples() {
  return (
    <>
      <ComponentExample
        title="Scheduler Timeline"
        description="Horizontal timeline scheduler for resources"
        preview={
          <SchedulerTimeline
            date={new Date('2025-05-18')}
            resources={[
              { id: 'r1', name: 'Alice' },
              { id: 'r2', name: 'Bob' },
            ]}
            events={[
              { id: 'e1', resourceId: 'r1', title: 'Client call', startTime: '09:00', endTime: '10:00' },
              { id: 'e2', resourceId: 'r1', title: 'Design review', startTime: '14:00', endTime: '15:30' },
              { id: 'e3', resourceId: 'r2', title: 'Sprint planning', startTime: '10:00', endTime: '11:00' },
            ]}
          />
        }
        code={`import { SchedulerTimeline } from '@/components/ui/SchedulerTimeline'

export function Example() {
  return (
    <SchedulerTimeline
      date={new Date()}
      resources={[{ id: 'r1', name: 'Alice' }, { id: 'r2', name: 'Bob' }]}
      events={[
        { id: 'e1', resourceId: 'r1', title: 'Client call', startTime: '09:00', endTime: '10:00' },
      ]}
    />
  )
}`}
      />
    </>
  )
}

// ─── MISC EXAMPLES ───
import { ActivityFeed } from '../../components/ui/ActivityFeed'
import { ActivityMonitor } from '../../components/ui/ActivityMonitor'
import { AddressSelector } from '../../components/ui/AddressSelector'
import { CardSecurityControls } from '../../components/ui/CardSecurityControls'
import { ContextualTrustBadge } from '../../components/ui/ContextualTrustBadge'
import { DeviceList } from '../../components/ui/DeviceList'
import { FileIntelligencePreview } from '../../components/ui/FileIntelligencePreview'
import { MicroCommitmentStepper } from '../../components/ui/MicroCommitmentStepper'
import { ProgressiveDisclosurePanel } from '../../components/ui/ProgressiveDisclosurePanel'
import { SlideToDelete } from '../../components/ui/SlideToDelete'
import { VoiceCommandOverlay } from '../../components/ui/VoiceCommandOverlay'

function ActivityFeedExamples() {
  return (<><ComponentExample title="Activity Feed" description="Activity feed with user actions and timestamps" preview={<ActivityFeed />} code={`import { ActivityFeed } from '@/components/ui/ActivityFeed'\nexport function Example() { return <ActivityFeed /> }`} /></>)
}
function ActivityMonitorExamples() {
  return (<><ComponentExample title="Activity Monitor" description="Real-time activity monitor dashboard" preview={<ActivityMonitor />} code={`import { ActivityMonitor } from '@/components/ui/ActivityMonitor'\nexport function Example() { return <ActivityMonitor /> }`} /></>)
}
function AddressSelectorExamples() {
  return (<><ComponentExample title="Address Selector" description="Address search and selection with map preview" preview={<AddressSelector />} code={`import { AddressSelector } from '@/components/ui/AddressSelector'\nexport function Example() { return <AddressSelector /> }`} /></>)
}
function CardSecurityControlsExamples() {
  return (<><ComponentExample title="Card Security Controls" description="Card security controls: freeze, limits, PIN" preview={<CardSecurityControls />} code={`import { CardSecurityControls } from '@/components/ui/CardSecurityControls'\nexport function Example() { return <CardSecurityControls /> }`} /></>)
}
function ContextualTrustBadgeExamples() {
  return (<><ComponentExample title="Contextual Trust Badge" description="Contextual trust badge for verified status" preview={<ContextualTrustBadge />} code={`import { ContextualTrustBadge } from '@/components/ui/ContextualTrustBadge'\nexport function Example() { return <ContextualTrustBadge /> }`} /></>)
}
function DeviceListExamples() {
  return (
    <>
      <ComponentExample
        title="Device List"
        description="List of connected and trusted devices"
        preview={
          <DeviceList
            devices={[
              { id: '1', name: 'MacBook Pro', type: 'laptop', status: 'active' },
              { id: '2', name: 'iPhone 15', type: 'phone', status: 'active' },
              { id: '3', name: 'iPad Air', type: 'tablet', status: 'inactive' },
            ]}
          />
        }
        code={`import { DeviceList } from '@/components/ui/DeviceList'

export function Example() {
  return (
    <DeviceList
      devices={[
        { id: '1', name: 'MacBook Pro', type: 'laptop', status: 'active' },
        { id: '2', name: 'iPhone 15', type: 'phone', status: 'active' },
      ]}
    />
  )
}`}
      />
    </>
  )
}
function FileIntelligencePreviewExamples() {
  return (<><ComponentExample title="File Intelligence Preview" description="AI-powered file preview with extracted metadata" preview={<FileIntelligencePreview file={{ name: 'Q1-Report.pdf', type: 'application/pdf' }} />} code={`import { FileIntelligencePreview } from '@/components/ui/FileIntelligencePreview'\nexport function Example() { return <FileIntelligencePreview file={{ name: 'Q1-Report.pdf', type: 'application/pdf' }} /> }`} /></>)
}
function MicroCommitmentStepperExamples() {
  return (<><ComponentExample title="Micro Commitment Stepper" description="Micro-commitment stepper for onboarding flows" preview={<MicroCommitmentStepper />} code={`import { MicroCommitmentStepper } from '@/components/ui/MicroCommitmentStepper'\nexport function Example() { return <MicroCommitmentStepper /> }`} /></>)
}
function ProgressiveDisclosurePanelExamples() {
  return (
    <>
      <ComponentExample
        title="Progressive Disclosure Panel"
        description="Summary shown by default; details revealed on expand"
        preview={
          <ProgressiveDisclosurePanel
            summary={<p className="text-sm font-medium text-text-primary">Your plan renews on June 1, 2025</p>}
            details={
              <div className="space-y-2 text-sm text-text-secondary">
                <p>Current plan: <strong>Pro</strong></p>
                <p>Billing cycle: Monthly</p>
                <p>Next charge: $49.00 on June 1</p>
                <p>Payment method: Visa ending in 4242</p>
              </div>
            }
          />
        }
        code={`import { ProgressiveDisclosurePanel } from '@/components/ui/ProgressiveDisclosurePanel'

export function Example() {
  return (
    <ProgressiveDisclosurePanel
      summary={<p>Your plan renews on June 1, 2025</p>}
      details={<p>Current plan: Pro · $49/month · Visa ···4242</p>}
    />
  )
}`}
      />
    </>
  )
}
function SlideToDeleteExamples() {
  return (
    <>
      <ComponentExample
        title="Slide to Delete"
        description="iOS-style swipe-to-delete — slide left to reveal the delete action"
        preview={
          <div className="w-full max-w-sm space-y-2">
            <SlideToDelete onDelete={() => console.log('deleted')}>
              <div className="flex items-center gap-3 p-3 bg-surface-primary rounded-lg border border-border-primary">
                <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue text-sm font-medium">A</div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Alice Martin</p>
                  <p className="text-xs text-text-secondary">alice@example.com</p>
                </div>
              </div>
            </SlideToDelete>
            <SlideToDelete onDelete={() => console.log('deleted')}>
              <div className="flex items-center gap-3 p-3 bg-surface-primary rounded-lg border border-border-primary">
                <div className="w-8 h-8 rounded-full bg-status-success/10 flex items-center justify-center text-status-success text-sm font-medium">B</div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Bob Chen</p>
                  <p className="text-xs text-text-secondary">bob@example.com</p>
                </div>
              </div>
            </SlideToDelete>
          </div>
        }
        code={`import { SlideToDelete } from '@/components/ui/SlideToDelete'

export function Example() {
  return (
    <SlideToDelete onDelete={() => console.log('deleted')}>
      <div className="p-3 rounded-lg border">
        <p className="font-medium">Alice Martin</p>
        <p className="text-sm text-text-secondary">alice@example.com</p>
      </div>
    </SlideToDelete>
  )
}`}
      />
    </>
  )
}
function VoiceCommandOverlayExamples() {
  return (
    <>
      <ComponentExample
        title="Voice Command Overlay"
        description="isOpen and onClose are required — wire them to a button to toggle the overlay"
        preview={
          (() => {
            const [open, setOpen] = React.useState(false)
            return (
              <div className="flex flex-col items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Activate voice command</Button>
                <VoiceCommandOverlay isOpen={open} onClose={() => setOpen(false)} />
              </div>
            )
          })()
        }
        code={`import { VoiceCommandOverlay } from '@/components/ui/VoiceCommandOverlay'
import { useState } from 'react'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Activate</button>
      <VoiceCommandOverlay isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}`}
      />
    </>
  )
}
