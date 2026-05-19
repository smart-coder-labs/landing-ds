import { motion } from 'framer-motion'
import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Badge } from '../../components/ui/Badge'
import { CodeBlock } from '../../components/ui/CodeBlock'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const folderStructureCode = `components/ui/Calendar/
├── Calendar.tsx          # Root component — entry point
├── Calendar.types.ts     # All interfaces and types
├── Calendar.context.tsx  # Shared context (when compound)
├── Calendar.utils.ts     # Pure helper functions
├── Calendar.grid.tsx     # Subcomponent: MonthGrid
├── Calendar.header.tsx   # Subcomponent: MonthNav
├── Calendar.day.tsx      # Subcomponent: DayCell
├── Calendar.styles.ts    # cva variants (when complex)
├── Calendar.mock.ts      # Mock data (optional, dev only)
└── index.ts              # Barrel export`

const splitRulesCode = `// File size thresholds
< 150 lines  → single file is fine
150–300      → extract .types.ts
> 300        → full folder split (types + styles + utils + subcomponents)`

const compoundPatternCode = `// 1. Create context
const SearchInputContext = createContext<SearchInputContextValue | null>(null)

function useSearchInputContext() {
  const ctx = useContext(SearchInputContext)
  if (!ctx) throw new Error('Must be used within SearchInput')
  return ctx
}

// 2. Root provides context, renders children in compound mode
const SearchInputRoot = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ value, onChange, children, isLoading, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const contextValue = { isFocused, setIsFocused, isLoading, disabled, inputRef }

    if (children) {
      return (
        <SearchInputContext.Provider value={contextValue}>
          <div ref={ref} {...props}>{children}</div>
        </SearchInputContext.Provider>
      )
    }
    // simple mode — renders a self-contained input
    return <SearchInputContext.Provider value={contextValue}>...</SearchInputContext.Provider>
  }
)

// 3. Sub-components consume context
const SearchInputInput = forwardRef<HTMLInputElement, SearchInputInputProps>(
  ({ onChange, ...props }, ref) => {
    const { isFocused, setIsFocused } = useSearchInputContext()
    // ...
  }
)

// 4. Attach sub-components to root
const SearchInput = SearchInputRoot as SearchInputComponent
SearchInput.Input    = SearchInputInput
SearchInput.Dropdown = SearchInputDropdown
SearchInput.Section  = SearchInputSection
SearchInput.Item     = SearchInputItem`

const cvaCode = `import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // base classes — always applied
  'inline-flex items-center justify-center font-medium rounded-xl transition-all',
  {
    variants: {
      variant: {
        primary:     'bg-accent-blue text-white hover:bg-accent-blue-hover',
        secondary:   'bg-surface-secondary text-text-primary hover:bg-surface-tertiary',
        destructive: 'bg-status-error text-white hover:bg-status-error/90',
      },
      size: {
        sm: 'h-8  px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

// Usage in component
interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
}

export function Button({ variant, size, className, children }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  )
}`

const tokenCode = `/* globals.css — Light mode */
:root {
  --color-bg-primary:      #ffffff;
  --color-bg-secondary:    #f5f5f7;
  --color-surface-primary: #ffffff;
  --color-text-primary:    #1d1d1f;
  --color-text-secondary:  #6e6e73;
  --color-text-tertiary:   #86868b;
  --color-border-primary:  rgba(0, 0, 0, 0.08);
  --color-accent-blue:     #007aff;
  --color-status-success:  #34c759;
  --color-status-warning:  #ff9500;
  --color-status-error:    #ff3b30;

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
}

/* Dark mode */
.dark {
  --color-bg-primary:      #000000;
  --color-bg-secondary:    #1c1c1e;
  --color-text-primary:    #ffffff;
  --color-accent-blue:     #0a84ff;
  --color-status-success:  #32d74b;
  --color-status-error:    #ff453a;
  --color-border-primary:  rgba(255, 255, 255, 0.12);
}`

const animationCode = `// Animation tokens
const DURATION = { fast: 0.16, normal: 0.22, slow: 0.26 }
const EASE_APPLE = [0.16, 1, 0.3, 1]  // Apple spring curve
const SPRING = { stiffness: 300, damping: 30, mass: 0.8 }

// Fade-up variant (used in every page)
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: EASE_APPLE },
  }),
}

// Usage — stagger children with custom={index}
<motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
  First item
</motion.div>
<motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
  Second item — 70ms delayed
</motion.div>`

const namingCode = `// ✅ Correct conventions
interface AccordionProps {}          // Props interface: {Component}Props
interface AccordionItemProps {}
type ActivityType = 'post' | 'like'  // Types: PascalCase

const AccordionTrigger = ...        // Sub-components: PascalCase
function formatCurrency() {}        // Helpers: camelCase

// In index.ts — always barrel-export types too
export { Accordion } from './Accordion'
export { AccordionItem } from './Accordion'
export type { AccordionProps } from './Accordion.types'`

const fileRules = [
  { file: '{Component}.tsx', responsibility: 'Root component — entry point. forwardRef + displayName required.' },
  { file: '{Component}.types.ts', responsibility: 'All interfaces and types. No runtime code.' },
  { file: '{Component}.context.tsx', responsibility: 'React context + useContext hook for compound components.' },
  { file: '{Component}.utils.ts', responsibility: 'Pure helper functions (formatDate, getMonthDays, etc.).' },
  { file: '{Component}.styles.ts', responsibility: 'cva variants when the component has multiple visual variants.' },
  { file: '{Component}.mock.ts', responsibility: 'Static mock data for dev/Storybook only. Never used in production.' },
  { file: 'index.ts', responsibility: 'Barrel export — re-exports components, types, and variants.' },
]

export default function ArchitecturePage() {
  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <Badge variant="info" size="sm">Internals</Badge>
        <Title level={1} weight="bold">Architecture</Title>
        <Text variant="lead" color="secondary">
          How the design system is structured — file conventions, the compound component pattern, CVA variants, design tokens, and animation standards.
        </Text>
      </motion.div>

      {/* Copy-owned model */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <h2 id="copy-owned-model" className="text-xl font-semibold text-text-primary">Copy-owned model</h2>
        <Text color="secondary">
          This is NOT a traditional component library. When you run <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">add</code>, the CLI copies the component source directly into your project under <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">src/components/ui/</code>. You own the code — no black box, no runtime dependency to upgrade.
        </Text>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { title: 'Full ownership', body: 'The code lives in your repo. Modify it freely — no upstream conflicts.' },
            { title: 'No runtime dep', body: 'Once copied, removing the npm package has zero effect on running code.' },
            { title: 'Opt-in updates', body: 'Updates are explicit CLI calls, not silent npm upgrades that break things.' },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-xl border border-border-primary bg-surface-secondary/40 px-4 py-4 space-y-1">
              <p className="text-sm font-medium text-text-primary">{title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Folder structure */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
        <h2 id="folder-structure" className="text-xl font-semibold text-text-primary">Folder structure</h2>
        <Text color="secondary">
          Every component lives in its own folder. The number of files scales with complexity — simple components stay in a single file, complex ones are fully split.
        </Text>
        <CodeBlock code={folderStructureCode} language="bash" showLineNumbers={false} />
        <CodeBlock code={splitRulesCode} language="typescript" showLineNumbers={false} />
      </motion.div>

      {/* File responsibilities */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
        <h2 id="file-responsibilities" className="text-xl font-semibold text-text-primary">File responsibilities</h2>
        <div className="rounded-lg border border-border-primary overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-primary bg-surface-secondary/50">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-56">File</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {fileRules.map((row, i) => (
                <tr key={row.file} className={i % 2 === 0 ? '' : 'bg-surface-secondary/20'}>
                  <td className="px-4 py-3 align-top">
                    <code className="text-xs font-mono text-text-primary">{row.file}</code>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-text-secondary">{row.responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Compound component pattern */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
        <h2 id="compound-component-pattern" className="text-xl font-semibold text-text-primary">Compound component pattern</h2>
        <Text color="secondary">
          Complex components (SearchInput, Accordion, Tabs, Card) use the compound pattern: a shared React context carries state between the root and its sub-components, attached via dot notation (<code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">SearchInput.Dropdown</code>, <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">SearchInput.Item</code>, etc.). The root detects compound mode by checking whether <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">children</code> is provided.
        </Text>
        <CodeBlock code={compoundPatternCode} language="typescript" showLineNumbers={false} />
        <div className="rounded-xl border border-border-primary bg-surface-secondary/30 px-4 py-3 space-y-1">
          <p className="text-xs font-medium text-text-primary">Rules for every compound component</p>
          <ul className="text-xs text-text-secondary space-y-1 mt-2 list-disc list-inside">
            <li><code className="font-mono">"use client"</code> at the top of every file</li>
            <li><code className="font-mono">React.forwardRef</code> on root and all sub-components</li>
            <li><code className="font-mono">displayName</code> set on every forwardRef result</li>
            <li>Sub-components attached directly on the root object (<code className="font-mono">Root.Sub = Sub</code>)</li>
            <li>Separate <code className="font-mono">.context.tsx</code> file when context logic is non-trivial</li>
          </ul>
        </div>
      </motion.div>

      {/* CVA variants */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
        <h2 id="cva-variants" className="text-xl font-semibold text-text-primary">CVA variants</h2>
        <Text color="secondary">
          Visual variants (size, intent, state) are defined with <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">cva</code> from <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">class-variance-authority</code>. This keeps variant logic declarative, type-safe, and out of the render function. The generated variant function is also exported so consumers can reference the same classes externally.
        </Text>
        <CodeBlock code={cvaCode} language="typescript" showLineNumbers={false} />
      </motion.div>

      {/* Design tokens */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
        <h2 id="design-tokens" className="text-xl font-semibold text-text-primary">Design tokens</h2>
        <Text color="secondary">
          All colors, shadows, and radii are CSS custom properties defined in <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">globals.css</code>. Dark mode swaps the same tokens — no JavaScript required. Hardcoded color values are forbidden inside component source.
        </Text>
        <CodeBlock code={tokenCode} language="css" showLineNumbers={false} />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: 'Border radius', value: 'md: 12px · lg: 16px · xl: 20px' },
            { label: 'Accent color', value: 'Light: #007aff · Dark: #0a84ff' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-border-primary bg-surface-secondary/30 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-text-secondary">{label}</span>
              <code className="text-xs font-mono text-text-primary">{value}</code>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Animation standards */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={7}>
        <h2 id="animation-standards" className="text-xl font-semibold text-text-primary">Animation standards</h2>
        <Text color="secondary">
          All animations use Framer Motion. Durations, easing, and spring parameters are standardised across the system to maintain a coherent feel. The Apple spring curve <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">[0.16, 1, 0.3, 1]</code> is the default for enter/exit transitions.
        </Text>
        <CodeBlock code={animationCode} language="typescript" showLineNumbers={false} />
      </motion.div>

      {/* Naming conventions */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={8}>
        <h2 id="naming-conventions" className="text-xl font-semibold text-text-primary">Naming conventions</h2>
        <CodeBlock code={namingCode} language="typescript" showLineNumbers={false} />
        <div className="rounded-lg border border-border-primary overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-primary bg-surface-secondary/50">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-40">Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-32">Convention</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide">Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Components', 'PascalCase', 'Accordion, Select, SearchInput'],
                ['Props interfaces', '{Component}Props', 'AccordionProps, SearchInputInputProps'],
                ['Sub-components', 'PascalCase', 'AccordionTrigger, SearchInput.Item'],
                ['Context values', '{Component}ContextValue', 'SearchInputContextValue'],
                ['Helper functions', 'camelCase', 'formatCurrency, getMonthDays'],
                ['cva functions', '{component}Variants', 'buttonVariants, searchInputVariants'],
              ].map(([type, convention, example], i) => (
                <tr key={type} className={i % 2 === 0 ? '' : 'bg-surface-secondary/20'}>
                  <td className="px-4 py-3 align-top text-xs text-text-primary">{type}</td>
                  <td className="px-4 py-3 align-top"><code className="text-xs font-mono text-accent-primary">{convention}</code></td>
                  <td className="px-4 py-3 align-top text-xs text-text-secondary">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
