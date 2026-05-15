import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Copy, Check, Maximize2, X } from 'lucide-react'

import { Title } from '../../components/ui/Title'
import Text from '../../components/ui/Text'
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

      {/* EXAMPLES SECTION */}
      <div className="space-y-8 border-t border-border-primary pt-8">
        <div>
          <Title id={generateHeadingId(component.name, 'Examples')} level={3} className="mb-1">Examples</Title>
          <Text color="secondary">Interactive examples and their code snippets.</Text>
        </div>

        {/* Render component-specific examples */}
        <ComponentExamples componentName={component.name.toLowerCase()} />
      </div>

      {/* PROPS SECTION */}
      <div className="space-y-4 border-t border-border-primary pt-8">
        <Title id={generateHeadingId(component.name, 'API Reference')} level={3}>API Reference</Title>
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'

function ButtonExamples() {
  return (
    <>
      <ComponentExample
        title="Basic Variants"
        description="All available button variants"
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
        title="Basic Card"
        description="Standard card layout"
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
  const [selected, setSelected] = React.useState('option1')
  return (
    <>
      <ComponentExample
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
  return (
    <>
      <ComponentExample
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
  const [text, setText] = React.useState('')
  return (
    <>
      <ComponentExample
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
import { Accordion } from '../../components/ui/Accordion'

function AccordionExamples() {
  return (
    <>
      <ComponentExample
        title="Basic Accordion"
        description="Expandable accordion sections"
        preview={<Accordion items={[{title: 'Section 1', content: 'Content 1'}, {title: 'Section 2', content: 'Content 2'}]} />}
        code={`import { Accordion } from '@/components/ui/Accordion'
export function Example() {
  return (
    <Accordion items={[
      {title: 'Section 1', content: 'Content 1'},
      {title: 'Section 2', content: 'Content 2'}
    ]} />
  )
}`}
      />
    </>
  )
}

// ─── AVATAR EXAMPLES ───
import { Avatar } from '../../components/ui/Avatar'

function AvatarExamples() {
  return (
    <>
      <ComponentExample
        title="Basic Avatar"
        description="User avatar display"
        preview={<Avatar name="John Doe" />}
        code={`import { Avatar } from '@/components/ui/Avatar'
export function Example() {
  return <Avatar name="John Doe" />
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
        preview={<AvatarGroup avatars={[{name: 'John'}, {name: 'Jane'}, {name: 'Bob'}]} />}
        code={`import { AvatarGroup } from '@/components/ui/AvatarGroup'
export function Example() {
  return (
    <AvatarGroup avatars={[
      {name: 'John'},
      {name: 'Jane'},
      {name: 'Bob'}
    ]} />
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
        title="Tag Labels"
        description="Text tag labels"
        preview={
          <div className="flex flex-wrap gap-2">
            <Tag>Active</Tag>
            <Tag>Pending</Tag>
            <Tag>Completed</Tag>
          </div>
        }
        code={`import { Tag } from '@/components/ui/Tag'
export function Example() {
  return (
    <div className="flex gap-2">
      <Tag>Active</Tag>
      <Tag>Pending</Tag>
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
  const [value, setValue] = React.useState([50])
  return (
    <>
      <ComponentExample
        title="Range Slider"
        description="Adjustable range slider control"
        preview={<Slider value={value} onValueChange={setValue} max={100} className="w-64" />}
        code={`import { Slider } from '@/components/ui/Slider'
export function Example() {
  const [value, setValue] = useState([50])
  return <Slider value={value} onValueChange={setValue} max={100} />
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
  return (
    <>
      <ComponentExample
        title="Step Stepper"
        description="Multi-step progress indicator"
        preview={<Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Complete']} currentStep={2} />}
        code={`import { Stepper } from '@/components/ui/Stepper'
export function Example() {
  return (
    <Stepper 
      steps={['Step 1', 'Step 2', 'Step 3']} 
      currentStep={2} 
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
import { Toast } from '../../components/ui/Toast'

function ToastExamples() {
  return (
    <>
      <ComponentExample
        title="Toast Notification"
        description="Brief notification message"
        preview={<Toast message="Operation completed successfully!" />}
        code={`import { Toast } from '@/components/ui/Toast'
export function Example() {
  return <Toast message="Success!" />
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
  const columns = [{label: 'Name', key: 'name'}, {label: 'Email', key: 'email'}]
  const data = [{name: 'John', email: 'john@example.com'}, {name: 'Jane', email: 'jane@example.com'}]
  return (
    <>
      <ComponentExample
        title="Data Table"
        description="Display tabular data"
        preview={<Table columns={columns} data={data} />}
        code={`import { Table } from '@/components/ui/Table'
export function Example() {
  return (
    <Table 
      columns={[{label: 'Name', key: 'name'}]}
      data={[{name: 'John'}]}
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
import { Popover } from '../../components/ui/Popover'

function PopoverExamples() {
  return (
    <>
      <ComponentExample
        title="Popover Menu"
        description="Floating content popover"
        preview={<Popover trigger={<Button>Open Popover</Button>}>Popover content goes here</Popover>}
        code={`import { Popover } from '@/components/ui/Popover'
export function Example() {
  return (
    <Popover trigger={<Button>Open</Button>}>
      Content
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
  return (
    <>
      <ComponentExample
        title="Modal Dialog"
        description="Centered modal dialog box"
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open Modal</Button>
            <Modal open={open} onOpenChange={setOpen} title="Modal Title">
              <Text>This is modal content</Text>
            </Modal>
          </>
        }
        code={`import { Modal } from '@/components/ui/Modal'
export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onOpenChange={setOpen} title="Title">
        Content
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
  return (
    <>
      <ComponentExample
        title="Progress Variants"
        description="Linear progress bar at different values"
        preview={
          <div className="space-y-4 w-full max-w-md">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={100} />
          </div>
        }
        code={`import { Progress } from '@/components/ui/Progress'

export function Example() {
  return (
    <div className="space-y-4">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
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
  return (
    <>
      <ComponentExample
        title="OTP Input"
        description="One-time password input with auto-advance"
        preview={<OTPInput length={6} value={otp} onChange={setOtp} />}
        code={`import { OTPInput } from '@/components/ui/OTPInput'
import { useState } from 'react'

export function Example() {
  const [otp, setOtp] = useState('')
  return <OTPInput length={6} value={otp} onChange={setOtp} />
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
        preview={<PeerTagInput className="max-w-sm" />}
        code={`import { PeerTagInput } from '@/components/ui/PeerTagInput'

export function Example() {
  return <PeerTagInput />
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
            {show && <LoadingOverlay />}
          </div>
        }
        code={`import { LoadingOverlay } from '@/components/ui/LoadingOverlay'

export function Example() {
  return (
    <div className="relative">
      <LoadingOverlay />
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
        preview={<BarcodeGenerator value="1234567890" />}
        code={`import { BarcodeGenerator } from '@/components/ui/BarcodeGenerator'

export function Example() {
  return <BarcodeGenerator value="1234567890" />
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
        preview={<QRCodeGenerator value="https://example.com" />}
        code={`import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator'

export function Example() {
  return <QRCodeGenerator value="https://example.com" />
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
          <InfiniteHorizontalLoop>
            {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'].map(t => (
              <span key={t} className="px-4 py-2 bg-surface-secondary rounded-full text-sm text-text-secondary mx-2">{t}</span>
            ))}
          </InfiniteHorizontalLoop>
        }
        code={`import { InfiniteHorizontalLoop } from '@/components/ui/InfiniteHorizontalLoop'

export function Example() {
  return (
    <InfiniteHorizontalLoop>
      <span>React</span>
      <span>TypeScript</span>
      <span>Tailwind</span>
    </InfiniteHorizontalLoop>
  )
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
        preview={<ScrollRevealCards />}
        code={`import { ScrollRevealCards } from '@/components/ui/ScrollRevealCards'

export function Example() {
  return <ScrollRevealCards />
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
        preview={<StickyImageTextSwap />}
        code={`import { StickyImageTextSwap } from '@/components/ui/StickyImageTextSwap'

export function Example() {
  return <StickyImageTextSwap />
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
        preview={<PromptSuggestionChips />}
        code={`import { PromptSuggestionChips } from '@/components/ui/PromptSuggestionChips'

export function Example() {
  return <PromptSuggestionChips />
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
        preview={<SmartInsightsCard />}
        code={`import { SmartInsightsCard } from '@/components/ui/SmartInsightsCard'

export function Example() {
  return <SmartInsightsCard />
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
        preview={<IdentityVerificationStep />}
        code={`import { IdentityVerificationStep } from '@/components/ui/IdentityVerificationStep'

export function Example() {
  return <IdentityVerificationStep />
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
        preview={<PermissionsMatrix />}
        code={`import { PermissionsMatrix } from '@/components/ui/PermissionsMatrix'

export function Example() {
  return <PermissionsMatrix />
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
        preview={<RecoveryCodeDisplay />}
        code={`import { RecoveryCodeDisplay } from '@/components/ui/RecoveryCodeDisplay'

export function Example() {
  return <RecoveryCodeDisplay />
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
        preview={<SecurityActivityLog />}
        code={`import { SecurityActivityLog } from '@/components/ui/SecurityActivityLog'

export function Example() {
  return <SecurityActivityLog />
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
        preview={<CartPreview />}
        code={`import { CartPreview } from '@/components/ui/CartPreview'

export function Example() {
  return <CartPreview />
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
        preview={<InvoicePreview />}
        code={`import { InvoicePreview } from '@/components/ui/InvoicePreview'

export function Example() {
  return <InvoicePreview />
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
        preview={<OrderSummary />}
        code={`import { OrderSummary } from '@/components/ui/OrderSummary'

export function Example() {
  return <OrderSummary />
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
        preview={<PriceDisplay />}
        code={`import { PriceDisplay } from '@/components/ui/PriceDisplay'

export function Example() {
  return <PriceDisplay />
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
        preview={<ProductCard />}
        code={`import { ProductCard } from '@/components/ui/ProductCard'

export function Example() {
  return <ProductCard />
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
        preview={<RetailSwapInterface />}
        code={`import { RetailSwapInterface } from '@/components/ui/RetailSwapInterface'

export function Example() {
  return <RetailSwapInterface />
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
  return (<><ComponentExample title="ACH Transactions Visualizer" description="Visualizes ACH transaction flow and status" preview={<AchTransactionsVisualizer />} code={`import { AchTransactionsVisualizer } from '@/components/ui/AchTransactionsVisualizer'\nexport function Example() { return <AchTransactionsVisualizer /> }`} /></>)
}
function BankAccountCardExamples() {
  return (<><ComponentExample title="Bank Account Card" description="Bank account card with balance" preview={<BankAccountCard />} code={`import { BankAccountCard } from '@/components/ui/BankAccountCard'\nexport function Example() { return <BankAccountCard /> }`} /></>)
}
function CashbackWidgetExamples() {
  return (<><ComponentExample title="Cashback Widget" description="Cashback earned widget with progress" preview={<CashbackWidget />} code={`import { CashbackWidget } from '@/components/ui/CashbackWidget'\nexport function Example() { return <CashbackWidget /> }`} /></>)
}
function CreditLimitManagerExamples() {
  return (<><ComponentExample title="Credit Limit Manager" description="Credit limit display and adjustment controls" preview={<CreditLimitManager />} code={`import { CreditLimitManager } from '@/components/ui/CreditLimitManager'\nexport function Example() { return <CreditLimitManager /> }`} /></>)
}
function CreditScoreSimulatorExamples() {
  return (<><ComponentExample title="Credit Score Simulator" description="Interactive credit score simulator" preview={<CreditScoreSimulator />} code={`import { CreditScoreSimulator } from '@/components/ui/CreditScoreSimulator'\nexport function Example() { return <CreditScoreSimulator /> }`} /></>)
}
function CurrencyConverterWidgetExamples() {
  return (<><ComponentExample title="Currency Converter Widget" description="Real-time currency converter" preview={<CurrencyConverterWidget />} code={`import { CurrencyConverterWidget } from '@/components/ui/CurrencyConverterWidget'\nexport function Example() { return <CurrencyConverterWidget /> }`} /></>)
}
function EarlyPaymentDiscountExamples() {
  return (<><ComponentExample title="Early Payment Discount" description="Early payment discount calculator" preview={<EarlyPaymentDiscount />} code={`import { EarlyPaymentDiscount } from '@/components/ui/EarlyPaymentDiscount'\nexport function Example() { return <EarlyPaymentDiscount /> }`} /></>)
}
function ExpenseCategorizerExamples() {
  return (<><ComponentExample title="Expense Categorizer" description="Drag-and-drop expense categorization" preview={<ExpenseCategorizer />} code={`import { ExpenseCategorizer } from '@/components/ui/ExpenseCategorizer'\nexport function Example() { return <ExpenseCategorizer /> }`} /></>)
}
function FairUseLimitTrackerExamples() {
  return (<><ComponentExample title="Fair Use Limit Tracker" description="Fair use limit tracker with usage bar" preview={<FairUseLimitTracker />} code={`import { FairUseLimitTracker } from '@/components/ui/FairUseLimitTracker'\nexport function Example() { return <FairUseLimitTracker /> }`} /></>)
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
  return (<><ComponentExample title="Installment Simulator" description="Loan installment calculator and preview" preview={<InstallmentSimulator />} code={`import { InstallmentSimulator } from '@/components/ui/InstallmentSimulator'\nexport function Example() { return <InstallmentSimulator /> }`} /></>)
}
function InteractiveBillSplitterExamples() {
  return (<><ComponentExample title="Interactive Bill Splitter" description="Interactive bill splitter among participants" preview={<InteractiveBillSplitter />} code={`import { InteractiveBillSplitter } from '@/components/ui/InteractiveBillSplitter'\nexport function Example() { return <InteractiveBillSplitter /> }`} /></>)
}
function MultiCurrencyWalletExamples() {
  return (<><ComponentExample title="Multi Currency Wallet" description="Multi-currency wallet with balances" preview={<MultiCurrencyWallet />} code={`import { MultiCurrencyWallet } from '@/components/ui/MultiCurrencyWallet'\nexport function Example() { return <MultiCurrencyWallet /> }`} /></>)
}
function PaymentConfirmationModalExamples() {
  return (<><ComponentExample title="Payment Confirmation Modal" description="Payment confirmation modal with details" preview={<PaymentConfirmationModal />} code={`import { PaymentConfirmationModal } from '@/components/ui/PaymentConfirmationModal'\nexport function Example() { return <PaymentConfirmationModal /> }`} /></>)
}
function PaymentMethodSelectorExamples() {
  return (<><ComponentExample title="Payment Method Selector" description="Payment method selection with card previews" preview={<PaymentMethodSelector />} code={`import { PaymentMethodSelector } from '@/components/ui/PaymentMethodSelector'\nexport function Example() { return <PaymentMethodSelector /> }`} /></>)
}
function QuickTransferBarExamples() {
  return (<><ComponentExample title="Quick Transfer Bar" description="Quick transfer bar with recent contacts" preview={<QuickTransferBar />} code={`import { QuickTransferBar } from '@/components/ui/QuickTransferBar'\nexport function Example() { return <QuickTransferBar /> }`} /></>)
}
function RecurringInvestConfiguratorExamples() {
  return (<><ComponentExample title="Recurring Invest Configurator" description="Recurring investment configuration form" preview={<RecurringInvestConfigurator />} code={`import { RecurringInvestConfigurator } from '@/components/ui/RecurringInvestConfigurator'\nexport function Example() { return <RecurringInvestConfigurator /> }`} /></>)
}
function RoundUpSavingsToggleExamples() {
  return (<><ComponentExample title="Round Up Savings Toggle" description="Round-up savings toggle with projected amount" preview={<RoundUpSavingsToggle />} code={`import { RoundUpSavingsToggle } from '@/components/ui/RoundUpSavingsToggle'\nexport function Example() { return <RoundUpSavingsToggle /> }`} /></>)
}
function SocialPaymentFeedExamples() {
  return (<><ComponentExample title="Social Payment Feed" description="Social-style payment activity feed" preview={<SocialPaymentFeed />} code={`import { SocialPaymentFeed } from '@/components/ui/SocialPaymentFeed'\nexport function Example() { return <SocialPaymentFeed /> }`} /></>)
}
function SubscriptionManagerExamples() {
  return (<><ComponentExample title="Subscription Manager" description="Subscription plan manager with billing info" preview={<SubscriptionManager />} code={`import { SubscriptionManager } from '@/components/ui/SubscriptionManager'\nexport function Example() { return <SubscriptionManager /> }`} /></>)
}
function TransactionListExamples() {
  return (<><ComponentExample title="Transaction List" description="Transaction history list with filters" preview={<TransactionList />} code={`import { TransactionList } from '@/components/ui/TransactionList'\nexport function Example() { return <TransactionList /> }`} /></>)
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
        preview={<CommentThread />}
        code={`import { CommentThread } from '@/components/ui/CommentThread'

export function Example() {
  return <CommentThread />
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
        preview={<MessageReactions />}
        code={`import { MessageReactions } from '@/components/ui/MessageReactions'

export function Example() {
  return <MessageReactions />
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
        preview={<NotificationCenterPanel />}
        code={`import { NotificationCenterPanel } from '@/components/ui/NotificationCenterPanel'

export function Example() {
  return <NotificationCenterPanel />
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
        preview={<AgendaView />}
        code={`import { AgendaView } from '@/components/ui/AgendaView'

export function Example() {
  return <AgendaView />
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
        preview={<SchedulerTimeline />}
        code={`import { SchedulerTimeline } from '@/components/ui/SchedulerTimeline'

export function Example() {
  return <SchedulerTimeline />
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
  return (<><ComponentExample title="Device List" description="List of connected/trusted devices with actions" preview={<DeviceList />} code={`import { DeviceList } from '@/components/ui/DeviceList'\nexport function Example() { return <DeviceList /> }`} /></>)
}
function FileIntelligencePreviewExamples() {
  return (<><ComponentExample title="File Intelligence Preview" description="AI-powered file preview with extracted metadata" preview={<FileIntelligencePreview />} code={`import { FileIntelligencePreview } from '@/components/ui/FileIntelligencePreview'\nexport function Example() { return <FileIntelligencePreview /> }`} /></>)
}
function MicroCommitmentStepperExamples() {
  return (<><ComponentExample title="Micro Commitment Stepper" description="Micro-commitment stepper for onboarding flows" preview={<MicroCommitmentStepper />} code={`import { MicroCommitmentStepper } from '@/components/ui/MicroCommitmentStepper'\nexport function Example() { return <MicroCommitmentStepper /> }`} /></>)
}
function ProgressiveDisclosurePanelExamples() {
  return (<><ComponentExample title="Progressive Disclosure Panel" description="Panel that reveals detail progressively" preview={<ProgressiveDisclosurePanel />} code={`import { ProgressiveDisclosurePanel } from '@/components/ui/ProgressiveDisclosurePanel'\nexport function Example() { return <ProgressiveDisclosurePanel /> }`} /></>)
}
function SlideToDeleteExamples() {
  return (<><ComponentExample title="Slide to Delete" description="iOS-style swipe-to-delete gesture row" preview={<SlideToDelete />} code={`import { SlideToDelete } from '@/components/ui/SlideToDelete'\nexport function Example() { return <SlideToDelete /> }`} /></>)
}
function VoiceCommandOverlayExamples() {
  return (<><ComponentExample title="Voice Command Overlay" description="Voice command listening overlay with transcript" preview={<VoiceCommandOverlay />} code={`import { VoiceCommandOverlay } from '@/components/ui/VoiceCommandOverlay'\nexport function Example() { return <VoiceCommandOverlay /> }`} /></>)
}
