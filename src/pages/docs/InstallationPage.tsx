import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { CodeBlock } from '../../components/ui/CodeBlock'

const steps = [
  {
    number: 1,
    title: 'Install the package',
    description: 'Add the design system to your project using npm, pnpm, or yarn.',
    code: 'npm install @smart-coder-labs/apple-design-system',
    language: 'bash',
  },
  {
    number: 2,
    title: 'Add the CSS import',
    description: 'Import the design system styles in your entry file (main.tsx, index.tsx, or _app.tsx).',
    code: `// main.tsx
import '@smart-coder-labs/apple-design-system/styles'`,
    language: 'typescript',
  },
  {
    number: 3,
    title: 'Add components',
    description: 'Use the CLI to add individual components to your project. This copies the source into your codebase so you own it.',
    code: 'npx @smart-coder-labs/apple-design-system add Button Card Badge',
    language: 'bash',
  },
  {
    number: 4,
    title: 'Import and use',
    description: 'Import components from your local components directory and start building.',
    code: `import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function MyPage() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  )
}`,
    language: 'tsx',
  },
]

export default function InstallationPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Badge variant="info" size="sm">Getting Started</Badge>
        <Title level={1} weight="bold">Installation</Title>
        <Text variant="lead" color="secondary">
          Get the design system running in your project in under two minutes.
        </Text>
      </div>

      <div className="space-y-4">
        <Title level={4} weight="semibold">Requirements</Title>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">React 18+</Badge>
          <Badge variant="default">TypeScript 5+</Badge>
          <Badge variant="default">Tailwind CSS v4</Badge>
          <Badge variant="default">Vite or Next.js</Badge>
        </div>
      </div>

      <div className="space-y-6">
        <Title level={4} weight="semibold">Steps</Title>
        {steps.map((step) => (
          <Card key={step.number} variant="outlined" padding="none">
            <CardContent>
              <div className="p-6 border-b border-border-primary flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                <div>
                  <Text weight="semibold" className="mb-1">{step.title}</Text>
                  <Text variant="small" color="secondary">{step.description}</Text>
                </div>
              </div>
              <div className="p-4">
                <CodeBlock code={step.code} language={step.language} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card variant="flat" padding="md">
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-status-warning flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <Text weight="semibold" className="mb-1">You own the code</Text>
              <Text variant="small" color="secondary">
                Unlike traditional component libraries, the CLI copies component source files directly into your project.
                You can modify them freely — there is no external dependency to keep in sync.
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
