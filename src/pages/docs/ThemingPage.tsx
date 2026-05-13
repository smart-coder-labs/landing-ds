import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { CodeBlock } from '../../components/ui/CodeBlock'
import ThemeToggle from '../../components/ThemeToggle'

const colorTokens = [
  { token: '--color-background-primary', description: 'Page background', sample: 'bg-background-primary' },
  { token: '--color-background-secondary', description: 'Card surfaces', sample: 'bg-background-secondary' },
  { token: '--color-text-primary', description: 'Headings and body text', sample: 'bg-text-primary' },
  { token: '--color-text-secondary', description: 'Muted/secondary text', sample: 'bg-text-secondary' },
  { token: '--color-accent-blue', description: 'Primary action color', sample: 'bg-accent-blue' },
  { token: '--color-border-primary', description: 'Default border color', sample: 'bg-border-primary' },
  { token: '--color-status-success', description: 'Success state', sample: 'bg-status-success' },
  { token: '--color-status-error', description: 'Error/destructive state', sample: 'bg-status-error' },
  { token: '--color-status-warning', description: 'Warning state', sample: 'bg-status-warning' },
]

const cssVarsCode = `/* apple-ds.css */
:root {
  --color-background-primary: #ffffff;
  --color-background-secondary: #f5f5f7;
  --color-text-primary: #1d1d1f;
  --color-text-secondary: #6e6e73;
  --color-accent-blue: #0071e3;
  --color-border-primary: rgba(0, 0, 0, 0.1);
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}

.dark {
  --color-background-primary: #000000;
  --color-background-secondary: #1c1c1e;
  --color-text-primary: #f5f5f7;
  --color-text-secondary: #86868b;
  --color-accent-blue: #2997ff;
  --color-border-primary: rgba(255, 255, 255, 0.1);
}`

const customThemeCode = `/* Override tokens in your own CSS */
:root {
  --color-accent-blue: #7c3aed; /* purple accent */
  --radius-xl: 0.5rem;         /* sharper radius */
}`

export default function ThemingPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Badge variant="info" size="sm">Customization</Badge>
        <Title level={1} weight="bold">Theming</Title>
        <Text variant="lead" color="secondary">
          The design system uses CSS custom properties for every token. Dark mode and custom themes require zero JavaScript.
        </Text>
      </div>

      <div className="space-y-4">
        <Title level={4} weight="semibold">Dark mode toggle</Title>
        <Text color="secondary">
          The toggle below switches the entire page theme by adding/removing the <code className="text-accent-blue text-sm font-mono">dark</code> class
          on <code className="text-accent-blue text-sm font-mono">document.documentElement</code>.
          The theme is persisted to <code className="text-accent-blue text-sm font-mono">localStorage</code>.
        </Text>
        <Card variant="outlined" padding="md">
          <CardContent>
            <div className="flex items-center justify-between">
              <Text weight="medium">Current theme</Text>
              <div className="flex items-center gap-3">
                <Text variant="small" color="secondary">Toggle:</Text>
                <ThemeToggle />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Title level={4} weight="semibold">CSS variables</Title>
        <Text color="secondary">
          All tokens are defined as CSS custom properties. Tailwind CSS v4 reads them natively via the <code className="text-accent-blue text-sm font-mono">@theme</code> directive.
        </Text>
        <CodeBlock code={cssVarsCode} language="css" showLineNumbers />
      </div>

      <div className="space-y-4">
        <Title level={4} weight="semibold">Colors</Title>
        <div className="space-y-2">
          {colorTokens.map(({ token, description, sample }) => (
            <div key={token} className="flex items-center gap-4 py-2 border-b border-border-primary last:border-0">
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 border border-border-primary ${sample}`} />
              <div className="flex-1 min-w-0">
                <code className="text-sm font-mono text-text-primary">{token}</code>
                <Text variant="tiny" color="secondary" className="mt-0.5">{description}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Title level={4} weight="semibold">Custom theme</Title>
        <Text color="secondary">
          Override any token in your own CSS file. Import it after the design system styles.
        </Text>
        <CodeBlock code={customThemeCode} language="css" />
      </div>

      <div className="space-y-4">
        <Title level={4} weight="semibold">Typography scale</Title>
        <Card variant="flat" padding="md">
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Title 1', cls: 'text-5xl font-bold' },
                { label: 'Title 2', cls: 'text-4xl font-bold' },
                { label: 'Title 3', cls: 'text-3xl font-semibold' },
                { label: 'Title 4', cls: 'text-2xl font-semibold' },
                { label: 'Lead', cls: 'text-xl' },
                { label: 'Body', cls: 'text-base' },
                { label: 'Small', cls: 'text-sm' },
                { label: 'Tiny', cls: 'text-xs' },
              ].map(({ label, cls }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="text-xs text-text-tertiary w-16 flex-shrink-0">{label}</span>
                  <span className={`text-text-primary ${cls}`}>The quick brown fox</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
