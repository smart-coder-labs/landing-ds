import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Title } from '../../components/ui/Title'
import Text from '../../components/ui/Text'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Switch } from '../../components/ui/Switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/ui/Collapsible'
import { Divider } from '../../components/ui/Divider'
import { ALL_COMPONENTS } from '../../data/components'
import { COMPONENT_META } from '../../data/componentMeta'
import { getPreviewComponent } from './previews'

// Import story components
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/Accordion'
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/Avatar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/Breadcrumb'
import { Checkbox } from '../../components/ui/Checkbox'
import { Label } from '../../components/ui/Label'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
} from '../../components/ui/ContextMenu'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover'
import { Input } from '../../components/ui/Input'
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'
import { RangeSlider } from '../../components/ui/RangeSlider'
import { ScrollArea } from '../../components/ui/ScrollArea'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '../../components/ui/Sheet'
import { Skeleton } from '../../components/ui/Skeleton'
import { Slider } from '../../components/ui/Slider'
import { Spinner } from '../../components/ui/Spinner'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.4, delay: i * 0.05 } }),
}

/* ========================================
   LIVE PREVIEWS - Custom
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

/* ========================================
   LIVE PREVIEWS - From Design System Stories
   ======================================== */

function AccordionPreview() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function AlertPreview() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}

function AvatarPreview() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

function BreadcrumbPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function CheckboxPreview() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-text-secondary">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function RadioGroupPreview() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}

function RangeSliderPreview() {
  return (
    <div className="w-[60%]">
      <RangeSlider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  )
}

function ScrollAreaPreview() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="mb-4 text-sm font-medium leading-none">Tags</div>
      {Array.from({ length: 50 }).map((_, i, a) => (
        <div key={i} className="text-sm">
          v1.2.0-beta.{a.length - i}
          <div className="my-2 h-px bg-border-primary" />
        </div>
      ))}
    </ScrollArea>
  )
}

function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SkeletonPreview() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

function SliderPreview() {
  return (
    <div className="w-[60%]">
      <Slider defaultValue={50} max={100} step={1} />
    </div>
  )
}

function SpinnerPreview() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}

// PREVIEWS are now dynamically generated in allPreviews.tsx
// All 213 components are covered via getPreviewForComponent()

/**
 * Fallback preview for components without custom preview
 * Shows the first code example from the component's metadata
 */
function FallbackPreview({ example }: { example: { title: string; code: string; language?: string } }) {
  return (
    <div className="space-y-3">
      <Text variant="small" color="secondary" className="text-xs">
        {example.title}
      </Text>
      <CodeBlock code={example.code} language={example.language ?? 'tsx'} />
    </div>
  )
}

/* ========================================
   PAGE
   ======================================== */

export default function ComponentDetailPage() {
  const { name } = useParams<{ name: string }>()
  const key = (name ?? '').toLowerCase()
  const meta = COMPONENT_META[key]

  if (!meta) {
    const generic = ALL_COMPONENTS.find((c) => c.name.toLowerCase() === key)

    if (generic) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-2 text-sm">
            <Link to="/components" className="text-text-tertiary hover:text-text-secondary transition-colors">
              Components
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary">{generic.name}</span>
          </div>
          <div className="space-y-3">
            <Title level={1} weight="bold">{generic.name}</Title>
            <Text variant="lead" color="secondary">{generic.description}</Text>
            <Badge>{generic.category}</Badge>
          </div>
          <div className="space-y-3">
            <Title level={4} weight="semibold" as="h2">Installation</Title>
            <CodeBlock
              code={`npx @smart-coder-labs/apple-design-system add ${generic.name}`}
              language="bash"
            />
            <CodeBlock
              code={`import { ${generic.name} } from '@/components/ui/${generic.name}'`}
              language="typescript"
            />
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Title level={2}>Component not found</Title>
        <Text color="secondary">
          The component <code className="text-accent-blue font-mono">{name}</code> is not in the local registry.
        </Text>
        <Link to="/components">
          <Button variant="ghost" size="sm">Back to components</Button>
        </Link>
      </motion.div>
    )
  }

  const preview = getPreviewForComponent(key)
  const installCmd = `npx @smart-coder-labs/apple-design-system add ${meta.name}`
  const importLine = `import { ${meta.name} } from '@/components/ui/${meta.name}'`

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="flex items-center gap-2"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Link to="/components" className="text-text-tertiary hover:text-text-secondary text-sm transition-colors">
          Components
        </Link>
        <span className="text-text-tertiary">/</span>
        <span className="text-sm text-text-primary">{meta.name}</span>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Title level={1} weight="bold">{meta.name}</Title>
        <Text variant="lead" color="secondary">{meta.description}</Text>
        <Badge>{meta.category}</Badge>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Title level={4} weight="semibold" as="h2">Installation</Title>
        <CodeBlock code={installCmd} language="bash" />
        <CodeBlock code={importLine} language="typescript" />
      </motion.div>

       {preview && (
         <motion.div
           className="space-y-3"
           variants={fadeUp}
           initial="hidden"
           animate="visible"
           custom={2}
         >
           <Title level={4} weight="semibold" as="h2">Preview</Title>
           <Card variant="outlined" padding="lg">
             <CardContent>{preview}</CardContent>
           </Card>
         </motion.div>
       )}

      <div className="space-y-6">
        <Title level={4} weight="semibold" as="h2">Examples</Title>
        {meta.examples.map((example, i) => (
          <motion.div
            key={example.title}
            className="space-y-2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i + 3}
          >
            <Text weight="medium">{example.title}</Text>
            <CodeBlock code={example.code} language={example.language ?? 'tsx'} showLineNumbers />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
