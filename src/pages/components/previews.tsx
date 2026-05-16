import React, { useState } from 'react'

// ─── Inputs ──────────────────────────────────────────────
import { Button } from '../../components/ui/Button'
import { ButtonWithDropdown } from '../../components/ui/ButtonWithDropdown'
import { Checkbox } from '../../components/ui/Checkbox'
import { Combobox } from '../../components/ui/Combobox'
import { ControlCenterToggles } from '../../components/ui/ControlCenterToggles'
import { DatePicker } from '../../components/ui/DatePicker'
import { DateRangePicker } from '../../components/ui/DateRangePicker'
import { FAB } from '../../components/ui/FAB'
import { FABGroup } from '../../components/ui/FABGroup'
import { HapticButton } from '../../components/ui/HapticButton'
import { IconButton } from '../../components/ui/IconButton'
import { Input } from '../../components/ui/Input'
import { OTPInput } from '../../components/ui/OTPInput'
import { PasswordInput } from '../../components/ui/PasswordInput'
import { PeerTagInput } from '../../components/ui/PeerTagInput'
import { QuantitySelector } from '../../components/ui/QuantitySelector'
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'
import { RangeSlider } from '../../components/ui/RangeSlider'
import { RatingInput } from '../../components/ui/RatingInput'
import { RotarySelector } from '../../components/ui/RotarySelector'
import { SearchInput } from '../../components/ui/SearchInput'
import { SegmentedInput } from '../../components/ui/SegmentedInput'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/Select'
import { SignaturePad } from '../../components/ui/SignaturePad'
import { Slider } from '../../components/ui/Slider'
import { SplitButton } from '../../components/ui/SplitButton'
import { Switch } from '../../components/ui/Switch'
import { TagsInput } from '../../components/ui/TagsInput'
import { Textarea } from '../../components/ui/Textarea'
import { TimePicker } from '../../components/ui/TimePicker'

// ─── Layout ──────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'
import { Divider } from '../../components/ui/Divider'
import { Footer } from '../../components/ui/Footer'
import { GridSystem } from '../../components/ui/GridSystem'
import { Layout } from '../../components/ui/Layout'
import { MasonryLayout } from '../../components/ui/MasonryLayout'
import { Panel } from '../../components/ui/Panel'
import { ResizablePanel } from '../../components/ui/ResizablePanel'
import { ScrollArea, ScrollBar } from '../../components/ui/ScrollArea'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter } from '../../components/ui/Sheet'
import { Sidebar } from '../../components/ui/Sidebar'
import { Spacer } from '../../components/ui/Spacer'
import { SplitView } from '../../components/ui/SplitView'
import { StickyContainer } from '../../components/ui/StickyContainer'
import { WindowControls } from '../../components/ui/WindowControls'
import { WindowFrame } from '../../components/ui/WindowFrame'

// ─── Typography ──────────────────────────────────────────
import { Blockquote } from '../../components/ui/Blockquote'
import { Callout } from '../../components/ui/Callout'
import { Caption } from '../../components/ui/Caption'
import { DefinitionList } from '../../components/ui/DefinitionList'
import { DescriptionBlock } from '../../components/ui/DescriptionBlock'
import { Heading } from '../../components/ui/Heading'
import { KeyValueInfo } from '../../components/ui/KeyValueInfo'
import { Label } from '../../components/ui/Label'
import { Paragraph } from '../../components/ui/Paragraph'
import { PropertyList } from '../../components/ui/PropertyList'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { Text } from '../../components/ui/Text'
import { Title } from '../../components/ui/Title'

// ─── Navigation ──────────────────────────────────────────
import { BottomNavigation } from '../../components/ui/BottomNavigation'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/Breadcrumb'
import { BreadcrumbTabsHybrid } from '../../components/ui/BreadcrumbTabsHybrid'
import { CommandMenu } from '../../components/ui/CommandMenu'
import { ContextMenu } from '../../components/ui/ContextMenu'
import { DockBar } from '../../components/ui/DockBar'
import { HamburgerMenuIcon } from '../../components/ui/HamburgerMenuIcon'
import { MenuBar } from '../../components/ui/MenuBar'
import { NavBar } from '../../components/ui/NavBar'
import { NavigationDrawer } from '../../components/ui/NavigationDrawer'
import { Pagination } from '../../components/ui/Pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { TopActionBar } from '../../components/ui/TopActionBar'

// ─── Feedback / Display ──────────────────────────────────
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/Accordion'
import { Alert } from '../../components/ui/Alert'
import { Avatar } from '../../components/ui/Avatar'
import { AvatarGroup } from '../../components/ui/AvatarGroup'
import { Badge } from '../../components/ui/Badge'
import { Chip } from '../../components/ui/Chip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/ui/Collapsible'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorBoundary } from '../../components/ui/ErrorBoundary'
import { JargonTooltip } from '../../components/ui/JargonTooltip'
import { LoadingOverlay } from '../../components/ui/LoadingOverlay'
import { MaintenanceMode } from '../../components/ui/MaintenanceMode'
import { Modal } from '../../components/ui/Modal'
import { ModalStackManager } from '../../components/ui/ModalStackManager'
import { OfflineState } from '../../components/ui/OfflineState'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover'
import { Progress } from '../../components/ui/Progress'
import { Skeleton } from '../../components/ui/Skeleton'
import { Snackbar } from '../../components/ui/Snackbar'
import { Spinner } from '../../components/ui/Spinner'
import { Stepper } from '../../components/ui/Stepper'
import { Tag } from '../../components/ui/Tag'
import { Toast, ToastTitle, ToastDescription } from '../../components/ui/Toast'
import { Tooltip } from '../../components/ui/Tooltip'

// ─── Data Display ────────────────────────────────────────
import { CodeBlock } from '../../components/ui/CodeBlock'
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
import { Reviews } from '../../components/ui/Reviews'
import { Table } from '../../components/ui/Table'
import { Timeline, TimelineItem } from '../../components/ui/Timeline'
import { TreeView } from '../../components/ui/TreeView'

// ─── Media / Rich Content ────────────────────────────────
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

// ─── Data Visualization ──────────────────────────────────
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

// ─── Motion & Interaction ────────────────────────────────
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

// ─── AI ──────────────────────────────────────────────────
import { AIThinkingIndicator } from '../../components/ui/AIThinkingIndicator'
import { HyperPersonalizedWidgetFeed } from '../../components/ui/HyperPersonalizedWidgetFeed'
import { PromptSuggestionChips } from '../../components/ui/PromptSuggestionChips'
import { SmartInsightsCard } from '../../components/ui/SmartInsightsCard'

// ─── Auth & Security ─────────────────────────────────────
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

// ─── Commerce ────────────────────────────────────────────
import { CartPreview } from '../../components/ui/CartPreview'
import { InvoicePreview } from '../../components/ui/InvoicePreview'
import { OrderSummary } from '../../components/ui/OrderSummary'
import { PriceDisplay } from '../../components/ui/PriceDisplay'
import { ProductCard } from '../../components/ui/ProductCard'
import { RetailSwapInterface } from '../../components/ui/RetailSwapInterface'

// ─── FinTech ─────────────────────────────────────────────
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

// ─── Communication ───────────────────────────────────────
import { ChatBubble } from '../../components/ui/ChatBubble'
import { ChatInput } from '../../components/ui/ChatInput'
import { CommentThread } from '../../components/ui/CommentThread'
import { MessageReactions } from '../../components/ui/MessageReactions'
import { NotificationCenterPanel } from '../../components/ui/NotificationCenterPanel'

// ─── Scheduling ──────────────────────────────────────────
import { AgendaView } from '../../components/ui/AgendaView'
import { Calendar } from '../../components/ui/Calendar'
import { SchedulerTimeline } from '../../components/ui/SchedulerTimeline'

// ─── Utility ─────────────────────────────────────────────
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

/* ================================================================
   STATEFUL PREVIEW COMPONENTS
   ================================================================ */

function InputPreview() {
  const [val, setVal] = useState('')
  return (
    <div className="space-y-3">
      <Input label="Full name" placeholder="Jane Doe" value={val} onChange={(e) => setVal(e.target.value)} />
      <Input label="Email" placeholder="jane@example.com" error="Invalid email address" />
      <Input label="Disabled" placeholder="Read only" disabled />
    </div>
  )
}

function SwitchPreview() {
  const [n, setN] = useState(true)
  const [d, setD] = useState(false)
  return (
    <div className="space-y-4">
      <Switch checked={n} onCheckedChange={setN} label="Notifications" description="Receive email notifications" />
      <Switch checked={d} onCheckedChange={setD} label="Dark mode" size="sm" />
      <Switch checked={false} label="Disabled" disabled />
    </div>
  )
}

function CheckboxPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="space-y-3">
      <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms and conditions" description="You agree to our Terms of Service." />
      <Checkbox checked="indeterminate" label="Select all" />
      <Checkbox checked={false} label="Disabled option" disabled />
    </div>
  )
}

function SelectPreview() {
  return (
    <Select defaultValue="react">
      <SelectTrigger>
        <SelectValue placeholder="Choose a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="angular">Angular</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  )
}

function SliderPreview() {
  const [val, setVal] = useState([50])
  return (
    <div className="space-y-4">
      <Slider value={val} onValueChange={setVal} max={100} step={1} />
      <Text variant="small" color="secondary">Value: {val[0]}</Text>
    </div>
  )
}

function RadioGroupPreview() {
  return (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" label="Standard shipping" />
      <RadioGroupItem value="option-2" label="Express shipping" />
      <RadioGroupItem value="option-3" label="Overnight delivery" />
    </RadioGroup>
  )
}

function PaginationPreview() {
  const [page, setPage] = useState(1)
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
}

function ModalPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="p-6 space-y-4">
          <Title level={4}>Modal title</Title>
          <Text color="secondary">This is modal content. Close it to return to the page.</Text>
          <Button variant="primary" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  )
}

function SheetPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <Title level={4}>Sheet title</Title>
          </SheetHeader>
          <div className="p-4">
            <Text color="secondary">Sheet content area. Slides in from the side.</Text>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

function ConfirmDialogPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete item</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item?"
        description="This action cannot be undone."
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}

function TextareaPreview() {
  const [val, setVal] = useState('')
  return <Textarea label="Message" placeholder="Type your message..." value={val} onChange={(e) => setVal(e.target.value)} rows={3} />
}

function PasswordInputPreview() {
  const [val, setVal] = useState('')
  return <PasswordInput label="Password" placeholder="Enter your password" value={val} onChange={(e) => setVal(e.target.value)} />
}

function SearchInputPreview() {
  const [val, setVal] = useState('')
  return <SearchInput placeholder="Search components..." value={val} onChange={(e) => setVal(e.target.value)} />
}

function OTPInputPreview() {
  return <OTPInput length={6} onComplete={(code) => console.log(code)} />
}

function RangeSliderPreview() {
  const [range, setRange] = useState<[number, number]>([20, 80])
  return (
    <div className="space-y-3">
      <RangeSlider value={range} onValueChange={setRange} min={0} max={100} />
      <Text variant="small" color="secondary">Range: {range[0]} - {range[1]}</Text>
    </div>
  )
}

function RatingInputPreview() {
  const [rating, setRating] = useState(3)
  return (
    <div className="space-y-2">
      <RatingInput value={rating} onChange={setRating} max={5} />
      <Text variant="small" color="secondary">Rating: {rating} / 5</Text>
    </div>
  )
}

function TagsInputPreview() {
  const [tags, setTags] = useState(['React', 'TypeScript'])
  return <TagsInput value={tags} onChange={setTags} placeholder="Add tag..." />
}

function QuantitySelectorPreview() {
  const [qty, setQty] = useState(1)
  return <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
}

function CalendarPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar value={date} onChange={(d) => setDate(d)} />
}

function SnackbarPreview() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <Button variant="outline" onClick={() => setShow(true)}>Show snackbar</Button>
      {show && (
        <Snackbar
          message="Changes saved successfully"
          variant="success"
          onClose={() => setShow(false)}
          action={{ label: 'Undo', onClick: () => setShow(false) }}
        />
      )}
    </div>
  )
}

function LoadingOverlayPreview() {
  return (
    <div className="relative h-24 rounded-xl border border-border-primary overflow-hidden">
      <div className="p-4">
        <Text color="secondary">Content behind the overlay</Text>
      </div>
      <LoadingOverlay visible message="Loading data..." />
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

function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <Text weight="medium">Popover title</Text>
          <Text variant="small" color="secondary">This is the popover content area.</Text>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function LoginFormPreview() {
  return <LoginForm onSubmit={(data) => console.log(data)} />
}

function SignupFormPreview() {
  return <SignupForm onSubmit={(data) => console.log(data)} />
}

function HamburgerMenuIconPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <HamburgerMenuIcon isOpen={open} onClick={() => setOpen(!open)} />
      <Text variant="small" color="secondary">{open ? 'Open' : 'Closed'}</Text>
    </div>
  )
}

/* ================================================================
   PREVIEWS RECORD
   ================================================================ */

export const PREVIEWS: Record<string, React.ReactNode> = {
  // ─── Inputs ──────────────────────────────────────────────
  button: (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" loading>Loading</Button>
    </div>
  ),
  buttonwithdropdown: <ButtonWithDropdown label="Actions" items={[{ label: 'Edit', onClick: () => {} }, { label: 'Duplicate', onClick: () => {} }, { label: 'Delete', onClick: () => {} }]} />,
  checkbox: <CheckboxPreview />,
  combobox: <Combobox options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'angular', label: 'Angular' }]} placeholder="Select framework..." />,
  controlcentertoggles: <ControlCenterToggles />,
  datepicker: <DatePicker />,
  daterangepicker: <DateRangePicker />,
  fab: <FAB onClick={() => {}} />,
  fabgroup: <FABGroup items={[{ icon: <span>+</span>, label: 'Add', onClick: () => {} }, { icon: <span>S</span>, label: 'Share', onClick: () => {} }]} />,
  hapticbutton: <HapticButton>Tap me</HapticButton>,
  iconbutton: (
    <div className="flex gap-3">
      <IconButton icon={<span>+</span>} aria-label="Add" />
      <IconButton icon={<span>X</span>} aria-label="Close" variant="ghost" />
    </div>
  ),
  input: <InputPreview />,
  otpinput: <OTPInputPreview />,
  passwordinput: <PasswordInputPreview />,
  peertaginput: <PeerTagInput contacts={[
    { id: '1', tag: '$alice', name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/40?img=1', isVerified: true, recentActivity: 'Active today' },
    { id: '2', tag: '$bob', name: 'Bob Smith', avatarUrl: 'https://i.pravatar.cc/40?img=3', isVerified: false, recentActivity: '2h ago' },
    { id: '3', tag: '$carol', name: 'Carol White', avatarUrl: 'https://i.pravatar.cc/40?img=5', isVerified: true },
    { id: '4', tag: '$dave', name: 'Dave Martinez', avatarUrl: 'https://i.pravatar.cc/40?img=7', isVerified: false, recentActivity: 'Yesterday' },
    { id: '5', tag: '$emma', name: 'Emma Davis', avatarUrl: 'https://i.pravatar.cc/40?img=9', isVerified: true, recentActivity: 'Active now' },
  ]} />,
  quantityselector: <QuantitySelectorPreview />,
  radiogroup: <RadioGroupPreview />,
  rangeslider: <RangeSliderPreview />,
  ratinginput: <RatingInputPreview />,
  rotaryselector: <RotarySelector items={['Small', 'Medium', 'Large', 'XL']} />,
  searchinput: <SearchInputPreview />,
  segmentedinput: <SegmentedInput segments={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]} />,
  select: <SelectPreview />,
  signaturepad: <SignaturePad />,
  slider: <SliderPreview />,
  splitbutton: <SplitButton label="Save" items={[{ label: 'Save as draft', onClick: () => {} }, { label: 'Save and publish', onClick: () => {} }]} />,
  switch: <SwitchPreview />,
  tagsinput: <TagsInputPreview />,
  textarea: <TextareaPreview />,
  timepicker: <TimePicker />,

  // ─── Layout ──────────────────────────────────────────────
  card: (
    <Card variant="outlined" padding="md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text color="secondary" variant="small">Card content goes here. Use sub-components for structure.</Text>
      </CardContent>
    </Card>
  ),
  divider: (
    <div className="space-y-4">
      <Text color="secondary">Content above</Text>
      <Divider />
      <Text color="secondary">Content below</Text>
      <Divider label="or" />
      <Text color="secondary">Content after labeled divider</Text>
    </div>
  ),
  footer: <Footer />,
  gridsystem: (
    <GridSystem>
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 rounded-lg bg-surface-secondary text-center text-sm text-text-secondary">Column {i}</div>
      ))}
    </GridSystem>
  ),
  layout: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-32">
      <Layout>
        <Text variant="small" color="secondary">Layout container with default padding and structure</Text>
      </Layout>
    </div>
  ),
  masonrylayout: (
    <MasonryLayout columns={3}>
      {[80, 120, 60, 100, 90, 70].map((h, i) => (
        <div key={i} className="rounded-lg bg-surface-secondary" style={{ height: h }}>
          <div className="p-3 text-xs text-text-tertiary">Item {i + 1}</div>
        </div>
      ))}
    </MasonryLayout>
  ),
  panel: (
    <Panel title="Panel Title" subtitle="Panel subtitle text">
      <Text variant="small" color="secondary">Panel body content goes here.</Text>
    </Panel>
  ),
  resizablepanel: (
    <div className="h-32 border border-border-primary rounded-xl overflow-hidden">
      <ResizablePanel>
        <Text variant="small" color="secondary">Drag edges to resize this panel.</Text>
      </ResizablePanel>
    </div>
  ),
  scrollarea: (
    <ScrollArea className="h-32 w-full rounded-xl border border-border-primary">
      <div className="p-4 space-y-2">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="text-sm text-text-secondary">Scrollable item {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  ),
  sheet: <SheetPreview />,
  sidebar: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-48">
      <Sidebar items={[{ label: 'Dashboard', href: '#' }, { label: 'Settings', href: '#' }, { label: 'Profile', href: '#' }]} />
    </div>
  ),
  spacer: (
    <div className="flex flex-col items-center">
      <div className="px-4 py-2 bg-surface-secondary rounded text-sm text-text-secondary">Above</div>
      <Spacer size="lg" />
      <div className="px-4 py-2 bg-surface-secondary rounded text-sm text-text-secondary">Below (with Spacer)</div>
    </div>
  ),
  splitview: (
    <div className="h-32 border border-border-primary rounded-xl overflow-hidden">
      <SplitView
        left={<div className="p-3 text-sm text-text-secondary">Left pane</div>}
        right={<div className="p-3 text-sm text-text-secondary">Right pane</div>}
      />
    </div>
  ),
  stickycontainer: (
    <div className="border border-border-primary rounded-xl p-3">
      <StickyContainer>
        <Text variant="small" color="secondary">This content sticks to the top when scrolling.</Text>
      </StickyContainer>
    </div>
  ),
  windowcontrols: <WindowControls />,
  windowframe: (
    <WindowFrame title="Preview Window">
      <div className="p-4">
        <Text variant="small" color="secondary">Window frame content.</Text>
      </div>
    </WindowFrame>
  ),

  // ─── Typography ──────────────────────────────────────────
  blockquote: <Blockquote cite="Steve Jobs">Design is not just what it looks like and feels like. Design is how it works.</Blockquote>,
  callout: <Callout title="Heads up" variant="info">This is an informational callout with supporting text.</Callout>,
  caption: <Caption>Figure 1 — Component preview caption</Caption>,
  definitionlist: (
    <DefinitionList items={[{ term: 'API', definition: 'Application Programming Interface' }, { term: 'SDK', definition: 'Software Development Kit' }, { term: 'CLI', definition: 'Command Line Interface' }]} />
  ),
  descriptionblock: <DescriptionBlock title="Feature" description="A comprehensive design system built for modern applications." />,
  heading: (
    <div className="space-y-2">
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
    </div>
  ),
  keyvalueinfo: (
    <KeyValueInfo items={[{ key: 'Status', value: 'Active' }, { key: 'Created', value: 'Jan 15, 2025' }, { key: 'Version', value: '2.1.0' }]} />
  ),
  label: (
    <div className="space-y-2">
      <Label htmlFor="demo">Form label</Label>
      <Label htmlFor="demo2" required>Required label</Label>
    </div>
  ),
  paragraph: <Paragraph>The quick brown fox jumps over the lazy dog. This paragraph demonstrates default text rendering with proper line height and spacing.</Paragraph>,
  propertylist: <PropertyList properties={[{ label: 'Name', value: 'Component Library' }, { label: 'Version', value: '1.0.0' }, { label: 'License', value: 'MIT' }]} />,
  sectionheader: <SectionHeader title="Section Title" subtitle="Optional subtitle text" />,
  text: (
    <div className="space-y-2">
      <Text variant="lead">Lead — introductory paragraphs</Text>
      <Text variant="body">Body — general content</Text>
      <Text variant="small" color="secondary">Small — helper and metadata</Text>
      <Text variant="tiny" color="tertiary">Tiny — captions and fine print</Text>
    </div>
  ),
  title: (
    <div className="space-y-2">
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
      <Title level={4}>Heading 4</Title>
      <Title level={5} color="secondary">Heading 5 secondary</Title>
    </div>
  ),

  // ─── Navigation ──────────────────────────────────────────
  bottomnavigation: (
    <BottomNavigation items={[{ label: 'Home', icon: <span>H</span>, href: '#' }, { label: 'Search', icon: <span>S</span>, href: '#' }, { label: 'Profile', icon: <span>P</span>, href: '#' }]} />
  ),
  breadcrumb: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  breadcrumbtabshybrid: <BreadcrumbTabsHybrid items={[{ label: 'Overview', value: 'overview' }, { label: 'Settings', value: 'settings' }, { label: 'Analytics', value: 'analytics' }]} />,
  commandmenu: (
    <div className="border border-border-primary rounded-xl p-4 text-center">
      <Text variant="small" color="secondary">Press <kbd className="px-2 py-1 rounded bg-surface-secondary text-xs font-mono">Cmd+K</kbd> to open Command Menu</Text>
    </div>
  ),
  contextmenu: (
    <ContextMenu items={[{ label: 'Copy', onClick: () => {} }, { label: 'Paste', onClick: () => {} }, { label: 'Delete', onClick: () => {} }]}>
      <div className="border border-dashed border-border-primary rounded-xl p-6 text-center">
        <Text variant="small" color="secondary">Right-click this area</Text>
      </div>
    </ContextMenu>
  ),
  dockbar: <DockBar items={[{ icon: <span>F</span>, label: 'Finder' }, { icon: <span>S</span>, label: 'Settings' }, { icon: <span>T</span>, label: 'Terminal' }]} />,
  hamburgermenuicon: <HamburgerMenuIconPreview />,
  menubar: (
    <MenuBar items={[{ label: 'File', items: [{ label: 'New', onClick: () => {} }, { label: 'Open', onClick: () => {} }] }, { label: 'Edit', items: [{ label: 'Undo', onClick: () => {} }, { label: 'Redo', onClick: () => {} }] }]} />
  ),
  navbar: <NavBar brand="Smart Coder" items={[{ label: 'Home', href: '#' }, { label: 'Docs', href: '#' }, { label: 'Components', href: '#' }]} />,
  navigationdrawer: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-48">
      <NavigationDrawer items={[{ label: 'Dashboard', href: '#' }, { label: 'Components', href: '#' }, { label: 'Settings', href: '#' }]} />
    </div>
  ),
  pagination: <PaginationPreview />,
  tabs: (
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
  ),
  topactionbar: <TopActionBar title="Page Title" actions={[{ label: 'Save', onClick: () => {} }, { label: 'Cancel', onClick: () => {} }]} />,

  // ─── Feedback / Display ──────────────────────────────────
  accordion: (
    <Accordion type="single" defaultValue="item-1" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a design system?</AccordionTrigger>
        <AccordionContent>A collection of reusable components with clear standards for consistent UI development.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why use components?</AccordionTrigger>
        <AccordionContent>Components promote reusability, consistency, and faster development cycles.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How to get started?</AccordionTrigger>
        <AccordionContent>Install the package and import the components you need into your project.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  alert: (
    <div className="space-y-3">
      <Alert variant="default">This is a default alert notification.</Alert>
      <Alert variant="success">Operation completed successfully.</Alert>
      <Alert variant="warning">Please review before continuing.</Alert>
      <Alert variant="destructive">Something went wrong. Please try again.</Alert>
    </div>
  ),
  avatar: (
    <div className="flex gap-3 items-center">
      <Avatar size="sm"><div className="w-full h-full bg-accent-blue flex items-center justify-center text-white text-xs font-medium">JD</div></Avatar>
      <Avatar size="md"><div className="w-full h-full bg-accent-purple flex items-center justify-center text-white text-sm font-medium">AB</div></Avatar>
      <Avatar size="lg"><div className="w-full h-full bg-accent-green flex items-center justify-center text-white font-medium">MK</div></Avatar>
    </div>
  ),
  avatargroup: (
    <AvatarGroup
      items={[
        { name: 'Alice Johnson', fallback: 'AJ' },
        { name: 'Bob Smith', fallback: 'BS' },
        { name: 'Carol Williams', fallback: 'CW' },
        { name: 'David Brown', fallback: 'DB' },
        { name: 'Eve Davis', fallback: 'ED' },
        { name: 'Frank Miller', fallback: 'FM' },
      ]}
      max={4}
    />
  ),
  badge: (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  chip: (
    <div className="flex flex-wrap gap-2">
      <Chip>Default</Chip>
      <Chip variant="primary">React</Chip>
      <Chip variant="success">Active</Chip>
      <Chip variant="warning">Pending</Chip>
      <Chip variant="error" onDelete={() => {}}>Removable</Chip>
    </div>
  ),
  collapsible: <CollapsiblePreview />,
  confirmdialog: <ConfirmDialogPreview />,
  emptystate: <EmptyState title="No results found" description="Try adjusting your search or filter criteria." />,
  errorboundary: (
    <ErrorBoundary fallback={<Text color="secondary">Error boundary active — catches rendering errors.</Text>}>
      <Text variant="small" color="secondary">Content wrapped in an ErrorBoundary. Errors are caught gracefully.</Text>
    </ErrorBoundary>
  ),
  jargontooltip: <JargonTooltip term="SSR">Server-Side Rendering — HTML is generated on the server for each request.</JargonTooltip>,
  loadingoverlay: <LoadingOverlayPreview />,
  maintenancemode: (
    <div className="border border-border-primary rounded-xl overflow-hidden">
      <MaintenanceMode title="Under Maintenance" message="We'll be back shortly. Thanks for your patience." />
    </div>
  ),
  modal: <ModalPreview />,
  modalstackmanager: (
    <div className="border border-border-primary rounded-xl p-4 text-center">
      <Text variant="small" color="secondary">ModalStackManager controls stacking order of multiple modals.</Text>
    </div>
  ),
  offlinestate: (
    <div className="border border-border-primary rounded-xl overflow-hidden">
      <OfflineState />
    </div>
  ),
  popover: <PopoverPreview />,
  progress: (
    <div className="space-y-4">
      <div className="space-y-1">
        <Text variant="small" color="secondary">Upload progress</Text>
        <Progress value={65} />
      </div>
      <div className="space-y-1">
        <Text variant="small" color="secondary">Complete</Text>
        <Progress value={100} />
      </div>
    </div>
  ),
  skeleton: (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </div>
  ),
  snackbar: <SnackbarPreview />,
  spinner: (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" color="blue" />
    </div>
  ),
  stepper: (
    <Stepper
      steps={[
        { id: 1, title: 'Account', description: 'Create account' },
        { id: 2, title: 'Profile', description: 'Set up profile' },
        { id: 3, title: 'Complete', description: 'All done' },
      ]}
      activeStep={1}
    />
  ),
  tag: (
    <div className="flex flex-wrap gap-2">
      <Tag>Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </div>
  ),
  toast: (
    <div className="space-y-2">
      <Toast>
        <ToastTitle>Changes saved</ToastTitle>
        <ToastDescription>Your profile has been updated successfully.</ToastDescription>
      </Toast>
    </div>
  ),
  tooltip: (
    <div className="flex gap-4">
      <Tooltip content="This is a tooltip">
        <Button variant="outline" size="sm">Hover me</Button>
      </Tooltip>
      <Tooltip content="Another tooltip" side="bottom">
        <Button variant="ghost" size="sm">Bottom tooltip</Button>
      </Tooltip>
    </div>
  ),

  // ─── Data Display ────────────────────────────────────────
  codeblock: (
    <CodeBlock
      code={`import { Button } from '@/components/ui/Button'\n\n<Button variant="primary">Get started</Button>`}
      language="tsx"
    />
  ),
  datagrid: (
    <DataGrid
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role' },
      ]}
      data={[
        { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
        { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
        { name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer' },
      ]}
    />
  ),
  diffviewer: <DiffViewer oldValue={`const name = "world"\nconsole.log(name)`} newValue={`const name = "Smart Coder"\nconsole.log(\`Hello, \${name}\`)`} />,
  filterbar: (
    <FilterBar
      filters={[
        { id: 'status', label: 'Status', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
        { id: 'role', label: 'Role', options: [{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }] },
      ]}
      activeFilters={[]}
      onFilterChange={() => {}}
    />
  ),
  gallery: (
    <Gallery
      images={[
        { src: 'https://picsum.photos/seed/1/200/150', alt: 'Image 1' },
        { src: 'https://picsum.photos/seed/2/200/150', alt: 'Image 2' },
        { src: 'https://picsum.photos/seed/3/200/150', alt: 'Image 3' },
      ]}
    />
  ),
  imagecarousel: (
    <ImageCarousel
      images={[
        { src: 'https://picsum.photos/seed/a/400/200', alt: 'Slide 1' },
        { src: 'https://picsum.photos/seed/b/400/200', alt: 'Slide 2' },
        { src: 'https://picsum.photos/seed/c/400/200', alt: 'Slide 3' },
      ]}
    />
  ),
  inspectorpanel: (
    <InspectorPanel
      data={{ component: 'Button', variant: 'primary', size: 'md', disabled: false }}
    />
  ),
  jsonviewer: (
    <JsonViewer data={{ name: 'Smart Coder', version: '1.0.0', components: 212, theme: 'dark' }} />
  ),
  kanbanboard: (
    <KanbanBoard
      columns={[
        { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Design tokens' }, { id: '2', title: 'Color system' }] },
        { id: 'doing', title: 'In Progress', cards: [{ id: '3', title: 'Button variants' }] },
        { id: 'done', title: 'Done', cards: [{ id: '4', title: 'Typography scale' }] },
      ]}
    />
  ),
  lightbox: (
    <div className="border border-border-primary rounded-xl p-4 text-center">
      <Text variant="small" color="secondary">Lightbox — opens fullscreen image viewer on click.</Text>
    </div>
  ),
  querybuilder: <QueryBuilder fields={[{ name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] }, { name: 'name', label: 'Name', type: 'text' }]} />,
  reviews: (
    <Reviews
      reviews={[
        { id: '1', author: 'Sarah Chen', rating: 5, comment: 'Excellent design system! Very well documented.', date: '2025-01-15' },
        { id: '2', author: 'James Wilson', rating: 4, comment: 'Great components, would love more animation options.', date: '2025-01-10' },
      ]}
    />
  ),
  table: (
    <Table
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'status', header: 'Status' },
        { key: 'amount', header: 'Amount' },
      ]}
      data={[
        { name: 'Project Alpha', status: 'Active', amount: '$12,500' },
        { name: 'Project Beta', status: 'Pending', amount: '$8,300' },
        { name: 'Project Gamma', status: 'Completed', amount: '$24,100' },
      ]}
    />
  ),
  timeline: (
    <Timeline>
      <TimelineItem title="Order placed" description="Your order has been confirmed" date="Jan 15" status="success" />
      <TimelineItem title="Processing" description="Payment verified and order prepared" date="Jan 16" status="success" />
      <TimelineItem title="Shipped" description="Package in transit" date="Jan 17" status="info" isActive />
      <TimelineItem title="Delivered" description="Estimated arrival" date="Jan 20" status="default" isLast />
    </Timeline>
  ),
  treeview: (
    <TreeView
      data={[
        { id: '1', label: 'src', children: [
          { id: '2', label: 'components', children: [
            { id: '3', label: 'Button.tsx' },
            { id: '4', label: 'Card.tsx' },
          ]},
          { id: '5', label: 'pages', children: [
            { id: '6', label: 'Home.tsx' },
          ]},
        ]},
      ]}
    />
  ),

  // ─── Media / Rich Content ────────────────────────────────
  audioplayer: <AudioPlayer src="" title="Sample Track" artist="Artist Name" />,
  barcodegenerator: <BarcodeGenerator value="1234567890" />,
  comicpanel: (
    <ComicPanel panels={[{ image: 'https://picsum.photos/seed/comic1/200/150', caption: 'Panel 1' }, { image: 'https://picsum.photos/seed/comic2/200/150', caption: 'Panel 2' }]} />
  ),
  docscanoverlay: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-48">
      <DocScanOverlay />
    </div>
  ),
  fileupload: <FileUpload onFileSelect={() => {}} accept=".pdf,.jpg,.png" />,
  imagecropper: (
    <div className="border border-border-primary rounded-xl p-4 text-center">
      <Text variant="small" color="secondary">ImageCropper — select and crop image regions interactively.</Text>
    </div>
  ),
  markdowneditor: (
    <div className="border border-border-primary rounded-xl overflow-hidden">
      <MarkdownEditor defaultValue="# Hello World\n\nWrite **markdown** here." />
    </div>
  ),
  multifileupload: <MultiFileUpload onFilesSelect={() => {}} />,
  qrcodegenerator: <QRCodeGenerator value="https://smartcoder.dev" />,
  richtexteditor: (
    <div className="border border-border-primary rounded-xl overflow-hidden">
      <RichTextEditor />
    </div>
  ),
  videoplayer: <VideoPlayer src="" poster="https://picsum.photos/seed/video/400/225" />,
  voicerecorder: <VoiceRecorder onRecordingComplete={() => {}} />,

  // ─── Data Visualization ──────────────────────────────────
  assetallocationchart: (
    <AssetAllocationChart
      data={[
        { label: 'Stocks', value: 45, color: '#3B82F6' },
        { label: 'Bonds', value: 30, color: '#10B981' },
        { label: 'Real Estate', value: 15, color: '#F59E0B' },
        { label: 'Cash', value: 10, color: '#6B7280' },
      ]}
    />
  ),
  assetpriceticker: (
    <AssetPriceTicker
      assets={[
        { symbol: 'BTC', name: 'Bitcoin', price: 67234.50, change: 2.4 },
        { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: -1.2 },
        { symbol: 'SOL', name: 'Solana', price: 178.90, change: 5.1 },
      ]}
    />
  ),
  balancechart: (
    <BalanceChart
      data={[
        { date: 'Jan', balance: 5200 },
        { date: 'Feb', balance: 5800 },
        { date: 'Mar', balance: 5400 },
        { date: 'Apr', balance: 6200 },
        { date: 'May', balance: 7100 },
      ]}
    />
  ),
  chart: (
    <Chart
      type="bar"
      data={{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{ data: [12, 19, 8, 15, 22], backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'] }],
      }}
      size={200}
    />
  ),
  counters: (
    <Counters
      items={[
        { label: 'Users', value: 12847 },
        { label: 'Revenue', value: 84200 },
        { label: 'Orders', value: 3429 },
      ]}
    />
  ),
  counterslistwithchart: (
    <CountersListWithChart
      items={[
        { label: 'Active Users', value: 2840, data: [20, 40, 30, 50, 45, 60, 55] },
        { label: 'Conversion', value: 12.5, data: [5, 8, 12, 10, 15, 11, 13] },
      ]}
    />
  ),
  kpiblock: (
    <div className="flex gap-3 flex-wrap">
      <KPIBlock title="Revenue" value="$84.2K" trend="up" change="+12.5%" />
      <KPIBlock title="Users" value="12.8K" trend="up" change="+8.3%" />
      <KPIBlock title="Churn" value="2.1%" trend="down" change="-0.4%" />
    </div>
  ),
  portfoliodistribution: (
    <PortfolioDistribution
      assets={[
        { name: 'US Equities', percentage: 40, color: '#3B82F6' },
        { name: 'International', percentage: 25, color: '#10B981' },
        { name: 'Bonds', percentage: 20, color: '#F59E0B' },
        { name: 'Alternatives', percentage: 15, color: '#8B5CF6' },
      ]}
    />
  ),
  resourcemonitor: (
    <ResourceMonitor
      resources={[
        { label: 'CPU', value: 67, max: 100 },
        { label: 'Memory', value: 4.2, max: 8, unit: 'GB' },
        { label: 'Disk', value: 120, max: 256, unit: 'GB' },
      ]}
    />
  ),
  sparkline: (
    <div className="flex gap-6 items-center">
      <div className="space-y-1">
        <Text variant="small" color="secondary">Revenue</Text>
        <Sparkline data={[10, 15, 8, 22, 18, 25, 30]} color="#10B981" showArea />
      </div>
      <div className="space-y-1">
        <Text variant="small" color="secondary">Users</Text>
        <Sparkline data={[5, 12, 8, 15, 20, 18, 25]} color="#3B82F6" showLastDot />
      </div>
    </div>
  ),
  statisticdisplay: (
    <StatisticDisplay
      title="Monthly Revenue"
      value="$124,500"
      trend="up"
      change="+18.2%"
      description="Compared to last month"
    />
  ),

  // ─── Motion & Interaction ────────────────────────────────
  floatingelement: (
    <div className="relative h-24">
      <FloatingElement>
        <div className="px-4 py-2 bg-surface-secondary rounded-xl shadow-sm text-sm text-text-secondary">Floating element</div>
      </FloatingElement>
    </div>
  ),
  floatingtoolbar: (
    <FloatingToolbar items={[{ label: 'Bold', onClick: () => {} }, { label: 'Italic', onClick: () => {} }, { label: 'Link', onClick: () => {} }]} />
  ),
  gesturecard: (
    <GestureCard>
      <div className="p-6 text-center">
        <Text variant="small" color="secondary">Swipe or drag this card</Text>
      </div>
    </GestureCard>
  ),
  immersivehero: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-48">
      <ImmersiveHero title="Immersive Hero" subtitle="Full-screen hero with parallax effects" />
    </div>
  ),
  infinitehorizontalloop: (
    <InfiniteHorizontalLoop>
      {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'].map((t) => (
        <span key={t} className="px-4 py-2 bg-surface-secondary rounded-full text-sm text-text-secondary whitespace-nowrap">{t}</span>
      ))}
    </InfiniteHorizontalLoop>
  ),
  interactivecursor: (
    <div className="border border-border-primary rounded-xl p-6 text-center">
      <Text variant="small" color="secondary">InteractiveCursor — custom cursor effects on hover.</Text>
    </div>
  ),
  parallaxbanner: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-32">
      <ParallaxBanner title="Parallax Banner" backgroundImage="https://picsum.photos/seed/parallax/800/200" />
    </div>
  ),
  parallaxstorystage: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-32">
      <ParallaxStoryStage>
        <Text variant="small" color="secondary">Scroll to reveal story stages.</Text>
      </ParallaxStoryStage>
    </div>
  ),
  scrollprogressbar: <ScrollProgressBar />,
  scrollrevealcards: (
    <ScrollRevealCards>
      {['Card A', 'Card B', 'Card C'].map((t) => (
        <div key={t} className="p-4 bg-surface-secondary rounded-xl">
          <Text variant="small">{t}</Text>
        </div>
      ))}
    </ScrollRevealCards>
  ),
  stickyimagetextswap: (
    <div className="border border-border-primary rounded-xl overflow-hidden h-32 p-4">
      <Text variant="small" color="secondary">StickyImageTextSwap — image and text swap on scroll.</Text>
    </div>
  ),
  unscramblingtext: <UnscramblingText text="Design System" />,

  // ─── AI ──────────────────────────────────────────────────
  aithinkingindicator: <AIThinkingIndicator label="Analyzing your request..." />,
  hyperpersonalizedwidgetfeed: (
    <HyperPersonalizedWidgetFeed
      widgets={[
        { id: '1', title: 'Weather', content: 'Sunny, 24°C' },
        { id: '2', title: 'Stocks', content: 'Portfolio +2.3%' },
      ]}
    />
  ),
  promptsuggestionchips: (
    <PromptSuggestionChips
      suggestions={['Write a blog post', 'Analyze this data', 'Create a summary', 'Generate code']}
      onSelect={() => {}}
    />
  ),
  smartinsightscard: (
    <SmartInsightsCard
      title="Spending Insight"
      insight="Your dining expenses increased 23% this month compared to your 3-month average."
      category="spending"
    />
  ),

  // ─── Auth & Security ─────────────────────────────────────
  accessiblehighcontrastmode: (
    <div className="border border-border-primary rounded-xl overflow-hidden p-4">
      <AccessibleHighContrastMode />
    </div>
  ),
  behavioralauthsimulator: (
    <div className="border border-border-primary rounded-xl overflow-hidden">
      <BehavioralAuthSimulator />
    </div>
  ),
  biometricprompt: <BiometricPrompt type="fingerprint" onAuthenticate={() => {}} />,
  identityverificationstep: (
    <IdentityVerificationStep
      step="document"
      title="Verify your identity"
      description="Upload a government-issued photo ID."
    />
  ),
  loginform: <LoginFormPreview />,
  permissionsmatrix: (
    <PermissionsMatrix
      roles={['Admin', 'Editor', 'Viewer']}
      permissions={[
        { name: 'Create', admin: true, editor: true, viewer: false },
        { name: 'Read', admin: true, editor: true, viewer: true },
        { name: 'Delete', admin: true, editor: false, viewer: false },
      ]}
    />
  ),
  recoverycodedisplay: (
    <RecoveryCodeDisplay codes={['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456']} />
  ),
  securityactivitylog: (
    <SecurityActivityLog
      activities={[
        { id: '1', action: 'Login', device: 'MacBook Pro', location: 'Buenos Aires, AR', timestamp: '2025-01-15T10:30:00Z' },
        { id: '2', action: 'Password changed', device: 'iPhone 15', location: 'Buenos Aires, AR', timestamp: '2025-01-14T08:15:00Z' },
      ]}
    />
  ),
  securityotpinput: <SecurityOTPInput length={6} onComplete={() => {}} />,
  signupform: <SignupFormPreview />,
  twofactorauth: <TwoFactorAuth onVerify={() => {}} />,

  // ─── Commerce ────────────────────────────────────────────
  cartpreview: (
    <CartPreview
      items={[
        { id: '1', name: 'Wireless Headphones', price: 299.99, quantity: 1, image: 'https://picsum.photos/seed/headphones/60/60' },
        { id: '2', name: 'USB-C Cable', price: 19.99, quantity: 2, image: 'https://picsum.photos/seed/cable/60/60' },
      ]}
    />
  ),
  invoicepreview: (
    <InvoicePreview
      invoice={{
        id: 'INV-2025-001',
        date: '2025-01-15',
        dueDate: '2025-02-15',
        items: [{ description: 'Design System License', quantity: 1, unitPrice: 499 }],
        total: 499,
      }}
    />
  ),
  ordersummary: (
    <OrderSummary
      items={[
        { name: 'Pro Plan', price: 29.99 },
        { name: 'Additional seat', price: 9.99 },
      ]}
      subtotal={39.98}
      tax={3.60}
      total={43.58}
    />
  ),
  pricedisplay: (
    <div className="flex gap-4 items-center">
      <PriceDisplay price={49.99} currency="USD" />
      <PriceDisplay price={29.99} originalPrice={49.99} currency="USD" />
    </div>
  ),
  productcard: (
    <ProductCard
      id="1"
      name="Smart Watch Pro"
      description="Advanced fitness tracking with AMOLED display"
      price={299.99}
      originalPrice={399.99}
      image="https://picsum.photos/seed/watch/300/300"
      rating={4.5}
      reviewCount={128}
      badge={{ text: 'Sale', variant: 'sale' }}
    />
  ),
  retailswapinterface: <RetailSwapInterface />,

  // ─── FinTech ─────────────────────────────────────────────
  achtransactionsvisualizer: (
    <AchTransactionsVisualizer
      transactions={[
        { id: '1', type: 'credit', amount: 2500, description: 'Salary deposit', date: '2025-01-15', status: 'completed' },
        { id: '2', type: 'debit', amount: 850, description: 'Rent payment', date: '2025-01-01', status: 'completed' },
      ]}
    />
  ),
  bankaccountcard: (
    <BankAccountCard
      accountName="Checking Account"
      accountNumber="****4521"
      balance={12450.75}
      type="checking"
    />
  ),
  cashbackwidget: (
    <CashbackWidget
      totalCashback={127.50}
      pendingCashback={23.40}
      categories={[
        { name: 'Dining', percentage: 5 },
        { name: 'Travel', percentage: 3 },
        { name: 'Shopping', percentage: 2 },
      ]}
    />
  ),
  creditlimitmanager: <CreditLimitManager currentLimit={5000} maxLimit={15000} utilization={32} />,
  creditscoresimulator: <CreditScoreSimulator score={742} />,
  currencyconverterwidget: <CurrencyConverterWidget />,
  earlypaymentdiscount: (
    <EarlyPaymentDiscount
      originalAmount={1000}
      discountPercentage={2}
      dueDate="2025-02-15"
      earlyDate="2025-01-31"
    />
  ),
  expensecategorizer: (
    <ExpenseCategorizer
      expenses={[
        { id: '1', description: 'Grocery store', amount: 85.40, category: 'Food' },
        { id: '2', description: 'Gas station', amount: 45.00, category: 'Transport' },
        { id: '3', description: 'Netflix', amount: 15.99, category: 'Entertainment' },
      ]}
    />
  ),
  fairuselimittracker: <FairUseLimitTracker used={7500} limit={10000} unit="API calls" />,
  financialgoaltracker: (
    <FinancialGoalTracker
      goals={[
        { id: '1', name: 'Emergency Fund', target: 10000, current: 7500, icon: '🏦' },
        { id: '2', name: 'Vacation', target: 3000, current: 1200, icon: '✈️' },
      ]}
    />
  ),
  fintechdashboardpreview: <FintechDashboardPreview />,
  gamifiedrewardtier: (
    <GamifiedRewardTier
      currentTier="Gold"
      points={4500}
      nextTier="Platinum"
      pointsToNext={500}
    />
  ),
  installmentsimulator: (
    <InstallmentSimulator
      totalAmount={12000}
      interestRate={5.9}
      maxMonths={36}
    />
  ),
  interactivebillsplitter: <InteractiveBillSplitter totalAmount={125.50} participants={['Alice', 'Bob', 'Carol']} />,
  multicurrencywallet: (
    <MultiCurrencyWallet
      balances={[
        { currency: 'USD', amount: 5420.30, symbol: '$' },
        { currency: 'EUR', amount: 3215.80, symbol: '€' },
        { currency: 'GBP', amount: 2100.00, symbol: '£' },
      ]}
    />
  ),
  paymentconfirmationmodal: (
    <div className="border border-border-primary rounded-xl p-4 text-center">
      <Text variant="small" color="secondary">PaymentConfirmationModal — confirms payment details before processing.</Text>
    </div>
  ),
  paymentmethodselector: (
    <PaymentMethodSelector
      methods={[
        { id: '1', type: 'card', label: 'Visa ending in 4242', icon: '💳' },
        { id: '2', type: 'card', label: 'Mastercard ending in 8888', icon: '💳' },
        { id: '3', type: 'bank', label: 'Bank transfer', icon: '🏦' },
      ]}
    />
  ),
  quicktransferbar: (
    <QuickTransferBar
      contacts={[
        { id: '1', name: 'Alice', avatar: 'AJ' },
        { id: '2', name: 'Bob', avatar: 'BS' },
        { id: '3', name: 'Carol', avatar: 'CW' },
      ]}
    />
  ),
  recurringinvestconfigurator: <RecurringInvestConfigurator />,
  roundupsavingstoggle: <RoundUpSavingsToggle />,
  socialpaymentfeed: (
    <SocialPaymentFeed
      payments={[
        { id: '1', from: 'Alice', to: 'Bob', amount: 25, note: 'Lunch split', timestamp: '2025-01-15T12:00:00Z' },
        { id: '2', from: 'Carol', to: 'David', amount: 50, note: 'Concert tickets', timestamp: '2025-01-14T18:30:00Z' },
      ]}
    />
  ),
  subscriptionmanager: (
    <SubscriptionManager
      subscriptions={[
        { id: '1', name: 'Netflix', price: 15.99, billingCycle: 'monthly', status: 'active', nextBilling: '2025-02-01' },
        { id: '2', name: 'Spotify', price: 9.99, billingCycle: 'monthly', status: 'active', nextBilling: '2025-02-05' },
      ]}
    />
  ),
  transactionlist: (
    <TransactionList
      transactions={[
        { id: '1', description: 'Apple Store', amount: -299.99, date: '2025-01-15', category: 'shopping', type: 'debit' },
        { id: '2', description: 'Salary Deposit', amount: 5400, date: '2025-01-14', category: 'income', type: 'credit' },
        { id: '3', description: 'Coffee Shop', amount: -4.50, date: '2025-01-14', category: 'food', type: 'debit' },
      ]}
    />
  ),
  transferform: <TransferForm onSubmit={() => {}} />,
  virtualcardpreview: (
    <VirtualCardPreview
      cardNumber="4242 4242 4242 4242"
      expiryDate="12/27"
      cardHolder="Jane Doe"
      type="visa"
    />
  ),

  // ─── Communication ───────────────────────────────────────
  chatbubble: (
    <div className="space-y-3">
      <ChatBubble message="Hey, how are you?" sender="other" timestamp="10:30 AM" name="Alice" />
      <ChatBubble message="I'm doing great! Working on the design system." sender="self" timestamp="10:31 AM" />
    </div>
  ),
  chatinput: <ChatInput onSend={() => {}} placeholder="Type a message..." />,
  commentthread: (
    <CommentThread
      comments={[
        { id: '1', author: 'Alice', content: 'Looks great! Love the new design.', timestamp: '2 hours ago' },
        { id: '2', author: 'Bob', content: 'Agreed, the spacing feels much better now.', timestamp: '1 hour ago', parentId: '1' },
      ]}
    />
  ),
  messagereactions: (
    <MessageReactions
      reactions={[
        { emoji: '👍', count: 5, reacted: true },
        { emoji: '❤️', count: 3, reacted: false },
        { emoji: '🎉', count: 2, reacted: false },
      ]}
      onReact={() => {}}
    />
  ),
  notificationcenterpanel: (
    <NotificationCenterPanel
      notifications={[
        { id: '1', title: 'New comment', message: 'Alice commented on your post', timestamp: '5m ago', read: false },
        { id: '2', title: 'Update available', message: 'Version 2.1.0 is ready', timestamp: '1h ago', read: true },
      ]}
    />
  ),

  // ─── Scheduling ──────────────────────────────────────────
  agendaview: (
    <AgendaView
      events={[
        { id: '1', title: 'Team standup', start: '09:00', end: '09:30', color: '#3B82F6' },
        { id: '2', title: 'Design review', start: '11:00', end: '12:00', color: '#10B981' },
        { id: '3', title: 'Lunch break', start: '12:30', end: '13:30', color: '#F59E0B' },
      ]}
    />
  ),
  calendar: <CalendarPreview />,
  schedulertimeline: (
    <SchedulerTimeline
      events={[
        { id: '1', title: 'Sprint Planning', start: '2025-01-15T09:00:00', end: '2025-01-15T10:30:00' },
        { id: '2', title: 'Code Review', start: '2025-01-15T14:00:00', end: '2025-01-15T15:00:00' },
      ]}
    />
  ),

  // ─── Utility ─────────────────────────────────────────────
  activityfeed: (
    <ActivityFeed
      items={[
        { id: '1', user: 'Alice', action: 'created a new component', timestamp: '2 min ago' },
        { id: '2', user: 'Bob', action: 'updated the color tokens', timestamp: '15 min ago' },
        { id: '3', user: 'Carol', action: 'merged pull request #42', timestamp: '1 hour ago' },
      ]}
    />
  ),
  activitymonitor: (
    <ActivityMonitor
      metrics={[
        { label: 'CPU Usage', value: 45, unit: '%' },
        { label: 'Memory', value: 68, unit: '%' },
        { label: 'Network', value: 12, unit: 'MB/s' },
      ]}
    />
  ),
  addressselector: <AddressSelector />,
  cardsecuritycontrols: <CardSecurityControls />,
  contextualtrustbadge: <ContextualTrustBadge level="verified" label="Verified seller" />,
  devicelist: (
    <DeviceList
      devices={[
        { id: '1', name: 'MacBook Pro', type: 'laptop', status: 'active', lastSeen: '2 min ago' },
        { id: '2', name: 'iPhone 15', type: 'phone', status: 'active', lastSeen: '1 hour ago' },
        { id: '3', name: 'iPad Air', type: 'tablet', status: 'inactive', lastSeen: '3 days ago' },
      ]}
    />
  ),
  fileintelligencepreview: <FileIntelligencePreview fileName="report.pdf" fileSize="2.4 MB" fileType="PDF" />,
  microcommitmentstepper: (
    <MicroCommitmentStepper
      steps={[
        { id: '1', label: 'Choose plan', completed: true },
        { id: '2', label: 'Enter details', completed: false },
        { id: '3', label: 'Confirm', completed: false },
      ]}
    />
  ),
  progressivedisclosurepanel: (
    <ProgressiveDisclosurePanel
      title="Advanced settings"
      summary="Configure advanced options for your account."
    >
      <Text variant="small" color="secondary">Advanced configuration options appear here when expanded.</Text>
    </ProgressiveDisclosurePanel>
  ),
  slidetodelete: (
    <SlideToDelete onDelete={() => {}}>
      <div className="p-4 bg-surface-secondary rounded-xl">
        <Text variant="small">Swipe left to delete this item</Text>
      </div>
    </SlideToDelete>
  ),
  voicecommandoverlay: (
    <div className="border border-border-primary rounded-xl p-6 text-center">
      <Text variant="small" color="secondary">VoiceCommandOverlay — voice-activated command interface.</Text>
    </div>
  ),
}
