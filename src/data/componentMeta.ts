export interface ComponentMeta {
  name: string
  description: string
  category: string
  examples: Array<{ title: string; code: string; language?: string }>
}

export const COMPONENT_META: Record<string, ComponentMeta> = {
  // ─── Inputs ──────────────────────────────────────────────
  button: {
    name: 'Button',
    description: 'Trigger actions with variants, sizes, icons and loading states.',
    category: 'Inputs',
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
        code: `<Button variant="primary" loading>Saving...</Button>`,
        language: 'tsx',
      },
    ],
  },
  buttonwithdropdown: {
    name: 'ButtonWithDropdown',
    description: 'Button with an attached dropdown menu for grouped actions.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<ButtonWithDropdown
  label="Actions"
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Duplicate', onClick: handleDuplicate },
    { label: 'Delete', onClick: handleDelete, variant: 'destructive' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  checkbox: {
    name: 'Checkbox',
    description: 'Single checkbox with label, description and indeterminate state.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [checked, setChecked] = useState(false)

<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
  label="Accept terms and conditions"
  description="You agree to our Terms of Service."
/>`,
        language: 'tsx',
      },
      {
        title: 'Indeterminate',
        code: `<Checkbox checked="indeterminate" label="Select all" />`,
        language: 'tsx',
      },
    ],
  },
  combobox: {
    name: 'Combobox',
    description: 'Searchable select with autocomplete and custom option rendering.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<Combobox
  placeholder="Search countries..."
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
  ]}
  onChange={(value) => console.log(value)}
/>`,
        language: 'tsx',
      },
    ],
  },
  controlcentertoggles: {
    name: 'ControlCenterToggles',
    description: 'iOS-style control center toggle grid for quick settings.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<ControlCenterToggles
  items={[
    { icon: <WifiIcon />, label: 'Wi-Fi', active: true },
    { icon: <BluetoothIcon />, label: 'Bluetooth', active: false },
    { icon: <AirplaneIcon />, label: 'Airplane', active: false },
    { icon: <HotspotIcon />, label: 'Hotspot', active: true },
  ]}
  onToggle={(index) => console.log(index)}
/>`,
        language: 'tsx',
      },
    ],
  },
  datepicker: {
    name: 'DatePicker',
    description: 'Calendar popover for selecting a single date.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [date, setDate] = useState<Date | null>(null)

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`,
        language: 'tsx',
      },
    ],
  },
  daterangepicker: {
    name: 'DateRangePicker',
    description: 'Calendar popover for selecting a start and end date range.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [range, setRange] = useState({ start: null, end: null })

<DateRangePicker
  value={range}
  onChange={setRange}
  placeholder="Select date range"
/>`,
        language: 'tsx',
      },
    ],
  },
  fab: {
    name: 'FAB',
    description: 'Floating action button for primary actions.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<FAB icon={<PlusIcon />} label="Create" onClick={handleCreate} />`,
        language: 'tsx',
      },
      {
        title: 'Sizes',
        code: `<FAB icon={<PlusIcon />} size="sm" />
<FAB icon={<PlusIcon />} size="md" />
<FAB icon={<PlusIcon />} size="lg" />`,
        language: 'tsx',
      },
    ],
  },
  fabgroup: {
    name: 'FABGroup',
    description: 'FAB that expands into a group of secondary action buttons.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<FABGroup
  icon={<PlusIcon />}
  actions={[
    { icon: <CameraIcon />, label: 'Photo', onClick: handlePhoto },
    { icon: <FileIcon />, label: 'File', onClick: handleFile },
    { icon: <LinkIcon />, label: 'Link', onClick: handleLink },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  hapticbutton: {
    name: 'HapticButton',
    description: 'Button with haptic feedback and spring press animation.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<HapticButton onClick={handleTap}>Tap me</HapticButton>`,
        language: 'tsx',
      },
    ],
  },
  iconbutton: {
    name: 'IconButton',
    description: 'Compact icon-only button with accessible label.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<IconButton icon={<TrashIcon />} label="Delete" onClick={handleDelete} />
<IconButton icon={<EditIcon />} label="Edit" variant="ghost" />
<IconButton icon={<ShareIcon />} label="Share" size="lg" />`,
        language: 'tsx',
      },
    ],
  },
  input: {
    name: 'Input',
    description: 'Text input with label, helper text, icons and error state.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<Input label="Email" placeholder="you@example.com" type="email" />`,
        language: 'tsx',
      },
      {
        title: 'With error',
        code: `<Input
  label="Username"
  value="ab"
  error="Username must be at least 3 characters"
  leftIcon={<UserIcon />}
/>`,
        language: 'tsx',
      },
    ],
  },
  otpinput: {
    name: 'OTPInput',
    description: 'One-time password input with auto-advance between digits.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [code, setCode] = useState('')

<OTPInput length={6} value={code} onChange={setCode} />`,
        language: 'tsx',
      },
    ],
  },
  passwordinput: {
    name: 'PasswordInput',
    description: 'Password field with visibility toggle and strength indicator.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<PasswordInput
  label="Password"
  placeholder="Enter your password"
  showStrength
/>`,
        language: 'tsx',
      },
    ],
  },
  peertaginput: {
    name: 'PeerTagInput',
    description: 'Tag input with autocomplete for selecting multiple peers.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<PeerTagInput
  placeholder="Add people..."
  suggestions={['Alice', 'Bob', 'Charlie']}
  value={['Alice']}
  onChange={(peers) => console.log(peers)}
/>`,
        language: 'tsx',
      },
    ],
  },
  quantityselector: {
    name: 'QuantitySelector',
    description: 'Numeric stepper for quantity selection with min/max bounds.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [qty, setQty] = useState(1)

<QuantitySelector value={qty} onChange={setQty} min={1} max={99} />`,
        language: 'tsx',
      },
    ],
  },
  radiogroup: {
    name: 'RadioGroup',
    description: 'Group of radio buttons with label and description per option.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<RadioGroup
  label="Plan"
  value="pro"
  onChange={(v) => console.log(v)}
  options={[
    { value: 'free', label: 'Free', description: 'Basic features' },
    { value: 'pro', label: 'Pro', description: 'All features' },
    { value: 'enterprise', label: 'Enterprise', description: 'Custom plan' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  rangeslider: {
    name: 'RangeSlider',
    description: 'Dual-handle slider for selecting a value range.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [range, setRange] = useState([20, 80])

<RangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
  label="Price range"
/>`,
        language: 'tsx',
      },
    ],
  },
  ratinginput: {
    name: 'RatingInput',
    description: 'Star rating input with hover preview and half-star support.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [rating, setRating] = useState(3.5)

<RatingInput value={rating} onChange={setRating} max={5} allowHalf />`,
        language: 'tsx',
      },
    ],
  },
  rotaryselector: {
    name: 'RotarySelector',
    description: 'Circular dial for selecting a value by rotation gesture.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<RotarySelector
  value={72}
  min={0}
  max={100}
  onChange={(v) => console.log(v)}
  label="Volume"
/>`,
        language: 'tsx',
      },
    ],
  },
  searchinput: {
    name: 'SearchInput',
    description: 'Search field with debounced onChange and clear button.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<SearchInput
  placeholder="Search components..."
  onSearch={(query) => console.log(query)}
  debounce={300}
/>`,
        language: 'tsx',
      },
    ],
  },
  segmentedinput: {
    name: 'SegmentedInput',
    description: 'iOS-style segmented control for mutually exclusive options.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<SegmentedInput
  value="monthly"
  onChange={(v) => console.log(v)}
  options={[
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  select: {
    name: 'Select',
    description: 'Dropdown select with custom trigger and option list.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<Select placeholder="Choose a fruit">
  <SelectOption value="apple">Apple</SelectOption>
  <SelectOption value="banana">Banana</SelectOption>
  <SelectOption value="cherry">Cherry</SelectOption>
</Select>`,
        language: 'tsx',
      },
    ],
  },
  signaturepad: {
    name: 'SignaturePad',
    description: 'Canvas-based signature input with clear and export options.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<SignaturePad
  onSave={(dataUrl) => console.log(dataUrl)}
  width={400}
  height={200}
  penColor="#000"
/>`,
        language: 'tsx',
      },
    ],
  },
  slider: {
    name: 'Slider',
    description: 'Single-handle slider with label, value display and step.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [value, setValue] = useState(50)

<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
  label="Opacity"
  showValue
/>`,
        language: 'tsx',
      },
    ],
  },
  splitbutton: {
    name: 'SplitButton',
    description: 'Button split into primary action and dropdown trigger.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<SplitButton
  label="Save"
  onClick={handleSave}
  items={[
    { label: 'Save as draft', onClick: handleDraft },
    { label: 'Save and publish', onClick: handlePublish },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  switch: {
    name: 'Switch',
    description: 'Toggle a boolean setting on or off with label and description.',
    category: 'Inputs',
    examples: [
      {
        title: 'With label',
        code: `const [on, setOn] = useState(false)

<Switch
  checked={on}
  onCheckedChange={setOn}
  label="Dark mode"
  description="Enable dark color scheme"
/>`,
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
  tagsinput: {
    name: 'TagsInput',
    description: 'Free-form tag input with keyboard navigation and deletion.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `const [tags, setTags] = useState(['react', 'typescript'])

<TagsInput
  value={tags}
  onChange={setTags}
  placeholder="Add a tag..."
/>`,
        language: 'tsx',
      },
    ],
  },
  textarea: {
    name: 'Textarea',
    description: 'Auto-resizing textarea with label, counter and helper text.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<Textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  maxLength={280}
  showCount
  helperText="Keep it short and sweet."
/>`,
        language: 'tsx',
      },
    ],
  },
  timepicker: {
    name: 'TimePicker',
    description: 'Time selection input with AM/PM and 24-hour modes.',
    category: 'Inputs',
    examples: [
      {
        title: 'Basic usage',
        code: `<TimePicker
  value="14:30"
  onChange={(time) => console.log(time)}
  format="12h"
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Layout ──────────────────────────────────────────────
  card: {
    name: 'Card',
    description: 'Contain related content with header, body and footer sub-components.',
    category: 'Layout',
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
  divider: {
    name: 'Divider',
    description: 'Separate sections with a horizontal or vertical rule.',
    category: 'Layout',
    examples: [
      {
        title: 'Horizontal',
        code: `<Divider />
<Divider label="or" />`,
        language: 'tsx',
      },
      {
        title: 'Vertical',
        code: `<div style={{ display: 'flex', height: 40 }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`,
        language: 'tsx',
      },
    ],
  },
  footer: {
    name: 'Footer',
    description: 'Site-wide footer with top brand area, column links and bottom bar.',
    category: 'Layout',
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
  <FooterBottom>&copy; 2025</FooterBottom>
</Footer>`,
        language: 'tsx',
      },
    ],
  },
  gridsystem: {
    name: 'GridSystem',
    description: 'Responsive column grid built on CSS Grid with gap and column props.',
    category: 'Layout',
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
  layout: {
    name: 'Layout',
    description: 'Full-page layout with header, sidebar, main and footer slots.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<Layout>
  <Layout.Header>Header</Layout.Header>
  <Layout.Sidebar>Navigation</Layout.Sidebar>
  <Layout.Main>Main content</Layout.Main>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>`,
        language: 'tsx',
      },
    ],
  },
  masonrylayout: {
    name: 'MasonryLayout',
    description: 'Pinterest-style masonry grid with column-based flow.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<MasonryLayout columns={3} gap={16}>
  <div style={{ height: 200 }}>Item 1</div>
  <div style={{ height: 120 }}>Item 2</div>
  <div style={{ height: 260 }}>Item 3</div>
  <div style={{ height: 180 }}>Item 4</div>
</MasonryLayout>`,
        language: 'tsx',
      },
    ],
  },
  panel: {
    name: 'Panel',
    description: 'Surface panel with title, actions and scrollable body.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<Panel title="Details" actions={<Button size="sm">Edit</Button>}>
  <p>Panel body content with scrollable overflow.</p>
</Panel>`,
        language: 'tsx',
      },
    ],
  },
  resizablepanel: {
    name: 'ResizablePanel',
    description: 'Panel with draggable resize handle.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<ResizablePanel defaultSize={300} minSize={200} maxSize={600}>
  <p>Drag the edge to resize this panel.</p>
</ResizablePanel>`,
        language: 'tsx',
      },
    ],
  },
  scrollarea: {
    name: 'ScrollArea',
    description: 'Scrollable container with custom styled scrollbar.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<ScrollArea style={{ height: 200 }}>
  <div style={{ height: 600 }}>
    Tall content that scrolls with a custom scrollbar.
  </div>
</ScrollArea>`,
        language: 'tsx',
      },
    ],
  },
  sheet: {
    name: 'Sheet',
    description: 'Slide-in panel from any edge for secondary content or forms.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<Sheet open={isOpen} onClose={() => setOpen(false)} side="right">
  <SheetHeader>
    <SheetTitle>Edit Profile</SheetTitle>
  </SheetHeader>
  <SheetContent>
    <Input label="Name" placeholder="Your name" />
  </SheetContent>
</Sheet>`,
        language: 'tsx',
      },
    ],
  },
  sidebar: {
    name: 'Sidebar',
    description: 'Collapsible navigation sidebar with sections and icons.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<Sidebar collapsed={false}>
  <SidebarSection title="Main">
    <SidebarItem icon={<HomeIcon />} label="Dashboard" active />
    <SidebarItem icon={<UsersIcon />} label="Users" />
    <SidebarItem icon={<SettingsIcon />} label="Settings" />
  </SidebarSection>
</Sidebar>`,
        language: 'tsx',
      },
    ],
  },
  spacer: {
    name: 'Spacer',
    description: 'Flexible whitespace element with fixed or fluid sizing.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<div>Above</div>
<Spacer size="lg" />
<div>Below</div>`,
        language: 'tsx',
      },
    ],
  },
  splitview: {
    name: 'SplitView',
    description: 'Two-pane layout with adjustable split between panels.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<SplitView defaultSplit={50}>
  <SplitView.Left>
    <p>Left panel</p>
  </SplitView.Left>
  <SplitView.Right>
    <p>Right panel</p>
  </SplitView.Right>
</SplitView>`,
        language: 'tsx',
      },
    ],
  },
  stickycontainer: {
    name: 'StickyContainer',
    description: 'Container that sticks within a scroll parent boundary.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<StickyContainer offsetTop={80}>
  <nav>This nav sticks on scroll.</nav>
</StickyContainer>`,
        language: 'tsx',
      },
    ],
  },
  windowcontrols: {
    name: 'WindowControls',
    description: 'macOS traffic-light window control buttons.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<WindowControls
  onClose={() => console.log('close')}
  onMinimize={() => console.log('minimize')}
  onMaximize={() => console.log('maximize')}
/>`,
        language: 'tsx',
      },
    ],
  },
  windowframe: {
    name: 'WindowFrame',
    description: 'Decorative macOS-style window frame with title bar.',
    category: 'Layout',
    examples: [
      {
        title: 'Basic usage',
        code: `<WindowFrame title="Terminal">
  <p>Window body content goes here.</p>
</WindowFrame>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Typography ──────────────────────────────────────────
  blockquote: {
    name: 'Blockquote',
    description: 'Styled blockquote with optional attribution.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<Blockquote attribution="Steve Jobs">
  Design is not just what it looks like. Design is how it works.
</Blockquote>`,
        language: 'tsx',
      },
    ],
  },
  callout: {
    name: 'Callout',
    description: 'Highlighted callout box with icon, title and type variants.',
    category: 'Typography',
    examples: [
      {
        title: 'Variants',
        code: `<Callout type="info" title="Note">
  This is an informational callout.
</Callout>
<Callout type="warning" title="Warning">
  Proceed with caution.
</Callout>`,
        language: 'tsx',
      },
    ],
  },
  caption: {
    name: 'Caption',
    description: 'Small caption text for images, tables and media.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<img src="/photo.jpg" alt="Landscape" />
<Caption>Photo by Jane Doe, 2024</Caption>`,
        language: 'tsx',
      },
    ],
  },
  definitionlist: {
    name: 'DefinitionList',
    description: 'Term-definition pairs in a structured list.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<DefinitionList
  items={[
    { term: 'API', definition: 'Application Programming Interface' },
    { term: 'SDK', definition: 'Software Development Kit' },
    { term: 'CLI', definition: 'Command Line Interface' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  descriptionblock: {
    name: 'DescriptionBlock',
    description: 'Label and value pair block for detail views.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<DescriptionBlock label="Status" value="Active" />
<DescriptionBlock label="Created" value="Jan 15, 2025" />`,
        language: 'tsx',
      },
    ],
  },
  heading: {
    name: 'Heading',
    description: 'Display heading with size, weight and gradient variants.',
    category: 'Typography',
    examples: [
      {
        title: 'Sizes',
        code: `<Heading size="xl">Extra Large</Heading>
<Heading size="lg">Large</Heading>
<Heading size="md">Medium</Heading>`,
        language: 'tsx',
      },
      {
        title: 'Gradient',
        code: `<Heading size="xl" gradient>Gradient Heading</Heading>`,
        language: 'tsx',
      },
    ],
  },
  keyvalueinfo: {
    name: 'KeyValueInfo',
    description: 'Key-value pair row with label, value and optional icon.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<KeyValueInfo label="Email" value="user@example.com" icon={<MailIcon />} />
<KeyValueInfo label="Phone" value="+1 (555) 123-4567" />`,
        language: 'tsx',
      },
    ],
  },
  label: {
    name: 'Label',
    description: 'Accessible form label with required indicator.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<Label htmlFor="email" required>Email address</Label>
<input id="email" type="email" />`,
        language: 'tsx',
      },
    ],
  },
  paragraph: {
    name: 'Paragraph',
    description: 'Body paragraph with size, color and max-width control.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<Paragraph size="lg" maxWidth="65ch">
  A well-structured paragraph with controlled line length
  for optimal readability.
</Paragraph>`,
        language: 'tsx',
      },
    ],
  },
  propertylist: {
    name: 'PropertyList',
    description: 'Vertical list of property-value pairs with dividers.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<PropertyList
  items={[
    { label: 'Type', value: 'Premium' },
    { label: 'Region', value: 'US East' },
    { label: 'Status', value: 'Active' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  sectionheader: {
    name: 'SectionHeader',
    description: 'Section heading with subtitle and trailing action.',
    category: 'Typography',
    examples: [
      {
        title: 'Basic usage',
        code: `<SectionHeader
  title="Recent Activity"
  subtitle="Last 7 days"
  action={<Button size="sm" variant="ghost">View all</Button>}
/>`,
        language: 'tsx',
      },
    ],
  },
  text: {
    name: 'Text',
    description: 'Body, lead, small and tiny text with color, weight and alignment.',
    category: 'Typography',
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
  title: {
    name: 'Title',
    description: 'Semantic headings h1-h6 with typographic scale.',
    category: 'Typography',
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

  // ─── Navigation ──────────────────────────────────────────
  bottomnavigation: {
    name: 'BottomNavigation',
    description: 'Mobile bottom tab bar with icons and labels.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<BottomNavigation
  activeKey="home"
  items={[
    { key: 'home', label: 'Home', icon: <HomeIcon /> },
    { key: 'search', label: 'Search', icon: <SearchIcon /> },
    { key: 'profile', label: 'Profile', icon: <UserIcon /> },
  ]}
  onChange={(key) => console.log(key)}
/>`,
        language: 'tsx',
      },
    ],
  },
  breadcrumb: {
    name: 'Breadcrumb',
    description: 'Breadcrumb trail with custom separator and truncation.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem active>Components</BreadcrumbItem>
</Breadcrumb>`,
        language: 'tsx',
      },
    ],
  },
  breadcrumbtabshybrid: {
    name: 'BreadcrumbTabsHybrid',
    description: 'Breadcrumb that switches into tabs on wider screens.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<BreadcrumbTabsHybrid
  items={[
    { label: 'Overview', href: '/overview' },
    { label: 'Settings', href: '/settings' },
    { label: 'Billing', href: '/billing' },
  ]}
  activeKey="settings"
/>`,
        language: 'tsx',
      },
    ],
  },
  commandmenu: {
    name: 'CommandMenu',
    description: 'CMD+K command palette with fuzzy search.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<CommandMenu
  open={isOpen}
  onClose={() => setOpen(false)}
  commands={[
    { label: 'Go to Dashboard', action: () => navigate('/') },
    { label: 'Search users', action: () => navigate('/users') },
    { label: 'Toggle dark mode', action: toggleTheme },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  contextmenu: {
    name: 'ContextMenu',
    description: 'Right-click context menu with nested submenus.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<ContextMenu>
  <ContextMenuTrigger>
    <div>Right-click me</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onClick={handleCopy}>Copy</ContextMenuItem>
    <ContextMenuItem onClick={handlePaste}>Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem onClick={handleDelete} variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        language: 'tsx',
      },
    ],
  },
  dockbar: {
    name: 'DockBar',
    description: 'macOS-style dock bar with magnification on hover.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<DockBar
  items={[
    { icon: <MailIcon />, label: 'Mail' },
    { icon: <CalendarIcon />, label: 'Calendar' },
    { icon: <MusicIcon />, label: 'Music' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ]}
  magnification={1.5}
/>`,
        language: 'tsx',
      },
    ],
  },
  hamburgermenuicon: {
    name: 'HamburgerMenuIcon',
    description: 'Animated hamburger-to-close icon button.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `const [open, setOpen] = useState(false)

<HamburgerMenuIcon isOpen={open} onClick={() => setOpen(!open)} />`,
        language: 'tsx',
      },
    ],
  },
  menubar: {
    name: 'MenuBar',
    description: 'Application menu bar with dropdown menus.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<MenuBar>
  <MenuBarItem label="File">
    <MenuItem onClick={handleNew}>New</MenuItem>
    <MenuItem onClick={handleOpen}>Open</MenuItem>
    <MenuItem onClick={handleSave}>Save</MenuItem>
  </MenuBarItem>
  <MenuBarItem label="Edit">
    <MenuItem onClick={handleUndo}>Undo</MenuItem>
    <MenuItem onClick={handleRedo}>Redo</MenuItem>
  </MenuBarItem>
</MenuBar>`,
        language: 'tsx',
      },
    ],
  },
  navbar: {
    name: 'NavBar',
    description: 'Top navigation bar with logo, links and actions.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<NavBar
  logo={<Logo />}
  links={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/components' },
  ]}
  actions={<Button size="sm">Sign in</Button>}
/>`,
        language: 'tsx',
      },
    ],
  },
  navigationdrawer: {
    name: 'NavigationDrawer',
    description: 'Full-height side drawer for app-level navigation.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<NavigationDrawer open={isOpen} onClose={() => setOpen(false)}>
  <DrawerItem icon={<HomeIcon />} label="Home" active />
  <DrawerItem icon={<InboxIcon />} label="Inbox" badge={3} />
  <DrawerItem icon={<SettingsIcon />} label="Settings" />
</NavigationDrawer>`,
        language: 'tsx',
      },
    ],
  },
  pagination: {
    name: 'Pagination',
    description: 'Page navigator with prev/next and numbered pages.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<Pagination
  currentPage={3}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>`,
        language: 'tsx',
      },
    ],
  },
  tabs: {
    name: 'Tabs',
    description: 'Switch between content sections with animated indicator.',
    category: 'Navigation',
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
  topactionbar: {
    name: 'TopActionBar',
    description: 'Top bar with back button, title and trailing actions.',
    category: 'Navigation',
    examples: [
      {
        title: 'Basic usage',
        code: `<TopActionBar
  title="Settings"
  onBack={() => navigate(-1)}
  actions={<IconButton icon={<MoreIcon />} label="More" />}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Feedback ────────────────────────────────────────────
  accordion: {
    name: 'Accordion',
    description: 'Vertically stacked collapsible items.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Accordion>
  <AccordionItem title="What is this?">
    A component library for building modern UIs.
  </AccordionItem>
  <AccordionItem title="How do I install it?">
    Run npm install and import the components you need.
  </AccordionItem>
</Accordion>`,
        language: 'tsx',
      },
    ],
  },
  alert: {
    name: 'Alert',
    description: 'Contextual alert with icon, title, message and dismiss.',
    category: 'Feedback',
    examples: [
      {
        title: 'Variants',
        code: `<Alert variant="info" title="Info">Your changes have been saved.</Alert>
<Alert variant="success" title="Success">Account created.</Alert>
<Alert variant="warning" title="Warning">Storage almost full.</Alert>
<Alert variant="error" title="Error" dismissible>Something went wrong.</Alert>`,
        language: 'tsx',
      },
    ],
  },
  avatar: {
    name: 'Avatar',
    description: 'User avatar with image, initials fallback and status dot.',
    category: 'Feedback',
    examples: [
      {
        title: 'Variants',
        code: `<Avatar src="/avatar.jpg" alt="Jane Doe" size="lg" />
<Avatar initials="JD" size="md" />
<Avatar initials="AB" size="sm" status="online" />`,
        language: 'tsx',
      },
    ],
  },
  avatargroup: {
    name: 'AvatarGroup',
    description: 'Overlapping stack of avatars with overflow count.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>`,
        language: 'tsx',
      },
    ],
  },
  badge: {
    name: 'Badge',
    description: 'Inline label for status, categories and counts.',
    category: 'Feedback',
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
  chip: {
    name: 'Chip',
    description: 'Compact interactive chip with icon and dismiss.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Chip label="React" onDismiss={() => console.log('removed')} />
<Chip label="TypeScript" icon={<CodeIcon />} />
<Chip label="Active" variant="success" />`,
        language: 'tsx',
      },
    ],
  },
  collapsible: {
    name: 'Collapsible',
    description: 'Expand and collapse a content section.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
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
  confirmdialog: {
    name: 'ConfirmDialog',
    description: 'Modal confirmation dialog with customizable actions.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<ConfirmDialog
  open={isOpen}
  title="Delete item?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  variant="destructive"
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
/>`,
        language: 'tsx',
      },
    ],
  },
  emptystate: {
    name: 'EmptyState',
    description: 'Illustrated empty state with title, message and CTA.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<EmptyState
  icon={<InboxIcon />}
  title="No messages yet"
  description="When you receive messages, they will appear here."
  action={<Button>Compose</Button>}
/>`,
        language: 'tsx',
      },
    ],
  },
  errorboundary: {
    name: 'ErrorBoundary',
    description: 'React error boundary with fallback UI.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <MyComponent />
</ErrorBoundary>`,
        language: 'tsx',
      },
    ],
  },
  jargontooltip: {
    name: 'JargonTooltip',
    description: 'Tooltip that explains technical terms inline.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<p>
  We use <JargonTooltip term="SSR" definition="Server-Side Rendering: HTML is generated on the server.">SSR</JargonTooltip> for faster page loads.
</p>`,
        language: 'tsx',
      },
    ],
  },
  loadingoverlay: {
    name: 'LoadingOverlay',
    description: 'Full-surface loading overlay with spinner.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<div style={{ position: 'relative', height: 200 }}>
  <p>Content behind the overlay</p>
  <LoadingOverlay visible message="Loading data..." />
</div>`,
        language: 'tsx',
      },
    ],
  },
  maintenancemode: {
    name: 'MaintenanceMode',
    description: 'Full-page maintenance mode screen.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<MaintenanceMode
  title="We'll be back soon"
  message="Scheduled maintenance is in progress."
  estimatedTime="2 hours"
/>`,
        language: 'tsx',
      },
    ],
  },
  modal: {
    name: 'Modal',
    description: 'Centered dialog with header, body and footer.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Modal open={isOpen} onClose={() => setOpen(false)}>
  <ModalHeader>
    <ModalTitle>Edit Profile</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <Input label="Name" placeholder="Your name" />
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save</Button>
  </ModalFooter>
</Modal>`,
        language: 'tsx',
      },
    ],
  },
  modalstackmanager: {
    name: 'ModalStackManager',
    description: 'Manages a stacked queue of modals.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<ModalStackManager>
  <Modal id="confirm" title="Confirm action">Are you sure?</Modal>
  <Modal id="detail" title="Details">Detail content here.</Modal>
</ModalStackManager>`,
        language: 'tsx',
      },
    ],
  },
  offlinestate: {
    name: 'OfflineState',
    description: 'Full-page offline indicator with retry action.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<OfflineState
  title="You're offline"
  message="Check your connection and try again."
  onRetry={() => window.location.reload()}
/>`,
        language: 'tsx',
      },
    ],
  },
  popover: {
    name: 'Popover',
    description: 'Floating content anchored to a trigger element.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content goes here.</p>
  </PopoverContent>
</Popover>`,
        language: 'tsx',
      },
    ],
  },
  progress: {
    name: 'Progress',
    description: 'Linear or circular progress indicator with label.',
    category: 'Feedback',
    examples: [
      {
        title: 'Linear',
        code: `<Progress value={65} max={100} label="Uploading..." />`,
        language: 'tsx',
      },
      {
        title: 'Circular',
        code: `<Progress value={75} variant="circular" size="lg" />`,
        language: 'tsx',
      },
    ],
  },
  skeleton: {
    name: 'Skeleton',
    description: 'Animated placeholder for loading content.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Skeleton width="100%" height={20} />
<Skeleton width="60%" height={20} />
<Skeleton variant="circle" width={48} height={48} />`,
        language: 'tsx',
      },
    ],
  },
  snackbar: {
    name: 'Snackbar',
    description: 'Bottom-anchored temporary notification.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Snackbar
  open={isOpen}
  message="Item deleted"
  action={{ label: 'Undo', onClick: handleUndo }}
  duration={5000}
/>`,
        language: 'tsx',
      },
    ],
  },
  spinner: {
    name: 'Spinner',
    description: 'Animated loading spinner in multiple sizes.',
    category: 'Feedback',
    examples: [
      {
        title: 'Sizes',
        code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
        language: 'tsx',
      },
    ],
  },
  stepper: {
    name: 'Stepper',
    description: 'Multi-step progress indicator with status per step.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `<Stepper
  activeStep={1}
  steps={[
    { label: 'Account', status: 'complete' },
    { label: 'Profile', status: 'current' },
    { label: 'Review', status: 'upcoming' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  tag: {
    name: 'Tag',
    description: 'Removable tag with color variants.',
    category: 'Feedback',
    examples: [
      {
        title: 'Variants',
        code: `<Tag color="blue">Feature</Tag>
<Tag color="green" removable onRemove={() => {}}>Active</Tag>
<Tag color="red">Critical</Tag>
<Tag color="yellow">Pending</Tag>`,
        language: 'tsx',
      },
    ],
  },
  toast: {
    name: 'Toast',
    description: 'Timed notification toast with action and dismiss.',
    category: 'Feedback',
    examples: [
      {
        title: 'Basic usage',
        code: `toast({
  title: 'Changes saved',
  description: 'Your profile has been updated.',
  variant: 'success',
  duration: 4000,
})`,
        language: 'tsx',
      },
    ],
  },
  tooltip: {
    name: 'Tooltip',
    description: 'Hover tooltip with configurable placement.',
    category: 'Feedback',
    examples: [
      {
        title: 'Placements',
        code: `<Tooltip content="Top tooltip" placement="top">
  <Button>Hover me</Button>
</Tooltip>
<Tooltip content="Right tooltip" placement="right">
  <Button>Hover me</Button>
</Tooltip>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Data ────────────────────────────────────────────────
  codeblock: {
    name: 'CodeBlock',
    description: 'Syntax-highlighted code snippets with language label and copy button.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<CodeBlock
  code="npm install @smart-coder-labs/design-system"
  language="bash"
/>`,
        language: 'tsx',
      },
      {
        title: 'TypeScript snippet',
        code: `<CodeBlock
  code={\`const greet = (name: string) => {
  return \\\`Hello, \\\${name}!\\\`
}\`}
  language="typescript"
  showLineNumbers
/>`,
        language: 'tsx',
      },
    ],
  },
  datagrid: {
    name: 'DataGrid',
    description: 'Advanced data table with sort, filter and pagination.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<DataGrid
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', filterable: true },
  ]}
  rows={[
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' },
  ]}
  pageSize={10}
/>`,
        language: 'tsx',
      },
    ],
  },
  diffviewer: {
    name: 'DiffViewer',
    description: 'Side-by-side or inline code diff viewer.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<DiffViewer
  oldValue="const x = 1;"
  newValue="const x = 2;"
  language="javascript"
  mode="side-by-side"
/>`,
        language: 'tsx',
      },
    ],
  },
  filterbar: {
    name: 'FilterBar',
    description: 'Row of filter chips with active state and clear all.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<FilterBar
  filters={[
    { key: 'status', label: 'Active', active: true },
    { key: 'role', label: 'Admin', active: false },
    { key: 'region', label: 'US East', active: true },
  ]}
  onToggle={(key) => console.log(key)}
  onClearAll={() => console.log('cleared')}
/>`,
        language: 'tsx',
      },
    ],
  },
  gallery: {
    name: 'Gallery',
    description: 'Responsive image gallery with lightbox.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<Gallery
  images={[
    { src: '/img1.jpg', alt: 'Photo 1' },
    { src: '/img2.jpg', alt: 'Photo 2' },
    { src: '/img3.jpg', alt: 'Photo 3' },
  ]}
  columns={3}
/>`,
        language: 'tsx',
      },
    ],
  },
  imagecarousel: {
    name: 'ImageCarousel',
    description: 'Touch-friendly image carousel with indicators.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<ImageCarousel
  images={[
    { src: '/slide1.jpg', alt: 'Slide 1' },
    { src: '/slide2.jpg', alt: 'Slide 2' },
    { src: '/slide3.jpg', alt: 'Slide 3' },
  ]}
  autoPlay
  interval={5000}
/>`,
        language: 'tsx',
      },
    ],
  },
  inspectorpanel: {
    name: 'InspectorPanel',
    description: 'Property inspector panel for dev tools UI.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<InspectorPanel
  title="Element Properties"
  properties={[
    { key: 'width', value: '200px', editable: true },
    { key: 'height', value: '100px', editable: true },
    { key: 'opacity', value: '1', editable: true },
  ]}
  onPropertyChange={(key, value) => console.log(key, value)}
/>`,
        language: 'tsx',
      },
    ],
  },
  jsonviewer: {
    name: 'JsonViewer',
    description: 'Collapsible JSON tree viewer.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<JsonViewer
  data={{
    name: 'John',
    age: 30,
    address: { city: 'NYC', zip: '10001' },
    hobbies: ['reading', 'coding'],
  }}
  defaultExpanded={2}
/>`,
        language: 'tsx',
      },
    ],
  },
  kanbanboard: {
    name: 'KanbanBoard',
    description: 'Drag-and-drop Kanban board with columns and cards.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<KanbanBoard
  columns={[
    { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Design UI' }] },
    { id: 'doing', title: 'In Progress', cards: [{ id: '2', title: 'Build API' }] },
    { id: 'done', title: 'Done', cards: [] },
  ]}
  onCardMove={(cardId, fromCol, toCol) => console.log(cardId, fromCol, toCol)}
/>`,
        language: 'tsx',
      },
    ],
  },
  lightbox: {
    name: 'Lightbox',
    description: 'Full-screen image lightbox with zoom and navigation.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<Lightbox
  open={isOpen}
  images={[
    { src: '/photo1.jpg', alt: 'Photo 1' },
    { src: '/photo2.jpg', alt: 'Photo 2' },
  ]}
  startIndex={0}
  onClose={() => setOpen(false)}
/>`,
        language: 'tsx',
      },
    ],
  },
  querybuilder: {
    name: 'QueryBuilder',
    description: 'Visual rule builder for complex filter queries.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<QueryBuilder
  fields={[
    { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
  ]}
  onChange={(rules) => console.log(rules)}
/>`,
        language: 'tsx',
      },
    ],
  },
  reviews: {
    name: 'Reviews',
    description: 'Review list with rating, author and date.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<Reviews
  items={[
    { author: 'Alice', rating: 5, date: '2025-01-15', text: 'Excellent product!' },
    { author: 'Bob', rating: 4, date: '2025-01-10', text: 'Very good, minor issues.' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  table: {
    name: 'Table',
    description: 'Data table with sortable columns and row selection.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'status', header: 'Status' },
    { key: 'date', header: 'Date', sortable: true },
  ]}
  rows={[
    { name: 'Project Alpha', status: 'Active', date: '2025-01-15' },
    { name: 'Project Beta', status: 'Draft', date: '2025-01-10' },
  ]}
  selectable
/>`,
        language: 'tsx',
      },
    ],
  },
  timeline: {
    name: 'Timeline',
    description: 'Vertical timeline of events with icons and metadata.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<Timeline>
  <TimelineItem icon={<CheckIcon />} title="Order placed" date="Jan 15" />
  <TimelineItem icon={<TruckIcon />} title="Shipped" date="Jan 16" />
  <TimelineItem icon={<PackageIcon />} title="Delivered" date="Jan 18" active />
</Timeline>`,
        language: 'tsx',
      },
    ],
  },
  treeview: {
    name: 'TreeView',
    description: 'Collapsible tree of nested items.',
    category: 'Data',
    examples: [
      {
        title: 'Basic usage',
        code: `<TreeView
  data={[
    { id: '1', label: 'src', children: [
      { id: '2', label: 'components', children: [
        { id: '3', label: 'Button.tsx' },
        { id: '4', label: 'Card.tsx' },
      ]},
      { id: '5', label: 'App.tsx' },
    ]},
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Media ───────────────────────────────────────────────
  audioplayer: {
    name: 'AudioPlayer',
    description: 'Audio player with play, seek and volume controls.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<AudioPlayer
  src="/audio/track.mp3"
  title="Summer Vibes"
  artist="DJ Example"
/>`,
        language: 'tsx',
      },
    ],
  },
  barcodegenerator: {
    name: 'BarcodeGenerator',
    description: 'Generate and display barcodes from a string value.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<BarcodeGenerator value="1234567890" format="CODE128" width={2} height={80} />`,
        language: 'tsx',
      },
    ],
  },
  comicpanel: {
    name: 'ComicPanel',
    description: 'Comic-strip style panel layout.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<ComicPanel layout="2x2">
  <ComicPanel.Cell image="/panel1.jpg" caption="Meanwhile..." />
  <ComicPanel.Cell image="/panel2.jpg" caption="BOOM!" />
  <ComicPanel.Cell image="/panel3.jpg" speech="Let's go!" />
  <ComicPanel.Cell image="/panel4.jpg" caption="The end." />
</ComicPanel>`,
        language: 'tsx',
      },
    ],
  },
  docscanoverlay: {
    name: 'DocScanOverlay',
    description: 'Document scanning overlay with corner guides.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<DocScanOverlay
  onCapture={(imageData) => console.log(imageData)}
  guideColor="#00FF00"
  aspectRatio={1.414}
/>`,
        language: 'tsx',
      },
    ],
  },
  fileupload: {
    name: 'FileUpload',
    description: 'Drag-and-drop file upload with preview.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<FileUpload
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onUpload={(file) => console.log(file.name)}
  placeholder="Drop an image here or click to browse"
/>`,
        language: 'tsx',
      },
    ],
  },
  imagecropper: {
    name: 'ImageCropper',
    description: 'Interactive image crop tool with aspect ratio lock.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<ImageCropper
  src="/photo.jpg"
  aspectRatio={16 / 9}
  onCrop={(croppedData) => console.log(croppedData)}
/>`,
        language: 'tsx',
      },
    ],
  },
  markdowneditor: {
    name: 'MarkdownEditor',
    description: 'Markdown editor with preview toggle.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<MarkdownEditor
  value="# Hello World\n\nWrite **markdown** here."
  onChange={(md) => console.log(md)}
  showPreview
/>`,
        language: 'tsx',
      },
    ],
  },
  multifileupload: {
    name: 'MultiFileUpload',
    description: 'Multi-file upload with per-file progress.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<MultiFileUpload
  accept="image/*,application/pdf"
  maxFiles={5}
  onUpload={(files) => console.log(files)}
/>`,
        language: 'tsx',
      },
    ],
  },
  qrcodegenerator: {
    name: 'QRCodeGenerator',
    description: 'Generate QR codes from a URL or string.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<QRCodeGenerator value="https://example.com" size={200} />`,
        language: 'tsx',
      },
    ],
  },
  richtexteditor: {
    name: 'RichTextEditor',
    description: 'WYSIWYG rich text editor with toolbar.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<RichTextEditor
  value="<p>Hello <strong>world</strong></p>"
  onChange={(html) => console.log(html)}
  toolbar={['bold', 'italic', 'underline', 'link', 'image']}
/>`,
        language: 'tsx',
      },
    ],
  },
  videoplayer: {
    name: 'VideoPlayer',
    description: 'Video player with custom controls and fullscreen.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<VideoPlayer
  src="/video/demo.mp4"
  poster="/video/poster.jpg"
  autoPlay={false}
  controls
/>`,
        language: 'tsx',
      },
    ],
  },
  voicerecorder: {
    name: 'VoiceRecorder',
    description: 'Microphone recorder with waveform visualizer.',
    category: 'Media',
    examples: [
      {
        title: 'Basic usage',
        code: `<VoiceRecorder
  onRecordingComplete={(blob) => console.log(blob)}
  maxDuration={60}
  showWaveform
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Charts ──────────────────────────────────────────────
  assetallocationchart: {
    name: 'AssetAllocationChart',
    description: 'Donut chart for portfolio asset allocation.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<AssetAllocationChart
  data={[
    { label: 'Stocks', value: 60, color: '#4F46E5' },
    { label: 'Bonds', value: 25, color: '#10B981' },
    { label: 'Cash', value: 15, color: '#F59E0B' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  assetpriceticker: {
    name: 'AssetPriceTicker',
    description: 'Live-updating asset price ticker with trend.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<AssetPriceTicker
  symbol="AAPL"
  price={182.52}
  change={3.14}
  changePercent={1.75}
  trend="up"
/>`,
        language: 'tsx',
      },
    ],
  },
  balancechart: {
    name: 'BalanceChart',
    description: 'Area chart for account balance over time.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<BalanceChart
  data={[
    { date: '2025-01', balance: 5200 },
    { date: '2025-02', balance: 5800 },
    { date: '2025-03', balance: 6100 },
    { date: '2025-04', balance: 5900 },
  ]}
  currency="USD"
/>`,
        language: 'tsx',
      },
    ],
  },
  chart: {
    name: 'Chart',
    description: 'Generic chart with line, bar, area and pie modes.',
    category: 'Charts',
    examples: [
      {
        title: 'Line chart',
        code: `<Chart
  type="line"
  data={[
    { x: 'Jan', y: 100 },
    { x: 'Feb', y: 150 },
    { x: 'Mar', y: 130 },
    { x: 'Apr', y: 200 },
  ]}
  xLabel="Month"
  yLabel="Revenue"
/>`,
        language: 'tsx',
      },
    ],
  },
  counters: {
    name: 'Counters',
    description: 'Animated number counter with suffix and color.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<Counters value={12480} suffix="+" duration={2000} color="green" />
<Counters value={99.9} suffix="%" duration={1500} />`,
        language: 'tsx',
      },
    ],
  },
  counterslistwithchart: {
    name: 'CountersListWithChart',
    description: 'List of counters with mini sparkline charts.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<CountersListWithChart
  items={[
    { label: 'Revenue', value: 52400, trend: [40, 42, 45, 50, 52] },
    { label: 'Users', value: 1284, trend: [900, 1000, 1100, 1200, 1284] },
    { label: 'Orders', value: 342, trend: [280, 290, 310, 330, 342] },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  kpiblock: {
    name: 'KPIBlock',
    description: 'KPI metric block with value, trend and label.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<KPIBlock
  label="Monthly Revenue"
  value="$52,400"
  trend={{ direction: 'up', percentage: 12.5 }}
  icon={<DollarIcon />}
/>`,
        language: 'tsx',
      },
    ],
  },
  portfoliodistribution: {
    name: 'PortfolioDistribution',
    description: 'Stacked bar chart for portfolio distribution.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<PortfolioDistribution
  segments={[
    { label: 'Equities', value: 45, color: '#4F46E5' },
    { label: 'Fixed Income', value: 30, color: '#10B981' },
    { label: 'Alternatives', value: 15, color: '#F59E0B' },
    { label: 'Cash', value: 10, color: '#6B7280' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  resourcemonitor: {
    name: 'ResourceMonitor',
    description: 'Real-time resource usage monitor (CPU, RAM).',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<ResourceMonitor
  metrics={[
    { label: 'CPU', value: 42, max: 100, unit: '%' },
    { label: 'RAM', value: 6.2, max: 16, unit: 'GB' },
    { label: 'Disk', value: 128, max: 512, unit: 'GB' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  sparkline: {
    name: 'Sparkline',
    description: 'Inline mini chart for trend visualization.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<Sparkline data={[4, 8, 6, 12, 9, 15, 13]} color="#4F46E5" width={120} height={32} />`,
        language: 'tsx',
      },
    ],
  },
  statisticdisplay: {
    name: 'StatisticDisplay',
    description: 'Statistic card with icon, value and change.',
    category: 'Charts',
    examples: [
      {
        title: 'Basic usage',
        code: `<StatisticDisplay
  icon={<UsersIcon />}
  label="Active Users"
  value="1,284"
  change={{ value: 12, direction: 'up' }}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Animations ──────────────────────────────────────────
  floatingelement: {
    name: 'FloatingElement',
    description: 'Element with a continuous float animation.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<FloatingElement amplitude={10} duration={3}>
  <div className="p-4 bg-blue-500 rounded-lg text-white">I float!</div>
</FloatingElement>`,
        language: 'tsx',
      },
    ],
  },
  floatingtoolbar: {
    name: 'FloatingToolbar',
    description: 'Toolbar that floats above selected content.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<FloatingToolbar>
  <IconButton icon={<BoldIcon />} label="Bold" />
  <IconButton icon={<ItalicIcon />} label="Italic" />
  <IconButton icon={<LinkIcon />} label="Link" />
</FloatingToolbar>`,
        language: 'tsx',
      },
    ],
  },
  gesturecard: {
    name: 'GestureCard',
    description: 'Card with swipe gesture interactions.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<GestureCard
  onSwipeLeft={() => console.log('rejected')}
  onSwipeRight={() => console.log('accepted')}
>
  <p>Swipe me left or right!</p>
</GestureCard>`,
        language: 'tsx',
      },
    ],
  },
  immersivehero: {
    name: 'ImmersiveHero',
    description: 'Full-screen hero with parallax and scroll effects.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<ImmersiveHero
  backgroundImage="/hero-bg.jpg"
  title="Welcome to the Future"
  subtitle="Build something amazing"
  parallaxSpeed={0.5}
/>`,
        language: 'tsx',
      },
    ],
  },
  infinitehorizontalloop: {
    name: 'InfiniteHorizontalLoop',
    description: 'Infinite marquee loop for logos or text.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<InfiniteHorizontalLoop speed={40} gap={32}>
  <img src="/logo1.svg" alt="Logo 1" />
  <img src="/logo2.svg" alt="Logo 2" />
  <img src="/logo3.svg" alt="Logo 3" />
  <img src="/logo4.svg" alt="Logo 4" />
</InfiniteHorizontalLoop>`,
        language: 'tsx',
      },
    ],
  },
  interactivecursor: {
    name: 'InteractiveCursor',
    description: 'Custom cursor that reacts to interactive elements.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<InteractiveCursor
  color="#4F46E5"
  size={24}
  hoverScale={2}
/>`,
        language: 'tsx',
      },
    ],
  },
  parallaxbanner: {
    name: 'ParallaxBanner',
    description: 'Image banner with parallax scroll effect.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<ParallaxBanner
  image="/banner.jpg"
  speed={0.3}
  height={400}
>
  <h2>Parallax Content</h2>
</ParallaxBanner>`,
        language: 'tsx',
      },
    ],
  },
  parallaxstorystage: {
    name: 'ParallaxStoryStage',
    description: 'Multi-layer parallax storytelling stage.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<ParallaxStoryStage
  layers={[
    { image: '/bg-far.jpg', speed: 0.1 },
    { image: '/bg-mid.jpg', speed: 0.3 },
    { image: '/bg-near.jpg', speed: 0.6 },
  ]}
  height={600}
/>`,
        language: 'tsx',
      },
    ],
  },
  scrollprogressbar: {
    name: 'ScrollProgressBar',
    description: 'Reading progress bar that fills on scroll.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<ScrollProgressBar color="#4F46E5" height={3} position="top" />`,
        language: 'tsx',
      },
    ],
  },
  scrollrevealcards: {
    name: 'ScrollRevealCards',
    description: 'Cards that reveal with animation on scroll.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<ScrollRevealCards animation="fade-up" stagger={0.1}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</ScrollRevealCards>`,
        language: 'tsx',
      },
    ],
  },
  stickyimagetextswap: {
    name: 'StickyImageTextSwap',
    description: 'Sticky scroll section that swaps text and image.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<StickyImageTextSwap
  sections={[
    { image: '/feature1.jpg', title: 'Feature One', text: 'Description of feature one.' },
    { image: '/feature2.jpg', title: 'Feature Two', text: 'Description of feature two.' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  unscramblingtext: {
    name: 'UnscramblingText',
    description: 'Text that unscrambles into the final string.',
    category: 'Animations',
    examples: [
      {
        title: 'Basic usage',
        code: `<UnscramblingText text="Hello, World!" duration={1500} trigger="onVisible" />`,
        language: 'tsx',
      },
    ],
  },

  // ─── AI ──────────────────────────────────────────────────
  aithinkingindicator: {
    name: 'AIThinkingIndicator',
    description: 'Animated indicator for AI processing state.',
    category: 'AI',
    examples: [
      {
        title: 'Basic usage',
        code: `<AIThinkingIndicator label="Analyzing your data..." variant="dots" />`,
        language: 'tsx',
      },
    ],
  },
  hyperpersonalizedwidgetfeed: {
    name: 'HyperPersonalizedWidgetFeed',
    description: 'AI-curated personalized widget feed.',
    category: 'AI',
    examples: [
      {
        title: 'Basic usage',
        code: `<HyperPersonalizedWidgetFeed
  userId="user_123"
  widgets={[
    { type: 'weather', data: { temp: 72, condition: 'sunny' } },
    { type: 'news', data: { headline: 'Tech stocks surge' } },
    { type: 'calendar', data: { nextEvent: 'Team standup at 10am' } },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  promptsuggestionchips: {
    name: 'PromptSuggestionChips',
    description: 'Suggested prompts as clickable chips.',
    category: 'AI',
    examples: [
      {
        title: 'Basic usage',
        code: `<PromptSuggestionChips
  suggestions={[
    'Summarize this document',
    'Translate to Spanish',
    'Generate a report',
    'Find similar items',
  ]}
  onSelect={(prompt) => console.log(prompt)}
/>`,
        language: 'tsx',
      },
    ],
  },
  smartinsightscard: {
    name: 'SmartInsightsCard',
    description: 'AI-generated insights card with confidence score.',
    category: 'AI',
    examples: [
      {
        title: 'Basic usage',
        code: `<SmartInsightsCard
  title="Spending Pattern Detected"
  insight="Your food expenses increased 23% this month compared to your 3-month average."
  confidence={0.87}
  action={{ label: 'View details', onClick: handleView }}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Auth ────────────────────────────────────────────────
  accessiblehighcontrastmode: {
    name: 'AccessibleHighContrastMode',
    description: 'Toggle for high-contrast accessibility mode.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<AccessibleHighContrastMode
  enabled={isHighContrast}
  onToggle={setHighContrast}
/>`,
        language: 'tsx',
      },
    ],
  },
  behavioralauthsimulator: {
    name: 'BehavioralAuthSimulator',
    description: 'Behavioral biometrics authentication simulator.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<BehavioralAuthSimulator
  onAuthResult={(result) => console.log(result)}
  metrics={['keystroke', 'mouse', 'scroll']}
/>`,
        language: 'tsx',
      },
    ],
  },
  biometricprompt: {
    name: 'BiometricPrompt',
    description: 'Face ID / Touch ID biometric authentication prompt.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<BiometricPrompt
  type="faceId"
  title="Authenticate"
  description="Verify your identity to continue."
  onSuccess={() => console.log('authenticated')}
  onCancel={() => console.log('cancelled')}
/>`,
        language: 'tsx',
      },
    ],
  },
  identityverificationstep: {
    name: 'IdentityVerificationStep',
    description: 'Step-by-step identity verification flow.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<IdentityVerificationStep
  step="document"
  steps={['email', 'phone', 'document', 'selfie']}
  onComplete={(data) => console.log(data)}
/>`,
        language: 'tsx',
      },
    ],
  },
  loginform: {
    name: 'LoginForm',
    description: 'Accessible login form with email, password and OAuth.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<LoginForm
  onSubmit={(credentials) => console.log(credentials)}
  oauthProviders={['google', 'github', 'apple']}
  showRememberMe
/>`,
        language: 'tsx',
      },
    ],
  },
  permissionsmatrix: {
    name: 'PermissionsMatrix',
    description: 'Role-permission matrix table with toggles.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<PermissionsMatrix
  roles={['Admin', 'Editor', 'Viewer']}
  permissions={['create', 'read', 'update', 'delete']}
  values={{
    Admin: { create: true, read: true, update: true, delete: true },
    Editor: { create: true, read: true, update: true, delete: false },
    Viewer: { create: false, read: true, update: false, delete: false },
  }}
  onChange={(role, perm, value) => console.log(role, perm, value)}
/>`,
        language: 'tsx',
      },
    ],
  },
  recoverycodedisplay: {
    name: 'RecoveryCodeDisplay',
    description: 'Recovery codes display with copy and download.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<RecoveryCodeDisplay
  codes={['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456']}
  onCopy={() => console.log('copied')}
  onDownload={() => console.log('downloaded')}
/>`,
        language: 'tsx',
      },
    ],
  },
  securityactivitylog: {
    name: 'SecurityActivityLog',
    description: 'Log of recent security events and logins.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<SecurityActivityLog
  events={[
    { type: 'login', device: 'Chrome on macOS', date: '2025-01-15 09:30', location: 'NYC' },
    { type: 'password_change', date: '2025-01-10 14:20' },
    { type: 'login_failed', device: 'Firefox on Windows', date: '2025-01-09 22:15', location: 'London' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  securityotpinput: {
    name: 'SecurityOTPInput',
    description: 'Secure OTP input for 2FA flows.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<SecurityOTPInput
  length={6}
  onComplete={(code) => console.log(code)}
  autoFocus
/>`,
        language: 'tsx',
      },
    ],
  },
  signupform: {
    name: 'SignupForm',
    description: 'Multi-field signup form with validation.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<SignupForm
  onSubmit={(data) => console.log(data)}
  fields={['name', 'email', 'password', 'confirmPassword']}
  showTerms
/>`,
        language: 'tsx',
      },
    ],
  },
  twofactorauth: {
    name: 'TwoFactorAuth',
    description: 'Two-factor authentication setup and verification flow.',
    category: 'Auth',
    examples: [
      {
        title: 'Basic usage',
        code: `<TwoFactorAuth
  qrCodeUrl="otpauth://totp/App:user@example.com?secret=JBSWY3DPEHPK3PXP"
  onVerify={(code) => console.log(code)}
  onSkip={() => console.log('skipped')}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Commerce ────────────────────────────────────────────
  cartpreview: {
    name: 'CartPreview',
    description: 'Mini cart preview with items and checkout button.',
    category: 'Commerce',
    examples: [
      {
        title: 'Basic usage',
        code: `<CartPreview
  items={[
    { name: 'T-Shirt', price: 29.99, quantity: 2, image: '/tshirt.jpg' },
    { name: 'Sneakers', price: 89.99, quantity: 1, image: '/sneakers.jpg' },
  ]}
  onCheckout={() => console.log('checkout')}
/>`,
        language: 'tsx',
      },
    ],
  },
  invoicepreview: {
    name: 'InvoicePreview',
    description: 'Printable invoice preview with line items.',
    category: 'Commerce',
    examples: [
      {
        title: 'Basic usage',
        code: `<InvoicePreview
  invoiceNumber="INV-2025-001"
  date="2025-01-15"
  items={[
    { description: 'Design services', quantity: 40, rate: 150 },
    { description: 'Development', quantity: 80, rate: 175 },
  ]}
  tax={0.08}
/>`,
        language: 'tsx',
      },
    ],
  },
  ordersummary: {
    name: 'OrderSummary',
    description: 'Order summary with subtotal, tax and total.',
    category: 'Commerce',
    examples: [
      {
        title: 'Basic usage',
        code: `<OrderSummary
  subtotal={149.97}
  shipping={9.99}
  tax={12.00}
  total={171.96}
  currency="USD"
/>`,
        language: 'tsx',
      },
    ],
  },
  pricedisplay: {
    name: 'PriceDisplay',
    description: 'Formatted price with currency, discount and original.',
    category: 'Commerce',
    examples: [
      {
        title: 'Basic usage',
        code: `<PriceDisplay price={29.99} currency="USD" />
<PriceDisplay price={19.99} originalPrice={29.99} currency="USD" discount="-33%" />`,
        language: 'tsx',
      },
    ],
  },
  productcard: {
    name: 'ProductCard',
    description: 'E-commerce product card with image, price and CTA.',
    category: 'Commerce',
    examples: [
      {
        title: 'Basic usage',
        code: `<ProductCard
  image="/product.jpg"
  title="Wireless Headphones"
  price={79.99}
  rating={4.5}
  onAddToCart={() => console.log('added')}
/>`,
        language: 'tsx',
      },
    ],
  },
  retailswapinterface: {
    name: 'RetailSwapInterface',
    description: 'Product swap / exchange interface.',
    category: 'Commerce',
    examples: [
      {
        title: 'Basic usage',
        code: `<RetailSwapInterface
  currentItem={{ name: 'Blue T-Shirt (M)', image: '/blue-m.jpg', price: 29.99 }}
  onSwap={(newItem) => console.log(newItem)}
  availableItems={[
    { name: 'Blue T-Shirt (L)', image: '/blue-l.jpg', price: 29.99 },
    { name: 'Red T-Shirt (M)', image: '/red-m.jpg', price: 29.99 },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Fintech ─────────────────────────────────────────────
  achtransactionsvisualizer: {
    name: 'AchTransactionsVisualizer',
    description: 'Visualizes ACH transaction flow and status.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<AchTransactionsVisualizer
  transactions={[
    { id: '1', from: 'Checking', to: 'Savings', amount: 500, status: 'completed' },
    { id: '2', from: 'External', to: 'Checking', amount: 2500, status: 'pending' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  bankaccountcard: {
    name: 'BankAccountCard',
    description: 'Bank account card with balance and account number.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<BankAccountCard
  bankName="First National Bank"
  accountType="Checking"
  accountNumber="****4892"
  balance={12450.75}
  currency="USD"
/>`,
        language: 'tsx',
      },
    ],
  },
  cashbackwidget: {
    name: 'CashbackWidget',
    description: 'Cashback earned widget with progress.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<CashbackWidget
  earned={42.50}
  goal={100}
  currency="USD"
  period="This month"
/>`,
        language: 'tsx',
      },
    ],
  },
  creditlimitmanager: {
    name: 'CreditLimitManager',
    description: 'Credit limit display and adjustment controls.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<CreditLimitManager
  currentLimit={5000}
  usedAmount={2100}
  currency="USD"
  onRequestIncrease={() => console.log('increase requested')}
/>`,
        language: 'tsx',
      },
    ],
  },
  creditscoresimulator: {
    name: 'CreditScoreSimulator',
    description: 'Interactive credit score simulator.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<CreditScoreSimulator
  currentScore={720}
  factors={[
    { name: 'Payment history', impact: 'high', status: 'good' },
    { name: 'Credit utilization', impact: 'high', status: 'fair' },
    { name: 'Account age', impact: 'medium', status: 'good' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  currencyconverterwidget: {
    name: 'CurrencyConverterWidget',
    description: 'Real-time currency converter widget.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<CurrencyConverterWidget
  baseCurrency="USD"
  targetCurrency="EUR"
  rate={0.92}
  amount={100}
  onConvert={(result) => console.log(result)}
/>`,
        language: 'tsx',
      },
    ],
  },
  earlypaymentdiscount: {
    name: 'EarlyPaymentDiscount',
    description: 'Early payment discount calculator and offer.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<EarlyPaymentDiscount
  invoiceAmount={1000}
  discountPercent={2}
  dueDate="2025-02-15"
  earlyDate="2025-01-30"
  onAccept={() => console.log('accepted')}
/>`,
        language: 'tsx',
      },
    ],
  },
  expensecategorizer: {
    name: 'ExpenseCategorizer',
    description: 'Drag-and-drop expense categorization.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<ExpenseCategorizer
  expenses={[
    { id: '1', description: 'Starbucks', amount: 5.50 },
    { id: '2', description: 'Uber ride', amount: 12.00 },
  ]}
  categories={['Food', 'Transport', 'Entertainment', 'Bills']}
  onCategorize={(expenseId, category) => console.log(expenseId, category)}
/>`,
        language: 'tsx',
      },
    ],
  },
  fairuselimittracker: {
    name: 'FairUseLimitTracker',
    description: 'Fair use limit tracker with usage bar.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<FairUseLimitTracker
  used={7500}
  limit={10000}
  unit="USD"
  label="Monthly withdrawal limit"
  resetDate="Feb 1, 2025"
/>`,
        language: 'tsx',
      },
    ],
  },
  financialgoaltracker: {
    name: 'FinancialGoalTracker',
    description: 'Financial savings goal with progress ring.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<FinancialGoalTracker
  goalName="Emergency Fund"
  targetAmount={10000}
  currentAmount={6500}
  currency="USD"
  deadline="2025-12-31"
/>`,
        language: 'tsx',
      },
    ],
  },
  fintechdashboardpreview: {
    name: 'FintechDashboardPreview',
    description: 'Preview card of a fintech dashboard layout.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<FintechDashboardPreview
  balance={24500}
  currency="USD"
  recentTransactions={3}
  cardStatus="active"
/>`,
        language: 'tsx',
      },
    ],
  },
  gamifiedrewardtier: {
    name: 'GamifiedRewardTier',
    description: 'Reward tier progress with gamification badges.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<GamifiedRewardTier
  currentTier="Silver"
  nextTier="Gold"
  points={3200}
  pointsNeeded={5000}
  badges={['Early Adopter', 'First Purchase', '10 Referrals']}
/>`,
        language: 'tsx',
      },
    ],
  },
  installmentsimulator: {
    name: 'InstallmentSimulator',
    description: 'Loan installment calculator and preview.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<InstallmentSimulator
  principal={10000}
  interestRate={5.5}
  termMonths={36}
  currency="USD"
/>`,
        language: 'tsx',
      },
    ],
  },
  interactivebillsplitter: {
    name: 'InteractiveBillSplitter',
    description: 'Interactive bill splitter among participants.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<InteractiveBillSplitter
  total={120.00}
  participants={['Alice', 'Bob', 'Charlie']}
  currency="USD"
  onSplit={(shares) => console.log(shares)}
/>`,
        language: 'tsx',
      },
    ],
  },
  multicurrencywallet: {
    name: 'MultiCurrencyWallet',
    description: 'Multi-currency wallet with balances.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<MultiCurrencyWallet
  balances={[
    { currency: 'USD', amount: 5200.00, symbol: '$' },
    { currency: 'EUR', amount: 3100.00, symbol: '\u20AC' },
    { currency: 'GBP', amount: 1800.00, symbol: '\u00A3' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  paymentconfirmationmodal: {
    name: 'PaymentConfirmationModal',
    description: 'Payment confirmation modal with details.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<PaymentConfirmationModal
  open={isOpen}
  amount={250.00}
  currency="USD"
  recipient="Jane Smith"
  onConfirm={handleConfirm}
  onCancel={() => setOpen(false)}
/>`,
        language: 'tsx',
      },
    ],
  },
  paymentmethodselector: {
    name: 'PaymentMethodSelector',
    description: 'Payment method selection with card previews.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<PaymentMethodSelector
  methods={[
    { id: '1', type: 'visa', last4: '4242', expiry: '12/26' },
    { id: '2', type: 'mastercard', last4: '8888', expiry: '03/27' },
  ]}
  selected="1"
  onSelect={(id) => console.log(id)}
  onAddNew={() => console.log('add new')}
/>`,
        language: 'tsx',
      },
    ],
  },
  quicktransferbar: {
    name: 'QuickTransferBar',
    description: 'Quick transfer bar with recent contacts.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<QuickTransferBar
  contacts={[
    { name: 'Alice', avatar: '/alice.jpg' },
    { name: 'Bob', avatar: '/bob.jpg' },
    { name: 'Charlie', avatar: '/charlie.jpg' },
  ]}
  onTransfer={(contact) => console.log(contact)}
/>`,
        language: 'tsx',
      },
    ],
  },
  recurringinvestconfigurator: {
    name: 'RecurringInvestConfigurator',
    description: 'Recurring investment configuration form.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<RecurringInvestConfigurator
  asset="S&P 500 Index"
  frequency="monthly"
  amount={500}
  currency="USD"
  onSave={(config) => console.log(config)}
/>`,
        language: 'tsx',
      },
    ],
  },
  roundupsavingstoggle: {
    name: 'RoundUpSavingsToggle',
    description: 'Round-up savings toggle with projected amount.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<RoundUpSavingsToggle
  enabled={true}
  projectedMonthly={32.50}
  currency="USD"
  onToggle={(enabled) => console.log(enabled)}
/>`,
        language: 'tsx',
      },
    ],
  },
  socialpaymentfeed: {
    name: 'SocialPaymentFeed',
    description: 'Social-style payment activity feed.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<SocialPaymentFeed
  items={[
    { user: 'Alice', action: 'paid', target: 'Bob', amount: 25, note: 'Lunch', time: '2h ago' },
    { user: 'Charlie', action: 'requested', target: 'You', amount: 15, note: 'Coffee', time: '5h ago' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  subscriptionmanager: {
    name: 'SubscriptionManager',
    description: 'Subscription plan manager with billing info.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<SubscriptionManager
  currentPlan={{ name: 'Pro', price: 29, interval: 'month' }}
  plans={[
    { name: 'Free', price: 0, interval: 'month' },
    { name: 'Pro', price: 29, interval: 'month' },
    { name: 'Enterprise', price: 99, interval: 'month' },
  ]}
  onChangePlan={(plan) => console.log(plan)}
/>`,
        language: 'tsx',
      },
    ],
  },
  transactionlist: {
    name: 'TransactionList',
    description: 'Transaction history list with filters.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<TransactionList
  transactions={[
    { id: '1', description: 'Amazon', amount: -45.99, date: '2025-01-15', category: 'Shopping' },
    { id: '2', description: 'Salary', amount: 3200, date: '2025-01-01', category: 'Income' },
  ]}
  currency="USD"
/>`,
        language: 'tsx',
      },
    ],
  },
  transferform: {
    name: 'TransferForm',
    description: 'Money transfer form with recipient and amount.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<TransferForm
  balance={5200}
  currency="USD"
  onSubmit={(data) => console.log(data)}
  recentRecipients={['Alice', 'Bob']}
/>`,
        language: 'tsx',
      },
    ],
  },
  virtualcardpreview: {
    name: 'VirtualCardPreview',
    description: 'Animated virtual card with flip to show details.',
    category: 'Fintech',
    examples: [
      {
        title: 'Basic usage',
        code: `<VirtualCardPreview
  cardNumber="**** **** **** 4242"
  holderName="Jane Doe"
  expiry="12/26"
  brand="visa"
  variant="dark"
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Communication ──────────────────────────────────────
  chatbubble: {
    name: 'ChatBubble',
    description: 'Chat message bubble with avatar, timestamp and status.',
    category: 'Communication',
    examples: [
      {
        title: 'Basic usage',
        code: `<ChatBubble
  message="Hey, how are you?"
  sender={{ name: 'Alice', avatar: '/alice.jpg' }}
  timestamp="10:30 AM"
  status="read"
  direction="incoming"
/>`,
        language: 'tsx',
      },
    ],
  },
  chatinput: {
    name: 'ChatInput',
    description: 'Chat input with attachments, emoji and send button.',
    category: 'Communication',
    examples: [
      {
        title: 'Basic usage',
        code: `<ChatInput
  placeholder="Type a message..."
  onSend={(message) => console.log(message)}
  onAttach={(file) => console.log(file)}
  showEmoji
/>`,
        language: 'tsx',
      },
    ],
  },
  commentthread: {
    name: 'CommentThread',
    description: 'Nested comment thread with replies and reactions.',
    category: 'Communication',
    examples: [
      {
        title: 'Basic usage',
        code: `<CommentThread
  comments={[
    {
      id: '1',
      author: 'Alice',
      text: 'Great work on this!',
      time: '2h ago',
      replies: [
        { id: '2', author: 'Bob', text: 'Thanks!', time: '1h ago' },
      ],
    },
  ]}
  onReply={(parentId, text) => console.log(parentId, text)}
/>`,
        language: 'tsx',
      },
    ],
  },
  messagereactions: {
    name: 'MessageReactions',
    description: 'Emoji reaction picker and display for messages.',
    category: 'Communication',
    examples: [
      {
        title: 'Basic usage',
        code: `<MessageReactions
  reactions={[
    { emoji: '\uD83D\uDC4D', count: 3, reacted: true },
    { emoji: '\u2764\uFE0F', count: 1, reacted: false },
  ]}
  onReact={(emoji) => console.log(emoji)}
  onRemove={(emoji) => console.log('removed', emoji)}
/>`,
        language: 'tsx',
      },
    ],
  },
  notificationcenterpanel: {
    name: 'NotificationCenterPanel',
    description: 'Notification center with grouped and unread.',
    category: 'Communication',
    examples: [
      {
        title: 'Basic usage',
        code: `<NotificationCenterPanel
  notifications={[
    { id: '1', title: 'New message', body: 'Alice sent you a message', time: '5m ago', read: false },
    { id: '2', title: 'Update available', body: 'Version 2.0 is ready', time: '1h ago', read: true },
  ]}
  onMarkRead={(id) => console.log(id)}
  onClearAll={() => console.log('cleared')}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Scheduling ─────────────────────────────────────────
  agendaview: {
    name: 'AgendaView',
    description: 'Day/week agenda view for events.',
    category: 'Scheduling',
    examples: [
      {
        title: 'Basic usage',
        code: `<AgendaView
  date={new Date()}
  events={[
    { title: 'Team standup', start: '09:00', end: '09:30', color: '#4F46E5' },
    { title: 'Lunch', start: '12:00', end: '13:00', color: '#10B981' },
    { title: 'Review PR', start: '14:00', end: '15:00', color: '#F59E0B' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  calendar: {
    name: 'Calendar',
    description: 'Full month calendar with event markers.',
    category: 'Scheduling',
    examples: [
      {
        title: 'Basic usage',
        code: `<Calendar
  selectedDate={new Date()}
  onDateSelect={(date) => console.log(date)}
  events={[
    { date: '2025-01-15', title: 'Meeting', color: '#4F46E5' },
    { date: '2025-01-20', title: 'Deadline', color: '#EF4444' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  schedulertimeline: {
    name: 'SchedulerTimeline',
    description: 'Horizontal timeline scheduler for resources.',
    category: 'Scheduling',
    examples: [
      {
        title: 'Basic usage',
        code: `<SchedulerTimeline
  resources={[
    { id: '1', name: 'Room A' },
    { id: '2', name: 'Room B' },
  ]}
  events={[
    { resourceId: '1', title: 'Workshop', start: '09:00', end: '11:00' },
    { resourceId: '2', title: 'Interview', start: '10:00', end: '11:30' },
  ]}
  date={new Date()}
/>`,
        language: 'tsx',
      },
    ],
  },

  // ─── Misc ────────────────────────────────────────────────
  activityfeed: {
    name: 'ActivityFeed',
    description: 'Activity feed with user actions and timestamps.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<ActivityFeed
  items={[
    { user: 'Alice', action: 'created a new project', time: '2m ago', avatar: '/alice.jpg' },
    { user: 'Bob', action: 'commented on a task', time: '15m ago', avatar: '/bob.jpg' },
    { user: 'Charlie', action: 'deployed to production', time: '1h ago', avatar: '/charlie.jpg' },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  activitymonitor: {
    name: 'ActivityMonitor',
    description: 'Real-time activity monitor dashboard.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<ActivityMonitor
  metrics={[
    { label: 'Requests/sec', value: 1243, status: 'healthy' },
    { label: 'Error rate', value: 0.2, unit: '%', status: 'healthy' },
    { label: 'Latency', value: 45, unit: 'ms', status: 'warning' },
  ]}
  refreshInterval={5000}
/>`,
        language: 'tsx',
      },
    ],
  },
  addressselector: {
    name: 'AddressSelector',
    description: 'Address search and selection with map preview.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<AddressSelector
  placeholder="Search for an address..."
  onSelect={(address) => console.log(address)}
  showMap
/>`,
        language: 'tsx',
      },
    ],
  },
  cardsecuritycontrols: {
    name: 'CardSecurityControls',
    description: 'Card security controls: freeze, limits, PIN.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<CardSecurityControls
  cardId="card_123"
  frozen={false}
  onFreeze={(frozen) => console.log('freeze:', frozen)}
  onChangePin={() => console.log('change PIN')}
  onSetLimits={() => console.log('set limits')}
/>`,
        language: 'tsx',
      },
    ],
  },
  contextualtrustbadge: {
    name: 'ContextualTrustBadge',
    description: 'Contextual trust badge for verified status.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<ContextualTrustBadge
  level="verified"
  label="Identity Verified"
  tooltip="This user has completed identity verification."
/>`,
        language: 'tsx',
      },
    ],
  },
  devicelist: {
    name: 'DeviceList',
    description: 'List of connected/trusted devices with actions.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<DeviceList
  devices={[
    { name: 'MacBook Pro', type: 'desktop', lastSeen: '2m ago', current: true },
    { name: 'iPhone 15', type: 'mobile', lastSeen: '1h ago', current: false },
  ]}
  onRemove={(deviceId) => console.log('remove', deviceId)}
/>`,
        language: 'tsx',
      },
    ],
  },
  fileintelligencepreview: {
    name: 'FileIntelligencePreview',
    description: 'AI-powered file preview with extracted metadata.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<FileIntelligencePreview
  file={{ name: 'contract.pdf', size: '2.4 MB', type: 'application/pdf' }}
  metadata={{
    summary: 'Employment contract for Software Engineer role.',
    entities: ['ACME Corp', 'Jane Doe'],
    confidence: 0.92,
  }}
/>`,
        language: 'tsx',
      },
    ],
  },
  microcommitmentstepper: {
    name: 'MicroCommitmentStepper',
    description: 'Micro-commitment stepper for onboarding flows.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<MicroCommitmentStepper
  steps={[
    { label: 'Create account', completed: true },
    { label: 'Set preferences', completed: true },
    { label: 'Invite team', completed: false },
    { label: 'First project', completed: false },
  ]}
  currentStep={2}
/>`,
        language: 'tsx',
      },
    ],
  },
  progressivedisclosurepanel: {
    name: 'ProgressiveDisclosurePanel',
    description: 'Panel that reveals detail progressively.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<ProgressiveDisclosurePanel
  summary="Transaction #12345"
  levels={[
    { label: 'Overview', content: <p>Amount: $250.00</p> },
    { label: 'Details', content: <p>From: Checking ****4892</p> },
    { label: 'Raw data', content: <pre>{"id": "txn_12345"}</pre> },
  ]}
/>`,
        language: 'tsx',
      },
    ],
  },
  slidetodelete: {
    name: 'SlideToDelete',
    description: 'iOS-style swipe-to-delete gesture row.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<SlideToDelete onDelete={() => console.log('deleted')}>
  <div className="p-4">Swipe left to delete this item</div>
</SlideToDelete>`,
        language: 'tsx',
      },
    ],
  },
  voicecommandoverlay: {
    name: 'VoiceCommandOverlay',
    description: 'Voice command listening overlay with transcript.',
    category: 'Misc',
    examples: [
      {
        title: 'Basic usage',
        code: `<VoiceCommandOverlay
  active={isListening}
  transcript="Navigate to settings"
  onCommand={(command) => console.log(command)}
  onClose={() => setListening(false)}
/>`,
        language: 'tsx',
      },
    ],
  },
}
