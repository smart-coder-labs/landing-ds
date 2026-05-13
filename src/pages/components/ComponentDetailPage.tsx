import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Switch } from '../../components/ui/Switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/ui/Collapsible'
import { Divider } from '../../components/ui/Divider'

/* ========================================
   COMPONENT REGISTRY (local knowledge)
   ======================================== */

interface ComponentMeta {
  name: string
  description: string
  category: string
  examples: Array<{ title: string; code: string; language?: string }>
}

const COMPONENT_META: Record<string, ComponentMeta> = {
  button: {
    name: 'Button',
    description: 'Trigger actions with multiple variants, sizes, icons, and loading states.',
    category: 'inputs',
    examples: [
      {
        title: 'Variants',
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`,
        language: 'tsx',
      },
      {
        title: 'Sizes',
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
        language: 'tsx',
      },
      {
        title: 'Loading state',
        code: `<Button variant="primary" loading>Loading...</Button>`,
        language: 'tsx',
      },
    ],
  },
  card: {
    name: 'Card',
    description: 'Contain and group related content with header, content, and footer sub-components.',
    category: 'layout',
    examples: [
      {
        title: 'Basic card',
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Short description here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
        language: 'tsx',
      },
      {
        title: 'Variants',
        code: `<Card variant="elevated">Elevated</Card>
<Card variant="glass">Glass</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="flat">Flat</Card>`,
        language: 'tsx',
      },
    ],
  },
  badge: {
    name: 'Badge',
    description: 'Display status labels, counts, or categories inline.',
    category: 'display',
    examples: [
      {
        title: 'Variants',
        code: `<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
        language: 'tsx',
      },
    ],
  },
  title: {
    name: 'Title',
    description: 'Semantic headings with a typographic scale from level 1 to 6.',
    category: 'typography',
    examples: [
      {
        title: 'Levels',
        code: `<Title level={1}>Heading 1</Title>
<Title level={2}>Heading 2</Title>
<Title level={3}>Heading 3</Title>
<Title level={4}>Heading 4</Title>`,
        language: 'tsx',
      },
      {
        title: 'Colors',
        code: `<Title level={3} color="accent">Accent blue</Title>
<Title level={3} color="secondary">Secondary</Title>`,
        language: 'tsx',
      },
    ],
  },
  text: {
    name: 'Text',
    description: 'Body, lead, small, and tiny text with color, weight, and alignment props.',
    category: 'typography',
    examples: [
      {
        title: 'Variants',
        code: `<Text variant="lead">Lead text for introductions.</Text>
<Text variant="body">Body text for general content.</Text>
<Text variant="small">Small helper text.</Text>
<Text variant="tiny">Tiny metadata text.</Text>`,
        language: 'tsx',
      },
    ],
  },
  tabs: {
    name: 'Tabs',
    description: 'Switch between content sections with animated indicator.',
    category: 'navigation',
    examples: [
      {
        title: 'Basic tabs',
        code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
    <TabsTrigger value="examples">Examples</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="api">API content</TabsContent>
  <TabsContent value="examples">Examples content</TabsContent>
</Tabs>`,
        language: 'tsx',
      },
    ],
  },
  switch: {
    name: 'Switch',
    description: 'Toggle a boolean setting with label and description.',
    category: 'inputs',
    examples: [
      {
        title: 'With label',
        code: `<Switch label="Dark mode" description="Enable dark color scheme" />`,
        language: 'tsx',
      },
      {
        title: 'Sizes',
        code: `<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />`,
        language: 'tsx',
      },
    ],
  },
  divider: {
    name: 'Divider',
    description: 'Horizontal or vertical rule to separate content sections.',
    category: 'layout',
    examples: [
      {
        title: 'Horizontal',
        code: `<Divider />
<Divider label="or" />`,
        language: 'tsx',
      },
    ],
  },
  codeblock: {
    name: 'CodeBlock',
    description: 'Display code snippets with syntax highlighting header and a one-click copy button.',
    category: 'display',
    examples: [
      {
        title: 'Usage',
        code: `<CodeBlock
  code="npm install @smart-coder-labs/apple-design-system"
  language="bash"
/>`,
        language: 'tsx',
      },
    ],
  },
  collapsible: {
    name: 'Collapsible',
    description: 'Expand and collapse content sections with smooth animation.',
    category: 'disclosure',
    examples: [
      {
        title: 'Basic',
        code: `<Collapsible>
  <CollapsibleTrigger>Toggle section</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content revealed on click.
  </CollapsibleContent>
</Collapsible>`,
        language: 'tsx',
      },
    ],
  },
  footer: {
    name: 'Footer',
    description: 'Site-wide footer with top brand section, column links, and bottom bar.',
    category: 'layout',
    examples: [
      {
        title: 'Structure',
        code: `<Footer>
  <FooterTop title="Brand" description="Tagline." />
  <FooterContent>
    <FooterColumn title="Product">
      <FooterLink href="#">Features</FooterLink>
    </FooterColumn>
  </FooterContent>
  <FooterBottom>© 2025</FooterBottom>
</Footer>`,
        language: 'tsx',
      },
    ],
  },
  gridsystem: {
    name: 'GridSystem',
    description: 'Responsive column grid built on CSS Grid with gap and column props.',
    category: 'layout',
    examples: [
      {
        title: 'Responsive grid',
        code: `<GridSystem cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</GridSystem>`,
        language: 'tsx',
      },
    ],
  },
}

/* ========================================
   LIVE PREVIEWS
   ======================================== */

function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" loading>Loading</Button>
    </div>
  )
}

function CardPreview() {
  return (
    <Card variant="outlined" padding="md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text color="secondary" variant="small">Card content goes here. Use sub-components for structure.</Text>
      </CardContent>
    </Card>
  )
}

function BadgePreview() {
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
}

function TitlePreview() {
  return (
    <div className="space-y-2">
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
      <Title level={4}>Heading 4</Title>
      <Title level={5} color="secondary">Heading 5 secondary</Title>
      <Title level={6} color="accent">Heading 6 accent</Title>
    </div>
  )
}

function TextPreview() {
  return (
    <div className="space-y-2">
      <Text variant="lead">Lead — introductory paragraphs</Text>
      <Text variant="body">Body — general content</Text>
      <Text variant="small" color="secondary">Small — helper and metadata</Text>
      <Text variant="tiny" color="tertiary">Tiny — captions and fine print</Text>
    </div>
  )
}

function TabsPreview() {
  return (
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">Overview</TabsTrigger>
        <TabsTrigger value="two">API</TabsTrigger>
        <TabsTrigger value="three">Examples</TabsTrigger>
      </TabsList>
      <TabsContent value="one"><Text color="secondary" className="mt-3">Overview content.</Text></TabsContent>
      <TabsContent value="two"><Text color="secondary" className="mt-3">API documentation.</Text></TabsContent>
      <TabsContent value="three"><Text color="secondary" className="mt-3">Code examples.</Text></TabsContent>
    </Tabs>
  )
}

function SwitchPreview() {
  const [n, setN] = React.useState(true)
  const [d, setD] = React.useState(false)

  return (
    <div className="space-y-4">
      <Switch checked={n} onCheckedChange={setN} label="Notifications" description="Receive email notifications" />
      <Switch checked={d} onCheckedChange={setD} label="Dark mode" size="sm" />
      <Switch checked={false} label="Disabled" disabled />
    </div>
  )
}

function CollapsiblePreview() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-primary text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors w-full">
        Click to toggle
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 px-4 py-3 rounded-lg bg-surface-secondary">
          <Text variant="small" color="secondary">Hidden content revealed with smooth animation.</Text>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function DividerPreview() {
  return (
    <div className="space-y-4">
      <Text color="secondary">Content above</Text>
      <Divider />
      <Text color="secondary">Content below</Text>
      <Divider label="or" />
      <Text color="secondary">Content after labeled divider</Text>
    </div>
  )
}

function CodeBlockPreview() {
  return (
    <CodeBlock
      code={`import { Button } from '@/components/ui/Button'\n\n<Button variant="primary">Get started</Button>`}
      language="tsx"
    />
  )
}

const PREVIEWS: Record<string, React.ReactNode> = {
  button: <ButtonPreview />,
  card: <CardPreview />,
  badge: <BadgePreview />,
  title: <TitlePreview />,
  text: <TextPreview />,
  tabs: <TabsPreview />,
  switch: <SwitchPreview />,
  collapsible: <CollapsiblePreview />,
  divider: <DividerPreview />,
  codeblock: <CodeBlockPreview />,
}

/* ========================================
   PAGE
   ======================================== */

export default function ComponentDetailPage() {
  const { name } = useParams<{ name: string }>()
  const key = (name ?? '').toLowerCase()
  const meta = COMPONENT_META[key]

  if (!meta) {
    return (
      <div className="space-y-4">
        <Title level={2}>Component not found</Title>
        <Text color="secondary">
          The component <code className="text-accent-blue font-mono">{name}</code> is not in the local registry.
        </Text>
        <Link to="/components">
          <Button variant="ghost" size="sm">Back to components</Button>
        </Link>
      </div>
    )
  }

  const preview = PREVIEWS[key]
  const installCmd = `npx @smart-coder-labs/apple-design-system add ${meta.name}`
  const importLine = `import { ${meta.name} } from '@/components/ui/${meta.name}'`

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Link to="/components" className="text-text-tertiary hover:text-text-secondary text-sm transition-colors">
            Components
          </Link>
          <span className="text-text-tertiary">/</span>
          <span className="text-sm text-text-primary">{meta.name}</span>
        </div>
        <Title level={1} weight="bold">{meta.name}</Title>
        <Text variant="lead" color="secondary">{meta.description}</Text>
        <Badge>{meta.category}</Badge>
      </div>

      <div className="space-y-3">
        <Title level={4} weight="semibold" as="h2">Installation</Title>
        <CodeBlock code={installCmd} language="bash" />
        <CodeBlock code={importLine} language="typescript" />
      </div>

      {preview && (
        <div className="space-y-3">
          <Title level={4} weight="semibold" as="h2">Preview</Title>
          <Card variant="outlined" padding="lg">
            <CardContent>{preview}</CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        <Title level={4} weight="semibold" as="h2">Examples</Title>
        {meta.examples.map((example) => (
          <div key={example.title} className="space-y-2">
            <Text weight="medium">{example.title}</Text>
            <CodeBlock code={example.code} language={example.language ?? 'tsx'} showLineNumbers />
          </div>
        ))}
      </div>
    </div>
  )
}
