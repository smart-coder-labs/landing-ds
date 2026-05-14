import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Copy, Check, ChevronLeft } from 'lucide-react'

import { Title } from '../../components/ui/Title'
import Text from '../../components/ui/Text'
import { Button } from '../../components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { ALL_COMPONENTS, COMPONENT_CATEGORIES, ComponentEntry } from '../../data/components'

// Helper function to convert text to slug format for heading IDs
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-|-$/g, '')      // Remove leading/trailing hyphens
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
}

interface ComponentExampleProps {
  title: string
  description?: string
  preview: React.ReactNode
  code: string
  componentName?: string
}

function ComponentExample({ title, description, preview, code, componentName }: ComponentExampleProps) {
  const [copied, setCopied] = useState(false)
  
  // Generate scoped ID for the example heading
  const exampleId = componentName 
    ? `doc-${componentName.toLowerCase()}-examples-${slugify(title)}`
    : undefined

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 mb-8">
      <div>
        <h3 id={exampleId} className="text-base font-medium text-text-primary mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>

      <Tabs defaultValue="preview" className="w-full border border-border-primary rounded-lg overflow-hidden">
        <div className="border-b border-border-primary bg-surface-secondary">
          <TabsList className="bg-transparent">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="p-6 border-t-0 bg-background-primary">
          <div className="flex items-center justify-center min-h-[200px] rounded-lg p-4 bg-surface-secondary">
            {preview}
          </div>
        </TabsContent>

        <TabsContent value="code" className="p-0 border-t-0 bg-background-primary">
          <div className="relative">
            <pre className="overflow-x-auto p-4 bg-surface-secondary text-sm font-mono text-text-primary max-h-96">
              <code>{code}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
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
        <Title level={2}>Component not found</Title>
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
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/components')}
          className="gap-2"
        >
          <ChevronLeft size={16} />
          Back
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Title level={1}>{component.name}</Title>
          </div>
          <Text color="secondary" className="text-base">{component.description}</Text>
        </div>

        {/* QUICK INSTALL */}
        <div className="mt-6 p-4 rounded-lg bg-surface-secondary border border-border-primary">
          <Text variant="small" weight="medium" className="mb-2">Installation</Text>
          <div className="relative">
            <pre className="text-sm font-mono text-text-primary overflow-x-auto bg-background-primary rounded p-3">
              <code>{`import { ${component.name} } from '@/components/ui/${component.name}'`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* EXAMPLES SECTION */}
      <div className="space-y-8 border-t border-border-primary pt-8">
        <div>
          <Title id={`doc-${component.name.toLowerCase()}-examples`} level={2} className="mb-1">Examples</Title>
          <Text color="secondary">Interactive examples and their code snippets.</Text>
        </div>

        {/* Render component-specific examples */}
        <ComponentExamples componentName={component.name.toLowerCase()} />
      </div>

      {/* PROPS SECTION */}
      <div className="space-y-4 border-t border-border-primary pt-8">
        <Title id={`doc-${component.name.toLowerCase()}-api-reference`} level={2}>API Reference</Title>
        <div className="rounded-lg border border-border-primary overflow-hidden">
          <div className="p-4 bg-surface-secondary border-b border-border-primary">
            <Text weight="medium" variant="small">Component Props</Text>
          </div>
          <div className="p-4">
            <Text variant="small" color="secondary">
              Refer to the component documentation or source code for detailed prop specifications.
            </Text>
          </div>
        </div>
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
    radioGroup: <RadioGroupExamples />,
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
    avatarGroup: <AvatarGroupExamples />,
    chip: <ChipExamples />,
    tag: <TagExamples />,
    tagsInput: <TagsInputExamples />,
    callout: <CalloutExamples />,
    emptyState: <EmptyStateExamples />,
    collapsible: <CollapsibleExamples />,
    slider: <SliderExamples />,
    rangeSlider: <RangeSliderExamples />,
    calendar: <CalendarExamples />,
    stepper: <StepperExamples />,
    scrollArea: <ScrollAreaExamples />,
    toast: <ToastExamples />,
    snackbar: <SnackbarExamples />,
    table: <TableExamples />,
    tooltip: <TooltipExamples />,
    popover: <PopoverExamples />,
    modal: <ModalExamples />,
    sheet: <SheetExamples />,
    confirmDialog: <ConfirmDialogExamples />,
    select: <SelectExamples />,
    combobox: <ComboboxExamples />,
    searchInput: <SearchInputExamples />,
    datePicker: <DatePickerExamples />,
    timePicker: <TimePickerExamples />,
    // Remaining components get default examples
    progress: <DefaultExample componentName="Progress" />,
    caption: <DefaultExample componentName="Caption" />,
  }

  return examples[componentName] || <DefaultExample componentName={componentName} />
}

// ─── BUTTON EXAMPLES ───

import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'

function ButtonExamples() {
  return (
    <>
      <ComponentExample
        title="Basic Variants"
        description="All available button variants"
        componentName="button"
        preview={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
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
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`}
      />

      <ComponentExample
        title="Sizes"
        description="Different button sizes"
        componentName="button"
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
    <div className="flex gap-3 items-center flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`}
      />

      <ComponentExample
        title="States"
        description="Button loading and disabled states"
        componentName="button"
        preview={
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </div>
        }
        code={`import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button variant="primary" loading>Loading...</Button>
      <Button disabled>Disabled</Button>
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
        title="Basic Input"
        description="Simple text input"
        componentName="input"
        preview={
          <Input
            placeholder="Enter your name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-sm"
          />
        }
        code={`import { Input } from '@/components/ui/Input'
import { useState } from 'react'

export function Example() {
  const [value, setValue] = useState('')
  
  return (
    <Input
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}`}
      />

      <ComponentExample
        title="With Label"
        description="Input with form label"
        componentName="input"
        preview={
          <div className="space-y-2 max-w-sm">
            <label className="text-sm font-medium text-text-primary">Email Address</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        }
        code={`import { Input } from '@/components/ui/Input'

export function Example() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Email Address</label>
      <Input
        type="email"
        placeholder="you@example.com"
      />
    </div>
  )
}`}
      />

      <ComponentExample
        title="Disabled State"
        description="Disabled input"
        componentName="input"
        preview={
          <Input
            placeholder="This input is disabled"
            disabled
            className="max-w-sm"
          />
        }
        code={`import { Input } from '@/components/ui/Input'

export function Example() {
  return (
    <Input
      placeholder="This input is disabled"
      disabled
    />
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
        componentName="switch"
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
        componentName="switch"
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
        title="Basic Card"
        description="Standard card layout"
        componentName="card"
        preview={
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>A short description of the card content</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="small" color="secondary">
                This is the card content area. You can add any content here.
              </Text>
            </CardContent>
          </Card>
        }
        code={`import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/Card'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}`}
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
        componentName="badge"
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

import { Alert } from '../../components/ui/Alert'

function AlertExamples() {
  return (
    <>
      <ComponentExample
        title="All Variants"
        componentName="alert"
        description="Alert severity levels"
        preview={
          <div className="space-y-3 max-w-md">
            <Alert variant="default">This is a default alert</Alert>
            <Alert variant="success">Success! Operation completed successfully.</Alert>
            <Alert variant="warning">Warning: Please review this information before continuing.</Alert>
            <Alert variant="destructive">Error: Something went wrong. Please try again.</Alert>
          </div>
        }
        code={`import { Alert } from '@/components/ui/Alert'

export function Example() {
  return (
    <div className="space-y-3">
      <Alert variant="default">Default alert</Alert>
      <Alert variant="success">Success alert</Alert>
      <Alert variant="warning">Warning alert</Alert>
      <Alert variant="destructive">Error alert</Alert>
    </div>
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
        title="Basic Tabs"
        componentName="tabs"
        description="Tab navigation"
        preview={
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account"><Text color="secondary" className="mt-3">Account settings content</Text></TabsContent>
            <TabsContent value="password"><Text color="secondary" className="mt-3">Password settings content</Text></TabsContent>
            <TabsContent value="notifications"><Text color="secondary" className="mt-3">Notification settings content</Text></TabsContent>
          </Tabs>
        }
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
      <TabsContent value="notifications">Notification settings</TabsContent>
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
  return (
    <>
      <ComponentExample
        componentName="checkbox"
        title="Basic Checkbox"
        description="Simple checkbox toggle"
        preview={<Checkbox />}
        code={`import { Checkbox } from '@/components/ui/Checkbox'
export function Example() {
  return <Checkbox />
}`}
      />
    </>
  )
}

// ─── RADIOGROUP EXAMPLES ───
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'

function RadioGroupExamples() {
  const [selected, setSelected] = React.useState('option1')
  return (
    <>
      <ComponentExample
        componentName="radiogroup"
        title="Basic RadioGroup"
        description="Radio button selection"
        preview={
          <RadioGroup value={selected} onValueChange={setSelected}>
            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          </RadioGroup>
        }
        code={`import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'
export function Example() {
  const [selected, setSelected] = useState('option1')
  return (
    <RadioGroup value={selected} onValueChange={setSelected}>
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2">Option 2</RadioGroupItem>
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
        componentName="divider"
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
        componentName="divider"
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
        componentName="spacer"
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
  return (
    <>
      <ComponentExample
        componentName="spinner"
        title="Loading Spinner"
        description="Animated loading indicator"
        preview={<Spinner size="md" />}
        code={`import { Spinner } from '@/components/ui/Spinner'
export function Example() {
  return <Spinner size="md" />
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
        componentName="skeleton"
        title="Skeleton Loader"
        description="Animated loading placeholder"
        preview={
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        }
        code={`import { Skeleton } from '@/components/ui/Skeleton'
export function Example() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-8 w-3/4" />
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
        componentName="blockquote"
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
        componentName="heading"
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
        componentName="paragraph"
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
        componentName="label"
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
  const [text, setText] = React.useState('')
  return (
    <>
      <ComponentExample
        componentName="textarea"
        title="Basic Textarea"
        description="Multi-line text input"
        preview={
          <Textarea
            placeholder="Enter your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="max-w-md"
          />
        }
        code={`import { Textarea } from '@/components/ui/Textarea'
export function Example() {
  const [text, setText] = useState('')
  return (
    <Textarea
      placeholder="Enter your message..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
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
        componentName="accordion"
        title="Basic Accordion"
        description="Expandable accordion sections"
        preview={
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Section 1</AccordionTrigger>
              <AccordionContent>Content for section 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Section 2</AccordionTrigger>
              <AccordionContent>Content for section 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        }
        code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
export function Example() {
  return (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
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
        componentName="avatar"
        title="Basic Avatar"
        description="User avatar display"
        preview={
          <div className="flex gap-4">
            <Avatar size="md">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        }
        code={`import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
export function Example() {
  return (
    <Avatar size="md">
      <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
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
        componentName="avatargroup"
        title="Avatar Group"
        description="Multiple user avatars"
        preview={
          <AvatarGroup 
            items={[
              { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', alt: 'John', fallback: 'JD' },
              { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', alt: 'Jane', fallback: 'JS' },
              { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', alt: 'Bob', fallback: 'BB' }
            ]}
            max={5}
            size="md"
          />
        }
        code={`import { AvatarGroup } from '@/components/ui/AvatarGroup'
export function Example() {
  return (
    <AvatarGroup
      items={[
        { src: 'https://example.com/user1.jpg', alt: 'User 1', fallback: 'U1' },
        { src: 'https://example.com/user2.jpg', alt: 'User 2', fallback: 'U2' },
        { src: 'https://example.com/user3.jpg', alt: 'User 3', fallback: 'U3' }
      ]}
      max={5}
      size="md"
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
  return (
    <>
      <ComponentExample
        componentName="chip"
        title="Chip Tags"
        description="Removable chip/tag components"
        preview={
          <div className="flex flex-wrap gap-2">
            <Chip label="React" />
            <Chip label="TypeScript" />
            <Chip label="UI" />
          </div>
        }
        code={`import { Chip } from '@/components/ui/Chip'
export function Example() {
  return (
    <div className="flex gap-2">
      <Chip label="React" />
      <Chip label="TypeScript" />
    </div>
  )
}`}
      />
    </>
  )
}

// ─── TAG EXAMPLES ───
import { Tag } from '../../components/ui/Tag'

function TagExamples() {
  return (
    <>
      <ComponentExample
        componentName="tag"
        title="Tag Labels"
        description="Text tag labels"
        preview={
          <div className="flex flex-wrap gap-2">
            <Tag label="Active" variant="success" />
            <Tag label="Pending" variant="warning" />
            <Tag label="Completed" variant="default" />
          </div>
        }
        code={`import { Tag } from '@/components/ui/Tag'
export function Example() {
  return (
    <div className="flex gap-2">
      <Tag label="Active" variant="success" />
      <Tag label="Pending" variant="warning" />
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
  const [tags, setTags] = React.useState(['tag1', 'tag2'])
  return (
    <>
      <ComponentExample
        componentName="tagsinput"
        title="Tags Input"
        description="Add and remove multiple tags"
        preview={<TagsInput value={tags} onChange={setTags} />}
        code={`import { TagsInput } from '@/components/ui/TagsInput'
export function Example() {
  const [tags, setTags] = useState(['tag1', 'tag2'])
  return <TagsInput value={tags} onChange={setTags} />
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
        componentName="callout"
        title="Callout Box"
        description="Informational callout box"
        preview={<Callout>This is an important callout message.</Callout>}
        code={`import { Callout } from '@/components/ui/Callout'
export function Example() {
  return <Callout>Important information</Callout>
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
        componentName="emptystate"
        title="Empty State"
        description="Display when no data is available"
        preview={<EmptyState title="No items" description="Nothing to display here" />}
        code={`import { EmptyState } from '@/components/ui/EmptyState'
export function Example() {
  return (
    <EmptyState 
      title="No items" 
      description="Nothing to display" 
    />
  )
}`}
      />
    </>
  )
}

// ─── COLLAPSIBLE EXAMPLES ───
import { Collapsible } from '../../components/ui/Collapsible'

function CollapsibleExamples() {
  return (
    <>
      <ComponentExample
        componentName="collapsible"
        title="Collapsible Section"
        description="Expandable and collapsible panel"
        preview={<Collapsible title="Click to expand">Hidden content revealed when expanded</Collapsible>}
        code={`import { Collapsible } from '@/components/ui/Collapsible'
export function Example() {
  return (
    <Collapsible title="Click to expand">
      Hidden content
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
  const [value, setValue] = React.useState(50)
  return (
    <>
      <ComponentExample
        componentName="slider"
        title="Range Slider"
        description="Adjustable range slider control"
        preview={<Slider value={value} onValueChange={setValue} max={100} className="w-64" />}
        code={`import { Slider } from '@/components/ui/Slider'
export function Example() {
  const [value, setValue] = useState(50)
  return <Slider value={value} onValueChange={setValue} max={100} />
}`}
      />
    </>
  )
}

// ─── RANGE SLIDER EXAMPLES ───
import { RangeSlider } from '../../components/ui/RangeSlider'

function RangeSliderExamples() {
  return (
    <>
      <ComponentExample
        componentName="rangeslider"
        title="Dual Range Slider"
        description="Select minimum and maximum range"
        preview={<RangeSlider />}
        code={`import { RangeSlider } from '@/components/ui/RangeSlider'
export function Example() {
  return <RangeSlider />
}`}
      />
    </>
  )
}

// ─── CALENDAR EXAMPLES ───
import { Calendar } from '../../components/ui/Calendar'

function CalendarExamples() {
  return (
    <>
      <ComponentExample
        componentName="calendar"
        title="Interactive Calendar"
        description="Date picker calendar component"
        preview={<Calendar />}
        code={`import { Calendar } from '@/components/ui/Calendar'
export function Example() {
  return <Calendar />
}`}
      />
    </>
  )
}

// ─── STEPPER EXAMPLES ───
import { Stepper } from '../../components/ui/Stepper'

function StepperExamples() {
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = [
    { id: 1, title: 'Step 1', description: 'Start' },
    { id: 2, title: 'Step 2', description: 'Continue' },
    { id: 3, title: 'Step 3', description: 'Complete' }
  ]
  return (
    <>
      <ComponentExample
        componentName="stepper"
        title="Step Stepper"
        description="Multi-step progress indicator"
        preview={<Stepper steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />}
        code={`import { Stepper } from '@/components/ui/Stepper'
export function Example() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { id: 1, title: 'Step 1', description: 'Start' },
    { id: 2, title: 'Step 2', description: 'Continue' },
    { id: 3, title: 'Step 3', description: 'Complete' }
  ]
  return (
    <Stepper 
      steps={steps}
      activeStep={activeStep}
      onStepClick={setActiveStep}
    />
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
        componentName="scrollarea"
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
import { Toast, ToastTitle, ToastDescription } from '../../components/ui/Toast'

function ToastExamples() {
  return (
    <>
      <ComponentExample
        componentName="toast"
        title="Toast Notification"
        description="Brief notification message"
        preview={
          <Toast open variant="default">
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>Operation completed successfully!</ToastDescription>
          </Toast>
        }
        code={`import { Toast, ToastTitle, ToastDescription } from '@/components/ui/Toast'
export function Example() {
  return (
    <Toast open variant="default">
      <ToastTitle>Success</ToastTitle>
      <ToastDescription>Operation completed!</ToastDescription>
    </Toast>
  )
}`}
      />
    </>
  )
}

// ─── SNACKBAR EXAMPLES ───
import { Snackbar } from '../../components/ui/Snackbar'

function SnackbarExamples() {
  return (
    <>
      <ComponentExample
        componentName="snackbar"
        title="Snackbar Message"
        description="Bottom notification bar"
        preview={<Snackbar message="Informational snackbar message" />}
        code={`import { Snackbar } from '@/components/ui/Snackbar'
export function Example() {
  return <Snackbar message="Information" />
}`}
      />
    </>
  )
}

// ─── TABLE EXAMPLES ───
import { Table } from '../../components/ui/Table'

function TableExamples() {
  const columns = [
    { key: 'name' as const, header: 'Name' },
    { key: 'email' as const, header: 'Email' }
  ]
  const data = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' }
  ]
  return (
    <>
      <ComponentExample
        componentName="table"
        title="Data Table"
        description="Display tabular data"
        preview={<Table columns={columns} data={data} />}
        code={`import { Table } from '@/components/ui/Table'
export function Example() {
  const columns = [
    { key: 'name' as const, header: 'Name' },
    { key: 'email' as const, header: 'Email' }
  ]
  const data = [
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' }
  ]
  return <Table columns={columns} data={data} />
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
        componentName="tooltip"
        title="Tooltip"
        description="Hover to display help text"
        preview={<Tooltip content="This is helpful information">Hover over me</Tooltip>}
        code={`import { Tooltip } from '@/components/ui/Tooltip'
export function Example() {
  return <Tooltip content="Help text">Hover me</Tooltip>
}`}
      />
    </>
  )
}

// ─── POPOVER EXAMPLES ───
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover'

function PopoverExamples() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        componentName="popover"
        title="Popover Menu"
        description="Floating content popover"
        preview={
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <p className="font-medium">Popover Title</p>
                <p className="text-sm text-text-secondary">This is the popover content</p>
              </div>
            </PopoverContent>
          </Popover>
        }
        code={`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover'
export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        Content
      </PopoverContent>
    </Popover>
  )
}`}
      />
    </>
  )
}

// ─── MODAL EXAMPLES ───
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalDescription, ModalFooter, ModalClose } from '../../components/ui/Modal'

function ModalExamples() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        componentName="modal"
        title="Modal Dialog"
        description="Centered modal dialog box"
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open Modal</Button>
            <Modal open={open} onOpenChange={setOpen}>
              <ModalHeader>
                <ModalTitle>Modal Title</ModalTitle>
                <ModalClose />
              </ModalHeader>
              <ModalContent>
                <ModalDescription>
                  This is the modal content description
                </ModalDescription>
              </ModalContent>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Confirm</Button>
              </ModalFooter>
            </Modal>
          </>
        }
        code={`import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/Modal'
export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
        </ModalHeader>
        <ModalContent>
          Content
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}`}
      />
    </>
  )
}

// ─── SHEET EXAMPLES ───
import { Sheet } from '../../components/ui/Sheet'

function SheetExamples() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <ComponentExample
        componentName="sheet"
        title="Side Sheet"
        description="Slide-in side panel"
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open Sheet</Button>
            <Sheet open={open} onOpenChange={setOpen}>Sheet content</Sheet>
          </>
        }
        code={`import { Sheet } from '@/components/ui/Sheet'
export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Sheet open={open} onOpenChange={setOpen}>Content</Sheet>
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
  return (
    <>
      <ComponentExample
        componentName="confirmdialog"
        title="Confirm Dialog"
        description="Confirmation dialog box"
        preview={<ConfirmDialog title="Confirm Action?" description="Are you sure?" />}
        code={`import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
export function Example() {
  return (
    <ConfirmDialog 
      title="Confirm?" 
      description="Are you sure?" 
    />
  )
}`}
      />
    </>
  )
}

// ─── SELECT EXAMPLES ───
import { Select } from '../../components/ui/Select'

function SelectExamples() {
  return (
    <>
      <ComponentExample
        componentName="select"
        title="Select Dropdown"
        description="Dropdown select input"
        preview={
          <Select 
            options={[
              {label: 'Option 1', value: '1'},
              {label: 'Option 2', value: '2'},
              {label: 'Option 3', value: '3'}
            ]} 
          />
        }
        code={`import { Select } from '@/components/ui/Select'
export function Example() {
  return (
    <Select options={[
      {label: 'Option 1', value: '1'},
      {label: 'Option 2', value: '2'}
    ]} />
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
        componentName="combobox"
        title="Searchable Combobox"
        description="Searchable dropdown select"
        preview={
          <Combobox 
            options={[
              {label: 'React', value: 'react'},
              {label: 'Vue', value: 'vue'},
              {label: 'Svelte', value: 'svelte'}
            ]} 
          />
        }
        code={`import { Combobox } from '@/components/ui/Combobox'
export function Example() {
  return (
    <Combobox options={[
      {label: 'React', value: 'react'},
      {label: 'Vue', value: 'vue'}
    ]} />
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
  return (
    <>
      <ComponentExample
        componentName="searchinput"
        title="Search Input"
        description="Search field with clear button"
        preview={<SearchInput value={search} onChange={setSearch} placeholder="Search..." className="w-64" />}
        code={`import { SearchInput } from '@/components/ui/SearchInput'
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
    </>
  )
}

// ─── DATE PICKER EXAMPLES ───
import { DatePicker } from '../../components/ui/DatePicker'

function DatePickerExamples() {
  return (
    <>
      <ComponentExample
        componentName="datepicker"
        title="Date Picker"
        description="Select a specific date"
        preview={<DatePicker />}
        code={`import { DatePicker } from '@/components/ui/DatePicker'
export function Example() {
  return <DatePicker />
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
        componentName="timepicker"
        title="Time Picker"
        description="Select a specific time"
        preview={<TimePicker />}
        code={`import { TimePicker } from '@/components/ui/TimePicker'
export function Example() {
  return <TimePicker />
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
