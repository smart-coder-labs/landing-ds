/**
 * Component Preview Configuration
 * Define preview examples for each component in a standardized format
 * Format: { component, preview JSX, code string }
 */

export interface ComponentPreview {
  name: string
  description: string
  preview: React.ReactNode
  code: string
  category: 'Inputs' | 'Layout' | 'Typography' | 'Navigation' | 'Feedback' | 'Data' | 'Media' | 'Charts' | 'Animations' | 'AI' | 'Auth' | 'Commerce' | 'Fintech' | 'Communication' | 'Scheduling' | 'Misc'
}

// ─── BUTTON PREVIEWS ───

export const buttonPreviews = {
  basic: {
    code: `import { Button } from '@/components/ui/Button'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`,
  },
  loading: {
    code: `import { Button } from '@/components/ui/Button'

export default function Example() {
  return <Button variant="primary" loading>Loading...</Button>
}`,
  },
  disabled: {
    code: `import { Button } from '@/components/ui/Button'

export default function Example() {
  return <Button disabled>Disabled</Button>
}`,
  },
  sizes: {
    code: `import { Button } from '@/components/ui/Button'

export default function Example() {
  return (
    <div className="flex gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`,
  },
}

// ─── INPUT PREVIEWS ───

export const inputPreviews = {
  basic: {
    code: `import { Input } from '@/components/ui/Input'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState('')
  
  return (
    <Input
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}`,
  },
  withLabel: {
    code: `import { Input } from '@/components/ui/Input'

export default function Example() {
  return (
    <Input
      label="Email"
      placeholder="you@example.com"
      type="email"
    />
  )
}`,
  },
  withError: {
    code: `import { Input } from '@/components/ui/Input'

export default function Example() {
  return (
    <Input
      label="Username"
      placeholder="john_doe"
      error="Username already taken"
    />
  )
}`,
  },
  disabled: {
    code: `import { Input } from '@/components/ui/Input'

export default function Example() {
  return (
    <Input
      placeholder="Disabled input"
      disabled
    />
  )
}`,
  },
}

// ─── SWITCH PREVIEWS ───

export const switchPreviews = {
  basic: {
    code: `import { Switch } from '@/components/ui/Switch'
import { useState } from 'react'

export default function Example() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Switch
      checked={enabled}
      onCheckedChange={setEnabled}
      label="Enable notifications"
    />
  )
}`,
  },
  withDescription: {
    code: `import { Switch } from '@/components/ui/Switch'
import { useState } from 'react'

export default function Example() {
  const [enabled, setEnabled] = useState(true)
  
  return (
    <Switch
      checked={enabled}
      onCheckedChange={setEnabled}
      label="Dark mode"
      description="Switch between light and dark theme"
    />
  )
}`,
  },
}

// ─── CARD PREVIEWS ───

export const cardPreviews = {
  basic: {
    code: `import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'

export default function Example() {
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
}`,
  },
}

// ─── BADGE PREVIEWS ───

export const badgePreviews = {
  variants: {
    code: `import { Badge } from '@/components/ui/Badge'

export default function Example() {
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
}`,
  },
}

// ─── BREADCRUMB PREVIEWS ───

export const breadcrumbPreviews = {
  basic: {
    code: `import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/Breadcrumb'

export default function Example() {
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
}`,
  },
}

// ─── TABS PREVIEWS ───

export const tabsPreviews = {
  basic: {
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export default function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings content</TabsContent>
      <TabsContent value="password">Password settings content</TabsContent>
      <TabsContent value="notifications">Notification settings content</TabsContent>
    </Tabs>
  )
}`,
  },
}

// ─── MODAL PREVIEWS ───

export const modalPreviews = {
  basic: {
    code: `import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export default function Example() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <p className="text-text-secondary">Modal content goes here</p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  )
}`,
  },
}

// ─── ALERT PREVIEWS ───

export const alertPreviews = {
  variants: {
    code: `import { Alert } from '@/components/ui/Alert'

export default function Example() {
  return (
    <div className="space-y-3">
      <Alert variant="default">This is a default alert</Alert>
      <Alert variant="success">Success! Operation completed.</Alert>
      <Alert variant="warning">Warning: Please review before continuing.</Alert>
      <Alert variant="error">Error: Something went wrong.</Alert>
    </div>
  )
}`,
  },
}

// ─── AVATAR PREVIEWS ───

export const avatarPreviews = {
  sizes: {
    code: `import { Avatar } from '@/components/ui/Avatar'

export default function Example() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar size="sm">
        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">JD</div>
      </Avatar>
      <Avatar size="md">
        <div className="w-full h-full bg-green-500 flex items-center justify-center text-white text-sm font-medium">AB</div>
      </Avatar>
      <Avatar size="lg">
        <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-medium">MK</div>
      </Avatar>
    </div>
  )
}`,
  },
}

// Add more component previews as needed...
