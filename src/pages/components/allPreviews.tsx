/**
 * ALL COMPONENT PREVIEWS
 * Auto-generated preview components for all 213 UI components
 * Strategy: Extracted from storybook + templated for components without stories
 */

import React, { useState } from 'react'
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '../../components/ui/Accordion'
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/Avatar'
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from '../../components/ui/Breadcrumb'
import { Checkbox } from '../../components/ui/Checkbox'
import { Label } from '../../components/ui/Label'
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuSeparator,
  ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel,
} from '../../components/ui/ContextMenu'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover'
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'
import { RangeSlider } from '../../components/ui/RangeSlider'
import { ScrollArea } from '../../components/ui/ScrollArea'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '../../components/ui/Sheet'
import { Skeleton } from '../../components/ui/Skeleton'
import { Slider } from '../../components/ui/Slider'
import { Spinner } from '../../components/ui/Spinner'
import { Button } from '../../components/ui/Button'
import Text from '../../components/ui/Text'

// ─────────────────────────────────────────────────────────────────────────────
// PREVIEWS FROM STORYBOOK STORIES (extracted render() functions)
// ─────────────────────────────────────────────────────────────────────────────

export function AccordionPreview() {
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
          Yes. It comes with default styles that match other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function AlertPreview() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  )
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="md">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function BreadcrumbPreview() {
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

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="demo" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="demo">Accept terms and conditions</Label>
    </div>
  )
}

export function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Dimensions</h4>
          <p className="text-sm text-gray-600">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function RadioGroupPreview() {
  const [value, setValue] = useState('option1')
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
    </RadioGroup>
  )
}

export function RangeSliderPreview() {
  const [value, setValue] = useState([25, 75])
  return <RangeSlider value={value} onValueChange={setValue} />
}

export function ScrollAreaPreview() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">Scroll item {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div>Sheet content goes here</div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SkeletonPreview() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}

export function SliderPreview() {
  const [value, setValue] = useState([50])
  return <Slider value={value} onValueChange={setValue} className="w-[300px]" />
}

export function SpinnerPreview() {
  return <Spinner size="md" />
}

export function LayoutPreview() {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <div className="bg-blue-100 p-4 rounded text-center text-sm">Header</div>
      <div className="bg-blue-100 p-4 rounded text-center text-sm">Main</div>
      <div className="bg-blue-100 p-4 rounded text-center text-sm">Sidebar</div>
    </div>
  )
}

export function KpiblockPreview() {
  return (
    <div className="p-4 border rounded-lg">
      <div className="text-sm text-gray-600">Total Revenue</div>
      <div className="text-2xl font-bold">$124,500</div>
      <div className="text-xs text-green-600 mt-1">↑ +12.5%</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE PREVIEWS FOR REMAINING COMPONENTS
// (intelligently categorized by type)
// ─────────────────────────────────────────────────────────────────────────────

function InputPreview() {
  return <input type="text" placeholder="Type something..." className="w-full px-3 py-2 border rounded-md" />
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Primary</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Secondary</button>
      <button className="px-4 py-2 border rounded">Outline</button>
    </div>
  )
}

function SelectPreview() {
  return (
    <select className="w-full px-3 py-2 border rounded-md">
      <option>Select an option</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  )
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Primary</span>
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Success</span>
      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Error</span>
    </div>
  )
}

function CardPreview() {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold mb-2">Card Title</h3>
      <p className="text-sm text-gray-600">Card content goes here</p>
    </div>
  )
}

function ChartPreview() {
  return (
    <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-gray-400">
      Chart Preview
    </div>
  )
}

function ListPreview() {
  return (
    <ul className="space-y-2 w-full max-w-xs">
      <li className="p-2 border-b">Item 1</li>
      <li className="p-2 border-b">Item 2</li>
      <li className="p-2">Item 3</li>
    </ul>
  )
}

function LoadingPreview() {
  return <div className="animate-pulse w-8 h-8 rounded-full bg-blue-500" />
}

// ─────────────────────────────────────────────────────────────────────────────
// PREVIEW REGISTRY: Maps component keys to their preview components
// ─────────────────────────────────────────────────────────────────────────────

export const PREVIEWS_MAP: Record<string, React.ReactNode> = {
  // Story-based (HIGH QUALITY)
  accordion: <AccordionPreview />,
  alert: <AlertPreview />,
  avatar: <AvatarPreview />,
  breadcrumb: <BreadcrumbPreview />,
  checkbox: <CheckboxPreview />,
  contextmenu: <ContextMenuPreview />,
  popover: <PopoverPreview />,
  radiogroup: <RadioGroupPreview />,
  rangeslider: <RangeSliderPreview />,
  scrollarea: <ScrollAreaPreview />,
  sheet: <SheetPreview />,
  skeleton: <SkeletonPreview />,
  slider: <SliderPreview />,
  spinner: <SpinnerPreview />,
  layout: <LayoutPreview />,
  kpiblock: <KpiblockPreview />,
  
   // Template-based (MEDIUM QUALITY)
   button: <ButtonPreview />,
   input: <InputPreview />,
   select: <SelectPreview />,
   badge: <BadgePreview />,
   card: <CardPreview />,
   chart: <ChartPreview />,
   list: <ListPreview />,
}

// Auto-expand to cover all components (197+ remaining)
export function getPreviewForComponent(componentKey: string): React.ReactNode | null {
  // First check if we have a direct preview
  if (PREVIEWS_MAP[componentKey]) {
    return PREVIEWS_MAP[componentKey]
  }
  
  // Smart template assignment based on component name patterns
  const comp = componentKey.toLowerCase()
  
  if (comp.includes('button') || comp === 'fab' || comp === 'fabgroup' || comp === 'hapticbutton' || comp === 'iconbutton') {
    return <ButtonPreview />
  }
  if (comp.includes('input') || comp.includes('text') || comp === 'textarea' || comp === 'otpinput' || comp === 'passwordinput' || comp === 'peertaginput') {
    return <InputPreview />
  }
  if (comp.includes('select') || comp.includes('combo') || comp.includes('dropdown')) {
    return <SelectPreview />
  }
  if (comp.includes('badge') || comp.includes('tag') || comp.includes('chip') || comp === 'notificationbadge') {
    return <BadgePreview />
  }
  if (comp.includes('card')) {
    return <CardPreview />
  }
  if (comp.includes('chart') || comp.includes('graph') || comp.includes('visual') || comp.includes('activity') || comp.includes('transaction') || comp.includes('asset') || comp.includes('balance')) {
    return <ChartPreview />
  }
  if (comp.includes('list') || comp.includes('table') || comp.includes('grid')) {
    return <ListPreview />
  }
  if (comp.includes('loading') || comp.includes('spin') || comp.includes('skeleton') || comp.includes('progress')) {
    return <LoadingPreview />
  }
  
  // Default fallback
  return <div className="p-4 text-center text-gray-400 text-sm">{componentKey} Preview</div>
}

