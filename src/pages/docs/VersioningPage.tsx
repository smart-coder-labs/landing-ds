import { motion } from 'framer-motion'
import { Title } from '../../components/ui/Title'
import { Text } from '../../components/ui/Text'
import { Badge } from '../../components/ui/Badge'
import { CodeBlock } from '../../components/ui/CodeBlock'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

const initCode = `npx @smart-coder-labs/apple-design-system init`

const addCode = `# Add one or more components by name
npx @smart-coder-labs/apple-design-system add Button Card Modal

# No args — interactive selector (multiselect or "add all")
npx @smart-coder-labs/apple-design-system add`

const addOutputCode = `ℹ Detected dependency: Spinner
ℹ Detected dependency: Label
✔ Installed SearchInput  v1.0.3
✔ Installed Spinner      v1.0.1
✔ Installed Label        v1.0.0`

const updateCode = `# Update all installed components
npx @smart-coder-labs/apple-design-system update

# Update specific components
npx @smart-coder-labs/apple-design-system update Button SearchInput`

const statusCode = `# Overview — all installed components
npx @smart-coder-labs/apple-design-system status

# Detail — single component with full history
npx @smart-coder-labs/apple-design-system status Button`

const statusOutputCode = `Button
  Installed version : 1.0.0
  Registry version  : 1.1.0
  Status            : stable
  Type              : folder
  Installed at      : 2025-01-01T00:00:00.000Z
  Last updated      : 2025-01-15T00:00:00.000Z
  Breaking changes  : none
  History:
    install   v1.0.0  2025-01-01T00:00:00.000Z
    update    v1.1.0  2025-01-15T00:00:00.000Z`

const rollbackCode = `# Roll back Button to version 1.0.0
npx @smart-coder-labs/apple-design-system rollback Button 1.0.0`

const rollbackHowItWorks = `# Internally, rollback:
# 1. Reads registry.json to find the SHA at that version
# 2. Fetches files from GitHub Raw at that exact commit:
#    https://raw.githubusercontent.com/smart-coder-labs/design-system/<sha>/components/ui/Button/Button.tsx
# 3. Writes files into your componentsDir
# 4. Records action: "rollback" in design-system.json`

const designSystemJsonCode = `// design-system.json — created by init, updated by every CLI command
{
  "framework": "vite",           // detected at init: next-app | next-pages | vite | astro | remix
  "rsc": false,                  // true = Next.js App Router (strips "use client" from components)
  "componentsDir": "./src/components/ui",
  "globalCss": "./src/index.css",
  "components": {
    "SearchInput": {
      "version": "1.0.3",        // currently installed version
      "status": "experimental",  // stable | beta | experimental
      "type": "folder",          // folder | flat
      "installedAt": "2026-05-16T07:06:35.191Z",
      "updatedAt": "2026-05-18T03:46:23.834Z",
      "history": [
        { "version": "1.0.1", "action": "install",  "date": "2026-05-16T07:06:35.191Z" },
        { "version": "1.0.2", "action": "update",   "date": "2026-05-18T03:36:20.478Z" },
        { "version": "1.0.3", "action": "update",   "date": "2026-05-18T03:46:23.834Z" }
      ]
    },
    "Button": {
      "version": "1.1.0",
      "status": "stable",
      "type": "folder",
      "installedAt": "2026-05-10T12:00:00.000Z",
      "updatedAt": "2026-05-10T12:00:00.000Z",
      "history": [
        { "version": "1.1.0", "action": "install", "date": "2026-05-10T12:00:00.000Z" }
      ]
    }
  }
}`

const registryJsonCode = `// registry.json — lives in the GitHub repo, fetched live by the CLI
// URL: https://raw.githubusercontent.com/smart-coder-labs/design-system/main/registry.json
{
  "_version": "1.3.1",   // overall registry version
  "Button": {
    "name": "Button",
    "version": "1.1.0",          // current/latest version
    "status": "stable",
    "added": "1.0.0",            // first version it appeared in
    "breakingChanges": [],        // human-readable breaking change notes
    "dependencies": ["framer-motion"],  // npm packages required
    "type": "registry:ui",
    "files": [
      { "name": "Button.tsx",        "url": "https://raw.githubusercontent.com/..." },
      { "name": "Button.types.ts",   "url": "https://raw.githubusercontent.com/..." },
      { "name": "Button.styles.ts",  "url": "https://raw.githubusercontent.com/..." },
      { "name": "index.ts",          "url": "https://raw.githubusercontent.com/..." }
    ],
    "history": [
      { "version": "1.0.0", "sha": "abc123f...", "files": ["Button.tsx", "Button.types.ts", "index.ts"] },
      { "version": "1.1.0", "sha": "d9f3a12...", "files": ["Button.tsx", "Button.types.ts", "Button.styles.ts", "index.ts"] }
    ]
  }
}`

const bumpRulesCode = `# Method 1 — opt-in via commit message
git commit -m "fix: correct Button padding [release]"          # patch: 1.0.0 → 1.0.1
git commit -m "feat: new Card variants [release:minor]"        # minor: 1.0.0 → 1.1.0
git commit -m "feat!: redesign Token API [release:major]"      # major: 1.0.0 → 2.0.0

# Method 2 — manual GitHub Actions dispatch
# GitHub → Actions → "Update Component Registry" → Run workflow → select bump type`

const statusBadges = [
  {
    label: 'stable',
    color: 'bg-status-success/10 text-status-success border-status-success/20',
    description: 'Production-ready. Breaking changes documented in registry.json → breakingChanges[].',
  },
  {
    label: 'beta',
    color: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    description: 'Functional and usable, but minor API changes are possible between versions.',
  },
  {
    label: 'experimental',
    color: 'bg-status-error/10 text-status-error border-status-error/20',
    description: 'Under active development. May break without notice — use in production at your own risk.',
  },
]

export default function VersioningPage() {
  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <Badge variant="info" size="sm">CLI</Badge>
        <Title level={1} weight="bold">Versioning</Title>
        <Text variant="lead" color="secondary">
          How components are versioned, installed, updated, and rolled back — and what the CLI writes to your project.
        </Text>
      </motion.div>

      {/* init */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <h2 id="init" className="text-xl font-semibold text-text-primary">Init</h2>
        <Text color="secondary">
          Run once per project. Detects your framework (Next.js App Router, Vite, Astro, Remix…), creates <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">design-system.json</code>, writes <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">lib/utils.ts</code> with the <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">cn()</code> helper, and installs required dependencies.
        </Text>
        <CodeBlock code={initCode} language="bash" showLineNumbers={false} />
        <div className="rounded-xl border border-border-primary bg-surface-secondary/30 px-4 py-3">
          <p className="text-xs font-medium text-text-primary mb-2">What init creates</p>
          <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
            <li><code className="font-mono">design-system.json</code> — project registry (tracks installed components)</li>
            <li><code className="font-mono">src/lib/utils.ts</code> — <code className="font-mono">cn()</code> helper (clsx + tailwind-merge)</li>
            <li><code className="font-mono">src/index.css</code> — <code className="font-mono">@import</code> for the design system CSS tokens</li>
            <li>Installs: <code className="font-mono">clsx tailwind-merge cva framer-motion lucide-react</code></li>
          </ul>
        </div>
      </motion.div>

      {/* add */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
        <h2 id="add-components" className="text-xl font-semibold text-text-primary">Adding components</h2>
        <Text color="secondary">
          The CLI fetches component files from GitHub Raw, resolves dependencies automatically (e.g. SearchInput pulls in Spinner and Label), and copies everything into your <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">componentsDir</code>. Each installed component is recorded in <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">design-system.json</code>.
        </Text>
        <CodeBlock code={addCode} language="bash" showLineNumbers={false} />
        <CodeBlock code={addOutputCode} language="bash" showLineNumbers={false} />
        <div className="rounded-xl border border-border-primary bg-surface-secondary/30 px-4 py-3">
          <p className="text-xs font-medium text-text-primary mb-1">RSC mode</p>
          <p className="text-xs text-text-secondary">
            If <code className="font-mono">rsc: false</code> (all frameworks except Next.js App Router), the CLI strips <code className="font-mono">"use client"</code> from every file automatically.
          </p>
        </div>
      </motion.div>

      {/* update */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
        <h2 id="update-components" className="text-xl font-semibold text-text-primary">Updating components</h2>
        <Text color="secondary">
          Update re-downloads the latest version of a component and overwrites the files in your project. Check <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">breakingChanges</code> in the registry before updating — the status command shows them.
        </Text>
        <CodeBlock code={updateCode} language="bash" showLineNumbers={false} />
      </motion.div>

      {/* status */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
        <h2 id="status" className="text-xl font-semibold text-text-primary">Checking status</h2>
        <Text color="secondary">
          The status command cross-references your installed versions against the live registry to show what's outdated and what breaking changes to expect.
        </Text>
        <CodeBlock code={statusCode} language="bash" showLineNumbers={false} />
        <CodeBlock code={statusOutputCode} language="bash" showLineNumbers={false} />
      </motion.div>

      {/* rollback */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
        <h2 id="rollback" className="text-xl font-semibold text-text-primary">Rolling back</h2>
        <Text color="secondary">
          If an update introduces a regression, roll back to any previous version. The CLI uses the git SHA recorded in <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">registry.json</code> to fetch the exact files from that point in history.
        </Text>
        <CodeBlock code={rollbackCode} language="bash" showLineNumbers={false} />
        <CodeBlock code={rollbackHowItWorks} language="bash" showLineNumbers={false} />
        <div className="rounded-xl border border-status-warning/20 bg-status-warning/5 px-4 py-3">
          <p className="text-xs font-medium text-status-warning mb-1">Rollback requirement</p>
          <p className="text-xs text-text-secondary">
            The target version must have a <code className="font-mono">sha</code> entry in <code className="font-mono">registry.json → history[]</code>. Versions published before the SHA tracking system was introduced cannot be rolled back via CLI.
          </p>
        </div>
      </motion.div>

      {/* design-system.json */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
        <h2 id="design-system-json" className="text-xl font-semibold text-text-primary">design-system.json</h2>
        <Text color="secondary">
          Your project's local registry. Lives at the root of your project. Created by <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">init</code>, updated by <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">add</code>, <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">update</code>, and <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">rollback</code>. Commit this file — it's the source of truth for what's installed and when.
        </Text>
        <CodeBlock code={designSystemJsonCode} language="json" showLineNumbers={false} />
      </motion.div>

      {/* registry.json */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={7}>
        <h2 id="registry-json" className="text-xl font-semibold text-text-primary">registry.json</h2>
        <Text color="secondary">
          The upstream source of truth — lives in the GitHub repository, not in your project. The CLI fetches it on every <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">add</code>, <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">update</code>, and <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">status</code> call. It maps component names to file URLs and records every published version with its git SHA.
        </Text>
        <CodeBlock code={registryJsonCode} language="json" showLineNumbers={false} />
      </motion.div>

      {/* Stability labels */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={8}>
        <h2 id="stability-labels" className="text-xl font-semibold text-text-primary">Stability labels</h2>
        <Text color="secondary">
          Every component carries a stability label in both <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">registry.json</code> and your local <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">design-system.json</code>.
        </Text>
        <div className="space-y-3">
          {statusBadges.map(({ label, color, description }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border border-border-primary bg-surface-secondary/30 px-4 py-3">
              <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border mt-0.5 ${color}`}>{label}</span>
              <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Version bump workflow */}
      <motion.div className="space-y-4" variants={fadeUp} initial="hidden" animate="visible" custom={9}>
        <h2 id="version-bumps" className="text-xl font-semibold text-text-primary">How versions are published</h2>
        <Text color="secondary">
          Component versions are managed by a GitHub Actions workflow, not by npm. There are two ways to trigger a release: a commit message opt-in keyword, or a manual workflow dispatch.
        </Text>
        <CodeBlock code={bumpRulesCode} language="bash" showLineNumbers={false} />
        <div className="rounded-lg border border-border-primary overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-primary bg-surface-secondary/50">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-44">Keyword / input</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide w-24">Bump</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-text-tertiary uppercase tracking-wide">Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['[release]', 'patch', '1.0.0 → 1.0.1'],
                ['[release:patch]', 'patch', '1.0.0 → 1.0.1'],
                ['[release:minor]', 'minor', '1.0.0 → 1.1.0'],
                ['[release:major]', 'major', '1.0.0 → 2.0.0'],
                ['Manual dispatch', 'selected', 'Applies to all changed components'],
              ].map(([keyword, bump, example], i) => (
                <tr key={keyword} className={i % 2 === 0 ? '' : 'bg-surface-secondary/20'}>
                  <td className="px-4 py-3 align-top"><code className="text-xs font-mono text-text-primary">{keyword}</code></td>
                  <td className="px-4 py-3 align-top"><code className="text-xs font-mono text-accent-primary">{bump}</code></td>
                  <td className="px-4 py-3 align-top text-xs text-text-secondary">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Text color="secondary" variant="small">
          The workflow only bumps components whose files changed since the last bot commit. It commits back to main with <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">[skip ci]</code> to prevent feedback loops. Component versioning is independent from CLI versioning — the CLI is published to npm on <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded font-mono">v*</code> tags.
        </Text>
      </motion.div>
    </motion.div>
  )
}
